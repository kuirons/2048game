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
for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
        var graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFFAFA, 0.25);
        graphics.drawRoundedRect((window.innerWidth-165*4) / 2+j*165, (window.innerHeight-165*4) / 1.8+i*165, 160, 160, 15);
        app.stage.addChild(graphics)
    }
}

function generateRandom() {
    return Math.floor(Math.random()*4)
}

var x=generateRandom()
var y=generateRandom()

var graphics = new PIXI.Graphics();
graphics.beginFill(0xFF0033, 0.25);
graphics.drawRoundedRect((window.innerWidth - 165 * 4) / 2 + x * 165, (window.innerHeight - 165 * 4) / 1.8 + y * 165, 160, 160, 15);
app.stage.addChild(graphics)

var number = new PIXI.Text('2', {fontSize: 100});
number.anchor.set(0.5)
number.x = (window.innerWidth-165*4) / 2+x*165+165/2;
number.y = (window.innerHeight-165*4) / 1.8+y*165+165/2;
app.stage.addChild(number);

