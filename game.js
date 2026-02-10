const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: "#05010d",
  scene: { create, update }
};

const game = new Phaser.Game(config);

