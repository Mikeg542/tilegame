import React, { useState } from "react";
import { useStore } from "./storeFunctions";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";

const MapMaker = () => {
	const { DataStore } = useStore();
	const [color, setColor] = useState(1);
	const [toggle, setToggle] = useState(false);

	const colorTile = (event) => {
		DataStore.updateMap(
			event.target.dataset.x,
			event.target.dataset.y,
			color
		);
	};

	console.log(localStorage.getItem("map"));

	return (
		<div>
			<div
				style={{
					height: DataStore.mapView.length * 24,
					width: DataStore.mapView[0].length * 24,
					display: "flex",
					flexWrap: "wrap",
				}}
			>
				{DataStore.mapView.map((row, y) =>
					row.map((tile, x) => (
						<div
							className={`tile${tile} drawTile`}
							id={`tile${tile}`}
							data-x={x}
							data-y={y}
							onClick={colorTile}
						></div>
					))
				)}
			</div>
			<button onClick={() => DataStore.addRow()}>+ Row</button>
			<button onClick={() => DataStore.removeRow()}>- Row</button>
			<button onClick={() => DataStore.addCol()}>+ Col</button>
			<button onClick={() => DataStore.removeCol()}>- Col </button>
			<button onClick={() => console.log(toJS(DataStore.mapView))}>
				Toggle Code
			</button>
			<button onClick={() => DataStore.saveMap()}>Save</button>
			<button onClick={() => DataStore.resetMap()}>Reset</button>
			<div>
				<div className="tile" id="tile1" onClick={() => setColor(1)} />
				<div className="tile" id="tile2" onClick={() => setColor(2)} />
				<div className="tile" id="tile3" onClick={() => setColor(3)} />
				<div className="tile" id="tile4" onClick={() => setColor(4)} />
				<div className="tile" id="tile5" onClick={() => setColor(5)} />
				<div className="tile" id="tile6" onClick={() => setColor(6)} />
			</div>
		</div>
	);
};

export default observer(MapMaker);
