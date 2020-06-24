const {
    ChoiceFactory,
    ChoicePrompt,
    ConfirmPrompt,
    DialogSet,
    DialogTurnStatus,
    TextPrompt,
    WaterfallDialog
} = require('botbuilder-dialogs');
const { ClaimInterModel } = require('../models/claimInterModel');
const { InterrupDialog } = require('./interrupDialog');

const CONFIRM_PROMPT = 'CONFIRM_PROMPT';
const EMAIL_PROMPT = 'EMAIL_PROMPT';
const NAME_PROMPT = 'NAME_PROMPT';
const SALESAREA_PROMPT = 'SALESAREA_PROMPT';

const CLAIM_INTER_DIALOG = 'CLAIM_INTER_DIALOG';
const WATERFALL_DIALOG = 'WATERFALL_DIALOG';

class ClaimInterDialog extends InterrupDialog {
    constructor(userProfile) {
        super(CLAIM_INTER_DIALOG);

        this.userProfile = userProfile;

        this.addDialog(new TextPrompt(NAME_PROMPT));
        this.addDialog(new WaterfallDialog(WATERFALL_DIALOG, [
            this.testStep.bind(this),
            this.summaryStep.bind(this)
        ]));

        this.initialDialogId = WATERFALL_DIALOG;
    }

    // /**
    //  * The run method handles the incoming activity (in the form of a TurnContext) and passes it through the dialog system.
    //  * If no dialog is active, it will start the default dialog.
    //  * @param {*} turnContext
    //  * @param {*} accessor
    //  */
    // async run(turnContext, accessor) {
    //     const dialogSet = new DialogSet(accessor);
    //     dialogSet.add(this);

    //     const dialogContext = await dialogSet.createContext(turnContext);
    //     // console.log(dialogContext);
    //     const results = await dialogContext.continueDialog();
    //     if (results.status === DialogTurnStatus.empty) {
    //         await dialogContext.beginDialog(this.id);
    //     }
    // }

    async testStep(step) {
        // WaterfallStep always finishes with the end of the Waterfall or with another dialog; here it is a Prompt Dialog.
        // Running a prompt here means the next WaterfallStep will be run when the user's response is received.
        step.values.claimInterInfo = new ClaimInterModel();
        return await step.prompt(NAME_PROMPT, 'กรุณากรอกรหัสร้านค้า\n\nPlease enter customer code.');
    }


    async summaryStep(step) {
        // WaterfallStep always finishes with the end of the Waterfall or with another dialog; here it is a Prompt Dialog.
        // Running a prompt here means the next WaterfallStep will be run when the user's response is received.
        var msg = `Your customer is ${step.result}`

        step.values.claimInterInfo.customerCode = step.result;

        let user = await this.userProfile.get(step.context, {});
        user.claimInter = step.values.claimInterInfo;

        await step.context.sendActivity(msg);

        return await step.endDialog(user.claimInter);
    }

}

module.exports.ClaimInterDialog = ClaimInterDialog;
module.exports.CLAIM_INTER_DIALOG = CLAIM_INTER_DIALOG;