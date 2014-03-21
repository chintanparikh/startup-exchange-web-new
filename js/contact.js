/* TODO
    obfuscate, minify
    requirejs to get md5 and friends when needed
    set timeout on calendar
*/

//https://www.iconfinder.com/icons/208024/audio_refresh_repeat_icon#size=128
//https://www.iconfinder.com/icons/211619/a_arrow_right_icon#size=20

function send_email(){
    alert("send email");
}

$.fn.extend({
    onKeyEnter: function(callback){
        var cb = (typeof callback == 'function') ? callback : new Function(callback);
        this.keypress(function(e){
            if( e.keyCode == 13 ){ setTimeout(cb,0,e); }
        });
    }
});

function secure_contact(){
    $.overlay.create(
        '<div>'+
            '<p>Please inter the following text in the block below for security purposes.<p>'+
            '<span id="img_captcha"></span>'+
            '<input type="text" id="txt_captcha"></input>'+
            '<img id="refresh_captcha" src="img/refresh.png">'+
        '</div>',
        ["white-bg"]
    );
    $('#img_captcha').append( Captcha.generate() );
    $("#refresh_captcha").click(function(){
        $('#img_captcha').append( Captcha.generate() );
    });
    $("#txt_captcha").onKeyEnter(function(){
        if(Captcha.check( $('#txt_captcha').val() )){
            $.ajax({
                url: "#", //TODO post to mailform
            }).done(function(){
                $.overlay.destroy();
            });
        }else{
            $('#txt_captcha')
                .val("")
                .animate({
                    boxShadow: "0 0 8px rgb(255,0,0)", //requires jquery.animate-shadow
                },100,function(){
                    var txtbox = this;
                    setTimeout(function(){
                        $(txtbox).animate({
                            boxShadow: "0 0 0px rgb(152,153,153)"
                        },200);
                    },2000);
                });
            $('#img_captcha').append( Captcha.generate() );
        }
    });
}


$(document).ready(function(){
    $('#btn_contact_submit')
        .mouseover(function(){
            $(this).animate({
                 opacity: 1,
            },150);
        })
         .mouseout(function(){
            $(this).animate({
                opacity: 0.25,
            },75);
        })
        .click(secure_contact);
});