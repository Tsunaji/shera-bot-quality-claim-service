const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

class Helpers {

    async sendMail(user) {

        const mailHost = process.env.MAIL_HOST || process.env.APPSETTING_MAIL_HOST;
        const mailAuthenUser = process.env.MAIL_AUTHEN_USER || process.env.APPSETTING_MAIL_AUTHEN_USER;
        const mailAuthenPass = process.env.MAIL_AUTHEN_PASSWORD || process.env.APPSETTING_MAIL_AUTHEN_PASSWORD;
        const mailFrom = process.env.MAIL_FROM || process.env.APPSETTING_MAIL_FROM;
        const mailTo = process.env.MAIL_TO || process.env.APPSETTING_MAIL_TO;
        const mailCC = user.email !== undefined ? user.email : '';

        const message = "ชื่อผู้แจ้ง: " + user.name + "\n"
            + "อีเมลผู้แจ้ง: " + user.email + "\n"
            + "รหัสร้านค้าหลัก: " + user.sapId + "\n"
            + "ชื่อร้านค้าหลัก: " + user.customerName + "\n"
            + "ที่อยู่ร้านค้า: " + user.customerAddress + "\n"
            + "ชื่อร้านค้าย่อย: " + user.subCustName + "\n"
            + "ชื่อผุ้ติดต่อ: " + user.contactName + "\n"
            + "เบอร์ติดต่อ: " + user.phone + "\n"
            + "ที่อยู่ลูกค้าที่เกิดปัญหา: " + user.problemAddress + "\n"
            + "ชนิดผลิตภัณฑ์: " + user.division + " " + user.product + "\n"
            + "ขนาดผลิตภัณฑ์: " + user.size + "\n"
            + "สีผลิตภัณฑ์: " + user.color + "\n"
            + "จำนวนสินค้าที่มีปัญหา: " + user.qty + "\n"
            + "ปัญหาที่เกิด: " + user.problem + " เกิด" + user.whenInstall + "\n"
            + "ข้อมูลเพิ่มเติม: " + user.moreInformation + "\n"
            + "แจ้งผ่าน: Chatbot";

        const attachmentsImages = [];

        if (user.imagesResult.length > 0) {
            for (var i in user.imagesResult) {
                var obj = {};
                obj.contentType = user.imagesResult[i].contentType;
                obj.path = user.imagesResult[i].contentUrl;
                attachmentsImages.push(obj);
            }
        }

        var transporter = nodemailer.createTransport({
            host: mailHost,
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: mailAuthenUser,
                pass: mailAuthenPass
            }
        });

        var mailOptions = {
            from: mailFrom,
            to: mailTo,
            subject: 'CRM new case quality claim from ' + user.customerName,
            text: message,
            cc: mailCC,
            attachments: attachmentsImages
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }

    async sendMailTest(user) {
        const mailHost = process.env.MAIL_HOST || process.env.APPSETTING_MAIL_HOST;
        const mailAuthenUser = process.env.MAIL_AUTHEN_USER || process.env.APPSETTING_MAIL_AUTHEN_USER;
        const mailAuthenPass = process.env.MAIL_AUTHEN_PASSWORD || process.env.APPSETTING_MAIL_AUTHEN_PASSWORD;
        const mailFrom = process.env.MAIL_FROM || process.env.APPSETTING_MAIL_FROM;
        // const mailTo = process.env.MAIL_TO || process.env.APPSETTING_MAIL_TO;
        const mailTo = 'jirasak_ka@shera.com; rungroj_r@shera.com';
        const mailCC = user.profile.email !== undefined ? user.profile.email : '';

        const message = "Sales name: " + user.profile.name + "\n"
            + "Sales email: " + user.profile.email + "\n"
            + "Distributor code: " + user.claimInterInfo.distributorCode + "\n"
            + "Distributor name: " + user.claimInterInfo.distributorName + "\n"
            + "Distributor address: " + user.claimInterInfo.distributorAddress + "\n"
            + "Retailer name: " + user.claimInterInfo.retailerName + "\n"
            + "The name of the contact person: " + user.claimInterInfo.nameOfContactPerson + "\n"
            + "Telephone number: " + user.claimInterInfo.telephoneNumber + "\n"
            + "Customer address: " + user.claimInterInfo.customerAddress + "\n"
            + "Division: " + user.claimInterInfo.division + "\n"
            + "Product name: " + user.claimInterInfo.productName + "\n"
            + "Product group: " + user.claimInterInfo.productGroup + "\n"
            + "Product size: " + user.claimInterInfo.productSize + "\n"
            + "Product color: " + user.claimInterInfo.productColor + "\n"
            + "Batch number: " + user.claimInterInfo.batchNo + "\n"
            + "Invoice / SO number: " + user.claimInterInfo.invoiceSoNumber + "\n"
            + "Defect problem: " + user.claimInterInfo.defectProblem + "\n"
            + "QTY of defect: " + user.claimInterInfo.qtyOfDefect + "\n"
            + "QTY in sale order: " + user.claimInterInfo.qtyInSaleOrder + "\n"
            + "Claim cost: " + user.claimInterInfo.claimCost + "\n"
            + "Before or After Installation problem: " + user.claimInterInfo.beforeOrAfterInstalltaionProblem + "\n"
            + "Remarks: " + user.claimInterInfo.remarks + "\n"
            + "Channel: Chatbot";

        // reobject name for mail lib
        let attachmentsImages = [];

        if (user.claimInterInfo.imagesResult.length > 0) {
            for (var i in user.claimInterInfo.imagesResult) {
                var obj = {};
                obj.filename = user.claimInterInfo.imagesResult[i].name;
                obj.contentType = user.claimInterInfo.imagesResult[i].contentType;
                obj.path = user.claimInterInfo.imagesResult[i].contentUrl;
                attachmentsImages.push(obj);
            }
        }

        var transporter = nodemailer.createTransport({
            host: mailHost,
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: mailAuthenUser,
                pass: mailAuthenPass
            }
        });

