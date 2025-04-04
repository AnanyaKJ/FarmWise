import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';
import Navbar from '../components/Navbar';

const API_KEY = 'AIzaSyCMIK6EZ526zpXZ5Ulq5PxFLU55W1u-F_U';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const limitWords = (text, maxWords) => {
    const words = text.split(' ');
    return words.length > maxWords ? words.slice(0, maxWords).join(' ') + '...' : text;
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    try {
      setLoading(true);
      // Add user message to chat
      setChat(prev => [...prev, { role: 'user', content: input }]);

      // Prepare the request to Google's API
      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: input
            }]
          }]
        })
      });

      const data = await response.json();
      
      // Add AI response to chat
      if (data.candidates && data.candidates[0].content) {
        setChat(prev => [...prev, {
          role: 'assistant',
          content: data.candidates[0].content.parts[0].text
        }]);
      }

      setInput('');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative" 
         style={{
           backgroundImage: "url('https://www.pixelstalk.net/wp-content/uploads/images6/Farm-HD-Wallpaper-Free-download.jpg')", // CHANGE BG IMAGE URL HERE
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundAttachment: 'fixed'
         }}>
      {/* Navbar styling can be modified in ../components/Navbar.jsx */}
      <Navbar />
      
      {/* Main chat container */}
      <div className="container mx-auto px-4 pt-28 pb-4"> {/* Changed pt-20 to pt-32 for more spacing */}
        <div className="max-w-3xl mx-auto bg-white/90 rounded-lg shadow-lg overflow-hidden mt-1"> {/* Added mt-8 for additional margin-top */}
          {/* Chat messages area */}
          <div className="h-[70vh] overflow-y-auto p-6">
            {chat.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-4 p-4 rounded-lg max-w-[80%] ${
                  message.role === 'user' 
                    ? 'ml-auto bg-green-500 text-white shadow-md' 
                    : 'bg-white/95 text-gray-800 shadow-md'
                }`}
              >
                {limitWords(message.content, 100)}
              </motion.div>
            ))}
          </div>

          {/* Input area */}
          <div className="p-4 bg-white/95 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-lg"
                disabled={loading}
              />
              <button
                onClick={sendMessage}
                disabled={loading}
                className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-800"
              >
                {loading ? (
                  <div className="w-6 h-6 border-t-2 border-white rounded-full animate-spin" />
                ) : (
                  <FaPaperPlane />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;