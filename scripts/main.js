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

	$user = Parse.User.current();

	$(".flyer").hide();//http://localhost:8888/flyers/flyer7.jpg
	$(".bookmark").show();
	if($user.get('bookmark').length > 0){
		for(i =0 ; i < $user.get('bookmark').length; ++i){
			$(".bookmark").append('<img class = "favorites" src = "flyers/' + $user.get('bookmark')[i] +'" />');
		}
	}else{
		alert('You have not bookmarked anything!');
	}
		

	
	

 }
	


function getHome(){
	// Bind the swipeHandler callback function to the swipe event on div.box

   $(".flyer").show();
   $(".bookmark").html('');
		$( "img.flyer" ).bind( "swipe", { sort: "image"}, swipeHandler );

		flyer_index = 0;

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

	$("#leftbutton").toggleClass("ui-btn-active");http://localhost:8888/flyers/flyer7.jpg
    
	window.setTimeout(nextFlyer, 500);
});

$('#rightbutton').click(function(){


	$("#rightbutton").toggleClass("ui-btn-active");



  	$flyerSlug = $('img.flyer').attr("src").substring(7);
  	$user = Parse.User.current();

	$user.addUnique('bookmark', $flyerSlug);
	$user.save;

  window.setTimeout(nextFlyer, 500);


});



// Upload function stuff
$(document).ready(function(){
	$(".upload").hide();
	$("#upload").click(function(){
		$(".upload").show();
		console.log("hi");
	})
	$("#goback").click(function(){
		$(".upload").hide();
	})

});