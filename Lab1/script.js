document.addEventListener('DOMContentLoaded', () => {
  const gameObject = document.getElementById('game-plane');
  const container = document.getElementById('game-window');
  const resetButton = document.getElementById('reset-button');

  let position = 0;
  const speed = 1;
  let animationId;

  function move() {
    const containerWidth = container.clientWidth - 25;
    const objectWidth = gameObject.clientWidth;

    if (position + objectWidth < containerWidth) {
      position += speed;
      if (position + objectWidth > containerWidth) {
        position = containerWidth - objectWidth;
      }
      gameObject.style.left = position + 'px';
      animationId = requestAnimationFrame(move);
    }
  }

  resetButton.addEventListener('click', () => {
    cancelAnimationFrame(animationId);
    position = 0;
    gameObject.style.left = position + 'px';
    move();
  });

  // Start movement
  move();
});
