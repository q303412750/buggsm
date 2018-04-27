const __DEV__ = process.env.NODE_ENV === 'development';

export default {
    client_id: 'p',
    home: __DEV__ ? 'https://p.mingyuanyun.com' : 'https://p.mingyuanyun.com',
    apiDomain: __DEV__ ? 'http://localhost:6788/api' : 'http://localhost:6788/api',
    apiVersion: 'v1'
};
