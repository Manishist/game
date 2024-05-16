import React, { useState, useEffect } from "react";
import wall from "./assets/wall.png";
import coin from "./assets/coin.png";
import pacmann from "./assets/pacman.png";
import bg from "./assets/bg.png";
import ghost from "./assets/ghost2.png";
import "./App.css"; 

const PacManGame = () => {

    const [pacman, setPacman] = useState({ x: 6, y: 4 });
    const [map, setMap] = useState([
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
        [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
        [1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1],
        [1, 2, 2, 2, 1, 1, 5, 1, 1, 2, 2, 2, 1],
        [1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1],
        [1, 2, 1, 1, 2, 2, 1, 2, 2, 1, 1, 2, 1],
        [1, 2, 2, 2, 2, 2, 1, 4, 2, 2, 2, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ]);

    const [gameOver, setGameOver] = useState(false);

    const handleKeyDown = (event) => {

        if (gameOver) {
            return;
        }
        if (
            event.keyCode === 37 &&
            pacman.x > 0 &&
            map[pacman.y][pacman.x - 1] !== 1
        ) {
            setMap((prevMap) => {
                const newMap = [...prevMap];
                newMap[pacman.y][pacman.x] = 3;
                setPacman(
                    (prevPacman) =>
                    (
                        {
                            ...prevPacman,
                            x: prevPacman.x - 1
                        }));
                newMap[pacman.y][pacman.x - 1] = 5;
                return newMap;
            });
        } else if (
            event.keyCode === 38 &&
            pacman.y > 0 &&
            map[pacman.y - 1][pacman.x] !== 1
        ) {
            setMap((prevMap) => {
                const newMap = [...prevMap];
                newMap[pacman.y][pacman.x] = 3;
                setPacman(
                    (prevPacman) =>
                    (
                        {
                            ...prevPacman,
                            y: prevPacman.y - 1
                        }));
                newMap[pacman.y - 1][pacman.x] = 5;
                return newMap;
            });
        } else if (
            event.keyCode === 39 &&
            pacman.x < map[0].length - 1 &&
            map[pacman.y][pacman.x + 1] !== 1
        ) {
            setMap((prevMap) => {
                const newMap = [...prevMap];
                newMap[pacman.y][pacman.x] = 3;
                setPacman(
                    (prevPacman) =>
                    (
                        {
                            ...prevPacman,
                            x: prevPacman.x + 1
                        }));
                newMap[pacman.y][pacman.x + 1] = 5;
                return newMap;
            });
        } else if (
            event.keyCode === 40 &&
            pacman.y < map.length - 1 &&
            map[pacman.y + 1][pacman.x] !== 1
        ) {
            setMap((prevMap) => {
                const newMap = [...prevMap];
                newMap[pacman.y][pacman.x] = 3;
                setPacman((prevPacman) =>
                (
                    {
                        ...prevPacman,
                        y: prevPacman.y + 1
                    }));
                newMap[pacman.y + 1][pacman.x] = 5;
                return newMap;
            });
        }
        checkWinningCondition();
    };

    const checkWinningCondition = () => {

        if (!map.some((row) => row.includes(2))) {
            setGameOver(true);
            alert("Congratulations! You collected all the coins. You win!");
        } else if (!map.some((row) => row.includes(4))) {
            setGameOver(true);
            alert("Game over !! You collided with the ghost");
        }

    };
 
    useEffect(() => {
        const handleKeyDownEvent = 
            (event) => handleKeyDown(event);
        document.addEventListener("keydown", handleKeyDownEvent);

        return () => {
            document.removeEventListener("keydown", handleKeyDownEvent);
        };
    }, [handleKeyDown]);
 
    return (
        <div id="world" style={{ backgroundColor: "white" }}>
            {map.map((row, rowIndex) => (
                <div key={rowIndex}>
                    {row.map((cell, colIndex) => (
                        <div
                            key={colIndex}
                            className={
                                cell === 1
                                ? "wall"
                                : cell === 2
                                ? "coin"
                                : cell === 3
                                ? "ground"
                                : cell === 4
                                ? "ghost"
                                : cell === 5
                                ? "pacman"
                                : null
                            }
                            style={
                                cell === 1
                                    ? { backgroundImage: `url(${wall})` }
                                    : cell === 2
                                    ? { backgroundImage: `url(${coin})` }
                                    : cell === 3
                                    ? { backgroundImage: `url(${bg})` }
                                    : cell === 4
                                    ? { backgroundImage: `url(${ghost})` }
                                    : cell === 5
                                    ? { backgroundImage: `url(${pacmann})` }
                                    : null
                            }
                        ></div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default PacManGame;