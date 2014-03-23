//http://www.thepetedesign.com/demos/onepage_scroll_demo.html

var section_positions=[];
var scroll_max_animaton_time=2000;

$(document).ready(function(){

    var $window = $(window);
    var $nav = $("#nav");
  
    $(".team-member").hover(
        function () {
            $(".team-member-details", this).stop(true,true).fadeIn();
        },
        function () {
            $(".team-member-details", this).stop(true,true).fadeOut();
        }
    );
  
  
    //scrolling links
    //if(!Modernizr.touch){
        $(document.body).find('a[href^="#"]:not([href="#nav"])').click(simple_slide);
    //}
    
    $nav.mmenu({
        onClick:{
            close: true,
            preventDefault: true,
            setSelected: false,
        }
    }, {
       pageNodetype: "page"
    });
    $window.scroll(function() {
        if ($window.scrollTop() > $window.height() * 0.088){
            $nav.addClass('navscroll').removeClass('navtop');
        }else{
            $nav.removeClass('navscroll').addClass('navtop');
        }
    });
    $window.scroll();

/****************************************************
    Setting the currently selected item in the menu. Needs some work.
  
  $('section').each(function(){
    if($(this).height()>0) section_positions[ Math.floor($(this).offset().top)] = $(this).attr('id');
  });
  
  $(window).scroll(function(){
    var current = $(document).scrollTop();
    var last_index=0;
    var l={};
    section_positions.some(function(e,i,a){
        l={
            current: current,
            testing: e,
            position: i,
            difference: i-current
        };
        if(i-current>250){
            $('nav li').removeClass('mm-selected');
            $('nav a[href="#'+a[last_index]+'"]').parent().addClass('mm-selected');
            l.using = a[last_index];
            console.log(l);
            return true;
        }
        last_index=i;
        return false;
    });
  });
***************************************************/
});

function simple_slide(e){
    e.preventDefault();
    var dest = $(this).attr('href');
    if(dest==="#nav") return;
    var dest_pos = $(dest).offset().top;
    var offset = 0;
    var distance = dest_pos -  $(document).scrollTop();//down is positive
    
    $(document.body).animate({
        scrollTop: dest_pos + offset
    }, Math.min(scroll_max_animaton_time, Math.abs(distance)), function(){
        var p=$(document).scrollTop();
        window.location.hash = dest;
        $("#nav").trigger('close');
    });
}
