'use client'

import { useState, useEffect } from 'react'
import { X, Send, Bot, Sparkles } from 'lucide-react'
import { AIResponse } from '@/types'

interface AIAssistantProps {
  isOpen: boolean
  onClose: () => void
  context?: string
  initialQuestion?: string
}

const mockAIResponses: Record<string, string> = {
  'stablecoin': 'Stablecoins are digital currencies designed to maintain a stable value relative to a reference asset, typically the US dollar. Vaulto offers three types: vltUSD (fiat-backed), vltUSDy (yield-bearing), and vltUSDe (crypto-native). Each provides different risk profiles and yield opportunities.',
  'minting': 'Minting stablecoins involves depositing collateral (USD, crypto, or other assets) to create new tokens. The process is transparent and verifiable on-chain. You can mint any amount above the minimum threshold, and the tokens are immediately available for use.',
  'yield': 'Yield-bearing assets like vltUSDy generate returns through various DeFi strategies including lending, liquidity provision, and automated yield farming. The target yield is 8.5% APY, though actual returns may vary based on market conditions.',
  'tokenized': 'Tokenized assets represent real-world assets (stocks, commodities, private companies) as blockchain tokens. This enables fractional ownership, 24/7 trading, and global accessibility while maintaining the underlying asset\'s value and characteristics.',
  'risks': 'Key risks include smart contract vulnerabilities, regulatory changes, market volatility, and counterparty risks. Vaulto implements multiple security measures including audits, insurance, and transparent reserve reporting to mitigate these risks.',
  'swap': 'Swapping involves exchanging one asset for another at current market rates. The process is automated through smart contracts, ensuring fair pricing and immediate settlement. All swaps are recorded on-chain for transparency.',
  'default': 'I\'m here to help with any questions about Vaulto\'s platform, stablecoin mechanics, tokenized assets, or investment strategies. Feel free to ask about specific features, risks, or how to get started!'
}

export default function AIAssistant({ isOpen, onClose, context, initialQuestion }: AIAssistantProps) {
  const [messages, setMessages] = useState<AIResponse[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (initialQuestion) {
      setInput(initialQuestion)
      handleSendMessage(initialQuestion)
    }
  }, [initialQuestion])

  const getAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase()
    
    // Check for specific keywords
    if (lowerQuestion.includes('stablecoin') || lowerQuestion.includes('vltusd')) {
      return mockAIResponses.stablecoin
    } else if (lowerQuestion.includes('mint') || lowerQuestion.includes('minting')) {
      return mockAIResponses.minting
    } else if (lowerQuestion.includes('yield') || lowerQuestion.includes('return')) {
      return mockAIResponses.yield
    } else if (lowerQuestion.includes('tokenized') || lowerQuestion.includes('token')) {
      return mockAIResponses.tokenized
    } else if (lowerQuestion.includes('risk') || lowerQuestion.includes('safe')) {
      return mockAIResponses.risks
    } else if (lowerQuestion.includes('swap') || lowerQuestion.includes('trade')) {
      return mockAIResponses.swap
    }
    
    return mockAIResponses.default
  }

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return

    const userMessage: AIResponse = {
      question: message,
      answer: '',
      timestamp: new Date(),
      context: context
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: AIResponse = {
        question: message,
        answer: getAIResponse(message),
        timestamp: new Date(),
        context: context
      }
      
      setMessages(prev => [...prev.slice(0, -1), aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage(input)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-2xl h-[80vh] bg-vaulto-secondary border border-vaulto-primary/20 rounded-lg shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-vaulto-primary/20">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-vaulto-primary rounded-lg">
              <Bot className="w-6 h-6 text-vaulto-dark" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-vaulto-light">Vaulto AI Assistant</h2>
              <p className="text-sm text-vaulto-light/70">Ask me anything about investments</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-vaulto-dark/50 rounded-lg transition-colors"
            aria-label="Close AI Assistant"
          >
            <X className="w-5 h-5 text-vaulto-light/70" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-8">
              <Sparkles className="w-12 h-12 text-vaulto-primary mx-auto mb-4" />
              <h3 className="text-lg font-medium text-vaulto-light mb-2">Welcome to Vaulto AI</h3>
              <p className="text-vaulto-light/70">
                I can help you understand stablecoins, tokenized assets, investment strategies, and platform features.
              </p>
            </div>
          )}
          
          {messages.map((message, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-end">
                <div className="bg-vaulto-primary text-vaulto-dark p-3 rounded-lg max-w-[80%]">
                  <p className="text-sm font-medium">{message.question}</p>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-vaulto-dark text-vaulto-light p-3 rounded-lg max-w-[80%]">
                  <p className="text-sm">{message.answer}</p>
                  <p className="text-xs text-vaulto-light/70 mt-2">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-vaulto-dark text-vaulto-light p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-vaulto-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-vaulto-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-vaulto-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-vaulto-primary/20">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about stablecoins, investments, or platform features..."
              className="flex-1 bg-vaulto-dark border border-vaulto-light/20 rounded-lg px-4 py-2 text-vaulto-light placeholder-vaulto-light/50 focus:outline-none focus:border-vaulto-primary"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="p-2 bg-vaulto-primary text-vaulto-dark rounded-lg hover:bg-vaulto-primary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
