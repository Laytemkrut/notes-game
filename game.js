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
let nodes = [];
let lines = [];

function create() {
  camera = this.cameras.main;
  camera.setZoom(1);

  // Фоновые звезды
  for (let i = 0; i < 200; i++) {
    let x = Phaser.Math.Between(-1000, 1000);
    let y = Phaser.Math.Between(-1000, 1000);
    this.add.circle(x, y, 1, 0xffffff);
  }

  // Узлы заметок
  nodes = [
    { x: 0, y: 0, r: 30, name: "Core", circle: null },
    { x: 300, y: -200, r: 20, name: "Note A", circle: null },
    { x: -250, y: 220, r: 20, name: "Note B", circle: null }
  ];

  nodes.forEach(n => {
    n.circle = this.add.circle(n.x, n.y, n.r, 0x3a9fff);
    n.circle.setInteractive({ cursor: 'pointer' });

    // Пульс анимации
    this.tweens.add({
      targets: n.circle,
      scale: 1.1,
      yoyo: true,
      repeat: -1,
      duration: Phaser.Math.Between(800, 1500)
    });

    n.circle.on("pointerdown", () => {
      alert("Заметка: " + n.name);
    });
  });

  // Линии между узлами
  lines = [];
  for (let i = 1; i < nodes.length; i++) {
    let line = this.add.line(0, 0,
      nodes[0].x, nodes[0].y,  // Core
      nodes[i].x, nodes[i].y,
      0xffffff
    ).setOrigin(0, 0);
    lines.push(line);
  }

  // Зум колесом
  this.input.on("wheel", (pointer, dx, dy) => {
    camera.zoom += dy * -0.001;
    camera.zoom = Phaser.Math.Clamp(camera.zoom, 0.5, 2);
  });

  // Перемещение карты пальцем/мышью
  this.input.on("pointermove", pointer => {
    if (!pointer.isDown) return;
    camera.scrollX -= (pointer.x - pointer.prevPosition.x) / camera.zoom;
    camera.scrollY -= (pointer.y - pointer.prevPosition.y) / camera.zoom;
  });
}

function update() {
  // Линии динамически следят за узлами
  for (let i = 1; i < nodes.length; i++) {
    let line = lines[i - 1];
    line.setTo(
      nodes[0].circle.x, nodes[0].circle.y,
      nodes[i].circle.x, nodes[i].circle.y
    );
  }
}
