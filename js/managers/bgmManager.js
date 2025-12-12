class BgmManager {
  constructor() {
    this.bgm = null;
    this.isOn = true;
  }

  init(scene, name, properties) {
    if (this.bgm) { // 항상 새로 생성
      this.bgm.destroy();
      this.bgm = null;
    }
    this.bgm = scene.sound.add(name, {
      ...properties
    });
    if (this.isOn) this.bgm.play();
  }

  play() {
    if (!this.bgm.isPlaying) this.bgm.play();
  }

  toggle() {
    if (!this.bgm) return;
    if (this.isOn) {
      this.bgm.pause();
      this.isOn = false;
    } else {
      if (this.bgm.isPaused) this.bgm.resume();
      else this.bgm.play();
      this.isOn = true;
    }
  }

  pause() {
    if (this.bgm?.isPlaying) this.bgm.pause();
  }

  stop() {
    this.bgm.stop();
  }

  resume() {
    if (this.bgm && !this.bgm.isPlaying) this.bgm.resume();
  }
}

export const bgmManager = new BgmManager();