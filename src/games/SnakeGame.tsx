import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, RefreshCw, Play } from 'lucide-react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };

export const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  const moveSnake = useCallback(() => {
    if (gameOver || !isStarted) return;

    const newHead = {
      x: (snake[0].x + direction.x + GRID_SIZE) % GRID_SIZE,
      y: (snake[0].y + direction.y + GRID_SIZE) % GRID_SIZE,
    };

    // Check self collision
    if (snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
      setGameOver(true);
      return;
    }

    const newSnake = [newHead, ...snake];

    // Check food collision
    if (newHead.x === food.x && newHead.y === food.y) {
      setScore(s => s + 10);
      setFood({
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      });
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }, [snake, direction, food, gameOver, isStarted]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': if (direction.y === 0) setDirection({ x: 0, y: -1 }); break;
        case 'ArrowDown': if (direction.y === 0) setDirection({ x: 0, y: 1 }); break;
        case 'ArrowLeft': if (direction.x === 0) setDirection({ x: -1, y: 0 }); break;
        case 'ArrowRight': if (direction.x === 0) setDirection({ x: 1, y: 0 }); break;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [direction]);

  useEffect(() => {
    const interval = setInterval(moveSnake, 100);
    return () => clearInterval(interval);
  }, [moveSnake]);

  const reset = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setGameOver(false);
    setScore(0);
    setIsStarted(true);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 glass rounded-3xl border border-white/10">
      <div className="flex justify-between w-full items-center">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-yellow-500" />
          <span className="text-xl font-display font-bold">{score}</span>
        </div>
        <button onClick={reset} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
          <RefreshCw size={18} />
        </button>
      </div>

      <div 
        className="relative bg-black/40 rounded-xl overflow-hidden border border-white/5 shadow-inner"
        style={{ 
          display: 'grid', 
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          width: 'min(90vw, 400px)',
          aspectRatio: '1/1'
        }}
      >
        {/* Food */}
        <div 
          className="absolute bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]"
          style={{
            width: `${100/GRID_SIZE}%`,
            height: `${100/GRID_SIZE}%`,
            left: `${(food.x * 100) / GRID_SIZE}%`,
            top: `${(food.y * 100) / GRID_SIZE}%`,
          }}
        />

        {/* Snake */}
        {snake.map((seg, i) => (
          <div 
            key={i}
            className="absolute bg-white transition-all duration-75"
            style={{
              width: `${100/GRID_SIZE}%`,
              height: `${100/GRID_SIZE}%`,
              left: `${(seg.x * 100) / GRID_SIZE}%`,
              top: `${(seg.y * 100) / GRID_SIZE}%`,
              opacity: 1 - (i / snake.length) * 0.5,
              borderRadius: i === 0 ? '4px' : '2px',
              zIndex: 10
            }}
          />
        ))}

        <AnimatePresence>
          {!isStarted && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md"
            >
              <h3 className="text-2xl font-display font-bold mb-6">MODERN SNAKE</h3>
              <button 
                onClick={() => setIsStarted(true)}
                className="flex items-center gap-2 px-8 py-3 bg-white text-black rounded-full font-bold"
              >
                <Play size={20} fill="black" /> START
              </button>
            </motion.div>
          )}

          {gameOver && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md"
            >
              <h3 className="text-3xl font-display font-bold text-red-500 mb-2">CRASHED!</h3>
              <p className="text-4xl font-display mb-8">{score}</p>
              <button 
                onClick={reset}
                className="flex items-center gap-2 px-8 py-3 bg-white text-black rounded-full font-bold"
              >
                RETRY
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-4 gap-2 opacity-50 md:hidden">
        <div /> <button onClick={() => direction.y === 0 && setDirection({x:0, y:-1})} className="p-4 glass rounded-xl">↑</button> <div /> <div />
        <button onClick={() => direction.x === 0 && setDirection({x:-1, y:0})} className="p-4 glass rounded-xl">←</button>
        <button onClick={() => direction.y === 0 && setDirection({x:0, y:1})} className="p-4 glass rounded-xl">↓</button>
        <button onClick={() => direction.x === 0 && setDirection({x:1, y:0})} className="p-4 glass rounded-xl">→</button>
      </div>
    </div>
  );
};
