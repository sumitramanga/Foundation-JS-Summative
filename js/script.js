(function() {
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
    }); // DOCUMENT READY ENDS

}()); // IIFE ENDS
