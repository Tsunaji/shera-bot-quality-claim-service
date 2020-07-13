const {
    ChoiceFactory,
    ChoicePrompt,
    ConfirmPrompt,
    TextPrompt,
    WaterfallDialog
} = require('botbuilder-dialogs');
const { UserProfileModel } = require('../models/userProfileModel');
const { InterrupDialog } = require('./interrupDialog');

const CONFIRM_PROMPT = 'CONFIRM_PROMPT';
const EMAIL_PROMPT = 'EMAIL_PROMPT';
const NAME_PROMPT = 'NAME_PROMPT';
const SALESAREA_PROMPT = 'SALESAREA_PROMPT';

const USER_PROFILE_DIALOG = 'USER_PROFILE_DIALOG';
const WATERFALL_DIALOG = 'WATERFALL_DIALOG';

class UserProfileDialog extends InterrupDialog {
    constructor(userProfile) {
        super(USER_PROFILE_DIALOG);

        this.userProfile = userProfile;

        this.addDialog(new TextPrompt(EMAIL_PROMPT, this.emailPromptValidator));
        this.addDialog(new TextPrompt(NAME_PROMPT, this.namePromptValidator));
        this.addDialog(new ChoicePrompt(SALESAREA_PROMPT));
        this.addDialog(new ConfirmPrompt(CONFIRM_PROMPT));
        this.addDialog(new WaterfallDialog(WATERFALL_DIALOG, [
            this.nameStep.bind(this),
            this.emailStep.bind(this),
            this.salesAreaStep.bind(this),
            this.confirmStep.bind(this),
            this.summaryStep.bind(this)
        ]));

        this.initialDialogId = WATERFALL_DIALOG;
    }

    async nameStep(step) {
        step.values.userInfo = new UserProfileModel();
        return await step.prompt(NAME_PROMPT, 'กรุณากรอก ชื่อ-นามสกุล (ภาษาอังกฤษ)\n\nPlease enter your first name & last name.');
    }

    async emailStep(step) {
        step.values.userInfo.name = step.result;
        return await step.prompt(EMAIL_PROMPT, 'กรุณากรอกอีเมล\n\nPlease enter your email.');
    }

    async salesAreaStep(step) {
        step.values.userInfo.email = step.result;

        let prompt = `กรุณาเลือกเขตการขาย\n\nPlease enter your sales area.\n\n`;
        prompt = prompt + `A1 = Thailand, Laos\n\n`;
        prompt = prompt + `A2 = Indonesia, Philippines\n\n`;
        prompt = prompt + `A3 = Malaysia, Myanmar, Cambodia, Vietnam, Singapore, Brunie, New Zealand, Korea, Taiwan\n\n`;
        prompt = prompt + `A4 = India, Pacific Island, Others in South Asia, Middle East, Africa, Europe`;

        return await step.prompt(SALESAREA_PROMPT, {
            prompt: prompt,
            choices: ChoiceFactory.toChoices(['A1', 'A2', 'A3', 'A4'])
        });
    }

    async confirmStep(step) {
        step.values.userInfo.salesArea = step.result.value;
        return await step.prompt(CONFIRM_PROMPT, {
            prompt: 'ยืนยันข้อมูล ?\n\n' +
                'Confirm ?'
        });
    }

    async summaryStep(step) {
        let user = await this.userProfile.get(step.context, {});
        user.profile = step.values.userInfo;

        if (step.result) {

            let msg = `คุณชื่อ ${user.profile.name} อีเมล ${user.profile.email} เขตการขาย ${user.profile.salesArea}\n\nI have your name as ${user.profile.name} and your email as ${user.profile.email} and your sales area as ${user.profile.salesArea}.`;

            await step.context.sendActivity(msg);
        } else {
            await step.context.sendActivity('ข้อมูลของท่านจะไม่ถูกบันทึก\n\nThanks. Your profile will not be kept.');
            return await step.replaceDialog(USER_PROFILE_DIALOG);
        }

        await this.userProfile.set(step.context, user);
        return await step.endDialog();
    }

    async namePromptValidator(promptContext) {
        if (promptContext.recognized.succeeded && promptContext.recognized.value !== 'image') {
            return true;
        }
        promptContext.context.sendActivity('ท่านระบุชื่อไม่ถูกต้อง\n\nInvalid name.');
        return false;
    }

    async emailPromptValidator(promptContext) {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (promptContext.recognized.succeeded && promptContext.recognized.value.match(mailformat)) {
            return true;
        }
        promptContext.context.sendActivity('ท่านระบุอีเมลไม่ถูกต้อง\n\nInvalid email address.');
        return false;
    }

}

module.exports.UserProfileDialog = UserProfileDialog;
module.exports.USER_PROFILE_DIALOG = USER_PROFILE_DIALOG;