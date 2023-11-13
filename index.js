
class Renderer {
    constructor(element) {
        this.element = element;
        this.setup();
    }

    setup() {
        let box = document.createElement("div");
        box.style.position = "absolute";
        box.style.top = "20px";
        box.style.left = "20px";
        box.style.width = "20px";
        box.style.height = "20px";
        box.style.borderRadius = "50%";

        box.style.backgroundColor = "red";

        this.element.appendChild(box);
        this.box = box;
    }
    render(position) {
        this.box.style.top = position + "px";
    }
}

class Box {
    constructor(speedMultiplier = 30) {
        this.position = 0;
        this.speed = 0;
        this.speedMultiplier = speedMultiplier;
    }
    runLoop(deltaTime) {
        this.speed += 9.81 * deltaTime * this.speedMultiplier;
        this.position += this.speed * deltaTime;
    }
    moveUp() {
        this.speed = -7.5 * this.speedMultiplier;
    }
}

class Game {
    constructor(element) {
        this.renderer = new Renderer(element);
        this.box = new Box(40);
        this.element = element;
        this.isRunning = true;
        this.setup();
    }

    setup() {
        this.element.addEventListener("click", () => {
            this.box.moveUp();
        }, false);
    }

    start() {
        let lastTime = performance.now();
        let counter = 0;
        const loop = (currentTime) => {
            let deltaTime = (currentTime - lastTime) / 1000;
            lastTime = currentTime;

            counter++; // increase points
            this.box.runLoop(deltaTime);
            if (this.box.position < 0) {
                this.isRunning = false;
                alert("Reached top border: Gameover, " + counter + " Points!");
            }
            if (this.box.position > this.element.clientHeight - 20) {
                this.isRunning = false;
                alert("Reached bottom border: Gameover, " + counter + " Points!");
            }
            if (this.isRunning) {
                this.renderer.render(this.box.position);
                requestAnimationFrame(loop);
            }
        }
        requestAnimationFrame(loop);
    }
}

let game = new Game(document.getElementById("game"));
game.start();
