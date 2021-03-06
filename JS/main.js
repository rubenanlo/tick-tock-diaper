// Global scope for variables used in multiple places in the code:
const board = document.getElementById("board");
// End of comment


class Game {
    constructor() {
        this.obstacleArr = [];
        this.targetArr = [];
        this.time = 0; 
        this.points = 0;
        this.rankTop = "Diaper expert!!!"
        this.rankMid = "Not too bad diaper-changer"
        this.rankLow = "Diaper what?"
    }

    play(){
        this.player = new Player();
        this.player.createPlayer();
        this.createMoving();
        
        this.intervalObstacles();

        this.intervalTargets();
        
        this.updatingScore();

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
                if(this.player.positionX < element.positionX + element.width-1.5 &&
                    this.player.positionX + this.player.width-1.4 > element.positionX &&
                    this.player.positionY < element.positionY + element.height-1.7 &&
                    this.player.height + this.player.positionY-1.4 > element.positionY){
                        setTimeout(() => {
                            this.endGameSummary()                            
                        },100); 
                }
            });
        },800);
    }

    intervalTargets() {
        setInterval(() => {
            if (this.time % 10 === 0 && this.targetArr.length === 0) {
                this.target = new Target();
                this.target.createTarget();
                this.targetArr.push (this.target);
            }

            if (this.time % this.points === 0 && this.targetArr.length > 0) {
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
                        this.points += 100;
                        this.target.addScore();
                        this.updatingScore();
                        if(this.points%300 === 0) {
                            this.killThemAll = new killThemAll;
                            this.killThemAll.addButton();
                            this.killAll();
                            setTimeout(() => {
                                this.killThemAll.removeDiaperize();
                            },1500);
                        }
                    }
            })

            this.time++;
        },100)
    }

    killAll () {
        const btn = document.getElementById('kill');
        (document.getElementById('player-image') === null) ? //I added this if statement so that it does not return an error when the summary table shows up once the player colides with an obstacle.
        false :
        btn.addEventListener("click", () => {
            this.targetArr.forEach(target => {
                this.targetArr.shift(target);
                this.target.removeTarget();
            });
            this.obstacleArr=[];
            const obstacleElms = document.querySelectorAll('#obstacle-image');
            obstacleElms.forEach((obstacle) => obstacle.remove());            
            this.points += 300;
            this.updatingScore();
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
                    document.getElementById('player-image').style.transform = 'scaleX(-1)';
                    break;
                case "ArrowRight":
                    this.player.moveRight();
                    document.getElementById('player-image').style.transform = null;
                    break;
            }
        });
    }
    
    endGameSummary(){

        const summary = document.createElement("section");
        board.replaceWith(summary);
        summary.id = 'summaryTable';
        
        const title = document.createElement("h2");
        const paragraph = document.createElement('p');
        const list = document.createElement('ul');
        const btnStartOver = document.createElement ('button');
        summary.append(title,paragraph,list, btnStartOver);
        
        const item1 = document.createElement('li');
        const item2 = document.createElement('li');
        list.append(item1, item2);

        title.innerText = `You have been diapered!!!!`;
        paragraph.innerText = `But hey, here is how you did:`;
        item1.innerText = `Points: ${this.points.toLocaleString()}`;
        item2.innerText = `Rank: ${this.establishRank()}`;
        btnStartOver.innerText = `Start Over`;

        btnStartOver.addEventListener('click', () => {
            window.location.reload();
        });
    }

    establishRank(){
        return this.points > 2000 ? this.rankTop : this.points > 1000 ? this.rankMid : this.rankLow;
    }

    updatingScore () {
        document.querySelector(".score").innerText = `Score: ${this.points.toLocaleString()}`;
    }
}

class Player {
    constructor () {
        this.positionX = 0;
        this.positionY = 25;
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
        this.positionY >= 30 ? 30 : this.positionY += 5;
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
        this.positionY = Math.floor(Math.random()*30);
        this.positionX = Math.floor(Math.random()*78);
        this.width = 8;
        this.height = 8;
    }

    createObstacle() {
        this.obstacle = document.createElement('img')
        this.obstacle.setAttribute("src", "./CSS/Images/crawling.png")
        this.obstacle.id = `obstacle-image`;
        board.appendChild(this.obstacle);

        this.obstacle.style.left = `${this.positionX}vw`;
        this.obstacle.style.bottom = `${this.positionY}vw`;
        this.obstacle.style.width = `${this.width}vw`;
        this.obstacle.style.height = `${this.height}vw`;
        this.obstacle.style.position = "absolute";
    }

    moveUp(){
        this.positionY >= 30 ? 30 : this.positionY += 1;
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
        scoreElm.style.width = '20vw';
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

        scoreElm1.style.left = '0vw';
        scoreElm2.style.left = '2vw';
        scoreElm3.style.left = '4vw';

        scoreElm1.style.top = '10vw';
        scoreElm2.style.top = '15vw';
        scoreElm3.style.top = '20vw';

        scoreElm1.style.width = '20vw';
        scoreElm2.style.width = '20vw';
        scoreElm3.style.width = '20vw';

        setTimeout(() => {
            scoreElm1.remove();
            scoreElm2.remove();
            scoreElm3.remove();
        }, 500);
    }
}

class killThemAll {

    addButton () {
        this.killThemAll = document.createElement('button');
        this.killThemAll.id = 'kill';
        board.appendChild(this.killThemAll);
        this.killThemAll.style.position = 'absolute';
        this.killThemAll.style.width = '25vw';
        this.killThemAll.style.height = '8vw';
        this.killThemAll.style.left = '30vw';
        this.killThemAll.style.top = '12vw';
        this.killThemAll.innerText = 'Diaperize!!';
        this.killThemAll.style.fontSize = '2.5vw';
        this.killThemAll.style.fontFamily = 'Luna, sans-serif';
        this.killThemAll.style.borderRadius = '2vw';
        this.killThemAll.style.backgroundColor = '#FFE0F2';
        this.killThemAll.style.boxShadow = '1vw 1vw 0.4vw #405050';
        this.killThemAll.style.animation = 'zoomIn 0.5s';
    }

    removeDiaperize(){
        this.killThemAll.remove();
    }
}

const game = new Game;
game.play();