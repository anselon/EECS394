

		var flyer_index = 1;


		function getBookmarked(){
			// Bind the swipeHandler callback function to the swipe event on div.box
  			$( "img.flyer" ).on( "swipe", { sort: "bookmark"}, swipeHandler );
  			$("#rightbutton").toggleClass("ui-btn-active");
  			flyer_index = 1;
  			$( "img.flyer" ).trigger("swipe");

	     }


		function getHome(){
			// Bind the swipeHandler callback function to the swipe event on div.box
  			$( "img.flyer" ).on( "swipe", { sort: "image"}, swipeHandler );
  			flyer_index = 1;
  			$( "img.flyer" ).trigger("swipe");

	     }




     function swipeHandler(event){

     console.log("index: "+ flyer_index);	
     $(event.target).attr("src", "flyers/" + Parse.User.current().get(event.data.sort)[flyer_index]);

     if (event.data.sort == "image")
     {      
     	    $("#rightbutton").removeClass("ui-btn-active");
     		$("#leftbutton").removeClass("ui-btn-active");
 	 }

     //get length and check if at end of array
     if (flyer_index < Parse.User.current().get(event.data.sort).length - 1)
      {flyer_index += 1;}

     else {flyer_index += 1;}

     

  }



	//go to next flyer
	//calls swipeHandler
	function nextFlyer(){
	  
	  $( "img.flyer" ).trigger("swipe");
	  $("#rightbutton").removeClass("ui-btn-active");
	  $("#leftbutton").removeClass("ui-btn-active");

 
     }



