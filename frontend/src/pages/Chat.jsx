import React, { useState } from "react";
import { Search, Menu, Send, X, MoreVertical, Phone, Video, Image, Smile, Paperclip } from "lucide-react";

const Chat = () => {
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");

  // Add more dummy data for better visualization
  const conversations = [
    {
      id: 1,
      name: "John Doe",
      avatar: "https://ui-avatars.com/api/?name=John+Doe",
      status: "online",
      message: "Hey, how are you?",
      time: "10:30 AM",
      unread: 2,
    },
     {
      id: 1,
      name: "Ajay",
      avatar: "https://ui-avatars.com/api/?name=ajau+upadhyay",
      status: "offline",
      message: "Hey there! How's it going?",
      time: "11:02 PM",
      unread: 3,
    },
  ];

  const messages = [
    {
      id: 1,
      text: "Hi there!",
      sent: true,
      time: "10:00 AM",
      status: "read" // 'sent', 'delivered', 'read'
    },
    {
      id: 2,
      text: "Hey there! How's it going?",
      sent: false,
      time: "9:00 AM",
      status: "read" // 'sent', 'delivered', 'read'
    },
  ];

  return (
    <div className="flex h-[87vh] bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className={`
        w-full md:w-[380px] bg-white dark:bg-gray-800 flex flex-col
        ${showChat ? 'hidden md:flex' : 'flex'}
        border-r border-gray-200 dark:border-gray-700
      `}>
        {/* User Profile & Menu */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                AJ
              </div>
              <h2 className="font-semibold dark:text-white">Your Name</h2>
            </div>
            <Menu className="h-5 w-5 text-gray-500 dark:text-gray-400 cursor-pointer" />
          </div>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search chats..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 rounded-xl
                text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-200"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-2">
            {conversations.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setShowChat(true)}
                className="flex items-center p-3 mb-1 rounded-xl hover:bg-gray-50 
                  dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
              >
                <div className="relative">
                  <img 
                    src={chat.avatar} 
                    alt={chat.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  {chat.status === 'online' && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full 
                      border-2 border-white dark:border-gray-800">
                    </span>
                  )}
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-medium dark:text-white">{chat.name}</h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{chat.time}</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{chat.message}</p>
                </div>
                {chat.unread > 0 && (
                  <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {chat.unread}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className={`
        flex-1 flex flex-col bg-gray-50 dark:bg-gray-900
        ${showChat ? 'flex' : 'hidden md:flex'}
      `}>
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowChat(false)}
                className="md:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="h-5 w-5 dark:text-gray-200" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src="https://ui-avatars.com/api/?name=John+Doe"
                    alt="John Doe"
                    className="h-10 w-10 rounded-full"
                  />
                  <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full 
                    border-2 border-white dark:border-gray-800">
                  </span>
                </div>
                <div>
                  <h2 className="font-semibold dark:text-white">John Doe</h2>
                  <p className="text-xs text-green-500">Online</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700">
                <Phone className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
              <button className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700">
                <Video className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
              <button className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700">
                <MoreVertical className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sent ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[70%] ${message.sent ? "order-2" : "order-1"}`}>
                <div
                  className={`px-4 py-3 rounded-2xl w-fit
                    ${message.sent 
                      ? "bg-blue-500 text-white rounded-br-none" 
                      : "bg-white dark:bg-gray-800 dark:text-gray-200 rounded-bl-none"
                    }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
                <div className={`flex items-center mt-1 space-x-2
                  ${message.sent ? "justify-end" : "justify-start"}`}
                >
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {message.time}
                  </span>
                  {message.sent && message.status === 'read' && (
                    <span className="text-blue-500">✓✓</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700">
                <Paperclip className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
              <button className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700">
                <Image className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
              <button className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700">
                <Smile className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 py-2.5 px-4 bg-gray-50 dark:bg-gray-700 rounded-xl
                border-0 focus:outline-none focus:ring-2 focus:ring-blue-500
                dark:text-gray-200 dark:placeholder-gray-400"
            />
            <button className="p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors">
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;