
window.requestAnimationFrame = (function() {
  //Check for each browser
  //@paul_irish function
  //Globalises this function to work on any browser as each browser has a different namespace for this
  return window.requestAnimationFrame || //Chromium
  window.webkitRequestAnimationFrame || //Webkit
  window.mozRequestAnimationFrame || //Mozilla Geko
  window.oRequestAnimationFrame || //Opera Presto
  window.msRequestAnimationFrame || //IE Trident?


  function(callback, element) { //Fallback function
    window.setTimeout(callback, 1000 / 60);
  }

})();


var canvas, context, oldTime, frametime;

var balls = [];

function ball(){
  this.init =  function(x, y, dx, dy, r) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
  }
  this.x = 10;
  this.y = 10;
  this.dx = 4;
  this.dy = 4;
  this.r = 10;
  this.id = balls.length;
  this.draw = function() {
    //this.move();
    context.fillStyle = 'rgb(0, 0, 0)';
    context.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
  }
  this.move = function() {
    console.log(this.x, this.y)
     worker.postMessage({
      'cmd': 'update', 
      'ball': {
        x:  this.x,
        y:  this.y,
        dx: this.dx,
        dy: this.dy,
        r:  this.r ,
        id: this.id
      }
    });
    // if ((this.x - this.r) < 0 || (this.x + this.r) > canvas.width) {
    //   this.dx = -1 * this.dx;
    // }
    // if ((this.y - this.r) < 0 || (this.y + this.r) > canvas.height) {
    //   this.dy = -1 * this.dy;
    // }

    // this.x += this.dx;
    // this.y += this.dy;

  }
  this.update = function(x, y){
    this.x = x;
    this.y = y;
  }

};

var clear = function() {
  canvas.width = 600;
}

function init() {
  canvas = document.getElementById('canvas');
   worker.postMessage({
      'cmd': 'start', 
      'settings': {
        canvas : {
          height: canvas.height,
          width: canvas.width,
        }
      }
    });

  context = canvas.getContext('2d');
  balls.push(new ball());
  oldTime = new Date().getTime();
}

function animate() {
  clear();
  //balls[0].draw();
  for(i in balls){
    balls[i].move();
  }
  
  fps();
  //console.log(balls);
  //window.setTimeout(animate, 1000/60);
  if(action == true){
    window.requestAnimationFrame(animate);
  }
}

function addBall(){
  //alert('Addijg');
  balls.push(new ball());
}
function removeBall(){
  //alert('Addijg');
  balls.pop();
}


function fps(){
  var time = new Date().getTime();
  frametime = 1/(time - oldTime) * 100000/60;
  oldTime = time;
}


var worker = new Worker('worker.js');

worker.addEventListener('message', function(e) {

  switch(e.data.cmd){
    case 'update':      
      balls[e.data.ball.id].update(e.data.ball.x, e.data.ball.y)
      balls[e.data.ball.id].draw();      
    break;
  }

}, false);


window.onload = function(){
  action = true;
  init();
  animate();
}


/** FPS CALCULATION **/
setInterval(function(){
  document.getElementById('fps').innerHTML = parseInt(frametime);
  document.getElementById('balls').innerHTML = balls.length;
},1000)

