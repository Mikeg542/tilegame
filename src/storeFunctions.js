import { createContext, useContext } from "react";
import DataStore from "./Stores/DataStore";
import TeamStore from "./Stores/TeamStore";

class RootStore {
    constructor() {
        this.DataStore = new DataStore(this);
        this.TeamStore = new TeamStore(this);
    }
}

export const stores = new RootStore();

export const storeContext = createContext({
    DataStore: stores.DataStore,
    TeamStore: stores.TeamStore,
});

const useStore = () => useContext(storeContext);

export { useStore };
