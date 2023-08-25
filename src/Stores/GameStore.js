import { makeAutoObservable } from "mobx";
import { cards } from "../CardData/cards";

class GameStore {
    hand = [];
    board = [];
    eHand = [];
    deck = [];
    eDeck = [];
    turn = 1;
    activePlayer = null;
    playedEnergy = false;
    constructor() {
        makeAutoObservable(this);
    }
    setDeck(player, deckData) {
        this[player === 0 ? "deck" : "eDeck"] = deckData;
    }
    drawCard(player = 0, count = 1) {
        if (player === 0) {
            const drawnCards = this.deck.filter((c, i) => i < count);
            this.hand = [...this.hand, ...drawnCards];
            this.deck = this.deck.filter((c, i) => i >= count);
            return;
        }
        const drawnCards = this.eDeck.filter((c, i) => i < count);
        this.eHand = [...this.eHand, ...drawnCards];
        this.eDeck.filter((c, i) => i >= count);
    }
    shuffle = (player) => {
        let shuffled = [];
        let d = [];
        if (player === 0) {
            d = [...this.deck];
        } else {
            d = [...this.eDeck];
        }
        while (d.length) {
            const randKey = Math.floor(Math.random() * d.length);
            shuffled.push(d[randKey]);
            d = d.filter((card, i) => i !== randKey);
        }
        if (player === 0) {
            this.deck = shuffled;
            return;
        }
        this.eDeck = shuffled;
    };
    playCard(id) {
        if (cards[this.hand[id]].type === 0 && !this.playedEnergy) {
            this.board.push(cards[this.hand[id]]);
            this.hand = this.hand.filter((c, i) => i !== id);
            this.playedEnergy = true;
        }
    }
    setActivePlayer(player) {
        this.activePlayer = player;
    }
    nextTurn() {
        this.playedEnergy = false;
        this.step = 0;
        this.turn = this.turn + 1;
        this.drawCard(0, 1);
    }
    get availableM() {
        return this.board
            .filter((c) => !c.tapped && c.type === 0)
            .map((c) => ({ provides: c.provides }));
    }
}

export default GameStore;
