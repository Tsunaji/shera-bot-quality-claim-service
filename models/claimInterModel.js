class ClaimInterModel {
    constructor(distributorCode, distributorName, distributorAddress, retailerName, nameOfContactPerson, telephoneNumber, customerAddress,  
        division, productName, productGroup, productSize, productColor, batchNo, invoiceSoNumber, defectProblem, defectPicture, 
        qtyOfDefect, qtyInSaleOrder, claimCost, labelPicture, beforeOrAfterInstalltaionProblem, remarks) {
        this.distributorCode = distributorCode;
        this.distributorName = distributorName;
        this.distributorAddress = distributorAddress;
        this.retailerName = retailerName;
        this.nameOfContactPerson = nameOfContactPerson;
        this.telephoneNumber = telephoneNumber;
        this.customerAddress = customerAddress;
        this.division = division;
        this.productName = productName;
        this.productGroup= productGroup;
        this.productSize = productSize;
        this.productColor = productColor;
        this.batchNo = batchNo;
        this.invoiceSoNumber = invoiceSoNumber;
        this.defectProblem = defectProblem;
        this.defectPicture = defectPicture;
        this.qtyOfDefect = qtyOfDefect;
        this.qtyInSaleOrder = qtyInSaleOrder;
        this.claimCost = claimCost;
        this.labelPicture = labelPicture;
        this.beforeOrAfterInstalltaionProblem = beforeOrAfterInstalltaionProblem;
        this.remarks = remarks;
    }
}

module.exports.ClaimInterModel = ClaimInterModel;