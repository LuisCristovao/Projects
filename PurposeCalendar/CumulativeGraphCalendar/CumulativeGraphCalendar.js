const Canvas2D = Nabla.Canvas2D;
const Stream = Nabla.Stream;
const ImageIO = Nabla.ImageIO;
const Canvas = Nabla.Canvas;

const RandomCache = function(n = 1e3) {
  this.index = 0;
  this.n = n;
  this.cache = Stream.range(0, n)
    .map(Math.random)
    .collect(Stream.Collectors.toArray());
};

RandomCache.prototype.random = function() {
  const ans = this.cache[this.index];
  this.index = (this.index + 1) % this.n;
  return ans;
};

// const randomCache = new RandomCache(1000);

const Simulation = function() {
  this.graphics = new Canvas2D(document.getElementById("canvas"), [
    [-0.07, 1.05],
    [-0.05, 1.05]
  ]);
  this.color = {
    graph: Stream.range(0, 3)
      .map(x => Math.random() * 255)
      .collect(Stream.Collectors.toArray()),
    mouse: Stream.range(0, 3)
      .map(x => Math.random() * 255)
      .collect(Stream.Collectors.toArray())
  };
  this.nImage = ImageIO.loadImage("n.png");
  this.cnImage = ImageIO.loadImage("c(n).png");
  this.needDraw = true;
  this.mouseInSpace = [];
  let data = window.localStorage[window.location.search.substring(1)];
  const reducer = (e, v) => {
    e.push(e[e.length - 1] + v);
    return e;
  };
  if (data) {
    let calendarData = JSON.parse(data);
    let valuesStream = Stream.of(calendarData).flatMap(x =>
      Stream.of(Object.values(x.days))
    );
    this.cumulateValues = valuesStream.reduce([0], reducer);
  } else {
    this.cumulateValues = Stream.range(0, 365)
      .map(x => Math.random() < 0.5)
      .reduce([0], reducer);
  }
};

function getDashedLineShader(color) {
  return Canvas.interpolateLineShader((x, line, canvas, t) => {
    var p = 0.1;
    var isDash = t % p < p / 2 ? true : false;
    if (isDash) {
      canvas.drawPxl(x, color);
    }
  });
}

function getStringShader() {
  return ctx => {
    ctx.fillStyle = "black";
    ctx.font = "bold 16px Arial";
  };
}

function getRandomShader(color) {
  return (x, element, canvas) => {
    if (randomCache.random() < 0.2) canvas.drawPxl(x, color);
  };
}

Simulation.prototype.baseMouseAction = function(mouse) {
  this.mouseInSpace = this.graphics.inverseTransform(mouse);
  this.draw();
};

Simulation.prototype.mouseMove = function(e) {
  let rect = this.graphics.canvas.getBoundingClientRect();
  let mx = e.clientX - rect.left,
    my = e.clientY - rect.top;
  this.baseMouseAction([my, mx]);
};

Simulation.prototype.touchMove = function(e) {
  let rect = this.graphics.canvas.getBoundingClientRect();
  let mx = e.touches[0].clientX - rect.left,
    my = e.touches[0].clientY - rect.top;
  this.baseMouseAction([my, mx]);
};

Simulation.prototype.reSizeCanvas = function() {
  this.graphics.canvas.width = document.body.offsetWidth;
  this.graphics.canvas.height = document.body.offsetHeight;
};

Simulation.prototype.init = function() {
  this.reSizeCanvas();
  this.graphics.canvas.addEventListener(
    "mousemove",
    e => this.mouseMove(e),
    false
  );
  this.graphics.canvas.addEventListener(
    "touchmove",
    e => this.touchMove(e),
    false
  );
};

Simulation.prototype.drawBackGround = function() {
  this.graphics.drawLine([-1, 0], [1, 0], Canvas.simpleShader([0, 0, 0, 255]));
  this.graphics.drawLine([0, -1], [0, 1], Canvas.simpleShader([0, 0, 0, 255]));
  this.graphics.drawImage(this.nImage, [1, -0.02]);
  this.graphics.drawImage(this.cnImage, [-0.07, 1]);
};

Simulation.prototype.drawCumulativeGraph = function() {
  let graphColor = [...this.color.graph, 255];
  let n = this.cumulateValues.length - 1;
  let h = 1 / (n - 1);
  for (let i = 0; i < n; i++) {
    let x = i / (n - 1);
    let y = this.cumulateValues[i] / n;
    let yh = this.cumulateValues[i + 1] / n;
    this.graphics.drawLine(
      [x, y],
      [x + h, yh],
      Canvas.simpleShader(graphColor)
    );
    // this.graphics.drawQuad(
    //   [x, 0],
    //   [x + h, 0],
    //   [x + h, yh],
    //   [x, y],
    //   getRandomShader(graphColor)
    // );
  }
};

Simulation.prototype.mouseDraw = function() {
  if (!this.mouseInSpace || this.mouseInSpace.length == 0) return;
  let n = this.cumulateValues.length - 1;
  var x = this.mouseInSpace[0];
  x = Math.max(Math.min(x, 1), 0);
  let index = Math.floor(x * (n - 1));
  let y = this.cumulateValues[index] / n;
  const mouseColor = [...this.color.mouse, 255];
  this.graphics.drawCircle([x, y], 0.005, Canvas.simpleShader(mouseColor));
  this.graphics.drawLine([x, 0], [x, y], getDashedLineShader(mouseColor));
  this.graphics.drawString([x, -0.05], `${x.toFixed(2)}`, getStringShader());
  this.graphics.drawLine([0, y], [x, y], getDashedLineShader(mouseColor));
  this.graphics.drawString([-0.05, y], `${y.toFixed(2)}`, getStringShader());
};

Simulation.prototype.draw = function() {
  this.reSizeCanvas();
  this.graphics.clearImage([255, 255, 255, 255]);
  this.drawBackGround();
  this.drawCumulativeGraph();
  this.mouseDraw();
  this.graphics.paintImage();
};

const sim = new Simulation();
sim.init();
sim.draw();
