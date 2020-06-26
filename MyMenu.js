const { CardFactory, ActionTypes } = require('botbuilder');
const path = require('path');
const fs = require('fs');

class MyMenu {

    productsInfo() {
        return [
            {
                name: "LWR",
                product: [
                    "Accessories",
                    "Barge",
                    "Conner Press",
                    "Corroshield",
                    "Ridge",
                    "RT 3.3 MM",
                    "RT 4 MM",
                    "RT 5 MM",
                    "RT 6 MM",
                    "Small Corrugated",
                    "TrilonL-G",
                    "Trilon 5 MM",
                    "Trilon 6 MM",
                    "Trilon Lite"
                ],
                problem: {
                    before_installing: [
                        "แตกร้าว/บิ่น/เปราะ",
                        "ปริใต้ท้อง",
                        "โก่งตัว/บิดงอ",
                        "สีซีดจาง/สีด่าง/สีไม่เหมือน-เพี้ยน",
                        "คราบขาว",
                        "หนา-บาง/ไม่ได้ขนาด",
                        "ตำหนิผิดหน้า/รอยขูดขีด",
                        "สินค้าขาด/ไม่ครบจำนวน",
                        "สินค้าผิด/สี-ขนาด-ลายไม่ตรงกับที่สั่ง",
                        "สภาพ Packaging ไม่เรียบร้อย",
                        "สภาพสินค้าเก่า/ไม่พร้อมใช้งาน"
                    ],
                    after_installing: [
                        "แตกร้าว/รั่วซึม/เปราะ",
                        "ฉ่ำน้ำ/คล้ำน้ำ",
                        "โก่งตัว/บิดงอ",
                        "ติดตั้งไม่ได้แนว",
                        "สีซีดจาง/สีด่าง/สีไม่เหมือน-เพี้ยน",
                        "สีหลุดล่อน-ลอก",
                        "คราบขาว",
                        "หนา-บาง/ไม่ได้ขนาด",
                        "ตำหนิผิดหน้า/รอยขูดขีด"
                    ]
                }
            },
            {
                name: "Villa Roof",
                product: [
                    "Accessories",
                    "Barge",
                    "Granada",
                    "Log Ridge",
                    "Magma",
                    "Mini C Slate",
                    "Mini U Slate",
                    "Mini V Slate",
                    "Ridge",
                    "Shingle",
                    "U Slate",
                    "Zedar",
                    "V Slate"
                ],
                problem: {
                    before_installing: [
                        "แตกร้าว/บิ่น/เปราะ",
                        "ขอเกี่ยวระแนงร่วน",
                        "โก่งตัว/บิดงอ",
                        "สีซีดจาง/สีด่าง/สีไม่เหมือน-เพี้ยน",
                        "คราบขาว",
                        "หนา-บาง/ไม่ได้ขนาด",
                        "ตำหนิผิดหน้า/รอยขูดขีด",
                        "สินค้าขาด/ไม่ครบจำนวด",
                        "สินค้าผิด/สี-ขนาด-ลายไม่ตรงกับที่สั่ง",
                        "สภาพ Packaging ไม่เรียบร้อย",
                        "สภาพสินค้าเก่า/ไม่พร้อมใช้งาน"
                    ],
                    after_installing: [
                        "แตกร้าว/รั่วซึม/เปราะ",
                        "ฉ่ำน้ำ/คล้ำน้ำ",
                        "ขอเกี่ยวระแนงร่วน",
                        "โก่งตัว/บิดงอ",
                        "ติดตั้งไม่ได้แนว",
                        "สีซีดจาง/สีด่าง/สีไม่เหมือน-เพี้ยน",
                        "สีหลุดล่อน-ลอก",
                        "คราบขาว",
                        "หนา-บาง/ไม่ได้ขนาด",
                        "ตำหนิผิวหน้า/รอยขูดขีด"
                    ]
                }
            },
            {
                name: "SHERA",
                product: [
                    "Accessories",
                    "Board - Ceiling",
                    "Board - Flooring",
                    "Board - Walling",
                    "Door",
                    "Infillwall",
                    "Ply",
                    "Trim",
                    "Wood"
                ],
                problem: {
                    before_installing: [
                        "แตกร้าว/บิ่น/เปราะ",
                        "โก่งตัว/บิดงอ",
                        "สีซีดจาง/สีด่าง/สีไม่เหมือน-เพี้ยน",
                        "ตำหนิผิวหน้า/รอยขูดขีด",
                        "คราบน้ำบนผิวหน้า",
                        "ลายไม่ชัด/ลายไม่เหมือน",
                        "หนา-บาง /ไม่ได้ขนาด",
                        "สินค้าขาด/ไม่ครบจำนวน",
                        "สินค้าผิด/สี-ขนาด-ลายไม่ตรงกับที่สั่ง",
                        "สภาพ Packaging ไม่เรียบร้อย",
                        "สภาพสินค้าเก่า/ไม่พร้อมใช้งาน"
                    ],
                    after_installing: [
                        "แตกร้าว/หัก/เปราะ",
                        "โก่งตัว/แอ่น/บิดเบี้ยว",
                        "ติดตั้งไม่ได้แนว-ระนาบ",
                        "สีซีดจาง/สีด่าง/สีไม่เหมือน-เพี้ยน",
                        "สีหลุดล่อน-ลอก",
                        "ตำหนิผิวหน้า/รอยขูดขีด",
                        "ลายไม่ชัด/ลายไม่เหมือน/ลายสึก",
                        "หนา-บาง /ไม่ได้ขนาด",
                        "สกรูปีกไม่สลัด/เจาะยึดไม่ได้"
                    ]
                }
            },
            {
                name: "SHERA Paint",
                product: [
                    "Bond",
                    "Fix",
                    "Paint"
                ],
                problem: {
                    before_installing: [
                        "แข็งตัว/ตกตะกอน/ใช้งานไม่ได้",
                        "เฉดสีเพี้ยนไม่ได้มาตรฐาน / สีไม่ตรงกับฉลาก",
                        "กระป๋องหรือบรรจุภัณฑ์ เสียหาย บุบ ฝาปิดหลุด",
                        "สินค้าขาด/ไม่ครบจำนวน"
                    ],
                    after_installing: [
                        "เฉดสีเพี้ยน/ไม่เหมือนกับผลิตภัณฑ์",
                        "สีลอกร่อน",
                        "กาวหลุดร่อน/ไม่ยึดติด"
                    ]
                }
            }
        ];
    }

