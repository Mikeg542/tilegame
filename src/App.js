import "./App.css";
import { withRouter } from "react-router-dom";
import React, { useRef, useEffect, useState } from "react";
import { useStore } from "./storeFunctions";
import { observer } from "mobx-react-lite";

const App = ({ history }) => {
  const inputEl = useRef(null);
  const [currentKey, setCurrentKey] = useState(null);

  const { DataStore } = useStore();

  const { pos, setPos } = DataStore;

  const map = [
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
    [6, 6, 6, 6, 6, 1, 1, 1, 1, 2, 2, 1, 1, 1, 6, 6, 6, 6, 6],
    [6, 6, 6, 6, 6, 1, 1, 1, 1, 2, 2, 1, 1, 1, 6, 6, 6, 6, 6],
    [6, 6, 6, 6, 6, 1, 1, 1, 1, 4, 4, 1, 1, 1, 6, 6, 6, 6, 6],
    [6, 6, 6, 6, 6, 1, 1, 1, 1, 4, 4, 1, 1, 1, 6, 6, 6, 6, 6],
    [6, 6, 6, 6, 6, 3, 3, 3, 1, 2, 2, 1, 1, 1, 6, 6, 6, 6, 6],
    [6, 6, 6, 6, 6, 3, 3, 3, 1, 2, 2, 2, 4, 4, 6, 6, 6, 6, 6],
    [6, 6, 6, 6, 6, 5, 5, 1, 1, 2, 2, 2, 4, 4, 6, 6, 6, 6, 6],
    [6, 6, 6, 6, 6, 5, 5, 1, 1, 1, 1, 1, 1, 1, 6, 6, 6, 6, 6],
    [6, 6, 6, 6, 6, 5, 5, 1, 1, 1, 3, 3, 3, 3, 6, 6, 6, 6, 6],
    [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
  ];

  const displayMap = map2
    .filter((rows, i) => i >= pos[0] - 5 && i <= pos[0] + 5)
    .map((rows) =>
      rows.filter((cols, i) => i >= pos[1] - 5 && i <= pos[1] + 5)
    );

  const barriers = [2, 3, 6];

  const encounters = [5];

  console.log(displayMap);

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
    inputEl.current.focus();
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

  const handleMove = (code) => {
    if (encounters.includes(map[pos[0]][pos[1]])) {
      const encounterRate = Math.floor(Math.random() * 100);
      if (encounterRate > 89) {
        history.push("/battle");
      }
    }
    if (code === 39) {
      if (
        pos[1] >= map[0].length - 1 ||
        barriers.includes(map[pos[0]][pos[1] + 1])
      ) {
        return;
      }
      setPos([pos[0], pos[1] + 1]);
    }
    if (code === 37) {
      if (pos[1] <= 0 || barriers.includes(map[pos[0]][pos[1] - 1])) {
        return;
      }
      setPos([pos[0], pos[1] - 1]);
    }
    if (code === 38) {
      if (pos[0] <= 0 || barriers.includes(map[pos[0] - 1][pos[1]])) {
        return;
      }
      setPos([pos[0] - 1, pos[1]]);
    }
    if (code === 40) {
      if (
        pos[0] >= map.length - 1 ||
        barriers.includes(map[pos[0] + 1][pos[1]])
      ) {
        return;
      }
      setPos([pos[0] + 1, pos[1]]);
    }
  };

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
      <div className="map" style={{ width: displayMap[0].length * 24 }}>
        {displayMap.map((row) =>
          row.map((tile) => <div id={"tile" + tile} className="tile" />)
        )}
      </div>
      <div
        style={{
          height: 24,
          width: 24,
          backgroundColor: "black",
          left: 120,
          top: 120,
          position: "absolute",
        }}
      ></div>
    </div>
  );
};

export default withRouter(observer(App));

// 39 righjt
// 37 left
//38 up
//40 down
