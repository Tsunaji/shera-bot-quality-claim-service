// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityTypes, CardFactory } = require('botbuilder');
const { ChoicePrompt, DialogSet, TextPrompt, AttachmentPrompt, WaterfallDialog } = require('botbuilder-dialogs');

// const Sequelize = require('sequelize');

const { MyMenu } = require('./MyMenu');
const menu = new MyMenu();

// const sequelize = new Sequelize('scm001', 'root', 'admin', {
//     dialect: 'mysql',
//     host: "localhost"
// });

// The accessor names for the conversation data and user profile state property accessors.
const DIALOG_STATE_PROPERTY = 'dialogState';
const CONVERSATION_DATA_PROPERTY = 'conversationData';
const USER_PROFILE_PROPERTY = 'userProfile';

const GET_CLAIM = 'get_claim';
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
const CHOICE_SUBMIT_PROMPT = 'choice_submit_prompt';

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

            const user = await this.userProfile.get(prompt.context, {});

            if (prompt.recognized.succeeded) {

                if (prompt.recognized.value === '15') {
                    user.customerName = 'ทดสอบ เลิศวสิน (2002)	';
                    user.customerAddress = 'ทดสอบ เลขที่ 141/3 หมู่ที่ 7 ตำบล หนองป่าครั่ง อำเภอ เมืองเชียงใหม่ จังหวัด เชียงใหม่ รหัสไปรษณีย์ 50000 ประเทศ Thailand';
                    return true;
                } else if (prompt.recognized.value === '6') {
                    user.customerName = 'ทดสอบ เลิศวสิน (2002)	';
                    user.customerAddress = 'ทดสอบ เลขที่ 29/1 ถนน วังสิงห์คำ ตำบล ช้างม่อย อำเภอ เมืองเชียงใหม่ จังหวัด เชียงใหม่ รหัสไปรษณีย์ 50300 ประเทศ Thailand';
                    return true;
                } else if (!isNaN(prompt.recognized.value)) {
                    user.customerName = 'ทดสอบ xxxxx';
                    user.customerAddress = 'ทดสอบ yyyyy';
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
        this.dialogs.add(new ChoicePrompt(CHOICE_SUBMIT_PROMPT));
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
            this.promptForImages.bind(this),
            this.summaryClaim.bind(this),
            this.submitClaim.bind(this)
        ]));
    }

    async setCustomer(value) {
        this.customer = value;
    }

    // step 1
    async promptForSapId(step) {
        console.log(this.customer);
        await step.context.sendActivity(`ระหว่างกระบวณการแจ้งเคลม ท่านสามารถพิมพ์ "ยกเลิก" เพื่อยกเลิกการแจ้งเคลมได้ค่ะ`);
        return await step.prompt(SAP_ID_PROMPT,
            {
                prompt: 'ขอทราบ รหัสลูกค้าใน SAP ของร้านค้าหลักค่ะ',
                retryPrompt: 'ขอโทษค่ะ ไม่มีรหัสลูกค้านี้ในระบบ กรุณาระบุรหัสลูกค้าใหม่อีกครั้งค่ะ'
            });
    }

    // step 2
    async promptForSubCustName(step) {
        const user = await this.userProfile.get(step.context, {});
        user.sapId = step.result;
        await this.userProfile.set(step.context, user);
        return await step.prompt(SUB_CUST_NAME_PROMPT, `ขอทราบ ชื่อร้านค้าย่อย ค่ะ`);
    }

    // step 3
    async promptForContactName(step) {
        const user = await this.userProfile.get(step.context, {});
        user.subCustName = step.result;
        await this.userProfile.set(step.context, user);
        return await step.prompt(CONTACT_NAME_PROMPT, `ขอทราบ ชื่อผู้ติดต่อ ค่ะ (เจ้าของบ้าน/เจ้าของร้าน/ผู้รับเหมา)`);
    }

    // step 4
    async promptForPhone(step) {
        const user = await this.userProfile.get(step.context, {});
        user.contactName = step.result;
        await this.userProfile.set(step.context, user);
        return await step.prompt(PHONE_PROMPT, `ขอทราบ เบอร์ติดต่อ ค่ะ`);
    }

    // step 5
    async promptForProblemAddress(step) {
        const user = await this.userProfile.get(step.context, {});
        user.phone = step.result;
        await this.userProfile.set(step.context, user);
        return await step.prompt(PROBLEM_ADDRESS_PROMPT, `ขอทราบ ที่อยู่ร้าน ที่เกิดปัญหาค่ะ`);
    }

    // step 6
    async promptForProduct(step) {
        const user = await this.userProfile.get(step.context, {});
        user.problemAddress = step.result;
        await this.userProfile.set(step.context, user);
        await step.context.sendActivity({ attachments: [menu.productsMenu()] });
        return await step.prompt(PRODUCT_PROMPT);
    }

    // step 7
    async promptForSize(step) {
        const user = await this.userProfile.get(step.context, {});
        user.product = step.result;
        await this.userProfile.set(step.context, user);
        return await step.prompt(SIZE_PROMPT, `ขอทราบ ขนาดของสินค้า ที่ต้องการจะเคลมค่ะ`);
    }

    // step 8
    async promptForColor(step) {
        const user = await this.userProfile.get(step.context, {});
        user.size = step.result;
        await this.userProfile.set(step.context, user);
        return await step.prompt(QTY_PROMPT, `ขอทราบ สีของสินค้า ที่ต้องการจะเคลมค่ะ`);
    }

    // step 9
    async promptForQty(step) {
        const user = await this.userProfile.get(step.context, {});
        user.color = step.result;
        await this.userProfile.set(step.context, user);
        return await step.prompt(QTY_PROMPT, `ขอทราบ จำนวนสินค้า ที่ต้องการจะเคลมค่ะ`);
    }

    // step 10
    async promptForWhenInstall(step) {
        const user = await this.userProfile.get(step.context, {});
        user.qty = step.result;
        await this.userProfile.set(step.context, user);
        await step.context.sendActivity({ attachments: [menu.whenInstallMenu()] });
        return await step.prompt(WHEN_INSTALL_PROMPT);
    }

    // step 11
    async promptForProblem(step) {
        const user = await this.userProfile.get(step.context, {});
        user.whenInstall = step.result;
        await this.userProfile.set(step.context, user);

        if (user.product === 'เฌอร่า') {
            if (user.whenInstall === 'ก่อนติดตั้ง') {
                await step.context.sendActivity(menu.sheraBeforeInstallProblemMenu());
            } else {
                await step.context.sendActivity(menu.sheraAfterInstallProblemMenu());
            }
        } else {
            if (user.whenInstall === 'ก่อนติดตั้ง') {
                await step.context.sendActivity(menu.lwrBeforeInstallProblemMenu());
            } else {
                await step.context.sendActivity(menu.lwrAfterInstallProblemMenu());
            }
        }

        return await step.prompt(PROBLEM_PROMPT);
    }

    // step 12
    async promptForImages(step) {
        const user = await this.userProfile.get(step.context, {});
        user.problem = step.result;
        await this.userProfile.set(step.context, user);
        return await step.prompt(IMAGES_PROMPT,
            {
                prompt: 'กรุณาอัพโหลดรูปภาพ เพื่อประกอบการแจ้งเคลมค่ะ (ถ้าต้องการอัพโหลดหลายรูป กรุณาเลือกรูปทั้งหมด แล้วกดส่งข้อความค่ะ)',
                retryPrompt: 'ขอโทษค่ะ จำเป็นต้องใช้รูปภาพเพื่อประกอบการแจ้งเคลม กรุณาอัพโหลดรูปภาพใหม่อีกครั้งค่ะ'
            }
        );
    }

    // step 13
    async summaryClaim(step) {
        const user = await this.userProfile.get(step.context, {});
        user.images = step.result;
        await this.userProfile.set(step.context, user);
        await step.context.sendActivity({
            text: 'สรุปรายการแจ้งเคลมคุณภาพ',
            attachments: [CardFactory.adaptiveCard(menu.summaryMenu(user))]
        });

        const attachmentsImages = [];

        if (user.images.length > 0) {
            console.log(user);
            console.log(user.images);
            for (var i in user.images) {
                if (user.images[i].contentType.match("image/")) {
                    var obj = {};
                    // obj.name = user.images[i].name;
                    obj.contentType = user.images[i].contentType;
                    obj.contentUrl = user.images[i].contentUrl;
                    attachmentsImages.push(obj);
                }
            }
        }

        await step.context.sendActivity({
            attachments: attachmentsImages
        });
        await step.prompt(CHOICE_SUBMIT_PROMPT, 'ยืนยันการทำรายการหรือไม่ ?', ['yes', 'no']);
    }

    // step 14
    async submitClaim(step) {
        const user = await this.userProfile.get(step.context, {});
        if (step.result && step.result.value === 'yes') {
            await step.context.sendActivity(`เราได้ส่งข้อมูลการแจ้งเคลมคุณภาพให้แล้วค่ะ`);
            menu.sendMail(user);
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

            const connector = turnContext.adapter.createConnectorClient(turnContext.activity.serviceUrl);

            console.log(connector);

            console.log(turnContext.activity.attachments);
            console.log(turnContext.activity.attachmentsImages);
            console.log(turnContext.activity.AttachmentPrompt);

            if (utterance === 'ยกเลิก') {
                if (dc.activeDialog) {
                    await dc.cancelAllDialogs();
                    await dc.context.sendActivity(`ยกเลิกแล้วค่ะ`);
                    await dc.context.sendActivity({ attachments: [menu.mainMenu()] });
                } else {
                    await dc.context.sendActivity(`ไม่มีอะไรให้ยกเลิกค่ะ`);
                    await dc.context.sendActivity({ attachments: [menu.mainMenu()] });
                }
            } else if (utterance === 'เมนูหลัก') {
                await dc.context.sendActivity({ attachments: [menu.mainMenu()] });
            } else if (utterance === 'ติดต่อเจ้าหน้าที่') {
                await dc.context.sendActivity(`ติดต่อที่เบอร์โทร 02-289-9888`);
            } else if (utterance === 'แจ้งเคลมคุณภาพ') {
                if (dc.activeDialog) {
                    await dc.cancelAllDialogs();
                    console.log("Cancel current dialog and start new claim.")
                }
                await dc.beginDialog(GET_CLAIM);
            } else if (utterance === 'ถอย') {
                await dc.repromptDialog();
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