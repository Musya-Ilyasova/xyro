import confetti from "canvas-confetti";

const addConfetti = () => {
  const canvas = document.querySelector('.canvas')
  const duration = 15 * 1000;
  const animationEnd = Date.now() + duration;
  const color = ['#23E5FF', '#FFFFFF', '#FFE721', '#0BBBEF'];
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    confetti({
      ...defaults,
      id: 'test',
      zIndex: 9999,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: color
    });
    confetti({
      ...defaults,
      id: 'test',
      zIndex: 9999,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: color
    });
  }, 250);
}


export default addConfetti;
