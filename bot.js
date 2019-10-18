// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityTypes, CardFactory } = require('botbuilder');
const { ChoicePrompt, DialogSet, TextPrompt, AttachmentPrompt, WaterfallDialog } = require('botbuilder-dialogs');
const empty = require('is-empty');

const { MyMenu } = require('./MyMenu');
const { Helpers } = require('./Helpers');
const { Services } = require('./Services');

const menu = new MyMenu();
const services = new Services();

// The accessor names for the conversation data and user profile state property accessors.
const DIALOG_STATE_PROPERTY = 'dialogState';
const CONVERSATION_DATA_PROPERTY = 'conversationData';
const USER_PROFILE_PROPERTY = 'userProfile';

//waterfall flow
const GET_CLAIM = 'get_claim';
const GET_PROFILE = 'get_profile';
const REPEAT_SUB_CUST_NAME = 'repeat_sub_cust_name';
const REPEAT_CONTACT_NAME = 'repeat_contact_name';
const REPEAT_PHONE = 'repeat_phone';
const REPEAT_PROBLEM_ADDRESS = 'repeat_problem_address';
const REPEAT_DIVISON = 'repeat_division';
const REPEAT_PRODUCT = 'repeat_product';
const REPEAT_SIZE = 'repeat_size';
const REPEAT_COLOR = 'repeat_color';
const REPEAT_QTY = 'repeat_qty';
const REPEAT_WHEN_INSTALL = 'repeat_when_install';
const REPEAT_PROBLEM = 'repeat_problem';
const REPEAT_MORE_INFORMATION = 'repeat_more_information';
const REPEAT_IMAGES = 'repeat_images';

//prompt dialog
const SAP_ID_PROMPT = 'sap_id_prompt';
const SUB_CUST_NAME_PROMPT = 'sub_cust_name_propmt';
const CONTACT_NAME_PROMPT = 'contact_name_promt';
const PHONE_PROMPT = 'phone_promt';
const PROBLEM_ADDRESS_PROMPT = 'problem_address_promt';
const DIVISION_PROMPT = 'division_prompt';
const PRODUCT_PROMPT = 'product_promt';
const SIZE_PROMPT = 'size_promt';
const COLOR_PROMPT = 'color_promt';
const QTY_PROMPT = 'qty_promt';
const WHEN_INSTALL_PROMPT = 'when_install_promt';
const PROBLEM_PROMPT = 'problem_promt';
const IMAGES_PROMPT = 'images_prompt';
const MORE_INFORMATION_PROMPT = 'more_information_prompt';
const USER_NAME_PROMPT = 'user_name';
const USER_EMAIL_PROMPT = 'user_email';
const CHOICE_PROMPT = 'choice_prompt';

//menu text
const MAIN_MENU = "เมนูหลัก";
const CALL_CENTER = "ติดต่อเจ้าหน้าที่";
const QUALITY_CLAIM = "เคลมคุณภาพ"
const UPDATE_PROFILE = "อัพเดทโปรไฟล์";
const CANCEL = 'ยกเลิก';
const EDIT = 'แก้ไข';
const YES = 'ใช่';
const NO = 'ไม่';
const BEFORE_INSTALL = 'ก่อนติดตั้ง';
const AFTER_INSTALL = 'หลังติดตั้ง';

