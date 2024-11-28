let puzzleContainer = document.getElementById('puzzle');
let puzzlePieces = [];
let emptySpot = { row: 2, col: 2 }; // 空白格位置 (最初在右下角)
let moveCount = 0;

// 初始化拼圖
function initPuzzle() {
    puzzlePieces = [];
    puzzleContainer.innerHTML = '';

    for (let i = 0; i < 9; i++) {
        let piece = document.createElement('div');
        piece.classList.add('piece');
        if (i < 8) {
            piece.textContent = i + 1;
            piece.addEventListener('click', () => movePiece(i)); // 這裡加上事件監聽
        } else {
            piece.classList.add('empty');
        }
        puzzlePieces.push(piece);
        puzzleContainer.appendChild(piece);
    }

    // 更新可移動的拼圖塊
    updateMovablePieces();
}

// 移動拼圖
function movePiece(index) {
    let emptyIndex = emptySpot.row * 3 + emptySpot.col;
    if (isAdjacent(index, emptyIndex)) {
        // 交換位置
        [puzzlePieces[index], puzzlePieces[emptyIndex]] = [puzzlePieces[emptyIndex], puzzlePieces[index]];
        puzzleContainer.innerHTML = ''; // 清空拼圖容器
        puzzlePieces.forEach(piece => puzzleContainer.appendChild(piece)); // 重新添加拼圖塊

        emptySpot.row = Math.floor(index / 3);
        emptySpot.col = index % 3;

        moveCount++;
        document.getElementById('move-count').textContent = "移動次數: " + moveCount;

        if (checkIfCompleted()) {
            alert("恭喜！拼圖完成！總共移動了 " + moveCount + " 次！");
        }

        // 更新可移動的拼圖塊
        updateMovablePieces();
    }
}

// 檢查兩個拼圖是否相鄰
function isAdjacent(index1, index2) {
    let row1 = Math.floor(index1 / 3);
    let col1 = index1 % 3;
    let row2 = Math.floor(index2 / 3);
    let col2 = index2 % 3;
    return (Math.abs(row1 - row2) === 1 && col1 === col2) || (Math.abs(col1 - col2) === 1 && row1 === row2);
}

// 檢查拼圖是否完成
function checkIfCompleted() {
    for (let i = 0; i < 8; i++) {
        if (parseInt(puzzlePieces[i].textContent) !== i + 1) {
            return false;
        }
    }
    return true;
}

// 更新可移動的拼圖塊
function updateMovablePieces() {
    puzzlePieces.forEach((piece, index) => {
        let emptyIndex = emptySpot.row * 3 + emptySpot.col;
        if (isAdjacent(index, emptyIndex)) {
            piece.classList.add('movable'); // 可移動的拼圖加上 'movable' 類別
            piece.style.cursor = 'pointer'; // 讓可移動拼圖顯示為指標樣式
        } else {
            piece.classList.remove('movable'); // 移除 'movable' 類別
            piece.style.cursor = 'default'; // 讓不可移動拼圖顯示為默認指標
        }
    });
}

// 打亂拼圖
function shufflePuzzle() {
    for (let i = 0; i < 1000; i++) {
        let randomDirection = Math.floor(Math.random() * 4);
        let moveIndex = getRandomMoveIndex(randomDirection);
        if (moveIndex !== null) {
            movePiece(moveIndex);
        }
    }
}

// 獲取隨機的移動格
function getRandomMoveIndex(direction) {
    let newRow = emptySpot.row;
    let newCol = emptySpot.col;

    if (direction === 0 && newRow > 0) newRow--; // 上
    if (direction === 1 && newRow < 2) newRow++; // 下
    if (direction === 2 && newCol > 0) newCol--; // 左
    if (direction === 3 && newCol < 2) newCol++; // 右

    let newIndex = newRow * 3 + newCol;
    if (newRow !== emptySpot.row || newCol !== emptySpot.col) {
        return newIndex;
    }
    return null;
}

// 重新開始遊戲
function resetPuzzle() {
    emptySpot = { row: 2, col: 2 };
    moveCount = 0;
    document.getElementById('move-count').textContent = "移動次數: 0";
    initPuzzle();
}

// 初始化拼圖
initPuzzle();
