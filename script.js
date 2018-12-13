//Global variables for doors
let doorImage1 = document.getElementById("door1");
let doorImage2 = document.getElementById("door2");
let doorImage3 = document.getElementById("door3");
const botDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg";
const beachDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg";
const spaceDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg";
const closedDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg";
let numClosedDoors = 3;
let openDoor1;
let openDoor2;
let openDoor3;
const startButton = document.getElementById("start");
let currentlyPlaying = true;

//Function checks to see if ChoreBot door was opened before the other two. Signals end game if it has been opened.
const isBot = door => {
  if (door.src === botDoorPath) {
    return true;
  } else {
    return false;
  }
};

//Function prevents cheat of clicking same door multiple times to lower count of numClosedDoors
const isClicked = door => {
  if (door.src === closedDoorPath) {
    return false;
  } else
    return true;
};

//Function to decrease number of doors to check if the game winning condition has been reached (all doors open)
const playDoor = (door) => {
  numClosedDoors--;
  if (numClosedDoors === 0) {
    gameOver("win");
  } else if (isBot(door)) {
    gameOver();
  }
};

//Function to randomize ChoreBot location
const randomChoreDoorGenerator = () => {
  const choreDoor = Math.floor(Math.random() * numClosedDoors);
  if (choreDoor === 0) {
    openDoor1 = botDoorPath;
    openDoor2 = beachDoorPath;
    openDoor3 = spaceDoorPath;
  } else if (choreDoor === 1) {
    openDoor2 = botDoorPath;
    openDoor1 = beachDoorPath;
    openDoor3 = spaceDoorPath;
  } else if (choreDoor === 2) {
    openDoor3 = botDoorPath;
    openDoor1 = beachDoorPath;
    openDoor2 = spaceDoorPath;
  }
  /*switch (choreDoor){
    case 0:
      botDoorPath = openDoor1;
      opendoor2 = beachDoorPath;
      opendoor3 = spaceDoorPath;
    break;
    case 1:
      botDoorPath = openDoor2;
      opendoor1 = beachDoorPath;
      opendoor3 = spaceDoorPath;
    break;
    case 2:
      botDoorPath = openDoor3;
      opendoor1 = beachDoorPath;
      opendoor2 = spaceDoorPath;
    break;*/
}

//First door functions
door1.onclick = () => {
  if (!isClicked(doorImage1) && currentlyPlaying) {
  doorImage1.src = openDoor1;
  playDoor(door1);
  }
};

//Second door functions
door2.onclick = () => {
  if (!isClicked(doorImage2) && currentlyPlaying) {
	doorImage2.src = openDoor2;
  playDoor(door2);
  }
}


//Third door functions
door3.onclick = () => {
  if (!isClicked(doorImage3) && currentlyPlaying) {
	doorImage3.src = openDoor3;
  playDoor(door3);
  }
};

//Resets the game to play again.
const startRound = () => {
  doorImage1.src = closedDoorPath;
  doorImage2.src = closedDoorPath;
  doorImage3.src = closedDoorPath;
  numClosedDoors = 3;
	startButton.innerHTML = ("Good luck!");
  currentlyPlaying = true;
  randomChoreDoorGenerator();
}

//Makes the button interactive to use the startRound function.
startButton.onclick = () => {
  if (currentlyPlaying === false) {
  startRound();
  }
}

//Function to signal end game and change button status.
const gameOver = status => {
  if (status === "win") {
    startButton.innerHTML = "You win! Play again?"
  } else {
    startButton.innerHTML = "Game over! Play again?"
  }
  currentlyPlaying = false;
};

startRound();