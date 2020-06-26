class AfterInstallationProblemModel {
    constructor(installationMethod, equipmentType, environmentInstallation, whenInstallationProblem, keepFinishedGoods, installationArea) {
        this.installationMethod = installationMethod;
        this.equipmentType = equipmentType;
        this.environmentInstallation = environmentInstallation;
        this.whenInstallationProblem = whenInstallationProblem;
        this.keepFinishedGoods = keepFinishedGoods;
        this.installationArea = installationArea;
    }
}

module.exports.AfterInstallationProblemModel = AfterInstallationProblemModel;