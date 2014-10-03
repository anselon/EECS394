$("#leftbutton").attr('data-theme', "e");
$("#rightbutton").attr('data-theme', "e");


var flyer_index = 1;

//add flyer_index as event data
function getBookmarked(){
	// Bind the swipeHandler callback function to the swipe event on div.box
	$( "img.flyer" ).unbind( "swipe", { sort: "image"}, swipeHandler );
	$( "img.flyer" ).bind( "swipe", { sort: "bookmark"}, swipeHandler );
	$("#rightbutton").toggleClass("ui-btn-active");
	$( "img.flyer" ).trigger("swipe");


 }


function getHome(){
	// Bind the swipeHandler callback function to the swipe event on div.box
   // $( "img.flyer" ).unbind("swipe");
		$( "img.flyer" ).bind( "swipe", { sort: "image"}, swipeHandler );
		//$( "img.flyer" ).bind();
		flyer_index = 0;
		$( "img.flyer" ).trigger("swipe");
 }


function swipeHandler(event){
	console.log(flyer_index)

	     //get length and check if at end of array
	$(event.target).attr("src", "flyers/" + Parse.User.current().get(event.data.sort)[flyer_index]);

	if (event.data.sort == "image")
	{      
	    $("#rightbutton").removeClass("ui-btn-active");
		$("#leftbutton").removeClass("ui-btn-active");
 	}

	if (flyer_index < Parse.User.current().get(event.data.sort).length - 1){
		flyer_index += 1;
	}else {
		$(event.target).attr("src", "flyers/nudm.jpg");
	}

};



//go to next flyer
//calls swipeHandler
function nextFlyer(){
	$( "img.flyer" ).trigger("swipe");
	$("#rightbutton").removeClass("ui-btn-active");
	$("#leftbutton").removeClass("ui-btn-active");
}
	
$('#leftbutton').click(function(){

	$("#leftbutton").toggleClass("ui-btn-active");
    
	window.setTimeout(nextFlyer, 500);


});

$('#rightbutton').click(function(){


	$("#rightbutton").toggleClass("ui-btn-active");
    
	//add flyer to array of bookmarks
	//check if unique before adding to array with indexOf()
    Parse.User.current().add("bookmark", $('img.flyer').attr("src").substring(7));
    
	Parse.User.current().save();



  window.setTimeout(nextFlyer, 500);


});

