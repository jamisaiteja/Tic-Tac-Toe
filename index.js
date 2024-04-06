document.addEventListener("DOMContentLoaded", function () {
  const boxes = document.querySelectorAll(".box");
  const status = document.getElementById("status");
  const resetButton = document.getElementById("resetButton");

  let gameActive = true;
  let currentPlayer = "X";
  let moves = 0;
  status.textContent = `Player ${currentPlayer}'s turn`;
  boxes.forEach((box) => {
    box.addEventListener("click", handleClick);
  });

  function handleClick() {
    const clickedBox = this;

    if (gameActive && !clickedBox.textContent) {
      clickedBox.textContent = currentPlayer;
      status.textContent = `Player ${currentPlayer}'s turn`;
      moves++;
      if (checkwin() || moves == 9) {
        gameActive = false;
        if (checkwin()) {
          status.textContent = `Player ${currentPlayer} wins`;
          highlightWinningPattern();
        } else {
          status.textContent = "It's a draw!";
        }
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        status.textContent = `Player ${currentPlayer}'s turn`;
      }
    }
  }

  function checkwin() {
    let patternsToWin = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return patternsToWin.some((pattern) => {
      const [a, b, c] = pattern;
      return (
        boxes[a].textContent &&
        boxes[a].textContent === boxes[b].textContent &&
        boxes[a].textContent === boxes[c].textContent
      );
    });
  }

  function highlightWinningPattern() {
    let patternsToWin = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    patternsToWin.forEach((pattern) => {
      const [a, b, c] = pattern;
      if (
        boxes[a].textContent &&
        boxes[a].textContent === boxes[b].textContent &&
        boxes[a].textContent === boxes[c].textContent
      ) {
        boxes[a].classList.add("wining-box");
        boxes[b].classList.add("wining-box");
        boxes[c].classList.add("wining-box");
      }
    });
  }

  resetButton.addEventListener("click", function () {
    boxes.forEach((box) => {
      box.textContent = "";
      if (box.classList.contains("wining-box")) {
        box.classList.remove("wining-box");
      }
    });
    currentPlayer = "X";
    gameActive = true;
    moves = 0;
    status.textContent = `Player ${currentPlayer}'s turn`;
  });
});
