(function() {

  // Next and previous button for the slides.
  var controlArrows = document.getElementsByClassName('fp-controlArrow');

  // Getting the users options from the SECOND section -------------------------
  var getGuests = document.getElementById('getGuests');

  var getCheckInDate = document.getElementById('getCheckIn');
  var getCheckOutDate = document.getElementById('getCheckOut');
  var nightsSelected = document.getElementById('nightsSelected');
  var nightsText = document.getElementById('nightsText');

  var getMeals = document.getElementById('getMealOption');

  var getSubBtn = document.getElementById('submitBtn');
  var errorMessage = document.createElement('div');

  // The button which pushes the details entered into an array located on the
  // "All Set!" page -----------------------------------------------------------
  var browseBtn = document.getElementById('browseBtn');

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
// var currentSlide = "slide1";
//
// $("#getGuests").change(function(){
//   console.log("value has changed");
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

    $('.datepicker1').pickadate({
      clear: '',
      min: new Date()
    });

    $('.datepicker2').pickadate({
      clear: '',
      min: new Date(),
      onClose: function () {
        calculateNights();
      }
    });

    // $('.datepicker1').pickadate({
    //   clear: '',
    //   min: new Date(),
    // });
    //
    // $('.datepicker1').change(function(){
    //   var firstDate = $(this).val();
    //   //enable the second date picker
    //
    //
    //   $('.datepicker2').pickadate({
    //     clear: '',
    //     min: new Date(firstDate),
    //     onClose: function () {
    //       calculateNights();
    //     }
    //   });
    //
    // });


// -----------------------------------------------------------------------------


    function calculateNights () {

      // Calculate how many nights in between the chosen dates
      var startDate = Date.parse(getCheckIn.value);
      var endDate = Date.parse(getCheckOut.value);
      var timeDiff = endDate - startDate;
      daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      // console.dir(getCheckOutDate);
      // Push the date to view on the slide
      nightsSelected.innerText = daysDiff;
      dateErrorMsg();

    }


//------------------------------------------------------------------------------


    // FORM VALIDATION
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

    // Form doesn't refresh the page
    $("form").submit(function() {
       return false;
    });


// -----------------------------------------------------------------------------


    // Add a message when too less or too many nights have been selected
    // remove the message and uncolor the inputs when the task the nights are correct

    function dateErrorMsg() {
      if (nightsSelected.textContent > 15 || nightsSelected.textContent < 1) {

        var nightsErrorMsg = document.createElement('p');
        getCheckInDate.style.border = '1px solid #DC1C0C';
        getCheckOutDate.style.border = '1px solid #DC1C0C';
        nightsErrorMsg.className = 'nightsErrorMsg';
        nightsErrorMsg.style.margin = '1em';
        nightsErrorMsg.textContent = 'You have selected an incorrect amount of days. Please try again.';
        nightsText.after(nightsErrorMsg);

      } else {
        $('.nightsErrorMsg').remove();
        getCheckInDate.style.borderColor = '';
        getCheckOutDate.style.borderColor = '';
      }

    }


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

      // Turn guests and meal cost input from string to number
      var guestsStringToNum = parseInt(getGuests.value);
      var mealStringToNum = parseInt(getMeals.value);

      userResults.push({guests: guestsStringToNum, nights: daysDiff, mealName: getMealOption.selectedOptions["0"].textContent, mealCost: mealStringToNum});

    }


// -----------------------------------------------------------------------------

    // SETTING UP MAP

    // var token = 'pk.eyJ1Ijoic3VtaXRyYW0iLCJhIjoiY2ppbDA5ajh5MmpuMTNwb250MXR0ZWI1ayJ9.4K0zZ6PO_bnYu76JJUOmoQ';

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
          "id": "places",
          "type": "symbol",
          "source": {
            "type": "geojson",
            "data": {
              "type": "FeatureCollection",
              "features": [


// Te Henga Walkway. Bethells Beach to Muriwai ---------------------------------

                {
                  "type": "Feature",
                  "properties": {
                    "description": "<strong>Te Henga Walkway</strong>",
                    "icon": "park"
                  },

                  "geometry": {
                    "type": "Point",
                    "coordinates": [174.452166, -36.883217]
                  }
                },


// Point to point Walk -----------------------------------------------------------------
                {
                  "type": "Feature",
                  "properties": {
                    "description": "<strong>Point England Walks</strong>",
                    "icon": "park"
                  },

                  "geometry": {
                    "type": "Point",
                    "coordinates": [174.871534, -36.882470]
                  }
                },


// Albert Park -----------------------------------------------------------------
                {
                  "type": "Feature",
                  "properties": {
                    "description": "<strong>Albert Park</strong>",
                    "icon": "park"
                  },

                  "geometry": {
                    "type": "Point",
                    "coordinates": [174.767883, -36.850609]
                  }
                },


// Auckland War Memorial Museum ------------------------------------------------
                {
                  "type": "Feature",
                  "properties": {
                    "description": "<strong>Auckland War Memorial Museum</strong>",
                    "icon": "museum"
                  },
                  "geometry": {
                    "type": "Point",
                    "coordinates": [174.777791, -36.860364]
                  }
                },


// Sky Tower -------------------------------------------------------------------
                {
                  "type": "Feature",
                  "properties": {
                    "description": "<strong>Sky Tower</strong>",
                    "icon": "star"
                  },

                  "geometry": {
                    "type": "Point",
                    "coordinates": [174.762191, -36.848414]
                  }
                },


// Queens Street ---------------------------------------------------------------
                {
                  "type": "Feature",
                  "properties": {
                    "description": "<strong>Queens Street</strong>",
                    "icon": "star"
                  },
                  "geometry": {
                    "type": "Point",
                    "coordinates": [174.764615, -36.850473]
                    }
                },


// Coley & Punch ---------------------------------------------------------------
                {
                  "type": "Feature",
                  "properties": {
                    "description": "<strong>Coley & Punch</strong>",
                    "icon": "alcohol-shop"
                  },
                  "geometry": {
                    "type": "Point",
                    "coordinates": [174.764730, -36.841020]
                    }
                },

// Kelly Tarlton's Sea Life Aquarium -------------------------------------------
                {
                  "type": "Feature",
                  "properties": {
                    "description": "<strong>Kelly Tarlton's Sea Life Aquarium</strong>",
                    "icon": "aquarium"
                  },
                  "geometry": {
                    "type": "Point",
                    "coordinates": [174.817432, -36.846943]
                    }
                },

// MT Roskill Summit -------------------------------------------
                {
                  "type": "Feature",
                  "properties": {
                    "description": "<strong>MT Roskill Summit</strong>",
                    "icon": "park"
                  },
                  "geometry": {
                    "type": "Point",
                    "coordinates": [174.737258, -36.912590]
                    }
                },

// Alberton - 1860s mansion with original furnishings & other artifacts, plus a garden. -------------------------------------------
                {
                  "type": "Feature",
                  "properties": {
                    "description": "<strong>Alberton</strong>",
                    "icon": "museum"
                  },
                  "geometry": {
                    "type": "Point",
                    "coordinates": [174.724686, -36.889934]
                    }
                },


// Stardome Observatory & Planetarium ------------------------------------------
                {
                  "type": "Feature",
                  "properties": {
                    "description": "<strong>Stardome Observatory & Planetarium</strong>",
                    "icon": "star-stroked",
                  },

                  "geometry": {
                    "type": "Point",
                    "coordinates": [174.776985, -36.905937]
                  }
                }

// -----------------------------------------------------------------------------

              ]
            }
          },

          "layout": {
            "icon-image": "{icon}-15",
            "icon-allow-overlap": true,
            "icon-size": 1
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


// -----------------------------------------------------------------------------

// Filtering accommodation to match users inputted details

    // Grabbing data from data.js
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


    browseBtn.addEventListener('click', filterMarkers , false);

    function filterMarkers() {

      if (getGuests.value <= hostelMaxGuests && getGuests.value >= hostelMinGuests && daysDiff <= hostelMaxNights && daysDiff >= hostelMinNights) {
        showHostels();
        console.log("you can stay at hostels");
      }

      if (getGuests.value <= motelMaxGuests && getGuests.value >= motelMinGuests && daysDiff <= motelMaxNights && daysDiff >= motelMinNights) {
        showMotels();
        console.log("you can stay at motels");
      }

      if (getGuests.value <= hotelMaxGuests && getGuests.value >= hotelMinGuests && daysDiff <= hotelMaxNights && daysDiff >= hotelMinNights) {
        showHotels();
        console.log("you can stay at hotels");
      }

      if (getGuests.value <= houseMaxGuests && getGuests.value >= houseMinGuests && daysDiff <= houseMaxNights && daysDiff >= houseMinNights) {
        showHouses();
        console.log("you can stay at houses");
      }
    }


// ------------------------------- ACCOMMODATION -------------------------------


// Houses -----------------------------------------------------------------------

    function showHouses() {
      var geojson = {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {
              "accomType": "house",
              "message": "Contemporary inner city villa by Fran & Aaron",
              "cost": "240",
              "theId": "villa",
              "iconSize": [40, 40]
            },

            "geometry": {
              "type": "Point",
              "coordinates": [174.752126, -36.850371]
            }
          },

          {
            "type": "Feature",
            "properties": {
              "accomType": "house",
              "message": "Howick Luxury Large Home",
              "cost": "240",
              "theId": "howick",
              "iconSize": [40, 40]
            },

            "geometry": {
              "type": "Point",
              "coordinates": [174.932126, -36.913246]
            }
          },
        ]
      };
      // Add markers to the map..
      geojson.features.forEach(function(marker) {

        // Create a DOM element for the marker
        var el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = 'url("img/pin.svg")';
        el.style.backgroundSize = 'contain';
        el.style.width = marker.properties.iconSize[0] + 'px';
        el.style.height = marker.properties.iconSize[1] + 'px';
        el.addEventListener('click', function() {
          // window.alert(marker.properties.message);
          console.log(marker.properties);
        });

        // Add marker to map
        new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);
      });
    } // houses function ends
