const {
    ChoiceFactory,
    ChoicePrompt,
    ConfirmPrompt,
    TextPrompt,
    WaterfallDialog,
    AttachmentPrompt
} = require('botbuilder-dialogs');
const { ClaimInterModel } = require('../models/claimInterModel');
const { BeforeInstallationProblemModel } = require('../models/beforeInstallationProblemModel');
const { AfterInstallationProblemModel } = require('../models/afterInstallationProblemModel');
const { InterrupDialog } = require('./interrupDialog');
const { MyMenu } = require('../MyMenu');
const { Helpers } = require('../Helpers');
const { Services } = require('../Services');

const menu = new MyMenu();
const services = new Services();

// main dialog prompt
const DISTRIBUTOR_CODE_PROMPT = 'DISTRIBUTOR_CODE_PROMPT';
const RETAILER_NAME_PROMPT = 'RETAILER_NAME_PROMPT';
const NAME_OF_CONTACT_PERSON_PROMPT = 'NAME_OF_CONTACT_PERSON_PROMPT';
const TELEPHONE_NUMBER_PROMPT = 'TELEPHONE_NUMBER_PROMPT';
const CUSTOMER_ADDRESS_PROMPT = 'CUSTOMER_ADDRESS_PROMPT';
const DIVISION_PROMPT = 'DIVISION_PROMPT';
const PRODUCT_NAME_PROMPT = 'PRODUCT_NAME_PROMPT';
const PRODUCT_SIZE_PROMPT = 'PRODUCT_SIZE_PROMPT';
const PRODUCT_COLOR_PROMPT = 'PRODUCT_COLOR_PROMPT';
const BATCH_NO_PROMPT = 'BATCH_NO_PROMPT';
const INVOICE_SO_NUMBER_PROMPT = 'INVOICE_SO_NUMBER_PROMPT';
const DEFECT_PROBLEM_PROMPT = 'DEFECT_PROBLEM_PROMPT';
const DEFECT_PICTURE_PROMPT = 'DEFECT_PICTURE_PROMPT';
const QTY_OF_DEFECT_PROMPT = 'QTY_OF_DEFECT_PROMPT';
const QTY_IN_SALE_ORDER_PROMPT = 'QTY_IN_SALE_ORDER_PROMPT';
const CLAIM_COST_PROMPT = 'CLAIM_COST_PROMPT';
const LABEL_PICTURE_PROMPT = 'LABEL_PICTURE_PROMPT';
const BEFORE_OR_AFTER_INSTALLATION_PROBLEM_PROMPT = 'BEFORE_OR_AFTER_INSTALLATION_PROBLEM_PROMPT';

// before installation problem dialog prompt
const PROBLEM_IN_CONTAINER_PICTURE_PROMPT = 'PROBLEM_IN_CONTAINER_PICTURE_PROMPT';
const PROBLEM_IN_WAREHOUSE_PICTURE_PROMPT = 'PROBLEM_IN_WAREHOUSE_PICTURE_PROMPT';
const PROBLEM_WHILE_UNLOAD_OR_MOVING_PICTURE_PROMPT = 'PROBLEM_WHILE_UNLOAD_OR_MOVING_PICTURE_PROMPT';

// after installation problem dialog prompt
const INSTALLATION_METHOD_PROMPT = 'INSTALLATION_METHOD_PROMPT';
const EQUIPMENT_TYPE_PROMPT = 'EQUIPMENT_TYPE_PROMPT';
const ENVIRONMENT_INSTALLATION_PROMPT = 'ENVIRONMENT_INSTALLATION_PROMPT';
const WHEN_INSTALLATION_PROBLEM_PROMPT = 'WHEN_INSTALLATION_PROBLEM_PROMPT';
const KEEP_FINISHED_GOODS_PROMPT = 'KEEP_FINISHED_GOODS_PROMPT';
const INSTALLATION_AREA_PROMPT = 'INSTALLATION_AREA_PROMPT';

// general dialog
const CHOICE_PROMPT = 'CHOICE_PROMPT';
const CONFIRM_PROMPT = 'CONFIRM_PROMPT';