        var mailOptions = {
            from: mailFrom,
            to: mailTo,
            subject: '(TEST) CRM new case quality claim inter from ' + user.claimInterInfo.distributorName,
            text: message,
            cc: mailCC,
            attachments: attachmentsImages
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }

    async sendMailBeforeInter(user) {
        const mailHost = process.env.MAIL_HOST || process.env.APPSETTING_MAIL_HOST;
        const mailAuthenUser = process.env.MAIL_AUTHEN_USER || process.env.APPSETTING_MAIL_AUTHEN_USER;
        const mailAuthenPass = process.env.MAIL_AUTHEN_PASSWORD || process.env.APPSETTING_MAIL_AUTHEN_PASSWORD;
        const mailFrom = process.env.MAIL_FROM || process.env.APPSETTING_MAIL_FROM;
        // const mailTo = `callcenter@shera.com; crmclaim_factory@shera.com`
        // let mailCC = user.profile.email !== undefined ? user.profile.email : '';
        // const salesAreaMail = this.getSalesAreaMail(user);
        // mailCC = mailCC + `; ${salesAreaMail}; naiyana_p@shera.com`
        const mailTo = 'jirasak_ka@shera.com; rungroj_r@shera.com';
        const mailCC = user.profile.email !== undefined ? user.profile.email : '';

        const message = "Sales name: " + user.profile.name + "\n"
            + "Sales email: " + user.profile.email + "\n"
            + "Distributor code: " + user.claimInterInfo.distributorCode + "\n"
            + "Distributor name: " + user.claimInterInfo.distributorName + "\n"
            + "Distributor address: " + user.claimInterInfo.distributorAddress + "\n"
            + "Retailer name: " + user.claimInterInfo.retailerName + "\n"
            + "The name of the contact person: " + user.claimInterInfo.nameOfContactPerson + "\n"
            + "Telephone number: " + user.claimInterInfo.telephoneNumber + "\n"
            + "Customer address: " + user.claimInterInfo.customerAddress + "\n"
            + "Division: " + user.claimInterInfo.division + "\n"
            + "Product name: " + user.claimInterInfo.productName + "\n"
            + "Product group: " + user.claimInterInfo.productGroup + "\n"
            + "Product size: " + user.claimInterInfo.productSize + "\n"
            + "Product color: " + user.claimInterInfo.productColor + "\n"
            + "Batch number: " + user.claimInterInfo.batchNo + "\n"
            + "Invoice / SO number: " + user.claimInterInfo.invoiceSoNumber + "\n"
            + "Defect problem: " + user.claimInterInfo.defectProblem + "\n"
            + "QTY of defect: " + user.claimInterInfo.qtyOfDefect + "\n"
            + "QTY in sale order: " + user.claimInterInfo.qtyInSaleOrder + "\n"
            + "Claim cost: " + user.claimInterInfo.claimCost + "\n"
            + "Before or After Installation problem: " + user.claimInterInfo.beforeOrAfterInstalltaionProblem + "\n"
            + "Remarks: " + user.claimInterInfo.remarks + "\n"
            + "Channel: Chatbot";

        // reobject name for mail lib
        const attachmentsImages = this.getAttachmentForNodemailer(user);

        var transporter = nodemailer.createTransport({
            host: mailHost,
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: mailAuthenUser,
                pass: mailAuthenPass
            }
        });

        var mailOptions = {
            from: mailFrom,
            to: mailTo,
            subject: `CRM new case quality claim inter ${user.salesArea} from ` + user.claimInterInfo.distributorName,
            text: message,
            cc: mailCC,
            attachments: attachmentsImages
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }

