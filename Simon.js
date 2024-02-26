let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let tempScore = 0;

let h2 = document.querySelector("h2");
let btns = ["yellow", "red", "purple", "green"];

let tempscore = document.createElement("h2");

document.addEventListener("keypress", function(){
    if(started == false) {
        //console.log("game started");
        started = true;
        levelUp();
    }
    
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    //tempScore = level;
    h2.innerText = `Level ${level}`;
    let ranIdx = Math.floor(Math.random() * 3);
    let ranColor = btns[ranIdx];
    let ranbtn = document.querySelector(`.${ranColor}`);
    gameSeq.push(ranColor);
    console.log(gameSeq);
    gameFlash(ranbtn);
    
}

function checkAns(idx) {
    //let idx = level - 1;
    if(userSeq[idx] === gameSeq[idx]) {
       if(userSeq.length == gameSeq.length) {
       setTimeout(levelUp, 1000);
       }
    } else {
       let newScore =  highScore(level);
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br>Press any key to start <br>New High Score ${newScore}`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white"; 
        }, 150);
       
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for(btn of allbtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

function highScore(level) {
    if(tempScore < level) {
        tempScore = level;
    }
   return level;
}