const CLAIM_INTER_DIALOG = 'CLAIM_INTER_DIALOG';
const BEFORE_INSTALLTAION_PROBLEM_DIALOG = 'BEFORE_INSTALLTAION_PROBLEM_DIALOG';
const AFTER_INSTALLTAION_PROBLEM_DIALOG = 'AFTER_INSTALLTAION_PROBLEM_DIALOG';
const WATERFALL_DIALOG = 'WATERFALL_DIALOG';

class ClaimInterDialog extends InterrupDialog {
    constructor(userProfile) {
        super(CLAIM_INTER_DIALOG);

        this.userProfile = userProfile;

        this.addDialog(new TextPrompt(DISTRIBUTOR_CODE_PROMPT));
        this.addDialog(new TextPrompt(RETAILER_NAME_PROMPT));
        this.addDialog(new TextPrompt(NAME_OF_CONTACT_PERSON_PROMPT));
        this.addDialog(new TextPrompt(TELEPHONE_NUMBER_PROMPT));
        this.addDialog(new TextPrompt(CUSTOMER_ADDRESS_PROMPT));
        this.addDialog(new TextPrompt(DIVISION_PROMPT));
        this.addDialog(new TextPrompt(PRODUCT_NAME_PROMPT));
        this.addDialog(new TextPrompt(PRODUCT_SIZE_PROMPT));
        this.addDialog(new TextPrompt(PRODUCT_COLOR_PROMPT));
        this.addDialog(new TextPrompt(BATCH_NO_PROMPT));
        this.addDialog(new TextPrompt(INVOICE_SO_NUMBER_PROMPT));
        this.addDialog(new TextPrompt(DEFECT_PROBLEM_PROMPT));
        this.addDialog(new AttachmentPrompt(DEFECT_PICTURE_PROMPT));
        this.addDialog(new TextPrompt(QTY_OF_DEFECT_PROMPT));
        this.addDialog(new TextPrompt(QTY_IN_SALE_ORDER_PROMPT));
        this.addDialog(new TextPrompt(CLAIM_COST_PROMPT));
        this.addDialog(new AttachmentPrompt(LABEL_PICTURE_PROMPT));
        this.addDialog(new ChoicePrompt(BEFORE_OR_AFTER_INSTALLATION_PROBLEM_PROMPT));
        this.addDialog(new AttachmentPrompt(PROBLEM_IN_CONTAINER_PICTURE_PROMPT));
        this.addDialog(new AttachmentPrompt(PROBLEM_IN_WAREHOUSE_PICTURE_PROMPT));
        this.addDialog(new AttachmentPrompt(PROBLEM_WHILE_UNLOAD_OR_MOVING_PICTURE_PROMPT));
        this.addDialog(new TextPrompt(INSTALLATION_METHOD_PROMPT));
        this.addDialog(new TextPrompt(EQUIPMENT_TYPE_PROMPT));
        this.addDialog(new TextPrompt(ENVIRONMENT_INSTALLATION_PROMPT));
        this.addDialog(new TextPrompt(WHEN_INSTALLATION_PROBLEM_PROMPT));
        this.addDialog(new TextPrompt(KEEP_FINISHED_GOODS_PROMPT));
        this.addDialog(new TextPrompt(INSTALLATION_AREA_PROMPT));
        this.addDialog(new ChoicePrompt(CHOICE_PROMPT));
        this.addDialog(new ConfirmPrompt(CONFIRM_PROMPT));
        this.addDialog(new WaterfallDialog(WATERFALL_DIALOG, [
            this.distributorCodeStep.bind(this),
            this.retailerNameStep.bind(this),
            this.nameOfContactPersonStep.bind(this),
            this.telephoneNumberStep.bind(this),
            this.customerAddressStep.bind(this),
            this.divisionStep.bind(this),
            this.productNameStep.bind(this),
            this.productSizeStep.bind(this),
            this.productColorStep.bind(this),
            this.batchNoStep.bind(this),
            this.invoiceSoNumberStep.bind(this),
            this.defectProblemStep.bind(this),
            this.defectPictureStep.bind(this),
            this.qtyOfDefectStep.bind(this),
            this.qtyInSaleOrderStep.bind(this),
            this.claimCostStep.bind(this),
            this.labelPictureStep.bind(this),
            this.beforeOrAfterInstallationProblemStep.bind(this),
            this.beforeOrAfterInstallationActStep.bind(this)
        ]));
        this.addDialog(new WaterfallDialog(BEFORE_INSTALLTAION_PROBLEM_DIALOG, [
            this.problemInContainerPictureConfirmStep.bind(this),
            this.problemInContainerPictureStep.bind(this),
            this.problemInWarehousePictureConfirmStep.bind(this),
            this.problemInWarehousePictureStep.bind(this),
            this.problemWhileUnloadOrMovingPictureConfirmStep.bind(this),
            this.problemWhileUnloadOrMovingPictureStep.bind(this),
            this.confirmBeforeStep.bind(this),
            this.summaryBeforeStep.bind(this)
        ]));
        this.addDialog(new WaterfallDialog(AFTER_INSTALLTAION_PROBLEM_DIALOG, [
            this.installationMethodStep.bind(this),
            this.equipmentTypeStep.bind(this),
            this.environmentInstallationStep.bind(this),
            this.whenInstallationProblemStep.bind(this),
            this.keepFinishedGoodsStep.bind(this),
            this.installationAreaStep.bind(this),
            this.confirmAfterStep.bind(this),
            this.summaryAfterStep.bind(this)
        ]));

        this.initialDialogId = WATERFALL_DIALOG;
    }

