const axios = require('axios');
const querystring = require('querystring');
const Sequelize = require('sequelize');
const mysql = require('mysql');
const { MyConnection } = require('./MyConnection');
const path = require('path');
const fs = require('fs');

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

    async getCustomerById(id) {

        // var config =
        // {
        //     host: 'thazrd1002.mysql.database.azure.com',
        //     user: 'THAZRD1002@thazrd1002',
        //     password: '+$\)a53&Wq:f4@CS7/]`UZ=MsyntG?-G',
        //     database: 'digitals_shera',
        //     port: 3306,
        //     ssl: true
        // };

        // var config =
        // {
        //     host: "thazrd1002.mysql.database.azure.com",
        //     user: "THAZRD1002@thazrd1002",
        //     password: "+$\)a53&Wq:f4@CS7/]`UZ=MsyntG?-G",
        //     database: "digitals_shera",
        //     port: 3306,
        //     ssl:
        //     {
        //         ca: fs.readFileSync(path.join(__dirname, '/BaltimoreCyberTrustRoot.crt.pem'))
        //     }
        // };

        // var config =
        // {
        //     host: 'localhost',
        //     user: 'root',
        //     password: 'admin',
        //     database: 'scm001',
        //     port: 3306,
        //     ssl: true
        // };

        // const conn = new mysql.createConnection(config);

        // conn.connect(
        //     function (err) {
        //         if (err) {
        //             console.log("!!! Cannot connect !!! Error:");
        //             console.error(err);
        //             // throw err;
        //         }
        //         else {
        //             console.log("Connection established.");
        //             // queryDatabase();
        //         }
        //     });

        const sequelize = new Sequelize('digitals_shera', 'THAZRD1002@thazrd1002', '+$\)a53&Wq:f4@CS7/]`UZ=MsyntG?-G', {
            dialect: 'mysql',
            host: "thazrd1002.mysql.database.azure.com",
            dialectOptions: {
                ssl: {
                    ca: fs.readFileSync(__dirname + '/BaltimoreCyberTrustRoot.crt.pem')
                }
            }
        });

        sequelize.query("SELECT count(*) FROM customer_info", { raw: true }).then(myTableRows => {
            console.log(myTableRows);
        })
    }
}

exports.Services = Services;