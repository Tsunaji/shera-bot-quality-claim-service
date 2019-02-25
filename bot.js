// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityTypes, CardFactory } = require('botbuilder');
const { ChoicePrompt, DialogSet, TextPrompt, AttachmentPrompt, WaterfallDialog } = require('botbuilder-dialogs');
const path = require('path');
const fs = require('fs');

// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('scm001', 'root', 'admin', {
//     dialect: 'mysql',
//     host: "localhost"
// });

const { MyMenu } = require('./MyMenu');
const { Helpers } = require('./Helpers');
const { Services } = require('./Services');

const menu = new MyMenu();

// The accessor names for the conversation data and user profile state property accessors.
const DIALOG_STATE_PROPERTY = 'dialogState';
const CONVERSATION_DATA_PROPERTY = 'conversationData';
const USER_PROFILE_PROPERTY = 'userProfile';

const GET_CLAIM = 'get_claim';
const REPEAT_SUB_CUST_NAME = 'repeat_sub_cust_name';
const REPEAT_CONTACT_NAME = 'repeat_contact_name';
const REPEAT_PHONE = 'repeat_phone';
const REPEAT_PROBLEM_ADDRESS = 'repeat_problem_address';
const REPEAT_PRODUCT = 'repeat_product';
const REPEAT_SIZE = 'repeat_size';
const REPEAT_COLOR = 'repeat_color';
const REPEAT_QTY = 'repeat_qty';
const REPEAT_WHEN_INSTALL = 'repeat_when_install';
const REPEAT_PROBLEM = 'repeat_problem';
const REPEAT_IMAGES = 'repeat_images';

const SAP_ID_PROMPT = 'sap_id_prompt';
const SUB_CUST_NAME_PROMPT = 'sub_cust_name_propmt';
const CONTACT_NAME_PROMPT = 'contact_name_promt';
const PHONE_PROMPT = 'phone_promt';
const PROBLEM_ADDRESS_PROMPT = 'problem_address_promt';
const PRODUCT_PROMPT = 'product_promt';
const SIZE_PROMPT = 'size_promt';
const COLOR_PROMPT = 'color_promt';
const QTY_PROMPT = 'qty_promt';
const WHEN_INSTALL_PROMPT = 'when_install_promt';
const PROBLEM_PROMPT = 'problem_promt';
const IMAGES_PROMPT = 'images_prompt';
const CHOICE_PROMPT = 'choice_prompt';

const MAIN_MENU = "เมนูหลัก";
const CALL_CENTER = "ติดต่อเจ้าหน้าที่";
const QUALITY_CLAIM = "เคลมคุณภาพ"
const BEFORE_INSTALL = "ก่อนติดตั้ง";
const AFTER_INSTALL = "หลังติดตั้ง";
const OK = 'ตกลง';
const CANCEL = 'ยกเลิก';
const EDIT = 'แก้ไข';
const YES = 'ใช่';
const NO = 'ไม่';

const claimInfo = {};

class MyBot {

