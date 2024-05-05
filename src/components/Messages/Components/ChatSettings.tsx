"use client"
import React, { useState } from "react";
// import Icon from "../Icon";
import membersData from "../../../data/members.json";

const attachmentOptions = [
  {
    id: 0,
    label: "Document",
    icon: "/svgs/document.svg",
    filecount: "129",
    link: "",
  },
  {
    id: 1,
    label: "Photo",
    icon: "/svgs/photo.svg",
    filecount: "938",
    link: "",
  },
  {
    id: 2,
    label: "Videos",
    icon: "/svgs/videos.svg",
    filecount: "96",
  },
  {
    id: 3,
    label: "Other Files",
    icon: "/svgs/other-files.svg",
    filecount: "171",
    link: "",
  },
];

const ChatSettings = () => {
  const [showMember, setShowMember] = useState(true)
  const [showAttachments, setShowAttachments] = useState(true)

  const handleChangeMemberIcon = () => {
    setShowMember(!showMember)
  }

  const handleChangeAttachmentsIcon = () => {
    setShowAttachments(!showAttachments)
  }

  return (
    <div className="chat-settings p-12 h-screen w-1/3 flex flex-col gap-10 bg-[#1e1f24]">
      {/* Top Content*/}
      <div className="logo-container gap-2 text-white flex flex-col items-center ">
        <div className="image-container w-28 h-28 bg-[#2A9DF4] rounded-full relative flex items-center justify-center text-white"></div>
        Chat Moko
      </div>

      {/* Center Content */}
      <div className="members-container text-white flex justify-between">
        <h1 className="font-semibold">Members</h1>
        {/* <Icon
          onClick={handleChangeMemberIcon}
          icon={{ prefix: "fas", iconName: showMember ? "chevron-down" : "chevron-right" }}
          color="white"
          width={20}
          height={20}
        /> */}
      </div>
      {showMember && (
        <div className="member-lists flex flex-col text-white">
          <div className="add-member-container flex items-center">
            <div className="add-member-bg flex cursor-pointer items-center justify-center mb-5 h-10 w-10 rounded-full bg-[#2e2d36] text-5xl text-[#3c71cf]">
              <p className="mb-1">+</p>
            </div>
            <h1 className="flex ml-5 mb-5 text-[#3c71cf]">Add Member</h1>
          </div>
          {membersData.map((member) => {
            return (
              <div key={member.id} className="members-container flex mb-2 gap-3">
                <div className="member-profile-img w-10 h-10 bg-white rounded-full">
                </div>
                <h1 className="mt-2 ">{member.name}</h1>
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom Content */}
      <div className="attachments-container text-white flex flex-col justify-between">
        <div className="dropdown flex justify-between">
          <h1 className="font-semibold">Attachments</h1>
          {/* <Icon
            onClick={handleChangeAttachmentsIcon}
            icon={{ prefix: "fas", iconName: showAttachments ? "chevron-down" : "chevron-right" }}
            color="white"
            width={20}
            height={20}
          /> */}
        </div>
        {showAttachments && (
          <div className="attachments-options">
            {/* {attachmentOptions.map((option) => {
              let iconComponent;
              switch (option.label) {
                case "Document":
                  iconComponent = (
                    <Icon
                      icon={{ prefix: "fas", iconName: "file-lines" }}
                      width={15}
                    />
                  );
                  break;
                case "Photo":
                  iconComponent = (
                    <Icon icon={{ prefix: "fas", iconName: "image" }} width={15} />
                  );
                  break;
                case "Videos":
                  iconComponent = (
                    <Icon
                      icon={{ prefix: "fas", iconName: "circle-play" }}
                      width={15}
                    />
                  );
                  break;
                case "Other Files":
                  iconComponent = (
                    <Icon
                      icon={{ prefix: "fas", iconName: "folder-minus" }}
                      width={15}
                    />
                  );
                  break;
                default:
                  iconComponent = null;
              }

              return (
                <div
                  key={option.id}
                  className="options-container text-md mt-5 flex flex-row"
                >
                  <div className="bg-rounded flex items-center justify-center rounded-full w-10 h-10 bg-[#2d2d36]">
                    {iconComponent}
                  </div>
                  <div className="name-filescount ml-3 flex flex-col">
                    <h1>{option.label}</h1>
                    <p className="file-count text-sm opacity-70">
                      {option.filecount} - Files 17 GB
                    </p>
                  </div>
                </div>
              );
            })} */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSettings;
