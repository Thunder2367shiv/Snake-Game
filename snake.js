// Starting Page

let mybutton_start = document.getElementById("btn");

mybutton_start.addEventListener("click", (e) => {
    let tempe = document.getElementById("tempe");
    let strat = document.getElementById("strat");
    let tit = document.getElementById("tit");
    tempe.innerHTML = "WAIT FOR A WHILE";
    setTimeout(function () {
        music_sound.play();
        mybutton_start.innerHTML = "";
        tit.innerHTML = "";
        strat.innerHTML = "";
        mybutton_start.classList.remove("mybutton");
        strat.classList.remove("start");
        tit.classList.remove("title");
        tempe.classList.remove("temp");
        document.body.style.backgroundImage = 'url("./snakefull.jpg")';
        document.body.style.backgroundSize = "100vw 100vh";
    }, 5000);
});


// Game constants & variables
let inputD = { x: 0, y: 0 };
let speed = 8;
let score = 0;
let lasttime = 0;
let snakearr = [
    { x: 13, y: 15 }
];
food = { x: 6, y: 7 };

const food_sound = new Audio('eat_and_movement.mp3');
const gameover_sound = new Audio('game_over.mp3');
const move_sound = new Audio('direction_change.mp3');
const music_sound = new Audio('background_music.mp3');

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lasttime) / 1000 < 1 / speed) {
        return;
    }
    lasttime = ctime;
    gameEngine();
}

function is_collide(snake) {
    // bump yourself
    for(let i = 1; i< snake.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
        if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
            return true;
        }
    // return false;
}

function gameEngine() {
    // part 1: SNake location update
    if (is_collide(snakearr)) {
        gameover_sound.play();
        music_sound.pause();
        inputD = { x: 0, y: 0 };
        alert("GAME OVER .........PRESS any key to CONTINUE");
        snakearr = [{ x: 13, y: 15 }];
        music_sound.play();
        score = 0;
        scorebox.innerHTML = "Score: " + score;
    }

    // if snake eaten the food score++ and food regenrate

    if (snakearr[0].y === food.y && snakearr[0].x === food.x) {
        food_sound.play();
        snakearr.unshift({ x: snakearr[0].x + inputD.x, y: snakearr[0].y + inputD.y })
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
        score += 1;
        scorebox.innerHTML = "Score: " + score;
        if(score > high){
            high = score;
            localStorage.setItem("high", JSON.stringify(high));
            hiscoreb.innerHTML = "HiScore: " + high;
        }
    }


    // snake move
    for (let i = snakearr.length - 2; i >= 0; i--) {
        snakearr[i + 1] = { ...snakearr[i] };
    }
    snakearr[0].x += inputD.x;
    snakearr[0].y += inputD.y;

    // part 2: render snake and food
    // Display Snake

    board.innerHTML = "";
    snakearr.forEach((e, index) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}



// Game_Logic
let high = localStorage.getItem("high");
if(high === null){
    highvalue = 0;
    localStorage.setItem("hiscoreb", JSON.stringify(highvalue));
}
else{
    highvalue = JSON.parse(high);
    hiscoreb.innerHTML = "High Score: " + highvalue;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    // game start
    inputD = { x: 0, y: 1 };
    move_sound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputD.x = 0;
            inputD.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputD.x = 0;
            inputD.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputD.x = -1;
            inputD.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputD.x = 1;
            inputD.y = 0;
            break;

        default:
            break;
    }
});