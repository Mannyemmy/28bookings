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
    
      </>
    

   
  );
};

export default Chat;
