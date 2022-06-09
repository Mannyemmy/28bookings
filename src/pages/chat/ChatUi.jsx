import React, {
  useEffect,
  useState,
  useRef,
  Component,
  useCallback,
} from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useLocation } from "react-router-dom";
import { useGetChatMessagesMutation } from "../../services/chatsApi";
import { Link } from "react-router-dom";
import {useGetUserQuery} from "../../services/usersApi"

import { isMobile } from "react-device-detect";

import { useDispatch, useSelector } from "react-redux";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

let wsUrl = "wss://pure-anchorage-21759.herokuapp.com//ws/"

const ChatUi = (props) => {
  const dispatch = useDispatch();

  const [toggler, setToggler] = useState(false);

  // const chatUsers = useSelector((state) => state.chat.chatUsers);
  // const chatMessages = useSelector((state) => state.chat.messages);

  let query = useQuery();

  const to_user = query.get("userId");

  const {
    data: to_chat_user,
    error,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetUserQuery(parseInt(to_user));

  const [activeChat, setActiveChat] = useState(0);
  const [toUserId, setToUserId] = useState(0);
  const [toLocUserId, setToLocUserId] = useState(0);
  const [inputMessage, setInputMessage] = useState("");

  const messageRef = useRef();

  const invalidMessageRef = useRef(null);

  const [emptyMessageCheck, setEmptyMessageCheck] = useState(false);
  const [searchKey, setSearchKey] = useState("");

  const clientId = useSelector((state) => state.auth.user.id);

  const getChatId = (to, from) => {
    if (to < from) {
      return `${to.toString()}:${from.toString()}`;
    } else {
      return `${from.toString()}:${to.toString()}`;
    }
  };

  const [socketUrl, setSocketUrl] = useState(
    wsUrl + getChatId(to_user, clientId)
  );
  const [messageHistory, setMessageHistory] = useState([]);

  const [message, setMessage] = useState({
    from_user_id: parseInt(clientId),
    to_user_id: parseInt(to_user),
    message: "",
  });

  const {
    sendMessage,
    sendJsonMessage,
    lastJsonMessage,
    lastMessage,
    readyState,
  } = useWebSocket(socketUrl);

  useEffect(() => {
    if (props.messages !== undefined) {
      setMessageHistory(props.messages);
      if (messageRef.current) {
        messageRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  }, [props]);

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

  const bottomRef = useRef(null);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageHistory]);

  return (
    <div className="tw-container tw-mx-auto tw-px-2 tw-mb-2">
      <div className=" tw-min-w-full   tw-rounded lg:tw-grid lg:tw-grid-cols-3">
        <div className="tw-hidden lg:tw-block tw-border-r tw-border-gray-300 lg:tw-col-span-1">
          <Link to="/inbox">
            <div className="tw-flex  tw-justify-start tw-space-x-2 tw-my-2 tw-mx-1 md:tw-m-3 !tw-items-center tw-cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="tw-h-4 tw-w-4 tw-text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <h1 className="!tw-text-sm !tw-m-0 tw-font-medium tw-text-green-500 tw-tracking-wide ">
                back to Inbox
              </h1>
            </div>
          </Link>
        </div>
        {/* started */}
        <div className=" tw-mt-1   lg:tw-col-span-2">
          <div className="tw-max-w-full lg:tw-max-w-2xl !tw-border-x tw-border-b !tw-border-solid  !tw-border-gray-300 tw-rounded">
            <div className="tw-w-full">
              {
                !isLoading ? (
                   <div className="tw-relative tw-flex tw-items-center tw-mt-2  tw-px-3 tw-py-1 tw-border-b tw-border-0 tw-border-solid tw-border-gray-300">
                <img
                  className="tw-object-cover tw-w-8 tw-h-8 tw-rounded-full"
                  src={to_chat_user?.profile[0].picture}
                  alt="username"
                />
                <span className="tw-block tw-ml-2 tw-font-bold tw-text-gray-600">
                 {to_chat_user?.first_name + " " + to_chat_user?.last_name}
                </span>
              </div>
                ) : <span>loading...</span>
              }
             
              <div className="tw-relative tw-w-full tw-p-6 tw-overflow-y-auto  tw-h-[75vh] lg:tw-h-[10rem]">
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
                          <div className={`tw-relative tw-max-w-xl tw-px-3 tw-py-1 tw-text-gray-700 tw-rounded tw-shadow ${
                            clientId === message.from_user_id
                              ? "tw-bg-green-200 "
                              : "tw-bg-gray-100"
                          }`}>
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

              <div className="tw-flex tw-items-center tw-justify-between px-1  tw-space-x-1 tw-w-full tw-px-0  lg:tw-p-3 tw-border-t tw-border-gray-300">
                <input
                  type="text"
                  placeholder="Message"
                  className="tw-block tw-w-[90%] lg:tw-w-full tw-py-2 tw-pl-4 lg:tw-mx-3 tw-bg-gray-100 tw-rounded-2xl tw-outline-none focus:tw-text-gray-700"
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
                  className="tw-bg-green-500 tw-rounded-full tw-p-1 tw-mx-1 tw-outline-none tw-border-none"
                >
                  <img
                    src="/svg-icons/send.svg"
                    className="tw-h-7 tw-w-7 tw-object-cover lg:!tw-h-3 lg:!tw-w-3 tw-rounded-full"
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
