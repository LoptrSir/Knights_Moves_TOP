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