    async sendMailAfterInter(user) {
        const mailHost = process.env.MAIL_HOST || process.env.APPSETTING_MAIL_HOST;
        const mailAuthenUser = process.env.MAIL_AUTHEN_USER || process.env.APPSETTING_MAIL_AUTHEN_USER;
        const mailAuthenPass = process.env.MAIL_AUTHEN_PASSWORD || process.env.APPSETTING_MAIL_AUTHEN_PASSWORD;
        const mailFrom = process.env.MAIL_FROM || process.env.APPSETTING_MAIL_FROM;
        // const mailTo = `callcenter@shera.com; crmclaim_factory@shera.com`
        // let mailCC = user.profile.email !== undefined ? user.profile.email : '';
        // const salesAreaMail = this.getSalesAreaMail(user);
        // mailCC = mailCC + `; ${salesAreaMail}; naiyana_p@shera.com`
        const mailTo = 'jirasak_ka@shera.com; rungroj_r@shera.com';
        const mailCC = user.profile.email !== undefined ? user.profile.email : '';

        const message = "Sales name: " + user.profile.name + "\n"
            + "Sales email: " + user.profile.email + "\n"
            + "Distributor code: " + user.claimInterInfo.distributorCode + "\n"
            + "Distributor name: " + user.claimInterInfo.distributorName + "\n"
            + "Distributor address: " + user.claimInterInfo.distributorAddress + "\n"
            + "Retailer name: " + user.claimInterInfo.retailerName + "\n"
            + "The name of the contact person: " + user.claimInterInfo.nameOfContactPerson + "\n"
            + "Telephone number: " + user.claimInterInfo.telephoneNumber + "\n"
            + "Customer address: " + user.claimInterInfo.customerAddress + "\n"
            + "Division: " + user.claimInterInfo.division + "\n"
            + "Product name: " + user.claimInterInfo.productName + "\n"
            + "Product group: " + user.claimInterInfo.productGroup + "\n"
            + "Product size: " + user.claimInterInfo.productSize + "\n"
            + "Product color: " + user.claimInterInfo.productColor + "\n"
            + "Batch number: " + user.claimInterInfo.batchNo + "\n"
            + "Invoice / SO number: " + user.claimInterInfo.invoiceSoNumber + "\n"
            + "Defect problem: " + user.claimInterInfo.defectProblem + "\n"
            + "QTY of defect: " + user.claimInterInfo.qtyOfDefect + "\n"
            + "QTY in sale order: " + user.claimInterInfo.qtyInSaleOrder + "\n"
            + "Claim cost: " + user.claimInterInfo.claimCost + "\n"
            + "Before or After Installation problem: " + user.claimInterInfo.beforeOrAfterInstalltaionProblem + "\n"
            + "The Installation method: " + user.claimInterInfo.afterInstallationProblem.installationMethod + "\n"
            + "The equipment / tooling / Accessary: " + user.claimInterInfo.afterInstallationProblem.equipmentType + "\n"
            + "Weather / Environment during installation: " + user.claimInterInfo.afterInstallationProblem.environmentInstallation + "\n"
            + "When the problem occurred after installed: " + user.claimInterInfo.afterInstallationProblem.whenInstallationProblem + "\n"
            + "How to keep the Finished goods before or during installation: " + user.claimInterInfo.afterInstallationProblem.keepFinishedGoods + "\n"
            + "Environment around using area or installation area: " + user.claimInterInfo.afterInstallationProblem.installationArea + "\n"
            + "Remarks: " + user.claimInterInfo.remarks + "\n"
            + "Channel: Chatbot";

        // reobject name for mail lib
        const attachmentsImages = this.getAttachmentForNodemailer(user);

        var transporter = nodemailer.createTransport({
            host: mailHost,
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: mailAuthenUser,
                pass: mailAuthenPass
            }
        });

        var mailOptions = {
            from: mailFrom,
            to: mailTo,
            subject: `CRM new case quality claim inter ${user.salesArea} from ` + user.claimInterInfo.distributorName,
            text: message,
            cc: mailCC,
            attachments: attachmentsImages
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }

    getSalesAreaMail(user) {
        let salesAreaMail = '';

        switch (user.salesArea) {
            case 'A2': {
                salesAreaMail = 'crmclaim_a2@shera.com';
            }
            case 'A3': {
                salesAreaMail = 'crmclaim_a3@shera.com';
            }
            case 'A4': {
                salesAreaMail = 'crmclaim_a4@shera.com';
            }
        }

        return salesAreaMail;
    }

    getAttachmentForNodemailer(user) {
        let attachmentsImages = [];

        if (user.claimInterInfo.imagesResult.length > 0) {
            for (var i in user.claimInterInfo.imagesResult) {
                var obj = {};
                obj.filename = user.claimInterInfo.imagesResult[i].name;
                obj.contentType = user.claimInterInfo.imagesResult[i].contentType;
                obj.path = user.claimInterInfo.imagesResult[i].contentUrl;
                attachmentsImages.push(obj);
            }
        }

        return attachmentsImages;
    }

}

exports.Helpers = Helpers;