    /**
     *
     * @param {ConversationState} conversationState property accessor
     * @param {UserState} userState property accessor
     */
    constructor(conversationState, userState) {

        if (!conversationState) throw new Error('Missing parameter.  conversationState is required');
        if (!userState) throw new Error('Missing parameter.  userState is required');

        // The state management objects for the conversation and user state.
        this.conversationState = conversationState;
        this.userState = userState;

        // Create the state property accessors for the conversation data and user profile.
        this.conversationData = conversationState.createProperty(CONVERSATION_DATA_PROPERTY);
        this.userProfile = userState.createProperty(USER_PROFILE_PROPERTY);

        this.dialogState = this.conversationState.createProperty(DIALOG_STATE_PROPERTY);
        this.dialogs = new DialogSet(this.dialogState);

        // this.customer = [];

        // sequelize.query("SELECT * FROM vehicle where vehicleId = 35", { raw: true }).then(myTableRows => {
        //     // console.log(myTableRows);
        //     this.setCustomer(myTableRows);
        // })

        // Add prompts that will be used by the main dialogs.
        this.dialogs.add(new TextPrompt(SAP_ID_PROMPT, async (prompt) => {

            if (prompt.recognized.succeeded) {

                if (prompt.recognized.value === '15') {
                    claimInfo.customerName = 'ทดสอบ เลิศวสิน (2002)';
                    claimInfo.customerAddress = 'ทดสอบ เลขที่ 141/3 หมู่ที่ 7 ตำบล หนองป่าครั่ง อำเภอ เมืองเชียงใหม่ จังหวัด เชียงใหม่ รหัสไปรษณีย์ 50000';
                    return true;
                } else if (prompt.recognized.value === '6') {
                    claimInfo.customerName = 'ทดสอบ ตั้งเล่งเฮง';
                    claimInfo.customerAddress = 'ทดสอบ เลขที่ 29/1 ถนน วังสิงห์คำ ตำบล ช้างม่อย อำเภอ เมืองเชียงใหม่ จังหวัด เชียงใหม่ รหัสไปรษณีย์ 50300';
                    return true;
                } else if (prompt.recognized.value === '60') {
                    claimInfo.customerName = 'ทดสอบ ปากน้ำโพเคหะภัณฑ์';
                    claimInfo.customerAddress = 'ทดสอบ เลขที่ 112/2 ถนน สวรรค์วิถี ตำบล ปากน้ำโพ อำเภอ เมือง จังหวัด นครสวรรค์ รหัสไปรษณีย์ 60000';
                    return true;
                } else if (!isNaN(prompt.recognized.value)) {
                    claimInfo.customerName = 'ทดสอบ xxxxx';
                    claimInfo.customerAddress = 'ทดสอบ yyyyy';
                    return true;
                }

            }
            return false;

        }));
        this.dialogs.add(new TextPrompt(SUB_CUST_NAME_PROMPT));
        this.dialogs.add(new TextPrompt(CONTACT_NAME_PROMPT));
        this.dialogs.add(new TextPrompt(PHONE_PROMPT));
        this.dialogs.add(new TextPrompt(PROBLEM_ADDRESS_PROMPT));
        this.dialogs.add(new TextPrompt(PRODUCT_PROMPT));
        this.dialogs.add(new TextPrompt(SIZE_PROMPT));
        this.dialogs.add(new TextPrompt(COLOR_PROMPT));
        this.dialogs.add(new TextPrompt(QTY_PROMPT));
        this.dialogs.add(new TextPrompt(WHEN_INSTALL_PROMPT));
        this.dialogs.add(new TextPrompt(PROBLEM_PROMPT));
        this.dialogs.add(new ChoicePrompt(CHOICE_PROMPT));
        this.dialogs.add(new AttachmentPrompt(IMAGES_PROMPT));

        // Create a dialog that asks the user for their claim data.
        this.dialogs.add(new WaterfallDialog(GET_CLAIM, [
            this.promptForSapId.bind(this),
            this.promptForSubCustName.bind(this),
            this.promptForContactName.bind(this),
            this.promptForPhone.bind(this),
            this.promptForProblemAddress.bind(this),
            this.promptForProduct.bind(this),
            this.promptForSize.bind(this),
            this.promptForColor.bind(this),
            this.promptForQty.bind(this),
            this.promptForWhenInstall.bind(this),
            this.promptForProblem.bind(this),
            this.promptConfirmForm.bind(this),
            this.promptForImages.bind(this),
            this.promptConfirmImages.bind(this),
            this.summaryClaim.bind(this),
            this.submitClaim.bind(this)
        ]));

        this.dialogs.add(new WaterfallDialog(REPEAT_SUB_CUST_NAME, [
            this.promptForSubCustName.bind(this),
            this.promptForContactName.bind(this),
            this.promptForPhone.bind(this),
            this.promptForProblemAddress.bind(this),
            this.promptForProduct.bind(this),
            this.promptForSize.bind(this),
            this.promptForColor.bind(this),
            this.promptForQty.bind(this),
            this.promptForWhenInstall.bind(this),
            this.promptForProblem.bind(this),
            this.promptConfirmForm.bind(this),
            this.promptForImages.bind(this),
            this.promptConfirmImages.bind(this),
            this.summaryClaim.bind(this),
            this.submitClaim.bind(this)
        ]));

        this.dialogs.add(new WaterfallDialog(REPEAT_CONTACT_NAME, [
            this.promptForContactName.bind(this),
            this.promptForPhone.bind(this),
            this.promptForProblemAddress.bind(this),
            this.promptForProduct.bind(this),
            this.promptForSize.bind(this),
            this.promptForColor.bind(this),
            this.promptForQty.bind(this),
            this.promptForWhenInstall.bind(this),
            this.promptForProblem.bind(this),
            this.promptConfirmForm.bind(this),
            this.promptForImages.bind(this),
            this.promptConfirmImages.bind(this),
            this.summaryClaim.bind(this),
            this.submitClaim.bind(this)
        ]));

        this.dialogs.add(new WaterfallDialog(REPEAT_PHONE, [
            this.promptForPhone.bind(this),
            this.promptForProblemAddress.bind(this),
            this.promptForProduct.bind(this),
            this.promptForSize.bind(this),
            this.promptForColor.bind(this),
            this.promptForQty.bind(this),
            this.promptForWhenInstall.bind(this),
            this.promptForProblem.bind(this),
            this.promptConfirmForm.bind(this),
            this.promptForImages.bind(this),
            this.promptConfirmImages.bind(this),
            this.summaryClaim.bind(this),
            this.submitClaim.bind(this)
        ]));

        this.dialogs.add(new WaterfallDialog(REPEAT_PROBLEM_ADDRESS, [
            this.promptForProblemAddress.bind(this),
            this.promptForProduct.bind(this),
            this.promptForSize.bind(this),
            this.promptForColor.bind(this),
            this.promptForQty.bind(this),
            this.promptForWhenInstall.bind(this),
            this.promptForProblem.bind(this),
            this.promptConfirmForm.bind(this),
            this.promptForImages.bind(this),
            this.promptConfirmImages.bind(this),
            this.summaryClaim.bind(this),
            this.submitClaim.bind(this)
        ]));

        this.dialogs.add(new WaterfallDialog(REPEAT_PRODUCT, [
            this.promptForProduct.bind(this),
            this.promptForSize.bind(this),
            this.promptForColor.bind(this),
            this.promptForQty.bind(this),
            this.promptForWhenInstall.bind(this),
            this.promptForProblem.bind(this),
            this.promptConfirmForm.bind(this),
            this.promptForImages.bind(this),
            this.promptConfirmImages.bind(this),
            this.summaryClaim.bind(this),
            this.submitClaim.bind(this)
        ]));

        this.dialogs.add(new WaterfallDialog(REPEAT_SIZE, [
            this.promptForSize.bind(this),
            this.promptForColor.bind(this),
            this.promptForQty.bind(this),
            this.promptForWhenInstall.bind(this),
            this.promptForProblem.bind(this),
            this.promptConfirmForm.bind(this),
            this.promptForImages.bind(this),
            this.promptConfirmImages.bind(this),
            this.summaryClaim.bind(this),
            this.submitClaim.bind(this)
        ]));

        this.dialogs.add(new WaterfallDialog(REPEAT_COLOR, [
            this.promptForColor.bind(this),
            this.promptForQty.bind(this),
            this.promptForWhenInstall.bind(this),
            this.promptForProblem.bind(this),
            this.promptConfirmForm.bind(this),
            this.promptForImages.bind(this),
            this.promptConfirmImages.bind(this),
            this.summaryClaim.bind(this),
            this.submitClaim.bind(this)
        ]));

        this.dialogs.add(new WaterfallDialog(REPEAT_QTY, [
            this.promptForQty.bind(this),
            this.promptForWhenInstall.bind(this),
            this.promptForProblem.bind(this),
            this.promptConfirmForm.bind(this),
            this.promptForImages.bind(this),
            this.promptConfirmImages.bind(this),
            this.summaryClaim.bind(this),
            this.submitClaim.bind(this)
        ]));

        this.dialogs.add(new WaterfallDialog(REPEAT_WHEN_INSTALL, [
            this.promptForWhenInstall.bind(this),
            this.promptForProblem.bind(this),
            this.promptConfirmForm.bind(this),
            this.promptForImages.bind(this),
            this.promptConfirmImages.bind(this),
            this.summaryClaim.bind(this),
            this.submitClaim.bind(this)
        ]));

        this.dialogs.add(new WaterfallDialog(REPEAT_PROBLEM, [
            this.promptForProblem.bind(this),
            this.promptConfirmForm.bind(this),
            this.promptForImages.bind(this),
            this.promptConfirmImages.bind(this),
            this.summaryClaim.bind(this),
            this.submitClaim.bind(this)
        ]));

        this.dialogs.add(new WaterfallDialog(REPEAT_IMAGES, [
            this.promptForImages.bind(this),
            this.promptConfirmImages.bind(this),
            this.summaryClaim.bind(this),
            this.submitClaim.bind(this)
        ]));
    }

