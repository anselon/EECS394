$("#leftbutton").attr('data-theme', "e");
$("#rightbutton").attr('data-theme', "e");



//$( "img.flyer" ).attr('src', Parse.flyers.get('hard_link').where


var flyer_index = 0;
getInstruction();

function getInstruction(){
	if (Parse.User.current().get("instruction") == false) {
		$("body").append("<img id='instruction' src='./instruction.png' width='100%' style='position: fixed; z-index:21'/>");
		$("body").append("<div class='overlay'></div> ")
		$("#instruction").on('click',function(event){
			this.remove();
			$(".overlay").remove();
			Parse.User.current().set("instruction", true);
			Parse.User.current().save();
		});
	}
}
 


//add flyer_index as event data
function getBookmarked(){
	// Bind the swipeHandler callback function to the swipe event on div.box
	$( "img.flyer" ).unbind( "swipe", { direction: "left"}, swipeHandler );
	$( "img.flyer" ).unbind( "swipe", { direction: "right"}, swipeHandler );
	$( "img.flyer" ).bind( "swipe", { direction: "left"}, swipeHandler );
	$( "img.flyer" ).bind( "swipe", { direction: "right"}, swipeHandler );
	$("#rightbutton").toggleClass("ui-btn-active");
	$( "img.flyer" ).trigger("swipeleft");


 }


function getHome(){
	// Bind the swipeHandler callback function to the swipe event on div.box
   // $( "img.flyer" ).unbind("swipe");
		//$( "img.flyer" ).bind( "swipe", { direction: "left"}, swipeHandler );
		//$( "img.flyer" ).bind( "swipe", { direction: "right"}, swipeHandler );
		////$( "img.flyer" ).bind();
		flyer_index = 0;
		//$( "img.flyer" ).trigger("swipe");
 }		

jQuery( "img.flyer" ).on( "swipeleft", function( event ) { 
	console.log('SWIPE LEFT');

	flyer_index = flyer_index + 1;
	//query for next flyer
	var flyers = Parse.Object.extend("flyers");
	var query = new Parse.Query(flyers);
	var flyer_link;
	query.equalTo('flyer_num', flyer_index);
	query.find({
	  success: function(results) {
	    //Success callback
		var object = results[0];
		if (results.length == 0) {
			flyer_index = flyer_index -1;
			console.log("no index");
			console.log(flyer_index);
		} else {
	     	flyer_link = object.get('hard_link');
	     	$(event.target).attr("src", "flyers/" + flyer_link.substring(1, flyer_link.length-1));  

	     	if ( object.get('freefood') == true ) {$("img.flyer").css({ "border": "5px solid green" });} 
	     	else {$("img.flyer").css({ "border": "0px" });} 	      
     	}
	  },
	  error: function(error) {
	  	flyer_index = flyer_index -1;
	    console.log(error);
	  }
	});

 })

jQuery( "img.flyer" ).on( "swiperight", function( event ) { 
	console.log('SWIPE RIGHT');

	flyer_index = flyer_index - 1;
	//query for next flyer
	var flyers = Parse.Object.extend("flyers");
	var query = new Parse.Query(flyers);
	var flyer_link;
	query.equalTo('flyer_num', flyer_index);
	query.find({
	  success: function(results) {
	    //Success callback
		var object = results[0];
		if (results.length == 0) {
			flyer_index = flyer_index +1;
			console.log("no index");
			console.log(flyer_index);
		} else {
			flyer_link = object.get('hard_link');
	     	$(event.target).attr("src", "flyers/" + flyer_link.substring(1, flyer_link.length-1));  

	     	if ( object.get('freefood') == true ) {$("img.flyer").css({ "border": "5px solid green" });} 
	     	else {$("img.flyer").css({ "border": "0px" });} 
		}	      

	  },
	  error: function(error) {
		flyer_index = flyer_index +1;
	    console.log(error);
	  }
	});

} )





//go to next flyer
//calls swipeHandler
function nextFlyer(){
	$( "img.flyer" ).trigger("swipeleft");

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
 	// if (Parse.User.current().get(event.data.sort).indexOf($('img.flyer').attr("src").substring(7)) == -1)
  	//{
    Parse.User.current().add("bookmark", $('img.flyer').attr("src").substring(7));
	Parse.User.current().save();
	//}
	window.setTimeout(nextFlyer, 500);


});

