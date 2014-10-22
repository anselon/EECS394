

  Parse.initialize("sH4OGJXJIgXqfnuAuLWFNWYvfhN7pNQjDmkpWaSw", "RwtmRovMtfB67Oq9PV7Y9mbEb7nZgnQFShFB38w8");
  $(function() {
    var file;

    // Set an event listener on the Choose File field.
    $('#fileselect').bind("change", function(e) {
      var files = e.target.files || e.dataTransfer.files;
      // Our file var now holds the selected file
      file = files[0];
    });

    // This function is called when the user clicks on Upload to Parse. It will create the REST API request to upload this image to Parse.
    $('#uploadbutton').click(function() {
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
          alert("File available at: " + data.url);

          var newFlyer = Parse.Object.extend("flyers");
          var flyernew = new newFlyer();
          flyernew.set("hard_link", data.url);
          // var d = $('#datepicker').datepicker('getDate');
          // var d2 = $('#datepicker2').datepicker('getDate');
          if ($('#myCheck').is(':checked')) {
            var check = true;
          } else {
            var check = false;
          } 
          /*
          var query = new Parse.Query('flyers');
query.count({
  success: function(number) {
    alert:('count success');
    flyernew.set("flyer_num", number);
    // There are number instances of MyClass.
  },

  error: function(error) {
    // error is an instance of Parse.Error.
  }
}); */
          flyernew.set("start", d);
          flyernew.set("end", d2);
          flyernew.set("freefood", check);
          flyernew.save(null, {
            success: function(flyernew) {alert('success')},
            error: function(flyernew, error) {alert('fail')}});





        },
        error: function(data) {
          var obj = jQuery.parseJSON(data);
          alert(obj.error);
        }
      });
    });


  });