//
//
// // Hotels  ----------------------------------------------------------------------
    function showHotels() {
      var geojson = {
        "type": "FeatureCollection",
        "features": [

            {
              "type": "Feature",
              "properties": {
                "message": "Grand Millennium Hotel",
                "cost": "157",
                "theId": "grandMillennium",
                "iconSize": [40, 40]
              },

              "geometry": {
                "type": "Point",
                "coordinates": [174.760582, -36.852772 ]
              }
            },

            {
              "type": "Feature",
              "properties": {
                "message": "Best Western Ellerslie",
                "cost": "157",
                "theId": "bestWestern",
                "iconSize": [40, 40]
              },

              "geometry": {
                "type": "Point",
                "coordinates": [174.814842, -36.900858]
              }
            },

            {
              "type": "Feature",
              "properties": {
                "message": "Quality Hotel Lincoln Green",
                "cost": "157",
                "theId": "quailtyHotel",
                "iconSize": [40, 40]
              },

              "geometry": {
                "type": "Point",
                "coordinates": [174.631023, -36.862974]
              }
            },
          ] // Features ends
      }; // geojson ends

      // Add markers to the map..
      geojson.features.forEach(function(marker) {

        // Create a DOM element for the marker
        var el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = 'url("img/pin.svg")';
        el.style.backgroundSize = 'contain';
        el.style.width = marker.properties.iconSize[0] + 'px';
        el.style.height = marker.properties.iconSize[1] + 'px';

        el.addEventListener('click', function() {
          // window.alert(marker.properties.message);
          console.log(marker.properties);
        });

        // Add marker to map
        new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);
      });
    } // hotel function ends