    // step 1
    async distributorCodeStep(step) {
        step.values.claimInterInfo = new ClaimInterModel();

        const promptOptions = { prompt: 'Please enter distributor code.' };

        return await step.prompt(DISTRIBUTOR_CODE_PROMPT, promptOptions);
    }

    // step 2
    async retailerNameStep(step) {
        step.values.claimInterInfo.distributorName = step.result;

        // let user = await this.userProfile.get(step.context, {});
        // user.claimInterInfo = step.values.claimInterInfo;
        // console.log(user);
        // await this.userProfile.set(step.context, user);

        // let user2 = await this.userProfile.get(step.context, {});
        // console.log(user2);

        const promptOptions = { prompt: 'Please enter retailer name.' };

        return await step.prompt(RETAILER_NAME_PROMPT, promptOptions);
    }

    // step 3
    async nameOfContactPersonStep(step) {
        step.values.claimInterInfo.retailerName = step.result;

        const promptOptions = { prompt: 'Please enter the name of the contact person.' };

        return await step.prompt(NAME_OF_CONTACT_PERSON_PROMPT, promptOptions);
    }

    // step 4
    async telephoneNumberStep(step) {
        step.values.claimInterInfo.nameOfContact = step.result;

        const promptOptions = { prompt: 'Please enter telephone number.' };

        return await step.prompt(NAME_OF_CONTACT_PERSON_PROMPT, promptOptions);
    }

    // step 5
    async customerAddressStep(step) {
        step.values.claimInterInfo.telephoneNumber = step.result;

        const promptOptions = { prompt: 'Please enter customer address.' };

        return await step.prompt(NAME_OF_CONTACT_PERSON_PROMPT, promptOptions);
    }

    // step 6
    async divisionStep(step) {
        step.values.claimInterInfo.customerAddress = step.result;

        await step.context.sendActivity({ attachments: [menu.divisionMenu()] });
        return await step.prompt(DIVISION_PROMPT);
    }

    // step 7
    async productNameStep(step) {
        step.values.claimInterInfo.division = step.result;

        await step.context.sendActivity({ attachments: [menu.productsMenu(step.values.claimInterInfo.division)] });
        return await step.prompt(PRODUCT_NAME_PROMPT);
    }

    // step 8
    async productSizeStep(step) {
        step.values.claimInterInfo.productName = step.result;

        const promptOptions = { prompt: 'Please enter product size.' };

        return await step.prompt(PRODUCT_SIZE_PROMPT, promptOptions);
    }

    // step 9
    async productColorStep(step) {
        step.values.claimInterInfo.productSize = step.result;

        const promptOptions = { prompt: 'Please enter product color.' };

        return await step.prompt(PRODUCT_COLOR_PROMPT, promptOptions);
    }

    // step 10
    async batchNoStep(step) {
        step.values.claimInterInfo.prodcutColor = step.result;

        const promptOptions = { prompt: 'Please enter batch number.' };

        return await step.prompt(BATCH_NO_PROMPT, promptOptions);
    }

