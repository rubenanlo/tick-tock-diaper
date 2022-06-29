// Global scope for variables used in multiple places in the code:
const board = document.getElementById("board");
// const container = document.getElementById('container')
// End of comment

class Game {
    constructor() {
        this.obstacleArr = [];
        this.targetArr = [];
        this.time = 0;
        this.obstacleInterval = null;
        this.targetInterval = null;
        this.points = 0;
        this.killThemAll = null;
        this.rankTop = "Diaper expert!!!"
        this.rankMid = "Not too bad diaper changer"
        this.rankLow = "Diaper what?"
    }

    play(){
        this.player = new Player();
        this.player.createPlayer();
        this.createMoving();
        
        this.intervalObstacles();

        this.intervalTargets();
        
        setTimeout(() => {
            this.killThemAll = new killThemAll;
            this.killThemAll.addButton();
            this.killAll();
    
        },10000);
    }

    intervalObstacles() {
        setInterval(() => {
            if (this.time % 10 === 0) {
                this.obstacle = new Obstacles();
                this.obstacleArr.push(this.obstacle);            
                this.obstacle.createObstacle();
            }
            this.time++;
            this.obstacleArr.forEach (element => {
                element.randomMove();                
                if(this.player.positionX < element.positionX + element.width &&
                    this.player.positionX + this.player.width > element.positionX &&
                    this.player.positionY < element.positionY + element.height &&
                    this.player.height + this.player.positionY > element.positionY){
                        setTimeout(() => {
                            this.endGameSummary()                            
                        },500); 
                }
            });
                            
        },500);
    }

    intervalTargets() {
        setInterval(() => {
            if (this.time % 10 === 0 && this.targetArr.length === 0) {
                this.target = new Target();
                this.target.createTarget();
                this.targetArr.push (this.target);
            }

            if (this.time % 100 === 0 && this.targetArr.length > 0) {
                this.targetArr.forEach (target => {
                    this.targetArr.shift(target);
                    target.removeTarget();
                })
            }

            this.targetArr.forEach(target => {
                if(this.player.positionX < target.positionX + target.width &&
                    this.player.positionX + this.player.width > target.positionX &&
                    this.player.positionY < target.positionY + target.height &&
                    this.player.height + this.player.positionY > target.positionY){
                        this.targetArr.shift(target);
                        this.target.removeTarget();
                        this.points += 1000;
                        this.target.addScore();
                    }
            })

            this.time++;
        },100)
    }

    killAll () {
        const btn = document.getElementById('kill');
        btn.addEventListener("click", () => {
            clearInterval(this.obstacleInterval);
            clearInterval(this.targetInterval);
            this.targetArr.forEach(target => {
                this.targetArr.shift(target);
                this.target.removeTarget();
            });
            this.obstacleArr=[];
            const obstacleElms = document.querySelectorAll('#obstacle-image');
            obstacleElms.forEach((obstacle) => obstacle.remove());            
            this.points += 1000000;
            // const btn = document.getElementById("kill");
            this.intervalObstacles;
            btn.style.animation = 'zoomOut 1s';
            this.target.addScoreDiaperize();
            setTimeout(() => {
                btn.remove();                
            }, 1000);

        })
    }

    createMoving () {
        document.addEventListener("keydown", (keyCap) => {
            switch (keyCap.key) {
                case "ArrowUp":
                    this.player.moveUp();
                    break;
                case "ArrowDown":
                    this.player.moveDown();
                    break;
                case "ArrowLeft":
                    this.player.moveLeft();
                    break;
                case "ArrowRight":
                    this.player.moveRight();
                    break;
            }
        })
    }
    
    endGameSummary(){

        clearInterval(this.obstacleInterval);
        clearInterval(this.targetInterval);
        const summary = document.createElement("section");
        board.replaceWith(summary);
        summary.id = 'summaryTable';

        const title = document.createElement("h2");
        const paragraph = document.createElement('p');
        const list = document.createElement('ul');
        summary.append(title,paragraph,list);

        const item1 = document.createElement('li');
        const item2 = document.createElement('li');
        list.append(item1, item2);

        title.innerText = `You have been diapered!!!!`;
        paragraph.innerText = `But hey, here is how you did:`;
        item1.innerText = `Points: ${this.points.toLocaleString()}`;
        item2.innerText = `Rank: ${this.establishRank()}`;
    }

    establishRank(){
        return this.points > 100000 ? this.rankTop : this.points > 10000 ? this.rankMid : this.rankLow;
    }

}

class Player {
    constructor () {
        this.positionX = 0;
        this.positionY = 40;
        this.height = 10;
        this.width = 10;
    }
    
    createPlayer() {
        this.player = document.createElement("img")
        this.player.setAttribute("src", "./CSS/Images/run.png");
        this.player.id = 'player-image';
        board.appendChild(this.player);

        this.player.style.left = `${this.positionX}vw`;
        this.player.style.bottom = `${this.positionY}vw`;
        this.player.style.width = `${this.width}vw`;
        this.player.style.height = `${this.height}vw`;
        this.player.style.position = "absolute";
    }

