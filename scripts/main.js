Parse.initialize("sH4OGJXJIgXqfnuAuLWFNWYvfhN7pNQjDmkpWaSw", "RwtmRovMtfB67Oq9PV7Y9mbEb7nZgnQFShFB38w8");


$("#leftbutton").attr('data-theme', "e");
$("#rightbutton").attr('data-theme', "e");




var flyer_index = 0;
getInstruction();

function getInstruction(){
	

	if (localStorage.getItem('seenInstr') == null) {
		$("body").append("<img id='instruction' src='./instruction.png' width='100%' style='position: fixed; z-index:21'/>");
		$("body").append("<div class='overlay'></div> ")
		$("#instruction").on('click',function(event){
			this.remove();
			$(".overlay").remove();

		});
		localStorage.setItem('seenInstr','true');		

	}

	
}
 


//add flyer_index as event data
function getBookmarked(){
	// Bind the swipeHandler callback function to the swipe event on div.box

	

	$(".flyer").hide();//http://localhost:8888/flyers/flyer7.jpg
	$(".bookmark").show();

	var bookmarks = JSON.parse(localStorage.getItem('bookmark_flyers'));

	if (bookmarks != null){
	if(bookmarks.length > 0){
		for(i =0 ; i < bookmarks.length; ++i){
			$(".bookmark").append('<img class = "favorites" src = "flyers/' + bookmarks[i] +'" />');
		}
	}

	}
	//hide bookmark button
	$('#rightbutton').hide();
	

 }
	


function getHome(){
	// Bind the swipeHandler callback function to the swipe event on div.box

   $(".flyer").show();
   $(".bookmark").html('');
   //show bookmark button
   $('#rightbutton').show();

		
		

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

 });

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

} );





//go to next flyer
//calls swipeHandler
function nextFlyer(){
	$( "img.flyer" ).trigger("swipeleft");
}
	




Array.prototype.removeValue = function(name, value){
      var array = $.map(this, function(v,i){
        return v[name] === value ? null : v;
   });
   this.length = 0; //clear original array
   this.push.apply(this, array); //push all elements except the one we want to delete
}
	
function unhighlight(){

	$("#rightbutton").removeClass("ui-btn-active");
}

var flag = true;


$("#rightbutton").click(function(){
	console.log('click on button');

	//highlight button then unhighlight to signal bookmark
	$("#rightbutton").addClass("ui-btn-active");
	window.setTimeout(unhighlight, 500);

	if(flag){
		//$("#rightbutton").addClass("ui-btn-active");
		flyerSlug = $('img.flyer').attr("src").substring(7);


	if( (localStorage.getItem('bookmark_flyers')) == null){
				
				
				var bookmark = new Array();
				bookmark.push(flyerSlug);
				localStorage.setItem('bookmark_flyers',JSON.stringify(bookmark));
				console.log("if"+bookmark);

			}
		
		else
			{
				var bookmark = JSON.parse(localStorage.getItem('bookmark_flyers'));
				bookmark.push(flyerSlug);
				localStorage.setItem('bookmark_flyers',JSON.stringify(bookmark));
				console.log("else"+bookmark);
			}
		flag = false;
		//window.setTimeout(nextFlyer, 500);

	}
	else
	{
		//$("#rightbutton").addClass("ui-btn-active");
		flyerSlug = $('img.flyer').attr("src").substring(7);   //c
		var bookmark = JSON.parse(localStorage.getItem('bookmark_flyers'));
		bookmark.removeValue('bookmark_flyers',flyerSlug);
		console.log(bookmark);
		

		flag = true;
	}
	//window.setTimeout(nextFlyer, 500);

});




// Upload function stuff
$(document).ready(function(){
	console.log('read');
	$(".upload").hide();
	$("#upload").click(function(){
		$(".upload").show();
		console.log("hi");
	})
	$("#goback").click(function(){
		$(".upload").hide();
	})

});

