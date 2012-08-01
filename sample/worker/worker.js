self.addEventListener('message', function(e) {
  var data = e.data;
  switch (data.cmd) {
    case 'sort':

	    self.postMessage({
	    	cmd : 'result',
	    	result: normalSort(data.data)
	    });
    	break;
  
    default:
      self.postMessage('Unknown command: ' + data.msg);
  };
}, false);



function normalSort(digi){  
  var digiarray = digi.split(',');
  digiarray.sort(function(a,b){return a - b});
  return digiarray.join(',');
}