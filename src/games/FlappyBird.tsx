import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, RotateCcw, Play } from 'lucide-react';

export const FlappyBird: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'GAME_OVER'>('START');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => Number(localStorage.getItem('flappy-highscore')) || 0);

  const requestRef = useRef<number>();
  const birdY = useRef(200);
  const birdVelocity = useRef(0);
  const pipes = useRef<any[]>([]);
  const frameCount = useRef(0);

  const GRAVITY = 0.6;
  const JUMP = -8;
  const PIPE_SPEED = 3;
  const PIPE_SPAWN_RATE = 90;
  const BIRD_SIZE = 34;

  const resetGame = () => {
    birdY.current = 200;
    birdVelocity.current = 0;
    pipes.current = [];
    frameCount.current = 0;
    setScore(0);
    setGameState('PLAYING');
  };

  const update = () => {
    if (gameState !== 'PLAYING') return;

    birdVelocity.current += GRAVITY;
    birdY.current += birdVelocity.current;

    // Pipe generation
    if (frameCount.current % PIPE_SPAWN_RATE === 0) {
      const gap = 160;
      const minPipeHeight = 50;
      const pipeHeight = Math.random() * (400 - gap - (minPipeHeight * 2)) + minPipeHeight;
      pipes.current.push({
        x: 500,
        topHeight: pipeHeight,
        bottomY: pipeHeight + gap,
        passed: false
      });
    }

    // Pipe logic
    pipes.current.forEach((pipe, index) => {
      pipe.x -= PIPE_SPEED;

      // Score
      if (!pipe.passed && pipe.x < 50) {
        pipe.passed = true;
        setScore(prev => prev + 1);
      }

      // Collision
      const birdRect = { x: 50, y: birdY.current, w: BIRD_SIZE, h: BIRD_SIZE };
      const topRect = { x: pipe.x, y: 0, w: 60, h: pipe.topHeight };
      const bottomRect = { x: pipe.x, y: pipe.bottomY, w: 60, h: 600 };

      if (
        (birdRect.x < topRect.x + topRect.w && birdRect.x + birdRect.w > topRect.x && birdRect.y < topRect.y + topRect.h && birdRect.y + birdRect.h > topRect.y) ||
        (birdRect.x < bottomRect.x + bottomRect.w && birdRect.x + birdRect.w > bottomRect.x && birdRect.y < bottomRect.y + bottomRect.h && birdRect.y + birdRect.h > bottomRect.y)
      ) {
        endGame();
      }
    });

    // Remove old pipes
    pipes.current = pipes.current.filter(p => p.x > -100);

    // Floor/Ceiling collision
    if (birdY.current > 570 || birdY.current < -50) {
      endGame();
    }

    frameCount.current++;
  };

  const endGame = () => {
    setGameState('GAME_OVER');
    setHighScore(prev => {
      const currentScoreLast = score; // capture current score
      if (score > prev) {
        localStorage.setItem('flappy-highscore', String(score));
        return score;
      }
      return prev;
    });
  };

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, 500, 600);

    // Background Gradient (Atmospheric)
    const bgGrad = ctx.createLinearGradient(0, 0, 0, 600);
    bgGrad.addColorStop(0, '#0a0a0a');
    bgGrad.addColorStop(1, '#1a1a1a');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 500, 600);

    // Grid lines for "Modern" feel
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 500; i += 50) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 600); ctx.stroke();
    }
    for (let i = 0; i < 600; i += 50) {
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(500, i); ctx.stroke();
    }

    // Pipes
    pipes.current.forEach(pipe => {
      const grad = ctx.createLinearGradient(pipe.x, 0, pipe.x + 60, 0);
      grad.addColorStop(0, '#38bdf8');
      grad.addColorStop(1, '#818cf8');
      
      ctx.fillStyle = grad;
      ctx.shadowBlur = 15;
      ctx.shadowColor = 'rgba(56, 189, 248, 0.3)';
      
      // Top pipe
      ctx.beginPath();
      ctx.roundRect(pipe.x, 0, 60, pipe.topHeight, [0, 0, 8, 8]);
      ctx.fill();

      // Bottom pipe
      ctx.beginPath();
      ctx.roundRect(pipe.x, pipe.bottomY, 60, 600 - pipe.bottomY, [8, 8, 0, 0]);
      ctx.fill();
      
      ctx.shadowBlur = 0;
    });

    // Bird
    ctx.save();
    ctx.translate(50 + BIRD_SIZE/2, birdY.current + BIRD_SIZE/2);
    ctx.rotate(Math.min(Math.PI / 4, Math.max(-Math.PI / 4, birdVelocity.current * 0.1)));
    
    // Modern Bird (Rounded Box)
    const birdGrad = ctx.createLinearGradient(-BIRD_SIZE/2, -BIRD_SIZE/2, BIRD_SIZE/2, BIRD_SIZE/2);
    birdGrad.addColorStop(0, '#fde047');
    birdGrad.addColorStop(1, '#eab308');
    ctx.fillStyle = birdGrad;
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgba(234, 179, 8, 0.5)';
    ctx.beginPath();
    ctx.roundRect(-BIRD_SIZE/2, -BIRD_SIZE/2, BIRD_SIZE, BIRD_SIZE, 8);
    ctx.fill();
    
    // Eye
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(8, -4, 3, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
    ctx.shadowBlur = 0;
  };

  const loop = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    update();
    draw(ctx);
    requestRef.current = requestAnimationFrame(loop);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [gameState, score]);

  const jump = () => {
    if (gameState === 'PLAYING') {
      birdVelocity.current = JUMP;
    } else if (gameState === 'START' || gameState === 'GAME_OVER') {
      resetGame();
    }
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') jump();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [gameState]);

  return (
    <div className="relative group cursor-pointer" onClick={jump}>
      <canvas
        ref={canvasRef}
        width={500}
        height={600}
        className="max-w-full rounded-2xl border border-white/10 shadow-2xl glass"
      />
      
      <div className="absolute top-6 left-6 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-yellow-500" />
          <span className="text-xs font-mono text-white/50">HIGH SCORE: {highScore}</span>
        </div>
        <div className="text-5xl font-display font-bold tracking-tighter text-white drop-shadow-lg">
          {score}
        </div>
      </div>

      <AnimatePresence>
        {gameState === 'START' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm rounded-2xl"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-16 h-16 bg-yellow-400 rounded-xl mb-6 shadow-2xl border border-yellow-300"
            />
            <h3 className="text-3xl font-display font-bold mb-2">FLAPPY NENGOK</h3>
            <p className="text-white/60 text-sm mb-8">Klik atau Spasi untuk lompat</p>
            <button className="flex items-center gap-2 px-8 py-3 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform">
              <Play className="w-5 h-5 fill-current" /> MULAI
            </button>
          </motion.div>
        )}

        {gameState === 'GAME_OVER' && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md rounded-2xl"
          >
            <h3 className="text-4xl font-display font-bold mb-1 text-red-500">GAME OVER</h3>
            <div className="text-6xl font-display font-bold mb-8">{score}</div>
            
            <div className="flex gap-4">
              <button
                onClick={(e) => { e.stopPropagation(); resetGame(); }}
                className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform"
              >
                <RotateCcw className="w-5 h-5" /> RESTART
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
