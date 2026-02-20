let Thehighthings = [];
let TheLowthings = [];
let badwords = [];

async function loadTheThingsidk() {
    try {
        const [Big67, small67, le_cuss_words] = await Promise.all([
            fetch('the_txts/high.txt'),
            fetch('the_txts/low.txt'),
            fetch('the_txts/no_more_saying_cuss_words_guys.txt')
        ]);

        const highText = await Big67.text();
        const medText = await small67.text();
        const nonowords = await le_cuss_words.text();

        Thehighthings = highText.split('\n').map(word => word.trim().toLowerCase()).filter(word => word !== "");
        TheLowthings = medText.split('\n').map(word => word.trim().toLowerCase()).filter(word => word !== "");
        badwords = nonowords.split('\n').map(word => word.trim().toLowerCase()).filter(word => word !== "");
        
    } catch (error) {   
        console.error("Ts not working vro sowwy:(", error);
    }
}

loadTheThingsidk(); 

// No more cusswords guys
function censorText(text) {
    let goodtext = text;
    badwords.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        
        
        goodtext = goodtext.replace(regex, (match) => {
            return "*".repeat(match.length);
        });
    });
    return goodtext;
}



function processThoughts() {
    const input = document.getElementById('thought-input');
    const originalText = input.value.trim();
    if (originalText === "") return;

   
    const filteredText = censorText(originalText); //<<<< this is where the bad words get unbadded

    const lowerText = filteredText.toLowerCase();
    let targetId = 'low-bucket'; 

    
    if (Thehighthings.some(word => lowerText.includes(word))) {
        targetId = 'high-bucket';
    } 
    else if (TheLowthings.some(word => lowerText.includes(word))) {
        targetId = 'medium-bucket';
    }

    
    const entry = document.createElement('div');
    entry.className = "bucket-item";
    entry.innerHTML = `
        <span>${filteredText}</span>
        <button onclick="this.parentElement.remove()" style="background:none; border:none; cursor:pointer; font-size:12px;">✕</button>
    `;
    
    document.getElementById(targetId).appendChild(entry);
    input.value = "";
    input.focus(); 
}