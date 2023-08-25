import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "./storeFunctions";
import { cards } from "./CardData/cards";
import { deckData } from "./CardData/deckData";

import "./battle.css";

const Battle = ({ history }) => {
	const { GameStore } = useStore();

	const [life, setLife] = useState(20);
	const [gameStart, setGameStart] = useState(false);
	const [turn, setTurn] = useState(1);

	const { hand, eHand, deck, eDeck } = GameStore;

	useEffect(() => {
		GameStore.setDeck(0, deckData.intro);
		GameStore.setDeck(1, deckData.intro);
		GameStore.shuffle(0);
		GameStore.shuffle(1);
		GameStore.drawCard(0, 7);
		GameStore.drawCard(1, 7);
		GameStore.setActivePlayer(0);
	}, []);

	useEffect(() => {
		if (hand.length < 7 || eHand.length < 7 || gameStart) {
			return;
		}
		setGameStart(true);
	}, [hand, eHand]);

	const handlePlayCard = (id) => () => {
		GameStore.playCard(id);
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