    // step 1
    async promptForSapId(step) {
        await step.context.sendActivity(`ระหว่างกระบวณการแจ้งเคลม ท่านสามารถพิมพ์ "แก้ไข" เพื่อแก้ไขข้อมูลก่อนหน้า`);
        await step.context.sendActivity(`และพิมพ์ "ยกเลิก" เพื่อยกเลิกการแจ้งเคลมได้ค่ะ`);
        return await step.prompt(SAP_ID_PROMPT,
            {
                prompt: 'ขอทราบ รหัสลูกค้าใน SAP ของร้านค้าหลักค่ะ',
                retryPrompt: 'ขอโทษค่ะ ไม่มีรหัสลูกค้านี้ในระบบ กรุณาระบุรหัสลูกค้าใหม่อีกครั้งค่ะ'
            });
    }

    // step 2
    async promptForSubCustName(step) {
        claimInfo.sapId = step.result;
        await step.context.sendActivity(`ชื่อร้านค้าหลักคือ ` + claimInfo.customerName);
        await step.context.sendActivity(`ที่อยู่ของร้านค้าหลักคือ ` + claimInfo.customerAddress);

        return await step.prompt(SUB_CUST_NAME_PROMPT, `ขอทราบ ชื่อร้านค้าย่อย ค่ะ`);
    }

