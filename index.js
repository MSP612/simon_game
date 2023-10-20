
let level = 0;
let clicked_ID;
let ls = ["green","blue","yellow","red"];
let flag=true;
let count_gameArr_ele=0;
$(".btn").click(function(e){
    clicked_ID = e.target.id;
    PressBtn(e.target.id);
    validateUserInput(e.type);
});


$("body").keypress(function(e){
    validateUserInput(e.type);
});


function GameOver(){
    $("#level-title").text("Game Over, Press Any Key to Restart"); 
    $("body").addClass("game-over");
    BtnSound("wrong");
    setTimeout(()=>{
        $("body").removeClass("game-over");
    },300);
}


function GameStart(){
    level++;
    $("#level-title").text("Level "+level);
    PressBtn(gamepattern.call());
}


function validateUserInput(type){
    if(level===0 && type==="click"){
        GameOver();
    }
    else if(type==="keypress" && level===0){
        GameStart();
    }
    else if(level != 0 && type==="click"){
        if(clicked_ID === gameArr[count_gameArr_ele]){
            count_gameArr_ele++;
            if(gameArr.length===count_gameArr_ele){
                count_gameArr_ele=0;
                setTimeout(()=>GameStart(),2000);
            }
            else{
                clicked_ID=null;
            }
        }
        else{
            GameOver();
            gameArr=[];
        }
    }
}


let gameArr=[];
function gamepattern(){
    let randomPicker=ls[Math.floor((Math.random()*10)%4)];  
    gameArr.push(randomPicker);
    return randomPicker;
}


function PressBtn(id){
    $("#"+id).addClass("pressed");
    BtnSound(id);
    setTimeout(()=>{
        $("#"+id).removeClass("pressed");
    },100); 
}


function BtnSound(id){
    switch(id){
        case "green":
            PlaySound("./sounds/green.mp3");
            break;
        case "blue":
            PlaySound("./sounds/blue.mp3");
            break;
        case "red":
            PlaySound("./sounds/red.mp3");
            break;
        case "yellow":
            PlaySound("./sounds/yellow.mp3");
            break;
        case "wrong":
            PlaySound("./sounds/wrong.mp3");
            break;
    }

}

function PlaySound(PlayFile){
    var sound = new Audio(PlayFile);
    sound.play();
}