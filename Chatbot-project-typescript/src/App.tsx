import { useState, useRef, useEffect} from 'react';
import { ChatInput } from './components/ChatInput';
import  ChatMessages  from './components/ChatMessages';
import RobotProfileImage from './assets/robot.png';
import './App.css'

export function useAutoScroll(dependencies) {

  const containerRef = useRef(null);

  useEffect(() => {
    const containerElem = containerRef.current;
    if(containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, dependencies);

  return containerRef;
}

function App() {

  const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('messages')) || []);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(chatMessages));
  }, [chatMessages]);
  
  const title = `${chatMessages.length} Messages`;
  return (
    
    <>
      <title>{title}</title>
      <link rel="icon" type="image/svg+xml" href={RobotProfileImage} />

      <div className="app-container">
        <ChatMessages
          chatMessages={chatMessages}
        />
        <ChatInput
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
        />
      </div>
    </>
  );
}
export default App
