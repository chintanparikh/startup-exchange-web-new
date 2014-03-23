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
    $(document.body).find('a[href^="#"]:not([href="#nav"])').click(simple_slide);
  
    function _init(){
        var width = $window.width();
        console.log(width);
        if(width<=767){
            _init_mobile();
        }else{
            _init_desktop();
        }
    }

    function _init_mobile(){
        $nav.removeClass();
        $window.off('scroll');
        $nav.mmenu({
            //moveBackground: false,
            onClick:{
                close: false, //true,
                preventDefault: true,
                setSelected: false,
            }
        }, {
           pageNodetype: "page"
        });
    }

    function _init_desktop(){
    $('nav [class*="mm-"]').each(function(){
        $(this).removeClass(function(index, classes){
            var list = classes.split(" ");
            var remove = [];
            var c;
            while(c=list.pop()){
                if(c.match(/^mm-/))
                    remove.push(c);
            }
            return remove.join(" ");
        });
    });
        $window.scroll(function() {
            if ($window.scrollTop() > $window.height() * 0.088){
                $nav.addClass('navscroll').removeClass('navtop');
            }
            if ($window.scrollTop() < $window.height() * 0.088){
                $nav.removeClass('navscroll').addClass('navtop');
            }
        });
        $nav.removeClass().addClass('nav navtop');
    }

    _init();
    $window.resize(_init);

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
    var that=this;
    //setTimeout(function(that){
        var dest = $(that).attr('href');
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
    //},400,that);
}
