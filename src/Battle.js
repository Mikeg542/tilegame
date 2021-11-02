import React, { useState, useRef, useEffect } from "react";
import { withRouter } from "react-router-dom";

import "./battle.css";

const Battle = ({ history }) => {
	const inputEl = useRef(null);

	const [selectedMove, setSelectedMove] = useState(0);

	useEffect(() => {
		inputEl.current.focus();
	}, []);

	const moves = [
		{ name: "Tackle", accuracy: 95, damage: 35 },
		{ name: "Scratch", accuracy: 100, damage: 30 },
		{
			name: "Growl",
			accuracy: 100,
			damage: 0,
			statReduce: "attack",
			amount: 10,
		},
	];

	const handleKeyDown = (event) => {
		if (![38, 40].includes(event.keyCode)) {
			return;
		}
		if (event.keyCode === 40) {
			setSelectedMove((prev) =>
				prev === moves.length - 1 ? 0 : prev + 1
			);
		}
		if (event.keyCode === 38) {
			setSelectedMove((prev) =>
				prev === 0 ? moves.length - 1 : prev - 1
			);
		}
	};
	return (
		<div className="gameBoard">
			<div
				className="playerMoveBox"
				ref={inputEl}
				tabIndex={0}
				onKeyDown={handleKeyDown}
			>
				{moves.map((move, i) => (
					<div className={i === selectedMove ? "active" : ""}>
						{move.name}
					</div>
				))}
			</div>
		</div>
	);
};
export default withRouter(Battle);
