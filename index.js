/**
 * Created by Admin on 2017/6/10.
 */

var app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor: 0x1099bb});
document.body.appendChild(app.view);

var basicText = new PIXI.Text('2048game', {fontSize: 120});
basicText.anchor.set(0.5)
basicText.x = window.innerWidth / 2;
basicText.y = window.innerHeight / 4.5;
app.stage.addChild(basicText);

var grid = []
for (var i = 0; i < 4; i++) {
    grid[i] = [0, 0, 0, 0];
}
for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
        var graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFFAFA, 0.25);
        graphics.drawRoundedRect(window.innerWidth / 6.3+j*165, window.innerHeight / 3+i*165, 160, 160, 15);
        app.stage.addChild(graphics)
    }

}