var worker = new Worker('worker.js');

worker.addEventListener('message', function(e) {
  switch(e.data.cmd){
    case 'result':      
            $.get('values').value = e.data.result;
    break;
  }

}, false);


var $ = {};
$.get = function(ele){
  return document.getElementById(ele);
};


function generate(){
  var values = [];
  var count = $.get('count').value;
  for (var i = 0; i <= count; i++) {
    var randomnumber= Math.floor(Math.random()*11 + Math.random()*100 + Math.random()*1000);
    values.push(randomnumber);
  };
  $.get('values').value = values.join(',');
}

function addBall(){
  var slider = document.createElement('DIV');
  slider.className = 'slider';  
  var ball = document.createElement('DIV');
  ball.className = 'puck';
  slider.appendChild(ball);
  $.get('clock').appendChild(slider);
}

function normalSort(){
  var digiarray = $.get('values').value.split(',');
  digiarray.sort(function(a,b){return a - b});
  $.get('values').value = digiarray.join(',');
}

function workerSort(){
  worker.postMessage({
    cmd : 'sort',
    data : $.get('values').value
  });
}