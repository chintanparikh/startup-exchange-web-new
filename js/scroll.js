//http://www.thepetedesign.com/demos/onepage_scroll_demo.html

var section_positions=[];
var scroll_max_animaton_time=2000;
var prevent_hyperlinks = true;

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
        $(document.body).find('a[href^="#"]:not([href="#nav"])').click(simple_slide);
    }else{
        prevent_hyperlinks = false;
    }
    
    $(document.body).append(
        '<div id="center" style="background-color:red; height:2px; width:100%; position:absolute; z-index: 9999;"></div>'+
        '<div id="top" style="background-color:yellow; height:10px; width:100%; position:absolute; z-index: 9999;"></div>'+
        '<div id="bottom" style="background-color:blue; height:10px; width:100%; position:absolute; z-index: 9999;"></div>'
    );
    
    $nav.mmenu({
        onClick:{
            close: false,//true,
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
        
        var log={};
        var screen_center = $(document).scrollTop() + $window.height()/2;
        log.screen_center = screen_center;
        var was_in = $('nav li[class*=mm-selected] a').attr('href') || "#splash";
        log.was_in = was_in;
        var wtop = $(was_in).offset().top;
        log.wtop=wtop;
        var next = $(was_in).next('section:visible').offset();
        var wbottom = (next ? next.top : wtop+$(was_in).height());
        log.wbottom = wbottom;
        
            $('#top').css('top', wtop-5);
            $('#center').css('top', screen_center-1);
            $('bottom').css('top', wbottom-10);
        
        if( screen_center > wbottom || screen_center < wtop){ //selection change needs to occur
            $('nav li[class*=mm-selected]').removeClass('mm-selected');
            
            $('section:visible').each(function(){
                var $_this = $(this);
                var top = $_this.offset().top;
                var next = $_this.next('section:visible').offset();
                var bottom = (next ? next.top : top+$_this.height());
                if( bottom > screen_center ){
                    $('nav a[href="#'+$_this.attr('id')+'"]').parent().addClass('mm-selected');
                    log.set = $_this.attr('id');
                    console.log(log);
                    return false; //break
                }
            });
        }
    });
    $window.scroll();

/****************************************************
    Setting the currently selected item in the menu. Needs some work.
*/
  
    //this is super elegant, but sadly doesn't work well
    //if($(this).height()>0) section_positions[ Math.floor($(this).offset().top)] = $(this).attr('id');
    
        //visible_sections.push( $(this).attr('id') );
    
    /*var last_index=0;
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
    });*/
/***************************************************/
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
