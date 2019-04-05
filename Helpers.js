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

        const message = "ชื่อผู้แจ้ง : " + user.name + "\n"
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
            + "ข้อมูลเพิ่มเติม: " + user.moreInformation;

        const attachmentsImages = [];

        if (user.images.length > 0) {
            for (var i in user.images) {
                var obj = {};
                obj.contentType = user.images[i].contentType;
                obj.path = user.images[i].contentUrl;
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

}

exports.Helpers = Helpers;