import React, { useState, useRef, useEffect } from "react";

import "./battle.css";

const Battle = () => {
	const inputEl = useRef(null);

	const handleKeyDown = (event) => {
		if (![38, 40].includes(event.keyCode)) {
			return;
		}
		if (event.keyCode === 40) {
			setSelectedMove((prev) =>
				prev === moves.length - 1 ? 0 : prev + 1,
			);
		}
		if (event.keyCode === 38) {
			setSelectedMove((prev) =>
				prev === 0 ? moves.length - 1 : prev - 1,
			);
		}
	};

	const endTurn = () => {
		GameStore.nextTurn();
	};

	return (
		<div className="gameBoard">
			{gameStart && (
				<>
					<div className="hand">
						{hand.map((card, i) => (
							<div onClick={handlePlayCard(i)}>
								{cards[card].name}
							</div>
						))}
					</div>
					<div className="board">
						{GameStore.board.map((c) => (
							<div>{c.name}</div>
						))}
					</div>
					<button onClick={endTurn}>End Turn</button>
				</>
			)}
		</div>
	);
};
export default observer(Battle);
