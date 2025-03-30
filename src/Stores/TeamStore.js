import { makeAutoObservable } from "mobx";

class TeamStore {
    team = [{ id: 'bulbasaur' }]
    constructor() {
        makeAutoObservable(this);
    }
}

export default TeamStore;
