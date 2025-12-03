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
    // images
    this.load.image('background', 'assets/images/background.png');
    this.load.image('obstacle', 'assets/images/obstacle.png');
    this.load.image('player', 'assets/images/player.png');
    this.load.image('goal', 'assets/images/goal.png');
    this.load.image('wall', 'assets/images/wall.png');
    this.load.image('life', 'assets/images/life.png');
    this.load.image('life_off', 'assets/images/life_off.png');

    // sounds
    this.load.audio('bgm', 'assets/sounds/bgm.mp3');
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
    this.clearText = this.add.text(this.scale.width / 2, this.scale.height / 2, 'LEVEL CLEAR!', { font: `50px ${firstFont}`, fill: '#00ff00' }).setOrigin(0.5).setVisible(false);

    // 화면 오른쪽 하단에 정보 텍스트 추가
    this.infoText = this.add.text(this.scale.width - 10, this.scale.height - 30, 'Gravity: DOWN', { font: '16px Arial', fill: '#ffffff' }).setOrigin(1, 1);
    this.speedText = this.add.text(this.scale.width - 10, this.scale.height - 10, 'Speed: 0', { font: '16px Arial', fill: '#ffffff' }).setOrigin(1, 1);

    // 입력 및 충돌 이벤트
    this.cursors = this.input.keyboard.createCursorKeys();
    this.matter.world.on('collisionstart', this.handleCollision, this);

    // 버튼 UI 활성화
    createLevelButtons(this.game);
    setActiveButton(this.currentLevel);
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
    this.goalZone = this.add.image(1100, 80, 'goal');
    this.matter.add.gameObject(this.goalZone, { isStatic: true, isSensor: true, label: 'goal'});

    // 벽 생성
    const wallOptions = { isStatic: true, label: 'wall' };
    LEVEL_MAPS[level].walls.forEach(wall => {
      const wallSprite = this.add.tileSprite(wall.x, wall.y, wall.width, wall.height, 'wall');
      wallSprite.setOrigin(0.5).setTileScale(0.5, 0.5); 
      this.matter.add.rectangle(wall.x, wall.y, wall.width, wall.height, wallOptions);
    });

    // 장애물 생성
    const obstacleOptions = { shape: 'circle', isStatic: false, restitution: 0.9, density: 0.05, label: 'obstacle' };
    LEVEL_MAPS[level].obstacles?.forEach(obstacle => {
      const obs = this.add.image(obstacle.x, obstacle.y, 'obstacle').setOrigin(0.5).setScale(0.5);
      const obstacleBody = this.matter.bodies.circle(obstacle.x, obstacle.y, obs.width / 4, obstacleOptions);
      obstacleBody.label = 'obstacle';
      this.matter.add.gameObject(obs, obstacleBody);
    });
  }

  handleCollision(event, bodyA, bodyB) {
    console.log(bodyA, bodyB)
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
      const DAMAGE_THRESHOLD = 8;

      console.log(speed > DAMAGE_THRESHOLD, "speed > DAMAGE_THRESHOLD")

      if (speed > DAMAGE_THRESHOLD && !this.isGameOver && !this.isLevelClear) {
        this.packageHealth--;
        const lifeIcons = this.healthText.getChildren();
        if (lifeIcons[this.packageHealth]) {
          lifeIcons[this.packageHealth].setTexture('life_off');
        }

        this.player.setTint(0xff0000);
        this.time.delayedCall(100,
          () => {
            if (!this.isGameOver) this.player.setTint(0xffcc00);
          },
          [],
          this
        );

        if (this.packageHealth <= 0) {
          this.gameOver();
        }
      }
    }
  }

  levelClear() {
    this.isLevelClear = true;
    this.matter.world.setGravity(0, 0);
    this.player.body.isStatic = true;
    this.player.setTint(0x00cc00);
    this.clearText.setVisible(true);
    this.infoText.setText('Level Cleared! Press F5 to Restart.');

    // 2초 후에 다음 레벨로 이동
    this.time.delayedCall(2000,
      () => {
        this.scene.restart({ level: this.currentLevel + 1 });
      },
      [],
      this
    );
  }

  gameOver() {
    this.isGameOver = true;
    this.matter.world.setGravity(0, 0);
    this.player.body.isStatic = true;
    this.player.setTint(0x888888);
    this.infoText.setText('GAME OVER').setColor('#ff0000');
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
}

function createLevelButtons(phaserGame) {
  const container = document.getElementById('level-buttons');
  container.innerHTML = '';
  for (let i = 1; i <= 10; i++) {
    const btn = document.createElement('button');
    btn.textContent = `LEVEL ${i}`;
    btn.onclick = () => {
      phaserGame.scene.scenes[0].scene.restart({ level: i });
      setActiveButton(i);
    };
    btn.id = `level-btn-${i}`;
    container.appendChild(btn);
  }
}

function setActiveButton(level) {
  for (let i = 1; i <= 10; i++) {
    const btn = document.getElementById(`level-btn-${i}`);
    if (btn) btn.classList.toggle('active', i === level);
  }
}