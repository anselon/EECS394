  Parse.initialize("sH4OGJXJIgXqfnuAuLWFNWYvfhN7pNQjDmkpWaSw", "RwtmRovMtfB67Oq9PV7Y9mbEb7nZgnQFShFB38w8");

   window.fbAsyncInit = function() {

    Parse.FacebookUtils.init({ // this line replaces FB.init({
      appId      : '297520597109030', // Facebook App ID
      cookie     : true, // enable cookies to allow Parse to access the session
      xfbml      : true,
      version    : 'v2.1'
    });


    


    Parse.FacebookUtils.logIn( null , {
      success: function(user) {
        if (!user.existed()) {
           window.fbAsyncInit.fbLoaded.resolve();
          alert("Welcome! You have successfully logged in with Facebook!");
          console.log("User signed up and logged in through Facebook!");

        } else {
           window.fbAsyncInit.fbLoaded.resolve();
         alert("Welcome! You have successfully logged in with Facebook!");
          console.log("User logged in through Facebook!");

        }


      },
      error: function(user, error) {
        alert("Please refresh the page and login through Facebook.");
        console.log("User cancelled the Facebook login or did not fully authorize.")
      }
    });




   /* if (!Parse.FacebookUtils.isLinked(user)) {
      Parse.FacebookUtils.link(user, null, {
        success: function(user) {
          alert("Woohoo, user logged in with Facebook!");
        },
        error: function(user, error) {
          alert("User cancelled the Facebook login or did not fully authorize.");
        }
      });
    }
*/
   

  };
 

  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = js.src = "//connect.facebook.net/en_US/sdk.js";
   //"//connect.facebook.net/en_US/sdk/debug.js";
    fjs.parentNode.insertBefore(js, fjs);

  }(document, 'script', 'facebook-jssdk'));


 



 
window.fbAsyncInit.fbLoaded = $.Deferred();



window.fbAsyncInit.fbLoaded.done(function(){
    

    Parse.User.current().save({image: ["nudm.jpg", "bbq.jpg", "block.jpg", "vertigo.jpg", "flyer1.jpg" , "flyer2.jpg" , "flyer3.jpg"
      , "flyer4.jpg" , "flyer5.jpg", "flyer6.jpg" , "flyer7.jpg" , "flyer8.jpg" , "flyer9.jpg", , "flyer10.jpg" , "flyer11.jpg" , "flyer12.jpg"]});
   



  // Bind the swipeHandler callback function to the swipe event on div.box
  $( "img.flyer" ).bind( "swipe", { sort: "image"}, swipeHandler);
 
  // Callback function references the event target and adds the 'swipe' class to it
  



}); 