    // step 3
    async promptForContactName(step) {
        if (step.result === EDIT) {
            return await step.replaceDialog(GET_CLAIM, claimInfo);
        } else {
            claimInfo.subCustName = step.result;
            return await step.prompt(CONTACT_NAME_PROMPT, `ขอทราบ ชื่อลูกค้า ค่ะ (เจ้าของบ้าน/เจ้าของร้าน/ผู้รับเหมา)`);
        }
    }

    // step 4
    async promptForPhone(step) {
        if (step.result === EDIT) {
            return await step.replaceDialog(REPEAT_SUB_CUST_NAME, claimInfo);
        } else {
            claimInfo.contactName = step.result;
            return await step.prompt(PHONE_PROMPT, `ขอทราบ เบอร์ติดต่อ ค่ะ`);
        }
    }

    // step 5
    async promptForProblemAddress(step) {
        if (step.result === EDIT) {
            return await step.replaceDialog(REPEAT_CONTACT_NAME, claimInfo);
        } else {
            claimInfo.phone = step.result;
            return await step.prompt(PROBLEM_ADDRESS_PROMPT, `ขอทราบ ที่อยู่ร้าน ที่เกิดปัญหาค่ะ`);
        }
    }

    // step 6
    async promptForProduct(step) {
        if (step.result === EDIT) {
            return await step.replaceDialog(REPEAT_PHONE, claimInfo);
        } else {
            claimInfo.problemAddress = step.result;
            await step.context.sendActivity({ attachments: [menu.productsMenu()] });
            return await step.prompt(PRODUCT_PROMPT);
        }
    }

    // step 7
    async promptForSize(step) {
        if (step.result === EDIT) {
            return await step.replaceDialog(REPEAT_PROBLEM_ADDRESS, claimInfo);
        } else {
            claimInfo.product = step.result;
            return await step.prompt(SIZE_PROMPT, `ขอทราบ ขนาดของสินค้า ที่ต้องการจะเคลมค่ะ`);
        }
    }

    // step 8
    async promptForColor(step) {
        if (step.result === EDIT) {
            return await step.replaceDialog(REPEAT_PRODUCT, claimInfo);
        } else {
            claimInfo.size = step.result;
            return await step.prompt(QTY_PROMPT, `ขอทราบ สีและลายของสินค้า ที่ต้องการจะเคลมค่ะ`);
        }
    }

    // step 9
    async promptForQty(step) {
        if (step.result === EDIT) {
            return await step.replaceDialog(REPEAT_SIZE, claimInfo);
        } else {
            claimInfo.color = step.result;
            return await step.prompt(QTY_PROMPT, `ขอทราบ จำนวนสินค้า ที่ต้องการจะเคลมค่ะ`);
        }
    }

