import { makeAutoObservable } from "mobx";

class DataStore {
    pos = [5, 5];

    mapView = localStorage.getItem("map")
        ? JSON.parse(localStorage.getItem("map"))
        : [
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          ];
    constructor() {
        makeAutoObservable(this);
    }
    setPos = (data) => {
        this.pos = data;
    };
    updateMap = (x, y, color) => {
        this.mapView[y][x] = color;
    };
    removeRow = () => {
        this.mapView.pop();
    };
    addRow = () => {
        this.mapView.push(Array(this.mapView[0].length).fill(0));
    };
    removeCol = () => {
        this.mapView.forEach((row, i) => this.mapView[i].pop());
    };
    addCol = () => {
        this.mapView.forEach((row, i) => this.mapView[i].push(0));
    };
    saveMap = () => {
        localStorage.setItem("map", JSON.stringify(this.mapView));
    };
    resetMap = () => {
        this.mapView = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];
    };
}

export default DataStore;
