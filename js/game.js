import { Character } from "./Character.js";
import { ProyectileBall } from "./ProyectileBall.js"
import { EnemyBall } from "./EnemyBall.js";

const bgAudio = document.getElementById('bg-audio');
bgAudio.volume = 0.04;
const shootAudio = new Audio('./sounds/pbobble-002.wav');
shootAudio.volume = 0.3;
const popBallsAudio = new Audio('./sounds/pbobble-003.wav');
popBallsAudio.volume = 0.3;
const gridDownAudio = new Audio('./sounds/pbobble-009.wav');
gridDownAudio.volume = 0.3;
const audioOnHover = new Audio('./sounds/buttons-sound.wav');
audioOnHover.volume = 0.4;
const audioOnClick = new Audio('./sounds/pop-click.wav');
audioOnClick.volume = 0.4;

const loseModal = document.getElementById('lose-modal');
const loseModalBtn = document.getElementById('lose-btn');
const winModal = document.getElementById('win-modal');
const winModalBtn = document.getElementById('win-btn');
const soundBtnImg = document.querySelector('#sound-btn img');
const soundBtn = document.getElementById('sound-btn');

loseModalBtn.addEventListener('click', () => {
  startGame();
  audioOnClick.play();
  bgAudio.play();
  loseModal.style.display = 'none';
  score = 0;
  scoreTag.innerHTML = `Score: <span>${score}</span>`
});
winModalBtn.addEventListener('click', () => {
  startGame();
  audioOnClick.play();
  bgAudio.play();
  winModal.style.display = 'none';
  score = 0;
  scoreTag.innerHTML = `Score: <span>${score}</span>`
});
winModalBtn.addEventListener('mouseenter', () => {
  audioOnHover.play();
});
loseModalBtn.addEventListener('mouseenter', () => {
  audioOnHover.play();
});
soundBtn.addEventListener('click', () => {
  if (soundBtn.classList.contains('muted')) {
    soundBtnImg.src = './images/sound.png';
    soundBtn.classList.toggle('muted');
    bgAudio.play();
  } else {
    soundBtnImg.src = './images/mute.png';
    soundBtn.classList.toggle('muted');
    bgAudio.pause();
  }
});

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let score = 0;
const main = document.querySelector('main');
const scoreTag = document.createElement('h2')
main.appendChild(scoreTag);
scoreTag.innerHTML = `Score: <span>${score}</span>`
scoreTag.id = 'score';

const initialColors = ['red', 'yellow', 'green', 'blue'];
const character1 = new Character((canvas.width - 50) / 2, canvas.height, 50, -120, '', '', 3, 0, canvas, ctx);
const proyectile = new ProyectileBall(canvas.width / 2, canvas.height + character1.height / 2, 25, randomColor(initialColors), '', canvas, ctx, character1);

const level3 = [
  ['R','R','Y','Y','B','B','G','G'],
  ['R','R','Y','Y','B','B','G'],
  ['B','B','G','G','R','R','Y','Y'],
  ['B','G','G','R','R','Y','Y']
];
const level1  = [
  ['R','R','R','Y','B','B','G','G'],
  ['R','R','R','Y','B','B','G'],
  ['B','B','R','G','R','R','Y','Y'],
  ['B','G','R','R','R','Y','Y']
]
const level2 = [['R', 'R', 'R']] ;

let startListener = true;

