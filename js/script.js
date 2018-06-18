(function() {
  var controlArrows = document.getElementsByClassName('fp-controlArrow');

  // Page piling script
    $(document).ready(function() {
      $('#fullpage').fullpage({
        verticalCentered: true,
        anchors: ['firstPage', 'secondPage', '3rdPage', 'fourthPage', 'fifthPage'],
        sectionsColor: ['white', '#D66761', '#D66761', 'white', '#D66761'],
        bgSize: ['cover', 'cover', 'cover', 'cover', 'cover'],
        slidesNavigation: true,
      });

      $('#exploreBtn').click(function(e){
        e.preventDefault();
        $.fn.fullpage.setScrollingSpeed(1000);
        $.fn.fullpage.moveSectionDown();
      });

      $('#viewResultsBtn').click(function(e){
        e.preventDefault();
        $.fn.fullpage.setScrollingSpeed(1000);
        $.fn.fullpage.moveSectionDown();
      });

      // Date picker
      $( function(){
        $( "#datepicker" ).datepicker();
      });

      $("form").submit(function() {
         return false;
      });

    }); // DOCUMENT READY ENDS

var getMeals = document.getElementById('mealOption');
    // FORM VALIDATION
    window.addEventListener('load',
    function formValidation() {

      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }


          console.dir(getMeals);


          form.classList.add('was-validated');
        }, false);
      });
    }, false);



    // if (getMeals.validity.valueMissing === false) {
    //   $('#submitBtn').click(function(e){
    //     e.preventDefault();
    //     $.fn.fullpage.setScrollingSpeed(1000);
    //     $.fn.fullpage.moveSectionDown();
    //     $.fn.fullpage.setAllowScrolling(false);
    //   });
    // }




    // SETTING UP MAP ---------------------------------------------------------------
      mapboxgl.accessToken = 'pk.eyJ1Ijoic3VtaXRyYW0iLCJhIjoiY2ppM240OTk2MDBhbTNxbzQyeXQ3NjcxNCJ9.AI-7xSWsKG5uHfGk9jFJkA';
      var map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/sumitram/cji3p2cwm0s6r2smz01nlidgc', // stylesheet location
        center: [174.763222, -36.854191], // starting position [lng, lat]
        zoom: 13 // starting zoom
      });


}()); // IIFE ENDS
