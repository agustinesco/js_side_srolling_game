window.addEventListener('load', () => {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth - 100;
    canvas.height = window.innerHeight - 100;

    class InputHandler {
        constructor(){
            this.keys = new Set([]);
            window.addEventListener('keydown', e => {this.keys.add(e.key);});
            window.addEventListener('keyup', e => {this.keys.delete(e.key);});
        }
    }

    class Player {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 200;
            this.height = 200;
            this.x = 0;
            this.y = this.gameHeight - this.height;
            this.image = document.getElementById("playerImage")
            this.frameX = 0;
            this.frameY = 0;
            this.speed = 0;
            this.jumpSpeed = 0;
            this.gravity = 2;
        }
        draw(context){
            context.fillStyle = 'white';
            context.fillRect(this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height)
        }
        update(input){
            // horizontal
            if (input.keys.has('ArrowRight')) {this.speed = 5}
            else if (input.keys.has('ArrowLeft')) {this.speed = -5}
            else {this.speed = 0}
            
            this.x += this.speed
            if (this.x < 0) {this.x = 0}
            else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width 
            
            // vertical
            if (input.keys.has('ArrowUp') && this.onGround()) {this.jumpSpeed -= 30}
            this.y += this.jumpSpeed;
            if (!this.onGround()){
                this.jumpSpeed += this.gravity;
                this.frameY = 1;
            } else {
                this.frameY = 0;
                this.jumpSpeed = 0;
            }
        }

        onGround(){
            return this.y >= this.gameHeight - this.height
        }
    }

    class Background {
        constructor(gameWidth, gameHeight){
            this.gameHeight = gameHeight;
            this.gameWidth = gameWidth;
            this.image = document.getElementById("backgroundImage");
            this.x = 0;
            this.y = 0;
            this.width = canvas.width;
            this.height = canvas.height;
            this.speed = 5;

        }
        draw(context){
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.x + this.width - this.speed, this.y, this.width, this.height);
        }
        update(){
            this.x -= this.speed
            if (this.x < 0 - this.width) this.x = 0;
        }
    }

    class Enemy {

    }


    function handleEnemies(){

    }

    function displayStatusText() {
        
    }

    const input = new InputHandler;
    const player = new Player(canvas.width, canvas.height);
    const background = new Background(canvas.width, canvas.height);

    function animate() {
        ctx.clearRect(0,0, canvas.width, canvas.height);
        background.draw(ctx);
        player.draw(ctx);
        player.update(input);
        background.update();
        requestAnimationFrame(animate);
    }
    animate();
});

window.addEventListener("resize", () => {
    const canvas = document.getElementById("canvas1");
    canvas.width = window.innerWidth - 100;
    canvas.height = window.innerHeight - 100;
})