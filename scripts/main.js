     function swipeHandler( event ){



     $(event.target).attr("src", "flyers/" + Parse.User.current().get("image")[flyer_index]);
     $("#rightbutton").toggleClass("ui-btn-active");
     flyer_index += 1;
  }



