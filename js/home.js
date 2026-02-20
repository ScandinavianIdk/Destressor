// Breathing Exercise Logic
const breatheCircle = document.getElementById('breathe-circle');
const breatheText = document.getElementById('breathe-text');

let stage = 0; // 0: Inhale, 1: Hold, 2: Exhale, 3: Hold

function runBreathing() {
    setInterval(() => {
        // Step 1: Update the visuals and text based on the stage
        if (stage === 0) {
            breatheText.innerText = "Inhale";
            breatheCircle.style.transition = "transform 4s ease-in-out";
            breatheCircle.style.transform = "scale(1.2)"; // Expand
        } 
        else if (stage === 1) {
            breatheText.innerText = "Hold";
            // No scale change, it just stays big
        } 
        else if (stage === 2) {
            breatheText.innerText = "Exhale";
            breatheCircle.style.transition = "transform 4s ease-in-out";
            breatheCircle.style.transform = "scale(1)"; // Shrink
        } 
        else if (stage === 3) {
            breatheText.innerText = "Hold";
            // No scale change, it just stays small
        }

        // Step 2: Move to the next stage (0, 1, 2, 3, then back to 0)
        stage = (stage + 1) % 4;

    }, 4000); // Happens every 4 seconds
}
runBreathing();


let timeLeft = 1500; 
let timerInterval = null;

function toggleTimer() {
    const btn = document.querySelector('.start-btn');
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        btn.innerText = "Start";
    } else {
        btn.innerText = "Pause";
        timerInterval = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                alert("Session Complete!");
                return;
            }
            timeLeft--;
            updateTimerDisplay();
        }, 1000);
    }
}

function updateTimerDisplay() {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    
    document.getElementById('timer-display').innerText = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}






let quotes = [];


async function loadQuotes() {
    try {
        const response = await fetch('the_txts/random_motivational_quotes.txt');
        const text = await response.text();
        
       
        quotes = text.split('\n').map(line => line.trim()).filter(line => line !== "");
        
        
        showRandomQuote();
    } catch (error) {
        console.error("The smart people quotes did not load properly:", error);
        document.getElementById('quote').innerText = "Keep moving forward.";
    }
}

function showRandomQuote() {
    if (quotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        document.getElementById('quote').innerText = quotes[randomIndex];
    }
}


window.onload = () => {
    loadQuotes();
    
    
};