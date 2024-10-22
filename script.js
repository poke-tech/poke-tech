let btn = document.querySelector("#btn");
let content = document.querySelector("#content");

/*function speak(text){
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-GB";
    window.speechSynthesis.speak(text_speak);
}*/
function speak(text, options = {}) {
    if ('speechSynthesis' in window) {
        let text_speak = new SpeechSynthesisUtterance(text);

        // Default settings
        text_speak.rate = options.rate || 1;
        text_speak.pitch = options.pitch || 1;
        text_speak.volume = options.volume || 1;
        text_speak.lang = options.lang || "en-GB";

        // Voice selection
        const voices = window.speechSynthesis.getVoices();
        if (options.voice) {
            const selectedVoice = voices.find(voice => voice.name === options.voice);
            if (selectedVoice) {
                text_speak.voice = selectedVoice;
            } else {
                console.warn('Requested voice not found, using default voice.');
            }
        }

        // Speak text
        window.speechSynthesis.speak(text_speak);

        // Error handling
        text_speak.onerror = (event) => {
            console.error('SpeechSynthesisUtterance.onerror', event);
        };

        // Callback after speaking
        if (options.onEnd) {
            text_speak.onend = options.onEnd;
        }

    } else {
        console.error('Speech synthesis not supported in this browser.');
    }
}

// Example usage:
speak("Hello, how can I assist you today?", {
    rate: 1.2,
    pitch: 1.1,
    volume: 0.9,
    lang: "en-US",
    voice: "Google UK English Male",
    onEnd: () => {
        console.log('Finished speaking');
    }
});


function wishMe(){
    let day = new Date();
    let hours = day.getHours();
    console.log(hours);

    if(hours >= 0 && hours < 12){
        speak("Good morning  sir,I am activate now. ");
    } else if(hours >= 12 && hours < 16){
        speak("Good afternoon sir,I am activate now. ");
    } else {
        speak("Good evening sir,I am activate now. ");
    }
}

document.getElementById('start-interaction').addEventListener('click', () => {
    wishMe();
});



//document.getElementById('btn').addEventListener('click', () => {
  //  wishMe();})
  // Correct initialization with browser compatibility
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex
    let transcript = event.results[currentIndex][0].transcript
    content.innerText= transcript
    takeCommand(transcript.toLowerCase())
   
};

btn.addEventListener("click", () => {
    recognition.start();
});
function takeCommand(message){
    if (message.includes("hello")|| message.includes("hey")){
        speak("what can i do for you mr.Sahil?")
    }
    else if(message.includes("who are you")){
        speak("I am sara , a vartual assistant. sahil sir made me")
    }
    else if(message.includes("open youtube")){
        speak("sure sir")
        window.open("https://www.youtube.com")
    }
    else if(message.includes("open facebook")){
        speak("sure sir")
        window.open("https://www.facebook.com")
    }
    else if(message.includes("open instagram")){
        speak("sure sir")
        window.open("https://www.instagram.com")
    }
    else if(message.includes("open whatsapp")){
        speak("sure sir")
        window.open("https://www.whatsapp.com")
    }
    else if(message.includes("open chatgpt")){
        speak("sure sir")
        window.open("https://openai.com/chatgpt/overview")
    }
    else if(message.includes("open calculator")){
        speak("sure sir")
        window.open("calculator://")
    }
    else if (message.includes("open notepad")) {
        speak("Sure sir, opening Notepad.");
        window.open("notepad://");
    } else if (message.includes("open paint")) {
        speak("Sure sir, opening Paint.");
        window.open("mspaint://");
    } else if (message.includes("open mail")) {
        speak("Sure sir, opening Mail.");
        window.open("mailto://");
    } else if (message.includes("open calendar")) {
        speak("Sure sir, opening Calendar.");
        window.open("outlookcal://");
    } else if (message.includes("open browser")) {
        speak("Sure sir, opening your browser.");
        window.open("https://www.google.com")}
     
            else{
                speak(`this is what i found on internet regarding ${message.replace("sara","")||replace("shara","")}`)
                window.open(`https://www.google.com/search?q= ${message.replace("sara","")||replace("shara","")}`)

            }
             
        
    
    
    }


