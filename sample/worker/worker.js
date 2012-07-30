var settings = {};

self.addEventListener('message', function(e) {
  var data = e.data;
  switch (data.cmd) {
    case 'start':
      //self.postMessage('WORKER STARTED: ' + data.msg);
      settings = data.settings;
      break;

    case 'update':
    	
    	if ((data.ball.x - data.ball.r) < 0 || (data.ball.x + data.ball.r) > settings.canvas.width) {
	      data.ball.dx = -1 * data.ball.dx;
	    }
	    if ((data.ball.y - data.ball.r) < 0 || (data.ball.y + data.ball.r) > settings.canvas.height) {
	      data.ball.dy = -1 * data.ball.dy;
	    }

	    data.ball.x += data.ball.dx;
	    data.ball.y += data.ball.dy;
	    
	    self.postMessage({
	    	cmd : 'update',
	    	ball: data.ball
	    });
    	break;

    case 'stop':
      self.postMessage('WORKER STOPPED');
      self.close(); // Terminates the worker.
      break;
    default:
      self.postMessage('Unknown command: ' + data.msg);
  };
}, false);













// if ((data.ball.x - data.ball.r) < 0 || (data.ball.x + data.ball.r) > canvas.width) {
    //   data.ball.dx = -1 * data.ball.dx;
    // }
    // if ((data.ball.y - data.ball.r) < 0 || (data.ball.y + data.ball.r) > canvas.height) {
    //   data.ball.dy = -1 * data.ball.dy;
    // }

    // data.ball.x += data.ball.dx;
    // data.ball.y += data.ball.dy;