    // step 10
    async promptForWhenInstall(step) {
        if (step.result === EDIT) {
            return await step.replaceDialog(REPEAT_COLOR, claimInfo);
        } else {
            claimInfo.qty = step.result;
            await step.context.sendActivity({ attachments: [menu.whenInstallMenu()] });
            return await step.prompt(WHEN_INSTALL_PROMPT);
        }
    }

    // step 11
    async promptForProblem(step) {
        if (step.result === EDIT) {
            return await step.replaceDialog(REPEAT_QTY, claimInfo);
        } else {
            claimInfo.whenInstall = step.result;
            if (claimInfo.product === 'เฌอร่า') {
                if (claimInfo.whenInstall === BEFORE_INSTALL) {
                    await step.context.sendActivity(menu.sheraBeforeInstallProblemMenu());
                } else {
                    await step.context.sendActivity(menu.sheraAfterInstallProblemMenu());
                }
            } else {
                if (claimInfo.whenInstall === AFTER_INSTALL) {
                    await step.context.sendActivity(menu.lwrBeforeInstallProblemMenu());
                } else {
                    await step.context.sendActivity(menu.lwrAfterInstallProblemMenu());
                }
            }
            return await step.prompt(PROBLEM_PROMPT);
        }
    }

    // step 12
    async promptConfirmForm(step) {

        if (step.result === EDIT) {
            return await step.replaceDialog(REPEAT_WHEN_INSTALL, claimInfo);
        } else {
            claimInfo.problem = step.result;

            //get informer name
            claimInfo.name = step.context.activity.from.name;

            await step.context.sendActivity({
                text: 'สรุปรายการแจ้งเคลมคุณภาพ',
                attachments: [CardFactory.adaptiveCard(menu.summaryMenu(claimInfo))]
            });

            return await step.prompt(CHOICE_PROMPT, 'ต้องการแก้ไขข้อมูลหรือไม่ ?', ['แก้ไข', 'ไม่แก้ไข']);
        }
    }

    // step 13
    async promptForImages(step) {
        if (step.result && step.result.value === EDIT) {
            return await step.replaceDialog(REPEAT_PROBLEM, claimInfo);
        } else {
            return await step.prompt(IMAGES_PROMPT,
                {
                    prompt: 'กรุณาอัพโหลดรูปภาพ เพื่อประกอบการแจ้งเคลมค่ะ (ถ้าต้องการอัพโหลดหลายรูป กรุณาเลือกรูปทั้งหมด แล้วกดส่งข้อความค่ะ)',
                    retryPrompt: 'ขอโทษค่ะ จำเป็นต้องใช้รูปภาพเพื่อประกอบการแจ้งเคลม กรุณาอัพโหลดรูปภาพใหม่อีกครั้งค่ะ'
                }
            );
        }
    }

    // step 14
    async promptConfirmImages(step) {
        claimInfo.images = step.result;

        const attachmentsImages = [];

        if (claimInfo.images.length > 0) {

            await step.context.sendActivity(`สรุปรายการรูปภาพที่คุณอัพโหลด`);

            const services = new Services();

            for (var i in claimInfo.images) {
                if (claimInfo.images[i].contentType.match("image")) {
                    if (step.context.activity.channelId === 'skype' || step.context.activity.channelId === 'msteams') {

                        const contentUrl = claimInfo.images[i].contentUrl;
                        const imageData = await services.getAuthenImage(step.context, contentUrl);
                        const base64Image = Buffer.from(imageData).toString('base64');

                        var obj = {};
                        obj.contentType = 'image/png';
                        obj.contentUrl = `data:image/png;base64,${base64Image}`
                        attachmentsImages.push(obj);
                    } else {
                        var obj = {};
                        obj.contentType = claimInfo.images[i].contentType;
                        obj.contentUrl = claimInfo.images[i].contentUrl;
                        attachmentsImages.push(obj);
                    }
                }
            }
            claimInfo.images = attachmentsImages;
        }

        await step.context.sendActivity({
            attachments: claimInfo.images
        });

        return await step.prompt(CHOICE_PROMPT, 'ยืนยันการอัพโหลดรูปภาพ ?', ['ใช่', 'ไม่']);
    }

    // step 15
    async summaryClaim(step) {

        if (step.result && step.result.value === YES) {
            return await step.prompt(CHOICE_PROMPT, 'ยืนยันการทำรายการหรือไม่ ?', ['ใช่', 'ไม่']);
        } else {
            return await step.replaceDialog(REPEAT_IMAGES, claimInfo);
        }
    }