function startGame() {
  // Start creating level
  let floating = [];
  let sameColor = [];
  let deletedBalls = [];
  let winCounter = 8;
  if (startListener === true) {
    detectKeysPressed(character1);
    startListener = false;
  }
  const ballsGrid = createBallsGrid();
  transformLevelToBalls(level1, ballsGrid);

  let intervalId = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    character1.draw();
    character1.drawAimAssist();
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 500, 400, 5);
    ctx.beginPath();
    // Drawing level
    drawBalls(ballsGrid);
    proyectile.draw();
    if (character1.shooting === true) {
      proyectile.move();
      detectCollision(ballsGrid, proyectile);
      // Compare collisions
      if (proyectile.collision === true) {
        character1.shooting = false;
        proyectile.collision = false;
        sameColor = paintBall(ballsGrid, proyectile);
        deletedBalls = deleteSameBalls(sameColor, ballsGrid)
        floating = deleteFloating(ballsGrid);
        score += (deletedBalls.length + floating.length) * 10;
        scoreTag.innerHTML = `Score: <span>${score}</span>`
        proyectile.color = randomColor(getCurrentColorsOnBoard(ballsGrid));
      }
    } else {
      // Draw proyectile and falling balls 
      floating.forEach((float) => {
        if (float.y <= 550) {
          float.display = true;
          float.draw();
          float.fallDown();
        } 
        else {
          float.display = false;
          float.color = '';
        }
      });
      proyectile.updateSpeed();
      proyectile.x = proyectile.x = canvas.width / 2;
      proyectile.y = canvas.height + character1.height / 2;
      drawImageByColor(proyectile);
    }
    // Level Difficulty
    if (character1.counter === 8) {
      addGrid(ballsGrid);
      gridDownAudio.pause();
      gridDownAudio.currentTime = 0.2;
      gridDownAudio.play();
      character1.counter = 0;
      canvas.classList.remove('shaking');
    } else if (character1.counter === 7) {
      canvas.classList.add('shaking');
    }
    // Lose Condition
    ballsGrid[ballsGrid.length - 1].forEach((lastBalls) => {
      if(lastBalls.color) {
        setTimeout(() => {
          clearInterval(intervalId);
          loseModal.style.display = 'block';
          bgAudio.pause();
        },50);
      }
    });
    // Win Condition
    ballsGrid[0].forEach((firstBalls) => {
      if(!firstBalls.color) {
        winCounter -= 1;
      }
      if (winCounter === 0) {
        setTimeout(() => {
          clearInterval(intervalId);
          winModal.style.display = 'block';
        },50);
      }
    });
    winCounter = 8;
  }, 1000 / 60);
}

function detectKeysPressed(character) {
  document.addEventListener('keydown', (event) => {
    switch (event.code) {
      case 'ArrowLeft':
        event.preventDefault();
        character.aimLeft();
        break;
      case 'ArrowRight':
        event.preventDefault();
        character.aimRight();
        break;
      case 'Space':
        shootAudio.currentTime = 0.2;
        event.preventDefault();
        character.shooting = true;
        character.counter += 1;
        proyectile.moving = true; 
        shootAudio.play();
        break;
      case 'ArrowUp':
        character.shooting = false;
        break;
    }
  });
}

function createBallsGrid() {
  const ballsGrid = []
  const ballsRadio = 25;
  const maxHeight = 100
  const rows = (canvas.height - maxHeight) / (ballsRadio * 2);
  let columns;
  for (let i = 0; i < rows; i++) {
    ballsGrid.push([]);
    if (i % 2 === 0) {
      columns = canvas.width / (ballsRadio * 2);
    } else {
      columns = canvas.width / (ballsRadio * 2) - 1;
    }
    for (let j = 0; j < columns; j++) {
      if (i % 2) {
        ballsGrid[i].push(new EnemyBall((j + 1) * 2 * ballsRadio, (i * 2 + 1) * ballsRadio, ballsRadio, '', '', canvas, ctx))
      } else {
        ballsGrid[i].push(new EnemyBall((j * 2 + 1) * ballsRadio, (i * 2 + 1) * ballsRadio, ballsRadio, '', '', canvas, ctx));
      }
    }
  }
  return ballsGrid;
}

