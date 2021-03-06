import { host, getQuery, isUndefined, isEmptyString, stringToDate, setCookie, getCookie, removeCookie } from '../util';
import fetch from 'isomorphic-fetch';
import VueRouter, { Route } from 'vue-router';

const rely = {
    __DEV__: process.env.NODE_ENV === 'development',

    defaultParams: {
        client_id: 'p',
        // client_secret: '',
        client_secret: 'fPeYyY2F8aaKGx2MtKELuF_AOAvtIoA_9Dvn1kyDfUpRFeTbb44D9afu3OBr5-qDP0bL6FcsCBpVZGsg3ZuqrMxmJ5gjJkzJTue6BcG2N26llNKG4-_0Ux4A9pr6OmWjnv7TCy27QAToqDaX_bivYtlAcUmOp2Mt1TwdlMZ2B10 ',
        auth_svr: 'https://pas.mingyuanyun.com/auth',
        token_svr: 'https://pas.mingyuanyun.com/token',
        refresh_svr: 'https://pas.mingyuanyun.com/refresh',
        user_info_svr: 'https://pas.mingyuanyun.com/user-info',
        logout_svr: 'https://pas.mingyuanyun.com/logout',
        local_mode: 'localStorage',
        cookie_duration: 129600,
        cookie_domain: '.mingyuanyun.com'
    },

    invalidLogonIdentity: {
        name: 'InvalidLogonIdentityException',
        code: 100110,
        message: '未能检测到有效的登录身份，请重新登录'
    },

    tokenRefreshing: false,

    /* 获取用户信息 过程 ================================================================================================ */
    userInfo(access_token: string, success: any, error: any) {
        fetch(
            `${this.defaultParams.user_info_svr}/${access_token}`,
            {
                method: 'GET'
            }).then((res) => {
                res.json().then((json) => {
                    if (json.result) {
                        this.saveLogonUser(json.userData);
                        success();
                    } else {
                        error(json.userData);
                    }
                });
            });
    },

    /**
     * 将拉取到登录用户的 user info 保存在 localStorage 中
     * @param user
     */
    saveLogonUser(user: any) {
        if (this.defaultParams.local_mode === 'cookie') {
            setCookie('__myt_auth_user',
                JSON.stringify(user),
                this.defaultParams.cookie_duration,
                this.__DEV__ ? '' : this.defaultParams.cookie_domain);
        } else if (this.defaultParams.local_mode === 'sessionStorage') {
            sessionStorage.logonUser = JSON.stringify(user);
        } else {
            localStorage.logonUser = JSON.stringify(user);
        }
    },

    /**
     * 获取 localStorage 中保存的 user info
     * @returns mixed
     */
    getLogonUser() {
        try {
            const logonUser = (this.defaultParams.local_mode === 'cookie' ? getCookie('__myt_auth_user') :
                (this.defaultParams.local_mode === 'sessionStorage' ? sessionStorage.logonUser
                    : localStorage.logonUser));

            return logonUser === undefined ? undefined : JSON.parse(logonUser);
        } catch (e) {
            return undefined;
        }
    },

    checkLogon(from: Route, next: any) {
        const userInfo = this.getLogonUser();
        const tokens = this.getTokens();
        if (userInfo === undefined || tokens === undefined || isEmptyString(tokens.access_token)) {
            this.saveRedirectUrl(from);
            next('/__oauth2/auth');
        }
    },

    /* 处理身份缓存 ===================================================================================================== */
    /**
     * 将申请或刷新得到的tokens保存在 localStorage 中
     * @param tokens
     */
    saveTokens(tokens: any) {
        tokens.updated = new Date();
        if (this.defaultParams.local_mode === 'cookie') {
            setCookie('__myt_auth_token',
                JSON.stringify(tokens),
                this.defaultParams.cookie_duration,
                this.__DEV__ ? '' : this.defaultParams.cookie_domain);
        } else if (this.defaultParams.local_mode === 'sessionStorage') {
            sessionStorage.tokens = JSON.stringify(tokens);
        } else {
            localStorage.tokens = JSON.stringify(tokens);
        }

    },

    /**
     * 获取 localStorage 中保存的 tokens
     * @returns mixed
     */
    getTokens() {
        try {
            const tokens = (this.defaultParams.local_mode === 'cookie' ? getCookie('__myt_auth_token') :
                (this.defaultParams.local_mode === 'sessionStorage' ? sessionStorage.tokens : localStorage.tokens));

            return tokens === undefined ? undefined : JSON.parse(tokens);
        } catch (e) {
            return undefined;
        }
    },

    /**
     * 从 localStorage 中删除保存的 tokens
     */
    clearTokens() {
        if (this.defaultParams.local_mode === 'cookie') {
            removeCookie('__myt_auth_token');
        } else if (this.defaultParams.local_mode === 'sessionStorage') {
            delete sessionStorage.tokens;
        } else {
            delete localStorage.tokens;
        }
    },

    isTokenValid(tokens: any) {
        if (isUndefined(tokens)) return false;
        if (isEmptyString(tokens.access_token) || isUndefined(tokens.expires_in)
            || isUndefined(tokens.updated)) return false;
        // 检查 accessToken 是否还在有效期
        try {
            const ms = (new Date()).getTime() - stringToDate(tokens.updated, '-').getTime();

            return (ms <= ((tokens.expires_in - 10) * 1000));
        } catch (e) {
            return false;
        }
    },

    /* 申请 Token 过程 ======================================================================= */

    /**
     * 解析授权成功后的授权码回调
     */
    resolveAuthCallback() {
        const result = this.checkClientState();
        this.clearClientState();

        return {
            result,
            code: getQuery('code'),
            error: result ? undefined : {
                name: 'ClientStateExpiredException',
                code: 100111,
                message: '客户端状态已失效，请重新登录'
            }
        };
    },

    /**
     * 获取token
     */
    token(code: number, success: any, error: any) {
        fetch(
            this.defaultParams.token_svr,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                // tslint:disable-next-line:max-line-length
                body: `grant_type=authorization_code&client_id=${this.defaultParams.client_id}&client_secret=${this.defaultParams.client_secret}&code=${code}&redirect_uri=${this.getRedirectUrl()}`
            }).then((res) => {
                res.json().then((json) => {
                    if (json.result) {
                        const tokens = json.userData;
                        // 保存token
                        this.saveTokens(tokens);
                        success(tokens.access_token);
                    } else {
                        error(json.userData);
                    }
                });
            });
    },

    /**
     * 从 localStorage 中删除保存的 user info
     */
    clearLogonUser() {
        if (this.defaultParams.local_mode === 'cookie') {
            removeCookie('__myt_auth_user');
        } else if (this.defaultParams.local_mode === 'sessionStorage') {
            delete sessionStorage.logonUser;
        } else {
            delete localStorage.logonUser;
        }
    },

    /**
     * 登出
     */
    logout(route: Route) {
        this.saveRedirectUrl(route);
        // 清除EKP登录记录
        removeCookie('Email_User');
        removeCookie('Login_User');
        const doLogoutUrl = `${host()}__oauth2/logout`;
        window.location.href = `${this.defaultParams.logout_svr}?redirect_uri=${encodeURIComponent(doLogoutUrl)}`;
    },
    /**
     * 执行登出
     * @param replace
     */
    doLogout() {
        this.clearLogonUser();
        this.clearTokens();
        this.returnToRedirectUrl();
    },

    /**
     * 保存回调页面地址
     */
    saveRedirectUrl(route: Route) {
        const query = route.query;
        let { path } = route;
        if (path.length > 1 && path.substr(0, 1) === '/') path = path.substr(1);
        let search = '';
        Object.keys(query).forEach((key) => {
            search += key + '=' + query[key] + '&';
        });
        search = search.substring(0, search.lastIndexOf('&'));
        const returnPath = `${path}${search}`;
        localStorage.auth_return_url = (returnPath === '/' ? '/' : `/${returnPath}`);
    },

    // tslint:disable-next-line:no-unnecessary-initializer
    returnToRedirectUrl(replace: VueRouter['replace'] | undefined = undefined) {
        const url = isEmptyString(localStorage.auth_return_url) ? '/' : localStorage.auth_return_url;
        if (replace) {
            replace(url);
        } else {
            window.location.href = url;
        }
        delete localStorage.auth_return_url;
    },

    waitTokenRefreshed(next: any) {
        setTimeout(() => {
            if (this.tokenRefreshing) {
                this.waitTokenRefreshed(next);
            } else {
                next();
            }
        }, 500);
    },

    prepareRefresh(refresh: any, next: any) {
        if (this.tokenRefreshing) {
            // 等待
            this.waitTokenRefreshed(next);
        } else {
            this.tokenRefreshing = true;
            refresh();
        }
    },

    /**
     * 刷新token
     * @param success
     * @param error
     */
    refresh(success: any, error: any) {
        const oldTokens = this.getTokens();
        if (oldTokens === undefined) error(this.invalidLogonIdentity);

        fetch(
            this.defaultParams.refresh_svr,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `client_id=${this.defaultParams.client_id}&code=${oldTokens.refresh_token}`
            }).then((res) => {
                res.json().then((json) => {
                    if (json.result) {
                        const tokens = json.userData;
                        // 保存token
                        this.saveTokens(tokens);
                        this.tokenRefreshing = false;
                        success(tokens.access_token);
                    } else {
                        this.tokenRefreshing = false;
                        error(json.userData);
                    }
                });
            });
    },

    /**
     * 重新认证
     */
    reAuth() {
        this.clearLogonUser();
        this.clearTokens();
        this.redirectToAuthUrl();
    },

    /**
     * 跳转到授权站点
     */
    redirectToAuthUrl() {
        const clientState = this.generateOAuthClientState(6);
        const { auth_svr, client_id } = this.defaultParams;
        window.location.href = auth_svr + '?response_type=code&client_id=' + client_id +
            '&scope=' + '' +
            '&state=' + clientState +
            '&redirect_uri=' + encodeURIComponent(this.getRedirectUrl());
    },

    /**
     * 获取auth成功之后的跳转地址
     */
    getRedirectUrl() {
        return host() + '__oauth2/callback';
    },

    /**
     * 生成客户端随机码
     * @param n
     * @returns {string}
     */
    generateOAuthClientState(n: number) {
        const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
            'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        let res = '';
        for (let i = 0; i < n; i++) {
            const id = Math.ceil(Math.random() * 35);
            res += chars[id];
        }
        localStorage.oauthState = res;

        return res;
    },

    /**
     * 检查客户端随机码
     * @returns {boolean}
     */
    checkClientState() {
        const state = getQuery('state');

        return !(isEmptyString(localStorage.oauthState) || (state !== localStorage.oauthState));
    },

    /**
     * 清除客户端随机码
     */
    clearClientState() {
        delete localStorage.oauthState;
    }
};

export default rely;
