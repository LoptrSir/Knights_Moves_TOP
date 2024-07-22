//Knights Move TOP

//Steps: create graph array, create adjacent list,

//KnightsMove JS
class Grid {
  constructor() {
    this._size = 8;
    this._gridArray = [];
    this._adjacentList = {};
  }

  makeGraph() {
    for (let i = 0; i < this._size; i++) {
      //makes row
      this._gridArray[i] = [];
      for (let j = 0; j < this._size; j++) {
        //makes cell
        let value = [i, j];
        this._gridArray[i][j] = value;
      }
    }
    console.log("makeGraph:", this._gridArray);
    this.makeAdjacentList(this._gridArray);
    console.log("AdjacentList:", this._adjacentList);
  }

  makeAdjacentList(_gridArray) {
    for (let i = 0; i < _gridArray.length; i++) {
      for (let j = 0; j < _gridArray.length; j++) {
        let cell = _gridArray[i][j];
        this.testMoves(cell);
      }
    }
  }

  testMoves(cell) {
    let [i, j] = cell;
    const moves = [
      [i + 2, j + 1],
      [i + 2, j - 1],
      [i - 2, j + 1],
      [i - 2, j - 1],
      [i + 1, j + 2],
      [i + 1, j - 2],
      [i - 1, j + 2],
      [i - 1, j - 2],
    ];
    this._adjacentList[cell] = [];

    for (let [newI, newJ] of moves) {
      if (this.isValidMove(newI, newJ)) {
        this._adjacentList[cell].push([newI, newJ]);
      }
    }
  }

  isValidMove(i, j) {
    return i >= 0 && i < this._size && j >= 0 && j < this._size;
  }
}

class BFS {
  constructor(grid) {
    this._grid = grid;
    this._queue = [];
    this._parent = {};
    this._visited = new Set(); //need to understand this
  }

  bfs(startCell, targetCell) {
    if (startCell === null || targetCell === null) {
      console.log(`startCell ${startCell} is not valid`);
      return;
    }

    this._queue.push(startCell);
    console.log("bfsQueue:", this._queue);
    this._visited.add(JSON.stringify(startCell));
    console.log("bfsVisited:", this._visited);
    this._parent[JSON.stringify(startCell)] = null;

    while (this._queue.length > 0) {
      let currentCell = this._queue.shift();
      console.log('bfsCurrentCell:', currentCell, 'parent', this._parent);
      if (JSON.stringify(currentCell) === JSON.stringify(targetCell)) {
        console.log("BFS: Eureka!", startCell, targetCell);
        return this.reconstructPath(targetCell);
      }

      let adjacentCells = this._grid._adjacentList[currentCell];
      console.log("BFS adjacentCells:", currentCell, adjacentCells);
      for (let cell of adjacentCells) {
        if (!this._visited.has(JSON.stringify(cell))) {
          this._queue.push(cell);
          this._visited.add(JSON.stringify(cell));
          this._parent[JSON.stringify(cell)] = currentCell;
        }
      }
    }
  }

  reconstructPath(targetCell) {
    let path = [];
    let currentCell = targetCell;
    
    while ( currentCell !== null) {
      path.push(currentCell);
      currentCell = this._parent[JSON.stringify(currentCell)];
    }
    path.reverse();
    // console.log(`ReconstructedPath: ${path}`);
    console.log('ReconstructedPath:' ,path);
    return path;
  }
}

function myFooter() {
  const footer = document.querySelector(".footer");
  footer.style.backgroundColor = "#333";
  footer.style.fontSize = "1rem";
  footer.style.color = "#f8afe5";
  footer.style.padding = "3px";
  footer.style.textAlign = "center";
  footer.style.position = "fixed";
  footer.style.width = "100%";
  footer.style.bottom = "0";
  footer.innerHTML = "LoptrSir";
}
myFooter();

const testGrid = new Grid();
testGrid.makeGraph();
const testBFS = new BFS(testGrid);
testBFS.bfs([0, 0], [3, 3]);
testBFS.bfs([0, 0], [7, 7]);
