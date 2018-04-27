import clientConfig from './config';

export default {
    client_id: clientConfig.client_id,
    token_svr: `${clientConfig.apiDomain}/oauth2/token?suppress_response_code=true`
};
