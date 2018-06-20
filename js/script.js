(function() {
  var controlArrows = document.getElementsByClassName('fp-controlArrow');

  // Getting the users options from the SECOND section
  var getGuests = document.getElementById('getGuests');

  var getCheckInDate = document.getElementById('getCheckIn');
  var getCheckOutDate = document.getElementById('getCheckOut');
  var daysText = document.getElementById('daysText');

  var getMeals = document.getElementById('getMealOption');

  var errorMessage = document.createElement('div');
  var getSubBtn = document.getElementById('submitBtn');

  // The button which pushes the details entered into an array
  var browseBtn = document.getElementById('browseBtn');

  // Getting the results elements from the FIFTH section
  var finalGuest = document.getElementById('guestsCount');
  var finalMealsOption = document.getElementById('mealsOption');
  var finalNights = document.getElementById('nightCount');
  var totalCost = document.getElementById('totalCost');

  var refNum = document.getElementById('refNum');


  $(window).load(function(){
    $('.loader').fadeOut();
  });


  $(document).ready(function() {

    // Page piling script
    $('#fullpage').fullpage({
      verticalCentered: true,
      anchors: ['firstPage', 'secondPage', '3rdPage', 'fourthPage', 'fifthPage'],
      sectionsColor: ['white', '#D66761', '#D66761', 'transparent', '#D66761'],
      bgSize: ['cover', 'cover', 'cover', 'cover', 'cover'],
      slidesNavigation: true,
    });


    // Splash screen button
    $('#exploreBtn').click(function(e){
      e.preventDefault();
      $.fn.fullpage.setScrollingSpeed(1000);
      $.fn.fullpage.moveSectionDown();
    });


// -----------------------------------------------------------------------------


    // getSubBtn.addEventListener('click', turnStringToNumber, false);
    //
    // // Guest Input turning string into number
    // function turnStringToNumber () {
    //
    // }

// -----------------------------------------------------------------------------

    // Date picker plugin

      $('.datepicker1').pickadate({
        clear: '',
        min: new Date()
      });


      $('.datepicker2').pickadate({
        clear: '',
        min: new Date(),
        onClose: function() {
          // Calculate how many days in between the chosen dates
          var startDate = Date.parse(getCheckIn.value);
          var endDate = Date.parse(getCheckOut.value);
          var timeDiff = endDate - startDate;
          daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

          // Push the date to view on the slide
          daysSelected.innerText = daysDiff;
          daysText.innerText = ' Days';

          console.dir(daysSelected);
        }
      });


// -----------------------------------------------------------------------------


    // Form doesn't refresh the page
    $("form").submit(function() {
       return false;
    });

    // Auto scroll on click the View Results button
    $('#viewResultsBtn').click(function(e){
      e.preventDefault();
      $.fn.fullpage.setScrollingSpeed(1000);
      $.fn.fullpage.moveSectionDown();
      $.fn.fullpage.setAllowScrolling(false);
    });


    // Auto scroll on click the Browse Accomodation button
    $('#browseBtn').click(function(e){
      e.preventDefault();
      $.fn.fullpage.setScrollingSpeed(1000);
      $.fn.fullpage.moveSectionDown();
      $.fn.fullpage.setAllowScrolling(false);
    });


//----------------------------------------------------------------------------


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

          // Show an error message which is created here along with fadeOut and removes from code.
          errorMessage.className = 'errorMessage';
          errorMessage.innerText = "Hold up! Look like something's missing. Please check to see if you've entered your details correctly.";
          getSubBtn.after(errorMessage);

          $('.errorMessage').fadeOut(6000, function(){
            $('.errorMessage').remove();
          });

        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);

// -----------------------------------------------------------------------------


// Scroll section down on click when validation is complete

    getSubBtn.addEventListener('click', scrollDown , false);

    function scrollDown() {
      console.dir(getCheckInDate);
      if (getGuests.validity.valueMissing === false && getCheckInDate.validity.valueMissing === false && getCheckOutDate.validity.valueMissing === false && getMeals.validity.valueMissing === false ) {

        $.fn.fullpage.setScrollingSpeed(1000);
        $.fn.fullpage.moveSectionDown();
        $.fn.fullpage.setAllowScrolling(false);
      }

      // Turn guests input from string to number
      var guestsStringToNum = parseInt(getGuests.value);
      var mealStringToNum = parseInt(getMealOptions.value);
      console.log(typeof guestsStringToNum);
    }


// SETTING UP MAP ---------------------------------------------------------------

var token = 'pk.eyJ1Ijoic3VtaXRyYW0iLCJhIjoiY2ppbDA5ajh5MmpuMTNwb250MXR0ZWI1ayJ9.4K0zZ6PO_bnYu76JJUOmoQ';

  mapboxgl.accessToken = 'pk.eyJ1Ijoic3VtaXRyYW0iLCJhIjoiY2ppbDA5ajh5MmpuMTNwb250MXR0ZWI1ayJ9.4K0zZ6PO_bnYu76JJUOmoQ';

  var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/sumitram/cji3p2cwm0s6r2smz01nlidgc', // stylesheet location
    center: [174.763222, -36.854191], // starting position [lng, lat]
    zoom: 13 // starting zoom
  });

  var geojson = {
      "type": "FeatureCollection",
      "features": [

        // HOUSE -------------------------
          {
              "type": "Feature",
              "properties": {
                  "message": "Foo",
                  "iconSize": [60, 60]
              },
              "geometry": {
                  "type": "Point",
                  "coordinates": [
                      -66.324462890625,
                      -16.024695711685304
                  ]
              }
          },

          // HOTEL -------------------------
          {
              "type": "Feature",
              "properties": {
                  "message": "Bar",
                  "iconSize": [50, 50]
              },
              "geometry": {
                  "type": "Point",
                  "coordinates": [
                      -61.2158203125,
                      -15.97189158092897
                  ]
              }
          },

          // MOTEL -------------------------

          {
              "type": "Feature",
              "properties": {
                  "message": "Baz",
                  "iconSize": [40, 40]
                  // "marker-color": 'pink'
              },
              "geometry": {
                  "type": "Point",
                  "coordinates": [
                      -63.29223632812499,
                      -18.28151823530889
                  ]
              }
          },

          // HOSTEL -------------------------
          {
              "type": "Feature",
              "properties": {
                  "message": "Bar",
                  "iconSize": [50, 50]
              },
              "geometry": {
                  "type": "Point",
                  "coordinates": [
                      -174.771945,
                      -36.835333
                  ]
              }
          }
      ]
  };

  // add markers to map
  geojson.features.forEach(function(marker) {
    // create a DOM element for the marker
    var el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = 'url(https://placekitten.com/g/' + marker.properties.iconSize.join('/') + '/)';
    el.style.width = marker.properties.iconSize[0] + 'px';
    el.style.height = marker.properties.iconSize[1] + 'px';

    el.addEventListener('click', function() {
      window.alert(marker.properties.message);
    });

    // add marker to map
    new mapboxgl.Marker(el)
    .setLngLat(marker.geometry.coordinates)
    .addTo(map);
  });

// -----------------------------------------------------------------------------

  // Reference number on summary

  function createRefNum() {
    var randomNum = Math.floor((Math.random() * 1000000) + 1);
    refNum.innerText = '#' + randomNum;
  }

  createRefNum();
  }); // DOCUMENT READY ENDS
}()); // IIFE ENDS
