"use strict";
const container = document.querySelector(".container");
const rock = document.querySelector("div#rock");
const paper = document.querySelector("div#paper");
const scissors = document.querySelector("div#scissors");
const gameOptions = document.querySelectorAll("div.circle");

const playerHand = document.querySelector("#player-hand");
const computerHand = document.querySelector("#computer-hand");

const playersPlay = document.querySelector("#player-play");
const computersPlay = document.querySelector("#computer-play");

const playersScore = document.querySelector("#player-score");
const computersScore = document.querySelector("#computer-score");

const reloadBtn = document.querySelector(".refresh");

let [p, c] = [0, 0];
const choices = ["rock", "paper", "scissors"];

const audioWin = new Audio("win.wav");
const audioLose = new Audio("lose.wav");
const audioDraw = new Audio("draw.mp3");
const audioWinningGame = new Audio("tada.mp3");
const audioLosingGame = new Audio("lost.mp3");

const displayPlay = function (player, computer) {
  playersPlay.innerHTML = player;
  computersPlay.innerHTML = computer;
};

const displayScore = function () {
  playersScore.innerHTML = p;
  computersScore.innerHTML = c;
};

const win = function (player, computer) {
  p++;
  if (p <= 4) {
    audioWin.play();
    displayScore();
    displayPlay(player, computer);
  } else {
    audioWinningGame.play();
    displayScore();
    playersScore.classList.add("winner");
    setTimeout(() => {
      playersPlay.innerHTML = " ";
      computersPlay.innerHTML = " ";
    }, 1000);
  }
  playerHand.classList.remove("player-hand");
  computerHand.classList.remove("computer-hand");
};

const lose = function (player, computer) {
  c++;
  if (c <= 4) {
    audioLose.play();
    displayScore();
    displayPlay(player, computer);
  } else {
    audioLosingGame.play();
    computersScore.classList.add("winner");
    displayScore();
    setTimeout(() => {
      playersPlay.innerHTML = " ";
      computersPlay.innerHTML = " ";
    }, 1000);
  }
  playerHand.classList.remove("player-hand");
  computerHand.classList.remove("computer-hand");
};

gameOptions.forEach((option) =>
  option.addEventListener("click", (e) => {
    const computerChoice =
      choices[Math.floor(Math.random() * gameOptions.length)];
    const playerChoice = e.currentTarget.getAttribute("id");

    if (e.currentTarget && c < 5 && p < 5) {
      playerHand.classList.add("player-hand");
      computerHand.classList.add("computer-hand");

      setTimeout(() => {
        if (playerChoice === computerChoice) {
          audioDraw.play();
          displayPlay(playerChoice, computerChoice);
          displayScore();
          playerHand.classList.remove("player-hand");
          computerHand.classList.remove("computer-hand");
        } else if (playerChoice !== computerChoice) {
          if (playerChoice === "rock" && computerChoice === "paper")
            lose(playerChoice, computerChoice);
          if (playerChoice === "paper" && computerChoice === "scissors")
            lose(playerChoice, computerChoice);
          if (playerChoice === "scissors" && computerChoice === "rock")
            lose(playerChoice, computerChoice);
          if (playerChoice === "rock" && computerChoice === "scissors")
            win(playerChoice, computerChoice);
          if (playerChoice === "paper" && computerChoice === "rock")
            win(playerChoice, computerChoice);
          if (playerChoice === "scissors" && computerChoice === "paper")
            win(playerChoice, computerChoice);
        }
      }, 1200);
    }
  })
);

reloadBtn.addEventListener("click", () => {
  p = 0;
  playersScore.innerHTML = p;
  playersScore.classList.remove("winner");
  c = 0;
  computersScore.innerHTML = c;
  computersScore.classList.remove("winner");
});
