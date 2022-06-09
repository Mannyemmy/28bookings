import React, { useState, useEffect, useCallback, useRef, } from "react";
import { useSelector } from "react-redux";
import useWebSocket, { ReadyState } from "react-use-websocket";
import Navbar from "../../components/_navbar/Navbar";
import ChatUi from "./ChatUi"
import {useLocation} from 'react-router-dom'
import {useGetChatMessagesMutation} from "../../services/chatsApi"


function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Chat = () => {

  let query = useQuery();
  const [
    getMessages, // This is the mutation trigger
    { data : messagesHistory , isLoading: isUpdating, isSuccess : isGetMessagesSuccess }, // This is the destructured mutation result
  ] = useGetChatMessagesMutation()


  const to_user = query.get("userId")

  // Public API that will echo messages sent to it back to the client
  const clientId = useSelector((state) => state.auth.user.id);




  useEffect(() => {
    getMessages({'from_user_id' : clientId, 'to_user_id' : to_user})
    
  }, [])

  

  return (
      <>
      <Navbar/>
      
      <ChatUi messages={messagesHistory} />
      {/* <div className="container tw-my-5">
      <h1>Chat</h1>
      <div className="chat-container">
         <div className="chat">
        {messageHistory.map(
          (message, idx) => {
            var messageparsed = JSON.parse(message.data);

            if (messageparsed.clientId === clientId) {
              return (
                <div key={idx} className="my-message-container">
                  <div className="my-message">
                    <p className="client">client id : {clientId}</p>
                    <p className="message">{messageparsed.message}</p>
                  </div>
                  <div ref={bottomRef} />
                </div>
              );
            } else {
              return (
                <div key={idx} className="another-message-container">
                  <div className="another-message">
                    <p className="client">client id : {messageparsed.clientId}</p>
                    <p className="message">{messageparsed.message}</p>
                  </div>
                  <div ref={bottomRef} />
                </div>
              );
            }
          }
          //   <span key={idx}>{message ? message.data : null}</span>
        )}
       
      </div>
      <div className="input-chat-container">
        <input type="number" name="receiving_user" onChange={(e) =>
              setMessage({
                ...message,
                [e.target.name]: e.target.value,
              })
            } value={message.receiving_user}/>
          <input
            className="input-chat"
            name="message"
            type="text"
            placeholder="Chat message ..."
            onChange={(e) =>
              setMessage({
                ...message,
                [e.target.name]: e.target.value,
              })
            }
            value={message.message}
          ></input>
          <button className="submit-chat" onClick={handleClickSendMessage}
     disabled={readyState !== ReadyState.OPEN}>
            Send
          </button>
        </div>
      </div>
    </div> */}
      </>
    

    //   <div>
    //     <button onClick={handleClickChangeSocketUrl}>
    //       Click Me to change Socket Url
    //     </button>
    //     <button
    //       onClick={handleClickSendMessage}
    //       disabled={readyState !== ReadyState.OPEN}
    //     >
    //       Click Me to send 'Hello'
    //     </button>
    //     <span>The WebSocket is currently {connectionStatus}</span>
    //     {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
    //     <ul>
    //       {messageHistory.map((message, idx) => (
    //         <span key={idx}>{message ? message.data : null}</span>
    //       ))}
    //     </ul>
    //   </div>
  );
};

// const Chat = () => {
//   //   const [clientId, setClienId] = useState(
//   //     Math.floor(new Date().getTime() / 1000)

//   //   );

//   const clientId = useSelector((state) => state.auth.user.id);

//   const [chatHistory, setChatHistory] = useState([]);
//   const [isOnline, setIsOnline] = useState(false);
//   const [textValue, setTextValue] = useState("");
//   const [websckt, setWebsckt] = useState();

//   const [message, setMessage] = useState({
//     'receiving_user': null,
//     'message' : "",
//   });
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     const url = "ws://localhost:8000/ws/" + clientId;
//     const ws = new WebSocket(url);

//     ws.onopen = (event) => {
//       ws.send(JSON.stringify({"message" :"Connect"}));
//     };

//     // recieve message every start page
//     ws.onmessage = (e) => {
//       const message = JSON.parse(e.data);
//       console.log(message);
//       setMessages([...messages, message]);
//     };

//     setWebsckt(ws);
//     //clean up function when we close page
//     return () => ws.close();
//   }, []);

//   const sendMessage = () => {
//     websckt.send(JSON.stringify(message));
//     // recieve message every send message
//     websckt.onmessage = (e) => {
//       const message = JSON.parse(e.data);
//       console.log(messages);
//       setMessages([...messages, message]);
//     };
//     setMessage({
//         'receiving_user': null,
//         'message' : "",
//       });
//   };

//   return (
//     <div className="container">
//       <h1>Chat</h1>
//       <h2>Your client id: {clientId} </h2>
//       <div className="chat-container">
//         <div className="chat">
//           {messages.map((value, index) => {
//             if (value.clientId === clientId) {
//               return (
//                 <div key={index} className="my-message-container">
//                   <div className="my-message">
//                     <p className="client">client id : {clientId}</p>
//                     <p className="message">{value.message}</p>
//                   </div>
//                 </div>
//               );
//             } else {
//               return (
//                 <div key={index} className="another-message-container">
//                   <div className="another-message">
//                     <p className="client">client id : {clientId}</p>
//                     <p className="message">{value.message}</p>
//                   </div>
//                 </div>
//               );
//             }
//           })}
//         </div>
//         <div className="input-chat-container">
//           <input type="number" name="receiving_user" onChange={(e) =>
//               setMessage({
//                 ...message,
//                 [e.target.name]: e.target.value,
//               })
//             } value={message.receiving_user}/>
//           <input
//             className="input-chat"
//             name="message"
//             type="text"
//             placeholder="Chat message ..."
//             onChange={(e) =>
//               setMessage({
//                 ...message,
//                 [e.target.name]: e.target.value,
//               })
//             }
//             value={message.message}
//           ></input>
//           <button className="submit-chat" onClick={sendMessage}>
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

export default Chat;
