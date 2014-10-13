// Main JS
(function ($) {
    $.fn.tclick = function (onclick) {
        this.bind("touchstart", function (e) { onclick.call(this, e); e.stopPropagation(); e.preventDefault(); });
        this.bind("click", function (e) { onclick.call(this, e); });   //substitute mousedown event for exact same result as touchstart         
        return this;
    };


})(jQuery);

function autoTimer(){

    TimersJS.oneShot(3000, function() {
    console.log("game starts");
    goDraw();
    }) // TimerJS
    } // autoTimer



// Timers
function playTimer(){

  TimersJS.oneShot(15000, function() {
    console.log("This is called when the timeout is complete");
    restart();
});  

}

// LAUNCH DRAWING EXPERIENCE 

function goDraw(){

  $('#startPage').hide();
  $('#successPage').hide(); 
  $('canvas').show();
  playTimer(); 

}




// SAVE CONTENT TO TUMBLR

function callSave(){

	var myCanvas = $('canvas');
	//var dataURL = canvas.toDataURL();
  var dataURL = document.getElementsByTagName("canvas")[0].toDataURL();
 

	 $.ajax({
   	  type: "POST",
      url:'php/save_tumblr.php',
      data: { img: dataURL},
      complete: function () {
          console.log("sending to tumblr worked!"); 
          
      },

      error: function () {
          console.log('Bummer: there was an error!');
      },

  	  });
  			return false;

  	  

} // callSave


// AUTO SAVE FUNCTION

function restart(){

	callSave();
	console.log('saved to tumblr');

	//clear();
	console.log('wiped your work');
	
	$('canvas').hide(); 
	$('#successPage').show(); 

	console.log('back to success page');

}















