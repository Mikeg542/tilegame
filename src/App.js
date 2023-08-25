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

    let map = [
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

    let spriteMap = [
        {
            key: "tree",
            location: [5, 9],
            spritePos: [-546, -420],
            height: 2,
            width: 2,
        },
        {
            key: "tree",
            location: [6, 9],
            spritePos: [-546, -420],
            height: 2,
            width: 2,
        },
        {
            key: "flower",
            location: [5, 11],
            spritePos: [-64, -448],
            height: 1,
            width: 1,
        },
        {
            key: "flower",
            location: [5, 12],
            spritePos: [-64, -448],
            height: 1,
            width: 1,
        },
        {
            key: "flower",
            location: [5, 13],
            spritePos: [-64, -448],
            height: 1,
            width: 1,
        },
        {
            key: "flower",
            location: [6, 11],
            spritePos: [-64, -448],
            height: 1,
            width: 1,
        },
        {
            key: "flower",
            location: [6, 12],
            spritePos: [-64, -448],
            height: 1,
            width: 1,
        },
        {
            key: "flower",
            location: [6, 13],
            spritePos: [-64, -448],
            height: 1,
            width: 1,
        },
    ];

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
            style={{
                overflow: "hidden",
                width: TILE_SIZE * (VISION_LENGTH * 2 + 1),
                height: TILE_SIZE * (VISION_LENGTH * 2 + 1),
            }}
            ref={inputEl}
            tabIndex={0}
            onKeyUp={() => {
                setCurrentKey(null);
            }}
        >
            <div
                style={{
                    marginLeft: -32 * (pos[1] - 5),
                    marginTop: -32 * (pos[0] - 5),
                    position: "relative",
                }}
            >
                <div
                    className="map"
                    style={{ width: map[0].length * TILE_SIZE }}
                >
                    {map.map((row) =>
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
                        position: "fixed",
                        zIndex: 10,
                    }}
                    className="character"
                ></div>
                {spriteMap.map((sprite) => (
                    <div
                        style={{
                            height: TILE_SIZE * sprite.height,
                            width: TILE_SIZE * sprite.width,
                            left: TILE_SIZE * sprite.location[0],
                            top: TILE_SIZE * sprite.location[1],
                            backgroundPositionX: sprite.spritePos[0],
                            backgroundPositionY: sprite.spritePos[1],
                            position: "absolute",
                        }}
                        className="tile"
                    />
                ))}
            </div>
        </div>
    );
};

export default withRouter(observer(App));

//keyboard key codes - add anymore that become useful
// 39 right
// 37 left
//38 up
//40 down
