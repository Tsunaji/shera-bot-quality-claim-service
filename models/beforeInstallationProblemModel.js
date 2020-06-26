class BeforeInstallationProblemModel {
    constructor(problemInContainerPicture, problemInWarehousePicture, problemWhileUnloadingOrMovingPicture) {
        this.problemInContainerPicture = problemInContainerPicture;
        this.problemInWarehousePicture = problemInWarehousePicture;
        this.problemWhileUnloadingOrMovingPicture = problemWhileUnloadingOrMovingPicture;
    }
}

module.exports.BeforeInstallationProblemModel = BeforeInstallationProblemModel;