import { createContext, useContext } from "react";
import DataStore from "./Stores/DataStore";
import GameStore from "./Stores/GameStore";

class RootStore {
    constructor() {
        this.DataStore = new DataStore(this);
        this.GameStore = new GameStore(this);
    }
}

export const stores = new RootStore();

export const storeContext = createContext({
    DataStore: stores.DataStore,
    GameStore: stores.GameStore,
});

const useStore = () => useContext(storeContext);

export { useStore };
