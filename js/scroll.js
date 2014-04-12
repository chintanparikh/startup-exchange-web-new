//http://www.thepetedesign.com/demos/onepage_scroll_demo.html

var section_positions=[];
var scroll_max_animaton_time=2000;
var prevent_hyperlinks = true;
var auto_close = false;

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
    if(!Modernizr.touch){
        //this works on my Android in Chrome, but it isn't smooth
        $(document.body).find('a[href^="#"]:not([href="#nav"])').click(simple_slide);
    }else{
        prevent_hyperlinks = false;
        auto_close = true;
    }
    
    /* Debug lines
    $(document.body).append(
        '<div id="center" style="background-color:red; height:2px; width:100%; position:absolute; z-index: 9999;"></div>'+
        '<div id="top" style="background-color:yellow; height:10px; width:100%; position:absolute; z-index: 9999;"></div>'+
        '<div id="bottom" style="background-color:blue; height:10px; width:100%; position:absolute; z-index: 9999;"></div>'
    );*/
    
    $nav.mmenu({
        onClick:{
            close: auto_close,
            preventDefault: prevent_hyperlinks,
            setSelected: false,
        }
    },{
       pageNodetype: "page"
    });
    $window.scroll(function() {
        if ($window.scrollTop() > $window.height() * 0.088){
            $nav.addClass('navscroll').removeClass('navtop');
        }else{
            $nav.removeClass('navscroll').addClass('navtop');
        }
        
        var screen_center = $(document).scrollTop() + $window.height()/2;
        var was_in = $('nav li[class*=mm-selected] a').attr('href') || "#splash";
        var top = $(was_in).offset().top;
        var next = $(was_in).next('section:visible').offset();
        var bottom = (next ? next.top : top+$(was_in).height());
        
        if( screen_center > bottom || screen_center < top){ //selection change needs to occur
            $('nav li[class*=mm-selected]').removeClass('mm-selected');
            
            $('section:visible').each(function(){
                var $_this = $(this);
                var top = $_this.offset().top;
                var next = $_this.next('section:visible').offset();
                var bottom = (next ? next.top : top+$_this.height());
                if( bottom > screen_center ){
                    $('nav a[href="#'+$_this.attr('id')+'"]').parent().addClass('mm-selected');
                    return false; //break
                }
            });
        }
    });
    $window.scroll();
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
