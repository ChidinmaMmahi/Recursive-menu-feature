import { useState, useEffect } from "react";

const Square = ({
  value,
  onClick,
}: {
  value?: string | null;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="size-[100px] border border-red-500 text-4xl font-bold text-center float-left p-0 -mr-[1px] -mt-[1px] cursor-pointer"
    >
      {value}
    </button>
  );
};

const TicTacToe = () => {
  const [squares, setSquares] = useState<(string | null)[]>(
    Array(9).fill(null)
  );
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [status, setStatus] = useState<string>("");

  function getWinner(squares: (string | null)[]) {
    const winningPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningPatterns.length; i++) {
      const [a, b, c] = winningPatterns[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  function handleClick(getCurrentSquare: number) {
    const cpySquares = [...squares];
    if (getWinner(cpySquares) || cpySquares[getCurrentSquare]) return;
    cpySquares[getCurrentSquare] = isXNext ? "X" : "O";
    setIsXNext(!isXNext);
    setSquares(cpySquares);
  }

  function handleRestart() {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setStatus("");
  }

  useEffect(() => {
    if (!getWinner(squares) && squares.every((item) => item !== null)) {
      setStatus("It's a draw! Please restart the game");
    } else if (getWinner(squares)) {
      setStatus(`Winner is ${getWinner(squares)}! Please restart the game`);
    } else {
      setStatus(`Next player is ${isXNext ? "X" : "O"}`);
    }
  }, [squares, isXNext]);

  return (
    <main className="flex flex-col items-center justify-center after:clear-both after:content-[''] after:table">
      <h1 className="text-2xl font-bold mb-4">Tic Tac Toe</h1>

      <div className="flex flex-col">
        <div>
          <Square value={squares[0]} onClick={() => handleClick(0)} />
          <Square value={squares[1]} onClick={() => handleClick(1)} />
          <Square value={squares[2]} onClick={() => handleClick(2)} />
        </div>
        <div>
          <Square value={squares[3]} onClick={() => handleClick(3)} />
          <Square value={squares[4]} onClick={() => handleClick(4)} />
          <Square value={squares[5]} onClick={() => handleClick(5)} />
        </div>
        <div>
          <Square value={squares[6]} onClick={() => handleClick(6)} />
          <Square value={squares[7]} onClick={() => handleClick(7)} />
          <Square value={squares[8]} onClick={() => handleClick(8)} />
        </div>
      </div>

      <p className="mt-4 text-lg font-mono">{status}</p>
      <button
        className="mt-4 px-4 py-2 text-sm sm:text-base cursor-pointer rounded-full bg-black
       text-white hover:bg-gray-800 transition"
        onClick={handleRestart}
      >
        Restart Game
      </button>
    </main>
  );
};

export default TicTacToe;
