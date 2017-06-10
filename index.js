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
var countCell=0
for (var i = 0; i < 4; i++) {
    grid[i] = [0, 0, 0, 0];
}

function generateRandom() {
    return Math.floor(Math.random()*4)
}

function addRandowCell() {
    var rowIndex = generateRandom()
    var colunmIndex = generateRandom()
    while (grid[rowIndex][colunmIndex]!==0) {
        var rowIndex = generateRandom()
        var colunmIndex = generateRandom()
    }
    grid[rowIndex][colunmIndex] = 2
    countCell++
}
addRandowCell()
addRandowCell()
flushUi()

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
    var color=colorValue[number]
    if(color===undefined) {
        color=0xFF33CC
    }
    return color;
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

// document.addEventListener('keydown',function (event) {
//     if(event.key==='ArrowRight'){
//         var isChanged=moveCellToRight()
//         if(isChanged) {
//             addRandowCell()
//         }
//         flushUi()
//
//         if(checkGameOver()) {
//             alert('Game Over')
//         }
//     }
//     if(event.key==='ArrowLeft') {
//         rotateArray(2)
//         var isChanged=moveCellToRight()
//         rotateArray(2)
//         if(isChanged) {
//             addRandowCell()
//         }
//         flushUi()
//         if(checkGameOver()){
//             alert('Game Over')
//         }
//     }
//     if(event.key==='ArrowUp') {
//         rotateArray(1)
//         var isChanged=moveCellToRight()
//         rotateArray(3)
//         if(isChanged) {
//             addRandowCell()
//         }
//         flushUi()
//         if(checkGameOver()) {
//             alert('Game Over')
//         }
//     }
//     if (event.key==='ArrowDown'){
//         rotateArray(3)
//         var isChanged=moveCellToRight()
//         rotateArray(1)
//         if(isChanged) {
//             addRandowCell()
//         }
//         flushUi()
//         if(checkGameOver()) {
//             alert('Game Over')
//         }
//     }
// })

var onToRightEventHandler = function () {
    var isChanged = moveCellToRight();
    if (isChanged) {
        addRandowCell();
    }
    flushUi();
    if (checkGameOver()) {
        alert('Game over.');
    }
};
var onToDownEventHandler = function () {
    rotateArray(3);
    var isChanged = moveCellToRight();
    rotateArray(1);
    if (isChanged) {
        addRandowCell();
    }
    flushUi();
    if (checkGameOver()) {
        alert('Game over.');
    }
};
var onToLeftEventHandler = function () {
    rotateArray(2);
    var isChanged = moveCellToRight();
    rotateArray(2);
    if (isChanged) {
        addRandowCell();
    }
    flushUi();
    if (checkGameOver()) {
        alert('Game over.');
    }
};
var onToUpEventHandler = function () {
    rotateArray(1);
    var isChanged = moveCellToRight();
    rotateArray(3);
    if (isChanged) {
        addRandowCell();
    }
    flushUi();
    if (checkGameOver()) {
        alert('Game over.');
    }
};
document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowRight') {
        onToRightEventHandler();
    }

    if (event.key === 'ArrowUp') {
        onToUpEventHandler();
    }

    if (event.key === 'ArrowLeft') {
        onToLeftEventHandler();
    }

    if (event.key === 'ArrowDown') {
        onToDownEventHandler();
    }
});

var hammertime = new Hammer.Manager(document, {
    recognizers: [
        [Hammer.Swipe, {direction: Hammer.DIRECTION_ALL}]
    ]
});
hammertime.on('swiperight', function() {
    onToRightEventHandler();
});
hammertime.on('swipeup', function () {
    onToUpEventHandler();
});
hammertime.on('swipeleft', function () {
    onToLeftEventHandler();
});
hammertime.on('swipedown', function () {
    onToDownEventHandler();
});

function moveCellToRight() {
    var isChanged=false
    for (var rowIndex = 0; rowIndex < 4; rowIndex++) {
        for (var columnIndex = 2; columnIndex >= 0; columnIndex--) {
            if (grid[rowIndex][columnIndex] === 0) continue;

            var theEmptyCellIndex = findTheFirstRightCell(rowIndex, columnIndex);
            if (theEmptyCellIndex !== -1) {
                grid[rowIndex][theEmptyCellIndex] = grid[rowIndex][columnIndex];
                grid[rowIndex][columnIndex] = 0;
                isChanged=true

            }
            var currentIndex = theEmptyCellIndex === -1 ? columnIndex : theEmptyCellIndex;

            if (grid[rowIndex][currentIndex] === grid[rowIndex][currentIndex + 1]) {
                grid[rowIndex][currentIndex+ 1] += grid[rowIndex][currentIndex];
                grid[rowIndex][currentIndex] = 0;
                isChanged=true
                countCell--
            }

        }
    }
    return isChanged
}

function findTheFirstRightCell(rowIndex, columnIndex) {
    for (let i = 3; i > columnIndex; i--) {
        if (grid[rowIndex][i] === 0) {
            return i;
        }
    }

    return -1;
}

function rotateArray(rotateCount = 1) {
    for (var i = 0 ; i < rotateCount; i ++) {
        grid = rotateArrayToRightOnce(grid);
    }

    function rotateArrayToRightOnce(array) {
        return array.map((row, rowIndex) => {
                return row.map((item, columnIndex) => {
                    return array[3 - columnIndex][rowIndex];
    })
    })
    }
}

function checkGameOver() {
    console.log(countCell)
    if(countCell!==16) return false
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (grid[i][j] === grid[i][j - 1] ||
                grid[i][j] === grid[i][j + 1] ||
                (grid[i-1] && grid[i][j] === grid[i - 1][j]) ||
                (grid[i+1] && grid[i][j] === grid[i + 1][j])
            ) {
                return false;
            }
        }
    }
    return true
}