    // step 16
    async submitClaim(step) {
        if (step.result && step.result.value === YES) {
            //send mail to callcenter
            const helpers = new Helpers();
            helpers.sendMail(claimInfo);

            await step.context.sendActivity(`เราได้ส่งข้อมูลการแจ้งเคลมคุณภาพให้แล้วค่ะ`);
            await step.context.sendActivity({ attachments: [menu.mainMenu()] });
        } else {
            await step.context.sendActivity(`ยกเลิกการแจ้งเคลมให้แล้วค่ะ`);
            await step.context.sendActivity({ attachments: [menu.mainMenu()] });
        }
        return await step.endDialog();
    }

    /**
     *
     * @param {TurnContext} turnContext turn context object.
     */
    async onTurn(turnContext) {
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        if (turnContext.activity.type === ActivityTypes.Message) {

            // Create a dialog context object.
            const dc = await this.dialogs.createContext(turnContext);

            const utterance = (turnContext.activity.text || '').trim().toLowerCase();
            console.log("utterance = " + utterance);

            if (utterance === CANCEL) {
                if (dc.activeDialog) {
                    await dc.cancelAllDialogs();
                    await dc.context.sendActivity(`ยกเลิกแล้วค่ะ`);
                    await dc.context.sendActivity({ attachments: [menu.mainMenu()] });
                } else {
                    await dc.context.sendActivity(`ไม่มีอะไรให้ยกเลิกค่ะ`);
                    await dc.context.sendActivity({ attachments: [menu.mainMenu()] });
                }
            } else if (utterance === MAIN_MENU) {
                await dc.context.sendActivity({ attachments: [menu.mainMenu()] });
            } else if (utterance === CALL_CENTER) {
                await dc.context.sendActivity(`ติดต่อที่เบอร์โทร 02-289-9888`);
            } else if (utterance === QUALITY_CLAIM) {
                if (dc.activeDialog) {
                    await dc.cancelAllDialogs();
                    console.log("Cancel current dialog and start new claim.")
                }
                await dc.beginDialog(GET_CLAIM);
            }

            // Start the sample dialog in response to any other input.
            if (!turnContext.responded) {
                if (dc.activeDialog) {
                    // If the bot has not yet responded, continue processing the current dialog.
                    await dc.continueDialog();
                }
                else {
                    await dc.context.sendActivity(`สวัสดีค่ะ มีอะไรให้ช่วยเหลือ ลองเลือกในเมนูข้างล่างได้เลยค่ะ`);
                    await dc.context.sendActivity({ attachments: [menu.mainMenu()] });
                }
            }

            // Save state changes
            await this.userState.saveChanges(turnContext);

            // End this turn by saving changes to the conversation state.
            await this.conversationState.saveChanges(turnContext);
        } else if (turnContext.activity.type === ActivityTypes.ConversationUpdate) {
            // Send greeting when users are added to the conversation.
            await this.sendWelcomeMessage(turnContext);
        } else {
            // Generic message for all other activities
            await turnContext.sendActivity(`[${turnContext.activity.type} event detected]`);
        }
    }

    // Sends welcome messages to conversation members when they join the conversation.
    // Messages are only sent to conversation members who aren't the bot.
    async sendWelcomeMessage(turnContext) {
        // If any new membmers added to the conversation
        if (turnContext.activity && turnContext.activity.membersAdded) {
            // Define a promise that will welcome the user
            async function welcomeUserFunc(conversationMember) {
                // Greet anyone that was not the target (recipient) of this message.
                // The bot is the recipient of all events from the channel, including all ConversationUpdate-type activities
                // turnContext.activity.membersAdded !== turnContext.activity.aecipient.id indicates 
                // a user was added to the conversation 
                if (conversationMember.id === this.activity.recipient.id) {
                    // Because the TurnContext was bound to this function, the bot can call
                    // `TurnContext.sendActivity` via `this.sendActivity`;
                    await this.sendActivity({ attachments: [menu.mainMenu()] });
                }
            }

            // Prepare Promises to greet the  user.
            // The current TurnContext is bound so `replyForReceivedAttachments` can also send replies.
            const replyPromises = turnContext.activity.membersAdded.map(welcomeUserFunc.bind(turnContext));
            await Promise.all(replyPromises);
        }
    }
}

module.exports.MyBot = MyBot;