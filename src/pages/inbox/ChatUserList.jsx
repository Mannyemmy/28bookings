import React from "react";
import { useSelector, useDispatch } from "react-redux";

const ChatUserList = (props) => {
  const { chatUsers } = props;

  const clientId = useSelector((state) => state.auth.user.id);
  return (
    <>
      {chatUsers.map((chatUser, index) => {
        if (chatUser.from_user_id === clientId) {
          return (
            <div
              key={index}
              className={`${props.activeChat === index ? "tw-bg-green-100" : ""} tw-flex tw-items-center tw-px-3  tw-text-sm tw-transition tw-duration-150 tw-ease-in-out !tw-border-b tw-border-solid tw-border-x-0 first:tw-border-y-0  tw-border-gray-300 !tw-text-black tw-cursor-pointer hover:tw-bg-gray-100 focus:tw-outline-none`}
              onClick={() => props.changeUser(index, chatUser.from_user_id, chatUser.to_user_id)}
            >
              <img
                className="tw-rounded-full tw-object-cover tw-w-[32px] tw-h-[32px]"
                src={chatUser.to_user.profile[0].picture}
                alt={chatUser.to_user.to_user_name}
              />

              <div className="tw-w-full tw-pb-1 tw-text-black">
                <div className="tw-flex tw-space-y-1">
                  <span className="tw-block !tw-text-[12px] tw-ml-2 tw-font-semibold tw-text-gray-600">
                    {chatUser.to_user_name}
                  </span>
                </div>
                <span className="tw-block tw-ml-2 tw-text-sm tw-text-gray-600">
                  {chatUser.message}
                </span>
              </div>
            </div>
          );
        } else {
          return (
            <div
              key={index}
              className={`${props.activeChat === index ? "tw-bg-green-100" : ""} tw-flex tw-items-center tw-px-3  tw-text-sm tw-transition tw-duration-150 tw-ease-in-out tw-border-b tw-border-solid tw-border-x-0 first:tw-border-y-0 tw-border-gray-300 tw-cursor-pointer !tw-text-black hover:tw-bg-gray-100 focus:tw-outline-none`}
              onClick={() => props.changeUser(index, chatUser.from_user_id, chatUser.to_user_id)}
            >
              <img
                className="tw-rounded-full tw-object-cover tw-w-[32px] tw-h-[32px]"
                src={chatUser.from_user.profile[0].picture}
                alt={chatUser.to_user_name}
              />

              <div className="tw-w-full tw-pb-1">
                <div className="tw-flex tw-space-y-1">
                  <span className="tw-block !tw-text-[12px] tw-ml-2 tw-font-semibold tw-text-gray-600">
                    {chatUser.from_user_name}
                  </span>
                </div>
                <span className="tw-block tw-ml-2 tw-text-sm tw-text-gray-600">
                  {chatUser.message}
                </span>
              </div>
            </div>
          );
        }

        
      })}
    </>
  );
};

export default ChatUserList;
