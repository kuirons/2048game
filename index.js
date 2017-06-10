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

var rowIndex=generateRandom()
var colunmIndex=generateRandom()
grid[rowIndex][colunmIndex]=2

function flushUi() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            drawCell(i, j)
        }
    }
}
flushUi()

function getColorByNumber(number) {
    var colorValue = {
        0: 0xFFFAFA,
        2: 0xFFFF33,
        4: 0xFF33CC
    };

    return colorValue[number];
}

function drawCell(rowIndex,colunmIndex) {
    var graphics = new PIXI.Graphics();
    graphics.beginFill(getColorByNumber(grid[rowIndex][colunmIndex]), 1);
    graphics.drawRoundedRect((window.innerWidth - 165 * 4) / 2 + colunmIndex * 165, (window.innerHeight - 165 * 4) / 1.8 + rowIndex* 165, 160, 160, 15);
    app.stage.addChild(graphics)

    if(grid[rowIndex][colunmIndex]!=0) {
        var number = new PIXI.Text(grid[rowIndex][colunmIndex], {fontSize: 100});
        number.anchor.set(0.5)
        number.x = (window.innerWidth - 165 * 4) / 2 + colunmIndex * 165 + 165 / 2;
        number.y = (window.innerHeight - 165 * 4) / 1.8 + rowIndex * 165 + 165 / 2;
        app.stage.addChild(number);
    }
}

document.addEventListener('keydown',function (event) {
    if(event.key==='ArrowRight'){
        moveCellToRight()
        flushUi()
    }
})

function moveCellToRight() {
    for (var rowIndex = 0; rowIndex < 4; rowIndex++) {
        for (var columnIndex = 2; columnIndex >= 0; columnIndex--) {
            if (grid[rowIndex][columnIndex] === 0) continue;

            var theEmptyCellIndex = findTheFirstRightCell(rowIndex, columnIndex);
            if (theEmptyCellIndex !== -1) {
                grid[rowIndex][theEmptyCellIndex] = grid[rowIndex][columnIndex];
                grid[rowIndex][columnIndex] = 0;

                if (grid[rowIndex][theEmptyCellIndex] === grid[rowIndex][theEmptyCellIndex + 1]) {
                    grid[rowIndex][theEmptyCellIndex+ 1] += grid[rowIndex][theEmptyCellIndex];
                    grid[rowIndex][theEmptyCellIndex] = 0;
                }
            }

        }
    }
}

function findTheFirstRightCell(rowIndex, columnIndex) {
    for (let i = 3; i > columnIndex; i--) {
        if (grid[rowIndex][i] === 0) {
            return i;
        }
    }

    return -1;
}

