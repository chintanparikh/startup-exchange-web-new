//http://www.thepetedesign.com/demos/onepage_scroll_demo.html
$(document).ready(function(){
  
  function simple_slide(e){
    var dest = $(this).attr('href');
    var dest_pos = $(dest).offset().top;
    var offset= 0;//-1*($('.navscroll').height() || 0);
    var distance = dest_pos -  $(document).scrollTop();//down is positive
    console.log(distance);
    e.preventDefault();
    
    //$(document.documentElement).animate({
    $(document.body).animate({
        scrollTop: dest_pos + offset
    }, Math.min(2000, Math.abs(distance)), function(){
        window.location.hash = dest.substr(1);
    });
  }
  
  if (!Modernizr.touch){
    $(document.body).find('a[href^="#"]').click(simple_slide);
  }

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
    if ($window.scrollTop() > $window.height() * 0.06){
      //$("#nav").css({});
      $('#nav').addClass('navscroll');
      $('#nav').removeClass('navtop');

      $("#splash header").css({
      	marginTop: "80px"
      });	
    }
    if ($window.scrollTop() < $window.height() * 0.06){
		  //$("#nav").removeAttr("style");
		  $("#nav").removeClass('navscroll');
		  $('#nav').addClass('navtop');
		  $("#splash header").removeAttr("style");
    }
  });
});
