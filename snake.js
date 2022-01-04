// Starting constraints
const height = 20;
const width = 20;
const foodSize = 30;
const $container = document.querySelector(".container")


//Board Class
function Board() {
$container.style.width = `${height*foodSize}px`
$container.style.height = `${width*foodSize}px`
}
const board = new Board();

//Food CLass
function Food() {
    this.getNextPos = (direction) =>{
        switch (direction) {
            case 0: // Left
              return { top: this.top, left: this.left - 1 }
            case 1: // Up
              return { top: this.top - 1, left: this.left }
            case 2: // Right
              return { top: this.top, left: this.left + 1 }
            case 3: // Down
              return { top: this.top + 1, left: this.left }
            default:
              return { top: this.top, left: this.left }
          }
    } 

    const $food = document.createElement('div');
    $food.classList.add('food')

    this.setPos = (top,left) => {
        this.top = top;
        this.left = left;
        $food.style.top = `${this.top * foodSize}px`
        $food.style.left = `${this.left * foodSize}px`
        $food.style.height = `${foodSize}px`
        $food.style.width = `${foodSize}px`
    }

    $container.append($food)

    this.setPos(
        Math.floor(Math.random() * height),
        Math.floor(Math.random() * width)
      )
}

//Snake CLass
function Snake() {
    this.head = new Food();
    this.direction = Math.floor(Math.random()*5)

    this.move = () => {
        let pos = snake.head.getNextPos(snake.direction)
        if (pos.top === food.top && pos.left === food.left) {
          food.next = snake.head
          snake.head.previous = food
          snake.head = food
          food = new Food()
          return
        }

        updateGame(pos) 
        snake.tail.setPos(pos.top, pos.left)
        if (snake.head === snake.tail) return
    

        const tmp = snake.tail
        snake.tail = tmp.previous
        snake.tail.next = null 
    

        tmp.previous = null 
        tmp.next = snake.head
        snake.head.previous = tmp
        snake.head = tmp
      }
}
const snake = new Snake();
snake.tail = snake.head 

let shouldContinue = true
const checkSnakeNode = (pos, node) => {
  if (!node) return false
  if (pos.top === node.top && pos.left === node.left) return true
  return checkSnakeNode(pos, node.next)
}

const updateGame = pos => {
  if (
    pos.top < 0 ||
    pos.top >= height ||
    pos.left < 0 ||
    pos.left >= width ||
    checkSnakeNode(pos, snake.head)
  ) {
    shouldContinue = false
  }
}

const move = () => {
  if (!shouldContinue) {
    return alert('Game over. Please refresh the page to continue')
  }
  snake.move()
  setTimeout(move, 300)
}
setTimeout(move, 500)

let food = new Food();

document.onkeyup = e => {
    if (e.keyCode > 36 && e.keyCode < 41) {
      snake.direction = e.keyCode - 37
    }
  }