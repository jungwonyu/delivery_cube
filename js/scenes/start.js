import { bgmManager } from '../managers/bgmManager.js';
export default class StartScene extends Phaser.Scene {
  constructor() {
    super('StartScene');
  }

  create() {
    bgmManager.init(this, 'bgm', { loop: true, volume: 0.05 });
    // bgmManager.stop();

    this.add.image(650, 375, 'startBackground').setScale(1300 / 1920, 750 / 1080);
    const title = this.add.image(650, -200, 'title').setScale(0.8);
    this.tweens.add({ targets: title, y: 150, duration: 2000, ease: 'Bounce.easeOut'});
    const startPlayer = this.add.sprite(650, 370, 'startPlayer').setScale(0.8);
    if (!this.anims.exists('idle')) this.anims.create({ key: 'idle', frames: this.anims.generateFrameNumbers('startPlayer', { start: 0, end: 3 }), frameRate: 5, repeat: -1 });
    startPlayer.play('idle');

    this.bgmButton = this.add.image(1250, 50, 'volumeOn').setInteractive({ useHandCursor: true }).setScale(0.5);
    this.updateBgmButtonTexture(!bgmManager.isOn);
    this.bgmButton.on('pointerdown', () => {
      bgmManager.toggle();
      this.updateBgmButtonTexture(!bgmManager.isOn);
      this.sound.play('clickSound');
    });
    const startButton = this.add.image(650, 650, 'startButton').setScale(0.7).setInteractive({ cursor: 'pointer' });
    startButton.on('pointerover', () => startButton.setTexture('startButtonHover'));
    startButton.on('pointerout', () => startButton.setTexture('startButton'));
    startButton.on('pointerdown', () => {
      this.sound.play('clickSound');
      this.scene.start('MainScene', { level: 1 });
    });
  }

  updateBgmButtonTexture(isPlaying) {
    this.bgmButton.setTexture(isPlaying ? 'volumeOff' : 'volumeOn');
  }
}