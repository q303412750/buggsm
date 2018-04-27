import tipTypes from './tipTypes';
import app from '../app';
import { isEmptyString } from '../util';
import rely from '../oauth2/oauth2rely';
import { Message, Option } from 'element-ui';

interface IData {
    name: string;
    code: number;
    message: string;
}

export default {
    /**
     * 显示一个消息提示的模态提示框
     * @param message
     * @param title
     */
    info(message: string) {
        this.showModalTip(tipTypes.info, { message, code: 0, name: 'info' });
    },

    /**
     * 显示一个警告的模态提示框
     * @param message
     * @param title
     */
    warning(message: string) {
        this.showModalTip(tipTypes.warning, { message, code: 0, name: 'warning' });
    },

    /**
     * 显示一个成功提示的模态提示框
     * @param message
     * @param title
     */
    success(message: string) {
        this.showModalTip(tipTypes.success, { message, code: 0, name: 'success' });
    },

    /**
     * 显示一个错误的模态提示框
     * err 参数为错误对象
     * {
     *    name: 'InvalidLogonIdentityException',
     *    code: 100110,
     *    message: '未能检测到有效的登录身份，请重新登录'
     * }
     * @param err
     * @param title
     */
    error(err: IData) {
        this.showModalTip(tipTypes.error, err);
    },

    showModalTip(type: string, data: IData) {
        switch (type) {
            case tipTypes.info: return Message.info(data.message);
            case tipTypes.success: return Message.success(data.message);
            case tipTypes.warning: return Message.warning(data.message);
            case tipTypes.error: {
                if (data.code >= 100100 && data.code < 100200) {
                    rely.reAuth();
                } else {
                    const customHandle = this.matchCustomHandles(data);
                    let extentMessage = '';
                    let okText = '知道了';
                    let onOk = '';

                    if (customHandle !== undefined) {
                        extentMessage = (isEmptyString(customHandle.extentMessage)) ? '' : customHandle.extentMessage;
                        okText = (isEmptyString(customHandle.okText)) ? '知道了' : customHandle.okText as string;
                        onOk = customHandle.onOk;
                    }

                    return Message.error(data.name);
                }
            }
        }
    },

    customErrorHandles: undefined as undefined | any[],

    initCustomErrorHandle() {
        this.customErrorHandles = [];
        this.customErrorHandles.push({
            key: 'identity',
            test: (error: IData) => {
                return (error.code >= 100100 && error.code < 100200);
            },
            extentMessage: '',
            okText: '重新登录',
            onOk: () => {
                rely.reAuth();
            }
        });
        this.customErrorHandles.push({
            key: 'anoToIdentity',
            test: (error: IData) => {
                return ((error.code >= 900001 && error.code <= 900002) || (error.code >= 6900017 && error.code <= 6900018));
            },
            extentMessage: '若您是明源内部用户，请点击"切换身份"按钮重新登录',
            okText: '切换身份',
            onOk: () => {
                rely.reAuth();
            }
        });
    },

    registerCustomErrorHandle(handle: { [key: string]: any }) {
        if (this.customErrorHandles === undefined) {
            this.initCustomErrorHandle();
        }
        if (this.customErrorHandles !== undefined && this.customErrorHandles.find((h) => h.key === handle.key) === undefined) {
            this.customErrorHandles.push(handle);
        }
    },

    clearCustomErrorHandles() {
        this.initCustomErrorHandle();
    },

    matchCustomHandles(error: IData) {
        if (this.customErrorHandles === undefined) return undefined;

        return this.customErrorHandles.find((handle: any) => handle.test(error));
    }
};
