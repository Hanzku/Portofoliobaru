import React, { useState, useEffect, useCallback } from 'react';
import { Chess, Move } from 'chess.js';
import { Chessboard } from 'react-chessboard';
const ChessboardAny = Chessboard as any;
import { motion } from 'motion/react';
import { RefreshCw, User, Cpu, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

type Difficulty = 'easy' | 'medium' | 'hard';

export const ChessGame: React.FC = () => {
  const [game, setGame] = useState(new Chess());
  const [mode, setMode] = useState<'pvp' | 'pve'>('pve');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [status, setStatus] = useState<string>('Giliran Putih');
  const [gameOver, setGameOver] = useState(false);

  // Position Eval Tables (Simple)
  const pstSelf: any = {
    p: [
      [0,  0,  0,  0,  0,  0,  0,  0],
      [50, 50, 50, 50, 50, 50, 50, 50],
      [10, 10, 20, 30, 30, 20, 10, 10],
      [5,  5, 10, 25, 25, 10,  5,  5],
      [0,  0,  0, 20, 20,  0,  0,  0],
      [5, -5,-10,  0,  0,-10, -5,  5],
      [5, 10, 10,-20,-20, 10, 10,  5],
      [0,  0,  0,  0,  0,  0,  0,  0]
    ]
  };

  const getPieceValue = (piece: any, x: number, y: number) => {
    if (piece === null) return 0;
    const values: any = { p: 10, n: 30, b: 30, r: 50, q: 90, k: 900 };
    let val = values[piece.type] || 0;
    // Add position bonus if desired, using basic PST
    return piece.color === 'w' ? val : -val;
  };

  const evaluateBoard = (chess: Chess) => {
    let totalEval = 0;
    const board = chess.board();
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        totalEval += getPieceValue(board[i][j], i, j);
      }
    }
    return totalEval;
  };

  const minimax = (chess: Chess, depth: number, alpha: number, beta: number, isMaximizing: boolean): number => {
    if (depth === 0 || chess.isGameOver()) {
      return -evaluateBoard(chess);
    }

    const moves = chess.moves();

    if (isMaximizing) {
      let bestEval = -Infinity;
      for (const move of moves) {
        chess.move(move);
        const evalScore = minimax(chess, depth - 1, alpha, beta, false);
        chess.undo();
        bestEval = Math.max(bestEval, evalScore);
        alpha = Math.max(alpha, evalScore);
        if (beta <= alpha) break;
      }
      return bestEval;
    } else {
      let bestEval = Infinity;
      for (const move of moves) {
        chess.move(move);
        const evalScore = minimax(chess, depth - 1, alpha, beta, true);
        chess.undo();
        bestEval = Math.min(bestEval, evalScore);
        beta = Math.min(beta, evalScore);
        if (beta <= alpha) break;
      }
      return bestEval;
    }
  };

  const makeBestMove = useCallback(() => {
    if (game.isGameOver()) return;

    const possibleMoves = game.moves();
    if (possibleMoves.length === 0) return;

    let move;
    if (difficulty === 'easy') {
      move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    } else {
      const depth = difficulty === 'medium' ? 2 : 3;
      let bestMove = null;
      let bestValue = -Infinity;

      for (const m of possibleMoves) {
        game.move(m);
        const boardValue = minimax(game, depth - 1, -Infinity, Infinity, false);
        game.undo();
        if (boardValue > bestValue) {
          bestValue = boardValue;
          bestMove = m;
        }
      }
      move = bestMove || possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    }

    const gameCopy = new Chess(game.fen());
    gameCopy.move(move);
    setGame(gameCopy);
  }, [game, difficulty]);

  useEffect(() => {
    if (mode === 'pve' && game.turn() === 'b' && !game.isGameOver()) {
      const timer = setTimeout(makeBestMove, 500);
      return () => clearTimeout(timer);
    }
  }, [game, mode, makeBestMove]);

  useEffect(() => {
    if (game.isCheckmate()) {
      setStatus(`Checkmate! ${game.turn() === 'w' ? 'Hitam' : 'Putih'} Menang!`);
      setGameOver(true);
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    } else if (game.isDraw()) {
      setStatus('Seri!');
      setGameOver(true);
    } else if (game.isCheck()) {
      setStatus(`Check! Giliran ${game.turn() === 'w' ? 'Putih' : 'Hitam'}`);
    } else {
      setStatus(`Giliran ${game.turn() === 'w' ? 'Putih' : 'Hitam'}`);
    }
  }, [game]);

  function onDrop(sourceSquare: string, targetSquare: string) {
    try {
      const gameCopy = new Chess(game.fen());
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q', // Always promote to queen for simplicity
      });

      if (move === null) return false;
      setGame(gameCopy);
      return true;
    } catch (e) {
      return false;
    }
  }

  const resetGame = () => {
    setGame(new Chess());
    setGameOver(false);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4 md:p-8 bg-black/20 rounded-3xl border border-white/5 backdrop-blur-sm">
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        <button
          onClick={() => { setMode('pvp'); resetGame(); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${mode === 'pvp' ? 'bg-white text-black' : 'bg-white/5 hover:bg-white/10'}`}
        >
          <User size={18} /> PvP
        </button>
        <button
          onClick={() => { setMode('pve'); resetGame(); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${mode === 'pve' ? 'bg-white text-black' : 'bg-white/5 hover:bg-white/10'}`}
        >
          <Cpu size={18} /> PvE
        </button>
        
        {mode === 'pve' && (
          <div className="flex gap-2 bg-white/5 p-1 rounded-xl">
            {(['easy', 'medium', 'hard'] as const).map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`px-3 py-1 rounded-lg text-xs uppercase tracking-tighter transition-all ${difficulty === d ? 'bg-white/20 text-white' : 'text-white/40 hover:text-white/60'}`}
              >
                {d}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={resetGame}
          className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition-all"
        >
          <RefreshCw size={18} /> Reset
        </button>
      </div>

      <div className="w-full max-w-[450px] aspect-square shadow-2xl rounded-lg overflow-hidden border-4 border-white/10">
        <ChessboardAny
          position={game.fen()}
          onPieceDrop={onDrop}
          boardOrientation="white"
          customDarkSquareStyle={{ backgroundColor: '#262626' }}
          customLightSquareStyle={{ backgroundColor: '#404040' }}
        />
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className={`px-6 py-2 rounded-full border ${gameOver ? 'bg-red-500/20 border-red-500/40' : 'bg-white/5 border-white/10'} backdrop-blur-md`}>
          <p className="text-sm font-medium tracking-wide flex items-center gap-2">
            {gameOver && <AlertCircle size={14} />}
            {status}
          </p>
        </div>
        {mode === 'pve' && !gameOver && (
          <p className="text-[10px] text-white/30 uppercase tracking-[0.2em]">Bot Difficulty: {difficulty}</p>
        )}
      </div>
    </div>
  );
};
