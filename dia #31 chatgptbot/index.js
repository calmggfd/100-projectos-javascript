const   chatLog =   document.getElementById('chat-log'),
        userInput   =   document.getElementById('user-input'),
        sendButton  =   document.getElementById('send-button'),
        buttonIcon  =   document.getElementById('button-icon'),
        info    =   document.querySelector('.info');

sendButton.addEventListener('click',    sendMessage);
userInput.addEventListener('keydown',   (event) =>  {
    if  (event.key    === 'Enter')    {
        sendMessage();
    }
});

function    sendMessage(){
    const   message =   userInput.value.trim();
    // IF   MESSAGE =   EMPTY DO NOTHING
    if(message  === ''){
        return;
    }
    // IF   MESSASGE    =   DEVELOPER   -   SHOW    OUR MESSAGE
    else   if(message  === 'developer'){
        // CLEAR    INPUT   VALUE
        userInput.value =   '';
        // APPEND MESSAGE AS USER - WE WILL CODE IT'S FUNCTION
        appendMessage('user',   message);
        // SETS A FAKE TIMOUT THAT SHOWING LOADING ON SEND BUTTON
        setTimeout(()   =>  {
            // SEND OUR MESSAGE AS BOT (SENDER: BOT)
            appendMessage('bot',    'This Source Coded By Caamggmc');
            // CHANGE BUTTON ICON TO DEFAULT
            buttonIcon.classList.add('fa-solid',    'fa-paper-plane');
            buttonIcon.classList.remove('fas',  'fa-spinner',   'fa-pulse');
        },  2000);
        return;
    }

    // ELSE IF NONE OF ABOVE
    // APPENDS USERS MESSAGE TO SCREEN
    appendMessage('user', message);
    userInput.value =   '';

    const options   =   {
        method: 'POST',
    	headers: {
		'x-rapidapi-key': 'efcc7cc27amshf671e32afc844ccp1f6e44jsnfc729efdc5a7',
		'x-rapidapi-host': 'chatgpt-best-price.p.rapidapi.com',
		'Content-Type': 'application/json'
        // IF YOU  WANT USE OFFICIAL API
	},

        body: `{"messages":[{"role":"user","content":"${message}"}]}`
        // IF YOU WANT  USER OFFICIAL API YOU NEED HAVE THIS BODY
        // {"MODEL":"GPT-3.5-TURBO","messages":[{"role":"user","content":"${message}"}]}
    };
    // OFICIAL API : 'https://chatgpt-best-price.p.rapidapi.com/v1/chat/completions';
    fetch('https://chatgpt-best-price.p.rapidapi.com/v1/chat/completions', options).then((response) => response.json()).then((response) =>{
        appendMessage('bot', response.choices[0].message.content);
        buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
            buttonIcon.classList.remove('fas', 'fa-spinner',    'fa-pulse');
    }).catch((err)   =>{
        if(err.name === 'TypeError'){
            appendMessage('bot',    'Error: Check Your Api Key!');
            buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
            buttonIcon.classList.remove('fas', 'fa-spinner',    'fa-pulse');
        }
    });
}

function    appendMessage(sender,   message){
    info.style.display  =   "none";
    // CHANGE SEND BUTTON ICON TO LOADING USING FONTAWESOME
    buttonIcon.classList.remove('fa-solid', 'fa-paper-plane');
    buttonIcon.classList.add('fas', 'fa-spinner', 'fa-pulse');

    const messageElement    =   document.createElement('div');
    const iconElement    =   document.createElement('div');
    const chatElement    =   document.createElement('div');
    const icon    =   document.createElement('i');

    chatElement.classList.add("chat-box");
    iconElement.classList.add("icon");
    messageElement.classList.add(sender);
    messageElement.innerText    =   message;

    // ADD ICONS DEPENDING ON WHO SEND MESSAGE BOT OR USER
    if(sender   === 'user'){
        icon.classList.add('fa-regular', 'fa-user');
        iconElement.setAttribute('id', 'user-icon');
    }else{
        icon.classList.add('fa-solid', 'fa-robot');
        iconElement.setAttribute('id', 'bot-icon');
    }

    iconElement.appendChild(icon);
    chatElement.appendChild(iconElement);
    chatElement.appendChild(messageElement);
    chatLog.appendChild(chatElement);
    chatLog.scrollTo    =   chatLog.scrollHeight;
}