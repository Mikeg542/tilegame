import { makeAutoObservable } from "mobx";

class TeamStore {
    team = [ { name: 'Bulbasaur', type: 'grass', attack: 20, defense: 30, spatk: 30, spdef: 30, speed: 40, sprite: '', moves: [{ id: 1, level: 0}, { id: 2, level: 5} ] }]
    constructor() {
        makeAutoObservable(this);
    }
}

export default TeamStore;
