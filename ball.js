// gets the canvas element
const canvasHere = document.querySelector('canvas');
let discription = document.getElementById("discription")
let name = document.getElementById("name")
let meaning = document.getElementById("meaning")
let example = document.getElementById("example")
let chooseWord = document.getElementById("box-content")
let container = document.getElementById("container")
let audio = document.getElementById("audio-btn")

// canvasHere.style.background = "red"


// gets the width and height of browser viewport
const width = window.innerWidth-20;
const height = window.innerHeight-20;

//   set the width and height of canvas equal to browser viewport
canvasHere.width = width;
canvasHere.height = height;

//   call the getContext method to draw 2d shape
const ctx = canvasHere.getContext('2d');
// let elemLeft = ctx.offsetLeft + ctx.clientLeft;
// let elemTop = ctx.offsetTop + ctx.clientTop;
// create Ball class
class Ball {
    constructor(x, y, velx, vely, size, color,textTOadd ,id,savedDefinition, savedPronounciation) {
        this.x = x; // horizontal position of the ball
        this.y = y; // vertical position of the ball
        this.velx = velx; // velocity x added to coordinate x when we animate our ball
        this.vely = vely; // velocity y added to coordinate y
        this.size = size; // size is a radius of the ball
        this.color = color; // fill ball shape with given color
        this.textTOadd = textTOadd;
        this.id = id;
        this.savedDefinition = savedDefinition;
        this.savedPronounciation = savedPronounciation;
    }

    // create draw func
    drawBall() {
        ctx.beginPath(); // start drawing
        ctx.fillStyle = this.color; // fill ball shape with given color
        // x and y is center of the ball
        // size is radius of the ball
        // 0 is a start point of degree around radius of the ball
        // 2 * Math.PI is an end point which is equivalent to 360 degree
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill(); // finish drawing
        ctx.font = '25px Times New Roman'
        ctx.strokeText(this.textTOadd, this.x - (this.size-5), this.y+5)
    }

    // create update func
    updateBall() {
        // if x and y position is greater than or less than
        // browser viewport than balls turn another direction
        if (this.x + this.size >= width || this.x - this.size <= 0) {
            this.velx = -this.velx;
        }

        if (this.y + this.size >= height || this.y - this.size <= 0) {
            this.vely = -this.vely;
        }

        // x and y velocity added to x and y coordinate
        // everytime updateBall func is called
        this.x += this.velx;
        this.y += this.vely;
    }
}

//   create random number generator func
function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

//   create some balls and store in an array
const balls = [];
let ballnumber = 0;
for (let i = 0; i < 25;i++){
    let word;
    // api here
    fetch("https://random-words-with-pronunciation.p.rapidapi.com/word?rapidapi-key=d90feb3493msh188349b87904e98p1e8634jsne0ad3411d51a").then(res => res.json()).then(data => {
        // console.log(data)
        word = data[0].word

        let size = 0;
        
        setTimeout(() => {
            console.log(word)
            for (let i = 0; i < word.length; i++) {
                if (i < 4) {
                    size += 7.75
                } else {
                    size += 5.5
                }
            }
            let xspeed = random(size, width - size);
            let yspeed = random(size, height - size);

            while (xspeed === 0) {
                xspeed = random(size, width - size);
            }
            while (yspeed === 0) {
                yspeed = random(size, height - size);
            }
            const ball = new Ball(
                random(size, width - size),
                random(size, height - size),
                random(-2, 2),
                random(-2, 2),
                // 0,0,
                size,
                `rgb(${random(100, 255)}, ${random(100, 255)}, ${random(100, 255)})`,
                word,
                ballnumber,
                 data[0].definition,
                 data[0].pronunciation
            );
            balls.push(ball);
            ballnumber++
        }, 1000)
    })

    //
}

//   create loop func
function loop() {
    // cover the previous frame's drawing before the next one is drawn
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);

    // run necessary func
    for (let i = 0; i < balls.length; i++) {
        balls[i].drawBall();
        balls[i].updateBall();
    }

    // lets calls loop func itself over and over again
    //  and make animation smooth
    requestAnimationFrame(loop);
}

// finaly call the loop func once ot start
loop();
canvasHere.addEventListener('click', function (event) {
    let x = event.layerX ;
    let y = event.layerY -28;
    // console.log(event)
    // Collision detection between clicked offset and element.
    let wordToSearch;
    balls.forEach( (element)=> {
        element.fillStyle = 'blue';
        
        if (x > (element.x - 68) && x < (element.x + 68) && y > (element.y - 68) && y < (element.y + 68)) {
            // word
            console.log(element.textTOadd)
            // fetch(`https://wordsapiv1.p.rapidapi.com/words/${element.textTOadd}/?rapidapi-key=a814b05c93msh2cd39afebec73fap1d509cjsnb19622b7a4fa`)
            //       .then(res => res.json()).then(data2 => {
            //         console.log(data2)
          
                
                    
                        name.innerText = `Word: ${element.textTOadd}`
                        meaning.innerText = `Meaning: ${element.savedDefinition} `
                        example.innerText = `Pronunciation: ${element.savedPronounciation}`
                        audio.innerText = "Audio"
    
                        discription.style.cssText = `backdrop-filter: blur(16px);
                        background-color: rgba(17,25,40,0.75);
                        border-radius: 12px;
                        border: 1px solid rgba(255,255,255,0.125);
                        width:700px;
                        font-family: 'Aref Ruqaa Ink', serif;
                        font-family: 'Source Sans Pro', sans-serif;
                        padding: 10px;
                        position: absolute;
                        left: calc(50% - 350px);
                        font-size: 30px;
                        color: white;
                        -webkit-backdrop-filter: blur(16px);
                        `

                        container.style.display = "none";

                      
                        audio.addEventListener("click", () => {
                            
                            speaks = [
                                {
                                  "name": "Alex",
                                  "lang": "en-US"
                                }
                            ]
                         const msg = new SpeechSynthesisUtterance();
                            msg.volume = 1; 
                            msg.rate = 1; 
                            msg.pitch = 1.5; 
                            msg.text  = `${element.textTOadd}` ;
                        speechSynthesis.speak(msg);
                        toggle()
                       
                        function toggle() {
                            speechSynthesis.cancel()
                            speechSynthesis.speak(msg);
                        }
                        })
                        

                    
             





                 
            }
    })

    
    balls[0].textTOadd = "noijo"
    //console.log(balls[0],x,y,balls[0].size)

}, false);