    // step 11
    async invoiceSoNumberStep(step) {
        step.values.claimInterInfo.batchNo = step.result;

        const promptOptions = { prompt: 'Please enter invoice / SO number.' };

        return await step.prompt(INVOICE_SO_NUMBER_PROMPT, promptOptions);
    }

    // step 12
    async defectProblemStep(step) {
        step.values.claimInterInfo.invoiceSoNumber = step.result;

        const promptOptions = { prompt: 'Please enter defect problem.' };

        return await step.prompt(DEFECT_PROBLEM_PROMPT, promptOptions);
    }

    // step 13
    async defectPictureStep(step) {
        step.values.claimInterInfo.defectProblem = step.result;

        const promptOptions = { prompt: 'Please upload defect picture.' };

        return await step.prompt(DEFECT_PICTURE_PROMPT, promptOptions);
    }

    // step 14
    async qtyOfDefectStep(step) {
        step.values.claimInterInfo.defectPicture = step.result;

        const promptOptions = { prompt: 'Please enter qty of defect.' };

        return await step.prompt(QTY_OF_DEFECT_PROMPT, promptOptions);
    }

    // step 15
    async qtyInSaleOrderStep(step) {
        step.values.claimInterInfo.qtyOfDefect = step.result;

        const promptOptions = { prompt: 'Please enter qty in sale order.' };

        return await step.prompt(QTY_IN_SALE_ORDER_PROMPT, promptOptions);
    }

    // step 16
    async claimCostStep(step) {
        step.values.claimInterInfo.qtyInSaleOrder = step.result;

        const promptOptions = { prompt: 'Please enter claim cost.' };

        return await step.prompt(CLAIM_COST_PROMPT, promptOptions);
    }

    // step 17
    async labelPictureStep(step) {
        step.values.claimInterInfo.claimCost = step.result;

        const promptOptions = { prompt: 'Please upload The white Label/Stamping batch/Inkjet picture.' };

        return await step.prompt(LABEL_PICTURE_PROMPT, promptOptions);
    }

    // step 18
    async beforeOrAfterInstallationProblemStep(step) {
        step.values.claimInterInfo.labelPicture = step.result;

        return await step.prompt(BEFORE_OR_AFTER_INSTALLATION_PROBLEM_PROMPT, {
            prompt: 'Found problem before or after installation.',
            choices: ChoiceFactory.toChoices(['before', 'after'])
        });
    }

    // step 19
    async beforeOrAfterInstallationActStep(step) {
        step.values.claimInterInfo.beforeOrAfterInstalltaionProblem = step.result.value;

        let user = await this.userProfile.get(step.context, {});
        user.claimInterInfo = step.values.claimInterInfo;
        await this.userProfile.set(step.context, user);

        switch (step.values.claimInterInfo.beforeOrAfterInstalltaionProblem) {
            case 'before': {
                return await step.replaceDialog(BEFORE_INSTALLTAION_PROBLEM_DIALOG);
            }
            case 'after': {
                return await step.replaceDialog(AFTER_INSTALLTAION_PROBLEM_DIALOG);
            }
        }
    }

    // step 19.1.1.1
    async problemInContainerPictureConfirmStep(step) {
        step.values.beforeInstallationProblem = new BeforeInstallationProblemModel();

        return await step.prompt(CONFIRM_PROMPT, {
            prompt: 'Found problem in container ?'
        });
    }

    // step 19.1.1.2
    async problemInContainerPictureStep(step) {
        if (step.result) {
            const promptOptions = { prompt: 'Please upload problem in container picture.' };
            return await step.prompt(PROBLEM_IN_CONTAINER_PICTURE_PROMPT, promptOptions);
        } else {
            return await step.next();
        }
    }

    // step 19.1.2.1
    async problemInWarehousePictureConfirmStep(step) {
        step.values.beforeInstallationProblem.problemInContainerPicture = step.result;

        return await step.prompt(CONFIRM_PROMPT, {
            prompt: 'Found problem in warehouse ?'
        });
    }

    // step 19.1.2.2
    async problemInWarehousePictureStep(step) {
        if (step.result) {
            const promptOptions = { prompt: 'Please upload problem in warehouse picture.' };
            return await step.prompt(PROBLEM_IN_WAREHOUSE_PICTURE_PROMPT, promptOptions);
        } else {
            return await step.next();
        }
    }