function addGrid(ballsGrid) {
  const rowAdd = [];
  const ballsRadio = 25;
  if(ballsGrid[0].length === 8) {
    for(let i = 0; i < 7; i ++) {
      rowAdd.push(new EnemyBall((i + 1) * 2 * ballsRadio, ballsRadio, ballsRadio, randomColor(initialColors), '', canvas, ctx))
    }
  } else {
    for(let i = 0; i < 8; i ++) {
      rowAdd.push(new EnemyBall((i * 2 + 1) * ballsRadio, ballsRadio, ballsRadio, randomColor(initialColors), '', canvas, ctx))
    }
  }
  ballsGrid.forEach((row) => {
    row.forEach((ball) => {
      ball.y += 2 * ball.radius;
    })
  })
  ballsGrid.unshift(rowAdd);
  ballsGrid.pop();
  return ballsGrid;
} 

function transformLevelToBalls(level, ballsGrid) {
  level.forEach((row, index) => {
    row.forEach((ball, cindex) => {
      switch (ball) {
        case 'R':
          ballsGrid[index][cindex].color = 'red';
          break;
        case 'Y':
          ballsGrid[index][cindex].color = 'yellow';
          break;
        case 'B':
          ballsGrid[index][cindex].color = 'blue';
          break;
        case 'G':
          ballsGrid[index][cindex].color = 'green';
          break;
      }
      drawImageByColor(ballsGrid[index][cindex]);
    });
  });
}

function drawImageByColor (ball) { 
  ball.image = new Image();
    switch (ball.color) {
      case 'red':
        ball.image.src = './images/red-ball.png';
        break;
      case 'blue':
        ball.image.src = './images/blue-ball.png';
        break;
      case 'green':
        ball.image.src = './images/green-ball.png';
        break;
      case 'yellow':
        ball.image.src = './images/yellow-ball.png';
        break;
  }
}

function drawBalls(ballsGrid) {
  ballsGrid.forEach((row) => {
    row.forEach((ball) => {
      if(ball.color) {
        ball.showBall();
      }
      ball.draw();
    });
  });
}

function detectCollision(ballsGrid, proyectile) {
  ballsGrid.forEach((row) => {
    row.forEach((ball) => {
      if (
        getCentersDistance(proyectile, ball) <= proyectile.radius + ball.radius && 
        ball.color 
        ) {
        proyectile.moving = false;
        proyectile.collision = true;
      } else if (proyectile.y <= 0) {
        proyectile.moving = false;
        proyectile.collision = true;
      }
    });
  }); 
}

function getNearestBall(ballsGrid, proyectile) {
  let nearestDistance = 600;
  let nearestBallIndex;
  ballsGrid.forEach((row, rindex) => {
    row.forEach((ball, bindex) => {
      if(getCentersDistance(proyectile, ball) <= nearestDistance) {
        nearestDistance = getCentersDistance(proyectile, ball);
        nearestBallIndex = [rindex, bindex];
      }
    });
  });
  return nearestBallIndex;
}

function paintBall(ballsGrid, proyectile) {
  const index = getNearestBall(ballsGrid, proyectile);
  const paintedBall = ballsGrid[index[0]][index[1]];
  paintedBall.color = proyectile.color;
  paintedBall.showBall();
  drawImageByColor(paintedBall)
  return paintedBall;
}

function randomColor(colors) {
  const randColor = colors[Math.floor(Math.random()*colors.length)];
  return randColor;
}

function getCentersDistance(ball1, ball2) {
  const distanceX = ball1.x - ball2.x;
  const distanceY = ball1.y - ball2.y;
  return Math.sqrt(distanceX**2 + distanceY**2)
}

