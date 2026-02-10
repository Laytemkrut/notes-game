const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: "#05010d",
  scene: {
    create,
    update
  }
};

const game = new Phaser.Game(config);
let camera;

function create () {
  camera = this.cameras.main;
  camera.setZoom(1);

  // Звезды фона
  for (let i = 0; i < 200; i++) {
    let x = Phaser.Math.Between(-1000, 1000);
    let y = Phaser.Math.Between(-1000, 1000);
    this.add.circle(x, y, 1, 0xffffff);
  }

  // Узлы заметок
  const nodes = [
    { x: 0, y: 0, r: 30, name: "Core" },
    { x: 300, y: -200, r: 20, name: "Note A" },
    { x: -250, y: 220, r: 20, name: "Note B" }
  ];

  nodes.forEach(n => {
    let planet = this.add.circle(n.x, n.y, n.r, 0x3a9fff);
    planet.setInteractive({ cursor: 'pointer' });

    planet.on("pointerdown", () => {
      alert("Заметка: " + n.name);
    });
  });

  // Зум колесом мыши
  this.input.on("wheel", (pointer, dx, dy) => {
    camera.zoom += dy * -0.001;
    camera.zoom = Phaser.Math.Clamp(camera.zoom, 0.5, 2);
  });

  // Перемещение карты пальцем / мышью
  this.input.on("pointermove", pointer => {
    if (!pointer.isDown) return;
    camera.scrollX -= (pointer.x - pointer.prevPosition.x) / camera.zoom;
    camera.scrollY -= (pointer.y - pointer.prevPosition.y) / camera.zoom;
  });
}

function update () {}
