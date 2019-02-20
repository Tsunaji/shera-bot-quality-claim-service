const axios = require('axios');
const querystring = require('querystring');

class Services {

    async getAuthenImage(context, url) {

        const host = context.adapter.credentials.oAuthEndpoint;

        const data = {
            grant_type: 'client_credentials',
            client_id: context.adapter.credentials.appId,
            client_secret: context.adapter.credentials.appPassword,
            scope: context.adapter.credentials.oAuthScope,
        };

        //get token
        const token = await axios.post(host, querystring.stringify(data))
            .then(response => {
                return response.data.access_token;
            })
            .catch((error) => {
                console.log('error ' + error);
            });

        //get binary image
        const AuthStr = 'Bearer '.concat(token);
        return await axios.get(url, { headers: { Authorization: AuthStr, contentType: 'application/octet-stream' }, responseType: 'arraybuffer' })
            .then(response => {
                return response.data;
            })
            .catch((error) => {
                console.log('error ' + error);
            });
    }

}

exports.Services = Services;