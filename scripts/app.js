
	$("#leftbutton").attr('data-theme', "e");
	$("#rightbutton").attr('data-theme', "e");

	
$('#leftbutton').click(function(){

	$("#leftbutton").toggleClass("ui-btn-active");
    
	window.setTimeout(nextFlyer, 500);


});

$('#rightbutton').click(function(){


	$("#rightbutton").toggleClass("ui-btn-active");
    
	//add flyer to array of bookmarks
	//check if unique before adding to array with indexOf()
    Parse.User.current().add("bookmark", $('img.flyer').attr("src").substring(7));
    
	Parse.User.current().save(null,{
	  success: function() {
	    // save succeeded
	  },
	  error: function(testObject, error) {
	    // inspect error
	  }

	});



  window.setTimeout(nextFlyer, 500);


});

