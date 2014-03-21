var Captcha = (function(CryptoJS){
/*  Module for creating captchas in browser. Requires HTML5 canvas and the MD5
    CryptoJS module (http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/md5.js).
    Probably not totally secure, but not bad. The greater fear is hackers bypassing
    the captcha module altogether and executing the result independantly. Still considering
    solutions. 
    
    Written by Charles Knight, charles@rabidaudio.com - 2014
*/
    if( !CryptoJS || !CryptoJS.MD5 ) throw "CryptoJS MD5 module is required";
    
    function randInt(a, b){
        var start, end;
        if(b === undefined){ start=0; end=a; }else{ start=a; end=b; }
        return Math.floor(Math.random() * (end-start))+start;
    }
    
    var module={};
    module.canvas = undefined;
    
    module.build_canvas = function(){
        if( module.canvas ) module.canvas.remove();
        module.canvas = document.createElement('canvas');
        if (module.canvas.getContext('2d') == undefined) throw "This browser doesn't support HTML5 canvas.";
        module.canvas.setAttribute('width', 140);
        module.canvas.setAttribute('height', 40);
        //'<canvas id="textCanvas" width=140 height=40></canvas>'
    };
    
    module.build_canvas();

    module.check = function(guess){
        var answer = module.canvas.getAttribute('answer');
        if( !answer ) return false;
        return CryptoJS.MD5(guess).toString() === answer;
    };

    module.generate = function() {
        //http://springtricks.blogspot.in/2013/11/simple-captcha-using-java-script.html
        module.build_canvas(); //refresh
        var randomstring = '';
        var chars = "!@#$%^&*()123456789ABDEFGHJLMNQRTYabcdefghijkmnopqrstuvwxyz";
        var string_length = 5;

        for (var i=0; i<string_length; i++) {
            randomstring += chars[randInt(chars.length)];
        }
        var tCtx = module.canvas.getContext('2d');
        tCtx.font= "italic 24px \"Open Sans\", sans-serif";
        tCtx.strokeStyle = "#000000";
        tCtx.shadowBlur=15;
        tCtx.shadowColor="black";
        tCtx.lineWidth=1;
        tCtx.textBaseline = "middle";
        tCtx.clearRect(0,0,140,40);
        var pos = 40;
        for(var i=0; i<randomstring.length; i++){
            tCtx.strokeText(randomstring[i],pos,20+randInt(-5,5));
            pos=pos+tCtx.measureText(randomstring[i]).width+1;
        }
        //Store answer as MD5Sum so hackers can't just read the answer
        module.canvas.setAttribute('answer', CryptoJS.MD5(randomstring).toString());
        return module.canvas; //return canvas item so it can be inserted into DOM
    };
    return module;
}(CryptoJS));
