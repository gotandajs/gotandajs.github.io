let canvas, ctx;
const resizeDelay = 100;

let initialize = function() {
  resizeCanvas();
  ctx=canvas.getContext('2d');
  //ctx.fillStyle = 'rgba(128, 100, 162, 0.5)';
  //ctx.fillRect(0, 0, canvas.width, canvas.height);

  let resizeTimer;
  window.addEventListener('resize', (event) => {
    if (resizeTimer !== false) {
      clearTimeout(resizeTimer);
    }
    resizeTimer = setTimeout(resizeCanvas, resizeDelay);
  });
};

let resizeCanvas = function() {
  let header = document.getElementsByTagName('header')[0];
  canvas = document.getElementById('voronoi');
  if ( ! header || ! canvas ) { return; }
  canvas.width = header.clientWidth;
  canvas.height = header.clientHeight;
};

initialize();
