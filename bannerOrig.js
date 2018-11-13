
var tl,
    imagesLoaded = false,
    backup = false;

$(document).ready(function(){
  preloadAssets();
});

function preloadAssets() {

    var i = [
      "logo_aa.svg",
      "logo-qantas-colour.svg",
      "logo-qantas-mono.svg",
      "shape-mask.svg",
      "shape-red.svg",
      "shape-blue.svg",
      "shape-red-end-frame.svg",
      "shape-red-end-frame2.svg",
      "shape-white.svg"
    ];

    preloadimages(i).done(function (images) {

        imagesLoaded = true;
        setTimeout(beginAnimation,2100);

    })
}




//ANIMATION CODES
function beginAnimation(){
       const vid  = document.querySelector('#video-el'),
          banner  = document.querySelector('.banner'),
  bannerContainer = document.querySelector('.container'),
           f1copy = document.querySelector('#f1-copy'),
           f2copy = document.querySelector('#f2-copy'),
        blueShape = document.querySelector('#blue-shape'),
        redShape  = document.querySelector('#red-shape'),
       whiteShape = document.querySelector('#white-shape'),
        maskShape = document.querySelector('#mask-shape'),
       qantasMono = document.querySelector('#qantas-logo-mono'),
       qantasColor= document.querySelector('#qantas-logo-colour'),
           aalogo = document.querySelector('#aa-logo'),
            terms = document.querySelector('.terms-wrapper'),
           loader = document.querySelector('.loader'),
           f3copy = document.querySelector('#f3-copy'),
          divider =  document.querySelector('#logo-divider'),
            btn   =  document.querySelector('.button'),
           shadow =  document.querySelector('#red-shape-end-frame2')
    ;         
     
        const bird = $('#Bird'),
          birdHat = bird.find('#BirdHat'),
          birdEyes = bird.find('#leftEye, #rightEye');
    
    
    console.log("start animation");

    
    //************* MASTER TIMELINE
    const masterT = new TimelineMax();
        
        masterT
            .add(clearStage())
            .add(enterIntro())
            .add(insertLogos())
            .add(bringLogosDown())
        ;
    
    
  
    //clear stage
    function clearStage() {
        const clearTl = new TimelineMax(); 
        clearTl
            .set(vid, {autoAlpha: 0})
            .set(f1copy, {autoAlpha: 0})
            .set(f3copy, {autoAlpha: 0})
            .set(terms, {autoAlpha:0})
            .set(qantasMono, {autoAlpha:0})
            .set(qantasColor, {autoAlpha:0})
            .set(aalogo, {autoAlpha:0})
            .set(btn, {autoAlpha:0})
            .set(divider, {height:0, rotation: 180})    
            .set(maskShape, {left:-60, top:-20, scale:8, rotation:110})
            .set(redShape, {top:160, left:100, scale: .85, autoAlpha:.7, rotation:130})
            .set(blueShape, {top:70, left:150, autoAlpha:.8, rotation: -140, scale:2})
            .set(whiteShape, {top:180, left:7,scale: 6, rotation:-280,autoAlpha:0})
            .set(shadow, {autoAlpha:0})
            .set(f2copy, {autoAlpha: 0, onComplete: showContainer})
        ;
        
        function showContainer() {
                banner.style.display = 'block';
                console.log('show banner');
                loader.style.display = 'none';
                vid.play();    
        }
        return clearTl;
    }
    
    //insert shapes(blue,red,mask), enter whiteshape
    function enterIntro() {
        const enterIntro = new TimelineMax();
            enterIntro
                .to(vid, 1,{autoAlpha:1, onComplete:enterHeadlines})
                .to(maskShape, 1.3, {rotation: '-20', scale: 19, transformOrigin: '48% 50%',ease: Power2.easeOut},0)
                .to(maskShape, .2, {rotation: '-=10', scale: 16, transformOrigin: '48% 50%',ease: Power2.easeOut},'-=.4')
                .to(maskShape, .4, {rotation: '-=20', scale: 38,y:'-=70', transformOrigin: '48% 50%', ease: Back.easeOut},'-=.2')

                .to(blueShape, 1, {rotation: '-=200', x:'-=150', y:'+=30',scale:'+=1'},0)
                .to(blueShape, 1.5, {rotation: '-=200', x:'-=60', y:'+=100', scale:'+=3'},'-=1')
                .to(blueShape, 1, {x:'-=70', y:'+=150', scale:'+=3', autoAlpha:0,ease: Back.easeOut},'-=.85')

                .to(redShape, 1, {rotation: '-=140', x:'+=160', y:'-=80', scale:3},0)
                .to(redShape, 1, {x:'+=80', y:'-=100', scale:'+=6', autoAlpha:.8,ease: Back.easeInOut.config(1.4)},'-=1.5')
        
                .to(whiteShape, .8, {left:-14, top: 290, autoAlpha: .8},'-=1.1')        

        
        ;
            
        return enterIntro; 
    }
   
    
    //insert headlines
    function enterHeadlines() {
        const enterHeadlines = new TimelineMax();
            enterHeadlines
                .fromTo(f1copy, 1.4,{autoAlpha:0},{autoAlpha:.8},'-=.1')
                .to(f1copy, 1,{autoAlpha:0}, '+=2.4')
                .to(f2copy, 1,{autoAlpha:.8},'-=.4')
                .to(f2copy, 1,{autoAlpha:0}, '+=2.8')
        ;
        return enterHeadlines; 
    }
    
    //cover screen with red and white shapes, insert logos
    function insertLogos() {
        const insertLogos = new TimelineMax();
            insertLogos
                .add('insertCovers',5)
                .to(redShape, 1, {x:70, y:'-=50'},'insertCovers')
                .to(whiteShape,.8,{x:200, y:30,rotation:'-=80',ease: Back.easeIn.config(.2)},'insertCovers')              
                .to(redShape, 1, {rotation:'-=60',scale:'+=6',autoAlpha:1, transformOrigin:'98% 70%'},'-=.5')
                .to(whiteShape,1, {left:87, top: 77,autoAlpha:1, scale: 9.8}, '-=1')
                .add('coversInserted')
                .fromTo(qantasMono, 1, {y:-35, autoAlpha:0},{y:0,autoAlpha:1}, 'coversInserted')
                .fromTo(aalogo, 1, {y:35, autoAlpha:0},{y:0,autoAlpha:1}, 'coversInserted')
                .to(vid, .5,{autoAlpha:0})
                .to(redShape, .001, {scale:'+=6.1',x:217})
        ;
        
        return insertLogos;
    }
    
    
    //dance red and white shapes, change qantas mono logo
    //insert terms, insert headline3, insert shape-red-end insert button
    function bringLogosDown() {
        const bringLogosDown = new TimelineMax();
            bringLogosDown
                .to(whiteShape,1,{rotation:'-=150',scaleY:10, x:0, y:220},0)
                .to(qantasMono, .6, {top: 140, left:5, scale: .8, autoAlpha:0},0)
                .to(aalogo, 1, {top: 125, right:40, scale:.8},0)
                .add('logo down')
                .to(qantasColor, .8,{top:179, left:10, autoAlpha:1},'-=.85')        
                .to(aalogo, 1, {top: 179, right:53, scale:.8},0)
                .add('switched color')
                .to(divider, 2.1, {height:30, transformOrigin:'left bottom'}, '-=.8')
                .fromTo(shadow, 1.6, {autoAlpha:0, y:-120, x:120, scale: .1},{autoAlpha:.27, y:0, x:0, scale:.88},0)
                .add('f3')
                .to(terms, .7, {autoAlpha:1}, 0)
                .fromTo(f3copy, 1, {autoAlpha:0, y:-20}, {autoAlpha:1, y:0}, 'f3-=1.3')
                .fromTo(btn, .9, {autoAlpha:0, scale:.6}, {autoAlpha:1, scale:1, onComplete:enterBirdie}, '-=.4')
        ;
        return bringLogosDown;
        
            function enterBirdie() {
                document.querySelector('.birdie').style.display='block';
                const plug = document.querySelector('.plug');    
                
                
                const enterBirdie = new TimelineMax();
                enterBirdie
                    
                    .set(birdHat, {rotation:12, x:'+=6'})
                    .to(bird, 1.4, {y:'-=39', autoAlpha:1, ease: Power4.easeInOut})     
                    .add('bird-peek')
                    .set(birdEyes, {autoAlpha:0})
                    .set(birdEyes, {autoAlpha:1}, '+=0.2')
                    .set(birdEyes, {autoAlpha:0}, '+=0.2')
                    .set(birdEyes, {autoAlpha:1}, '+=0.2')
                    
                    .add('bird-blinks')
                    .to(bird, 0.8, {y:'-=34', ease: Power4.easeInOut})
                    .to(bird, 0.3, {y:'+=8', ease: Back.easeInOut, onComplete:showplug})
                    .to(birdHat, 0.4, {y:'-=12'}, '-=0.6')
                    .to(birdHat, 0.4, {y:0, rotation:0, x:0, onComplete: blinkLoop}, '-=0.3')
                ;
            function blinkLoop() {
                const birdBlinkLoop = new TimelineMax({repeat: -1, repeatDelay:4});

                birdBlinkLoop
                .set([birdEyes,plug], {autoAlpha:0})
                .set([birdEyes,plug], {autoAlpha:1}, '+=0.2')
                .set([birdEyes,plug], {autoAlpha:0}, '+=1.2')
                .set([birdEyes,plug], {autoAlpha:1}, '+=0.2')
                birdBlinkLoop
            }
                function showplug() {
                    plug.style.display='block';
                }
            return enterBirdie;
        }
    }
    
    
    
}


// PRE-LOAD IMAGES FUNCTIONALITY ------------------------------------------------------------
function preloadimages(arr) {

    var newimages = [],
        loadedimages = 0
    var postaction = function () {}
    var arr = (typeof arr != "object") ? [arr] : arr

    function imageloadpost() {
        loadedimages++
        if (loadedimages == arr.length) {
            postaction(newimages) //call postaction and pass in newimages array as parameter
        }
    }
    for (var i = 0; i < arr.length; i++) {
        newimages[i] = new Image()
        newimages[i].src = arr[i]
        newimages[i].onload = function () {
            imageloadpost()
        }
        newimages[i].onerror = function () {
            imageloadpost()
        }
    }
    return { //return blank object with done() method
        done: function (f) {
            postaction = f || postaction //remember user defined callback functions to be called when images load
        }
    }
}
