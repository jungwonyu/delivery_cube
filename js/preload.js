export default class Preload extends Phaser.Scene {
  constructor() {
    super('Preload');
  }

  preload() {
    // ---------------------------------- images

    // start scene assets
    this.load.image('startBackground', 'assets/images/start/startBackground.png');
    this.load.image('title', 'assets/images/start/title.png');
    this.load.spritesheet('startPlayer', 'assets/images/start/player.png', { frameWidth: 260, frameHeight: 260 });
    this.load.image('startButton', 'assets/images/start/startButton.png');
    this.load.image('startButtonHover', 'assets/images/start/startButtonHover.png');

    // play scene assets
    this.load.image('background', 'assets/images/play/background.png');
    this.load.image('obstacle', 'assets/images/play/obstacle.png');
    this.load.image('player', 'assets/images/play/player.png');
    this.load.image('goal', 'assets/images/play/goal.png');
    this.load.image('wall', 'assets/images/play/wall.png');
    this.load.image('life', 'assets/images/play/life.png');
    this.load.image('lifeOff', 'assets/images/play/lifeOff.png');
    this.load.image('levelClear', 'assets/images/play/levelClear.png');
    this.load.image('cube', 'assets/images/play/cube.png');

    // ----------------------------------  sounds
    this.load.audio('bgm', 'assets/sounds/bgm.mp3');
    this.load.audio('levelClearSound', 'assets/sounds/levelClear.mp3');
    this.load.audio('collisionSound', 'assets/sounds/collision.mp3');
    this.load.audio('clickSound', 'assets/sounds/click.mp3');
    this.load.audio('gameOverSound', 'assets/sounds/gameOver.mp3');
  }

  create() {
    this.scene.start('StartScene');
  }
}