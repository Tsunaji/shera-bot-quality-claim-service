const { CardFactory, MessageFactory } = require('botbuilder');
const nodemailer = require('nodemailer');

const mailAuthenUser = 'botservice@shera.com';
const mailAuthenPass = 'Ak5CB2x47qBAsyHx';

class MyMenu {

    mainMenu() {
        return CardFactory.heroCard(
            'SHERA ยินดีต้อนรับสู่ บริการแจ้งเคลมคุณภาพ',
            'ท่านสามารถเลือกบริการที่ท่านต้องการทราบได้จากเมนูด้านล่างนี้ '
            + 'ในระหว่างการสนทนาสามารถพิมพ์ "ยกเลิก" เพื่อเริ่มการสนทนาใหม่ได้ตลอดเวลา',
            ['http://www.shera.com/assets/images/th/shared/logo.png'],
            ['แจ้งเคลมคุณภาพ', 'ติดต่อเจ้าหน้าที่']
        );
    }

    summaryMenu(user) {
        return {
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "version": "1.0",
            "type": "AdaptiveCard",
            "body": [
                {
                    "type": "ColumnSet",
                    "separator": true,
                    "columns": [
                        {
                            "type": "Column",
                            "width": 2,
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": "รหัสร้านค้าหลัก"
                                },
                                {
                                    "type": "TextBlock",
                                    "text": "ชื่อร้านค้าหลัก"
                                },
                                {
                                    "type": "TextBlock",
                                    "text": "ที่อยู่ร้านค้า"
                                },
                                {
                                    "type": "TextBlock",
                                    "text": "ชื่อร้านค้าย่อย"
                                },
                                {
                                    "type": "TextBlock",
                                    "text": "ชื่อผู้ติดต่อ"
                                },
                                {
                                    "type": "TextBlock",
                                    "text": "เบอร์ติดต่อ"
                                },
                                {
                                    "type": "TextBlock",
                                    "text": "ที่อยู่ลูกค้าที่เกิดปัญหา"
                                },
                                {
                                    "type": "TextBlock",
                                    "text": "ผลิตภัณฑ์"
                                },
                                {
                                    "type": "TextBlock",
                                    "text": "ขนาด"
                                },
                                {
                                    "type": "TextBlock",
                                    "text": "สี"
                                },
                                {
                                    "type": "TextBlock",
                                    "text": "จำนวน"
                                },
                                {
                                    "type": "TextBlock",
                                    "text": "ปัญหาที่เกิด"
                                }
                            ]
                        },
                        {
                            "type": "Column",
                            "width": 3,
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": user.sapId,
                                    "isSubtle": true
                                },
                                {
                                    "type": "TextBlock",
                                    "text": user.customerName,
                                    "isSubtle": true
                                },
                                {
                                    "type": "TextBlock",
                                    "text": user.customerAddress,
                                    "isSubtle": true
                                },
                                {
                                    "type": "TextBlock",
                                    "text": user.subCustName,
                                    "isSubtle": true
                                },
                                {
                                    "type": "TextBlock",
                                    "text": user.contactName,
                                    "isSubtle": true
                                },
                                {
                                    "type": "TextBlock",
                                    "text": user.phone,
                                    "isSubtle": true
                                },
                                {
                                    "type": "TextBlock",
                                    "text": user.problemAddress,
                                    "isSubtle": true
                                },
                                {
                                    "type": "TextBlock",
                                    "text": user.product,
                                    "isSubtle": true
                                },
                                {
                                    "type": "TextBlock",
                                    "text": user.size,
                                    "isSubtle": true
                                },
                                {
                                    "type": "TextBlock",
                                    "text": user.color,
                                    "isSubtle": true
                                },
                                {
                                    "type": "TextBlock",
                                    "text": user.qty,
                                    "isSubtle": true
                                },
                                {
                                    "type": "TextBlock",
                                    "text": user.problem + " เกิด" + user.whenInstall,
                                    "isSubtle": true
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }

    productsMenu() {
        return CardFactory.heroCard(
            'กรุณาเลือกรายการชนิดสินค้าค่ะ',
            '',
            [],
            ['ลอนคู่', 'ไตรลอน', 'แกรนาดา', 'แม็กมา', 'ชิงเกิล', 'สเลท', 'เฌอร่า']
        );
    }

    whenInstallMenu() {
        return CardFactory.heroCard(
            'กรุณาเลือกช่วงที่สินค้าเกิดปัญหาค่ะ',
            '',
            [],
            ['ก่อนติดตั้ง', 'หลังติดตั้ง']
        );
    }

    lwrBeforeInstallProblemMenu() {
        return MessageFactory.carousel(
            [
                CardFactory.heroCard(
                    'ลอนคู่',
                    '',
                    [],
                    ['แตกบิ่น/แตกร้าว/เปราะ', 'สีซีดจาง', 'คราบขาว', 'ขนาดไม่ได้มาตรฐาน', 'จำนวนไม่ครบ']
                ),
                CardFactory.heroCard(
                    'ไตรลอน',
                    '',
                    [],
                    ['แตกบิ่น/แตกร้าว/เปราะ', 'สีซีดจาง', 'คราบขาว', 'ขนาดไม่ได้มาตรฐาน', 'จำนวนไม่ครบ']
                ),
                CardFactory.heroCard(
                    'ครอบลอนคู่ & ไตรลอน',
                    '',
                    [],
                    ['แตกบิ่น/แตกร้าว/เปราะ', 'สีซีดจาง', 'คราบขาว', 'จำนวนไม่ครบ']
                )
            ], 'กรุณาเลือกรายการปัญหาของผลิตภัณฑ์ LWR ก่อนการติดตั้งค่ะ')
    }

    lwrAfterInstallProblemMenu() {
        return MessageFactory.carousel(
            [
                CardFactory.heroCard(
                    'ลอนคู่',
                    '',
                    [],
                    ['แตกบิ่น/แตกร้าว', 'สีซีดจาง', 'คราบขาว', 'มุงแล้วรั่วซึม', 'ฉ่ำน้ำ', 'โก่งตัว']
                ),
                CardFactory.heroCard(
                    'ไตรลอน',
                    '',
                    [],
                    ['แตกบิ่น/แตกร้าว', 'สีซีดจาง', 'คราบขาว', 'มุงแล้วรั่วซึม', 'ฉ่ำน้ำ', 'โก่งตัว']
                ),
                CardFactory.heroCard(
                    'ครอบลอนคู่ & ไตรลอน',
                    '',
                    [],
                    ['แตกบิ่น/แตกร้าว', 'สีซีดจาง', 'คราบขาว', 'มุงแล้วรั่วซึม']
                )
            ], 'กรุณาเลือกรายการปัญหาของผลิตภัณฑ์ LWR หลังการติดตั้งค่ะ')
    }

    sheraBeforeInstallProblemMenu() {
        return MessageFactory.carousel(
            [
                CardFactory.heroCard(
                    'ไม้ฝา',
                    '',
                    [],
                    ['แตกหัก/แตกร้าว', 'สีเพี้ยน/สีซีด/สีด่าง', 'ขนาดไม่ได้มาตรฐาน', 'คราบน้ำ', 'ลายไม่ชัดเจน', 'สินค้าไม่แข็งแรง', 'บิดเบี้ยว', 'ตำหนิผิดหน้า', 'จำนวนไม่ครบ']
                ),
                CardFactory.heroCard(
                    'ไม้พื้น',
                    '',
                    [],
                    ['แตกหัก/แตกร้าว', 'สีเพี้ยน/สีซีด/สีด่าง', 'ขนาดไม่ได้มาตรฐาน', 'คราบน้ำ', 'ลายไม่ชัดเจน', 'สินค้าไม่แข็งแรง', 'บิดเบี้ยว', 'ตำหนิผิดหน้า', 'จำนวนไม่ครบ']
                ),
                CardFactory.heroCard(
                    'ไม้ระแนง',
                    '',
                    [],
                    ['แตกหัก/แตกร้าว', 'สีเพี้ยน/สีซีด/สีด่าง', 'ขนาดไม่ได้มาตรฐาน', 'คราบน้ำ', 'ลายไม่ชัดเจน', 'สินค้าไม่แข็งแรง', 'บิดเบี้ยว', 'ตำหนิผิดหน้า', 'จำนวนไม่ครบ']
                ),
                CardFactory.heroCard(
                    'ไม้รั้ว',
                    '',
                    [],
                    ['แตกหัก/แตกร้าว', 'สีเพี้ยน/สีซีด/สีด่าง', 'ขนาดไม่ได้มาตรฐาน', 'คราบน้ำ', 'ลายไม่ชัดเจน', 'สินค้าไม่แข็งแรง', 'บิดเบี้ยว', 'ตำหนิผิดหน้า', 'จำนวนไม่ครบ']
                ),
                CardFactory.heroCard(
                    'เชิงชาย',
                    '',
                    [],
                    ['แตกหัก/แตกร้าว', 'สีเพี้ยน/สีซีด/สีด่าง', 'ขนาดไม่ได้มาตรฐาน', 'คราบน้ำ', 'สินค้าไม่แข็งแรง', 'บิดเบี้ยว', 'ตำหนิผิดหน้า', 'จำนวนไม่ครบ']
                ),
                CardFactory.heroCard(
                    'บอร์ด',
                    '',
                    [],
                    ['แตกหัก/แตกร้าว', 'ขนาดไม่ได้มาตรฐาน', 'คราบน้ำ', 'สินค้าไม่แข็งแรง', 'บิดเบี้ยว', 'ตำหนิผิดหน้า', 'จำนวนไม่ครบ']
                ),
                CardFactory.heroCard(
                    'บอร์ดลาย',
                    '',
                    [],
                    ['แตกหัก/แตกร้าว', 'ขนาดไม่ได้มาตรฐาน', 'คราบน้ำ', 'ลายไม่ชัดเจน', 'สินค้าไม่แข็งแรง', 'บิดเบี้ยว', 'ตำหนิผิดหน้า', 'จำนวนไม่ครบ']
                ),
                CardFactory.heroCard(
                    'แผ่นลายฉลุ',
                    '',
                    [],
                    ['แตกหัก/แตกร้าว', 'ขนาดไม่ได้มาตรฐาน', 'คราบน้ำ', 'ลายไม่ชัดเจน', 'สินค้าไม่แข็งแรง', 'บิดเบี้ยว', 'ตำหนิผิดหน้า', 'จำนวนไม่ครบ']
                )
            ], 'กรุณาเลือกรายการปัญหาของผลิตภัณฑ์ SHERA ก่อนการติดตั้งค่ะ')
    }

    sheraAfterInstallProblemMenu() {
        return MessageFactory.carousel(
            [
                CardFactory.heroCard(
                    'ไม้ฝา',
                    '',
                    [],
                    ['แตกหัก/แตกร้าว', 'สีเพี้ยน/สีซีด/สีด่าง', 'ขนาดไม่ได้มาตรฐาน', 'ลายไม่ชัดเจน', 'สินค้าไม่แข็งแรง', 'ติดตั้งแล้วแอ่น']
                ),
                CardFactory.heroCard(
                    'ไม้พื้น',
                    '',
                    [],
                    ['แตกหัก/แตกร้าว', 'สีเพี้ยน/สีซีด/สีด่าง', 'ขนาดไม่ได้มาตรฐาน', 'ลายไม่ชัดเจน', 'สินค้าไม่แข็งแรง']
                ),
                CardFactory.heroCard(
                    'ไม้ระแนง',
                    '',
                    [],
                    ['แตกหัก/แตกร้าว', 'สีเพี้ยน/สีซีด/สีด่าง', 'ขนาดไม่ได้มาตรฐาน', 'ลายไม่ชัดเจน', 'สินค้าไม่แข็งแรง', 'ติดตั้งแล้วแอ่น']
                ),
                CardFactory.heroCard(
                    'ไม้รั้ว',
                    '',
                    [],
                    ['แตกหัก/แตกร้าว', 'สีเพี้ยน/สีซีด/สีด่าง', 'ขนาดไม่ได้มาตรฐาน', 'ลายไม่ชัดเจน', 'สินค้าไม่แข็งแรง', 'ติดตั้งแล้วแอ่น']
                ),
                CardFactory.heroCard(
                    'เชิงชาย',
                    '',
                    [],
                    ['แตกหัก/แตกร้าว', 'สีเพี้ยน/สีซีด/สีด่าง', 'ขนาดไม่ได้มาตรฐาน', 'สินค้าไม่แข็งแรง', 'ติดตั้งแล้วแอ่น']
                ),
                CardFactory.heroCard(
                    'บอร์ด',
                    '',
                    [],
                    ['แตกหัก/แตกร้าว', 'ขนาดไม่ได้มาตรฐาน', 'สินค้าไม่แข็งแรง']
                ),
                CardFactory.heroCard(
                    'บอร์ดลาย',
                    '',
                    [],
                    ['แตกหัก/แตกร้าว', 'ขนาดไม่ได้มาตรฐาน', 'ลายไม่ชัดเจน', 'สินค้าไม่แข็งแรง']
                ),
                CardFactory.heroCard(
                    'แผ่นลายฉลุ',
                    '',
                    [],
                    ['แตกหัก/แตกร้าว', 'ขนาดไม่ได้มาตรฐาน', 'ลายไม่ชัดเจน', 'สินค้าไม่แข็งแรง']
                )
            ], 'กรุณาเลือกรายการปัญหาของผลิตภัณฑ์ SHERA หลังการติดตั้งค่ะ')
    }

    cancelButton() {
        return CardFactory.heroCard(
            '',
            '',
            [],
            ['ยกเลิก']
        );
    }

    menuButton() {
        return CardFactory.heroCard(
            '',
            '',
            [],
            ['เมนูหลัก']
        );
    }

    sendMail(user) {
        const message = "รหัสร้านค้าหลัก: " + user.sapId + "\n"
            + "ชื่อร้านค้าหลัก: " + user.customerName + "\n"
            + "ที่อยู่ร้านค้า: " + user.customerAddress + "\n"
            + "ชื่อร้านค้าย่อย: " + user.subCustName + "\n"
            + "ชื่อผุ้ติดต่อ: " + user.contactName + "\n"
            + "เบอร์ติดต่อ: " + user.phone + "\n"
            + "ที่อยู่ลูกค้าที่เกิดปัญหา: " + user.problemAddress + "\n"
            + "ชนิดผลิตภัณฑ์: " + user.product + "\n"
            + "ขนาดผลิตภัณฑ์: " + user.size + "\n"
            + "สีผลิตภัณฑ์: " + user.color + "\n"
            + "จำนวนสินค้าที่มีปัญหา: " + user.qty + "\n"
            + "ปัญหาที่เกิด: " + user.problem + " เกิด" + user.whenInstall;

        const attachmentsImages = [];

        if (user.images.length > 0) {
            for (var i in user.images) {
                if (user.images[i].contentType.match("image")) {
                    var obj = {};
                    // obj.filename = user.images[i].name;
                    obj.contentType = user.images[i].contentType;
                    obj.path = user.images[i].contentUrl;
                    attachmentsImages.push(obj);
                }
            }
        }

        var transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: mailAuthenUser,
                pass: mailAuthenPass
            }
        });

        var mailOptions = {
            from: 'botservice@shera.com',
            to: 'crmclaim@shera.com',
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

module.exports.MyMenu = MyMenu;