    // step 19.1.3.1
    async problemWhileUnloadOrMovingPictureConfirmStep(step) {
        step.values.beforeInstallationProblem.problemInWarehousePicture = step.result;

        return await step.prompt(CONFIRM_PROMPT, {
            prompt: 'Found problem while unload / moving ?'
        });
    }

    // step 19.1.3.2
    async problemWhileUnloadOrMovingPictureStep(step) {
        if (step.result) {
            const promptOptions = { prompt: 'Please upload problem while unload / moving picture.' };
            return await step.prompt(PROBLEM_WHILE_UNLOAD_OR_MOVING_PICTURE_PROMPT, promptOptions);
        } else {
            return await step.next();
        }
    }

    // step 19.1.4
    async confirmBeforeStep(step) {
        step.values.beforeInstallationProblem.problemWhileUnloadingOrMovingPicture = step.result;

        // show summary data

        return await step.prompt(CONFIRM_PROMPT, {
            prompt: 'Confirm claim ?'
        });
    }

    // step 19.1.5
    async summaryBeforeStep(step) {
        if (step.result) {
            let user = await this.userProfile.get(step.context, {});
            user.claimInterInfo.beforeInstallationProblem = step.values.beforeInstallationProblem;
            await this.userProfile.set(step.context, user);
            await step.context.sendActivity('Claim success !');
        } else {
            await step.context.sendActivity('Your claim will not be kept.');
        }

        return await step.endDialog();
    }

    // step 19.2.1
    async installationMethodStep(step) {
        step.values.afterInstallationProblem = new AfterInstallationProblemModel();

        const promptOptions = { prompt: 'Please enter the installation method.' };

        return await step.prompt(INSTALLATION_METHOD_PROMPT, promptOptions);
    }

    // step 19.2.2
    async equipmentTypeStep(step) {
        step.values.afterInstallationProblem.installationMethod = step.result;

        const promptOptions = { prompt: 'Please enter The equipment / tooling / Accessary (such as nailing type, screw type, compound type, color type, drilling type, etc)' };

        return await step.prompt(EQUIPMENT_TYPE_PROMPT, promptOptions);
    }

    // step 19.2.3
    async environmentInstallationStep(step) {
        step.values.afterInstallationProblem.equipmentType = step.result;

        const promptOptions = { prompt: 'Please enter Weather / Environment during installation (such as rainy, cold, hot, etc)' };

        return await step.prompt(ENVIRONMENT_INSTALLATION_PROMPT, promptOptions);
    }

    // step 19.2.4
    async whenInstallationProblemStep(step) {
        step.values.afterInstallationProblem.environmentInstallation = step.result;

        const promptOptions = { prompt: 'Please enter When the problem occurred after installed (such as during installation , or week , month , year ago)' };

        return await step.prompt(WHEN_INSTALLATION_PROBLEM_PROMPT, promptOptions);
    }

    // step 19.2.5
    async keepFinishedGoodsStep(step) {
        step.values.afterInstallationProblem.whenInstallationProblem = step.result;

        const promptOptions = { prompt: 'Please enter How to keep the Finished goods before or during installation (such as keep in warehouse, etc)' };

        return await step.prompt(KEEP_FINISHED_GOODS_PROMPT, promptOptions);
    }

    // step 19.2.6
    async installationAreaStep(step) {
        step.values.afterInstallationProblem.keepFinishedGoods = step.result;

        const promptOptions = { prompt: 'Please enter Environment around using area or installation area (such as area in the garden which directly both water and sun, etc)' };

        return await step.prompt(INSTALLATION_AREA_PROMPT, promptOptions);
    }

    // step 19.2.7
    async confirmAfterStep(step) {
        step.values.afterInstallationProblem.installationArea = step.result;

        // show summary data

        return await step.prompt(CONFIRM_PROMPT, {
            prompt: 'Confirm claim ?'
        });
    }

    // step 19.2.8
    async summaryAfterStep(step) {
        if (step.result) {
            let user = await this.userProfile.get(step.context, {});
            user.claimInterInfo.afterInstallationProblem = step.values.afterInstallationProblem;
            await this.userProfile.set(step.context, user);
            await step.context.sendActivity('Claim success !');
        } else {
            await step.context.sendActivity('Your claim will not be kept.');
        }

        return await step.endDialog();
    }

    async summaryStep(step) {
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