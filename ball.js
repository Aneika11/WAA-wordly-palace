import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { getDatabase, onValue, ref, set } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";

//account batabase
const firebaseConfig = {
    apiKey: "AIzaSyDUExCTxTDwGP2V9sRnXZMc4T7qYs_dnsM",
    authDomain: "webschool-8b1b8.firebaseapp.com",
    databaseURL: "https://webschool-8b1b8.firebaseio.com",
    projectId: "webschool-8b1b8",
    storageBucket: "webschool-8b1b8.appspot.com",
    messagingSenderId: "39115618234",
    appId: "1:39115618234:web:571207b2d86e3774d7cf83"
};

let app = initializeApp(firebaseConfig);
let db = getDatabase();

let serverData = {
    wordOfTheDay: '',
    isLogedIn: false,
    accountData: null,
    accountReference: null,
    accountName: null,
    doesAccountExsist(userName, getpassword) {
        this.accountReference = ref(db, `accounts/${userName}`);
        onValue(this.accountReference, (snap) => {
            //console.log(snap.val())
            if (snap.val()) {
                if (getpassword === snap.val().password) {
                    this.isLogedIn = true
                } else {
                    this.isLogedIn = 'wrong password';
                }
            } else {
                this.isLogedIn = 'invaled Username';
            }
        });
            //console.log(returnThisAccount)
    },
    getAccountData(userName, password) {
        onValue(this.accountReference, (snap) => {
            this.accountData = snap.val()
            console.log(snap.val());
        });
        this.isLogedIn = true;
        console.log(this.accountData);
        localStorage.setItem("username", this.accountData.name);
        return 'successfully logged in'
    },
    creatAccount(userName, password, confirmpassword) {
        this.accountReference = ref(db, `accounts/${userName}`);
        onValue(this.accountReference, (snap) => {
            if (snap.val()) {
                return false
                // console.log(snap.val())
            } else {
                if (password === confirmpassword) {
                    this.isLogedIn = true;
                    set(this.accountReference, {
                        password: password,
                        name: userName,
                        lookedupwords: {
                            0: "irony",
                            1: true,
                            2: false,
                        }
                    });
                    onValue(this.accountReference, (snap2) => {
                        this.accountData = snap2.val();
                        this.accountName = snap2.val().name;
                    })
                    console.log('account was created', this.isLogedIn)
                    return true
                } else {
                    console.log('password did not match', this.isLogedIn)
                    return false
                }
            }
        });
    },
    signOutNow() {
        this.isLogedIn = false;
        this.accountData = null;
        this.accountReference = null;
        this.accountName = null;
    },
    getWords() {
        console.log(this.accountData.lookedupwords);
        return this.accountData.lookedupwords;
    },
    addNewWord(wordToAdd) {
        if (!this.accountData.lookedupwords.includes(wordToAdd)) {
            this.accountData.lookedupwords.push(wordToAdd)
            console.log()
            set(this.accountReference, {
                password: this.accountData.password,
                name: this.accountData.name,
                lookedupwords: this.accountData.lookedupwords
            })
        }
    },
    getSigninData(ref) {
        ththis.accountReference = ref(db, `accounts/${ref}`);
        onValue(this.accountReference, (snap) => {
            this.accountData = snap.val()
            console.log(snap.val());
        });
    }
}

let getLogin = document.getElementById("Login");
let getLoginFormDiv = document.getElementById("sign-in-form-div")
let getLoginForm = document.getElementById("sign-in-form")
let loginAllet = document.getElementById("signin-allert")


let getSignUp = document.getElementById("SignUp");
let getSignUpFormDiv = document.getElementById("sign-up-form-div")
let getSignUporm = document.getElementById("sign-up-form")
let signUpAllet = document.getElementById("signup-allert")

let getSignOut = document.getElementById("SignOut")
let setUserName = document.getElementById("UserName");

//let signin
getLogin.addEventListener('click', (e) => { 
    getLoginFormDiv.style.display = "block";
})

getLoginForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let userAccountName = getLoginForm[0].value;
    let userAccountPassword = getLoginForm[1].value;
    serverData.doesAccountExsist(userAccountName, userAccountPassword)
    setTimeout(() => {
        let validAccount = serverData.isLogedIn
        if (validAccount === 'invaled Username') {
            loginAllet.innerText = "Invaled Username";
        } else if (validAccount === 'wrong password') {
            loginAllet.innerText = "Wrong password";
        } else {
            loginAllet.innerText = 'logIn succesful';
            serverData.getAccountData(userAccountName, userAccountPassword)
            setTimeout(() => {
                setUserName.innerText = `Welcome ${serverData.accountData.name}`;

            }, 250)
            setTimeout(() => {
                getLoginFormDiv.style.display = 'none'
            }, 250)
            loginAllet.innerText = '';
            getSignUp.style.display = "none"
            getLogin.style.display = 'none'
            getSignOut.style.display = "block"

        }
    }, 1000)
    setTimeout(() => {
        setUserName.innerText = `${serverData.accountData.name}`;
    }, 5000)
})
// signUP form
getSignUp.addEventListener('click', (e) => {
    getSignUpFormDiv.style.display = "block";
})

getSignUporm.addEventListener('submit', (e) => {
    e.preventDefault()
    let userAccountName = getLoginForm[0].value;
    let userAccountPassword = getLoginForm[1].value;
    serverData.doesAccountExsist(userAccountName, userAccountPassword)
    
    setTimeout(() => {
        let validAccount = serverData.isLogedIn
        if (validAccount === 'invaled Username') {
            signUpAllet.innerText = "Invaled Username";
        } else {
            signUpAllet.innerText = "Username has been taken"
        }
    },1000)
})


// gets the canvas element
const canvasHere = document.querySelector('canvas');

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
    constructor(x, y, velx, vely, size, color,textTOadd ,id) {
        this.x = x; // horizontal position of the ball
        this.y = y; // vertical position of the ball
        this.velx = velx; // velocity x added to coordinate x when we animate our ball
        this.vely = vely; // velocity y added to coordinate y
        this.size = size; // size is a radius of the ball
        this.color = color; // fill ball shape with given color
        this.textTOadd = textTOadd;
        this.id = id;
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
        ctx.font = "25.5px Fira Sans";
        ctx.shadowColor = 'black';
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;

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
        // canvasHere.width = width;
        // canvasHere.height = height;
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
for (let i = 0; i < 20;i++){
    let word;
    // api here
    fetch("https://api.api-ninjas.com/v1/randomword/?key=puHp1RTi4iddWO3YYmNuXQ==lTdWygeqoi5P3jQz").then(res => res.json()).then(data => {
        word = data.word
        let size = 0;
        
        setTimeout(() => {
            //console.log(word)
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
                ballnumber
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
    balls.forEach( (element)=> {
        if (x > (element.x - 68) && x < (element.x + 68) && y > (element.y - 68) && y < (element.y + 68)) {
            // word
            console.log(element.textTOadd)
        }
    });
    balls[0].textTOadd = "noijo"
    //console.log(balls[0],x,y,balls[0].size)

}, false);