//response text
const CALL_CENTER_RESPONSE = "ติดต่อที่เบอร์โทร 02-289-9888";
const CANCEL_RESPONSE = 'ยกเลิกให้แล้วค่ะ';
const CANCEL_NOTHING = 'ไม่มีอะไรให้ยกเลิกค่ะ';
const TEXT_NOTHING_MATCH = "สวัสดีค่ะ มีอะไรให้ช่วยเหลือ ลองเลือกในเมนูข้างล่างได้เลยค่ะ";
const ADD_PROFILE_BEFORE_CLAIM = "สวัสดีค่ะ กรุณาบันทึกโปรไฟล์ ชื่อและอีเมล ก่อนการแจ้งเคลมตามขั้นตอนด้วยค่ะ";
const MSTEAMS_RESPONSE = `แจ้งเคลมผ่าน Microsoft Teams อยู่ในระหว่างการปรับปรุง` +
    ` กรุณาแจ้งเคลมไปที่ Line ของ Callcenter หรือโทร 02-289-9888 ขออภัยในความไม่สะดวก`;

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

        // Add prompts that will be used by the main dialogs.
        this.dialogs.add(new TextPrompt(SAP_ID_PROMPT, async (prompt) => {

            if (prompt.recognized.succeeded) {

                let id = prompt.recognized.value;

                //convert to string type if customer code not number
                if (isNaN(id)) {
                    id = "'" + id + "'";
                }

                const customerInfo = await services.getCustomerById(id);

                if (customerInfo.length > 0 && id !== 0) {
                    const user = await this.userProfile.get(prompt.context, {});
                    user.customerInfo = customerInfo;
                    await this.userProfile.set(prompt.context, user);
                    return true;
                }

            }
            return false;

        }));
        this.dialogs.add(new TextPrompt(SUB_CUST_NAME_PROMPT));
        this.dialogs.add(new TextPrompt(CONTACT_NAME_PROMPT));
        this.dialogs.add(new TextPrompt(PHONE_PROMPT));
        this.dialogs.add(new TextPrompt(PROBLEM_ADDRESS_PROMPT));
        this.dialogs.add(new TextPrompt(DIVISION_PROMPT, async (prompt) => {
            if (prompt.recognized.succeeded) {
                if (prompt.recognized.value === EDIT) {
                    return true;
                }
                const productInfo = menu.productsInfo();
                for (let i = 0; i < productInfo.length; i++) {
                    if (prompt.recognized.value === productInfo[i].name) {
                        return true;
                    }
                }
            }
            return false;
        }));
        this.dialogs.add(new TextPrompt(PRODUCT_PROMPT, async (prompt) => {
            if (prompt.recognized.succeeded) {
                if (prompt.recognized.value === EDIT) {
                    return true;
                }

                const productInfo = menu.productsInfo();
                const user = await this.userProfile.get(prompt.context, {});
                const division = user.division;

                for (let i = 0; i < productInfo.length; i++) {
                    if (division === productInfo[i].name) {
                        for (let j = 0; j < productInfo[i].product.length; j++) {
                            if (prompt.recognized.value === productInfo[i].product[j]) {
                                return true;
                            }
                        }
                    }
                }
            }
            return false;
        }));
        this.dialogs.add(new TextPrompt(SIZE_PROMPT));
        this.dialogs.add(new TextPrompt(COLOR_PROMPT));
        this.dialogs.add(new TextPrompt(QTY_PROMPT));
        this.dialogs.add(new ChoicePrompt(WHEN_INSTALL_PROMPT));
        this.dialogs.add(new TextPrompt(PROBLEM_PROMPT, async (prompt) => {
            if (prompt.recognized.succeeded) {
                if (prompt.recognized.value === EDIT) {
                    return true;
                }

                const productInfo = menu.productsInfo();
                const user = await this.userProfile.get(prompt.context, {});
                const division = user.division;
                const whenInstall = user.whenInstall;

                for (let i = 0; i < productInfo.length; i++) {
                    if (division === productInfo[i].name) {
                        if (whenInstall === BEFORE_INSTALL) {
                            for (let j = 0; j < productInfo[i].problem.before_installing.length; j++) {
                                if (prompt.recognized.value === productInfo[i].problem.before_installing[j]) {
                                    return true;
                                }
                            }
                        } else if (whenInstall === AFTER_INSTALL) {
                            for (let j = 0; j < productInfo[i].problem.after_installing.length; j++) {
                                if (prompt.recognized.value === productInfo[i].problem.after_installing[j]) {
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
            return false;
        }));
        this.dialogs.add(new TextPrompt(USER_NAME_PROMPT));
        this.dialogs.add(new TextPrompt(USER_EMAIL_PROMPT));
        this.dialogs.add(new TextPrompt(MORE_INFORMATION_PROMPT));
        this.dialogs.add(new ChoicePrompt(CHOICE_PROMPT));
        this.dialogs.add(new AttachmentPrompt(IMAGES_PROMPT));

        // Create a dialog that asks the user for their claim data.
        this.dialogs.add(new WaterfallDialog(GET_CLAIM, [
            this.promptForSapId.bind(this),
            this.promptForSubCustName.bind(this),
            this.promptForContactName.bind(this),
            this.promptForPhone.bind(this),
            this.promptForProblemAddress.bind(this),
            this.promptForDivision.bind(this),
            this.promptForProduct.bind(this),
            this.promptForSize.bind(this),
            this.promptForColor.bind(this),
            this.promptForQty.bind(this),
            this.promptForWhenInstall.bind(this),
            this.promptForProblem.bind(this),
            this.promptForMoreInformation.bind(this),
            this.promptConfirmForm.bind(this),
            this.promptForImages.bind(this),
            this.promptConfirmImages.bind(this),
            this.summaryClaim.bind(this),
            this.submitClaim.bind(this)
        ]));

        this.dialogs.add(new WaterfallDialog(GET_PROFILE, [
            this.promptForUserName.bind(this),
            this.promptForUserEmail.bind(this),
            this.promptForSummaryProfile.bind(this),
        ]));

        this.dialogs.add(new WaterfallDialog(REPEAT_SUB_CUST_NAME, [
            this.promptForSubCustName.bind(this),
            this.promptForContactName.bind(this),
            this.promptForPhone.bind(this),
            this.promptForProblemAddress.bind(this),
            this.promptForDivision.bind(this),
            this.promptForProduct.bind(this),
            this.promptForSize.bind(this),
            this.promptForColor.bind(this),
            this.promptForQty.bind(this),
            this.promptForWhenInstall.bind(this),
            this.promptForProblem.bind(this),
            this.promptForMoreInformation.bind(this),
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
            this.promptForDivision.bind(this),
            this.promptForProduct.bind(this),
            this.promptForSize.bind(this),
            this.promptForColor.bind(this),
            this.promptForQty.bind(this),
            this.promptForWhenInstall.bind(this),
            this.promptForProblem.bind(this),
            this.promptForMoreInformation.bind(this),
            this.promptConfirmForm.bind(this),
            this.promptForImages.bind(this),
            this.promptConfirmImages.bind(this),
            this.summaryClaim.bind(this),
            this.submitClaim.bind(this)
        ]));

        this.dialogs.add(new WaterfallDialog(REPEAT_PHONE, [
            this.promptForPhone.bind(this),
            this.promptForProblemAddress.bind(this),
            this.promptForDivision.bind(this),
            this.promptForProduct.bind(this),
            this.promptForSize.bind(this),
            this.promptForColor.bind(this),
            this.promptForQty.bind(this),
            this.promptForWhenInstall.bind(this),
            this.promptForProblem.bind(this),
            this.promptForMoreInformation.bind(this),
            this.promptConfirmForm.bind(this),
            this.promptForImages.bind(this),
            this.promptConfirmImages.bind(this),
            this.summaryClaim.bind(this),
            this.submitClaim.bind(this)
        ]));

        this.dialogs.add(new WaterfallDialog(REPEAT_PROBLEM_ADDRESS, [
            this.promptForProblemAddress.bind(this),
            this.promptForDivision.bind(this),
            this.promptForProduct.bind(this),
            this.promptForSize.bind(this),
            this.promptForColor.bind(this),
            this.promptForQty.bind(this),
            this.promptForWhenInstall.bind(this),
            this.promptForProblem.bind(this),
            this.promptForMoreInformation.bind(this),
            this.promptConfirmForm.bind(this),
            this.promptForImages.bind(this),
            this.promptConfirmImages.bind(this),
            this.summaryClaim.bind(this),
            this.submitClaim.bind(this)
        ]));

        this.dialogs.add(new WaterfallDialog(REPEAT_DIVISON, [
            this.promptForDivision.bind(this),
            this.promptForProduct.bind(this),
            this.promptForSize.bind(this),
            this.promptForColor.bind(this),
            this.promptForQty.bind(this),
            this.promptForWhenInstall.bind(this),
            this.promptForProblem.bind(this),
            this.promptForMoreInformation.bind(this),
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
            this.promptForMoreInformation.bind(this),
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
            this.promptForMoreInformation.bind(this),
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
            this.promptForMoreInformation.bind(this),
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
            this.promptForMoreInformation.bind(this),
            this.promptConfirmForm.bind(this),
            this.promptForImages.bind(this),
            this.promptConfirmImages.bind(this),
            this.summaryClaim.bind(this),
            this.submitClaim.bind(this)
        ]));

        this.dialogs.add(new WaterfallDialog(REPEAT_WHEN_INSTALL, [
            this.promptForWhenInstall.bind(this),
            this.promptForProblem.bind(this),
            this.promptForMoreInformation.bind(this),
            this.promptConfirmForm.bind(this),
            this.promptForImages.bind(this),
            this.promptConfirmImages.bind(this),
            this.summaryClaim.bind(this),
            this.submitClaim.bind(this)
        ]));

        this.dialogs.add(new WaterfallDialog(REPEAT_PROBLEM, [
            this.promptForProblem.bind(this),
            this.promptForMoreInformation.bind(this),
            this.promptConfirmForm.bind(this),
            this.promptForImages.bind(this),
            this.promptConfirmImages.bind(this),
            this.summaryClaim.bind(this),
            this.submitClaim.bind(this)
        ]));

        this.dialogs.add(new WaterfallDialog(REPEAT_MORE_INFORMATION, [
            this.promptForMoreInformation.bind(this),
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

        let user = await this.userProfile.get(step.context, {});

        //Clear Image Cash
        user.images = [];

        await step.context.sendActivity(`ระหว่างกระบวนการแจ้งเคลม ท่านสามารถพิมพ์ "แก้ไข" เพื่อแก้ไขข้อมูลก่อนหน้า และพิมพ์ "ยกเลิก" เพื่อยกเลิกการแจ้งเคลมได้ค่ะ`);
        return await step.prompt(SAP_ID_PROMPT,
            {
                prompt: 'ขอทราบ รหัสลูกค้าใน SAP ของร้านค้าหลักค่ะ',
                retryPrompt: 'ขอโทษค่ะ ไม่มีรหัสลูกค้านี้ในระบบ กรุณาระบุรหัสลูกค้าใหม่อีกครั้งค่ะ'
            });
    }

    // step 2
    async promptForSubCustName(step) {

        let user = await this.userProfile.get(step.context, {});

        if (empty(step.options)) {
            user.sapId = step.result;
        } else {
            //save to temp because we new query in validate
            const tempCustomerInfo = user.customerInfo;
            user = step.options;
            user.customerInfo = tempCustomerInfo;
            if (!empty(step.result)) {
                user.sapId = step.result;
            }
        }

        //save customer data
        let customer = user.customerInfo[0];
        user.sapId = customer.KUNNR;
        user.customerName = customer.TITLE_MEDI + " " + customer.NAME1;
        user.customerAddress = customer.FULLADR;

        await this.userProfile.set(step.context, user);

        await step.context.sendActivity(`ชื่อร้านค้าหลักคือ ` + user.customerName + `, ที่อยู่ของร้านค้าหลักคือ ` + user.customerAddress);
        return await step.prompt(SUB_CUST_NAME_PROMPT, `ขอทราบ ชื่อร้านค้าย่อย ค่ะ`);
    }

    // step 3
    async promptForContactName(step) {

        let user = await this.userProfile.get(step.context, {});

        if (step.result === EDIT) {
            return await step.replaceDialog(GET_CLAIM, user);
        } else {
            if (empty(step.options)) {
                user.subCustName = step.result;
            } else {
                user = step.options;
                if (!empty(step.result)) {
                    user.subCustName = step.result;
                }
            }

            await this.userProfile.set(step.context, user);

            return await step.prompt(CONTACT_NAME_PROMPT, `ขอทราบ ชื่อผู้ติดต่อ หรือ ผู้ใช้งาน หรือ ผู้รับเหมา ค่ะ`);
        }

    }

    // step 4
    async promptForPhone(step) {

        let user = await this.userProfile.get(step.context, {});

        if (step.result === EDIT) {
            return await step.replaceDialog(REPEAT_SUB_CUST_NAME, user);
        } else {
            if (empty(step.options)) {
                user.contactName = step.result;
            } else {
                user = step.options;
                if (!empty(step.result)) {
                    user.contactName = step.result;
                }
            }

            await this.userProfile.set(step.context, user);

            return await step.prompt(PHONE_PROMPT, `ขอทราบ เบอร์ติดต่อ ค่ะ`);
        }
    }

    // step 5
    async promptForProblemAddress(step) {

        let user = await this.userProfile.get(step.context, {});

        if (step.result === EDIT) {
            return await step.replaceDialog(REPEAT_CONTACT_NAME, user);
        } else {
            if (empty(step.options)) {
                user.phone = step.result;
            } else {
                user = step.options;
                if (!empty(step.result)) {
                    user.phone = step.result;
                }
            }

            await this.userProfile.set(step.context, user);

            return await step.prompt(PROBLEM_ADDRESS_PROMPT, `ขอทราบ ที่อยู่ร้าน ที่เกิดปัญหาค่ะ`);
        }
    }

    // step 6
    async promptForDivision(step) {

        let user = await this.userProfile.get(step.context, {});

        if (step.result === EDIT) {
            return await step.replaceDialog(REPEAT_PHONE, user);
        } else {
            if (empty(step.options)) {
                user.problemAddress = step.result;
            } else {
                user = step.options;
                if (!empty(step.result)) {
                    user.problemAddress = step.result;
                }
            }

            await this.userProfile.set(step.context, user);

            await step.context.sendActivity({ attachments: [menu.divisionMenu()] });
            return await step.prompt(DIVISION_PROMPT,
                {
                    retryPrompt: 'ขอโทษค่ะ กรุณาเลือก Division ที่มีในรายการค่ะ'
                });
        }
    }

    // step 7
    async promptForProduct(step) {

        let user = await this.userProfile.get(step.context, {});

        if (step.result === EDIT) {
            return await step.replaceDialog(REPEAT_PROBLEM_ADDRESS, user);
        } else {
            if (empty(step.options)) {
                user.division = step.result;
            } else {
                user = step.options;
                if (!empty(step.result)) {
                    user.division = step.result;
                }
            }

            await this.userProfile.set(step.context, user);

            await step.context.sendActivity({ attachments: [menu.productsMenu(user.division)] });
            return await step.prompt(PRODUCT_PROMPT,
                {
                    retryPrompt: 'ขอโทษค่ะ กรุณาเลือกผลิตภัณฑ์ที่มีในรายการค่ะ'
                });
        }
    }

    // step 8
    async promptForSize(step) {

        let user = await this.userProfile.get(step.context, {});

        if (step.result === EDIT) {
            return await step.replaceDialog(REPEAT_DIVISON, user);
        } else {
            if (empty(step.options)) {
                user.product = step.result;
            } else {
                user = step.options;
                if (!empty(step.result)) {
                    user.product = step.result;
                }
            }

            await this.userProfile.set(step.context, user);

            return await step.prompt(SIZE_PROMPT, `ขอทราบ ขนาดของสินค้า ที่ต้องการจะเคลมค่ะ`);
        }
    }

    // step 9
    async promptForColor(step) {

        let user = await this.userProfile.get(step.context, {});

        if (step.result === EDIT) {
            return await step.replaceDialog(REPEAT_PRODUCT, user);
        } else {
            if (empty(step.options)) {
                user.size = step.result;
            } else {
                user = step.options;
                if (!empty(step.result)) {
                    user.size = step.result;
                }
            }

            await this.userProfile.set(step.context, user);

            return await step.prompt(COLOR_PROMPT, `ขอทราบ สีและลายของสินค้า ที่ต้องการจะเคลมค่ะ`);
        }
    }

    // step 10
    async promptForQty(step) {

        let user = await this.userProfile.get(step.context, {});

        if (step.result === EDIT) {
            return await step.replaceDialog(REPEAT_SIZE, user);
        } else {
            if (empty(step.options)) {
                user.color = step.result;
            } else {
                user = step.options;
                if (!empty(step.result)) {
                    user.color = step.result;
                }
            }

            await this.userProfile.set(step.context, user);

            return await step.prompt(QTY_PROMPT, `ขอทราบ จำนวนสินค้า ที่ต้องการจะเคลมค่ะ`);
        }
    }

    // step 11
    async promptForWhenInstall(step) {

        let user = await this.userProfile.get(step.context, {});

        if (step.result === EDIT) {
            return await step.replaceDialog(REPEAT_COLOR, user);
        } else {
            if (empty(step.options)) {
                user.qty = step.result;
            } else {
                user = step.options;
                if (!empty(step.result)) {
                    user.qty = step.result;
                }
            }
        }

        await this.userProfile.set(step.context, user);

        return await step.prompt(WHEN_INSTALL_PROMPT, {
            prompt: 'กรุณาเลือกช่วงที่ผลิตภัณฑ์เกิดปัญหาค่ะ',
            retryPrompt: 'ขอโทษค่ะ กรุณาเลือกจากตัวเลือกที่มีให้ค่ะ',
            choices: ['ก่อนติดตั้ง', 'หลังติดตั้ง', 'แก้ไข']
        });
    }

    // step 12
    async promptForProblem(step) {

        let user = await this.userProfile.get(step.context, {});

        if (empty(step.result)) { // update data from previous dialog
            user = step.options;
        } else {
            if (step.result === EDIT || step.result.value === EDIT) { // edit previous step
                return await step.replaceDialog(REPEAT_QTY, user);
            } else {
                if (empty(step.options)) { // normal step
                    user.whenInstall = step.result.value;
                } else { // normal repeat step
                    user = step.options;
                    user.whenInstall = step.result.value;
                }
            }
        }

        await this.userProfile.set(step.context, user);

        await step.context.sendActivity({ attachments: [menu.problemMenu(user.division, user.whenInstall)] });
        return await step.prompt(PROBLEM_PROMPT,
            {
                retryPrompt: 'ขอโทษค่ะ กรุณาเลือกปัญหาที่มีในรายการค่ะ'
            });
    }

    //step 13
    async promptForMoreInformation(step) {
        let user = await this.userProfile.get(step.context, {});

        if (empty(step.result)) { // update data from previous dialog
            user = step.options;
        } else {
            if (step.result === EDIT || step.result.value === EDIT) { // edit previous step
                return await step.replaceDialog(REPEAT_WHEN_INSTALL, user);
            } else {
                if (empty(step.options)) { // normal step
                    user.problem = step.result;
                } else { // normal repeat step
                    user = step.options;
                    user.problem = step.result;
                }
            }
        }

        await this.userProfile.set(step.context, user);


        return await step.prompt(MORE_INFORMATION_PROMPT, `ขอทราบ ข้อมูลเพิ่มเติม ที่ท่านต้องการแจ้งค่ะ`);
    }

    // step 14
    async promptConfirmForm(step) {

        let user = await this.userProfile.get(step.context, {});

        if (step.result === EDIT) {
            return await step.replaceDialog(REPEAT_PROBLEM, user);
        } else {
            if (empty(step.options)) {
                user.moreInformation = step.result;
            } else {
                user = step.options;
                if (!empty(step.result)) {
                    user.moreInformation = step.result;
                }
            }

            // only channel Microsoft Teams
            if (step.context.activity.channelId === 'msteams') {
                // get Microsoft Graph user data
                const graphUser = await services.getGraphUser(step.context);
                user.email = graphUser.mail;

                // get informer name
                user.name = step.context.activity.from.name;
            }

            await this.userProfile.set(step.context, user);

            await step.context.sendActivity({
                text: 'สรุปรายการแจ้งเคลมคุณภาพ',
                attachments: [CardFactory.adaptiveCard(menu.summaryMenu(user))]
            });

            return await step.prompt(CHOICE_PROMPT, 'ยืมยันข้อมูลฟอร์มหรือไม่ ?', ['ใช่', 'ไม่']);
        }
    }

    // step 15
    async promptForImages(step) {
        if (step.result && step.result.value === NO) {
            const user = await this.userProfile.get(step.context, {});
            return await step.replaceDialog(REPEAT_MORE_INFORMATION, user);
        } else {
            return await step.prompt(IMAGES_PROMPT,
                {
                    prompt: 'กรุณาอัพโหลดรูปภาพ เพื่อประกอบการแจ้งเคลมค่ะ (ถ้าต้องการอัพโหลดหลายรูป กรุณาเลือกรูปทั้งหมด แล้วกดส่งข้อความค่ะ)',
                    retryPrompt: 'ขอโทษค่ะ จำเป็นต้องใช้รูปภาพเพื่อประกอบการแจ้งเคลม กรุณาอัพโหลดรูปภาพใหม่อีกครั้งค่ะ'
                }
            );
        }
    }

    // step 16
    async promptConfirmImages(step) {

        let user = await this.userProfile.get(step.context, {});

        if (empty(step.options)) {
            user.images = step.result;
        } else {
            user = step.options;
            if (!empty(step.result)) {
                user.images = step.result;
            }
        }

        // const attachmentsImages = [];

        if (user.images.length > 0) {

            // await step.context.sendActivity(`สรุปรายการรูปภาพที่คุณอัพโหลด`);
            console.log(user.images);
            for (var i in user.images) {
                if (user.images[i].contentType.match("image")) {
                    if (step.context.activity.channelId === 'skype' || step.context.activity.channelId === 'msteams') {

                        // prepare contentUrl
                        const tempContentUrl = user.images[i].contentUrl.substr(0, user.images[i].contentUrl.lastIndexOf("views") + 6) + '\original';
                        console.log("TEMP: " + tempContentUrl);
                        user.images[i].contentUrl = tempContentUrl;

                        const contentUrl = user.images[i].contentUrl;
                        const imageData = await services.getAuthenImage(step.context, contentUrl);
                        const base64Image = Buffer.from(imageData).toString('base64');

                        var obj = {};
                        obj.contentType = 'image/png';
                        obj.contentUrl = `data:image/png;base64,${base64Image}`
                        user.images.push(obj);
                    } else {
                        var obj = {};
                        obj.contentType = user.images[i].contentType;
                        obj.contentUrl = user.images[i].contentUrl;
                        user.images.push(obj);
                    }
                }
            }
            // user.images = attachmentsImages;
        }

        // await step.context.sendActivity({
        //     attachments: user.images
        // });

        await this.userProfile.set(step.context, user);

        return await step.prompt(CHOICE_PROMPT, 'ยืนยันการอัพโหลดรูปภาพหรือไม่ ?', ['ใช่', 'ไม่']);
    }

    // step 17
    async summaryClaim(step) {

        const user = await this.userProfile.get(step.context, {});

        if (step.result && step.result.value === YES) {
            await step.context.sendActivity(`สรุปรายการรูปภาพที่คุณอัพโหลด`);
            await step.context.sendActivity({
                attachments: user.images
            });
            return await step.prompt(CHOICE_PROMPT, 'ยืนยันการแจ้งเคลมคุณภาพหรือไม่ ?', ['ใช่', 'ไม่']);
        } else {
            return await step.replaceDialog(REPEAT_IMAGES, user);
        }
    }

    // step 18
    async submitClaim(step) {
        if (step.result && step.result.value === YES) {
            //send mail to callcenter
            const helpers = new Helpers();
            const user = await this.userProfile.get(step.context, {});
            helpers.sendMail(user);

            await step.context.sendActivity(`เราได้ส่งข้อมูลการแจ้งเคลมคุณภาพให้แล้วค่ะ`);
            await step.context.sendActivity({ attachments: [menu.mainMenu()] });
        } else {
            await step.context.sendActivity(`ยกเลิกการแจ้งเคลมให้แล้วค่ะ`);
            await step.context.sendActivity({ attachments: [menu.mainMenu()] });
        }
        return await step.endDialog();
    }

    async promptForUserName(step) {
        return await step.prompt(USER_NAME_PROMPT, `ขอทราบ ชื่อ-นามสกุล ด้วยค่ะ (ภาษาอังกฤษ ตัวอย่าง John Mayer)`);
    }

    async promptForUserEmail(step) {
        let user = await this.userProfile.get(step.context, {});

        user.name = step.result;

        await this.userProfile.set(step.context, user);
        return await step.prompt(USER_EMAIL_PROMPT, `ขอทราบ อีเมล ด้วยค่ะ (ตัวอย่าง it_shera@shera.com)`);
    }

    async promptForSummaryProfile(step) {
        let user = await this.userProfile.get(step.context, {});

        user.email = step.result;

        await this.userProfile.set(step.context, user);
        await step.context.sendActivity(`บันทึกข้อมูลโปรไฟล์ให้แล้วค่ะ ชื่อ: ${user.name} อีเมล: ${user.email}`);
        await step.endDialog();
        return await step.context.sendActivity({ attachments: [menu.mainMenu()] });
    }

    /**
     *
     * @param {TurnContext} turnContext turn context object.
     */
    async onTurn(turnContext) {

        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        if (turnContext.activity.type === ActivityTypes.Message) {

            console.log(turnContext.activity);

            if (turnContext.activity.channelId !== 'msteams') {

                let user = await this.userProfile.get(turnContext, {});

                // Create a dialog context object.
                const dc = await this.dialogs.createContext(turnContext);

                const utterance = (turnContext.activity.text || '').trim().toLowerCase();
                console.log("utterance = " + utterance);

                if (utterance === CANCEL) {
                    if (dc.activeDialog) {
                        await dc.cancelAllDialogs();
                        await dc.context.sendActivity(CANCEL_RESPONSE);
                        await dc.context.sendActivity({ attachments: [menu.mainMenu()] });
                    } else {
                        await dc.context.sendActivity(CANCEL_NOTHING);
                        await dc.context.sendActivity({ attachments: [menu.mainMenu()] });
                    }
                } else if (utterance === MAIN_MENU) {
                    await dc.context.sendActivity({ attachments: [menu.mainMenu()] });
                } else if (utterance === CALL_CENTER) {
                    await dc.context.sendActivity(CALL_CENTER_RESPONSE);
                } else if (utterance === UPDATE_PROFILE) {
                    if (user.name && user.email) {
                        await dc.context.sendActivity(`ท่านมีโปรไฟล์อยู่แล้ว ชื่อ: ${user.name} อีเมล: ${user.email} ถ้าหากท่านไม่ต้องการอัพเดทโปรไฟล์ สามารถพิมพ์ "ยกเลิก" เพื่อยกเลิกการอัพเดทโปรไฟล์`);
                    }
                    await dc.beginDialog(GET_PROFILE);
                } else if (utterance === QUALITY_CLAIM) {
                    if (dc.activeDialog) {
                        await dc.cancelAllDialogs();
                        console.log("Cancel current dialog and start new claim.")
                    }
                    if (user.name && user.email) {
                        await dc.beginDialog(GET_CLAIM);
                    } else {
                        await dc.context.sendActivity(ADD_PROFILE_BEFORE_CLAIM);
                        await dc.beginDialog(GET_PROFILE);
                    }
                }

                // Start the sample dialog in response to any other input.
                if (!turnContext.responded) {
                    if (dc.activeDialog) {
                        // If the bot has not yet responded, continue processing the current dialog.
                        await dc.continueDialog();
                    }
                    else {
                        if (user.name && user.email) {
                            await dc.context.sendActivity(TEXT_NOTHING_MATCH);
                            await dc.context.sendActivity({ attachments: [menu.mainMenu()] });
                        } else { //get name & email first
                            await dc.beginDialog(GET_PROFILE);
                        }
                    }
                }

                // Save state changes
                await this.userState.saveChanges(turnContext);

                // End this turn by saving changes to the conversation state.
                await this.conversationState.saveChanges(turnContext);

            } else {
                await turnContext.sendActivity(MSTEAMS_RESPONSE);
            }

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