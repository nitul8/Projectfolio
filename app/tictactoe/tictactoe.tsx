"use client";
import React, {useState, useEffect} from "react";

interface BoxProps {
    id: number;
    children: React.ReactNode;
}

const TicTacToe = () => {
    const [turn, setTurn] = useState("X");
    const [board, setBoard] = useState(Array(9).fill(null));
    const [winner, setWinner] = useState<string | null>(null);
    const [mode, setMode] = useState<boolean>(false);
    const [track, setTrack] = useState<number[]>([]);

    useEffect(() => {
        console.log("Updated track:", track);
    }, [track]);

    useEffect(() => {
        checkWinner(board);
    }, [board]);

    const checkWinner = (board: string[]) => {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (const [a, b, c] of winConditions) {
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                setWinner(board[a]);
                return;
            }
        }
    };

    const handleBox = (id: number) => {
        if (winner || board[id]) return;

        setTrack((prevTrack) => {
            const newTrack = [...prevTrack, id];

            if (mode && newTrack.length >= 9) {
                const oldestMove = newTrack.shift();
                setBoard((prevBoard) => {
                    const newBoard = [...prevBoard];
                    if (oldestMove !== undefined) newBoard[oldestMove] = null;
                    return newBoard;
                });
            }

            return newTrack;
        });

        setBoard((prevBoard) => {
            const newBoard = [...prevBoard];
            newBoard[id] = turn;
            return newBoard;
        });

        setTurn((prevTurn) => (prevTurn === "X" ? "O" : "X"));
    };

    const Box: React.FC<BoxProps> = ({id, children}) => (
        <button
            className="border-2 border-white h-24 w-24 rounded-2xl flex items-center justify-center text-3xl font-bold"
            onClick={() => handleBox(id)}
        >
            {children}
        </button>
    );

    return (
        <div className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold text-center mb-2">
                {mode ? "Advanced Tic Tac Toe" : "Normal Tic Tac Toe"}
            </h1>
            <h2 className="text-md font-light text-center mb-2">
                {track.length !== 9
                    ? winner
                        ? `Player ${winner} Wins`
                        : `Player ${turn}'s Turn`
                    : "Match Draw"}
            </h2>
            <div>
                {[0, 3, 6].map((row) => (
                    <div key={row} className="flex">
                        {[0, 1, 2].map((col) => (
                            <Box key={row + col} id={row + col}>
                                {board[row + col]}
                            </Box>
                        ))}
                    </div>
                ))}
            </div>
            <div className="flex justify-between space-x-3.5 mt-3">
                <button
                    className="w-3/4 max-w-lg bg-white/20 backdrop-blur-md p-3 rounded-lg shadow-lg text-white"
                    onClick={() => {
                        setBoard(Array(9).fill(null));
                        setWinner(null);
                        setTurn("X");
                        setMode(false);
                        setTrack([]);
                    }}
                >
                    Normal
                </button>
                <button
                    className="w-3/4 max-w-lg bg-white/20 backdrop-blur-md p-3 rounded-lg shadow-lg text-white"
                    onClick={() => {
                        setBoard(Array(9).fill(null));
                        setWinner(null);
                        setTurn("X");
                        setMode(true);
                        setTrack([]);
                    }}
                >
                    Advanced
                </button>
            </div>
        </div>
    );
};

export default TicTacToe;
