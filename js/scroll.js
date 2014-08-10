$(document).ready(function(){

  // Mobile Nav
  $("#expand").click(function () {
    $('.li-link').each(function(i, e) {
      $(e).toggleClass('show');
    });

    if ( $("#expand").text() == "Expand" ) {
      $("#expand").text("Close");
    }
    else {
      $("#expand").text("Expand");
    }

  });

  $('.li-link').click(function () {
    $('.li-link').each(function(i, e) {
      $(e).toggleClass('show');
    });
    $("#expand").text("Expand");
  });

  $('body').plusAnchor();

  var $window = $(window);
  
	$(".team-member").hover(
  	function () {
  	  $(".team-member-details", this).stop(true,true).fadeIn();
  	},
  	function () {
  	  $(".team-member-details", this).stop(true,true).fadeOut();
  	}
	);


  $window.scroll(function() {
    if ($window.scrollTop() > $window.height() * 0.06)
    {
      $("#nav").addClass('stuck')

      $("#splash header").css({
      	marginTop: "80px"
      });	
    }
    if ($window.scrollTop() < $window.height() * 0.06)
    {
		$("#nav").removeClass("stuck");
		$("#splash header").removeAttr("style");
    }
  });
});