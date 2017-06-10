/**
 * Created by Admin on 2017/6/10.
 */

var app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor: 0x1099bb});
document.body.appendChild(app.view);

var number = new PIXI.Text('2048game', {fontSize: 120});
number.anchor.set(0.5)
number.x = window.innerWidth / 2;
number.y = window.innerHeight / 4.5;
app.stage.addChild(number);

var grid = []
for (var i = 0; i < 4; i++) {
    grid[i] = [0, 0, 0, 0];
}
function generateRandom() {
    return Math.floor(Math.random()*4)
}

var cowIndex=generateRandom()
var rowIndex=generateRandom()
grid[cowIndex][rowIndex]=2

for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
        drawCell(i,j)
    }
}

function drawCell(cowIndex,rowIndex) {
    var color = 0xFFFAFA
    if(grid[cowIndex][rowIndex]===2){
        color = 0xFFFF33
    }
    var graphics = new PIXI.Graphics();
    graphics.beginFill(color, 0.9);
    graphics.drawRoundedRect((window.innerWidth - 165 * 4) / 2 + cowIndex * 165, (window.innerHeight - 165 * 4) / 1.8 + rowIndex * 165, 160, 160, 15);
    app.stage.addChild(graphics)

    if(grid[cowIndex][rowIndex]!=0) {
        var number = new PIXI.Text(grid[cowIndex][rowIndex], {fontSize: 100});
        number.anchor.set(0.5)
        number.x = (window.innerWidth - 165 * 4) / 2 + cowIndex * 165 + 165 / 2;
        number.y = (window.innerHeight - 165 * 4) / 1.8 + rowIndex * 165 + 165 / 2;
        app.stage.addChild(number);
    }
}

document.addEventListener('keydown',function (event) {
    if(event.key==='ArrowLeft'){
        console.log(event)
    }
})



