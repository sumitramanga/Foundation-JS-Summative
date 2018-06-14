(function() {
  var controlArrows = document.getElementsByClassName('fp-controlArrow');

  // Accommodation data
  var accommodation = {
    amount: 4,

    hostel: {
      cost: 30,
      people: [1, 2, 3, 4, 5, 6],
      nights: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },

    motel: {
      cost: 90,
      people: [2, 3, 4],
      nights: [3, 4, 5, 6, 7, 8, 9, 10]
    },

    hotel: {
      cost: 157,
      people: [1, 2],
      nights: [1, 2, 3, 4, 5]
    },

    house: {
      cost: 240,
      people: [1, 2, 3, 4],
      nights: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    },
  }

  // Page piling script
    $(document).ready(function() {
      $('#fullpage').fullpage({
        verticalCentered: true,
        anchors: ['firstPage', 'secondPage', '3rdPage'],
        sectionsColor: ['#EAE1C0', '#DE564B', '#EAE1C0'],
        bgSize: ['cover', 'cover', 'cover'],
        slidesNavigation: true,
      });

      $('#exploreBtn').click(function(e){
        e.preventDefault();
        $.fn.fullpage.setScrollingSpeed(2100);
        $.fn.fullpage.moveSectionDown();
      });

      $( function() {
      $( "#datepicker" ).datepicker();
    } );
    }); // DOCUMENT READY ENDS

//FORM VALIDATOR
    (function() {
      'use strict';
      window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
          form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add('was-validated');
          }, false);
        });
      }, false);
    })();

}()); // IIFE ENDS
