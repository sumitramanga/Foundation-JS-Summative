(function() { //IIFE Begins

  // Grabbing data from data.js ------------------------------------------------
  var hostelMinGuests = accom.hostel.guestsMin;
  var hostelMaxGuests = accom.hostel.guestsMax;
  var hostelMaxNights = accom.hostel.nightsMax;
  var hostelMinNights = accom.hostel.nightsMin;

  var hotelMinGuests = accom.hotel.guestsMin;
  var hotelMaxGuests = accom.hotel.guestsMax;
  var hotelMinNights = accom.hotel.nightsMin;
  var hotelMaxNights = accom.hotel.nightsMax;

  var motelMinGuests = accom.motel.guestsMin;
  var motelMaxGuests = accom.motel.guestsMax;
  var motelMinNights = accom.motel.nightsMin;
  var motelMaxNights = accom.motel.nightsMax;

  var houseMinGuests = accom.house.guestsMin;
  var houseMaxGuests = accom.house.guestsMax;
  var houseMinNights = accom.house.nightsMin;
  var houseMaxNights = accom.house.nightsMax;


  // Next and previous button for the slides -----------------------------------
  var previousBtn = document.getElementsByClassName('fp-previous');
  var nextBtn = document.getElementsByClassName('fp-next');


  // Getting the users options from the SECOND section -------------------------
  var getGuests = document.getElementById('getGuests');

  var getCheckInDate = document.getElementById('getCheckIn');
  var getCheckOutDate = document.getElementById('getCheckOut');
  var nightsSelected = document.getElementById('nightsSelected');
  var nightsText = document.getElementById('nightsText');

  var getMeals = document.getElementById('getMealOption');

  var getSubBtn = document.getElementById('submitBtn');


  // The button which pushes the details entered into an array located on the
  // 'All Set!' page -----------------------------------------------------------
  var browseBtn = document.getElementById('browseBtn');


  // Map section ---------------------------------------------------------------
  var closeAccomBtn = document.getElementById('accomClose');
  var mapModalTitle = document.getElementById('modalTitle');
  var mapModalCost = document.getElementById('modalAccomCost');
  var mapModalImg = document.getElementById('modalImg');
  var mapModalDetails = document.getElementById('modalAccomDetails');
  var bookRoomBtn = document.getElementById('bookRoomBtn');


  // Getting the results elements from the FIFTH section -----------------------
  var accomName = document.getElementById('accomName');
  var accomCost = document.getElementById('accomCost');

  var accomImg = document.getElementById('accomImg');

  var finalGuests = document.getElementById('guestsCount');
  var finalMealsOption = document.getElementById('mealsOption');
  var finalNights = document.getElementById('nightsCount');

  var totalCost = document.getElementById('totalCost');

  var refNum = document.getElementById('refNum');

  var userResults = [];
  var accomChoice = [];


// var firstValid = false;
// var secondValid = false;
// var thirdValid = false;
// var currentSlide = 'slide1';
//
// $('#getGuests').change(function(){
//   console.log('value has changed');
//   console.log($(this).val());
//   firstValid = true;
//   //show arrow
// });
// //
// // if(select guest = true){
// //   show arrow
// //   firstValid = true
// // }
// //
// // click arrow
// // hide arrow


// -----------------------------------------------------------------------------


  // LOADING ICON
  $(window).load(function(){
    $('.loader').fadeOut();
  });


// -----------------------------------------------------------------------------


  $(document).ready(function() {

    // PAGE PILING PLUGIN
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


    // DATE PICKER PLUGIN

    // $('.datepicker1').pickadate({
    //   clear: '',
    //   min: new Date()
    // });
    //
    // $('.datepicker2').pickadate({
    //   clear: '',
    //   min: new Date(),
    //   onClose: function () {
    //     calculateNights();
    //   }
    // });

    $('.datepicker1').pickadate({
      clear: '',
      min: new Date(),
    });

    $('.datepicker1').change(function(){

      var firstDate = $('#getCheckIn').val();

      //Enable the second date picker with the min date of the check in date
      $('.datepicker2').pickadate({
        clear: '',
        min: new Date(firstDate),
        onClose: function () {
          calculateNights();
        }
      });

    });


// -----------------------------------------------------------------------------


    function calculateNights () {

      // Calculate how many nights in between the chosen dates
      var startDate = Date.parse(getCheckIn.value);
      var endDate = Date.parse(getCheckOut.value);
      var timeDiff = endDate - startDate;
      daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

      // Push the date to view on the slide
      nightsSelected.innerText = daysDiff;
      dateErrorMsg();

    }


//------------------------------------------------------------------------------


    // Form Validation
    window.addEventListener('load',
    function formValidation() {

      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false || nightsSelected.textContent > 15 || nightsSelected.textContent < 1) {
            event.preventDefault();
            event.stopPropagation();

            // Show an error message which is created here along with fadeOut and removes from code.
            var errorMessage = document.createElement('p');
            errorMessage.className = 'errorMessage';
            errorMessage.innerText = 'Hold up! Look like something\'s missing. Please check to see if you\'ve entered your details correctly.';
            getSubBtn.after(errorMessage);

            $('.errorMessage').fadeOut(6000, function(){
              $('.errorMessage').remove();
            });
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);

    // Form doesn't refresh the page
    $('form').submit(function() {
       return false;
    });


// -----------------------------------------------------------------------------


    function dateErrorMsg() {

      // String to number to compare amount of guests with the amount of nights
      var compareGuests = parseInt(getGuests.value);

      // Add a message when too less or too many nights have been selected
      if (nightsSelected.textContent > 15 || nightsSelected.textContent < 1) {

        var nightsErrorMsg = document.createElement('p');
        getCheckInDate.style.border = '1px solid #DC1C0C';
        getCheckOutDate.style.border = '1px solid #DC1C0C';
        nightsErrorMsg.className = 'nightsErrorMsg';
        nightsErrorMsg.style.margin = '1em';
        nightsErrorMsg.textContent = 'You have selected an incorrect amount of nights. Please try again.';
        nightsText.after(nightsErrorMsg);

      // Remove message and uncolor the inputs when the task the nights are correct
      } else {
        $('.nightsErrorMsg').remove();
        getCheckInDate.style.borderColor = '';
        getCheckOutDate.style.borderColor = '';
      }


      // Add a message when nights and guests don't match data
      if (compareGuests === 5 && nightsSelected.textContent > 10) {
        var fiveGuestsMatchError = document.createElement('p');
        getCheckInDate.style.border = '1px solid #DC1C0C';
        getCheckOutDate.style.border = '1px solid #DC1C0C';
        fiveGuestsMatchError.className = 'fiveGuestsMatchError';
        fiveGuestsMatchError.style.margin = '0.5em';
        fiveGuestsMatchError.textContent = 'This amount of nights is invalid with 5 guests. Please try again.';
        nightsText.after(fiveGuestsMatchError);

      } else if (compareGuests === 6 && nightsSelected.textContent >= 10){
        var sixGuestsMatchError = document.createElement('p');
        getCheckInDate.style.border = '1px solid #DC1C0C';
        getCheckOutDate.style.border = '1px solid #DC1C0C';
        sixGuestsMatchError.className = 'sixGuestsMatchError';
        sixGuestsMatchError.style.margin = '0.5em';
        sixGuestsMatchError.textContent = 'This amount of nights is invalid with 6 guests. Please try again.';
        nightsText.after(sixGuestsMatchError);

      // Remove validation message when correct
      } else {
        $('.fiveGuestsMatchError').remove();
        $('.sixGuestsMatchError').remove();
        getCheckInDate.style.borderColor = '';
        getCheckOutDate.style.borderColor = '';
      }

    } // dateErrorMsg Function ends


// -----------------------------------------------------------------------------


    // Scroll section down on click when validation is complete

    getSubBtn.addEventListener('click', scrollDown , false);

    function scrollDown() {

      // If there is a value in the inputs the page and the nights staying is 1-15
      // the page will auto scroll
      if (getGuests.validity.valueMissing === false && getMeals.validity.valueMissing === false && nightsSelected.textContent >= 1 && nightsSelected.textContent <= 15) {
        $.fn.fullpage.setScrollingSpeed(1000);
        $.fn.fullpage.moveSectionDown();
        $.fn.fullpage.setAllowScrolling(false);
      }

    }


// -----------------------------------------------------------------------------

    // SUCCESS PAGE

    // Auto scroll on click the Browse Accomodation button
    $('#browseBtn').click(function(e){
      e.preventDefault();
      $.fn.fullpage.setScrollingSpeed(1000);
      $.fn.fullpage.moveSectionDown();
      $.fn.fullpage.setAllowScrolling(false);
      pushResults();
    });

    // Pushing all results/details to an array
    function pushResults() {

      // Turn meal cost input from string to number
      var mealStringToNum = parseInt(getMeals.value);
      var guestsStringToNum = parseInt(getGuests.value);
      userResults.push({guests: guestsStringToNum, nights: daysDiff, mealName: getMealOption.selectedOptions['0'].textContent, mealCost: mealStringToNum});

    }


// -----------------------------------------------------------------------------

    // SETTING UP MAP

    mapboxgl.accessToken = 'pk.eyJ1Ijoic3VtaXRyYW0iLCJhIjoiY2ppbDA5ajh5MmpuMTNwb250MXR0ZWI1ayJ9.4K0zZ6PO_bnYu76JJUOmoQ';

    var map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/sumitram/cji3p2cwm0s6r2smz01nlidgc', // stylesheet location
      center: [174.780934, -36.883059], // starting position [lng, lat]
      zoom: 10.7 // starting zoom
    });


// -------------------------------- ATTRACTIONS --------------------------------

    map.on('load', function() {
    // Add a layer showing the places.
    map.addLayer({
      'id': 'places',
      'type': 'symbol',
      'source': {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': [


// Te Henga Walkway. Bethells Beach to Muriwai ---------------------------------

            {
              'type': 'Feature',
              'properties': {
                'description': '<strong>Te Henga Walkway</strong>',
                'icon': 'park'
              },

              'geometry': {
                'type': 'Point',
                'coordinates': [174.452166, -36.883217]
              }
            },


// Point to point Walk -----------------------------------------------------------------
            {
              'type': 'Feature',
              'properties': {
                'description': '<strong>Point England Walks</strong>',
                'icon': 'park'
              },

              'geometry': {
                'type': 'Point',
                'coordinates': [174.871534, -36.882470]
              }
            },


// Albert Park -----------------------------------------------------------------
            {
              'type': 'Feature',
              'properties': {
                'description': '<strong>Albert Park</strong>',
                'icon': 'park'
              },

              'geometry': {
                'type': 'Point',
                'coordinates': [174.767883, -36.850609]
              }
            },


// Auckland War Memorial Museum ------------------------------------------------
            {
              'type': 'Feature',
              'properties': {
                'description': '<strong>Auckland War Memorial Museum</strong>',
                'icon': 'museum'
              },
              'geometry': {
                'type': 'Point',
                'coordinates': [174.777791, -36.860364]
              }
            },


// Sky Tower -------------------------------------------------------------------
            {
              'type': 'Feature',
              'properties': {
                'description': '<strong>Sky Tower</strong>',
                'icon': 'star'
              },

              'geometry': {
                'type': 'Point',
                'coordinates': [174.762191, -36.848414]
              }
            },


// Queens Street ---------------------------------------------------------------
            {
              'type': 'Feature',
              'properties': {
                'description': '<strong>Queens Street</strong>',
                'icon': 'star'
              },
              'geometry': {
                'type': 'Point',
                'coordinates': [174.764615, -36.850473]
                }
            },


// Coley & Punch ---------------------------------------------------------------
            {
              'type': 'Feature',
              'properties': {
                'description': '<strong>Coley & Punch</strong>',
                'icon': 'alcohol-shop'
              },
              'geometry': {
                'type': 'Point',
                'coordinates': [174.764730, -36.841020]
                }
            },

// Kelly Tarlton's Sea Life Aquarium -------------------------------------------
            {
              'type': 'Feature',
              'properties': {
                'description': '<strong>Kelly Tarlton\'s Sea Life Aquarium</strong>',
                'icon': 'aquarium'
              },
              'geometry': {
                'type': 'Point',
                'coordinates': [174.817432, -36.846943]
                }
            },

// MT Roskill Summit -----------------------------------------------------------
            {
              'type': 'Feature',
              'properties': {
                'description': '<strong>MT Roskill Summit</strong>',
                'icon': 'park'
              },
              'geometry': {
                'type': 'Point',
                'coordinates': [174.737258, -36.912590]
                }
            },

// Alberton --------------------------------------------------------------------
            {
              'type': 'Feature',
              'properties': {
                'description': '<strong>Alberton</strong>',
                'icon': 'museum'
              },
              'geometry': {
                'type': 'Point',
                'coordinates': [174.724686, -36.889934]
                }
            },


// Stardome Observatory & Planetarium ------------------------------------------
            {
              'type': 'Feature',
              'properties': {
                'description': '<strong>Stardome Observatory & Planetarium</strong>',
                'icon': 'star-stroked',
              },

              'geometry': {
                'type': 'Point',
                'coordinates': [174.776985, -36.905937]
              }
            }

// -----------------------------------------------------------------------------

          ]
        }
      },

      'layout': {
        'icon-image': '{icon}-15',
        'icon-allow-overlap': true,
        'icon-size': 1
      }
    });


// -----------------------------------------------------------------------------


      // Create a popup, but don't add it to the map yet.
      var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      });

      map.on('mouseenter', 'places', function(e) {

        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.description;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
      });

      map.on('mouseleave', 'places', function() {
          map.getCanvas().style.cursor = '';
          popup.remove();
      });
    });


