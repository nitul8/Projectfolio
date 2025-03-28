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
        checkWinner(board);
    }, [board]);

    useEffect(() => {
        if (mode && track.length === 9 && !winner) {
            setTimeout(clearTwoRandomBoxes, 500); // Delay for smoother gameplay
        }
    }, [track, winner, mode]);

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

    const clearTwoRandomBoxes = () => {
        let move1 = Math.floor(Math.random() * 9);
        let move2 = Math.floor(Math.random() * 9);

        while (move2 === move1 || !board[move1] || !board[move2]) {
            move1 = Math.floor(Math.random() * 9);
            move2 = Math.floor(Math.random() * 9);
        }

        setBoard((prevBoard) => {
            const newBoard = [...prevBoard];
            newBoard[move1] = null;
            newBoard[move2] = null;
            return newBoard;
        });

        setTrack((prevTrack) =>
            prevTrack.filter((id) => id !== move1 && id !== move2)
        );
    };

    const handleBox = (id: number) => {
        if (winner || board[id]) return;

        setBoard((prevBoard) => {
            const newBoard = [...prevBoard];
            newBoard[id] = turn;
            return newBoard;
        });

        setTrack((prevTrack) => [...prevTrack, id]);
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
                {winner
                    ? `Player ${winner} Wins 🎉`
                    : track.length === 9
                    ? mode
                        ? "No winner, clearing two boxes..."
                        : "Match Draw!"
                    : `Player ${turn}'s Turn`}
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
