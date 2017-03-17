(function() {
  var canvas, ctx, vertList, voronoi, bbox, frameCount;

  var resizeDelay = 100;
  var vertNumMax = 10;
  var speedMax = 5;
  var fps = 10; // 0 < fps <= 60
  var fillStyle = '#fff';

  function initialize(elem) {
    canvas = elem;
    ctx = canvas.getContext('2d');
    vertList = [];
    voronoi = new Voronoi();
    frameCount = 0;

    resizeCanvas();

    var timer;
    window.addEventListener('resize', function() {
      if ( timer ) { clearTimeout(timer); }
      timer = setTimeout(resizeCanvas, resizeDelay);
    });

    loop();
  }

  function resizeCanvas() {
    var header = document.getElementsByTagName('header')[0];
    canvas.width = header.clientWidth;
    canvas.height = header.clientHeight;
    bbox = { xl: 0, xr: canvas.width, yt: 0, yb:canvas.height };
  }

  function loop() {
    var renderPerFrame = Math.floor( 60 / fps );
    frameCount = ( frameCount + 1 ) % renderPerFrame;
    if ( frameCount === 0 ) {
      render();
    }
    requestAnimationFrame(loop);
  };

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = fillStyle;

    if ( vertList.length < vertNumMax ) {
      vertList.push( new Vert() );
    }

    var vertLen = vertList.length;
    for (var i = 0; i < vertLen; i++) {
      var v = vertList.shift();
      v.x += v.vx;
      v.y += v.vy;
      if ( ! ( v.x < 0 || canvas.width < v.x || v.y < 0 || canvas.height < v.y ) ) {
        vertList.push(v);
      }
    }

    var diagram = voronoi.compute(vertList, bbox);

    diagram.cells.forEach(function(cell) {
      if ( cell.halfedges.length === 0 ) { return; }
      var p = cell.halfedges[0].edge.va;
      ctx.globalAlpha = cell.site.a;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      cell.halfedges.forEach(function(halfedge) {
        var p = halfedge.edge.vb;
        ctx.lineTo(p.x, p.y);
      });
      ctx.closePath();
      ctx.fill();
    });

  }

  function Vert() {
    this.x = canvas.width  * Math.random();
    this.y = canvas.height * Math.random();
    this.vx = Math.random() * speedMax * 2 - speedMax;
    this.vy = Math.random() * speedMax * 2 - speedMax;
    this.a = Math.random() * 0.8; // transparency
  }

  window.voronoi = initialize;
})();