    mainMenu() {

        const imageData = fs.readFileSync(path.join(__dirname, '/resources/logo_shera_web.png'));
        const base64Image = Buffer.from(imageData).toString('base64');

        const contentUrl = `data:image/png;base64,${base64Image}`;

        const buttons = [
            { type: ActionTypes.ImBack, title: 'Quality Claim', value: 'Quality Claim' },
            { type: ActionTypes.ImBack, title: 'Call Center', value: 'Call Center' },
            { type: ActionTypes.ImBack, title: 'Update Profile', value: 'Update Profile' }
        ];

        // not support line channel.
        // return CardFactory.heroCard(
        //     'SHERA CRM',
        //     'ยินดีต้อนรับสู่ บริการแจ้งเคลมคุณภาพ ท่านสามารถเลือกบริการตามรายการด้านล่างได้เลยค่ะ',
        //     [contentUrl],
        //     buttons
        // );

        return CardFactory.heroCard(
            'SHERA CRM',
            'Welcome to quality claim services by Chatbot',
            '',
            buttons
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
                                    "text": "ชื่อผู้แจ้ง"
                                },
                                {
                                    "type": "TextBlock",
                                    "text": "อีเมลผู้แจ้ง"
                                },
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
                                },
                                {
                                    "type": "TextBlock",
                                    "text": "ข้อมูลเพิ่มเติม"
                                }
                            ]
                        },
                        {
                            "type": "Column",
                            "width": 3,
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": user.name,
                                    "isSubtle": true
                                },
                                {
                                    "type": "TextBlock",
                                    "text": user.email,
                                    "isSubtle": true
                                },
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
                                    "text": user.division + " " + user.product,
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
                                },
                                {
                                    "type": "TextBlock",
                                    "text": user.moreInformation,
                                    "isSubtle": true
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }

    divisionMenu() {

        const data = this.productsInfo();

        const division = [];

        data.forEach(element => {
            division.push(element.name);
        });

        return CardFactory.heroCard(
            'Please select Division.',
            '',
            [],
            division
        )

    }

    productsMenu(division) {

        const data = this.productsInfo();

        const products = [];

        data.forEach(element => {
            if (division === element.name) {
                element.product.forEach(element => {
                    products.push(element)
                });
            }
        });

        return CardFactory.heroCard(
            `Please select product of ${division}.`,
            '',
            [],
            products
        )

    }

    problemMenu(division, whenInstall) {

        const data = this.productsInfo();

        const problems = [];

        data.forEach(element => {
            if (division === element.name) {
                if (whenInstall === "ก่อนติดตั้ง") {
                    element.problem.before_installing.forEach(element => {
                        problems.push(element);
                    });
                } else if (whenInstall === "หลังติดตั้ง") {
                    element.problem.after_installing.forEach(element => {
                        problems.push(element);
                    });
                }
            }
        });

        return CardFactory.heroCard(
            `กรุณาเลือกรายการปัญหาของผลิตภัณฑ์ ${division} ที่เกิด${whenInstall}`,
            '',
            [],
            problems
        )
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
}

module.exports.MyMenu = MyMenu;