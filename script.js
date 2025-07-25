const randomWordList = [
    //Food & Drink
    "apple", "banana", "carrot", "orange", "milk", "water", "pizza", "sandwich", "hamburger", "fries", "cake", "chocolate", "coffee", "tea", "rice", "pasta", "soup", "egg", "cheese", "ice cream",
    // Animals
    "dog", "cat", "bird", "fish", "lion", "tiger", "elephant", "bear", "rabbit", "horse", "penguin", "monkey", "frog", "snake", "turtle", "cow", "pig", "chicken", "goat", "duck",
    //Places
    "beach", "park", "school", "hospital", "airport", "zoo", "museum", "forest", "city", "mountain", "desert", "farm", "castle", "library", "house", "mall", "cave", "garden", "theater", "station",
    //Clothes
    "shirt", "pants", "shoes", "hat", "dress", "jacket", "gloves", "socks", "scarf", "boots", "tie", "shorts", "jeans", "hoodie", "skirt", "uniform", "belt", "coat", "suit", "sandals",
    //Events & Activities
    "party", "wedding", "birthday", "graduation", "concert", "picnic", "parade", "movie", "vacation", "game", "school", "class", "camping", "dancing", "fishing", "hiking", "swimming", "racing", "cooking", "shopping",
    //Sports & Games
    "soccer", "basketball", "baseball", "tennis", "football", "golf", "hockey", "boxing", "chess", "bowling", "volleyball", "swimming", "skiing", "running", "karate", "skateboarding", "gymnastics", "darts", "archery", "surfing",
    //Objects & Toys
    "ball", "doll", "toy", "phone", "computer", "clock", "pencil", "book", "backpack", "bike", "car", "truck", "robot", "dice", "card", "game", "tablet", "key", "lamp", "chair",
    //Jobs
    "teacher", "doctor", "nurse", "police", "firefighter", "chef", "pilot", "farmer", "singer", "dancer", "actor", "engineer", "soldier", "judge", "lawyer", "dentist", "plumber", "baker", "artist", "driver",
    //Home & Furniture
    "bed", "table", "chair", "couch", "lamp", "fridge", "stove", "sink", "mirror", "door", "window", "carpet", "shelf", "closet", "television", "microwave", "drawer", "fan", "curtain", "blanket",
    //Nature & Weather
    "sun", "moon", "star", "rain", "snow", "wind", "cloud", "tree", "flower", "leaf", "river", "ocean", "mountain", "fire", "rock", "sand", "grass", "thunder", "ice", "storm"]
const noSelection = null;
let currentPlayerIndex = 0;
let selectedImposters = [];
let storedWord = "";
const nextButton = document.createElement("button");
nextButton.innerText = "Next Player";
nextButton.onclick = showNextPlayer;

const randomizeImposterButton = document.querySelector('#randomizeImposterButton');
const generateButton = document.querySelector('#generateButton');
const text = document.querySelector("#text");

nextButton.disabled = false;

//INITIATIZE BUTTONS
randomizeImposterButton.onclick = generateImposterNumber;
generateButton.onclick = generate;

//FUNCTIONS
function check(){
    console.log("working");
}

//Generates random word from randdomWordList
function generateRandomWord(){
    let random = Math.floor(Math.random()*randomWordList.length);
    console.log(randomWordList[random]);
    return randomWordList[random];
}

//Returns playerAmount 
function getPlayerAmount(){
    const playerAmount = parseInt(document.querySelector('#playerAmount').value);
    console.log(playerAmount);
    return playerAmount;
}

//Returns imposterAmount
function getImposterAmount(){
    const imposterAmount = parseInt(document.querySelector('#imposterAmount').value);
    console.log(imposterAmount);
    return imposterAmount;
}

//Generates random number of imposter from 0-playerAmount
function generateImposterNumber(){
    document.querySelector('#imposterAmount').style.display = 'none';
    const playerAmount = getPlayerAmount();
    const imposterAmount = Math.floor(Math.random() * playerAmount);
    document.querySelector('#imposterAmount').value = imposterAmount;
    console.log(imposterAmount);
}

/*
//Checks which radio button was checked, returns "noWords", "differentWords", or noSelection
function imposterSetting(){
    const choice = document.querySelector('input[name="imposterSettings"]:checked');
    if(choice){
        console.log(document.querySelector('input[name="imposterSettings"]:checked').value);
        return(document.querySelector('input[name="imposterSettings"]:checked').value);
    }
    else{
        console.log("no selection");
        return(noSelection);
    }
}
*/

//Chooses imposters
function chooseImposters(playerCount, imposterCount) {
    const imposters = new Set();
    while (imposters.size < imposterCount) {
        const randomIndex = Math.floor(Math.random() * playerCount);
        imposters.add(randomIndex);
    }

    return Array.from(imposters);
}

function showNextPlayer() {
    if (currentPlayerIndex >= getPlayerAmount()) {
        text.innerText = "All players have viewed their word!";
        nextButton.disabled = true;
        return;
    }

    const isImposter = selectedImposters.includes(currentPlayerIndex);
    let message = `Player ${currentPlayerIndex + 1}, `;
    if (isImposter) {
        message += "you are the IMPOSTER!";
    } else {
        message += `your word is: ${storedWord}`;
    }
    text.innerText = message;
    text.classList.add('blurred');
    text.onclick = () => text.classList.remove('blurred');
    text.style.color = "black";
    text.style.fontFamily = "Arial";
    text.style.fontSize = "20px";
    text.style.fontWeight = "bold";

    currentPlayerIndex++;
}

//Runs the generation
function generate() {
    const playerAmount = getPlayerAmount();
    const randomWord = generateRandomWord();
    storedWord = randomWord;
    const imposterAmount = getImposterAmount();
    //const shouldImposterSetting = imposterSetting();

    if (isNaN(playerAmount) || isNaN(imposterAmount)) {
        alert("Please enter valid numbers for players and imposters.");
        return;
    }

    if (imposterAmount >= playerAmount) {
        alert("Imposters must be fewer than players.");
        return;
    }

    selectedImposters = chooseImposters(playerAmount, imposterAmount);
    currentPlayerIndex = 0;
    nextButton.disabled = false;

    text.innerText = "";

    if (!document.body.contains(nextButton)) {
        document.body.appendChild(document.createElement("br"));
        document.body.appendChild(nextButton);
    }

    generateButton.innerText = "Restart";
    generateButton.onclick = resetGame;

    showNextPlayer();
}

function resetGame() {
    //Reset variables
    currentPlayerIndex = 0;
    selectedImposters = [];
    storedWord = "";

    //Reset form inputs
    document.querySelector('#playerAmount').value = "";
    document.querySelector('#imposterAmount').value = "";
    document.querySelector('#imposterAmount').style.display = 'inline';

    /*
    const selectedRadio = document.querySelector('input[name="imposterSettings"]:checked');
    if (selectedRadio) selectedRadio.checked = false;
    */

    //Reset text
    text.innerText = "";
    text.style = "";

    //Remove Next Player button
    if (document.body.contains(nextButton)) {
        document.body.removeChild(nextButton);
    }

    //Reset Generate button
    generateButton.innerText = "Start";
    generateButton.onclick = generate;
}
