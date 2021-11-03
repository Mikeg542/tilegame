import React, { useState, useRef, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { pokeData } from './Data/pokeData'
import { moveData } from './Data/moveData'
import { useStore } from "./storeFunctions";

import "./battle.css";

const Battle = ({ history }) => {
	const inputEl = useRef(null);

	const { TeamStore } = useStore();

	const [selectedMove, setSelectedMove] = useState(0);
	const [enemyLife, setEnemyLife] = useState(20);

	useEffect(() => {
		inputEl.current.focus();
	}, []);

	const doMove = (key) => () => {
		setEnemyLife((prev) => prev - Math.floor(moveData[key].damage * 0.1));
	};

	const handleKeyDown = (event) => {
		if (![38, 40, 13].includes(event.keyCode)) {
			return;
		}
		if (event.keyCode === 40) {
			setSelectedMove((prev) =>
				prev === TeamStore.team[0].moves.length - 1 ? 0 : prev + 1
			);
		}
		if (event.keyCode === 38) {
			setSelectedMove((prev) =>
				prev === 0 ? TeamStore.team[0].moves.length - 1 : prev - 1
			);
		}
		if (event.keyCode === 13) {
			doMove(TeamStore.team[0].moves[selectedMove].id)()
		}
	};
	return (
		<div className="gameBoard">
			<div className="lifeBar">
				<div style={{ width: `${(enemyLife / 20) * 100}%` }} />
			</div>
			<div
				className="playerMoveBox"
				ref={inputEl}
				tabIndex={0}
				onKeyDown={handleKeyDown}
			>
				{TeamStore.team[0].moves.map((move, i) => (
					<div
						className={i === selectedMove ? "active" : ""}
						onClick={doMove(move.id)}
					>
						{moveData[move.id].name}
					</div>
				))}
			</div>
		</div>
	);
};
export default withRouter(Battle);
