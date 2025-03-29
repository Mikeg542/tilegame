import "./App.css";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useRef, useEffect, useState } from "react";
import { useStore } from "./storeFunctions";
import { observer } from "mobx-react-lite";
import MapRenderer from "./MapRenderer";

const Inside = () => {
    const navigate = useNavigate();

    const location = useLocation();

    console.log(useLocation);

    useEffect(() => {
        if (!location.state?.legit) {
            navigate("/");
        }
    }, []);

    let map = [
        [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
        [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
        [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
        [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
        [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
        [6, 6, 6, 6, 6, 3, 3, 3, 1, 9, 10, 1, 1, 1, 6, 6, 6, 6, 6],
        [6, 6, 6, 6, 6, 3, 3, 3, 1, 9, 10, 1, 1, 1, 6, 6, 6, 6, 6],
        [6, 6, 6, 6, 6, 3, 3, 3, 1, 7, 7, 1, 1, 1, 6, 6, 6, 6, 6],
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

    return <MapRenderer map={map} spriteMap={spriteMap} />;
};

export default observer(Inside);
