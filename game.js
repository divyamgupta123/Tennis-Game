//Defining variables and constants
var canvas;
var convasContext;
var ballX = 50;
var ballSpeedX = 10;
var ballY = 50;
var ballSpeedY = 4;
var paddle1Y = 250;
var paddle2Y = 250;
var player1score = 0;
var player2score = 0;
var showWinScreen = false;

const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;
const winningScore = 5;


window.onload = function() {
	var framesPerSecond = 30;
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	canvasContext.font = "30px Arial";
	setInterval(callBoth,1000/framesPerSecond);

	canvas.addEventListener('mousedown',handleMouseClick);

	canvas.addEventListener('mousemove',function(evt){
		var mousePos = calculateMousePos(evt)
		paddle1Y = mousePos.y-(PADDLE_HEIGHT/2)
	})
}

function callBoth(){
	moveEverything();
	drawEverything();
}

//Drawing all the contents
function drawEverything(){
	colorRect(0,0,canvas.width,canvas.height,'black');//black screen

	if (showWinScreen) {
		canvasContext.fillStyle = 'white';				
	if(player1score>=winningScore){
		canvasContext.fillText("Left Play Win!!!!!",500,250);
	}
	if(player2score>=winningScore){
	canvasContext.fillText("Right Play Win!!!!!",500,250);

	}
	showWinScreen = true;
	
	canvasContext.fillText("Click to Continue",500,400);//Fill text takes the color defined in the just previous statement
	return;
	}

	drawNet();
	colorRect(0,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');//left paddle

	colorRect(canvas.width-PADDLE_THICKNESS ,paddle2Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');//Right paddle

	colorCircle(ballX, ballY, 8, 'white');//white ball

	canvasContext.fillText(player1score,100,100)
	canvasContext.fillText(player2score,canvas.width-100,100)

} 	

function colorRect(leftx,topY,width,height,drawColor){
	canvasContext.fillStyle = drawColor;
	canvasContext.fillRect(leftx,topY,width,height);
}

function colorCircle(centerX,topY,radius,drawColor){
	canvasContext.fillStyle = drawColor;//white ball
	canvasContext.beginPath();
	canvasContext.arc(centerX, topY, radius, 0,Math.PI*2,true);
	canvasContext.fill();			
}

function drawNet(){
	for(var i=0;i<canvas.height;i+=40){
		colorRect(((canvas.width/2)-1),i,2,20,'white')
	}
}


//Calulate Mouse Position
function calculateMousePos(evt){
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return{
		x:mouseX,
		y:mouseY
	};
}


//Movement of the Computer Paddle
function computerMovement(){
	var paddle2YCenter = paddle2Y+(PADDLE_HEIGHT/2)
	// 35 is used so that paddle do not shake
	if(paddle2YCenter<ballY-30){
		paddle2Y+=12;
	}
	else if(paddle2YCenter > ballY+30){
		paddle2Y-=12;
	}
}

//Controlling Movement of contents
function moveEverything(){
	if (showWinScreen) {
		return;
	}
	computerMovement();
	ballX+=ballSpeedX;
	ballY+=ballSpeedY;
	if (ballX<0){
		if(ballY>paddle1Y && ballY<paddle1Y+PADDLE_HEIGHT){
			ballSpeedX = -ballSpeedX;

			var deltaY = ballY-(paddle1Y+PADDLE_HEIGHT/2)
			ballSpeedY = deltaY*0.45;
		}
		else{
			player2score+=1;
			ballReset();
		}
	}			
	if(ballX>canvas.width){
		if(ballY>paddle2Y && ballY<paddle2Y+PADDLE_HEIGHT){
			ballSpeedX = -ballSpeedX;
			//giving the speed depending on the angle at which it touches paddles
			var deltaY = ballY-(paddle2Y+PADDLE_HEIGHT/2)
			ballSpeedY = deltaY*0.3;
		}
		else{
			player1score+=1;//Increase of score must be before ballReset()
			ballReset();
		}
	}
	if(ballY>canvas.height){
		ballSpeedY = -ballSpeedY;
	}
	if(ballY<0){
		ballSpeedY = -ballSpeedY;
	}


}

//Missing ball condition
function ballReset(){
	if(player1score>=winningScore||player2score>=winningScore){
		showWinScreen = true;
	}
	ballSpeedX = -ballSpeedX;
	ballX = canvas.width/2
	ballY = canvas.height/2
}

//Restarting Game
function handleMouseClick(evt){
	if(showWinScreen){
		player1score = 0;
		player2score = 0;
		showWinScreen = false;
	}
}