function deleteSameBalls(comparingBall, ballsGrid) {
  let nearBalls = getAroundBalls(comparingBall, ballsGrid);
  let sameBalls = [];
  let allColors = [];
  let uniqueBalls = [];
  let deletedBalls = [];

  // Get Starting same balls
  nearBalls.forEach((ball) => {
    if (ball.color === comparingBall.color) {
      sameBalls.push(ball);
    }
  });

  // Iterates for get more same color balls
  // 2, 3
  for (let i = 0; i < ballsGrid.length; i++) {
    sameBalls.forEach((balls) => {
      const nearBallsIteration = getAroundBalls(balls, ballsGrid);
      const sameColor = [];
      nearBallsIteration.forEach((ball) => {
        if (ball.color === comparingBall.color) {
          sameColor.push(ball);
        }
      });
      allColors = allColors.concat(sameColor);
      sameBalls = sameBalls.concat(allColors)
    });
    uniqueBalls = sameBalls.filter((ball, index) => {
      return sameBalls.indexOf(ball) === index;
    })
    sameBalls = uniqueBalls;
  }

  // Gets array of unique balls
  if (uniqueBalls.length >= 3) {
    uniqueBalls.forEach((ball) => {
      ball.display = false;
      deletedBalls.push(ball);
      ball.color = ''
    });
    popBallsAudio.pause;
    popBallsAudio.currentTime = 0.2;
    popBallsAudio.play();
  }
  return deletedBalls;
}

function deleteFloating(ballsGrid) {
  
  let firstRow = ballsGrid[0];
  let nearBalls = [];
  let allBalls = [];
  let uniqueBalls = [];
  let floating = [];

  firstRow.forEach((colorBall) => {
    if (colorBall.color) {
      const firstMatch = getAroundBalls(colorBall, ballsGrid);
      firstMatch.forEach((fball) => {
        if (fball.color) {
          nearBalls.push(fball)
        }
      });
    }
  });

  for (let i = 0; i < ballsGrid.length; i++){
    nearBalls.forEach((nball) => {
      const nearBallsIteration = getAroundBalls(nball, ballsGrid);
      const collidingBalls = [];
      nearBallsIteration.forEach((ball) => {
        if (ball.color) {
          collidingBalls.push(ball);
        }
      });
      allBalls = allBalls.concat(collidingBalls);
      nearBalls = nearBalls.concat(allBalls);
    });
    uniqueBalls = nearBalls.filter((ball, index) => {
      return nearBalls.indexOf(ball) === index;
    })
    nearBalls = uniqueBalls;
  }

  ballsGrid.forEach((row) => {
    row.forEach((ball) => {
      if (ball.y > ball.radius && ball.color) {
        if(!(uniqueBalls.includes(ball))) {
          ball.display = false;
          floating.push(ball)
        }
      }
    });
  });
  return floating;
}

function getAroundBalls(comparingBall, ballsGrid) {
  // Compare all 6 balls around
  let ballsNear = [];
  ballsGrid.forEach((row) => {
    row.forEach((ball) => {
      if(
        (ball.x === comparingBall.x - comparingBall.radius && ball.y === comparingBall.y - 2 * comparingBall.radius) ||
        (ball.x === comparingBall.x + comparingBall.radius && ball.y === comparingBall.y - 2 * comparingBall.radius) ||
        (ball.x === comparingBall.x - 2 * comparingBall.radius && ball.y === comparingBall.y) ||
        (ball.x === comparingBall.x + 2 * comparingBall.radius && ball.y === comparingBall.y) ||
        (ball.x === comparingBall.x - comparingBall.radius && ball.y === comparingBall.y + 2 * comparingBall.radius) ||
        (ball.x === comparingBall.x + comparingBall.radius && ball.y === comparingBall.y + 2 * comparingBall.radius)
        ) {
        ballsNear.push(ball)
      }
    });
  });
  return ballsNear;
}

function getCurrentColorsOnBoard(ballsGrid) {
  let currentBalls = [];
  let currentColors = [];
  let uniqueColors = [];
  ballsGrid.forEach((row) => {
    row.forEach((ball) => {
      if (ball.color) {
        currentBalls.push(ball);
      }
    });
  });
  currentColors = currentBalls.map((fball) => fball.color);
  uniqueColors = currentColors.filter((color, index) => {
    return currentColors.indexOf(color) === index;
  });
  return uniqueColors;
}

startGame();

