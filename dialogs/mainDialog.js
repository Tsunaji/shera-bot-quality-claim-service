const {
    DialogSet,
    DialogTurnStatus,
    TextPrompt,
    WaterfallDialog
} = require('botbuilder-dialogs');
const { UserProfileDialog, USER_PROFILE_DIALOG } = require('./userProfileDialog');
const { ClaimInterDialog, CLAIM_INTER_DIALOG } = require('./claimInterDialog');
const { ClaimDomesticDialog, CLAIM_DOMESTIC_DIALOG } = require('./claimDomesticDialog');
const { InterrupDialog } = require('./interrupDialog');

const { MyMenu } = require('../MyMenu');
const menu = new MyMenu();

//menu text
const MAIN_MENU = "menu";
const CALL_CENTER = "call center";
const QUALITY_CLAIM = "quality claim"
const UPDATE_PROFILE = "update profile";

//response text
const CALL_CENTER_RESPONSE = "ติดต่อที่เบอร์โทร 02-289-9888";
const MSTEAMS_RESPONSE = `Chatbot by Microsoft Teams is under maintenance\n\nPlease contact to Line's Callcenter or Tell 02-289-9888`;

const USER_PROFILE_PROPERTY = 'USER_PROFILE_PROPERTY';
const MENU_PROMPT = 'MENU_PROMPT';
const MAIN_DIALOG = 'MAIN_DIALOG';
const WATERFALL_DIALOG = 'WATERFALL_DIALOG';

class MainDialog extends InterrupDialog {
    constructor(userState) {
        super(MAIN_DIALOG);

        this.userState = userState;
        this.userProfile = userState.createProperty(USER_PROFILE_PROPERTY);

        this.addDialog(new TextPrompt(MENU_PROMPT));
        this.addDialog(new UserProfileDialog(this.userProfile));
        this.addDialog(new ClaimDomesticDialog(this.userProfile));
        this.addDialog(new ClaimInterDialog(this.userProfile));
        this.addDialog(new WaterfallDialog(WATERFALL_DIALOG, [
            this.introStep.bind(this),
            this.actStep.bind(this),
            this.finalStep.bind(this)
        ]));

        this.initialDialogId = WATERFALL_DIALOG;
    }

    /**
     * The run method handles the incoming activity (in the form of a TurnContext) and passes it through the dialog system.
     * If no dialog is active, it will start the default dialog.
     * @param {*} turnContext
     * @param {*} accessor
     */
    async run(turnContext, accessor) {
        const dialogSet = new DialogSet(accessor);
        dialogSet.add(this);

        const dialogContext = await dialogSet.createContext(turnContext);

        const results = await dialogContext.continueDialog();

        if (results.status === DialogTurnStatus.empty) {
            await dialogContext.beginDialog(this.id);
        }
    }

    async introStep(step) {
        const channel = step.context.activity.channelId;

        if (channel === 'msteams') {
            console.log('catch msteams');
            await step.context.sendActivity(MSTEAMS_RESPONSE);
            return await step.endDialog();
        }

        const utterance = (step.context.activity.text || '').trim().toLowerCase();

        return step.next(utterance);
    }

    async actStep(step) {
        let user = await this.userProfile.get(step.context, {});
        console.log(`main dialog`);

        console.log(user);

        if (!user.profile) {
            console.log(!user.profile);
            console.log('create user profile');
            await step.context.sendActivity(`กรุณาสร้างโปรไฟล์ก่อนเริ่มใช้งานแชทบอทนะคะ\n\nPlease create profile before use Chatbot.`);
            return await step.beginDialog(USER_PROFILE_DIALOG);
        }

        const utterance = (step.result || '').trim().toLowerCase();
        console.log("utterance = " + utterance);

        switch (utterance) {
            case MAIN_MENU: {
                return step.next();
            }
            case CALL_CENTER: {
                return await step.context.sendActivity(CALL_CENTER_RESPONSE);
            }
            case UPDATE_PROFILE: {
                if (user.profile.name) {
                    await step.context.sendActivity(`คุณมีโปรไฟล์อยู่แล้ว ชื่อ ${user.profile.name} อีเมล ${user.profile.email} เขตการขาย ${user.profile.salesArea} #ท่านสามารถพิมพ์ "ยกเลิก" เพื่อยกเลิกการอัพเดทโปรไฟล์\n\nYou already have profile, your name as ${user.profile.name} your email as ${user.profile.email} and your sales area as ${user.profile.salesArea} #You can type "cancel" for cancel updating profile.`);
                }
                return await step.beginDialog(USER_PROFILE_DIALOG);
            }
            case QUALITY_CLAIM: {
                if (user.profile.salesArea === 'A1') {
                    console.log(`domestic claim`);
                    return await step.beginDialog(CLAIM_DOMESTIC_DIALOG);
                } else {
                    console.log(`inter claim`);
                    return await step.beginDialog(CLAIM_INTER_DIALOG);
                }
            }
            default: {
                await step.context.sendActivity(`สวัสดีค่ะ มีอะไรให้ช่วยสามารถเลือกที่เมนูด้านล่างได้เลยค่ะ\n\nhow can I help you ? Please select a menu below.`);
                return step.next();
            }
        }
    }

    async finalStep(step) {
        await step.context.sendActivity({ attachments: [menu.mainMenu()] });
        return await step.endDialog();
    }

}

module.exports.MainDialog = MainDialog;
module.exports.MAIN_DIALOG = MAIN_DIALOG;