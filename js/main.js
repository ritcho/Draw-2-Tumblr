/**
 * Main JS looks after timer, start draw, save to tumblr and reset
 *
 * 
 */


// Binds the click and touches to same events

(function ($) {
    $.fn.tclick = function (onclick) {
        this.bind("touchstart", function (e) { onclick.call(this, e); e.stopPropagation(); e.preventDefault(); });
        this.bind("click", function (e) { onclick.call(this, e); });   //substitute mousedown event for exact same result as touchstart         
        return this;
    };


})(jQuery);

// I believe we can delete (perhaps pause i am getting??)

function autoTimer(){

    goDraw();
    
    } // autoTimer



// Timer to give you 15seconds to draw - then restart is called
function playTimer(){

  TimersJS.oneShot(15000, function() {
    console.log("This is called when the timeout is complete");
    restart();
});  

}

// LAUNCH DRAWING EXPERIENCE 
// Hide start and success pages, only show Canvas. 

function goDraw(){

  $('#startPage').hide();
  $('#successPage').hide(); 
  $('canvas').show();
  playTimer(); // Start the Clock! 

}




// SAVE Drawing TO TUMBLR!

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


// AUTO SAVE FUNCTION + Show success screen

function restart(){

	callSave(); // Calll the Save function 
	console.log('saved to tumblr');

	//clear();
	console.log('wiped your work');
	
	$('canvas').hide(); 
	$('#successPage').show(); 

	console.log('back to success page');

}















