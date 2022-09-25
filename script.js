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
    isLogedIn: false,
    accountData: null,
    accountReference: null,
    doesAccountExsist(userName, getpassword) {
        this.accountReference = ref(db, `accounts/${userName}`);
        onValue(this.accountReference, (snap) => {
            if (snap.val()) {
                this.isLogedIn = getpassword === snap.val().password ? true : 'wrong password';
            } else {
                this.isLogedIn = 'invaled Username';
            }
        });
    },
    getAccountData() {
        onValue(this.accountReference, (snap) => this.accountData = snap.val() );
        this.isLogedIn = true;
    },
    creatAccount(userName, password) {
        this.accountReference = ref(db, `accounts/${userName}`);
        this.isLogedIn = true;
        set(this.accountReference, {
            password: password,
            name: userName,
            lookedupwords: [
                {
                    word: "hi",
                    definition: "saying hi",
                    youdefinition: "have fun"
                }
            ],
            allMyWords: ["hi"]
        });
        onValue(this.accountReference, (snap) => {
            this.accountData = snap.val();
        })
    },
    addNewWord(wordToAdd, definition, yourDefinitionHere) {
        if (!this.accountData.allMyWords.includes(wordToAdd)) {
            let newword = { word: wordToAdd, definition, yourDefinition: yourDefinitionHere };
            this.accountData.lookedupwords.push(newword)
            this.accountData.allMyWords.push(wordToAdd)
            set(this.accountReference, {
                password: this.accountData.password,
                name: this.accountData.name,
                lookedupwords: this.accountData.lookedupwords,
                allMyWords: this.accountData.allMyWords
            })
        }
    },
}
// nav elementes 
let setUserName = document.getElementById("user-name");
let getMyWordsbutton = document.getElementById("get-my-words");
let getSignOut = document.getElementById("sign-out");

// first icon
let container = document.getElementById("container");

// word discription
let discription = document.getElementById("discription");
let name = document.getElementById("name");
let meaning = document.getElementById("meaning");
let example = document.getElementById("example");
let setMyDefinitionBox = document.getElementById("set-my-definition");
let getSaveWordButton = document.getElementById("save-my-word");
let audio = document.getElementById("audio-btn");

// Sing In items
let getLogin = document.getElementById("login");
let getLoginFormDiv = document.getElementById("sign-in-form-div")
let getLoginForm = document.getElementById("sign-in-form")
let loginAllet = document.getElementById("sign-in-allert")

// Sign Up items
let getSignUp = document.getElementById("sign-up");
let getSignUpFormDiv = document.getElementById("sign-up-form-div")
let getSignUporm = document.getElementById("sign-up-form")
let signUpAllet = document.getElementById("sign-up-allert")

// login and sign up back ground
let loginBackground = document.getElementById("background-for-login")
let blur = document.getElementById("blur-background")
let backgroundBox = document.getElementById("my-words-main")

// saved words holder
let getWordHolders = document.getElementById("my-words-holder")
let exitWords = document.getElementById("exit-words");
let wordContainer = document.getElementById("word-container")
let getWordDefinition = document.getElementById("get-word-definition")
let backToMyWords = document.getElementById("back-to-my-words")
let myword = document.getElementById("my-word")
let savedDefinitionHere = document.getElementById("saved-definition")
let yourDefinition = document.getElementById("your-definition")

// logout 
getSignOut.addEventListener('click', () => {
    // hide background elements
    getMyWordsbutton.style.display = "none";
    getWordHolders.style.display = "none";
    getSignOut.style.display = "none";
    discription.style.display = "none";
    setUserName.innerText = '';

    // show initial elements
    blur.style.display = "block";
    getSignUp.style.display = "block";
    getLogin.style.display = 'block';
    loginBackground.style.display = "block";
    getLoginFormDiv.style.display = "block";

    // reomve information
    serverData.accountData = null;
    serverData.isLogedIn = false;
    serverData.accountReference = null;
})

