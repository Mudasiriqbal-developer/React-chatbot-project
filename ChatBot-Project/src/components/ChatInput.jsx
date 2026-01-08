import LaodingSpinImage from '../assets/loading-spinner.gif';
import { Chatbot } from 'supersimpledev';
import { useState } from 'react';
import  dayjs  from 'dayjs';

import './ChatInput.css';

export function ChatInput({chatMessages, setChatMessages}) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

    async function sendMessage() {
    if (isLoading || inputText === '') {
      return;
    }
    setIsLoading(true);

    setInputText('');

    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        is: crypto.randomUUID(),
        time:dayjs().valueOf()
      }
    ];
    setChatMessages([
      ...newChatMessages,

      {
        message: <img src={LaodingSpinImage} className="loading-spinner" />,
        sender: 'robot',
        id: crypto.randomUUID(),
        time:dayjs().valueOf()
      }
    ]);

    const response =await Chatbot.getResponseAsync(inputText);
      setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        is: crypto.randomUUID()
      }
    ]);
    setIsLoading(false)
  }

  function handleKeyDown(event) {
    if(event.key === 'Enter') {
      sendMessage();
    }
  }

  function clearMessages() {
    setChatMessages([]);

    // Here, you could also run:
    // localStorage.setItem('messages', JSON.stringify([]));

    // However, because chatMessages is being updated, the
    // useEffect in the App component will run, and it will
    // automatically update messages in localStorage to be [].
  }

  return (
    <div className="chat-input-container">
      <input  
        disabled={isLoading}
        placeholder="Send Message To ChatBot" 
        size="30" 
        onChange={saveInputText}
        onKeyDown={handleKeyDown}
        value={inputText}
        className="chat-input"
      />
      <button
        onClick={sendMessage}
        className="send-button"
      >Send
      </button>
      <button
        onClick={clearMessages}
        className="clear-button"
      >Clear
      </button>
      
    </div>
  );
}