import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { isEmptyString, getRandomCode } from '../nmb/util';
import app from '../nmb/app';
import { Commit } from 'vuex';
import test from './moudules/test';
import { authApiBefore } from '../nmb/middleware/authApiMiddleware';

interface ITypes {
    request: string;
    success: string;
    failed: string;
}

const getApiFetchOptions = (apiPath: string, method: string = 'GET', opts: { headers?: any } = {}, apiRoot = null) => {
    const headers = opts.headers || {};
    const apiRootPath = isEmptyString(apiRoot) ? `${app.params.apiDomain}/${app.params.apiVersion}` : apiRoot;

    if (method === 'GET') {
        apiPath = apiPath.indexOf('?') === -1 ? `${apiPath}?__rnd=${getRandomCode(4)}` : `${apiPath}&__rnd=${getRandomCode(4)}`;
    }
    const endpoint = `${apiRootPath}/${apiPath}`;

    return {
        ...opts,
        url: endpoint,
        method,
        timeout: 1000,
        headers: {
            ...headers,
            'Accept': 'application/json',
            'Content-Type': headers['Content-Type'] || 'application/json'
        }
    };
};

/**
 * 与服务器交互数据
 * @param {*} commit
 * @param {*} config
 * @param {*} types
 */
const apiFetchAction = async (commit: Commit, apiPath: string, method: string, types: ITypes, payload: any) => {
    commit(types.request);
    // 是否使用测试数据
    if (useTestData) {
        await new Promise((reslve, reject) => {
            setTimeout(() => {
                commit(types.success, { data: testData[apiPath] });
            }, 500);
        });
    } else {
        const opts = await authApiBefore(payload);
        const config: AxiosRequestConfig = getApiFetchOptions(apiPath, method, opts);
        if (method === 'GET' && payload) config.params = payload.data;
        if (method === 'POST' && payload) config.data = payload.data;
        await axios(config).then((res: AxiosResponse) => {
            if (res.status === 200 && res.data.code === 0) {
                commit(types.success, res.data);
            } else {
                commit(types.failed, res.data);
            }
        }).catch((err) => {
            commit(types.failed, err);
        });
    }
};

export {
    apiFetchAction
};

// 如果api请求需要使用模拟数据，这里控制开关
const useTestData = true;

const testData: { [key: string]: any } = {
    'demand/getAllDemand': {
        demandcount: 119,
        message: '这是一个返回需求列表 POST 请求',
        name: '返回需求列表',
        alldemand: [
            { Workload: 1.1, Description: '刘姐', Class: 1, level: 1, CreaterName: '许文强', Makers: [{ MakerName: '姚海啸(old)', MakerDepartment: 'MIP公共主数据组' }] },
            { Workload: 1.1, Description: '许文强', Class: 1, level: 1, CreaterName: '鹰', Makers: [{ MakerName: '许一妹', MakerDepartment: 'MIP公共主数据组' }] }
        ]
    }
};
