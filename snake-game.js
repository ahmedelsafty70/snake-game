let direction = "";
var stop = false;
let countWantToBeDeleted = 0;
let counterForNumberOfFoodFound = 0;
var randomBall;
var counterOfGrowth = 0;
var myGamePiece;
var ColorFlag=1;
var colors='';

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = 500;
        this.canvas.height =500;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 200);
        window.addEventListener('keydown', function(e){
            myGameArea.key = e.keyCode;
        })

    },
    clear: function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

}


function startGame(){
    //myGamePiece = new createSquare(10, 120, "red", 30, 30);
    myGameArea.key = 39;
    myGamePiece = [ new createSquare(72, 120, "red", 30, 30), new createSquare(42, 120, "blue", 30, 30),new createSquare(12, 120, "green", 30, 30)];
}


function updateGameArea(){
    myGameArea.clear();
    hitWall();
    counterForNumberOfFoodFound === 0 ?  funcOfRandomFood(): 0; //creating a food
   
    //setTimeout(() => { randomBalls }, 1000);
    if(!stop){
        for(const index in myGamePiece){
            myGamePiece[index].newPos();
        }
    }
    for(const index in myGamePiece){
        myGamePiece[index].update();
    }
    
    checkingForEatingTheFood() ? 0 : randomBall.update();
    hitItSelf() ? randomBall.update():0;

}

function createSquare(x,y,color,width,height){
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.color = color;
    this.x = x;
    this.y = y;

    this.update = function(){
        ctx = myGameArea.context;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function(){
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

function returnRandomNoInRange(){
    return Math.floor(Math.random() * (470 - 0 + 1) + 0);
}

function funcOfRandomFood(){
    let x = returnRandomNoInRange();
    let y = returnRandomNoInRange();
    randomBall = new createSquare(x, y, "black", 10, 10);
    counterForNumberOfFoodFound++;
}

function checkingForEatingTheFood(){
    if(myGamePiece[0].x < randomBall.x +randomBall.width &&
        myGamePiece[0].x + myGamePiece[0].width > randomBall.x &&
        myGamePiece[0].y < randomBall.y + randomBall.height &&
        myGamePiece[0].y + myGamePiece[0].height > randomBall.y){
        counterForNumberOfFoodFound--;
        growing();
        return true;
    }
}

function hitItSelf(){
{
    for (let index = 1; index < myGamePiece.length; index++) {

        if(myGamePiece[0].x < myGamePiece[index].x +myGamePiece[index].width &&
            myGamePiece[0].x + myGamePiece[0].width > myGamePiece[index].x &&
            myGamePiece[0].y < myGamePiece[index].y + myGamePiece[index].height &&
            myGamePiece[0].y + myGamePiece[0].height > myGamePiece[index].y){
            stop = true;
            countWantToBeDeleted == 0 ?  console.log("YOU LOST!") : 0;
            countWantToBeDeleted++;
            return true;

        }
    }
    
}
}

i=0;
function growing(){
 //var newHead = new createSquare(myGamePiece[myGamePiece.length()-1].x + 30, myGamePiece[myGamePiece.length()-1].y + 30, "red", 30, 30);
 switch (ColorFlag) {
    case 1:
        ColorFlag=2;
        colors='red'
        break;
    case 2:
        ColorFlag=3;
        colors='blue'

        break;
    case 3:
        ColorFlag=1;
        colors='green'

        break;    
    default:
        break;
 }
 myGamePiece.push(new createSquare(72, 120, colors, 30, 30));
 //i++;
}

function shifting(){

    for(let i=myGamePiece.length - 1; i>=1; i--){
        myGamePiece[i].x = myGamePiece[i-1].x;
        myGamePiece[i].y = myGamePiece[i-1].y;
    }


}



function hitWall(){
    if((myGamePiece[0].x >= 0 && myGamePiece[0].x < 455)  && (myGamePiece[0].y >=0 && myGamePiece[0].y < 470)){
        switch(true){
            case myGameArea.key == 37 && direction !== "RIGHT":
                
                if(!stop)
                {    
                    myGamePiece[0].speedX = -30;
                    myGamePiece[0].speedY=0;
                    direction = "LEFT";
                    shifting();
                }    
                break;
            case myGameArea.key == 39 && direction !== "LEFT":
              
                if(!stop)
                {       
                    myGamePiece[0].speedX = 30;
                    myGamePiece[0].speedY=0;
                    direction = "RIGHT";
                             shifting();
                }                    
                break;
            case myGameArea.key == 38 && direction !== "UP":
               
                if(!stop)
                {      
                    myGamePiece[0].speedY = -30;
                    myGamePiece[0].speedX=0;
                    direction = "DOWN";
                              shifting();
                }                    
                break;
            case myGameArea.key == 40 && direction !== "DOWN":
                
                if(!stop)
                {              
                    myGamePiece[0].speedY = 30;
                myGamePiece[0].speedX=0;
                direction = "UP";
                  shifting();
                }                    
                break;
            
            default:
                if(!stop)
                 shifting();
   
        }
    }else{
        stop = true;
        countWantToBeDeleted == 0 ?  console.log("YOU LOST!") : 0;
        countWantToBeDeleted++;
        
    }
}

