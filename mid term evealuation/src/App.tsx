import React, { useState } from 'react';
import { ChatInterface } from './components/ChatInterface';
import { ITRRecommendationCard } from './components/ITRRecommendation';
import { InvestmentSuggestions } from './components/InvestmentSuggestions';
import { ChatMessage, ITRRecommendation, InvestmentSuggestion } from './types';
import { Calculator } from 'lucide-react';

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your tax advisory assistant. What would you like to know about?',
      options: [
        'Help me choose an ITR form',
        'Suggest tax-saving investments',
        'Calculate my tax liability'
      ]
    }
  ]);

  const [recommendation, setRecommendation] = useState<ITRRecommendation>({
    form: 'ITR-1 (Sahaj)',
    explanation: 'Based on your income sources being primarily from salary and savings account interest, ITR-1 is the most suitable form for you.'
  });

  const [suggestions] = useState<InvestmentSuggestion[]>([
    {
      type: 'Public Provident Fund (PPF)',
      description: 'Long-term savings scheme with tax-free returns',
      maxDeduction: '₹1,50,000',
      section: '80C'
    },
    {
      type: 'ELSS Mutual Funds',
      description: 'Equity-linked savings scheme with 3-year lock-in',
      maxDeduction: '₹1,50,000',
      section: '80C'
    },
    {
      type: 'National Pension System (NPS)',
      description: 'Retirement savings with additional tax benefits',
      maxDeduction: '₹50,000',
      section: '80CCD(1B)'
    }
  ]);

  const handleSendMessage = (message: string) => {
    const newMessages = [
      ...messages,
      { id: Date.now().toString(), type: 'user' as const, content: message }
    ];
    setMessages(newMessages);

    // Simulate bot response
    setTimeout(() => {
      setMessages([
        ...newMessages,
        {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: 'I understand you need help. Could you please provide more details about your income sources?',
          options: ['I have salary income', 'I have business income', 'I have rental income']
        }
      ]);
    }, 1000);
  };

  const handleOptionSelect = (option: string) => {
    handleSendMessage(option);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-8">
          <Calculator className="w-8 h-8 text-blue-600 mr-2" />
          <h1 className="text-3xl font-bold text-gray-800">Tax Advisory System</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ChatInterface
            messages={messages}
            onSendMessage={handleSendMessage}
            onOptionSelect={handleOptionSelect}
          />
          
          <div className="space-y-8">
            <ITRRecommendationCard recommendation={recommendation} />
            <InvestmentSuggestions suggestions={suggestions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;