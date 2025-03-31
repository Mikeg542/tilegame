import "./App.css";
import { useNavigate } from "react-router-dom";
import React, { useRef, useEffect, useState } from "react";
import { useStore } from "./storeFunctions";
import { observer } from "mobx-react-lite";
import MapRenderer from "./MapRenderer";
import doorAnim from "./door_anim.gif";

const App = () => {
    const navigate = useNavigate();

    const [doorOpen, setDoorOpen] = useState([false]);

    console.log('render')

    let map = [
        [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
        [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
        [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
        [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
        [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
        [6, 6, 6, 6, 6, 3, 3, 3, 1, 9, 10, 1, 1, 1, 6, 6, 6, 6, 6],
        [6, 6, 6, 6, 6, 3, 3, 3, 1, 9, 10, 1, 1, 1, 6, 6, 6, 6, 6],
        [6, 6, 6, 6, 6, 3, 15, 3, 1, 7, 7, 1, 1, 1, 6, 6, 6, 6, 6],
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
        {
            key: "house",
            location: [5, 5],
            spritePos: [0, -688],
            height: 3,
            width: 3,
            goInside: () => {
                setDoorOpen((prev) =>
                    prev.map((door, i) => (i === 0 ? !door[i] : door)),
                );
                setTimeout(
                    () => navigate("/inside/1", { state: { legit: true } }),
                    1000,
                );
            },
        },

        ...(doorOpen[0]
            ? [
                  {
                      key: "door",
                      location: [6, 7],
                      img: doorAnim,
                      height: 1,
                      width: 1,
                  },
              ]
            : []),
    ];

    return <MapRenderer map={map} spriteMap={spriteMap} />;
};

export default observer(App);

//keyboard key codes - add anymore that become useful
// 39 right
// 37 left
//38 up
//40 down
