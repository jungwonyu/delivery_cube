export default class StartScene extends Phaser.Scene {
  constructor() {
    super('StartScene');
  }

  create() {
    this.add.image(650, 375, 'startBackground').setScale(1300 / 1920, 750 / 1080);
    const title = this.add.image(650, -200, 'title').setScale(0.8);
    this.tweens.add({ targets: title, y: 150, duration: 2000, ease: 'Bounce.easeOut'});
    const startPlayer = this.add.sprite(650, 370, 'startPlayer').setScale(0.8);
    if (!this.anims.exists('idle')) this.anims.create({ key: 'idle', frames: this.anims.generateFrameNumbers('startPlayer', { start: 0, end: 3 }), frameRate: 5, repeat: -1 });
    startPlayer.play('idle');
    const startButton = this.add.image(650, 650, 'startButton').setScale(0.7).setInteractive({ cursor: 'pointer' });
    startButton.on('pointerover', () => startButton.setTexture('startButtonHover'));
    startButton.on('pointerout', () => startButton.setTexture('startButton'));
    startButton.on('pointerdown', () => {
      this.sound.play('clickSound');
      this.scene.start('MainScene', { level: 1 });
    });
  }
}