// Motels  ----------------------------------------------------------------------
    function showMotels() {
      var geojson = {
        "type": "FeatureCollection",
        "features": [

          {
            "type": "Feature",
            "properties": {
              "message": "Papakura Motor Lodge & Motel",
              "cost": "90",
              "theId": "parakura",
              "iconSize": [40, 40]
            },

            "geometry": {
              "type": "Point",
              "coordinates": [174.801883, -36.897228]
            }
          },

          {
            "type": "Feature",
            "properties": {
              "message": "Airport Harbour View Motel",
              "cost": "90",
              "theId": "airportHarbour",
              "iconSize": [40, 40]
            },

            "geometry": {
              "type": "Point",
              "coordinates": [174.784677, -36.931369]
            }
          },
        ] // Feature ends
      }; // geojson ends

      // Add markers to the map..
      geojson.features.forEach(function(marker) {

        // Create a DOM element for the marker
        var el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = 'url("img/pin.svg")';
        el.style.backgroundSize = 'contain';
        el.style.width = marker.properties.iconSize[0] + 'px';
        el.style.height = marker.properties.iconSize[1] + 'px';

        el.addEventListener('click', function() {
          // window.alert(marker.properties.message);
          console.log(marker.properties);

        });

        // Add marker to map
        new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);
      });
    } // motel function ends


