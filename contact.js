/* TODO
    obfuscate, minify
    requirejs to get md5 and friends when needed
    set timeout on calendar
*/
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
            '<input type="button" id="refresh_captcha" value="refresh"></input><br>'+
            '<input type="text" id="txt_captcha"></input>'+
        '</div>'
    );
    $('#img_captcha').append( Captcha.generate() );
    $("#refresh_captcha").click(function(){
        $('#img_captcha').append( Captcha.generate() );
    });
    $("#txt_captcha").onKeyEnter(function(){
        if(Captcha.check( $('#txt_captcha').val() )){
            alert("yay");
        }else{
            alert("boo");
        }
    });
}

function(){

}

$(document).ready(function(){
    $('#btn_contact_submit') //TODO this aint right
        .mouseover(function(){
            $(this).off('mouseover');
            $(this).animate({
                 opacity: 1,
                 left: "+=10"
            },250, function(){
                $(this).on('mouseover');
            });
        })
         .mouseout(function(){
            $(this).off('mouseout');
            $(this).animate({
                opacity: 0.25,
                left: "-=10"
            },150, function(){
                $(this).on('mouseout');
            });
        })
        .click(secure_contact);
    //$('#txt_contact_message').onKeyEnter(secure_contact);
});