// get login form
getLogin.addEventListener('click', (e) => {
    getLoginFormDiv.style.display = "block";
    getSignUpFormDiv.style.display = "none";
    // clear sign up form
    getSignUporm[0] = "";
    getSignUporm[1] = "";
    getSignUporm[2] = "";
})
// get sign up form
getSignUp.addEventListener('click', (e) => {
    getSignUpFormDiv.style.display = "block";
    getLoginFormDiv.style.display = "none";
    // clear login form
    loginAllet.innerText = "";
    getLoginForm[0].value = "";
    getLoginForm[1].value = "";
})

// login form EventListener
getLoginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // get input value
    let userAccountName = getLoginForm[0].value;
    let userAccountPassword = getLoginForm[1].value;
    // check if username exsist
    serverData.doesAccountExsist(userAccountName, userAccountPassword);
    // await results
    setTimeout(() => {
        let validAccount = serverData.isLogedIn;
        if (validAccount === "invaled Username") {
            loginAllet.innerText = "Invaled Username";
        } else if (validAccount === "wrong password") {
            loginAllet.innerText = "Wrong Password";
        } else {
            serverData.getAccountData();
            loginAllet.innerText = "Login was succesful";
            // give time to user to see that they where loged in
            setTimeout(() => {
                // remove in initial elements
                blur.style.display = "none";
                getLogin.style.display = "none";
                getSignUp.style.display = "none";
                loginBackground.style.display = "none";
                getLoginFormDiv.style.display = "none";
                // clear login form
                loginAllet.innerText = "";
                getLoginForm[0].value = "";
                getLoginForm[1].value = "";
                // display log in elements
                getSignOut.style.display = "block";
                getMyWordsbutton.style.display = "block";
                setUserName.innerText = `Welcome ${serverData.accountData.name}`;
            }, 2000);
            setTimeout(() => {
                setUserName.innerText = `${serverData.accountData.name}`;
            }, 5000);
        }
    }, 1000);
});

// signUP form
getSignUporm.addEventListener('submit', (e) => {
    e.preventDefault();
    // get input value
    let userAccountName = getSignUporm[0].value;
    let userPassword = getSignUporm[1].value;
    let confirmuserPassword = getSignUporm[2].value;
    // check if username is taken
    serverData.doesAccountExsist(userAccountName);
    // await results
    setTimeout(() => {
        let validAccount = serverData.isLogedIn;
        if (validAccount === 'invaled Username') {
            if (userPassword !== confirmuserPassword) {
                signUpAllet.innerText = "Password does not match";
            } else {
                serverData.creatAccount(userAccountName, userPassword);
                signUpAllet.innerText = "Account was created";
                // give time to user to see that they where loged in
                setTimeout(() => {
                    // remove in initial elements
                    blur.style.display = "none";
                    getLogin.style.display = "none";
                    getSignUp.style.display = "none";
                    loginBackground.style.display = "none";
                    getLoginFormDiv.style.display = "none";
                    // clear sign up form
                    getSignUporm[0] = "";
                    getSignUporm[1] = "";
                    getSignUporm[2] = "";
                    // display log in elements
                    getSignOut.style.display = "block";
                    getMyWordsbutton.style.display = "block";
                    setUserName.innerText = `Welcome ${serverData.accountData.name}`;
                }, 2000);
                setTimeout(() => {
                    setUserName.innerText = `${serverData.accountData.name}`;
                }, 5000);
            };
        } else {
            signUpAllet.innerText = "Username has been taken"
        };
    }, 1000);
});

// geting saved words
getMyWordsbutton.addEventListener('click', () => {
    discription.style.display = "none";
    wordContainer.innerHTML = "";
    backgroundBox.style.display = "block";
    getWordHolders.style.display = "block";
    for (let i = 1; i < serverData.accountData.lookedupwords.length; i++) {
        let wordButton = document.createElement('button')
        wordButton.innerText = serverData.accountData.lookedupwords[i].word;
        wordButton.style.borderRadius = "10px";
        wordButton.style.margin = "10px";
        wordButton.style.fontSize = "20px";
        
        wordButton.addEventListener('click', () => {
            console.log(serverData.accountData)
            getWordDefinition.style.display = "block";
            wordContainer.style.display = "none";
            savedDefinitionHere.innerText = serverData.accountData.lookedupwords[i].definition;
            yourDefinition.innerText = serverData.accountData.lookedupwords[i].yourDefinition;
            myword.innerText = serverData.accountData.lookedupwords[i].word;
        })
        wordContainer.append(wordButton);
    }
})
backToMyWords.addEventListener('click', () => {
    getWordDefinition.style.display = "none"
    wordContainer.style.display = 'block'
})