// --------------------------- ACCOMMODATION ----------------------------------


// Houses ----------------------------------------------------------------------
  var geojson = {
    'type': 'FeatureCollection',
    'features': [
      {
        'type': 'Feature',
        'properties': {
          'accomType': 'house',
          'theId': 'contemVilla',
          'title': 'Contemporary inner city villa by Fran & Aaron',
          'cost': '240',
          'description': 'Have the best Auckland stay at this beautiful city house hosted by trustworthy owners Francesca and Aaron.',
          'image': 'img/contemVilla.jpg',
          'iconSize': [40, 40]
        },

        'geometry': {
          'type': 'Point',
          'coordinates': [174.752126, -36.850371]
        }
      },

      {
        'type': 'Feature',
        'properties': {
          'accomType': 'house',
          'theId': 'howickHome',
          'title': 'Howick Luxury Large Home',
          'cost': '240',
          'description': 'Enjoy your stay at this lovely luxury home which includes free wifi and complimentory bath esstensials.',
          'image': 'img/howickHome.jpg',
          'iconSize': [40, 40]
        },

        'geometry': {
          'type': 'Point',
          'coordinates': [174.932126, -36.913246]
        }
      },



// // Hotels  ----------------------------------------------------------------------


        {
          'type': 'Feature',
          'properties': {
            'accomType': 'hotel',
            'theId': 'grandMillennium',
            'title': 'Grand Millennium Hotel',
            'cost': '157',
            'description': 'This city centre hotel will cater to your accommodation if you are wanting to stay within popular attractions and be catered a luxurious stay.',
            'image': 'img/grandMillennium.jpg',
            'iconSize': [40, 40]
          },

          'geometry': {
            'type': 'Point',
            'coordinates': [174.760582, -36.852772 ]
          }
        },


        {
          'type': 'Feature',
          'properties': {
            'accomType': 'hotel',
            'theId': 'bestWestern',
            'title': 'Best Western Ellerslie',
            'cost': '157',
            'description': 'This hotel offers WiFi Internet, outdoor heated pool, on site in-house car rental, restaurant and bar, and conference facilities. Perfect for business travellers',
            'image': 'img/bestWestern.jpg',
            'iconSize': [40, 40]
          },

          'geometry': {
            'type': 'Point',
            'coordinates': [174.814842, -36.900858]
          }
        },


// Motels  ----------------------------------------------------------------------


      {
        'type': 'Feature',
        'properties': {
          'accomType': 'motel',
          'theId': 'greenlaneManor',
          'title': 'Greenlane Manor Motels',
          'cost': '90',
          'description': 'Relax at Greenlane Manors with comfy beds, hot showers and big fluffy towels. Close by local cuisines and local attractions.',
          'image': 'img/greenlaneManor.jpg',
          'iconSize': [40, 40]
        },

        'geometry': {
          'type': 'Point',
          'coordinates': [174.801883, -36.897228]
        }
      },

      {
        'type': 'Feature',
        'properties': {
          'accomType': 'motel',
          'theId': 'airportMotel',
          'title': 'Airport Harbour View Motel',
          'cost': '90',
          'description': 'A 11 mintue walk from the beach and 8 minutes to the Auckland International airport. This 4-star rated motel is simply luxurious and affordable.',
          'image': 'img/airportMotel.jpg',
          'iconSize': [40, 40]
        },

        'geometry': {
          'type': 'Point',
          'coordinates': [174.784677, -36.931369]
        }
      },

// Hostels  ----------------------------------------------------------------------

      {
        'type': 'Feature',
        'properties': {
          'accomType': 'hostel',
          'theId': 'brownKiwi',
          'title': 'Brown Kiwi Travellers Hostel',
          'cost': '30',
          'description': 'This is about the Brown Kiwi Travellers Hostel. We invite you to join usin this wonderful culture.',
          'image': 'img/brownKiwiTravellers.jpg',
          'iconSize': [40, 40]
        },

        'geometry': {
          'type': 'Point',
          'coordinates': [174.742576, -36.847083]
        }
      },

      {
        'type': 'Feature',
        'properties': {
          'accomType': 'hostel',
          'theId': 'oaklandsLodge',
          'title': 'Oaklands Lodge Backpackers',
          'cost': '30',
          'description': 'This is about Oaklands Lodge Backpackers',
          'image': 'img/oaklandsLodge.jpg',
          'iconSize': [40, 40]
        },

        'geometry': {
          'type': 'Point',
          'coordinates': [174.763164, -36.880751]
        }
      }
    ] // Feature ends
  }; // geojson ends

  // Add markers to the map..
  geojson.features.forEach(function(marker) {

    // Create a DOM element for the marker
    var el = document.createElement('div');
    el.className = 'marker hideMarkers';
    el.id = marker.properties.theId;
    el.style.backgroundImage = 'url(\'img/pin.svg\')';
    el.style.backgroundSize = 'contain';
    el.style.width = marker.properties.iconSize[0] + 'px';
    el.style.height = marker.properties.iconSize[1] + 'px';

    // Adding modal attributes to make modals appear on click
    el.setAttribute('data-toggle', 'modal');
    el.setAttribute('data-target', '#accomModal');

    // Adding the content within the modal depending on what marker is selected
    el.addEventListener('click', function() {
      mapModalTitle.textContent = marker.properties.title;
      mapModalCost.textContent = marker.properties.cost;
      mapModalImg.style.backgroundImage = 'url(' + marker.properties.image + ')';
      mapModalDetails.textContent = marker.properties.description;
    });

    bookRoomBtn.addEventListener('click', function() {
      // Push details to an array when clicking on 'book now' button.
      accomChoice.push({name: mapModalTitle.textContent, cost: mapModalCost.textContent, image: mapModalImg.style.backgroundImage});
    });

    // Add marker to map
    new mapboxgl.Marker(el)
    .setLngLat(marker.geometry.coordinates)
    .addTo(map);
  });


  // -----------------------------------------------------------------------------


  // Filtering accommodation to match users inputted details

      browseBtn.addEventListener('click', filterMarkers , false);

      function filterMarkers() {

        $('.hideMarkers').hide();

        // Show hostel markers
        if (getGuests.value <= hostelMaxGuests && getGuests.value >= hostelMinGuests && daysDiff <= hostelMaxNights && daysDiff >= hostelMinNights) {
          $('#brownKiwi').show();
          $('#oaklandsLodge').show();
        }

        // Show motel markers
        if (getGuests.value <= motelMaxGuests && getGuests.value >= motelMinGuests && daysDiff <= motelMaxNights && daysDiff >= motelMinNights) {
          $('#greenlaneManor').show();
          $('#airportMotel').show();
        }

        // Show hotel markers
        if (getGuests.value <= hotelMaxGuests && getGuests.value >= hotelMinGuests && daysDiff <= hotelMaxNights && daysDiff >= hotelMinNights) {
          $('#grandMillennium').show();
          $('#bestWestern').show();
        }

        // Show house markers
        if (getGuests.value <= houseMaxGuests && getGuests.value >= houseMinGuests && daysDiff <= houseMaxNights && daysDiff >= houseMinNights) {
          $('#howickHome').show();
          $('#contemVilla').show();
        }
      }


