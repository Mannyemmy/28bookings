import React, {
  useEffect,
  useState,
  useRef,
  Component,
  useCallback,
} from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useLocation, useHistory } from "react-router-dom";
import {
  useGetUserChatsMutation,
  useGetChatMessagesMutation,
} from "../../services/chatsApi";

import { useGetUserQuery } from "../../services/usersApi";
import {url} from "../../helper"
import ChatUserList from "./ChatUserList";

import { isMobile } from "react-device-detect";

import { useDispatch, useSelector } from "react-redux";

let wsUrl =  `${process.env.REACT_APP_BASE_CHAT_URL}/ws/`

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const ChatUi = (props) => {
  const history = useHistory()
  const [socketUrl, setSocketUrl] = useState(null);
  const [activeChat, setActiveChat] = useState(0);
  const messageRef = useRef();
  const [searchKey, setSearchKey] = useState("");
  const clientId = useSelector((state) => state.auth.user.id);
  const [messageHistory, setMessageHistory] = useState([]);
  const [message, setMessage] = useState({
    from_user_id: null,
    to_user_id: null,
    message: "",
  });

  const getChatId = (to, from) => {
    if (to < from) {
      return `${to.toString()}:${from.toString()}`;
    } else {
      return `${from.toString()}:${to.toString()}`;
    }
  };
  const checkClientId = (to, from) => {
    if (to === clientId) {
      return from;
    } else {
      return to;
    }
  };

  const [
    getUsers, // This is the mutation trigger
    { data: chatUsers, isLoading, isSuccess: isGetUsersSuccess }, // This is the destructured mutation result
  ] = useGetUserChatsMutation();

  const [
    getMessages, // This is the mutation trigger
    { data: messages, isLoading: isUpdating, isSuccess: isGetMessagesSuccess }, // This is the destructured mutation result
  ] = useGetChatMessagesMutation();

  useEffect(() => {
    getUsers("");
  }, []);

  useEffect(() => {
    isGetUsersSuccess &&
      setMessage({
        ...message,
        from_user_id: parseInt(clientId),
        to_user_id: parseInt(
          checkClientId(
            chatUsers[activeChat]?.to_user_id,
            chatUsers[activeChat]?.from_user_id
          )
        ),
      });
    isGetUsersSuccess &&
      setSocketUrl(
        wsUrl +
          getChatId(
            clientId,
            checkClientId(
              chatUsers[activeChat]?.to_user_id,
              chatUsers[activeChat]?.from_user_id
            )
          )
      );
    isGetUsersSuccess &&
      getMessages({
        from_user_id: clientId,
        to_user_id: checkClientId(
          chatUsers[activeChat]?.to_user_id,
          chatUsers[activeChat]?.from_user_id
        ),
      });
  }, [chatUsers]);

  const {
    sendMessage,
    sendJsonMessage,
    lastJsonMessage,
    lastMessage,
    readyState,
  } = useWebSocket(socketUrl);

  useEffect(() => {
    if (messages !== undefined || messages !== null) {
      setMessageHistory(messages);
      if (messageRef.current) {
        messageRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  }, [messages]);

  useEffect(() => {
    if (lastJsonMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastJsonMessage));
    }
  }, [lastJsonMessage, setMessageHistory]);

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.charCode === 13) {
      handleMessageSubmit();
    }
  };
  const handleMessageSubmit = () => {
    if (message.message !== "") {
      handleClickSendMessage();
    }
    setMessage({
      ...message,
      message: "",
    });
  };
  const handleClickSendMessage = useCallback(
    () => sendJsonMessage(message),
    [message]
  );

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageHistory]);

  const changeUser = useCallback(
    (index, from_user_id, to_user_id) => {
      if(isMobile){
          history.push(`/chat?userId=${checkClientId(from_user_id, to_user_id)}`)
      }else{
         setActiveChat(index);
      setMessage({
        ...message,
        from_user_id: parseInt(clientId),
        to_user_id: parseInt(checkClientId(from_user_id, to_user_id)),
      });
      getMessages({
        from_user_id: from_user_id,
        to_user_id: to_user_id,
      });
      setSocketUrl(wsUrl + getChatId(from_user_id, to_user_id));
      }
     
    },

    []
  );
  // if (isMobile) {
  //       window.location.assign(
  //         "/user-chat-room/" + chat.from_user_id + "/" + chat.to_user_id
  //       );
  //     }

  //   const searchUser = (value) => {
  //     setSearchKey(value);
  //     dispatch(fetchChatUsersStart({ search_key: value }));
  //   };
  return (
    <div className="tw-container tw-mx-auto tw-px-2 tw-mb-2">
      <div className=" tw-min-w-full   tw-rounded lg:tw-grid lg:tw-grid-cols-3 lg:tw-gap-x-2">
        <div className="lg:tw-border-r lg:tw-border-gray-300 lg:tw-col-span-1">
          <div className="tw-flex  tw-justify-start tw-space-x-2 tw-my-2 tw-mx-1 md:tw-m-3 !tw-items-center">
            <h1 className="!tw-text-lg !tw-m-0 tw-font-medium tw-text-green-500 tw-tracking-wide">
              Inbox
            </h1>
            <div className="tw-flex tw-items-center tw-relative tw-max-w-full md:tw-max-w-[337px] tw-overflow-hidden tw-p-1 !tw-border tw-border-solid  tw-border-[#eee] tw-rounded-[50px] tw-resize-none tw-m-0 tw-h-5 tw-transition-all tw-duration-300 tw-delay-[0s] tw-ease-in-out ">
              <div className="tw-h-full tw-flex tw-items-center tw-justify-center tw-cursor-pointer tw-pl-1">
                <img
                  src="/svg-icons/search-grey.svg"
                  width="auto"
                  alt="search-grey"
                  className="tw-h-[16px] !tw-text-[14px]"
                />
              </div>
              <input
                type="search"
                placeholder="Quick search"
                autoComplete="off"
                className="tw-outline-none focus:tw-outline-none tw-border-0 tw-bg-transparent tw-border-none tw-font-light tw-text-normal tw-w-full tw-appearance-none tw-py-[8px] tw-px-[16px] tw-placeholder-[#BABABA] placeholder:tw-font-light"
              />
            </div>
          </div>
          <ul className="tw-overflow-auto !tw-pl-0 lg:tw-pl-1 tw-max-h-screen md:tw-max-h-[80vh]">
            <li className="tw-list-none">
              {isLoading ? null : chatUsers && chatUsers.length > 0 ? (
                <ChatUserList
                  chatUsers={chatUsers}
                  activeChat={activeChat}
                  // setActiveChat={setActiveChat}
                  changeUser={changeUser}
                />
              ) : (
                <a className="tw-flex tw-items-center tw-px-3 tw-py-2 tw-text-sm tw-transition tw-duration-150 tw-ease-in-out tw-border-b tw-border-gray-300 tw-cursor-pointer hover:tw-bg-gray-100 focus:tw-outline-none">
                  <h6>No user found</h6>
                </a>
              )}
            </li>
          </ul>
        </div>
        {/* started */}
        <div className="tw-hidden lg:tw-block tw-mt-2 lg:tw-col-span-2">
          <div className="tw-max-w-2xl !tw-border-x tw-border-b !tw-border-solid  !tw-border-gray-300 tw-rounded">
            <div className="tw-w-full">
              {!isLoading ? (
                chatUsers && chatUsers.length > 0 ? (
                  chatUsers[activeChat].from_user_id === clientId ? (
                    <div className="tw-relative tw-flex tw-items-center tw-px-3 tw-py-1 tw-border-b tw-border-0 tw-border-solid tw-border-gray-300">
                      <img
                        className="tw-object-cover !tw-w-8 !tw-h-8 tw-rounded-full"
                        src={`${url}${chatUsers[activeChat].to_user.profile[0].picture}`}
                        alt="username"
                      />
                      <span className="tw-block tw-ml-2 tw-font-bold tw-text-gray-600">
                        {chatUsers[activeChat].to_user_name}
                      </span>
                    </div>
                  ) : (
                    <div className="tw-relative tw-flex tw-items-center tw-px-3 tw-py-1 tw-border-b tw-border-0 tw-border-solid tw-border-gray-300">
                      <img
                        className="tw-object-contain !tw-w-8 !tw-h-8 tw-rounded-full"
                        src={`${url}${chatUsers[activeChat].from_user.profile[0].picture}`}
                        alt="username"
                      />
                      <span className="tw-block tw-ml-2 tw-font-bold tw-text-gray-600">
                        {chatUsers[activeChat].from_user_name}
                      </span>
                    </div>
                  )
                ) : null
              ) : (
                <span>loading...</span>
              )}

              <div className="tw-relative tw-w-full tw-p-6 tw-overflow-y-auto tw-h-[10rem]">
                <ul className="tw-space-y-2">
                  {messageHistory && messageHistory.length > 0
                    ? messageHistory.map((message, idx) => (
                        <li
                          key={idx}
                          className={`tw-flex ${
                            clientId === message.from_user_id
                              ? "tw-justify-end "
                              : "tw-justify-start"
                          }`}
                        >
                          <div
                            className={`tw-relative tw-max-w-xl tw-px-3 tw-py-1 tw-text-gray-700 tw-rounded tw-shadow ${
                              clientId === message.from_user_id
                                ? "tw-bg-green-200 "
                                : "tw-bg-gray-100"
                            }`}
                          >
                            <span className="tw-block !tw-text-[13px] !tw-font-normal">
                              {message.message}
                            </span>
                          </div>
                        </li>
                      ))
                    : null}
                </ul>
                <div ref={messageRef}></div>
              </div>

              <div className="tw-flex tw-items-center tw-justify-between tw-w-full tw-p-3 tw-border-t tw-border-gray-300">
                <input
                  type="text"
                  placeholder="Message"
                  className="tw-block tw-w-full tw-py-2 tw-pl-4 tw-mx-3 tw-bg-gray-100 tw-rounded-2xl tw-outline-none focus:tw-text-gray-700"
                  name="message"
                  required
                  onKeyPress={(e) => handleKeypress(e)}
                  onChange={(e) =>
                    setMessage({
                      ...message,
                      [e.target.name]: e.target.value,
                    })
                  }
                  value={message.message}
                />
                <button
                  onClick={handleMessageSubmit}
                  type="submit"
                  className="tw-bg-green-500 tw-rounded-full tw-p-1 tw-outline-none tw-border-none"
                >
                  <img
                    src="/svg-icons/send.svg"
                    className="tw-h-3 tw-w-3 !tw-text-sm"
                    alt=""
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* ended */}
      </div>
    </div>
  );
};

export default ChatUi;
