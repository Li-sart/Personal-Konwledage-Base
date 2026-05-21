import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

interface CelebrationModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export function CelebrationModal({ isVisible, onClose }: CelebrationModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isVisible || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationId: number;
    const endTime = Date.now() + 5000;

    const createParticles = () => {
      const particleCount = 3;
      confetti({
        particleCount,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7'],
      });
      confetti({
        particleCount,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7'],
      });
    };

    const animate = () => {
      createParticles();

      if (Date.now() < endTime) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <canvas ref={canvasRef} className="confetti-canvas" />
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="celebration-icon">🎉</div>
        <h2>恭喜你完成任务！</h2>
        <button onClick={onClose} className="modal-close-btn">
          关闭
        </button>
      </div>
    </div>
  );
}
