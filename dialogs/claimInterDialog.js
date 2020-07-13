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
const empty = require('is-empty');

const menu = new MyMenu();
const services = new Services();
const helpers = new Helpers();

// text
const EDIT = 'edit';
const LOOP = 'loop';
const YES = 'yes';
const NO = 'no';

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

// general prompt
const CHOICE_PROMPT = 'CHOICE_PROMPT';
const CONFIRM_PROMPT = 'CONFIRM_PROMPT';

// dialog
const CLAIM_INTER_DIALOG = 'CLAIM_INTER_DIALOG';
const BEFORE_INSTALLTAION_PROBLEM_DIALOG = 'BEFORE_INSTALLTAION_PROBLEM_DIALOG';
const AFTER_INSTALLTAION_PROBLEM_DIALOG = 'AFTER_INSTALLTAION_PROBLEM_DIALOG';
const WATERFALL_DIALOG = 'WATERFALL_DIALOG';

// repeat dialog
const REPEAT_RETAILER_NAME_DIALOG = 'REPEAT_RETAILER_NAME_DIALOG';
const REPEAT_NAME_OF_CONTACT_PERSON_DIALOG = 'REPEAT_NAME_OF_CONTACT_PERSON_DIALOG';
const REPEAT_TELEPHONE_NUMBER_DIALOG = 'REPEAT_TELEPHONE_NUMBER_DIALOG';
const REPEAT_CUSTOMER_ADDRESS_DIALOG = 'REPEAT_CUSTOMER_ADDRESS_DIALOG';
const REPEAT_DIVISION_DIALOG = 'REPEAT_DIVISION_DIALOG';
const REPEAT_PRODUCT_NAME_DIALOG = 'REPEAT_PRODUCT_NAME_DIALOG';
const REPEAT_PRODUCT_GROUP_DIALOG = 'REPEAT_PRODUCT_GROUP_DIALOG';
const REPEAT_PRODUCT_SIZE_DIALOG = 'REPEAT_PRODUCT_SIZE_DIALOG';
const REPEAT_PRODUCT_COLOR_DIALOG = 'REPEAT_PRODUCT_COLOR_DIALOG';
const REPEAT_BATCH_NO_DIALOG = 'REPEAT_BATCH_NO_DIALOG';
const REPEAT_INVOICE_SO_NUMBER_DIALOG = 'REPEAT_INVOICE_SO_NUMBER_DIALOG';
const REPEAT_DEFECT_PROBLEM_DIALOG = 'REPEAT_DEFECT_PROBLEM_DIALOG';
const REPEAT_DEFECT_PICTURE_DIALOG = 'REPEAT_DEFECT_PICTURE_DIALOG';
const REPEAT_QTY_OF_DEFECT_DIALOG = 'REPEAT_QTY_OF_DEFECT_DIALOG';
const REPEAT_QTY_IN_SALE_ORDER_DIALOG = 'REPEAT_QTY_IN_SALE_ORDER_DIALOG';
const REPEAT_CLAIM_COST_DIALOG = 'REPEAT_CLAIM_COST_DIALOG';
const REPEAT_LABEL_PICTURE_DIALOG = 'REPEAT_LABEL_PICTURE_DIALOG';
const REPEAT_BEFORE_OR_AFTER_INSTALLATION_PROBLEM_DIALOG = 'REPEAT_BEFORE_OR_AFTER_INSTALLATION_PROBLEM_DIALOG';
const REPEAT_REMARKS_BEFORE_DIALOG = 'REPEAT_REMARKS_BEFORE_DIALOG';
const REPEAT_REMARKS_AFTER_DIALOG = 'REPEAT_REMARKS_AFTER_DIALOG';
const REPEAT_PROBLEM_IN_WAREHOUSE_PICTURE_DIALOG = 'REPEAT_PROBLEM_IN_WAREHOUSE_PICTURE_DIALOG';
const REPEAT_PROBLEM_WHILE_UNLOAD_OR_MOVING_PICTURE_DIALOG = 'REPEAT_PROBLEM_WHILE_UNLOAD_OR_MOVING_PICTURE_DIALOG';
const REPEAT_EQUIPMENT_TYPE_DIALOG = 'REPEAT_EQUIPMENT_TYPE_DIALOG';
const REPEAT_ENVIRONMENT_INSTALLATION_DIALOG = 'REPEAT_ENVIRONMENT_INSTALLATION_DIALOG';
const REPEAT_WHEN_INSTALLATION_PROBLEM_DIALOG = 'REPEAT_WHEN_INSTALLATION_PROBLEM_DIALOG';
const REPEAT_KEEP_FINISHED_GOODS_DIALOG = 'REPEAT_KEEP_FINISHED_GOODS_DIALOG';
const REPEAT_INSTALLATION_AREA_DIALOG = 'REPEAT_INSTALLATION_AREA_DIALOG    ';

