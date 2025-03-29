import { makeAutoObservable } from "mobx";

class TeamStore {
    errorMessage = "";
    successMessage = "";
    vmsNotification = false;
    constructor() {
        makeAutoObservable(this);
    }
    setMessage(type, message) {
        this[type] = message;
    }
    clearMessages() {
        this.errorMessage = "";
        this.successMessage = "";
    }
    setVmsNotification(bool) {
        this.vmsNotification = bool;
    }
}

export default TeamStore;
