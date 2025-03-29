import "./App.css";
import { withRouter } from "react-router-dom";
import React, { useRef, useEffect, useState } from "react";
import { useStore } from "./storeFunctions";
import { observer } from "mobx-react-lite";

const App = ({ history }) => {
    const inputEl = useRef(null);
    const [currentKey, setCurrentKey] = useState(null);
    const [alt, setAlt] = useState(false);
    const [dir, setDir] = useState(0);

    const { DataStore } = useStore();

    const { pos, setPos } = DataStore;

    const VISION_LENGTH = 5;

    const TILE_SIZE = 32;

    const map1 = [
        [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
        [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
        [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
        [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
        [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
        [6, 6, 6, 6, 6, 1, 1, 1, 3, 3, 1, 1, 1, 6, 6, 6, 6, 6],
        [6, 6, 6, 6, 6, 1, 1, 1, 3, 3, 1, 1, 1, 6, 6, 6, 6, 6],
        [6, 6, 6, 6, 6, 1, 1, 1, 3, 3, 1, 1, 1, 6, 6, 6, 6, 6],
        [6, 6, 6, 6, 6, 1, 1, 1, 4, 4, 1, 1, 1, 6, 6, 6, 6, 6],
        [6, 6, 6, 6, 6, 1, 1, 1, 4, 4, 1, 1, 1, 6, 6, 6, 6, 6],
        [6, 6, 6, 6, 6, 1, 1, 1, 3, 3, 5, 1, 1, 6, 6, 6, 6, 6],
        [6, 6, 6, 6, 6, 1, 1, 1, 3, 3, 5, 2, 2, 6, 6, 6, 6, 6],
        [6, 6, 6, 6, 6, 1, 1, 1, 3, 3, 5, 2, 2, 6, 6, 6, 6, 6],
        [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
        [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
        [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
        [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
        [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    ];

    let map2 = [
        [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
        [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
        [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
        [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
        [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
        [6, 6, 6, 6, 6, 1, 1, 1, 1, 9, 10, 1, 1, 1, 6, 6, 6, 6, 6],
        [6, 6, 6, 6, 6, 1, 1, 1, 1, 9, 10, 1, 1, 1, 6, 6, 6, 6, 6],
        [6, 6, 6, 6, 6, 1, 1, 1, 1, 7, 7, 1, 1, 1, 6, 6, 6, 6, 6],
        [6, 6, 6, 6, 6, 1, 1, 1, 1, 8, 8, 1, 1, 1, 6, 6, 6, 6, 6],
        [6, 6, 6, 6, 6, 3, 3, 3, 1, 9, 10, 1, 1, 1, 6, 6, 6, 6, 6],
        [6, 6, 6, 6, 6, 3, 3, 3, 1, 9, 13, 14, 4, 4, 6, 6, 6, 6, 6],
        [6, 6, 6, 6, 6, 5, 5, 1, 1, 11, 12, 12, 4, 4, 6, 6, 6, 6, 6],
        [6, 6, 6, 6, 6, 5, 5, 1, 1, 1, 1, 1, 1, 1, 6, 6, 6, 6, 6],
        [6, 6, 6, 6, 6, 5, 5, 1, 1, 1, 3, 3, 3, 3, 6, 6, 6, 6, 6],
        [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
        [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
        [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
        [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
        [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    ];

    let map = map2;

    // display map filters multidimensional map array to only display rows and columns VISION_LENGTH away from player position
    const displayMap = map
        .filter(
            (rows, i) =>
                i >= pos[0] - VISION_LENGTH && i <= pos[0] + VISION_LENGTH
        )
        .map((rows) =>
            rows.filter(
                (cols, i) =>
                    i >= pos[1] - VISION_LENGTH && i <= pos[1] + VISION_LENGTH
            )
        );

    const barriers = [2, 3, 6, 9, 10, 11, 12, 13, 14]; //which tile ids count as unpassable

    const encounters = [5]; // which tile ids have a chance at triggering an encounter

    /* useInterval - magic function that makes time callbacks trigger state rerenders
    @param callback { function } - the function to call on each trigger of the interval
    @param delay { int } - the timer intercval
    */
    function useInterval(callback, delay) {
        const savedCallback = useRef();

        // Remember the latest callback.
        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

        // Set up the interval.
        useEffect(() => {
            function tick() {
                savedCallback.current();
            }
            if (delay !== null) {
                let id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        }, [delay]);
    }

    useEffect(() => {
        inputEl.current.focus(); // focuses on gameboard div on app load
    }, []);

    useEffect(() => {
        if (currentKey) {
            handleMove(currentKey);
        }
    }, [currentKey]);

    useInterval(
        () => {
            if (!currentKey) {
                return;
            }
            handleMove(currentKey);
        },
        currentKey ? 200 : null
    );

    /*
        handleMove - moves player based on keyboard input (TODO make wasd work too)
        @param code { string } - keyboard event code
    */
    const handleMove = (code) => {
        if (encounters.includes(map[pos[0]][pos[1]])) {
            const encounterRate = Math.floor(Math.random() * 100);
            if (encounterRate > 89) {
                history.push("/battle");
            }
        }
        if (code === 39) {
            setDir(2);
            setAlt((prev) => !prev);
            if (
                pos[1] >= map[0].length - 1 ||
                barriers.includes(map[pos[0]][pos[1] + 1])
            ) {
                return;
            }
            setPos([pos[0], pos[1] + 1]);
        }
        if (code === 37) {
            setDir(3);
            setAlt((prev) => !prev);
            if (pos[1] <= 0 || barriers.includes(map[pos[0]][pos[1] - 1])) {
                return;
            }
            setPos([pos[0], pos[1] - 1]);
        }
        if (code === 38) {
            setDir(1);
            setAlt((prev) => !prev);
            if (pos[0] <= 0 || barriers.includes(map[pos[0] - 1][pos[1]])) {
                return;
            }
            setPos([pos[0] - 1, pos[1]]);
        }
        if (code === 40) {
            setDir(0);
            setAlt((prev) => !prev);
            if (
                pos[0] >= map.length - 1 ||
                barriers.includes(map[pos[0] + 1][pos[1]])
            ) {
                return;
            }
            setPos([pos[0] + 1, pos[1]]);
        }
    };

    /*
        handleKeyDown - event whwnever key is pressed. returns false if not a valid movement key
        @param event { object } - keyboard keypress event
    */
    const handleKeyDown = (event) => {
        if (currentKey || ![37, 38, 39, 40].includes(event.keyCode)) {
            return;
        }
        setCurrentKey(event.keyCode);
    };

    return (
        <div
            className="App"
            onKeyDown={handleKeyDown}
            ref={inputEl}
            tabIndex={0}
            onKeyUp={() => {
                setCurrentKey(null);
            }}
        >
            <div
                className="map"
                style={{ width: displayMap[0].length * TILE_SIZE }}
            >
                {displayMap.map((row) =>
                    row.map((tile) => (
                        <div id={"tile" + tile} className="tile" />
                    ))
                )}
            </div>
            <div
                style={{
                    height: TILE_SIZE,
                    width: TILE_SIZE,
                    left: 160,
                    top: 160,
                    backgroundPositionX: !currentKey ? -32 : alt ? 0 : 32,
                    backgroundPositionY: dir * 32,
                    position: "absolute",
                }}
                className="character"
            ></div>
        </div>
    );
};

export default withRouter(observer(App));

//keyboard key codes - add anymore that become useful
// 39 right
// 37 left
//38 up
//40 down
