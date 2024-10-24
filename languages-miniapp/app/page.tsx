'use client'

import { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('🇺🇸 English');

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    setMessages([...messages, { user: true, text: input }]);
    setInput('');

    // Simulate an AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { user: false, text: `AI Response in ${selectedLanguage.split(' ')[1]}` },
      ]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-pink-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        {/* Language Selector */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="language-toggle">
            Select Language:
          </label>
          <select
            id="language-toggle"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-200"
          >
            <option value="🇺🇸 English">🇺🇸 English</option>
            <option value="🇪🇸 Spanish">🇪🇸 Spanish</option>
            <option value="🇫🇷 French">🇫🇷 French</option>
            <option value="🇩🇪 German">🇩🇪 German</option>
          </select>
        </div>

        {/* Chat Box */}
        <div className="h-80 overflow-y-auto border border-gray-300 p-4 rounded-lg mb-4 bg-pink-100">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded-lg ${
                message.user ? 'bg-pink-200 text-right' : 'bg-white text-left'
              }`}
            >
              {message.user ? 'You' : 'AI'}: {message.text}
            </div>
          ))}
        </div>

        {/* Input Box */}
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-200"
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 bg-pink-400 text-white p-2 rounded-lg hover:bg-pink-500"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}