getSaveWordButton.addEventListener('click', () => {
    serverData.isLogedIn = true
    serverData.addNewWord(name.innerText, meaning.innerText, setMyDefinitionBox.value)
})

exitWords.addEventListener('click', () => {
    backgroundBox.style.display = "none";
    getWordHolders.style.display = "none";
})

// gets the canvas element
const canvasHere = document.querySelector('canvas');

// gets the width and height of browser viewport
const width = window.innerWidth - 20;
const height = window.innerHeight - 20;

//   set the width and height of canvas equal to browser viewport
canvasHere.width = width;
canvasHere.height = height;

//   call the getContext method to draw 2d shape
const ctx = canvasHere.getContext('2d');
// let elemLeft = ctx.offsetLeft + ctx.clientLeft;
// let elemTop = ctx.offsetTop + ctx.clientTop;
// create Ball class
class Ball {
    constructor(x, y, velx, vely, size, color, textTOadd, id, savedDefinition, savedPronounciation) {
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
        ctx.font = "25.5px Fira Sans";
        ctx.shadowColor = 'black';
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;

        ctx.strokeText(this.textTOadd, this.x - (this.size - 5), this.y + 5)
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
for (let i = 0; i < 20; i++) {
    let wordh;
    // api here
    fetch("https://random-words-with-pronunciation.p.rapidapi.com/word?rapidapi-key=d90feb3493msh188349b87904e98p1e8634jsne0ad3411d51a").then(res => res.json()).then(data => {
        // console.log(data)
        wordh = data[0].word

        let size = 0;

        setTimeout(() => {
            //console.log(word)
            for (let i = 0; i < wordh.length; i++) {
                if (i < 4) {
                    size += 7.75
                } else {
                    size += 5.5
                }
            }
            let xspeed = random(-0.5, 0.5);
            let yspeed = random(-0.5, 0.5);

            while (xspeed === 0) {
                xspeed = random(-0.5, 0.5);
            }
            while (yspeed === 0) {
                yspeed = random(-0.5, 0.5);
            }

            const ball = new Ball(
                random(size, width - size),
                random(size, height - size),
                xspeed,
                yspeed,
                size,
                `rgb(${random(100, 255)}, ${random(100, 255)}, ${random(100, 255)})`,
                wordh,
                ballnumber,
                data[0].definition,
                data[0].pronunciation
            );
            balls.push(ball);
            ballnumber++
        }, 1000)
    })
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
    let x = event.layerX;
    let y = event.layerY - 87;
    // Collision detection between clicked offset and element.
    let wordToSearch;
    balls.forEach((element) => {
        element.fillStyle = 'blue';

        if (x > (element.x - 68) && x < (element.x + 68) && y > (element.y - 68) && y < (element.y + 68)) {
            setMyDefinitionBox.value = "";
            name.innerText = `Word: ${element.textTOadd}`
            meaning.innerText = `Meaning: ${element.savedDefinition} `
            example.innerText = `Pronunciation: ${element.savedPronounciation}`
            audio.innerText = "Audio";
            discription.style.display = "block";
            container.style.display = "none";
            audio.addEventListener("click", () => {

                let speaks = [
                    {
                        "name": "Alex",
                        "lang": "en-US"
                    }
                ]
                const msg = new SpeechSynthesisUtterance();
                msg.volume = 1;
                msg.rate = 1;
                msg.pitch = 1.5;
                msg.text = `${element.textTOadd}`;
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

}, false);