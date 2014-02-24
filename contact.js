/* TODO
    obfuscate, minify
    requirejs to get md5 and friends when needed
    set timeout on calendar
*/
function send_email(){
    alert("send email");
}

$.fn.extend({
    onEnter: function(callback){
        var cb = (typeof callback == 'function') ? callback : new Function(callback);
        this.keypress(function(e){
            if( e.keyCode == 13 ){ setTimeout(cb,0,e); }
        });
    }
});

$(document).ready(function(){

    $('#frm_submit').click(function(){
        $.overlay.create(
            '<div id="cp">'+
                '<span id="img_captcha"></span><br>'+
                '<input type="button" id="refresh_captcha" value="refresh"></input><br>'+
                '<input type="text" id="txt_captcha"></input>'+
            '</div>'
        );
        $('#img_captcha').append( Captcha.generate() );
        $("#refresh_captcha").click(function(){
            $('#img_captcha').append( Captcha.generate() );
        });
        $("#txt_captcha").onEnter(function(){
            if(Captcha.check( $('#txt_captcha').val() )){
                alert("yay");
            }else{
                alert("boo");
            }
        });
    });
});
