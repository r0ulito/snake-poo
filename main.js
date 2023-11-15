class Snake {
  constructor() {
    this.segments = [{ x: 200, y: 200 }];
    this.direction = "up";
  }

  get head() {
    return this.segments[0];
  }

  reset() {
    this.segments = [{ x: 200, y: 200 }];
    this.direction = "down";
  }

  move(bonusCollision = false) {
    const head = { ...this.head };
    switch (this.direction) {
      case "up":
        head.y -= 20;
        break;
      case "down":
        head.y += 20;
        break;
      case "left":
        head.x -= 20;
        break;
      case "right":
        head.x += 20;
        break;
    }

    this.segments.unshift(head);
    if (bonusCollision) {
      return;
    }
    this.segments.pop();

    // console.log(this.segments);
  }

  changeDirection(newDirection) {
    if (
      (this.direction === "up" && newDirection !== "down") ||
      (this.direction === "down" && newDirection !== "up") ||
      (this.direction === "left" && newDirection !== "right") ||
      (this.direction === "right" && newDirection !== "left")
    ) {
      this.direction = newDirection;
    }
  }

  checkCollision() {
    if (
      this.head.x < 0 ||
      this.head.x >= 400 ||
      this.head.y < 0 ||
      this.head.y >= 400
    ) {
      return true;
    }

    for (let i = 1; i < this.segments.length; i++) {
      if (
        this.head.x === this.segments[i].x &&
        this.head.y === this.segments[i].y
      ) {
        return true;
      }
    }

    return false;
  }

  checkBonusCollision(bonus) {
    if (this.head.x === bonus.position.x && this.head.y === bonus.position.y)
      return true;

    return false;

    // ERP => Early Return Pattern
  }
}

class Bonus {
  constructor() {
    this.position = { x: 0, y: 0 };
  }

  generate() {
    this.position.x = Math.floor(Math.random() * 10) * 20;
    this.position.y = Math.floor(Math.random() * 10) * 20;
  }
}

class GameBoard {
  constructor(gameContainer, scoreContainer, snake, bonus) {
    this.board = gameContainer;
    this.score = 0;
    this.leaderboard = scoreContainer;
    this.snake = snake;
    this.bonus = bonus;
    this.delay = 250;
  }

  draw() {
    this.board.innerHTML = "";
    this.snake.segments.forEach((segment) => {
      const snakeElement = document.createElement("div");
      snakeElement.classList.add("body");
      snakeElement.style.left = `${segment.x}px`;
      snakeElement.style.top = `${segment.y}px`;
      this.board.appendChild(snakeElement);
    });
    const bonusElement = document.createElement("div");
    bonusElement.classList.add("bonus");
    bonusElement.style.left = `${bonus.position.x}px`;
    bonusElement.style.top = `${bonus.position.y}px`;
    this.board.appendChild(bonusElement);
  }

  increaseScore() {
    this.score += 10;
    this.leaderboard.innerText = this.score;
    if (this.delay > 150) {
      console.log(this.delay);
      this.delay -= 50;
    }
  }

  reset() {
    this.score = 0;
    this.leaderboard.innerText = this.score;
    this.snake.reset();
    this.bonus.generate();
  }
}