// Hostel ----------------------------------------------------------------------
    function showHostels() {
      var geojson = {
        "type": "FeatureCollection",
        "features": [

          {
            "type": "Feature",
            "properties": {
              "message": "Brown Kiwi Travellers Hostel",
              "cost": "30",
              "theId": "brownKiwi",
              // "image": "url("paper.gif");",
              "iconSize": [40, 40]
            },

            "geometry": {
              "type": "Point",
              "coordinates": [174.742576, -36.847083]
            }
          },

          {
            "type": "Feature",
            "properties": {
              "message": "Oaklands Lodge Backpackers",
              "cost": "30",
                // "image": "url("paper.gif")",
              "theId": "oaklands",
              "iconSize": [40, 40]
            },

            "geometry": {
              "type": "Point",
              "coordinates": [174.763164, -36.880751]
            }
          }
        ] // Feature ends
      }; // geojson ends

      // Add markers to the map..
      geojson.features.forEach(function(marker) {

        // Create a DOM element for the marker
        var el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = 'url("img/pin.svg")';
        el.style.backgroundSize = 'contain';
        el.style.width = marker.properties.iconSize[0] + 'px';
        el.style.height = marker.properties.iconSize[1] + 'px';

        el.addEventListener('click', function() {
          // window.alert(marker.properties.message);
          console.log(marker.properties);

          // Push details to an array when clicking on "book now" button.
          accomChoice.push({name: marker.properties.message, cost: marker.properties.cost});
          console.log(accomChoice);

          return marker;

        });

        // Add marker to map
        new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);
      });
    } // Hostel ends
    // console.dir(geojson.features["0"]);

    // console.dir(geojson.features);


// -----------------------------------------------------------------------------

    // Auto scroll on click the View Results button
    $('#viewResultsBtn').click(function(e){
      e.preventDefault();
      $.fn.fullpage.setScrollingSpeed(1000);
      $.fn.fullpage.moveSectionDown();
      $.fn.fullpage.setAllowScrolling(false);
      outputResults();
      outputTotal();
    });

    // This function shows the users details of their options in the DOM
    function outputResults() {
      console.dir(accomImg.style.backgroundImage = 'url("https://images.unsplash.com/photo-1469796466635-455ede028aca?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3dd45924b64ebc480baf05650e3f0048&auto=format&fit=crop&w=1350&q=80")');
      console.dir(accomImg);

      finalGuests.textContent = userResults['0'].guests + ' guests';
      finalMealsOption.textContent = userResults['0'].mealName;
      finalNights.textContent = userResults['0'].nights + ' nights (' + getCheckIn.value + " - " + getCheckOut.value + ')';

      // Users chosen accommodation. Show their option in the DOM
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
