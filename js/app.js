
// Get all cards in the DOM
const cards = document.querySelectorAll(".card"); 
// one card at the time array
let CardOpened =[];
// Get the icons
let icons = [];
// Number of moves
let moves = 0;
let movesCount = document.querySelector('#moves-count');
// Number of start
let rating = 3;
let stars = document.querySelectorAll('.star');
// Timer
let timer = undefined;
// Total seconds elapsed since game start
const timerHours = document.querySelector('#timer .hours');
const timerMins = document.querySelector('#timer .minutes');
const timerSeconds = document.querySelector('#timer .seconds');
let elapsedSeconds = 0;
let hour = 0;
let min = 0;
let sec = 0;
// Game status
let gameStarted = false;
// Start new game
cards.forEach(card =>{
    //hied all card
    card.classList.remove("open" ,"match" , "show");
    //Get all icon
    let icon = card.children[0];
    icons.push(icon.className);
    card.addEventListener("click", onclick);
});
// Shuffle the Cards
shuffleCards()
function shuffle(icons) {
    let currentIndex = icons.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = icons[currentIndex];
        icons[currentIndex] = icons[randomIndex];
        icons[randomIndex] = temporaryValue;
    }
    return icons;
}
function shuffleCards(){
icons = shuffle(icons);
let i =0;
cards.forEach(card =>{
    let icon = card.children[0];
    icon.className = icons[i];
    i++;
});
}
// On click card
function onclick(){
    startTimer();
    if (CardOpened.length < 2 && !CardOpened.includes(this)){;
        this.setAttribute("class", "show open card");
        CardOpened.push(this);
        // check if there is a match
        if(CardOpened.length == 2){
        setTimeout(CheckCardMatch, 800)
        }
      } 
} 
// check if there is a match function
function CheckCardMatch(){
    if(CardOpened.length==2){
        let cardOne = CardOpened[0];
        let cardTwo = CardOpened[1];
        let iconOne = cardOne.children[0].className;
        let iconTwo = cardTwo.children[0].className;
        if(iconOne==iconTwo){
            cardOne.classList.add("match");
            cardTwo.classList.add("match");
// if there is no match then           
        }else{
            cardOne.className="card NOmatch";
            cardTwo.className="card NOmatch";
            setTimeout(() => {
                cardOne.className="card";
                cardTwo.className="card";
            },500);
        }
//  Count Score
        RatingANDmoves();
        UpdateScore();
        CardOpened = [];
    }
// Check if the player wins
    setTimeout(() => {
        const remainingCard = document.querySelectorAll(".card:not(.match)");
        if (remainingCard.length == 0) {
            openModal();
        }
    },600);
}
// Updat number of moves and reating
function RatingANDmoves() {
    moves += 1;
    if (moves === 17) {
        rating--;
        stars[2].classList.add('empty-star');
    } else if (moves === 26) {
        rating--;
        stars[1].classList.add('empty-star');
    } 
}
function UpdateScore(){
    let movesElement = document.querySelector(".moves");
    movesElement.innerHTML = moves;
}
//"You Win" Screen
function openModal() {
let modal = document.querySelector("#modal");
const modalHours = document.querySelector('#modal .hours');
const modalMins = document.querySelector('#modal .mins');
const modalSeconds = document.querySelector('#modal .seconds');
const modalMoves = document.querySelector('#modal .moves');
const modalRating = document.querySelector('#modal .rating');
modalHours.textContent = hour > 0 ? `${hour} hours, ` : '';
modalMins.textContent = min > 0 ? `${min} min, ` : '';
modalSeconds.textContent = `${sec} sec`;
modalMoves.textContent = `${moves} moves  `;
modalRating.textContent = `${rating}`;
modal.style.display = 'block';
}
//Restart the Game
function restartGame(){
    //Reset Cards
    shuffleCards()
    // Reset time
    stopTimer()
    elapsedSeconds = 0;
    hour = 0;
    min = 0;
    sec = 0;
    // Reset rating
    rating = 3;
    stars.forEach(star =>{
        star.classList.remove('empty-star');
        star.classList.add('star');
    });
    // Reset moves
    moves = 0;
    movesCount.textContent = moves;
    CardOpened =[];
    //close Modal
    modal.style.display = 'none';
    cards.forEach(card =>{card.classList.remove("open" ,"match" , "show");});
}
//Timer
function startTimer() {
    if (!gameStarted) {
        gameStarted = true;
        timer = setInterval(setTime, 1000);
    }
}
function stopTimer() {
    gameStarted = false;
    clearInterval(timer);
    timerHours.textContent = '00';
    timerMins.textContent='00';
    timerSeconds.textContent='00';
}
function setTime() {
    let remainderSeconds = ++elapsedSeconds;
    hour = parseInt(remainderSeconds / 3600);
    timerHours.textContent = stringifyTime(hour);
    remainderSeconds = remainderSeconds % 3600;
    min = parseInt(remainderSeconds / 60)
    timerMins.textContent = stringifyTime(min);
    remainderSeconds = remainderSeconds % 60;
    sec = remainderSeconds;
    timerSeconds.textContent = stringifyTime(sec);
}
function stringifyTime(val) {
    let valString = val + '';
    return valString.length >= 2 ? `${val}` : `0${val}`;
}