// -----------------------------------------------------------------------------


    // Auto scroll on click the View Results button (was #viewResultsBtn)
    $('#bookRoomBtn').click(function(e){
      e.preventDefault();
      $.fn.fullpage.setScrollingSpeed(1000);
      $.fn.fullpage.moveSectionDown();
      $.fn.fullpage.setAllowScrolling(false);
      outputResults();
      outputTotal();
    });

    // This function shows the users details of their options in the DOM
    function outputResults() {

      // Adding all geojson elements to the results page
      accomImg.style.backgroundImage = accomChoice['0'].image;
      finalGuests.textContent = userResults['0'].guests + ' guests';
      finalMealsOption.textContent = userResults['0'].mealName;
      finalNights.textContent = userResults['0'].nights + ' nights (' + getCheckIn.value + ' - ' + getCheckOut.value + ')';

      // Show users chosen accommodation option in the DOM.
      accomName.textContent = accomChoice['0'].name + ' -';
      accomCost.textContent = '$' + accomChoice['0'].cost + ' per night';
    }


    // Calculations for adding the cost
    function outputTotal() {

      // Mulitplying the amount of nights the user has selected by the cost of acccommdation per night
      var totalNightsCost = accomChoice['0'].cost * userResults['0'].nights;

      // Total accommodation cost plus the cost of chosen meal
      var totalCal = totalNightsCost + userResults['0'].mealCost;

      // Writing the total in the DOM
      totalCost.textContent = '$' + totalCal + 'NZD';
    }


    // Generate random number for reference number and insert into the HTML
    function createRefNum () {

      var randomNum = Math.floor((Math.random() * 1000000) + 1);
      refNum.textContent = '#' + randomNum;
    }

    createRefNum();

  }); // DOCUMENT READY ENDS
}()); // IIFE ENDS
