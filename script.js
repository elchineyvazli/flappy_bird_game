const bird = document.createElement('div');
const game_container = document.getElementById('game_container');
const game_inside = document.getElementById('game_inside');
bird.id = "bird";
game_container.append(bird);
document.body.style.height = `${window.innerHeight}px`;
game_container.style.height = `${window.innerHeight * .9}px`;

let animationLeftValue = 0;

game_container.style.top = `${(document.body.style.height.slice(0, document.body.style.height.length - 2) - game_container.style.height.slice(0, document.body.style.height.length - 2)) / 2}px`

let count = 0;
let velocity = 0;
let h = window.innerHeight / 100;
bird.style.top = `${h}px`;
let hList = [];


let removeElementsFromArr = setInterval(() => {
    if (hList.includes(0) == false || hList.includes(window.innerHeight - bird.getBoundingClientRect().height) == false) {
        hList = [];
    }
}, 1000);

let isStopTheGame = false;

function animate() {
    hList.push(h);
    velocity += .25;
    h += velocity;

    if (h < 0) {
        h = 0;
    }

    if (h > window.innerHeight - bird.getBoundingClientRect().height) {
        h = window.innerHeight - bird.getBoundingClientRect().height;
    }

    if (h === window.innerHeight - bird.getBoundingClientRect().height || h === 0) {
        velocity = 0;
    }

    if (hList.filter(value => value === 0).length > 0 || hList.filter(value => value === window.innerHeight - bird.getBoundingClientRect().height).length > 0) {
        isStopTheGame = true;
    }

    bird.style.top = `${h}px`;
    requestAnimationFrame(animate);
}

document.addEventListener("keydown", function (e) {
    if (e.keyCode === 32) {
        if (isStopTheGame) {
            velocity = 0;
        } else {
            velocity = -7;
        }
    }
});

animate();

function bgAnimation() {
    animationLeftValue -= 15;
    game_inside.style.left = `${animationLeftValue}px`;
    if (animationLeftValue == (game_container.getBoundingClientRect().width - Math.floor(game_inside.getBoundingClientRect().width / 15))) {
        animationLeftValue = 0;
    }
    requestAnimationFrame(bgAnimation);
    console.log(game_container.getBoundingClientRect().width);
    console.log(game_inside.getBoundingClientRect().width / 15);
}

bgAnimation();


// ((400)312)
//    712

// (( 700)12)