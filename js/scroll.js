$(document).ready(function(){

  var $window = $(window);

  $window.scroll(function() {
    if ($window.scrollTop() > $window.height() * 0.06)
    {
      $("#nav").css({
      	background: "rgba(0, 0, 0, 1)",
      	position: "fixed",
      	top: "0",
      	width: "100%",
      	left: "0",
      	paddingLeft: "20%",
      	height: "60px"
      });

      $("#splash header").css({
      	marginTop: "80px"
      });	
    }
    if ($window.scrollTop() < $window.height() * 0.06)
    {
		$("#nav").removeAttr("style");
		$("#splash header").removeAttr("style");
    }
  });
});