$("#leftbutton").attr('data-theme', "e");
$("#rightbutton").attr('data-theme', "e");



//$( "img.flyer" ).attr('src', Parse.flyers.get('hard_link').where


var flyer_index = 1;

//add flyer_index as event data
function getBookmarked(){
	// Bind the swipeHandler callback function to the swipe event on div.box
	// $( "img.flyer" ).unbind( "swipe", { sort: "image"}, swipeHandler );
	// $( "img.flyer" ).bind( "swipe", { sort: "bookmark"}, swipeHandler );
	// $("#rightbutton").toggleClass("ui-btn-active");
	// $( "img.flyer" ).trigger("swipe");
	$user = Parse.User.current();

	$(".flyer").hide();
	$(".bookmark").show();

		for(i =0 ; i < $user.get('bookmark').length; ++i){
			$(".bookmark").append('<img class = "favorites" src = "flyers/' + $user.get('bookmark')[i] +'" />');
		}

	
	

 }


function getHome(){
	// Bind the swipeHandler callback function to the swipe event on div.box
   // $( "img.flyer" ).unbind("swipe");
   $(".flyer").show();
   $(".bookmark").html('');
		$( "img.flyer" ).bind( "swipe", { sort: "image"}, swipeHandler );
		//$( "img.flyer" ).bind();
		flyer_index = 0;
		$( "img.flyer" ).trigger("swipe");
 }


function swipeHandler(event){
	console.log(flyer_index);
	
	//query for next flyer
	var flyers = Parse.Object.extend("flyers");
	var query = new Parse.Query(flyers);
	var flyer_link;
	query.equalTo('flyer_num', flyer_index);
	query.find({
	  success: function(results) {
	    //Success callback
    
      var object = results[0];
      flyer_link = object.get('hard_link');
     	$(event.target).attr("src", "flyers/" + flyer_link.substring(1, flyer_link.length-1));  

     	if ( object.get('freefood') == true ) {$("img.flyer").css({ "border": "5px solid green" });} 
     	else {$("img.flyer").css({ "border": "0px" });} 	      

	  },
	  error: function(error) {
	    console.log(error);
	  }
	});
   		   		
	if (event.data.sort == "image")
	{      
	    $("#rightbutton").removeClass("ui-btn-active");
		$("#leftbutton").removeClass("ui-btn-active");
 	}
//check if at last flyer
 	var query = new Parse.Query(flyers);
 	var numOfFlyers;
 	query.find({
	  success: function(results) {

	  	if (flyer_index < results.length)
	  	{
	  		flyer_index += 1;
	  	}
	  	else { $(event.target).attr("src", "flyers/end.jpg");}

	  	
	  },
	  error: function(error) {
	  //s	$(event.target).attr("src", "flyers/end.jpg");
	  	console.log(error);

	  }
	});

		

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


  	$flyerSlug = $('img.flyer').attr("src").substring(7);
  	$user = Parse.User.current();

	$user.add('bookmark', $flyerSlug);





  window.setTimeout(nextFlyer, 500);


});

