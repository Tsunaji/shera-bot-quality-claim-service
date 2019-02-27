// var mysql = require('mysql');
const Sequelize = require('sequelize');

class MyConnection {

    async mySQLConnect() {
        const sequelize = new Sequelize('digitals_shera', 'THAZRD1002@thazrd1002', '+$\)a53&Wq:f4@CS7/]`UZ=MsyntG?-G', {
            dialect: 'mysql',
            host: "thazrd1002.mysql.database.azure.com"
        });
        return sequelize;
    }

}

exports.MyConnection = MyConnection;