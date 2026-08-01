import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, HelpCircle, ShieldCheck, TreePine, AlertTriangle, ArrowRight } from 'lucide-react';
import { GVMC_WARDS } from '../data/gvmcWardsData';

export default function GvmcChatbot({ isDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Namaste! I am Vana-Mitra 🌿, GVMC's AI Forestry & Telemetry Assistant. How can I help you today with tree permits, WALTA Act rules, satellite NDVI data, or citizen services?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickReplies: [
        "How to apply for a tree cutting permit?",
        "What is the 1:10 replacement quota?",
        "How is Escrow deposit calculated & refunded?",
        "Which ward has highest canopy loss?"
      ]
    }
  ]);

  const chatEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateAiResponse(text.trim());
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 900);
  };

  const generateAiResponse = (query) => {
    const q = query.toLowerCase();
    let replyText = "";
    let quickReplies = [];

    if (q.includes('permit') || q.includes('cut') || q.includes('fell') || q.includes('apply')) {
      replyText = "📋 **Tree Felling Permit Process (AP WALTA Act 2002)**:\n\n1. Go to the **'Tree Felling & Quota Log'** tab.\n2. Click **'Issue Felling Permit'**.\n3. Fill in the Ward, Organization, and Trees Requested.\n4. Pay the required **₹2,000/tree Escrow Deposit** into the GVMC WALTA Fund.\n5. Low-impact requests (≤10 trees) in stable wards can be **Auto-Approved by our AI Policy Engine**!";
      quickReplies = ["What is the Escrow deposit rate?", "Show 1:10 quota rule", "Which ward has highest canopy loss?"];
    } 
    else if (q.includes('quota') || q.includes('1:10') || q.includes('ratio') || q.includes('replacement')) {
      replyText = "🌲 **1:10 Mandatory Replacement Quota**:\n\nUnder AP WALTA Act rules, for every 1 tree cut, the applicant must plant and maintain **10 replacement saplings** within 180 days. Failure to meet the quota or maintain an 80%+ survival rate results in forfeiture of the Escrow deposit and a penalty of **₹3,000 per dead tree**.";
      quickReplies = ["How is Escrow calculated?", "How to audit survival rate?", "How to adopt a tree?"];
    } 
    else if (q.includes('escrow') || q.includes('deposit') || q.includes('penalty') || q.includes('refund')) {
      replyText = "💰 **Escrow Deposit & Refund Rules**:\n\n- **Deposit Amount**: ₹2,000 per mandatory sapling (Held in SBI GVMC WALTA Fund).\n- **Full Refund**: Released if field verification confirms **≥80% sapling survival** after 12 months.\n- **Penalty Forfeiture**: Deducted at **₹3,000 per dead/missing sapling** if survival drops below 80%.";
      quickReplies = ["How to apply for a tree permit?", "Check ward canopy statistics"];
    } 
    else if (q.includes('ward') || q.includes('loss') || q.includes('canopy') || q.includes('critical')) {
      const topCritical = GVMC_WARDS.filter(w => w.criticality === 'Critical').slice(0, 3).map(w => `• Ward ${w.wardNo}: ${w.name} (${w.netCanopyChangePercent}% loss)`).join('\n');
      replyText = `📊 **GVMC Ward Canopy Telemetry Overview**:\n\nWe monitor all 98 GVMC wards via **Sentinel-2 L2A satellite NDVI**. Wards exceeding 10% annual canopy loss automatically trigger a legal moratorium on commercial felling.\n\n**Top Critical Wards Right Now**:\n${topCritical}`;
      quickReplies = ["What is NDVI?", "How to report illegal felling?", "How to apply for a permit?"];
    } 
    else if (q.includes('ndvi') || q.includes('satellite') || q.includes('spectral') || q.includes('sentinel')) {
      replyText = "🛰️ **Sentinel-2 Satellite Telemetry (PS69 Engine)**:\n\nWe calculate vegetation density using multi-spectral reflectance:\n$$\\text{NDVI} = \\frac{\\text{NIR (Band 8)} - \\text{RED (Band 4)}}{\\text{NIR (Band 8)} + \\text{RED (Band 4)}}$$\n- **NDVI > 0.60**: Dense Forest/Healthy Canopy\n- **NDVI 0.40 - 0.60**: Moderate Vegetation\n- **NDVI < 0.40**: Critical Loss / Urban Heat Island Zone";
      quickReplies = ["Which ward has highest canopy loss?", "Show 1:10 quota rule"];
    }
    else if (q.includes('adopt') || q.includes('rwa') || q.includes('community') || q.includes('citizen') || q.includes('report') || q.includes('violation')) {
      replyText = "🤝 **Green Vizag Citizen Services**:\n\n1. **Adopt-a-Tree**: Citizens and RWAs can adopt municipal trees for free maintenance.\n2. **Free Saplings**: RWAs can request up to 50 free saplings for neighborhood planting.\n3. **Report Violations**: Click **'Report Violation'** in the top navbar to log illegal tree cutting with geo-tagged proof.";
      quickReplies = ["How to apply for a permit?", "How is Escrow calculated?"];
    } 
    else {
      replyText = `I can help you with all GVMC Urban Forestry inquiries! Try asking about:\n\n• **Tree Felling Permits & Escrow Deposits**\n• **1:10 Compensatory Re-Planting Quota**\n• **Sentinel-2 NDVI Satellite Telemetry**\n• **Ward Canopy Loss & Critical Heat Zones**\n• **Citizen Adopt-a-Tree & Violation Reporting**`;
      quickReplies = ["How to apply for a tree cutting permit?", "What is the 1:10 replacement quota?", "How is Escrow deposit calculated?", "Which ward has highest canopy loss?"];
    }

    return {
      id: Date.now(),
      sender: 'bot',
      text: replyText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickReplies
    };
  };

  return (
    <>
      {/* Floating Action Button (FAB) Icon */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center justify-center p-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-white/20"
            title="Ask GVMC Vana-Mitra AI Assistant"
          >
            <Bot className="w-6 h-6 animate-pulse" />
            
            {/* Notification Badge */}
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 text-[9px] font-bold text-slate-950 items-center justify-center">AI</span>
            </span>

            {/* Hover Tooltip Pill */}
            <div className="absolute right-full mr-3 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-xl whitespace-nowrap shadow-xl border border-gray-700">
              Ask Vana-Mitra AI 🌿
            </div>
          </button>
        )}
      </div>

      {/* Floating Chatbot Dialog Window */}
      {isOpen && (
        <div className={`fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] rounded-3xl shadow-2xl border flex flex-col overflow-hidden transition-all duration-300 ${
          isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}>
          {/* Chatbot Header */}
          <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 p-4 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                <Bot className="w-6 h-6 text-emerald-200" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm leading-tight flex items-center gap-1.5">
                  GVMC Vana-Mitra AI 🌿
                  <span className="px-1.5 py-0.5 rounded bg-emerald-800/60 text-[9px] font-mono text-emerald-200 border border-emerald-400/30">PS69 Engine</span>
                </h3>
                <p className="text-[11px] text-emerald-100/90 flex items-center gap-1 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Active GVMC Forestry Assistant
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body Scroll Area */}
          <div className={`flex-1 p-4 overflow-y-auto space-y-4 text-xs ${
            isDarkMode ? 'bg-slate-950/60' : 'bg-slate-50/50'
          }`}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col space-y-1.5 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center space-x-1.5 text-[10px] text-slate-400">
                  {msg.sender === 'bot' ? (
                    <span className="font-bold text-emerald-600 flex items-center gap-1">
                      <Bot className="w-3 h-3" /> Vana-Mitra AI
                    </span>
                  ) : (
                    <span className="font-bold text-indigo-500 flex items-center gap-1">
                      <User className="w-3 h-3" /> You
                    </span>
                  )}
                  <span>• {msg.time}</span>
                </div>

                <div className={`p-3.5 rounded-2xl max-w-[88%] leading-relaxed shadow-sm whitespace-pre-line ${
                  msg.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-tr-none font-medium'
                    : isDarkMode 
                      ? 'bg-slate-800 border border-slate-700 text-slate-100 rounded-tl-none' 
                      : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>

                {/* Quick Reply Chip Suggestions */}
                {msg.quickReplies && msg.quickReplies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2 max-w-[95%]">
                    {msg.quickReplies.map((reply, i) => (
                      <button
                        key={i}
                        onClick={() => handleSendMessage(reply)}
                        className={`text-[11px] px-3 py-1.5 rounded-xl border text-left font-medium transition-all hover:scale-105 ${
                          isDarkMode
                            ? 'bg-slate-800/80 border-slate-700 text-emerald-400 hover:bg-slate-700 hover:border-emerald-500'
                            : 'bg-white border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-400 shadow-sm'
                        }`}
                      >
                        💡 {reply}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center space-x-2 text-slate-400 text-xs">
                <Bot className="w-4 h-4 text-emerald-600 animate-bounce" />
                <span className="italic">Vana-Mitra is calculating policy response...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className={`p-3 border-t flex items-center space-x-2 ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <input
              type="text"
              placeholder="Ask about permits, WALTA rules, NDVI..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className={`flex-1 border rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-emerald-500 ${
                isDarkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white shadow-md transition-all shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
