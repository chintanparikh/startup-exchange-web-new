jQuery.overlay = (function($){
/*  Grey out page with a white div right on top. close by clicking away.
    Written by Charles Knight, charles@rabidaudio.com - 2014
    
    TODO - this can be done without jQuery. Eventually remove the dependancy.
*/
    if($===undefined) throw "jQuery is required to use this module";
    var module={};
    module.on = false;
    $(document.head).append(
        '<style>                                \
        .overlay{                               \
            z-index: 100;                       \
            position: absolute;                 \
            top: 0px;                           \
            height: 100%;                       \
            left: 0px;                          \
            width: 100%;                        \
            background-color: rgb(0, 0, 0);     \
            opacity: 0.45;                      \
            display: block;                     \
        }                                       \
        .overbox{                               \
            z-index: 200;                       \
            position: absolute;                 \
            background-color: white;            \
            border-radius: 5px;                 \
            text-align: center;                 \
        }                                       \
        </style>'
    );
    module.update = function(){
        var ob = $('#ol-overbox')[0];
        //Vertical
        var h = $(ob).height();
        var wh = $(window).height();
        $(ob).css('top', parseInt((wh-h)/2) + $(window).scrollTop() );
        //Horizontal
        var w = $(ob).width();
        var ww = $(window).width();
        $(ob).css('right', parseInt((ww-w)/2) + $(window).scrollLeft() );
    };
        
    module.create = function(content){
        module.destroy();
        $(document.body).append( '<div id="ol-overbox" class="overbox"></div>' );
        $(document.body).append( '<div id="ol-overlay" class="overlay"></div>' );
        var ob = $('#ol-overbox')[0];
        $(ob).append(content);
        module.update(); //inital positioning
        $(window).scroll(module.update);
        $(window).resize(module.update);
        $('#ol-overlay').click(module.destroy);
        module.on=true;
        return ob;
    };

    module.destroy = function(){
        module.on= false;
        $('div[id|=ol]').remove();
        $(window).off('scroll').off('resize');
    };
    return module;
}(jQuery));
