$(document).ready(function(){


  // Mobile Nav
  $("#expand").click(function () {
    $('.li-link').each(function(i, e) {
      $(e).toggleClass('show');
    })
  })

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