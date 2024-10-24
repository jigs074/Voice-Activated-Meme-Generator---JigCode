let recognition;
if ('webkitSpeechRecognition' in window) {
  recognition = new webkitSpeechRecognition();
} else {
  alert("Web Speech API is not supported in this browser.");
}

recognition.continuous = false;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

function startRecognition() {
  recognition.start();

  recognition.onresult = function (event) {
    let spokenText = event.results[0][0].transcript;
    document.getElementById("speechResult").innerText = "You said: " + spokenText;
    parseMemeCommand(spokenText);
  };
}

// Meme templates with IDs
const memeTemplates = {
  'drake': '181913649',  // Drake Meme template ID
  'one does not simply': '61579',  // "One Does Not Simply" meme template ID
  // Add more templates here
};

function parseMemeCommand(text) {
    console.log("Original command:", text);  // Log the full command
  
    // Adjust regular expressions to not require quotes around top and bottom text
    let topTextMatch = text.match(/top text (.*?) and/i);
    let bottomTextMatch = text.match(/bottom text (.*)/i);
  
    // Log the captured values to see if they are being extracted correctly
    console.log("Top Text Match:", topTextMatch);
    console.log("Bottom Text Match:", bottomTextMatch);
  
    // Check if both texts are present
    if (topTextMatch && bottomTextMatch) {
      let topText = topTextMatch[1];  // Capture the top text
      let bottomText = bottomTextMatch[1];  // Capture the bottom text
  
      console.log("Extracted Top Text:", topText);  // Log the extracted top text
      console.log("Extracted Bottom Text:", bottomText);  // Log the extracted bottom text
  
      generateMeme(topText, bottomText);  // Pass the texts to generate the meme
    } else {
      // Log the issue if either top or bottom text is missing
      if (!topTextMatch) {
        console.log("Error: Top text not provided.");
      }
      if (!bottomTextMatch) {
        console.log("Error: Bottom text not provided.");
      }
      alert("Please specify both top and bottom text.");
    }
  }
  

  function generateMeme(topText, bottomText) {
    const memeID = '181913649';  // Meme template ID (in this case, the "One Does Not Simply" meme)
    const url = 'https://api.imgflip.com/caption_image';

  
    const params = new URLSearchParams({
      template_id: memeID,
      text0: topText,
      text1: bottomText,
      username: 'Jignesh07',  // Your Imgflip username
      password: '&-b5naXrG!$V.LV'  // Your Imgflip password
    });
  
    fetch(url, {
      method: 'POST',
      body: params
    })
    .then(response => response.json())
    .then(data => {
      console.log("API Response:", data);  // Log the full API response for debugging
  
      if (data.success) {
        document.getElementById('meme').src = data.data.url;  // Set the meme image
      } else {
        console.error("Error from Imgflip:", data.error_message);  // Log the error message from Imgflip
        alert("Error generating meme: " + data.error_message);  // Display the error message to the user
      }
    })
    .catch(err => {
      console.error("Fetch Error:", err);  // Log any fetch-related errors
    });
  }