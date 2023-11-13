
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
        box.style.backgroundColor = "red";

        this.element.appendChild(box);
        this.box = box;
    }
    render(position) {
        this.box.style.top = position + "px";
    }
}

class Box {
    constructor() {
        this.position = 0;
        this.speed = 0;
    }
    runLoop() {
        this.speed++;
        this.position += this.speed;
    }
    moveUp() {
        this.speed = -20;
    }
}

class Game {
    constructor(element) {
        this.renderer = new Renderer(element);
        this.box = new Box();
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
        let counter = 0;
        let timer = setInterval(() => {
            counter++;
            this.box.runLoop();
            if (this.box.position < 0) {
                this.isRunning = false;
                clearInterval(timer);
                alert("Oberer Rand erreicht: Gameover, " + counter + " Punkte!");
            }
            if (this.box.position > this.element.clientHeight - 20) {
                this.isRunning = false;
                clearInterval(timer);
                alert("Unterer Rand erreicht: Gameover, " + counter + " Punkte!");
            }
            if (this.isRunning) {
                this.renderer.render(this.box.position);
            }
        }, 25);

    }
}

let game = new Game(document.getElementById("game"));
game.start();