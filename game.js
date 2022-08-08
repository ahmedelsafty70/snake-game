import {createSquare,updateGameArea,myGamePiece} from "./snake-game.js";

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

    myGameArea.key = 39;    
    myGameArea.start();

export {myGameArea}