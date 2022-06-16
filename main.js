/* 
Author: Joe Marcotte
Date: 6/15/2022
Black Jack
*/

const dealerHand = document.querySelector(".dealer");
const userHand = document.querySelector(".user");
const hitBtn = document.querySelector(".hit-btn");
const standBtn = document.querySelector(".stand-btn");
const totalTitle = document.querySelector(".total-title");
const total = document.querySelector(".total");
const result = document.querySelector(".result-bar");
let aceCase = false;
let hiddenDealerCard;
let dealerTotal;
let userTotal;
let dealerCard1;
let userCard1;
let userCard2;
let userCard3;

newRound();

function cardGenerator() {
  //13 different card values
  let card = Math.floor(Math.random() * (12)) + 1;
  if (card >= 10) {
    card = 10;
    return card;
  } else if (card === 1) {
    aceCase = true;
    card = 11;
    return card;
  }
  return card;
}

function newRound() {
  result.innerText = "Choose to hit or stand";
  hiddenDealerCard = cardGenerator();
  dealerCard1 = cardGenerator();
  dealerHand.innerText = "dealer: " + dealerCard1 + " and ?";
  userCard1 = cardGenerator();
  userCard2 = cardGenerator();
  userCard3 = cardGenerator();
  userHand.innerText = "User: " + userCard1 + " and " + userCard2;
  total.innerText = userCard1 + userCard2;
}

hitBtn.addEventListener("click", hit);
standBtn.addEventListener("click", stand);

function hit() {
  let newCard = cardGenerator();
  if (Number(total.innerText) + newCard > 21 && aceCase) {
    userHand.innerText += " and " + 1;
    total.innerText = Number(total.innerText) + 1;
    aceCase = false;
    return;
  }
  userHand.innerText += " and " + newCard;
  userTotal = Number(total.innerText) + newCard;
  total.innerText = userTotal;
}
function stand() {
  dealerTotal = hiddenDealerCard + dealerCard1;
  dealerHand.innerText = "dealer: " + dealerCard1 + " and " + hiddenDealerCard;
  while (dealerTotal < 17) {
    let newCard = cardGenerator();
    dealerTotal += newCard;
    dealerHand.innerText += " and " + newCard;
  }
  checkWinner();
  setTimeout(newRound, 4000);
}

function checkWinner() {
  userTotal = total.innerText;
  console.log(userTotal + " vs " + dealerTotal);
  if (userTotal >= dealerTotal) {
    if (userTotal <= 21) {
      result.innerText = "You WON!!!!";
    } else {
      result.innerText = "The Dealer Won";
    }
  } else {
    if (dealerTotal <= 21) {
      result.innerText = "The Dealer Won";
    } else {
      result.innerText = "You WON!!!!";
    }
  }
}
