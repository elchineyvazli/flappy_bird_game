const plane = document.createElement('div');
const game_container = document.getElementById('game_container');
const game_inside = document.getElementById('game_inside');
plane.id = "plane";
game_container.append(plane);
document.body.style.height = `${window.innerHeight}px`;
game_container.style.height = `${window.innerHeight * .9}px`;

let animationLeftValue = 0;

game_container.style.top = `${(document.body.style.height.slice(0, document.body.style.height.length - 2) - game_container.style.height.slice(0, document.body.style.height.length - 2)) / 2}px`

let count = 0;
let velocity = 0;
let h = game_container.getBoundingClientRect().height / 100;
const style = window.getComputedStyle(plane);
const backgroundImage = style.backgroundImage;

if (backgroundImage !== 'none') {
    const url = backgroundImage.slice(5, -2);
    const img = new Image();
    img.src = url;

    img.onload = () => {
        console.log(`Background Image Width: ${img.width}`);
        console.log(`Background Image Height: ${img.height}`);
    };
    plane.style.top = `${h}px`;
    plane.style.backgroundImage = `url(${backgroundImage})`;
    plane.style.width = `${Math.floor(img.width / (img.height / 70))}px`;
    plane.style.height = "70px";
} else {
    console.log('No background image found!');
}

let hList = [];


let removeElementsFromArr = setInterval(() => {
    if (hList.includes(0) == false || hList.includes(window.innerHeight - plane.getBoundingClientRect().height) == false) {
        hList = [];
    }
}, 1000);

let isStopTheGame = false;

function animate() {
    hList.push(h);
    velocity += .25;
    h += velocity;

    if (h < game_container.style.height.slice(0, document.body.style.height.length - 2) / 2) {
        h = 0;
    }

    if (h > game_container.getBoundingClientRect().height - plane.getBoundingClientRect().height) {
        h = window.innerHeight - plane.getBoundingClientRect().height;
    }

    if (h === game_container.getBoundingClientRect().height - plane.getBoundingClientRect().height || h === game_container.style.height.slice(0, document.body.style.height.length - 2) / 2) {
        velocity = 0;
    }

    if (hList.filter(value => value === game_container.style.height.slice(0, document.body.style.height.length - 2) / 2).length > 0 || hList.filter(value => value === game_container.getBoundingClientRect().height - plane.getBoundingClientRect().height).length > 0) {
        isStopTheGame = true;
    }

    plane.style.top = `${h}px`;
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
let velocityBgAnimate = 10;
let remainder = (game_inside.getBoundingClientRect().width - game_container.getBoundingClientRect().width) % velocityBgAnimate
function bgAnimation() {
    animationLeftValue -= velocityBgAnimate;
    game_inside.style.left = `${animationLeftValue}px`;
    if (Math.abs(animationLeftValue) == game_inside.getBoundingClientRect().width - game_container.getBoundingClientRect().width - remainder) {
        animationLeftValue = 0;
    }
    requestAnimationFrame(bgAnimation);
}

bgAnimation();