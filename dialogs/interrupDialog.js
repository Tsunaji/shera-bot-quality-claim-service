const { InputHints } = require('botbuilder');
const { ComponentDialog, DialogTurnStatus } = require('botbuilder-dialogs');

const { MyMenu } = require('../MyMenu');
const menu = new MyMenu();

/**
 * This base class watches for common phrases like "help" and "cancel" and takes action on them
 * BEFORE they reach the normal bot logic.
 */
class InterrupDialog extends ComponentDialog {
    async onContinueDialog(innerDc) {
        const result = await this.interrupt(innerDc);
        if (result) {
            return result;
        }
        return await super.onContinueDialog(innerDc);
    }

    async interrupt(innerDc) {
        if (innerDc.context.activity.text) {
            const text = innerDc.context.activity.text.toLowerCase();

            switch (text) {
                case 'ช่วยเหลือ':
                case 'help':
                case '?': {
                    const helpMessageText = `พิมพ์ 'ยกเลิก' เพื่อเริ่มใหม่นะคะ\n\n
                                            Type 'cancel' for reset chatbot`;
                    await innerDc.context.sendActivity(helpMessageText, helpMessageText, InputHints.ExpectingInput);
                    return { status: DialogTurnStatus.waiting };
                }
                case 'ยกเลิก':
                case 'ออก':
                case 'cancel':
                case 'quit': {
                    const cancelMessageText = 'Cancelling...';
                    await innerDc.context.sendActivity(cancelMessageText, cancelMessageText, InputHints.IgnoringInput);
                    await innerDc.context.sendActivity({ attachments: [menu.mainMenu()] });
                    return await innerDc.cancelAllDialogs();
                }
            }
        }
    }
}

module.exports.InterrupDialog = InterrupDialog;