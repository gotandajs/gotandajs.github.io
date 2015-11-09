import Voronoi from 'voronoi';

let canvas, ctx, vertList, voronoi, bbox, frameCount;

const resizeDelay = 100;
const vertNumMax = 10;
const speedMax = 5;
const fps = 10; // 0 < fps <= 60
const fillStyle = '#fff';

let initialize = function() {
  canvas = document.getElementById('voronoi');
  ctx = canvas.getContext('2d');
  vertList = [];
  voronoi = new Voronoi();
  frameCount = 0;

  resizeCanvas();

  let timer;
  window.addEventListener('resize', () => {
    if ( timer ) { clearTimeout(timer); }
    timer = setTimeout(resizeCanvas, resizeDelay);
  });

  loop();
};

let resizeCanvas = function() {
  let header = document.getElementsByTagName('header')[0];
  canvas.width = header.clientWidth;
  canvas.height = header.clientHeight;
  bbox = { xl: 0, xr: canvas.width, yt: 0, yb:canvas.height };
};

let loop = function() {
  let renderPerFrame = Math.floor( 60 / fps );
  frameCount = ( frameCount + 1 ) % renderPerFrame;
  if ( frameCount === 0 ) {
    render();
  }
  requestAnimationFrame(loop);
};

let render = function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = fillStyle;

  if ( vertList.length < vertNumMax ) {
    vertList.push( new Vert() );
  }

  let vertLen = vertList.length;
  for (let i = 0; i < vertLen; i++) {
    let v = vertList.shift();
    v.x += v.vx;
    v.y += v.vy;
    if ( ! ( v.x < 0 || canvas.width < v.x || v.y < 0 || canvas.height < v.y ) ) {
      vertList.push(v);
    }
  }

  let diagram = voronoi.compute(vertList, bbox);

  diagram.cells.forEach((cell) => {
    if ( cell.halfedges.length === 0 ) { return; }
    let p = cell.halfedges[0].edge.va;
    ctx.globalAlpha = cell.site.a;
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    cell.halfedges.forEach((halfedge) => {
      let p = halfedge.edge.vb;
      ctx.lineTo(p.x, p.y);
    });
    ctx.closePath();
    ctx.fill();
  });

};

class Vert {
  constructor() {
    this.x = canvas.width  * Math.random();
    this.y = canvas.height * Math.random();
    this.vx = Math.random() * speedMax * 2 - speedMax;
    this.vy = Math.random() * speedMax * 2 - speedMax;
    this.a = Math.random() * 0.8; // transparency
  }
}

export default initialize;
