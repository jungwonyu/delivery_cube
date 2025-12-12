export default class Preload extends Phaser.Scene {
  constructor() {
    super('Preload');
  }

  preload() {
    // ---------------------------------- images
    // start scene assets
    this.load.image('startBackground', 'assets/images/start/startBackground.png');
    this.load.image('title', 'assets/images/start/title.png');
    this.load.spritesheet('startPlayer', 'assets/images/start/player.png', { frameWidth: 256, frameHeight: 256 });
    this.load.image('startButton', 'assets/images/start/startButton.png');
    this.load.image('startButtonHover', 'assets/images/start/startButtonHover.png');
    this.load.image('volumeOn', 'assets/images/start/volumeOn.png');
    this.load.image('volumeOff', 'assets/images/start/volumeOff.png');

    // play scene assets
    this.load.image('player', 'assets/images/play/player.png');
    this.load.image('player_sad', 'assets/images/play/player_sad.png');
    this.load.image('player_wow', 'assets/images/play/player_wow.png');
    this.load.image('player_cube1', 'assets/images/play/player_cube1.png');
    this.load.image('player_cube2', 'assets/images/play/player_cube2.png');
    this.load.image('player_cube3', 'assets/images/play/player_cube3.png');

    this.load.image('background', 'assets/images/play/background.png');
    this.load.image('obstacle', 'assets/images/play/obstacle.png');
    this.load.image('goal', 'assets/images/play/goal.png');
    this.load.image('goal_off', 'assets/images/play/goal_off.png');
    this.load.image('wall', 'assets/images/play/wall.png');
    this.load.image('life', 'assets/images/play/life.png');
    this.load.image('life_off', 'assets/images/play/life_off.png');
    this.load.image('cube', 'assets/images/play/cube.png');
    this.load.image('balloon', 'assets/images/play/balloon.png');
    this.load.image('notice', 'assets/images/play/notice.png');
    this.load.image('resetButton', 'assets/images/play/resetButton.png');

    this.load.image('level_clear', 'assets/images/play/level_clear.png');
    this.load.image('level_clear1', 'assets/images/play/level_clear1.png');
    this.load.image('level_clear2', 'assets/images/play/level_clear2.png');
    this.load.image('level_clear3', 'assets/images/play/level_clear3.png');

    // ----------------------------------  sounds
    this.load.audio('bgm', 'assets/sounds/bgm.mp3');
    this.load.audio('levelClearSound', 'assets/sounds/levelClear.mp3');
    this.load.audio('collisionSound', 'assets/sounds/collision.mp3');
    this.load.audio('clickSound', 'assets/sounds/click.mp3');
    this.load.audio('gameOverSound', 'assets/sounds/gameOver.mp3');
    this.load.audio('getCubeSound', 'assets/sounds/getCube.mp3');

    // ---------------------------------- videos
    // 레벨 10까지 다 하면 나오는 비디오
    this.load.video('endingVideo', 'assets/videos/ending.mp4', 'loadeddata', false, true);

    // ----------------------------------  csv
    this.load.image('tiles', 'assets/maps/tileset.png');
    this.load.tilemapCSV('map_level1', 'assets/maps/map_level1.csv');
    this.load.tilemapCSV('map_level2', 'assets/maps/map_level2.csv');
    this.load.tilemapCSV('map_level3', 'assets/maps/map_level3.csv');
    this.load.tilemapCSV('map_level4', 'assets/maps/map_level4.csv');
    this.load.tilemapCSV('map_level5', 'assets/maps/map_level5.csv');
    this.load.tilemapCSV('map_level6', 'assets/maps/map_level6.csv');
    this.load.tilemapCSV('map_level7', 'assets/maps/map_level7.csv');
    this.load.tilemapCSV('map_level8', 'assets/maps/map_level8.csv');
    this.load.tilemapCSV('map_level9', 'assets/maps/map_level9.csv');
    this.load.tilemapCSV('map_level10', 'assets/maps/map_level10.csv');
  }

  create() {
    this.scene.start('StartScene');
  }
}