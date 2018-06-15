(function() {
  var controlArrows = document.getElementsByClassName('fp-controlArrow');

  // Page piling script
    $(document).ready(function() {
      $('#fullpage').fullpage({
        verticalCentered: true,
        anchors: ['firstPage', 'secondPage', '3rdPage', 'fourthPage'],
        sectionsColor: ['white', '#D66761', 'white', '#D66761'],
        bgSize: ['cover', 'cover', 'cover'],
        slidesNavigation: true,
      });

      $('#exploreBtn').click(function(e){
        e.preventDefault();
        $.fn.fullpage.setScrollingSpeed(1000);
        $.fn.fullpage.moveSectionDown();
        // $.fn.fullpage.setAllowScrolling(false);
      });

      $('#submitBtn').click(function(e){
        e.preventDefault();
        $.fn.fullpage.setScrollingSpeed(1000);
        $.fn.fullpage.moveSectionDown();
        $.fn.fullpage.setAllowScrolling(false);
      });

      $('#viewResultsBtn').click(function(e){
        e.preventDefault();
        $.fn.fullpage.setScrollingSpeed(1000);
        $.fn.fullpage.moveSectionDown();
      });


      $( function(){
        $( "#datepicker" ).datepicker();
      });

    }); // DOCUMENT READY ENDS

    // SETTING UP MAP ---------------------------------------------------------------
        mapboxgl.accessToken = 'pk.eyJ1Ijoic3VtaXRyYW0iLCJhIjoiY2ppM240OTk2MDBhbTNxbzQyeXQ3NjcxNCJ9.AI-7xSWsKG5uHfGk9jFJkA';
        var map = new mapboxgl.Map({
          container: 'map', // container id
          style: 'mapbox://styles/sumitram/cji3p2cwm0s6r2smz01nlidgc', // stylesheet location
          center: [174.763222, -36.854191], // starting position [lng, lat]
          zoom: 13 // starting zoom
        });

// //FORM VALIDATOR
//     (function() {
//       'use strict';
//       window.addEventListener('load', function() {
//         // Fetch all the forms we want to apply custom Bootstrap validation styles to
//         var forms = document.getElementsByClassName('needs-validation');
//         // Loop over them and prevent submission
//         var validation = Array.prototype.filter.call(forms, function(form) {
//           form.addEventListener('submit', function(event) {
//             if (form.checkValidity() === false) {
//               event.preventDefault();
//               event.stopPropagation();
//             }
//             form.classList.add('was-validated');
//           }, false);
//         });
//       }, false);
//     })();

}()); // IIFE ENDS
