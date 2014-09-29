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
          alert("User signed up and logged in through Facebook!");

        } else {
           window.fbAsyncInit.fbLoaded.resolve();
          alert("User logged in through Facebook!");

        }


      },
      error: function(user, error) {
        alert("User cancelled the Facebook login or did not fully authorize.");
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
    

    Parse.User.current().save({image: ["nudm.jpg", "bbq.jpg", "block.jpg"]});
   
    var flyer_index = 1;


     // Bind the swipeHandler callback function to the swipe event on div.box
  $( "img.flyer" ).on( "swipe", swipeHandler );
 
  // Callback function references the event target and adds the 'swipe' class to it

     function swipeHandler( event ){



     $(event.target).attr("src", "flyers/" + Parse.User.current().get("image")[flyer_index]);

      flyer_index += 1;
  }

}); 
