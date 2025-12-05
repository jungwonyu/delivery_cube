import { LEVEL_MAPS } from '../levels.js';

const firstFont = 'YeogiOttaeJalnan';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  init(data) {
    this.packageHealth = 3;
    this.isGameOver = false;
    this.isLevelClear = false;
    this.currentLevel = data.level || 1;
  }

  preload() {
  }

  create() {
    this.matter.world.setBounds(0, 0, 1280, 720);
    this.add.image(640, 360, 'background');
    this.setupLevel(this.currentLevel);

    // UI
    this.healthText = this.add.group();
    for (let i = 0; i < 3; i++) {
      const lifeIcon = this.add.image(25 + i * 40, 50, 'life').setScale(0.4);
      this.healthText.add(lifeIcon);
    }
    this.levelText = this.add.text(10, 10, `LEVEL: ${this.currentLevel}`, { font: `16px ${firstFont}`, fill: '#ffffff' });

    // 화면 오른쪽 하단에 정보 텍스트 추가
    this.infoText = this.add.text(this.scale.width - 10, this.scale.height - 30, 'Gravity: DOWN', { font: '16px Arial', fill: '#ffffff' }).setOrigin(1, 1);
    this.speedText = this.add.text(this.scale.width - 10, this.scale.height - 10, 'Speed: 0', { font: '16px Arial', fill: '#ffffff' }).setOrigin(1, 1);

    // 입력 및 충돌 이벤트
    this.cursors = this.input.keyboard.createCursorKeys();
    this.matter.world.on('collisionstart', this.handleCollision, this);

    // 버튼 UI 활성화
    this.createLevelButtons(this.game);
    setActiveButton(this.currentLevel);

    // 배경음악
    this.bgm = this.sound.add('bgm', { volume: 0.5, loop: true });
    this.bgm.play();
  }

  setupLevel(level) {
    if (!LEVEL_MAPS[level]) {
      this.add.text(400, 300, 'CONGRATULATIONS!\nYou have completed all levels!', { font: `30px ${firstFont}`, fill: '#ffffff', align: 'center' }).setOrigin(0.5);
      return;
    }

    // 플레이어 생성
    this.player = this.add.image(80, 550, 'player').setOrigin(0.5).setScale(0.5).setDepth(1);
    const playerBody = this.matter.bodies.rectangle(80, 550, this.player.width / 2, this.player.height / 2);
    playerBody.label = 'player';
    this.matter.add.gameObject(this.player, playerBody);

    // 골 생성
    this.goalZone = this.add.image(1100, 80, 'goal').setDepth(1);
    this.matter.add.gameObject(this.goalZone, { isStatic: true, isSensor: true, label: 'goal'});

    // 벽 생성
    LEVEL_MAPS[level].walls.forEach(wall => {
      this.add.tileSprite(wall.x, wall.y, wall.width, wall.height, 'wall').setOrigin(0.5).setTileScale(0.5, 0.5);
      this.matter.add.rectangle(wall.x, wall.y, wall.width, wall.height, { isStatic: true, label: 'wall' });
    });

    // 장애물 생성
    // LEVEL_MAPS[level].obstacles?.forEach(obstacle => {
    //   const obs = this.add.image(obstacle.x, obstacle.y, 'obstacle').setOrigin(0.5).setScale(0.5);
    //   const obstacleBody = this.matter.bodies.circle(obstacle.x, obstacle.y, obs.width / 4, { shape: 'circle', isStatic: false, restitution: 0.9, density: 0.05, label: 'obstacle' });
    //   this.matter.add.gameObject(obs, obstacleBody);
    // });

    // 장애물 랜덤 위치 생성 레벨
    for (let i = 0; i < level * 0.8; i++) {
      const x = Phaser.Math.Between(200, 1100);
      const y = Phaser.Math.Between(150, 600);
      const obs = this.add.image(x, y, 'obstacle').setOrigin(0.5).setScale(0.5).setDepth(2);
      const obstacleBody = this.matter.bodies.circle(x, y, obs.width / 4, { shape: 'circle', isStatic: false, restitution: 0.9, density: 0.05, label: 'obstacle' });
      this.matter.add.gameObject(obs, obstacleBody);
    }

    // 큐브 생성
    LEVEL_MAPS[level].cubes?.forEach(cubeData => {
      const cube = this.add.image(cubeData.x, cubeData.y, 'cube').setOrigin(0.5).setScale(0.5);
      const cubeBody = this.matter.bodies.rectangle(cubeData.x, cubeData.y, cube.width / 2, cube.height / 2, { isStatic: true, label: 'cube' });
      this.matter.add.gameObject(cube, cubeBody);
    });
  }

  handleCollision(event, bodyA, bodyB) {
    const isPlayerA = bodyA.label === 'player';
    const isPlayerB = bodyB.label === 'player';
    const otherBody = isPlayerA ? bodyB : bodyA;

    if (isPlayerA || isPlayerB) {
      if (otherBody.label === 'goal' && !this.isLevelClear) {
        this.levelClear();
        return;
      }

      const playerBody = isPlayerA ? bodyA : bodyB;
      const speed = Math.sqrt(playerBody.velocity.x ** 2 + playerBody.velocity.y ** 2);
      const DAMAGE_THRESHOLD = 10;
      if (otherBody.label === 'cube') {
        otherBody.gameObject.destroy();
        this.player.setScale(0.3); // 플레이어 크기 줄이기
      }

      if (speed > DAMAGE_THRESHOLD && !this.isGameOver && !this.isLevelClear) {
        this.packageHealth--;
        this.sound.play('collisionSound');
        const lifeIcons = this.healthText.getChildren();
        if (lifeIcons[this.packageHealth]) lifeIcons[this.packageHealth].setTexture('lifeOff');
        this.player.setTint(0xff0000);
        this.time.delayedCall(100, () => { if (!this.isGameOver) this.player.setTint(0xffcc00); }, [], this);
        if (this.packageHealth <= 0) this.gameOver();
      }
    }
  }

  levelClear() {
    this.isLevelClear = true;
    this.matter.world.setGravity(0, 0);
    this.player.body.isStatic = true;
    this.player.setTint(0x00cc00);
    this.infoText.setText('Level Cleared! Press F5 to Restart.');
    this.add.rectangle(this.scale.width / 2, this.scale.height / 2, this.scale.width, this.scale.height, 0x000000, 0.5).setDepth(1);

    const levelClearImage = this.add.image(this.scale.width / 2, this.scale.height / 2, 'levelClear').setOrigin(0.5).setScale(0.2).setDepth(2);
    this.tweens.add({ targets: levelClearImage, scale: 0.6, duration: 2000, ease: 'Power2' });

    this.bgm.stop();
    this.sound.play('levelClearSound');

    // 2초 후에 다음 레벨로 이동
    this.time.delayedCall(2000, () => this.scene.restart({ level: this.currentLevel + 1 }), [], this);
  }

  gameOver() {
    this.isGameOver = true;
    this.matter.world.setGravity(0, 0);
    this.player.body.isStatic = true;
    this.player.setTint(0x888888);
    this.infoText.setText('GAME OVER').setColor('#ff0000');
    this.bgm.stop();
    this.sound.play('gameOverSound');
  }

  update() {
    if (this.isGameOver || this.isLevelClear) return;
    if (this.cursors.up.isDown) {
      this.matter.world.setGravity(0, -1);
      this.infoText.setText('Gravity: UP');
    } else if (this.cursors.down.isDown) {
      this.matter.world.setGravity(0, 1);
      this.infoText.setText('Gravity: DOWN');
    } else if (this.cursors.left.isDown) {
      this.matter.world.setGravity(-1, 0);
      this.infoText.setText('Gravity: LEFT');
    } else if (this.cursors.right.isDown) {
      this.matter.world.setGravity(1, 0);
      this.infoText.setText('Gravity: RIGHT');
    }

    // 속도 표시 갱신
    if (this.player && this.player.body) {
      const v = this.player.body.velocity;
      const speed = Math.sqrt(v.x * v.x + v.y * v.y).toFixed(2);
      this.speedText.setText('Speed: ' + speed);
    }
  }

  createLevelButtons() {
    const container = document.getElementById('level-buttons');
    container.innerHTML = '';
    for (let i = 1; i <= 10; i++) {
      const btn = document.createElement('button');
      btn.textContent = `LEVEL ${i}`;
      btn.onclick = () => {
        this.bgm.stop();
        this.sound.play('clickSound');
        this.scene.start('MainScene', { level: i });
        setActiveButton(i);
      };
      btn.id = `level-btn-${i}`;
      container.appendChild(btn);
    }
  }
}

function setActiveButton(level) {
  for (let i = 1; i <= 10; i++) {
    const btn = document.getElementById(`level-btn-${i}`);
    if (btn) btn.classList.toggle('active', i === level);
  }
}