$("#leftbutton").attr('data-theme', "e");
$("#rightbutton").attr('data-theme', "e");



//$( "img.flyer" ).attr('src', Parse.flyers.get('hard_link').where


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

	//add flyer to array of bookmarks
	//check if unique before adding to array with indexOf()
 // if (Parse.User.current().get(event.data.sort).indexOf($('img.flyer').attr("src").substring(7)) == -1)
  //{


    Parse.User.current().add("bookmark", $('img.flyer').attr("src").substring(7));
    
	Parse.User.current().save();
//}


  window.setTimeout(nextFlyer, 500);


});






// File upload 

$('#imageFile').bind("change", function(e) {

var files = e.target.files || e.dataTransfer.files;
file = files[0];
uploadFile(file);
});

function uploadFile(file) {

var serverUrl = 'https://api.parse.com/1/files/' + file.name;

$.ajax({
    type: "POST",
    beforeSend: function(request) {
      request.setRequestHeader("X-Parse-Application-Id", 'sH4OGJXJIgXqfnuAuLWFNWYvfhN7pNQjDmkpWaSw');
      request.setRequestHeader("X-Parse-REST-API-Key", 'DKj5TwAPMRqpiGHSDbWavpEYQebFnr4GnNBnnI1Y');
      request.setRequestHeader("Content-Type", file.type);
    },
    url: serverUrl,
    data: file,
    processData: false,
    contentType: false,
    success: function(data) {
        //alert("File available at: " + data.url);
        saveUserPhotoToDatabase(data.url);
    },
    error: function(data) {
      var obj = jQuery.parseJSON(data);
      alert(obj.error);
    }
});
} function saveUserPhotoToDatabase(image_url) {

var serverUrl = 'https://api.parse.com/1/classes/Uploads';

// save the user=some_user_name GET parameter with the url to the image
var queryDict = {};
location.search.substr(1).split("&").forEach(function(item) {queryDict[item.split("=")[0]] = item.split("=")[1]});

$.ajax({
type: "POST",
beforeSend: function(request) {
  request.setRequestHeader("X-Parse-Application-Id", 'sH4OGJXJIgXqfnuAuLWFNWYvfhN7pNQjDmkpWaSw');
  request.setRequestHeader("X-Parse-REST-API-Key", 'DKj5TwAPMRqpiGHSDbWavpEYQebFnr4GnNBnnI1Y');
  request.setRequestHeader("Content-Type", "application/json");
},
url: serverUrl,
data: JSON.stringify({
    user:queryDict.user,
    imageUrl:image_url
}),
processData: false,
contentType: false,
success: function(data) {
    alert("Upload OK!");
},
error: function(data) {
  var obj = jQuery.parseJSON(data);
  alert(obj.error);
}
});

