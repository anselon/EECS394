
/* function excolor( color1, color2) {
 	
		$("#rightbutton").removeClass("ui-btn-hover-"+color1+" ui-btn-hover-"+color2+" ui-btn-up-"+color1+" ui-btn-up-"+color2);
		$("#rightbutton").buttonMarkup({theme:color2});
		$("#rightbutton").unbind('click');
	
}
*/

	//go to next flyer
	function nextFlyer(){
	  
	  $( "img.flyer" ).trigger("swipe");

 
     }
	

$('#rightbutton').click(function(){

	$("#rightbutton").attr('data-theme', "e");
	$("#rightbutton").toggleClass("ui-btn-active");
    
	//add flyer to array of bookmarks
    Parse.User.current().add("bookmark", $('img.flyer').attr("src"));

	Parse.User.current().save(null,{
	  success: function(testObject) {
	    // save succeeded
	  },
	  error: function(testObject, error) {
	    // inspect error
	  }

	});



  window.setTimeout(nextFlyer, 1000);


});