    moveUp(){
        this.positionY >= 40 ? 40 : this.positionY += 5;
        this.player.style.bottom = `${this.positionY}vw`;
    }
    moveDown(){
        this.positionY <= 0 ? 0 : this.positionY -= 5;
        this.player.style.bottom = `${this.positionY}vw`;
    }
    moveRight(){
        this.positionX >= 78 ? 78: this.positionX += 3;
        this.player.style.left = `${this.positionX}vw`;
    }
    moveLeft(){
        this.positionX <= 0 ? 0 : this.positionX -= 3;
        this.player.style.left = `${this.positionX}vw`;
    }

}

class Obstacles {
    constructor () {
        this.positionY = Math.floor(Math.random()*40);
        this.positionX = Math.floor(Math.random()*78);
        this.width = 8;
        this.height = 8;
    }

    createObstacle() {
        this.obstacle = document.createElement('img')
        this.obstacle.setAttribute("src", "./CSS/Images/baby-moving2.png")
        this.obstacle.id = 'obstacle-image';
        board.appendChild(this.obstacle);

        this.obstacle.style.left = `${this.positionX}vw`;
        this.obstacle.style.bottom = `${this.positionY}vw`;
        this.obstacle.style.width = `${this.width}vw`;
        this.obstacle.style.height = `${this.height}vw`;
        this.obstacle.style.position = "absolute";
    }

    moveUp(){
        this.positionY >= 40 ? 40 : this.positionY += 1;
        this.obstacle.style.bottom = `${this.positionY}vw`;
    }
    moveDown(){
        this.positionY <= 0 ? 0 : this.positionY -= 1;
        this.obstacle.style.bottom = `${this.positionY}vw`;
    }
    moveRight(){
        this.positionX >= 78 ? 78: this.positionX += 1;
        this.obstacle.style.left = `${this.positionX}vw`;
    }
    moveLeft(){
        this.positionX <= 0 ? 0 : this.positionX -= 1;
        this.obstacle.style.left = `${this.positionX}vw`;
    }

    randomMove () {
        let i = Math.floor(Math.random()*4);
        (i === 0) ? this.moveUp() : 
        (i === 1) ? this.moveDown() : 
        (i === 2) ? this.moveLeft() : 
        (i === 3) ? this.moveRight() : 
        0;
    }

}

class Target {
    constructor () {
        this.width = 10;
        this.height = 10;
        this.positionX = Math.floor(Math.random()*(78 - this.width+1));
        this.positionY = Math.floor(Math.random()*(40 - this.height+1));
        this.points = 0;
    }

    createTarget(){
        this.target = document.createElement("img");
        this.target.setAttribute("src","./CSS/Images/baby-need-change.png");
        this.target.id = "pooping";
        board.appendChild(this.target);

        this.target.style.left = `${this.positionX}vw`;
        this.target.style.bottom = `${this.positionY}vw`;
        this.target.style.width = `${this.width}vw`;
        this.target.style.height = `${this.height}vw`;
        this.target.style.position = "absolute";
    }

    removeTarget(){
        this.target.remove();
    }

    addScore() {
        const scoreElm = document.createElement('img');
        scoreElm.setAttribute('src','./CSS/Images/score.png');
        scoreElm.id = "score";
        board.appendChild(scoreElm);
        scoreElm.style.animation = 'backOutUp 1s';
        scoreElm.style.width = '5vw';

        console.log(scoreElm);
        setTimeout(() => {
            scoreElm.remove();            
        }, 500);
    }

    addScoreDiaperize() {
        const scoreElm1 = document.createElement('img');
        const scoreElm2 = document.createElement('img');
        const scoreElm3 = document.createElement('img');

        scoreElm1.setAttribute('src','./CSS/Images/score.png');
        scoreElm2.setAttribute('src','./CSS/Images/score.png');
        scoreElm3.setAttribute('src','./CSS/Images/score.png');

        scoreElm1.id = "scoreDiaperized";
        scoreElm2.id = "scoreDiaperized";
        scoreElm3.id = "scoreDiaperized";

        board.appendChild(scoreElm1);
        board.appendChild(scoreElm2);
        board.appendChild(scoreElm3);

        scoreElm1.style.animation = 'backOutUp 1s';
        scoreElm2.style.animation = 'backOutUp 1s';
        scoreElm3.style.animation = 'backOutUp 1s';

        scoreElm1.style.position = 'absolute';
        scoreElm2.style.position = 'absolute';
        scoreElm3.style.position = 'absolute';

        scoreElm1.style.left = '20vw';
        scoreElm2.style.left = '22vw';
        scoreElm3.style.left = '24vw';

        scoreElm1.style.top = '10vw';
        scoreElm2.style.top = '15vw';
        scoreElm3.style.top = '20vw';

        scoreElm1.style.width = '5vw';
        scoreElm2.style.width = '5vw';
        scoreElm3.style.width = '5vw';

        setTimeout(() => {
            scoreElm1.remove();
            scoreElm2.remove();
            scoreElm3.remove();
        }, 500);
    }



}

class killThemAll {

    addButton () {
        const btn = document.createElement('button');
        btn.id = 'kill';
        board.appendChild(btn);
        btn.style.position = 'absolute';
        btn.style.width = '30vw';
        btn.style.height = '10vw';
        btn.style.left = '32vw';
        btn.style.top = '20vw';
        btn.innerText = 'DIAPERIZE!!';
        btn.style.fontSize = '2.5vw';
        btn.style.fontFamily = 'Luna, sans-serif';
        btn.style.borderRadius = '4vw';
        btn.style.border = 'none';
        btn.style.backgroundColor = '#FFE0F2';
    }
}


const game = new Game;
game.play();