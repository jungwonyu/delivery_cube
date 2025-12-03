import PlayScene from './scenes/play.js';

const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  parent: 'game-container',
  physics: {
    default: 'matter',
    matter: {
      debug: true,
      gravity: { y: 1 },
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: PlayScene,
};

const game = new Phaser.Game(config);