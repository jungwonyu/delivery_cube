import { bgmManager } from '../managers/bgmManager.js';
import { LEVEL_MAPS } from '../levels.js';

const DAMAGE_THRESHOLD = 10;
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
    this.isTextureChanging = false; 
  }

  create() {
    if (this.currentLevel > 10) {
      this.cameras.main.setBackgroundColor('#221144');
      // 화면 가운데 비디오(endingVideo) 재생
      const video = this.add.video(this.scale.width / 2, this.scale.height / 2, 'endingVideo').setOrigin(0.5).setScale(1.3).setMute(false); // 소리 켜기
      video.play(true);

      // 화면 하단 처음으로 가기 버튼
      this.add.text(this.scale.width / 2, this.scale.height - 50, '처음으로 가기', { font: `24px ${firstFont}`, fill: '#ffffff', backgroundColor: '#000000' })
        .setOrigin(0.5)
        .setPadding(10)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
          this.sound.play('clickSound');
          bgmManager.stop();
          this.scene.start('StartScene');
        });

      return;
    }
    bgmManager.init(this, 'bgm', { volume: 0.5, loop: true });
    bgmManager.isOn ? bgmManager.play() : bgmManager.stop();

    // 디버그
    // this.input.on('pointerdown', pointer => console.log(`player 좌표: x: ${pointer.x}, y: ${pointer.y}`));

    const resetButton = this.add.image(1260, 670, 'resetButton').setScale(0.5).setInteractive({ useHandCursor: true }).setDepth(9999);
    resetButton.on('pointerdown', () => {
      this.sound.play('clickSound');
      this.scene.restart({ level: this.currentLevel });
    });

    // 모바일 스와이프 조작 추가
    let swipeStartX = null;
    let swipeStartY = null;
    this.input.on('pointerdown', pointer => {
      swipeStartX = pointer.x;
      swipeStartY = pointer.y;
    });
    this.input.on('pointerup', pointer => {
      if (swipeStartX === null || swipeStartY === null) return;
      const dx = pointer.x - swipeStartX;
      const dy = pointer.y - swipeStartY;
      const threshold = 10; // 최소 스와이프 거리(px)
      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > threshold) {
          this.matter.world.setGravity(0.7, 0);
          this.infoText.setText('Gravity: RIGHT');
        } else if (dx < -threshold) {
          this.matter.world.setGravity(-0.7, 0);
          this.infoText.setText('Gravity: LEFT');
        }
      } else {
        if (dy > threshold) {
          this.matter.world.setGravity(0, 0.7);
          this.infoText.setText('Gravity: DOWN');
        } else if (dy < -threshold) {
          this.matter.world.setGravity(0, -0.7);
          this.infoText.setText('Gravity: UP');
        }
      }
      swipeStartX = null;
      swipeStartY = null;
    });

    // 배경 및 물리 설정
    this.matter.world.setBounds(0, 0, 1300, 750);
    this.add.image(650, 375, 'background').setDisplaySize(1300, 750);

    // UI
    this.healthText = this.add.group();
    for (let i = 0; i < 3; i++) {
      const lifeIcon = this.add.image(25 + i * 40, 50, 'life').setScale(0.4).setDepth(9999);
      this.healthText.add(lifeIcon);
    }
    this.levelText = this.add.text(10, 10, `LEVEL: ${this.currentLevel}`, { font: `16px ${firstFont}`, fill: '#ffffff' }).setDepth(9999);

    // 화면 오른쪽 하단에 정보 텍스트 추가
    this.infoText = this.add.text(this.scale.width - 10, this.scale.height - 30, 'Gravity: DOWN', { font: '16px Arial', fill: '#ffffff' }).setOrigin(1, 1).setDepth(9999);
    this.speedText = this.add.text(this.scale.width - 10, this.scale.height - 10, 'Speed: 0', { font: '16px Arial', fill: '#ffffff' }).setOrigin(1, 1).setDepth(9999);

    const overlay = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x000000, 0.5).setOrigin(0, 0);
    const notice = this.add.image(this.scale.width / 2, this.scale.height / 2, 'notice').setOrigin(0.5).setScale(0.5).setAlpha(0).setDepth(9999);
    this.tweens.add({
      targets: notice,
      alpha: 1,
      duration: 500,
      yoyo: true,
      // hold: 1000,
      hold: 0,
      onComplete: () => {
        this.setupLevel(this.currentLevel); // 레벨 설정
        overlay.destroy();
        notice.destroy();
      }
    });

    // 입력 및 충돌 이벤트
    this.cursors = this.input.keyboard.createCursorKeys();
    this.matter.world.on('collisionstart', this.handleCollision, this);

    // 버튼 UI 활성화
    this.createLevelButtons(this.game);
    setActiveButton(this.currentLevel);
  }

  setupLevel(level) {
    // 맵 생성
    const map = this.make.tilemap({ key: `map_level${level}`, tileWidth: 50, tileHeight: 50 });
    const tileset = map.addTilesetImage('tileset', 'tiles', 50, 50);
    const layer = map.createLayer(0, tileset, 0, 0);
    layer.setCollision([0]);
    this.matter.world.convertTilemapLayer(layer);

    // 골 생성
    LEVEL_MAPS[level].goal = LEVEL_MAPS[level].goal || { x: 1200, y: 80 };
    this.goalZone = this.add.image(LEVEL_MAPS[level].goal.x, LEVEL_MAPS[level].goal.y, 'goal').setDepth(1);
    this.matter.add.gameObject(this.goalZone, { isStatic: true, isSensor: true, label: 'goal'});

    // 장애물 생성
    LEVEL_MAPS[level].obstacles?.forEach(obstacle => {
      const obs = this.add.image(obstacle.x, obstacle.y, 'obstacle').setOrigin(0.5).setScale(0.5);
      const obstacleBody = this.matter.bodies.circle(obstacle.x, obstacle.y, obs.width / 4, { shape: 'circle', isStatic: false, restitution: 0.9, density: 0.05, label: 'obstacle' });
      this.matter.add.gameObject(obs, obstacleBody);
    });

    // 큐브 생성
    LEVEL_MAPS[level].cubes?.forEach(cube => {
      const cubeObj = this.add.image(cube.x, cube.y, 'cube').setOrigin(0.5).setScale(0.8);
      const cubeBody = this.matter.bodies.rectangle(cube.x, cube.y, cubeObj.width / 2, cubeObj.height / 2, { isStatic: true, label: 'cube' });
      this.matter.add.gameObject(cubeObj, cubeBody);
      cubeObj._tween = this.tweens.add({ targets: cubeObj, scale: 0.7, duration: 800, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    });

    // 플레이어 생성
    LEVEL_MAPS[level].player = LEVEL_MAPS[level].player || { x: 80, y: 650 };
    this.player = this.add.image(LEVEL_MAPS[level].player.x, LEVEL_MAPS[level].player.y, 'player').setOrigin(0.5).setScale(0.6).setDepth(1);
    const playerBody = this.matter.bodies.rectangle(LEVEL_MAPS[level].player.x, LEVEL_MAPS[level].player.y, this.player.width / 2, this.player.height / 2 + 10);
    playerBody.label = 'player';
    this.matter.add.gameObject(this.player, playerBody);
  }

  handleCollision(event, bodyA, bodyB) { // 충돌
    const isPlayerA = bodyA.label === 'player';
    const isPlayerB = bodyB.label === 'player';
    const otherBody = isPlayerA ? bodyB : bodyA;

    if (isPlayerA || isPlayerB) {
      if (this.isTextureChanging) return;
      if (otherBody.label === 'goal' && !this.isLevelClear) {
        if (this.player.texture.key === 'player_cube3') {
          this.levelClear();
          return;
        } else {
          this.goalZone.setTexture('goal_off');
          this.time.delayedCall(1000, () => {
            this.goalZone.setTexture('goal');
          }, [], this);
          return;
        }
      }

      // 박스와 충돌 시 박스 제거 & 플레이어 텍스처 변경
      if (otherBody.label === 'cube') {
        this.sound.play('getCubeSound');
        otherBody.gameObject._tween.stop();
        this.matter.world.remove(otherBody);
        otherBody.gameObject.destroy();
        if (this.player.texture.key === 'player_cube1') {
          this.player.setTexture('player_cube2');
          return;
        } else if (this.player.texture.key === 'player_cube2') {
          this.player.setTexture('player_cube3');
          return;
        } else {
          this.player.setTexture('player_cube1');
          return;
        }
      }

      const playerBody = isPlayerA ? bodyA : bodyB;
      const speed = Math.sqrt(playerBody.velocity.x ** 2 + playerBody.velocity.y ** 2);


      if (speed > DAMAGE_THRESHOLD && !this.isGameOver && !this.isLevelClear) {
        this.packageHealth--;
        this.sound.play('collisionSound');
        const lifeIcons = this.healthText.getChildren();
        if (lifeIcons[this.packageHealth]) lifeIcons[this.packageHealth].setTexture('life_off');
        this.player.prevTexture = this.player.texture.key;
        this.isTextureChanging = true;
        this.player.setTexture('player_wow');
        this.time.delayedCall(500, () => { 
          if (!this.isGameOver) 
            this.player.setTexture(this.player.prevTexture);
            this.isTextureChanging = false; 
          }, [], this);
        if (this.packageHealth <= 0) this.gameOver();
      }
    }
  }

  levelClear() {
    bgmManager.stop();
    this.sound.play('levelClearSound');
    this.isLevelClear = true;
    this.matter.world.setGravity(0, 0);
    this.player.body.isStatic = true;
    this.infoText.setText('Level Cleared! Press F5 to Restart.');
    this.add.rectangle(this.scale.width / 2, this.scale.height / 2, this.scale.width, this.scale.height, 0x000000, 0.5).setDepth(1);

    const textures = ['level_clear', 'level_clear1', 'level_clear2', 'level_clear3'];
    let idx = 0;
    const levelClearImage = this.add.image(this.scale.width / 2, this.scale.height / 2, textures[idx]).setOrigin(0.5).setScale(0.2).setDepth(2);

    this.tweens.add({
      targets: levelClearImage,
      scale: 0.5,
      duration: 2000,
      ease: 'Power2',
      onComplete: () => {
        this.time.addEvent({
          delay: 300,
          repeat: 2,
          callback: () => {
            idx = (idx + 1) % textures.length;
            levelClearImage.setTexture(textures[idx]);
            this.sound.play('clickSound');
          },
          callbackScope: this,
        });
      }
    });

    // 2초 후에 다음 레벨로 이동
    this.time.delayedCall(4000, () => this.scene.restart({ level: this.currentLevel + 1 }), [], this);
  }

  gameOver() {
    this.isGameOver = true;
    this.matter.world.setGravity(0, 0);
    this.player.body.isStatic = true;
    this.player.setTexture('player_sad');
    this.infoText.setText('GAME OVER').setColor('#ff0000');
    bgmManager.stop();
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
        bgmManager.stop();
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