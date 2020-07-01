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
const helpers = new Helpers();

// main dialog prompt
const DISTRIBUTOR_CODE_PROMPT = 'DISTRIBUTOR_CODE_PROMPT';
const RETAILER_NAME_PROMPT = 'RETAILER_NAME_PROMPT';
const NAME_OF_CONTACT_PERSON_PROMPT = 'NAME_OF_CONTACT_PERSON_PROMPT';
const TELEPHONE_NUMBER_PROMPT = 'TELEPHONE_NUMBER_PROMPT';
const CUSTOMER_ADDRESS_PROMPT = 'CUSTOMER_ADDRESS_PROMPT';
const DIVISION_PROMPT = 'DIVISION_PROMPT';
const PRODUCT_NAME_PROMPT = 'PRODUCT_NAME_PROMPT';
const PRODUCT_GROUP_PROMPT = 'PRODUCT_GROUP_PROMPT';
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
const REMARKS_PROMPT = 'REMARKS_PROMPT';

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

        this.addDialog(new TextPrompt(DISTRIBUTOR_CODE_PROMPT, async (prompt) => {
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
        this.addDialog(new TextPrompt(RETAILER_NAME_PROMPT));
        this.addDialog(new TextPrompt(NAME_OF_CONTACT_PERSON_PROMPT));
        this.addDialog(new TextPrompt(TELEPHONE_NUMBER_PROMPT));
        this.addDialog(new TextPrompt(CUSTOMER_ADDRESS_PROMPT));
        this.addDialog(new TextPrompt(DIVISION_PROMPT));
        this.addDialog(new TextPrompt(PRODUCT_NAME_PROMPT));
        this.addDialog(new TextPrompt(PRODUCT_GROUP_PROMPT));
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
        this.addDialog(new TextPrompt(REMARKS_PROMPT));
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
            this.summaryBeforeStep.bind(this),
            this.submitBeforeStep.bind(this)
        ]));
        this.addDialog(new WaterfallDialog(AFTER_INSTALLTAION_PROBLEM_DIALOG, [
            this.installationMethodStep.bind(this),
            this.equipmentTypeStep.bind(this),
            this.environmentInstallationStep.bind(this),
            this.whenInstallationProblemStep.bind(this),
            this.keepFinishedGoodsStep.bind(this),
            this.installationAreaStep.bind(this),
            this.summaryAfterStep.bind(this),
            this.submitAfterStep.bind(this)
        ]));

        this.initialDialogId = WATERFALL_DIALOG;
    }

    // step 1
    async distributorCodeStep(step) {
        const promptOptions = { prompt: 'Please enter distributor code.' };

        return await step.prompt(DISTRIBUTOR_CODE_PROMPT, promptOptions);
    }

    // step 2
    async retailerNameStep(step) {
        let user = await this.userProfile.get(step.context, {});

        user.claimInterInfo = new ClaimInterModel();

        //save customer data
        let customer = user.customerInfo[0];
        user.claimInterInfo.distributorCode = customer.KUNNR;
        user.claimInterInfo.distributorName = customer.TITLE_MEDI + " " + customer.NAME1;
        user.claimInterInfo.distributorAddress = customer.FULLADR;

        await this.userProfile.set(step.context, user);

        await step.context.sendActivity(`Distributor name is ${user.claimInterInfo.distributorName}\n\nDistributor address is ${user.claimInterInfo.distributorAddress}`);

        const promptOptions = { prompt: 'Please enter retailer name.' };

        return await step.prompt(RETAILER_NAME_PROMPT, promptOptions);
    }

    // step 3
    async nameOfContactPersonStep(step) {
        let user = await this.userProfile.get(step.context, {});

        user.claimInterInfo.retailerName = step.result;

        await this.userProfile.set(step.context, user);

        const promptOptions = { prompt: 'Please enter the name of the contact person.' };

        return await step.prompt(NAME_OF_CONTACT_PERSON_PROMPT, promptOptions);
    }

    // step 4
    async telephoneNumberStep(step) {
        let user = await this.userProfile.get(step.context, {});

        user.claimInterInfo.nameOfContactPerson = step.result;

        await this.userProfile.set(step.context, user);

        const promptOptions = { prompt: 'Please enter telephone number.' };

        return await step.prompt(NAME_OF_CONTACT_PERSON_PROMPT, promptOptions);
    }

    // step 5
    async customerAddressStep(step) {
        let user = await this.userProfile.get(step.context, {});

        user.claimInterInfo.telephoneNumber = step.result;

        await this.userProfile.set(step.context, user);

        const promptOptions = { prompt: 'Please enter customer address.' };

        return await step.prompt(NAME_OF_CONTACT_PERSON_PROMPT, promptOptions);
    }

    // step 6
    async divisionStep(step) {
        let user = await this.userProfile.get(step.context, {});

        user.claimInterInfo.customerAddress = step.result;

        await this.userProfile.set(step.context, user);


        await step.context.sendActivity({ attachments: [menu.divisionMenu()] });
        return await step.prompt(DIVISION_PROMPT);
    }

    // step 7
    async productNameStep(step) {
        let user = await this.userProfile.get(step.context, {});

        user.claimInterInfo.division = step.result;

        await this.userProfile.set(step.context, user);

        await step.context.sendActivity({ attachments: [menu.productsMenu(user.claimInterInfo.division)] });
        return await step.prompt(PRODUCT_NAME_PROMPT);
    }

    // step 8
    async productGroupStep(step) {
        let user = await this.userProfile.get(step.context, {});

        user.claimInterInfo.productName = step.result;

        await this.userProfile.set(step.context, user);

        const promptOptions = { prompt: 'Please enter product group (Floor plank, Plank, Eave or ...etc)' };

        return await step.prompt(PRODUCT_GROUP_PROMPT, promptOptions);
    }

    // step 9
    async productSizeStep(step) {
        let user = await this.userProfile.get(step.context, {});

        user.claimInterInfo.productGroup = step.result;

        await this.userProfile.set(step.context, user);

        const promptOptions = { prompt: 'Please enter product size.' };

        return await step.prompt(PRODUCT_SIZE_PROMPT, promptOptions);
    }

    // step 10
    async productColorStep(step) {
        let user = await this.userProfile.get(step.context, {});

        user.claimInterInfo.productSize = step.result;

        await this.userProfile.set(step.context, user);

        const promptOptions = { prompt: 'Please enter product color.' };

        return await step.prompt(PRODUCT_COLOR_PROMPT, promptOptions);
    }

    // step 11
    async batchNoStep(step) {
        let user = await this.userProfile.get(step.context, {});

        user.claimInterInfo.productColor = step.result;

        await this.userProfile.set(step.context, user);

        const promptOptions = { prompt: 'Please enter batch number.' };

        return await step.prompt(BATCH_NO_PROMPT, promptOptions);
    }

    // step 12
    async invoiceSoNumberStep(step) {
        let user = await this.userProfile.get(step.context, {});

        user.claimInterInfo.batchNo = step.result;

        await this.userProfile.set(step.context, user);

        const promptOptions = { prompt: 'Please enter invoice / SO number.' };

        return await step.prompt(INVOICE_SO_NUMBER_PROMPT, promptOptions);
    }

    // step 13
    async defectProblemStep(step) {
        let user = await this.userProfile.get(step.context, {});

        user.claimInterInfo.invoiceSoNumber = step.result;

        await this.userProfile.set(step.context, user);

        const promptOptions = { prompt: 'Please enter defect problem.' };

        return await step.prompt(DEFECT_PROBLEM_PROMPT, promptOptions);
    }

    // step 14
    async defectPictureStep(step) {
        let user = await this.userProfile.get(step.context, {});

        user.claimInterInfo.defectProblem = step.result;

        await this.userProfile.set(step.context, user);

        const promptOptions = { prompt: 'Please upload defect picture.' };

        return await step.prompt(DEFECT_PICTURE_PROMPT, promptOptions);
    }

    // step 15
    async qtyOfDefectStep(step) {
        let defectPicture = step.result[0];

        var str = defectPicture.name;
        var arr = str.split(".");
        defectPicture.name = `defectPicture.${arr[1]}`

        let user = await this.userProfile.get(step.context, {});

        user.claimInterInfo.defectPicture = defectPicture;

        await this.userProfile.set(step.context, user);

        const promptOptions = { prompt: 'Please enter qty of defect. (Pcs.)' };

        return await step.prompt(QTY_OF_DEFECT_PROMPT, promptOptions);
    }

    // step 16
    async qtyInSaleOrderStep(step) {
        let user = await this.userProfile.get(step.context, {});

        user.claimInterInfo.qtyOfDefect = step.result;

        await this.userProfile.set(step.context, user);

        const promptOptions = { prompt: 'Please enter qty in sale order. (Pcs.)' };

        return await step.prompt(QTY_IN_SALE_ORDER_PROMPT, promptOptions);
    }

    // step 17
    async claimCostStep(step) {
        let user = await this.userProfile.get(step.context, {});

        user.claimInterInfo.qtyInSaleOrder = step.result;

        await this.userProfile.set(step.context, user);

        const promptOptions = { prompt: 'Please enter claim cost. (USD, etc)' };

        return await step.prompt(CLAIM_COST_PROMPT, promptOptions);
    }

    // step 18
    async labelPictureStep(step) {
        let user = await this.userProfile.get(step.context, {});

        user.claimInterInfo.claimCost = step.result;

        await this.userProfile.set(step.context, user);

        const promptOptions = { prompt: 'Please upload The white Label/Stamping batch/Inkjet picture.' };

        return await step.prompt(LABEL_PICTURE_PROMPT, promptOptions);
    }

    // step 19
    async beforeOrAfterInstallationProblemStep(step) {
        let labelPicture = step.result[0];

        var str = labelPicture.name;
        var arr = str.split(".");
        labelPicture.name = `labelPicture.${arr[1]}`

        let user = await this.userProfile.get(step.context, {});

        user.claimInterInfo.labelPicture = labelPicture;

        await this.userProfile.set(step.context, user);

        return await step.prompt(BEFORE_OR_AFTER_INSTALLATION_PROBLEM_PROMPT, {
            prompt: 'Found problem before or after installation.',
            choices: ChoiceFactory.toChoices(['before', 'after'])
        });
    }

    // step 20
    async beforeOrAfterInstallationActStep(step) {
        let user = await this.userProfile.get(step.context, {});
        user.claimInterInfo.beforeOrAfterInstalltaionProblem = step.result.value;
        await this.userProfile.set(step.context, user);

        switch (user.claimInterInfo.beforeOrAfterInstalltaionProblem) {
            case 'before': {
                return await step.replaceDialog(BEFORE_INSTALLTAION_PROBLEM_DIALOG);
            }
            case 'after': {
                return await step.replaceDialog(AFTER_INSTALLTAION_PROBLEM_DIALOG);
            }
        }
    }

    // step 20.1.1.1
    async problemInContainerPictureConfirmStep(step) {
        let user = await this.userProfile.get(step.context, {});
        user.claimInterInfo.beforeInstallationProblem = new BeforeInstallationProblemModel();
        await this.userProfile.set(step.context, user);

        return await step.prompt(CONFIRM_PROMPT, {
            prompt: 'Found problem in container ?'
        });
    }

    // step 20.1.1.2
    async problemInContainerPictureStep(step) {
        if (step.result) {
            const promptOptions = { prompt: 'Please upload problem in container picture.' };
            return await step.prompt(PROBLEM_IN_CONTAINER_PICTURE_PROMPT, promptOptions);
        } else {
            return await step.next();
        }
    }

    // step 20.1.2.1
    async problemInWarehousePictureConfirmStep(step) {
        if (step.result) {
            let problemInContainerPicture = step.result[0];
            var str = problemInContainerPicture.name;
            var arr = str.split(".");
            problemInContainerPicture.name = `problemInContainerPicture.${arr[1]}`

            let user = await this.userProfile.get(step.context, {});
            user.claimInterInfo.beforeInstallationProblem.problemInContainerPicture = problemInContainerPicture;
            await this.userProfile.set(step.context, user);
        }

        return await step.prompt(CONFIRM_PROMPT, {
            prompt: 'Found problem in warehouse ?'
        });
    }

    // step 20.1.2.2
    async problemInWarehousePictureStep(step) {
        if (step.result) {
            const promptOptions = { prompt: 'Please upload problem in warehouse picture.' };
            return await step.prompt(PROBLEM_IN_WAREHOUSE_PICTURE_PROMPT, promptOptions);
        } else {
            return await step.next();
        }
    }

    // step 20.1.3.1
    async problemWhileUnloadOrMovingPictureConfirmStep(step) {
        if (step.result) {
            let problemInWarehousePicture = step.result[0];
            var str = problemInWarehousePicture.name;
            var arr = str.split(".");
            problemInWarehousePicture.name = `problemInWarehousePicture.${arr[1]}`

            let user = await this.userProfile.get(step.context, {});
            user.claimInterInfo.beforeInstallationProblem.problemInWarehousePicture = problemInWarehousePicture;
            await this.userProfile.set(step.context, user);
        }

        return await step.prompt(CONFIRM_PROMPT, {
            prompt: 'Found problem while unload / moving ?'
        });
    }

    // step 20.1.3.2
    async problemWhileUnloadOrMovingPictureStep(step) {
        if (step.result) {
            const promptOptions = { prompt: 'Please upload problem while unload / moving picture.' };
            return await step.prompt(PROBLEM_WHILE_UNLOAD_OR_MOVING_PICTURE_PROMPT, promptOptions);
        } else {
            return await step.next();
        }
    }

    // step 20.1.4
    async remarksBeforeStep(step) {
        if (step.result) {
            let problemWhileUnloadingOrMovingPicture = step.result[0];
            var str = problemWhileUnloadingOrMovingPicture.name;
            var arr = str.split(".");
            problemWhileUnloadingOrMovingPicture.name = `problemWhileUnloadingOrMovingPicture.${arr[1]}`

            user.claimInterInfo.beforeInstallationProblem.problemWhileUnloadingOrMovingPicture = problemWhileUnloadingOrMovingPicture;
        }

        const promptOptions = { prompt: 'Please enter remarks information (if no please enter "-").' };

        return await step.prompt(REMARKS_PROMPT, promptOptions);
    }

    // step 20.1.5
    async summaryBeforeStep(step) {
        let user = await this.userProfile.get(step.context, {});

        user.claimInterInfo.remarks = step.result;

        //Clear Image Cach
        user.claimInterInfo.imagesResult = [];

        // collect images from standard flow
        for (const prop in user.claimInterInfo) {
            if (user.claimInterInfo[prop].name) {
                var obj = {};
                obj.name = user.claimInterInfo[prop].name;
                obj.contentType = user.claimInterInfo[prop].contentType;
                obj.contentUrl = user.claimInterInfo[prop].contentUrl;
                user.claimInterInfo.imagesResult.push(obj);
            }
        }

        // collect images from before installation problem flow
        for (const prop in user.claimInterInfo.beforeInstallationProblem) {
            if (user.claimInterInfo.beforeInstallationProblem[prop].name) {
                var obj = {};
                obj.name = user.claimInterInfo.beforeInstallationProblem[prop].name;
                obj.contentType = user.claimInterInfo.beforeInstallationProblem[prop].contentType;
                obj.contentUrl = user.claimInterInfo.beforeInstallationProblem[prop].contentUrl;
                user.claimInterInfo.imagesResult.push(obj);
            }
        }

        // save
        await this.userProfile.set(step.context, user);

        // show summary data
        let msg = `--Summary Claim--\n\n`;
        msg = msg + `Distributor code: ${user.claimInterInfo.distributorCode}\n\n`;
        msg = msg + `Distributor name: ${user.claimInterInfo.distributorName}\n\n`;
        msg = msg + `Distributor address: ${user.claimInterInfo.distributorAddress}\n\n`;
        msg = msg + `Retailer name: ${user.claimInterInfo.retailerName}\n\n`;
        msg = msg + `Contact person name: ${user.claimInterInfo.nameOfContactPerson}\n\n`;
        msg = msg + `Telephone number: ${user.claimInterInfo.telephoneNumber}\n\n`;
        msg = msg + `Customer address: ${user.claimInterInfo.customerAddress}\n\n`;
        msg = msg + `Division: ${user.claimInterInfo.division}\n\n`;
        msg = msg + `Product name: ${user.claimInterInfo.productName}\n\n`;
        msg = msg + `Product group: ${user.claimInterInfo.productGroup}\n\n`;
        msg = msg + `Product size: ${user.claimInterInfo.productSize}\n\n`;
        msg = msg + `Product color: ${user.claimInterInfo.productColor}\n\n`;
        msg = msg + `Batch no.: ${user.claimInterInfo.batchNo}\n\n`;
        msg = msg + `Invoice / SO number: ${user.claimInterInfo.invoiceSoNumber}\n\n`;
        msg = msg + `Defect Problem: ${user.claimInterInfo.defectProblem}\n\n`;
        msg = msg + `QTY of defect: ${user.claimInterInfo.qtyOfDefect}\n\n`;
        msg = msg + `QTY in sale order: ${user.claimInterInfo.qtyInSaleOrder}\n\n`;
        msg = msg + `Claim cost: ${user.claimInterInfo.claimCost}\n\n`;
        msg = msg + `Before or After Installation problem: ${user.claimInterInfo.beforeOrAfterInstalltaionProblem}\n\n`;
        msg = msg + `Remarks: ${user.claimInterInfo.remarks}`;

        await step.context.sendActivity(msg);
        await step.context.sendActivity({
            attachments: user.claimInterInfo.imagesResult
        });

        return await step.prompt(CONFIRM_PROMPT, {
            prompt: 'Confirm claim ?'
        });
    }

    // step 20.1.6
    async submitBeforeStep(step) {
        if (step.result) {
            let user = await this.userProfile.get(step.context, {});
            await step.context.sendActivity('Claim success !');
            helpers.sendMailTest(user);
        } else {
            await step.context.sendActivity('Your claim will not be kept.');
        }

        return await step.endDialog();
    }

    // step 20.2.1
    async installationMethodStep(step) {
        let user = await this.userProfile.get(step.context, {});
        user.claimInterInfo.afterInstallationProblem = new AfterInstallationProblemModel();
        await this.userProfile.set(step.context, user);

        const promptOptions = { prompt: 'Please enter the installation method.' };

        return await step.prompt(INSTALLATION_METHOD_PROMPT, promptOptions);
    }

    // step 20.2.2
    async equipmentTypeStep(step) {
        let user = await this.userProfile.get(step.context, {});
        user.claimInterInfo.afterInstallationProblem.installationMethod = step.result;
        await this.userProfile.set(step.context, user);

        const promptOptions = { prompt: 'Please enter The equipment / tooling / Accessary (such as nailing type, screw type, compound type, color type, drilling type, etc)' };

        return await step.prompt(EQUIPMENT_TYPE_PROMPT, promptOptions);
    }

    // step 20.2.3
    async environmentInstallationStep(step) {
        let user = await this.userProfile.get(step.context, {});
        user.claimInterInfo.afterInstallationProblem.equipmentType = step.result;
        await this.userProfile.set(step.context, user);

        const promptOptions = { prompt: 'Please enter Weather / Environment during installation (such as rainy, cold, hot, etc)' };

        return await step.prompt(ENVIRONMENT_INSTALLATION_PROMPT, promptOptions);
    }

    // step 20.2.4
    async whenInstallationProblemStep(step) {
        let user = await this.userProfile.get(step.context, {});
        user.claimInterInfo.afterInstallationProblem.environmentInstallation = step.result;
        await this.userProfile.set(step.context, user);

        const promptOptions = { prompt: 'Please enter When the problem occurred after installed (such as during installation , or week , month , year ago)' };

        return await step.prompt(WHEN_INSTALLATION_PROBLEM_PROMPT, promptOptions);
    }

    // step 20.2.5
    async keepFinishedGoodsStep(step) {
        let user = await this.userProfile.get(step.context, {});
        user.claimInterInfo.afterInstallationProblem.whenInstallationProblem = step.result;
        await this.userProfile.set(step.context, user);

        const promptOptions = { prompt: 'Please enter How to keep the Finished goods before or during installation (such as keep in warehouse, etc)' };

        return await step.prompt(KEEP_FINISHED_GOODS_PROMPT, promptOptions);
    }

    // step 20.2.6
    async installationAreaStep(step) {
        let user = await this.userProfile.get(step.context, {});
        user.claimInterInfo.afterInstallationProblem.keepFinishedGoods = step.result;
        await this.userProfile.set(step.context, user);

        const promptOptions = { prompt: 'Please enter Environment around using area or installation area (such as area in the garden which directly both water and sun, etc)' };

        return await step.prompt(INSTALLATION_AREA_PROMPT, promptOptions);
    }

    // step 20.2.7
    async remarksAfterStep(step) {
        let user = await this.userProfile.get(step.context, {});
        user.claimInterInfo.afterInstallationProblem.installationArea = step.result;
        await this.userProfile.set(step.context, user);

        const promptOptions = { prompt: 'Please enter remarks information (if no please enter "-").' };

        return await step.prompt(REMARKS_PROMPT, promptOptions);
    }

    // step 20.2.8
    async summaryAfterStep(step) {
        let user = await this.userProfile.get(step.context, {});

        user.claimInterInfo.remarks = step.result;

        //Clear Image Cach
        user.claimInterInfo.imagesResult = [];

        // collect images from standard flow
        for (const prop in user.claimInterInfo) {
            if (user.claimInterInfo[prop].name) {
                var obj = {};
                obj.name = user.claimInterInfo[prop].name;
                obj.contentType = user.claimInterInfo[prop].contentType;
                obj.contentUrl = user.claimInterInfo[prop].contentUrl;
                user.claimInterInfo.imagesResult.push(obj);
            }
        }

        await this.userProfile.set(step.context, user);

        // show summary data
        let msg = `--Summary Claim--\n\n`;
        msg = msg + `Distributor code: ${user.claimInterInfo.distributorCode}\n\n`;
        msg = msg + `Distributor name: ${user.claimInterInfo.distributorName}\n\n`;
        msg = msg + `Distributor address: ${user.claimInterInfo.distributorAddress}\n\n`;
        msg = msg + `Retailer name: ${user.claimInterInfo.retailerName}\n\n`;
        msg = msg + `Contact person name: ${user.claimInterInfo.nameOfContactPerson}\n\n`;
        msg = msg + `Telephone number: ${user.claimInterInfo.telephoneNumber}\n\n`;
        msg = msg + `Customer address: ${user.claimInterInfo.customerAddress}\n\n`;
        msg = msg + `Division: ${user.claimInterInfo.division}\n\n`;
        msg = msg + `Product name: ${user.claimInterInfo.productName}\n\n`;
        msg = msg + `Product group: ${user.claimInterInfo.productGroup}\n\n`;
        msg = msg + `Product size: ${user.claimInterInfo.productSize}\n\n`;
        msg = msg + `Product color: ${user.claimInterInfo.productColor}\n\n`;
        msg = msg + `Batch no.: ${user.claimInterInfo.batchNo}\n\n`;
        msg = msg + `Invoice / SO number: ${user.claimInterInfo.invoiceSoNumber}\n\n`;
        msg = msg + `Defect Problem: ${user.claimInterInfo.defectProblem}\n\n`;
        msg = msg + `QTY of defect: ${user.claimInterInfo.qtyOfDefect}\n\n`;
        msg = msg + `QTY in sale order: ${user.claimInterInfo.qtyInSaleOrder}\n\n`;
        msg = msg + `Claim cost: ${user.claimInterInfo.claimCost}\n\n`;
        msg = msg + `Before or After Installation problem: ${user.claimInterInfo.beforeOrAfterInstalltaionProblem}\n\n`;
        msg = msg + `The Installation method: ${user.claimInterInfo.afterInstallationProblem.installationMethod}\n\n`;
        msg = msg + `The equipment / tooling / Accessary: ${user.claimInterInfo.afterInstallationProblem.equipmentType}\n\n`;
        msg = msg + `Weather / Environment during installation: ${user.claimInterInfo.afterInstallationProblem.environmentInstallation}\n\n`;
        msg = msg + `When the problem occurred after installed: ${user.claimInterInfo.afterInstallationProblem.whenInstallationProblem}\n\n`;
        msg = msg + `How to keep the Finished goods before or during installation: ${user.claimInterInfo.afterInstallationProblem.keepFinishedGoods}\n\n`;
        msg = msg + `Environment around using area or installation area: ${user.claimInterInfo.afterInstallationProblem.installationArea}\n\n`;
        msg = msg + `Remarks: ${user.claimInterInfo.remarks}`;

        await step.context.sendActivity(msg);
        await step.context.sendActivity({
            attachments: user.claimInterInfo.imagesResult
        });

        return await step.prompt(CONFIRM_PROMPT, {
            prompt: 'Confirm claim ?'
        });
    }

    // step 19.2.8
    async submitAfterStep(step) {
        if (step.result) {
            let user = await this.userProfile.get(step.context, {});

            await step.context.sendActivity('Claim success !');

            helpers.sendMailAfterInter(user);
        } else {
            await step.context.sendActivity('Your claim will not be kept.');
        }

        return await step.endDialog();
    }
}

module.exports.ClaimInterDialog = ClaimInterDialog;
module.exports.CLAIM_INTER_DIALOG = CLAIM_INTER_DIALOG;