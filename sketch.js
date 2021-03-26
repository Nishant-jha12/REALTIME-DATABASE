//step 1
var database;
var position;

var ball;

function setup(){
    createCanvas(500,500);

    //step 2
    database = firebase.database();
    
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    //step 3 - read data
    ///function to read data is .on("value",function1,function2)
    //function1 is called if there is some "value" inside the database
    //function2 is called if there is no data
    var ballPositionRef = database.ref("ball/position");
    ballPositionRef.on("value",readPosition,showError);


}

function draw(){
    background("pink");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();

}

function readPosition(data){
    console.log(data)
    position = data.val(); //.val() converts the data to JSON format, key: value
    console.log(position.x);
    ball.x = position.x;
    ball.y = position.y;
}

function changePosition(x,y){
    //write data
    //function to write data .set() and .update()
    database.ref("ball/position").set({
        x:position.x+x,
        y:position.y+y
    })
   
}

function showError(){
    console.log("no data");
}