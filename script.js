const bird = document.createElement('div');
const game_container = document.getElementById('game_container');
bird.id = "bird";
game_container.append(bird);

let count = 0;
let velocity = 0;
let h = window.innerHeight / 100;
bird.style.top = `${h}px`;
let hList = [];

document.body.style.height = `${window.innerHeight}px`

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