// loop images dialog
const LOOP_DEFECT_PICTURE_DIALOG = 'LOOP_DEFECT_PICTURE_DIALOG';
const LOOP_LABEL_PICTURE_DIALOG = 'LOOP_LABEL_PICTURE_DIALOG';
const LOOP_PROBLEM_IN_CONTAINER_PICTURE_DIALOG = 'LOOP_PROBLEM_IN_CONTAINER_PICTURE_DIALOG';
const LOOP_PROBLEM_IN_WAREHOUSE_PICTURE_DIALOG = 'LOOP_PROBLEM_IN_WAREHOUSE_PICTURE_DIALOG';
const LOOP_PROBLEM_WHILE_UNLOAD_OR_MOVING_PICTURE_DIALOG = 'LOOP_PROBLEM_WHILE_UNLOAD_OR_MOVING_PICTURE_DIALOG';

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
        this.addDialog(new TextPrompt(DIVISION_PROMPT, async (prompt) => {
            if (prompt.recognized.succeeded) {
                if (prompt.recognized.value.trim().toLowerCase() === EDIT) {
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
        this.addDialog(new TextPrompt(PRODUCT_NAME_PROMPT, async (prompt) => {
            if (prompt.recognized.succeeded) {
                if (prompt.recognized.value.trim().toLowerCase() === EDIT) {
                    return true;
                }

                const productInfo = menu.productsInfo();
                const user = await this.userProfile.get(prompt.context, {});
                const division = user.claimInterInfo.division;

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
        this.addDialog(new TextPrompt(PRODUCT_GROUP_PROMPT));
        this.addDialog(new TextPrompt(PRODUCT_SIZE_PROMPT));
        this.addDialog(new TextPrompt(PRODUCT_COLOR_PROMPT));
        this.addDialog(new TextPrompt(BATCH_NO_PROMPT));
        this.addDialog(new TextPrompt(INVOICE_SO_NUMBER_PROMPT));
        this.addDialog(new TextPrompt(DEFECT_PROBLEM_PROMPT));
        this.addDialog(new AttachmentPrompt(DEFECT_PICTURE_PROMPT, async (prompt) => {
            if (prompt.context.activity.text.trim().toLowerCase() === EDIT || prompt.recognized.succeeded) {
                return true;
            }
        }));
        this.addDialog(new TextPrompt(QTY_OF_DEFECT_PROMPT));
        this.addDialog(new TextPrompt(QTY_IN_SALE_ORDER_PROMPT));
        this.addDialog(new TextPrompt(CLAIM_COST_PROMPT));
        this.addDialog(new AttachmentPrompt(LABEL_PICTURE_PROMPT, async (prompt) => {
            if (prompt.context.activity.text.trim().toLowerCase() === EDIT || prompt.recognized.succeeded) {
                return true;
            }
        }));
        this.addDialog(new ChoicePrompt(BEFORE_OR_AFTER_INSTALLATION_PROBLEM_PROMPT, async (prompt) => {
            if (prompt.context.activity.text.trim().toLowerCase() === EDIT || prompt.recognized.succeeded) {
                return true;
            }
        }));
        this.addDialog(new TextPrompt(REMARKS_PROMPT));
        this.addDialog(new AttachmentPrompt(PROBLEM_IN_CONTAINER_PICTURE_PROMPT, async (prompt) => {
            if (prompt.context.activity.text.trim().toLowerCase() === EDIT || prompt.recognized.succeeded) {
                return true;
            }
        }));
        this.addDialog(new AttachmentPrompt(PROBLEM_IN_WAREHOUSE_PICTURE_PROMPT, async (prompt) => {
            if (prompt.context.activity.text.trim().toLowerCase() === EDIT || prompt.recognized.succeeded) {
                return true;
            }
        }));
        this.addDialog(new AttachmentPrompt(PROBLEM_WHILE_UNLOAD_OR_MOVING_PICTURE_PROMPT, async (prompt) => {
            if (prompt.context.activity.text.trim().toLowerCase() === EDIT || prompt.recognized.succeeded) {
                return true;
            }
        }));
        this.addDialog(new TextPrompt(INSTALLATION_METHOD_PROMPT));
        this.addDialog(new TextPrompt(EQUIPMENT_TYPE_PROMPT));
        this.addDialog(new TextPrompt(ENVIRONMENT_INSTALLATION_PROMPT));
        this.addDialog(new TextPrompt(WHEN_INSTALLATION_PROBLEM_PROMPT));
        this.addDialog(new TextPrompt(KEEP_FINISHED_GOODS_PROMPT));
        this.addDialog(new TextPrompt(INSTALLATION_AREA_PROMPT));
        this.addDialog(new ChoicePrompt(CHOICE_PROMPT, async (prompt) => {
            if (prompt.context.activity.text.trim().toLowerCase() === EDIT || prompt.recognized.succeeded) {
                return true;
            }
        }));
        this.addDialog(new ConfirmPrompt(CONFIRM_PROMPT, async (prompt) => {
            if (prompt.context.activity.text.trim().toLowerCase() === EDIT || prompt.recognized.succeeded) {
                return true;
            }
        }));
        this.addDialog(new WaterfallDialog(WATERFALL_DIALOG, [
            this.distributorCodeStep.bind(this),
            this.retailerNameStep.bind(this),
            this.nameOfContactPersonStep.bind(this),
            this.telephoneNumberStep.bind(this),
            this.customerAddressStep.bind(this),
            this.divisionStep.bind(this),
            this.productNameStep.bind(this),
            this.productGroupStep.bind(this),
            this.productSizeStep.bind(this),
            this.productColorStep.bind(this),
            this.batchNoStep.bind(this),
            this.invoiceSoNumberStep.bind(this),
            this.defectProblemStep.bind(this),
            this.defectPictureStep.bind(this),
            this.defectPictureMoreStep.bind(this),
            this.qtyOfDefectStep.bind(this),
            this.qtyInSaleOrderStep.bind(this),
            this.claimCostStep.bind(this),
            this.labelPictureStep.bind(this),
            this.labelPictureMoreStep.bind(this),
            this.beforeOrAfterInstallationProblemStep.bind(this),
            this.beforeOrAfterInstallationActStep.bind(this)
        ]));

        // repeat dialog
        this.addDialog(new WaterfallDialog(REPEAT_RETAILER_NAME_DIALOG, [
            this.retailerNameStep.bind(this),
            this.nameOfContactPersonStep.bind(this),
            this.telephoneNumberStep.bind(this),
            this.customerAddressStep.bind(this),
            this.divisionStep.bind(this),
            this.productNameStep.bind(this),
            this.productGroupStep.bind(this),
            this.productSizeStep.bind(this),
            this.productColorStep.bind(this),
            this.batchNoStep.bind(this),
            this.invoiceSoNumberStep.bind(this),
            this.defectProblemStep.bind(this),
            this.defectPictureStep.bind(this),
            this.defectPictureMoreStep.bind(this),
            this.qtyOfDefectStep.bind(this),
            this.qtyInSaleOrderStep.bind(this),
            this.claimCostStep.bind(this),
            this.labelPictureStep.bind(this),
            this.labelPictureMoreStep.bind(this),
            this.beforeOrAfterInstallationProblemStep.bind(this),
            this.beforeOrAfterInstallationActStep.bind(this)
        ]));
        this.addDialog(new WaterfallDialog(REPEAT_NAME_OF_CONTACT_PERSON_DIALOG, [
            this.nameOfContactPersonStep.bind(this),
            this.telephoneNumberStep.bind(this),
            this.customerAddressStep.bind(this),
            this.divisionStep.bind(this),
            this.productNameStep.bind(this),
            this.productGroupStep.bind(this),
            this.productSizeStep.bind(this),
            this.productColorStep.bind(this),
            this.batchNoStep.bind(this),
            this.invoiceSoNumberStep.bind(this),
            this.defectProblemStep.bind(this),
            this.defectPictureStep.bind(this),
            this.defectPictureMoreStep.bind(this),
            this.qtyOfDefectStep.bind(this),
            this.qtyInSaleOrderStep.bind(this),
            this.claimCostStep.bind(this),
            this.labelPictureStep.bind(this),
            this.labelPictureMoreStep.bind(this),
            this.beforeOrAfterInstallationProblemStep.bind(this),
            this.beforeOrAfterInstallationActStep.bind(this)
        ]));
        this.addDialog(new WaterfallDialog(REPEAT_TELEPHONE_NUMBER_DIALOG, [
            this.telephoneNumberStep.bind(this),
            this.customerAddressStep.bind(this),
            this.divisionStep.bind(this),
            this.productNameStep.bind(this),
            this.productGroupStep.bind(this),
            this.productSizeStep.bind(this),
            this.productColorStep.bind(this),
            this.batchNoStep.bind(this),
            this.invoiceSoNumberStep.bind(this),
            this.defectProblemStep.bind(this),
            this.defectPictureStep.bind(this),
            this.defectPictureMoreStep.bind(this),
            this.qtyOfDefectStep.bind(this),
            this.qtyInSaleOrderStep.bind(this),
            this.claimCostStep.bind(this),
            this.labelPictureStep.bind(this),
            this.labelPictureMoreStep.bind(this),
            this.beforeOrAfterInstallationProblemStep.bind(this),
            this.beforeOrAfterInstallationActStep.bind(this)
        ]));
        this.addDialog(new WaterfallDialog(REPEAT_CUSTOMER_ADDRESS_DIALOG, [
            this.customerAddressStep.bind(this),
            this.divisionStep.bind(this),
            this.productNameStep.bind(this),
            this.productGroupStep.bind(this),
            this.productSizeStep.bind(this),
            this.productColorStep.bind(this),
            this.batchNoStep.bind(this),
            this.invoiceSoNumberStep.bind(this),
            this.defectProblemStep.bind(this),
            this.defectPictureStep.bind(this),
            this.defectPictureMoreStep.bind(this),
            this.qtyOfDefectStep.bind(this),
            this.qtyInSaleOrderStep.bind(this),
            this.claimCostStep.bind(this),
            this.labelPictureStep.bind(this),
            this.labelPictureMoreStep.bind(this),
            this.beforeOrAfterInstallationProblemStep.bind(this),
            this.beforeOrAfterInstallationActStep.bind(this)
        ]));
        this.addDialog(new WaterfallDialog(REPEAT_DIVISION_DIALOG, [
            this.divisionStep.bind(this),
            this.productNameStep.bind(this),
            this.productGroupStep.bind(this),
            this.productSizeStep.bind(this),
            this.productColorStep.bind(this),
            this.batchNoStep.bind(this),
            this.invoiceSoNumberStep.bind(this),
            this.defectProblemStep.bind(this),
            this.defectPictureStep.bind(this),
            this.defectPictureMoreStep.bind(this),
            this.qtyOfDefectStep.bind(this),
            this.qtyInSaleOrderStep.bind(this),
            this.claimCostStep.bind(this),
            this.labelPictureStep.bind(this),
            this.labelPictureMoreStep.bind(this),
            this.beforeOrAfterInstallationProblemStep.bind(this),
            this.beforeOrAfterInstallationActStep.bind(this)
        ]));
        this.addDialog(new WaterfallDialog(REPEAT_PRODUCT_NAME_DIALOG, [
            this.productNameStep.bind(this),
            this.productGroupStep.bind(this),
            this.productSizeStep.bind(this),
            this.productColorStep.bind(this),
            this.batchNoStep.bind(this),
            this.invoiceSoNumberStep.bind(this),
            this.defectProblemStep.bind(this),
            this.defectPictureStep.bind(this),
            this.defectPictureMoreStep.bind(this),
            this.qtyOfDefectStep.bind(this),
            this.qtyInSaleOrderStep.bind(this),
            this.claimCostStep.bind(this),
            this.labelPictureStep.bind(this),
            this.labelPictureMoreStep.bind(this),
            this.beforeOrAfterInstallationProblemStep.bind(this),
            this.beforeOrAfterInstallationActStep.bind(this)
        ]));
        this.addDialog(new WaterfallDialog(REPEAT_PRODUCT_GROUP_DIALOG, [
            this.productGroupStep.bind(this),
            this.productSizeStep.bind(this),
            this.productColorStep.bind(this),
            this.batchNoStep.bind(this),
            this.invoiceSoNumberStep.bind(this),
            this.defectProblemStep.bind(this),
            this.defectPictureStep.bind(this),
            this.defectPictureMoreStep.bind(this),
            this.qtyOfDefectStep.bind(this),
            this.qtyInSaleOrderStep.bind(this),
            this.claimCostStep.bind(this),
            this.labelPictureStep.bind(this),
            this.labelPictureMoreStep.bind(this),
            this.beforeOrAfterInstallationProblemStep.bind(this),
            this.beforeOrAfterInstallationActStep.bind(this)
        ]));
        this.addDialog(new WaterfallDialog(REPEAT_PRODUCT_SIZE_DIALOG, [
            this.productSizeStep.bind(this),
            this.productColorStep.bind(this),
            this.batchNoStep.bind(this),
            this.invoiceSoNumberStep.bind(this),
            this.defectProblemStep.bind(this),
            this.defectPictureStep.bind(this),
            this.defectPictureMoreStep.bind(this),
            this.qtyOfDefectStep.bind(this),
            this.qtyInSaleOrderStep.bind(this),
            this.claimCostStep.bind(this),
            this.labelPictureStep.bind(this),
            this.labelPictureMoreStep.bind(this),
            this.beforeOrAfterInstallationProblemStep.bind(this),
            this.beforeOrAfterInstallationActStep.bind(this)
        ]));
        this.addDialog(new WaterfallDialog(REPEAT_PRODUCT_COLOR_DIALOG, [
            this.productColorStep.bind(this),
            this.batchNoStep.bind(this),
            this.invoiceSoNumberStep.bind(this),
            this.defectProblemStep.bind(this),
            this.defectPictureStep.bind(this),
            this.defectPictureMoreStep.bind(this),
            this.qtyOfDefectStep.bind(this),
            this.qtyInSaleOrderStep.bind(this),
            this.claimCostStep.bind(this),
            this.labelPictureStep.bind(this),
            this.labelPictureMoreStep.bind(this),
            this.beforeOrAfterInstallationProblemStep.bind(this),
            this.beforeOrAfterInstallationActStep.bind(this)
        ]));
        this.addDialog(new WaterfallDialog(REPEAT_BATCH_NO_DIALOG, [
            this.batchNoStep.bind(this),
            this.invoiceSoNumberStep.bind(this),
            this.defectProblemStep.bind(this),
            this.defectPictureStep.bind(this),
            this.defectPictureMoreStep.bind(this),
            this.qtyOfDefectStep.bind(this),
            this.qtyInSaleOrderStep.bind(this),
            this.claimCostStep.bind(this),
            this.labelPictureStep.bind(this),
            this.labelPictureMoreStep.bind(this),
            this.beforeOrAfterInstallationProblemStep.bind(this),
            this.beforeOrAfterInstallationActStep.bind(this)
        ]));
        this.addDialog(new WaterfallDialog(REPEAT_INVOICE_SO_NUMBER_DIALOG, [
            this.invoiceSoNumberStep.bind(this),
            this.defectProblemStep.bind(this),
            this.defectPictureStep.bind(this),
            this.defectPictureMoreStep.bind(this),
            this.qtyOfDefectStep.bind(this),
            this.qtyInSaleOrderStep.bind(this),
            this.claimCostStep.bind(this),
            this.labelPictureStep.bind(this),
            this.labelPictureMoreStep.bind(this),
            this.beforeOrAfterInstallationProblemStep.bind(this),
            this.beforeOrAfterInstallationActStep.bind(this)
        ]));
        this.addDialog(new WaterfallDialog(REPEAT_DEFECT_PROBLEM_DIALOG, [
            this.defectProblemStep.bind(this),
            this.defectPictureStep.bind(this),
            this.defectPictureMoreStep.bind(this),
            this.qtyOfDefectStep.bind(this),
            this.qtyInSaleOrderStep.bind(this),
            this.claimCostStep.bind(this),
            this.labelPictureStep.bind(this),
            this.labelPictureMoreStep.bind(this),
            this.beforeOrAfterInstallationProblemStep.bind(this),
            this.beforeOrAfterInstallationActStep.bind(this)
        ]));
        this.addDialog(new WaterfallDialog(REPEAT_DEFECT_PICTURE_DIALOG, [
            this.defectPictureStep.bind(this),
            this.defectPictureMoreStep.bind(this),
            this.qtyOfDefectStep.bind(this),
            this.qtyInSaleOrderStep.bind(this),
            this.claimCostStep.bind(this),
            this.labelPictureStep.bind(this),
            this.labelPictureMoreStep.bind(this),
            this.beforeOrAfterInstallationProblemStep.bind(this),
            this.beforeOrAfterInstallationActStep.bind(this)
        ]));
        this.addDialog(new WaterfallDialog(REPEAT_QTY_OF_DEFECT_DIALOG, [
            this.qtyOfDefectStep.bind(this),
            this.qtyInSaleOrderStep.bind(this),
            this.claimCostStep.bind(this),
            this.labelPictureStep.bind(this),
            this.labelPictureMoreStep.bind(this),
            this.beforeOrAfterInstallationProblemStep.bind(this),
            this.beforeOrAfterInstallationActStep.bind(this)
        ]));
        this.addDialog(new WaterfallDialog(REPEAT_QTY_IN_SALE_ORDER_DIALOG, [
            this.qtyInSaleOrderStep.bind(this),
            this.claimCostStep.bind(this),
            this.labelPictureStep.bind(this),
            this.labelPictureMoreStep.bind(this),
            this.beforeOrAfterInstallationProblemStep.bind(this),
            this.beforeOrAfterInstallationActStep.bind(this)
        ]));
        this.addDialog(new WaterfallDialog(REPEAT_CLAIM_COST_DIALOG, [
            this.claimCostStep.bind(this),
            this.labelPictureStep.bind(this),
            this.labelPictureMoreStep.bind(this),
            this.beforeOrAfterInstallationProblemStep.bind(this),
            this.beforeOrAfterInstallationActStep.bind(this)
        ]));
        this.addDialog(new WaterfallDialog(REPEAT_LABEL_PICTURE_DIALOG, [
            this.labelPictureStep.bind(this),
            this.labelPictureMoreStep.bind(this),
            this.beforeOrAfterInstallationProblemStep.bind(this),
            this.beforeOrAfterInstallationActStep.bind(this)
        ]));
        this.addDialog(new WaterfallDialog(REPEAT_BEFORE_OR_AFTER_INSTALLATION_PROBLEM_DIALOG, [
            this.beforeOrAfterInstallationProblemStep.bind(this),
            this.beforeOrAfterInstallationActStep.bind(this)
        ]));
        this.addDialog(new WaterfallDialog(BEFORE_INSTALLTAION_PROBLEM_DIALOG, [
            this.problemInContainerPictureConfirmStep.bind(this),
            this.problemInContainerPictureStep.bind(this),
            this.problemInContainerPictureMoreStep.bind(this),
            this.problemInWarehousePictureConfirmStep.bind(this),
            this.problemInWarehousePictureStep.bind(this),
            this.problemInWarehousePictureMoreStep.bind(this),
            this.problemWhileUnloadOrMovingPictureConfirmStep.bind(this),
            this.problemWhileUnloadOrMovingPictureStep.bind(this),
            this.problemWhileUnloadOrMovingPictureMoreStep.bind(this),
            this.remarksBeforeStep.bind(this),
            this.summaryBeforeStep.bind(this),
            this.submitBeforeStep.bind(this)
        ]));
        this.addDialog(new WaterfallDialog(REPEAT_PROBLEM_IN_WAREHOUSE_PICTURE_DIALOG, [
            this.problemInWarehousePictureConfirmStep.bind(this),
            this.problemInWarehousePictureStep.bind(this),
            this.problemInWarehousePictureMoreStep.bind(this),
            this.problemWhileUnloadOrMovingPictureConfirmStep.bind(this),
            this.problemWhileUnloadOrMovingPictureStep.bind(this),
            this.problemWhileUnloadOrMovingPictureMoreStep.bind(this),
            this.remarksBeforeStep.bind(this),
            this.summaryBeforeStep.bind(this),
            this.submitBeforeStep.bind(this)
        ]));
        this.addDialog(new WaterfallDialog(REPEAT_PROBLEM_WHILE_UNLOAD_OR_MOVING_PICTURE_DIALOG, [
            this.problemWhileUnloadOrMovingPictureConfirmStep.bind(this),
            this.problemWhileUnloadOrMovingPictureStep.bind(this),
            this.problemWhileUnloadOrMovingPictureMoreStep.bind(this),
            this.remarksBeforeStep.bind(this),
            this.summaryBeforeStep.bind(this),
            this.submitBeforeStep.bind(this)
        ]));
        this.addDialog(new WaterfallDialog(REPEAT_REMARKS_BEFORE_DIALOG, [
            this.remarksBeforeStep.bind(this),
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
            this.remarksAfterStep.bind(this),
            this.summaryAfterStep.bind(this),
            this.submitAfterStep.bind(this)
        ]));
        this.addDialog(new WaterfallDialog(REPEAT_EQUIPMENT_TYPE_DIALOG, [
            this.equipmentTypeStep.bind(this),
            this.environmentInstallationStep.bind(this),
            this.whenInstallationProblemStep.bind(this),
            this.keepFinishedGoodsStep.bind(this),
            this.installationAreaStep.bind(this),
            this.remarksAfterStep.bind(this),
            this.summaryAfterStep.bind(this),
            this.submitAfterStep.bind(this)
        ]));
        this.addDialog(new WaterfallDialog(REPEAT_ENVIRONMENT_INSTALLATION_DIALOG, [
            this.environmentInstallationStep.bind(this),
            this.whenInstallationProblemStep.bind(this),
            this.keepFinishedGoodsStep.bind(this),
            this.installationAreaStep.bind(this),
            this.remarksAfterStep.bind(this),
            this.summaryAfterStep.bind(this),
            this.submitAfterStep.bind(this)
        ]));
        this.addDialog(new WaterfallDialog(REPEAT_WHEN_INSTALLATION_PROBLEM_DIALOG, [
            this.whenInstallationProblemStep.bind(this),
            this.keepFinishedGoodsStep.bind(this),
            this.installationAreaStep.bind(this),
            this.remarksAfterStep.bind(this),
            this.summaryAfterStep.bind(this),
            this.submitAfterStep.bind(this)
        ]));
        this.addDialog(new WaterfallDialog(REPEAT_KEEP_FINISHED_GOODS_DIALOG, [
            this.keepFinishedGoodsStep.bind(this),
            this.installationAreaStep.bind(this),
            this.remarksAfterStep.bind(this),
            this.summaryAfterStep.bind(this),
            this.submitAfterStep.bind(this)
        ]));
        this.addDialog(new WaterfallDialog(REPEAT_INSTALLATION_AREA_DIALOG, [
            this.installationAreaStep.bind(this),
            this.remarksAfterStep.bind(this),
            this.summaryAfterStep.bind(this),
            this.submitAfterStep.bind(this)
        ]));
        this.addDialog(new WaterfallDialog(REPEAT_REMARKS_AFTER_DIALOG, [
            this.remarksAfterStep.bind(this),
            this.summaryAfterStep.bind(this),
            this.submitAfterStep.bind(this)
        ]));

        // loop get images
        this.addDialog(new WaterfallDialog(LOOP_DEFECT_PICTURE_DIALOG, [
            this.defectPictureStep.bind(this),
            this.defectPictureMoreStep.bind(this),
            this.qtyOfDefectStep.bind(this),
            this.qtyInSaleOrderStep.bind(this),
            this.claimCostStep.bind(this),
            this.labelPictureStep.bind(this),
            this.labelPictureMoreStep.bind(this),
            this.beforeOrAfterInstallationProblemStep.bind(this),
            this.beforeOrAfterInstallationActStep.bind(this)
        ]));
        this.addDialog(new WaterfallDialog(LOOP_LABEL_PICTURE_DIALOG, [
            this.labelPictureStep.bind(this),
            this.labelPictureMoreStep.bind(this),
            this.beforeOrAfterInstallationProblemStep.bind(this),
            this.beforeOrAfterInstallationActStep.bind(this)
        ]));
        this.addDialog(new WaterfallDialog(LOOP_PROBLEM_IN_CONTAINER_PICTURE_DIALOG, [
            this.problemInContainerPictureStep.bind(this),
            this.problemInContainerPictureMoreStep.bind(this),
            this.problemInWarehousePictureConfirmStep.bind(this),
            this.problemInWarehousePictureStep.bind(this),
            this.problemInWarehousePictureMoreStep.bind(this),
            this.problemWhileUnloadOrMovingPictureConfirmStep.bind(this),
            this.problemWhileUnloadOrMovingPictureStep.bind(this),
            this.problemWhileUnloadOrMovingPictureMoreStep.bind(this),
            this.remarksBeforeStep.bind(this),
            this.summaryBeforeStep.bind(this),
            this.submitBeforeStep.bind(this)
        ]));
        this.addDialog(new WaterfallDialog(LOOP_PROBLEM_IN_WAREHOUSE_PICTURE_DIALOG, [
            this.problemInWarehousePictureStep.bind(this),
            this.problemInWarehousePictureMoreStep.bind(this),
            this.problemWhileUnloadOrMovingPictureConfirmStep.bind(this),
            this.problemWhileUnloadOrMovingPictureStep.bind(this),
            this.problemWhileUnloadOrMovingPictureMoreStep.bind(this),
            this.remarksBeforeStep.bind(this),
            this.summaryBeforeStep.bind(this),
            this.submitBeforeStep.bind(this)
        ]));
        this.addDialog(new WaterfallDialog(LOOP_PROBLEM_WHILE_UNLOAD_OR_MOVING_PICTURE_DIALOG, [
            this.problemWhileUnloadOrMovingPictureStep.bind(this),
            this.problemWhileUnloadOrMovingPictureMoreStep.bind(this),
            this.remarksBeforeStep.bind(this),
            this.summaryBeforeStep.bind(this),
            this.submitBeforeStep.bind(this)
        ]));

        this.initialDialogId = WATERFALL_DIALOG;
    }

    async distributorCodeStep(step) {
        let user = await this.userProfile.get(step.context, {});
        user.claimInterInfo = new ClaimInterModel();

        // initial
        user.status = '';

        await this.userProfile.set(step.context, user);

        await step.context.sendActivity(`You can enter "cancel" for reset conversation\n\n\
or enter "edit" for change previous step.`);

        const promptOptions = {
            prompt: 'Please enter distributor code.',
            retryPrompt: 'Sorry, wrong code or not found.\n\nPlease try again or contact to Admin to load distributor data.'
        };

        return await step.prompt(DISTRIBUTOR_CODE_PROMPT, promptOptions);
    }

    async retailerNameStep(step) {
        let user = await this.userProfile.get(step.context, {});

        //save customer data
        let customer = user.customerInfo[0];
        user.claimInterInfo.distributorCode = customer.KUNNR;
        user.claimInterInfo.distributorName = customer.NAME1;
        user.claimInterInfo.distributorAddress = customer.FULLADR;

        await this.userProfile.set(step.context, user);

        await step.context.sendActivity(`Distributor name is ${user.claimInterInfo.distributorName}\n\nDistributor address is ${user.claimInterInfo.distributorAddress}`);

        const promptOptions = { prompt: 'Please enter retailer name.' };

        return await step.prompt(RETAILER_NAME_PROMPT, promptOptions);
    }

    async nameOfContactPersonStep(step) {
        let user = await this.userProfile.get(step.context, {});

        let utterance = step.result || '';
        if (utterance.trim().toLowerCase() === EDIT && user.status === '') {
            user.status = EDIT;
            await this.userProfile.set(step.context, user);
            return await step.replaceDialog(WATERFALL_DIALOG);
        }

        if (user.status === EDIT) {
            user.status = '';
        }

        user.claimInterInfo.retailerName = step.result || user.claimInterInfo.retailerName;

        await this.userProfile.set(step.context, user);

        const promptOptions = { prompt: 'Please enter the name of the contact person.' };

        return await step.prompt(NAME_OF_CONTACT_PERSON_PROMPT, promptOptions);
    }

    async telephoneNumberStep(step) {
        let user = await this.userProfile.get(step.context, {});

        let utterance = step.result || '';
        if (utterance.trim().toLowerCase() === EDIT && user.status === '') {
            user.status = EDIT;
            await this.userProfile.set(step.context, user);
            return await step.replaceDialog(REPEAT_RETAILER_NAME_DIALOG);
        }

        if (user.status === EDIT) {
            user.status = '';
        }

        user.claimInterInfo.nameOfContactPerson = step.result || user.claimInterInfo.nameOfContactPerson;

        await this.userProfile.set(step.context, user);

        const promptOptions = { prompt: 'Please enter telephone number.' };

        return await step.prompt(NAME_OF_CONTACT_PERSON_PROMPT, promptOptions);
    }

    async customerAddressStep(step) {
        let user = await this.userProfile.get(step.context, {});

        let utterance = step.result || '';
        if (utterance.trim().toLowerCase() === EDIT && user.status === '') {
            user.status = EDIT;
            await this.userProfile.set(step.context, user);
            return await step.replaceDialog(REPEAT_NAME_OF_CONTACT_PERSON_DIALOG);
        }

        if (user.status === EDIT) {
            user.status = '';
        }

        user.claimInterInfo.telephoneNumber = step.result || user.claimInterInfo.telephoneNumber;

        await this.userProfile.set(step.context, user);

        const promptOptions = { prompt: 'Please enter customer address.' };

        return await step.prompt(NAME_OF_CONTACT_PERSON_PROMPT, promptOptions);
    }

    async divisionStep(step) {
        let user = await this.userProfile.get(step.context, {});

        let utterance = step.result || '';
        if (utterance.trim().toLowerCase() === EDIT && user.status === '') {
            user.status = EDIT;
            await this.userProfile.set(step.context, user);
            return await step.replaceDialog(REPEAT_TELEPHONE_NUMBER_DIALOG);
        }

        if (user.status === EDIT) {
            user.status = '';
        }

        user.claimInterInfo.customerAddress = step.result || user.claimInterInfo.customerAddress;

        await this.userProfile.set(step.context, user);


        await step.context.sendActivity({ attachments: [menu.divisionMenu()] });
        return await step.prompt(DIVISION_PROMPT,
            {
                retryPrompt: 'Sorry, please select division in the list.'
            });
    }

    async productNameStep(step) {
        let user = await this.userProfile.get(step.context, {});

        let utterance = step.result || '';
        if (utterance.trim().toLowerCase() === EDIT && user.status === '') {
            user.status = EDIT;
            await this.userProfile.set(step.context, user);
            return await step.replaceDialog(REPEAT_CUSTOMER_ADDRESS_DIALOG);
        }

        if (user.status === EDIT) {
            user.status = '';
        }

        user.claimInterInfo.division = step.result || user.claimInterInfo.division;

        await this.userProfile.set(step.context, user);

        await step.context.sendActivity({ attachments: [menu.productsMenu(user.claimInterInfo.division)] });
        return await step.prompt(PRODUCT_NAME_PROMPT,
            {
                retryPrompt: 'Sorry, please select product in the list.'
            });
    }

    async productGroupStep(step) {
        let user = await this.userProfile.get(step.context, {});

        let utterance = step.result || '';
        if (utterance.trim().toLowerCase() === EDIT && user.status === '') {
            user.status = EDIT;
            await this.userProfile.set(step.context, user);
            return await step.replaceDialog(REPEAT_DIVISION_DIALOG);
        }

        if (user.status === EDIT) {
            user.status = '';
        }

        user.claimInterInfo.productName = step.result || user.claimInterInfo.productName;

        await this.userProfile.set(step.context, user);

        const promptOptions = { prompt: 'Please enter product group (Floor plank, Plank, Eave or ...etc)' };

        return await step.prompt(PRODUCT_GROUP_PROMPT, promptOptions);
    }

    async productSizeStep(step) {
        let user = await this.userProfile.get(step.context, {});

        let utterance = step.result || '';

        if (utterance.trim().toLowerCase() === EDIT && user.status === '') {
            user.status = EDIT;
            await this.userProfile.set(step.context, user);
            return await step.replaceDialog(REPEAT_PRODUCT_NAME_DIALOG);
        }

        if (user.status === EDIT) {
            user.status = '';
        }

        user.claimInterInfo.productGroup = step.result || user.claimInterInfo.productGroup;

        await this.userProfile.set(step.context, user);

        const promptOptions = { prompt: 'Please enter product size.' };

        return await step.prompt(PRODUCT_SIZE_PROMPT, promptOptions);
    }

    async productColorStep(step) {
        let user = await this.userProfile.get(step.context, {});

        let utterance = step.result || '';
        if (utterance.trim().toLowerCase() === EDIT && user.status === '') {
            user.status = EDIT;
            await this.userProfile.set(step.context, user);
            return await step.replaceDialog(REPEAT_PRODUCT_GROUP_DIALOG);
        }

        if (user.status === EDIT) {
            user.status = '';
        }

        user.claimInterInfo.productSize = step.result || user.claimInterInfo.productSize;

        await this.userProfile.set(step.context, user);

        const promptOptions = { prompt: 'Please enter product color.' };

        return await step.prompt(PRODUCT_COLOR_PROMPT, promptOptions);
    }

    async batchNoStep(step) {
        let user = await this.userProfile.get(step.context, {});

        let utterance = step.result || '';
        if (utterance.trim().toLowerCase() === EDIT && user.status === '') {
            user.status = EDIT;
            await this.userProfile.set(step.context, user);
            return await step.replaceDialog(REPEAT_PRODUCT_SIZE_DIALOG);
        }

        if (user.status === EDIT) {
            user.status = '';
        }

        user.claimInterInfo.productColor = step.result;

        await this.userProfile.set(step.context, user);

        const promptOptions = { prompt: 'Please enter batch number.' };

        return await step.prompt(BATCH_NO_PROMPT, promptOptions);
    }

    async invoiceSoNumberStep(step) {
        let user = await this.userProfile.get(step.context, {});

        let utterance = step.result || '';
        if (utterance.trim().toLowerCase() === EDIT && user.status === '') {
            user.status = EDIT;
            await this.userProfile.set(step.context, user);
            return await step.replaceDialog(REPEAT_PRODUCT_COLOR_DIALOG);
        }

        if (user.status === EDIT) {
            user.status = '';
        }

        user.claimInterInfo.batchNo = step.result || user.claimInterInfo.batchNo;

        await this.userProfile.set(step.context, user);

        const promptOptions = { prompt: 'Please enter invoice / SO number.' };

        return await step.prompt(INVOICE_SO_NUMBER_PROMPT, promptOptions);
    }

    async defectProblemStep(step) {
        let user = await this.userProfile.get(step.context, {});

        let utterance = step.result || '';
        if (utterance.trim().toLowerCase() === EDIT && user.status === '') {
            user.status = EDIT;
            await this.userProfile.set(step.context, user);
            return await step.replaceDialog(REPEAT_BATCH_NO_DIALOG);
        }

        if (user.status === EDIT) {
            user.status = '';
        }

        user.claimInterInfo.invoiceSoNumber = step.result || user.claimInterInfo.invoiceSoNumber;

        await this.userProfile.set(step.context, user);

        const promptOptions = { prompt: 'Please enter defect problem.' };

        return await step.prompt(DEFECT_PROBLEM_PROMPT, promptOptions);
    }

    async defectPictureStep(step) {
        let user = await this.userProfile.get(step.context, {});

        let utterance = step.result || '';
        if (utterance.trim().toLowerCase() === EDIT && user.status === '') {
            user.status = EDIT;
            await this.userProfile.set(step.context, user);
            return await step.replaceDialog(REPEAT_INVOICE_SO_NUMBER_DIALOG);
        }

        if (step.result || user.status === EDIT) {
            user.claimInterInfo.imagesResult = [];
            user.status = '';
        }

        user.claimInterInfo.defectProblem = step.result || user.claimInterInfo.defectProblem;

        await this.userProfile.set(step.context, user);

        const promptOptions = { prompt: 'Please upload defect picture. (1 picture per times)' };

        return await step.prompt(DEFECT_PICTURE_PROMPT, promptOptions);
    }

    async defectPictureMoreStep(step) {
        let user = await this.userProfile.get(step.context, {});

        let utterance = step.context.activity.text || '';
        if (utterance.trim().toLowerCase() === EDIT && user.status === '') {
            user.status = EDIT;
            await this.userProfile.set(step.context, user);
            return await step.replaceDialog(REPEAT_DEFECT_PROBLEM_DIALOG);
        }

        let defectPicture = step.result[0];

        if (defectPicture.name) {
            var str = defectPicture.name;
            var arr = str.split(".");
            defectPicture.name = `defectPicture.${arr[1]}`;
        } else {
            defectPicture.name = `defectPicture.jpeg`;
        }
        defectPicture.tag = `defectPicture`;

        user.claimInterInfo.imagesResult.push(defectPicture);
        await this.userProfile.set(step.context, user);

        return await step.prompt(CONFIRM_PROMPT, {
            prompt: 'Upload more defect picture ?'
        });
    }

    async qtyOfDefectStep(step) {
        let user = await this.userProfile.get(step.context, {});

        let utterance = step.context.activity.text || '';

        if (utterance.trim().toLowerCase() === EDIT && user.status === '') {
            user.status = EDIT;
            await this.userProfile.set(step.context, user);
            return await step.replaceDialog(REPEAT_DEFECT_PICTURE_DIALOG);
        }

        if (step.result) {
            return await step.replaceDialog(LOOP_DEFECT_PICTURE_DIALOG);
        } else {
            if (user.status === EDIT) {
                user.status = '';
            }
            await this.userProfile.set(step.context, user);
            const promptOptions = { prompt: 'Please enter qty of defect. (Pcs.)' };
            return await step.prompt(QTY_OF_DEFECT_PROMPT, promptOptions);
        }
    }

    async qtyInSaleOrderStep(step) {
        let user = await this.userProfile.get(step.context, {});

        let utterance = step.context.activity.text || '';
        if (utterance.trim().toLowerCase() === EDIT && user.status === '') {
            user.status = EDIT;
            await this.userProfile.set(step.context, user);
            return await step.replaceDialog(REPEAT_DEFECT_PICTURE_DIALOG);
        }

        if (user.status === EDIT) {
            user.status = '';
        }

        user.claimInterInfo.qtyOfDefect = step.result || user.claimInterInfo.qtyOfDefect;

        await this.userProfile.set(step.context, user);

        const promptOptions = { prompt: 'Please enter qty in sale order. (Pcs.)' };

        return await step.prompt(QTY_IN_SALE_ORDER_PROMPT, promptOptions);
    }

    async claimCostStep(step) {
        let user = await this.userProfile.get(step.context, {});

        let utterance = step.result || '';
        if (utterance.trim().toLowerCase() === EDIT && user.status === '') {
            user.status = EDIT;
            await this.userProfile.set(step.context, user);
            return await step.replaceDialog(REPEAT_QTY_OF_DEFECT_DIALOG);
        }

        if (user.status === EDIT) {
            user.status = '';
        }

        user.claimInterInfo.qtyInSaleOrder = step.result || user.claimInterInfo.qtyInSaleOrder;

        await this.userProfile.set(step.context, user);

        const promptOptions = { prompt: 'Please enter claim cost. (USD, etc)' };

        return await step.prompt(CLAIM_COST_PROMPT, promptOptions);
    }

    async labelPictureStep(step) {
        let user = await this.userProfile.get(step.context, {});

        let utterance = step.result || '';
        if (utterance.trim().toLowerCase() === EDIT && user.status === '') {
            user.status = EDIT;
            await this.userProfile.set(step.context, user);
            return await step.replaceDialog(REPEAT_QTY_IN_SALE_ORDER_DIALOG);
        }

        if (step.result || user.status === EDIT) {
            user.status = '';
            user.claimInterInfo.imagesResult = user.claimInterInfo.imagesResult.filter(image => image.tag !== `labelPicture`);
        }

        user.claimInterInfo.claimCost = step.result || user.claimInterInfo.claimCost;

        await this.userProfile.set(step.context, user);

        const promptOptions = { prompt: 'Please upload The white Label/Stamping batch/Inkjet picture. (1 picture per times)' };

        return await step.prompt(LABEL_PICTURE_PROMPT, promptOptions);
    }

    async labelPictureMoreStep(step) {
        let user = await this.userProfile.get(step.context, {});

        let utterance = step.context.activity.text || '';
        if (utterance.trim().toLowerCase() === EDIT && user.status === '') {
            user.status = EDIT;
            await this.userProfile.set(step.context, user);
            return await step.replaceDialog(REPEAT_CLAIM_COST_DIALOG);
        }

        let labelPicture = step.result[0];

        if (labelPicture.name) {
            var str = labelPicture.name;
            var arr = str.split(".");
            labelPicture.name = `labelPicture.${arr[1]}`;
        } else {
            labelPicture.name = `labelPicture.jpeg`;
        }
        labelPicture.tag = `labelPicture`;

        user.claimInterInfo.imagesResult.push(labelPicture);

        await this.userProfile.set(step.context, user);

        return await step.prompt(CONFIRM_PROMPT, {
            prompt: 'Upload more The white Label/Stamping batch/Inkjet picture ?'
        });
    }

    async beforeOrAfterInstallationProblemStep(step) {
        let user = await this.userProfile.get(step.context, {});

        let utterance = step.context.activity.text || '';
        if (utterance.trim().toLowerCase() === EDIT && user.status === '') {
            user.status = EDIT;
            await this.userProfile.set(step.context, user);
            return await step.replaceDialog(REPEAT_LABEL_PICTURE_DIALOG);
        }

        if (user.status === EDIT) {
            user.status = '';
        }

        if (step.result) {
            return step.replaceDialog(LOOP_LABEL_PICTURE_DIALOG);
        } else {
            return await step.prompt(BEFORE_OR_AFTER_INSTALLATION_PROBLEM_PROMPT, {
                prompt: 'Found problem before or after installation.',
                choices: ChoiceFactory.toChoices(['before', 'after'])
            });
        }
    }

    async beforeOrAfterInstallationActStep(step) {
        let user = await this.userProfile.get(step.context, {});

        let utterance = step.context.activity.text || '';
        if (utterance.trim().toLowerCase() === EDIT && user.status === '') {
            user.status = EDIT;
            await this.userProfile.set(step.context, user);
            return await step.replaceDialog(REPEAT_LABEL_PICTURE_DIALOG);
        }

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

    async problemInContainerPictureConfirmStep(step) {
        let user = await this.userProfile.get(step.context, {});
        user.claimInterInfo.beforeInstallationProblem = new BeforeInstallationProblemModel();

        if (step.result || user.status === EDIT) {
            user.claimInterInfo.imagesResult = user.claimInterInfo.imagesResult.filter(image => image.tag !== `problemInContainerPicture`);
            user.status = '';
        }

        await this.userProfile.set(step.context, user);

        return await step.prompt(CONFIRM_PROMPT, {
            prompt: 'Found problem in container ?'
        });
    }

    async problemInContainerPictureStep(step) {
        let user = await this.userProfile.get(step.context, {});

        let utterance = step.context.activity.text || '';

        if (utterance.trim().toLowerCase() === EDIT && user.status === '') {
            user.status = EDIT;
            await this.userProfile.set(step.context, user);
            return await step.replaceDialog(REPEAT_BEFORE_OR_AFTER_INSTALLATION_PROBLEM_DIALOG);
        }

        if (step.result || user.status === LOOP) {
            user.status = '';
            await this.userProfile.set(step.context, user);
            const promptOptions = { prompt: 'Please upload problem in container picture. (1 picture per times)' };
            return await step.prompt(PROBLEM_IN_CONTAINER_PICTURE_PROMPT, promptOptions);
        } else {
            return await step.next();
        }
    }

    async problemInContainerPictureMoreStep(step) {
        let user = await this.userProfile.get(step.context, {});

        let utterance = step.context.activity.text || '';
        if (utterance.trim().toLowerCase() === EDIT && user.status === '') {
            user.status = EDIT;
            await this.userProfile.set(step.context, user);
            return await step.replaceDialog(BEFORE_INSTALLTAION_PROBLEM_DIALOG);
        }

        if (step.result) {
            let problemInContainerPicture = step.result[0];

            if (problemInContainerPicture.name) {
                var str = problemInContainerPicture.name;
                var arr = str.split(".");
                problemInContainerPicture.name = `problemInContainerPicture.${arr[1]}`;
            } else {
                problemInContainerPicture.name = `problemInContainerPicture.jpeg`;
            }
            problemInContainerPicture.tag = `problemInContainerPicture`;

            user.claimInterInfo.imagesResult.push(problemInContainerPicture);
            await this.userProfile.set(step.context, user);

            return await step.prompt(CONFIRM_PROMPT, {
                prompt: 'Upload more problem in container picture ?'
            });
        }

        return await step.next();
    }

    async problemInWarehousePictureConfirmStep(step) {
        let user = await this.userProfile.get(step.context, {});

        let utterance = step.context.activity.text || '';
        if (utterance.trim().toLowerCase() === EDIT && user.status === '') {
            user.status = EDIT;
            await this.userProfile.set(step.context, user);
            return await step.replaceDialog(BEFORE_INSTALLTAION_PROBLEM_DIALOG);
        }

        if (step.result || user.status === EDIT) {
            user.claimInterInfo.imagesResult = user.claimInterInfo.imagesResult.filter(image => image.tag !== `problemInWarehousePicture`);
            user.status = '';
            await this.userProfile.set(step.context, user);
        }

        if (step.result) {
            user.status = LOOP;
            await this.userProfile.set(step.context, user);
            return step.replaceDialog(LOOP_PROBLEM_IN_CONTAINER_PICTURE_DIALOG);
        } else {
            return await step.prompt(CONFIRM_PROMPT, {
                prompt: 'Found problem in warehouse ?'
            });
        }
    }

    async problemInWarehousePictureStep(step) {
        let user = await this.userProfile.get(step.context, {});

        let utterance = step.context.activity.text || '';

        if (utterance.trim().toLowerCase() === EDIT && user.status === '') {
            user.status = EDIT;
            await this.userProfile.set(step.context, user);
            return await step.replaceDialog(BEFORE_INSTALLTAION_PROBLEM_DIALOG);
        }

        if (step.result || user.status === LOOP) {
            user.status = '';
            await this.userProfile.set(step.context, user);
            const promptOptions = { prompt: 'Please upload problem in warehouse picture. (1 picture per times)' };
            return await step.prompt(PROBLEM_IN_WAREHOUSE_PICTURE_PROMPT, promptOptions);
        } else {
            return await step.next();
        }
    }

    async problemInWarehousePictureMoreStep(step) {
        let user = await this.userProfile.get(step.context, {});

        let utterance = step.context.activity.text || '';

        if (utterance.trim().toLowerCase() === EDIT && user.status === '') {
            user.status = EDIT;
            await this.userProfile.set(step.context, user);
            return await step.replaceDialog(REPEAT_PROBLEM_IN_WAREHOUSE_PICTURE_DIALOG);
        }

        if (step.result) {
            let problemInWarehousePicture = step.result[0];

            if (problemInWarehousePicture.name) {
                var str = problemInWarehousePicture.name;
                var arr = str.split(".");
                problemInWarehousePicture.name = `problemInWarehousePicture.${arr[1]}`;
            } else {
                problemInWarehousePicture.name = `problemInWarehousePicture.jpeg`;
            }
            problemInWarehousePicture.tag = `problemInWarehousePicture`;

            user.claimInterInfo.imagesResult.push(problemInWarehousePicture);
            await this.userProfile.set(step.context, user);

            return await step.prompt(CONFIRM_PROMPT, {
                prompt: 'Upload more problem in warehouse picture ?'
            });
        }

        return await step.next();
    }

    async problemWhileUnloadOrMovingPictureConfirmStep(step) {
        let user = await this.userProfile.get(step.context, {});

        let utterance = step.context.activity.text || '';

        if (utterance.trim().toLowerCase() === EDIT && user.status === '') {
            user.status = EDIT;
            await this.userProfile.set(step.context, user);
            return await step.replaceDialog(REPEAT_PROBLEM_IN_WAREHOUSE_PICTURE_DIALOG);
        }

        if (step.result || user.status === EDIT) {
            user.claimInterInfo.imagesResult = user.claimInterInfo.imagesResult.filter(image => image.tag !== `problemWhileUnloadingOrMovingPicture`);
            user.status = '';
            await this.userProfile.set(step.context, user);
        }

        if (step.result) {
            user.status = LOOP;
            await this.userProfile.set(step.context, user);
            return await step.replaceDialog(LOOP_PROBLEM_IN_WAREHOUSE_PICTURE_DIALOG);
        } else {
            return await step.prompt(CONFIRM_PROMPT, {
                prompt: 'Found problem while unload / moving ?'
            });
        }
    }

    async problemWhileUnloadOrMovingPictureStep(step) {
        let user = await this.userProfile.get(step.context, {});

        let utterance = step.context.activity.text || '';
        if (utterance.trim().toLowerCase() === EDIT && user.status === '') {
            user.status = EDIT;
            await this.userProfile.set(step.context, user);
            return await step.replaceDialog(REPEAT_PROBLEM_IN_WAREHOUSE_PICTURE_DIALOG);
        }

        if (step.result || user.status === LOOP) {
            user.status = '';
            await this.userProfile.set(step.context, user);
            const promptOptions = { prompt: 'Please upload problem while unload / moving picture. (1 picture per times)' };
            return await step.prompt(PROBLEM_WHILE_UNLOAD_OR_MOVING_PICTURE_PROMPT, promptOptions);
        } else {
            return await step.next();
        }
    }

    async problemWhileUnloadOrMovingPictureMoreStep(step) {
        let user = await this.userProfile.get(step.context, {});

        let utterance = step.context.activity.text || '';
        if (utterance.trim().toLowerCase() === EDIT && user.status === '') {
            user.status = EDIT;
            await this.userProfile.set(step.context, user);
            return await step.replaceDialog(REPEAT_PROBLEM_WHILE_UNLOAD_OR_MOVING_PICTURE_DIALOG);
        }

        if (step.result) {
            let problemWhileUnloadingOrMovingPicture = step.result[0];

            if (problemWhileUnloadingOrMovingPicture.name) {
                var str = problemWhileUnloadingOrMovingPicture.name;
                var arr = str.split(".");
                problemWhileUnloadingOrMovingPicture.name = `problemWhileUnloadingOrMovingPicture.${arr[1]}`;
            } else {
                problemWhileUnloadingOrMovingPicture.name = `problemWhileUnloadingOrMovingPicture.jpeg`;
            }
            problemWhileUnloadingOrMovingPicture.tag = `problemWhileUnloadingOrMovingPicture`;

            user.claimInterInfo.imagesResult.push(problemWhileUnloadingOrMovingPicture);
            await this.userProfile.set(step.context, user);

            return await step.prompt(CONFIRM_PROMPT, {
                prompt: 'Upload more problem while unload / moving picture ?'
            });
        }

        return await step.next();
    }

    async remarksBeforeStep(step) {
        let user = await this.userProfile.get(step.context, {});

        let utterance = step.context.activity.text || '';
        if (utterance.trim().toLowerCase() === EDIT && user.status === '') {
            user.status = EDIT;
            await this.userProfile.set(step.context, user);
            return await step.replaceDialog(REPEAT_PROBLEM_WHILE_UNLOAD_OR_MOVING_PICTURE_DIALOG);
        }

        if (user.status === EDIT) {
            user.status = '';
        }

        if (step.result) {
            user.status = LOOP;
            await this.userProfile.set(step.context, user);
            return await step.replaceDialog(LOOP_PROBLEM_WHILE_UNLOAD_OR_MOVING_PICTURE_DIALOG);
        } else {
            const promptOptions = { prompt: 'Please enter remarks information (if no please enter "-").' };
            return await step.prompt(REMARKS_PROMPT, promptOptions);
        }
    }

    async summaryBeforeStep(step) {
        let user = await this.userProfile.get(step.context, {});

        let utterance = step.context.activity.text || '';
        if (utterance.trim().toLowerCase() === EDIT && user.status === '') {
            user.status = EDIT;
            await this.userProfile.set(step.context, user);
            return await step.replaceDialog(REPEAT_PROBLEM_WHILE_UNLOAD_OR_MOVING_PICTURE_DIALOG);
        }

        user.claimInterInfo.remarks = step.result;

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

    async submitBeforeStep(step) {
        let user = await this.userProfile.get(step.context, {});

        let utterance = step.context.activity.text || '';
        if (utterance.trim().toLowerCase() === EDIT && user.status === '') {
            user.status = EDIT;
            await this.userProfile.set(step.context, user);
            return await step.replaceDialog(REPEAT_REMARKS_BEFORE_DIALOG);
        }

        if (step.result) {
            await step.context.sendActivity('Claim success !');

            helpers.sendMailBeforeInter(user);
        } else {
            await step.context.sendActivity('Your claim will not be kept.');
        }

        return await step.endDialog();
    }

    async installationMethodStep(step) {
        let user = await this.userProfile.get(step.context, {});
        user.claimInterInfo.afterInstallationProblem = new AfterInstallationProblemModel();

        if (user.status === EDIT) {
            user.status = '';
        }

        await this.userProfile.set(step.context, user);

        const promptOptions = { prompt: 'Please enter the installation method.' };

        return await step.prompt(INSTALLATION_METHOD_PROMPT, promptOptions);
    }

    async equipmentTypeStep(step) {
        let user = await this.userProfile.get(step.context, {});

        let utterance = step.context.activity.text || '';
        if (utterance.trim().toLowerCase() === EDIT && user.status === '') {
            user.status = EDIT;
            await this.userProfile.set(step.context, user);
            return await step.replaceDialog(REPEAT_BEFORE_OR_AFTER_INSTALLATION_PROBLEM_DIALOG);
        }

        if (user.status === EDIT) {
            user.status = '';
        }

        user.claimInterInfo.afterInstallationProblem.installationMethod = step.result;
        await this.userProfile.set(step.context, user);

        const promptOptions = { prompt: 'Please enter The equipment / tooling / Accessary (such as nailing type, screw type, compound type, color type, drilling type, etc)' };

        return await step.prompt(EQUIPMENT_TYPE_PROMPT, promptOptions);
    }

    async environmentInstallationStep(step) {
        let user = await this.userProfile.get(step.context, {});

        let utterance = step.context.activity.text || '';
        if (utterance.trim().toLowerCase() === EDIT && user.status === '') {
            user.status = EDIT;
            await this.userProfile.set(step.context, user);
            return await step.replaceDialog(AFTER_INSTALLTAION_PROBLEM_DIALOG);
        }

        if (user.status === EDIT) {
            user.status = '';
        }

        user.claimInterInfo.afterInstallationProblem.equipmentType = step.result;
        await this.userProfile.set(step.context, user);

        const promptOptions = { prompt: 'Please enter Weather / Environment during installation (such as rainy, cold, hot, etc)' };

        return await step.prompt(ENVIRONMENT_INSTALLATION_PROMPT, promptOptions);
    }

    async whenInstallationProblemStep(step) {
        let user = await this.userProfile.get(step.context, {});

        let utterance = step.context.activity.text || '';
        if (utterance.trim().toLowerCase() === EDIT && user.status === '') {
            user.status = EDIT;
            await this.userProfile.set(step.context, user);
            return await step.replaceDialog(REPEAT_EQUIPMENT_TYPE_DIALOG);
        }

        if (user.status === EDIT) {
            user.status = '';
        }

        user.claimInterInfo.afterInstallationProblem.environmentInstallation = step.result;
        await this.userProfile.set(step.context, user);

        const promptOptions = { prompt: 'Please enter When the problem occurred after installed (such as during installation , or week , month , year ago)' };

        return await step.prompt(WHEN_INSTALLATION_PROBLEM_PROMPT, promptOptions);
    }

    async keepFinishedGoodsStep(step) {
        let user = await this.userProfile.get(step.context, {});

        let utterance = step.context.activity.text || '';
        if (utterance.trim().toLowerCase() === EDIT && user.status === '') {
            user.status = EDIT;
            await this.userProfile.set(step.context, user);
            return await step.replaceDialog(REPEAT_ENVIRONMENT_INSTALLATION_DIALOG);
        }

        if (user.status === EDIT) {
            user.status = '';
        }

        user.claimInterInfo.afterInstallationProblem.whenInstallationProblem = step.result;
        await this.userProfile.set(step.context, user);

        const promptOptions = { prompt: 'Please enter How to keep the Finished goods before or during installation (such as keep in warehouse, etc)' };

        return await step.prompt(KEEP_FINISHED_GOODS_PROMPT, promptOptions);
    }

    async installationAreaStep(step) {
        let user = await this.userProfile.get(step.context, {});

        let utterance = step.context.activity.text || '';
        if (utterance.trim().toLowerCase() === EDIT && user.status === '') {
            user.status = EDIT;
            await this.userProfile.set(step.context, user);
            return await step.replaceDialog(REPEAT_WHEN_INSTALLATION_PROBLEM_DIALOG);
        }

        if (user.status === EDIT) {
            user.status = '';
        }

        user.claimInterInfo.afterInstallationProblem.keepFinishedGoods = step.result;
        await this.userProfile.set(step.context, user);

        const promptOptions = { prompt: 'Please enter Environment around using area or installation area (such as area in the garden which directly both water and sun, etc)' };

        return await step.prompt(INSTALLATION_AREA_PROMPT, promptOptions);
    }

    async remarksAfterStep(step) {
        let user = await this.userProfile.get(step.context, {});

        let utterance = step.context.activity.text || '';
        if (utterance.trim().toLowerCase() === EDIT && user.status === '') {
            user.status = EDIT;
            await this.userProfile.set(step.context, user);
            return await step.replaceDialog(REPEAT_KEEP_FINISHED_GOODS_DIALOG);
        }

        if (user.status === EDIT) {
            user.status = '';
        }

        user.claimInterInfo.afterInstallationProblem.installationArea = step.result;
        await this.userProfile.set(step.context, user);

        const promptOptions = { prompt: 'Please enter remarks information (if no please enter "-").' };

        return await step.prompt(REMARKS_PROMPT, promptOptions);
    }

    async summaryAfterStep(step) {
        let user = await this.userProfile.get(step.context, {});

        let utterance = step.context.activity.text || '';
        if (utterance.trim().toLowerCase() === EDIT && user.status === '') {
            user.status = EDIT;
            await this.userProfile.set(step.context, user);
            return await step.replaceDialog(REPEAT_INSTALLATION_AREA_DIALOG);
        }

        if (user.status === EDIT) {
            user.status = '';
        }

        user.claimInterInfo.remarks = step.result;

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

    async submitAfterStep(step) {
        let user = await this.userProfile.get(step.context, {});

        let utterance = step.context.activity.text || '';
        if (utterance.trim().toLowerCase() === EDIT && user.status === '') {
            user.status = EDIT;
            await this.userProfile.set(step.context, user);
            return await step.replaceDialog(REPEAT_REMARKS_AFTER_DIALOG);
        }

        if (user.status === EDIT) {
            user.status = '';
        }

        if (step.result) {
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