'use client'

import { useState, useEffect, useRef } from 'react'
import { X, Send, Bot, Sparkles, AlertCircle } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { AIResponse } from '@/types'

interface AIAssistantProps {
  isOpen: boolean
  onClose: () => void
  context?: string
  initialQuestion?: string
}

export default function AIAssistant({ isOpen, onClose, context, initialQuestion }: AIAssistantProps) {
  const [messages, setMessages] = useState<AIResponse[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (initialQuestion) {
      setInput(initialQuestion)
      handleSendMessage(initialQuestion)
    }
  }, [initialQuestion])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const getAIResponse = async (question: string, onChunk: (chunk: string) => void): Promise<void> => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: question,
          context: context
        }),
      })

      if (!response.ok) {
        if (response.status === 404 || response.status === 503) {
          // API route not available - provide fallback response
          onChunk('I apologize, but the AI service is currently not available. This might be because the service is in maintenance mode or the API key is not configured. Please try again later or contact support for assistance.')
          return
        }
        throw new Error('Failed to get AI response')
      }

      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error('No response body')
      }

      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') {
              return
            }
            try {
              const parsed = JSON.parse(data)
              if (parsed.content) {
                onChunk(parsed.content)
              }
            } catch (e) {
              // Ignore parsing errors for incomplete chunks
            }
          }
        }
      }
    } catch (error) {
      console.error('Error getting AI response:', error)
      setError('Failed to connect to AI service. Please try again.')
      onChunk('I apologize, but I\'m having trouble connecting to the AI service right now. Please try again in a moment.')
    }
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
    setError(null)

    // Create initial AI response with empty answer
    const aiResponse: AIResponse = {
      question: message,
      answer: '',
      timestamp: new Date(),
      context: context
    }
    
    setMessages(prev => [...prev.slice(0, -1), userMessage, aiResponse])

    try {
      await getAIResponse(message, (content: string) => {
        setMessages(prev => {
          const newMessages = [...prev]
          const lastMessage = newMessages[newMessages.length - 1]
          if (lastMessage && lastMessage.question === message) {
            lastMessage.answer = content
          }
          return newMessages
        })
      })
    } catch (error) {
      console.error('Error handling message:', error)
      setMessages(prev => {
        const newMessages = [...prev]
        const lastMessage = newMessages[newMessages.length - 1]
        if (lastMessage && lastMessage.question === message) {
          lastMessage.answer = 'I apologize, but I encountered an error while processing your request. Please try again.'
        }
        return newMessages
      })
    } finally {
      setIsTyping(false)
    }
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
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}
          
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
                  <div className="text-sm prose prose-invert prose-sm max-w-none">
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc list-inside mb-2">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal list-inside mb-2">{children}</ol>,
                        li: ({ children }) => <li className="mb-1">{children}</li>,
                        strong: ({ children }) => <strong className="font-semibold text-vaulto-primary">{children}</strong>,
                        code: ({ children }) => <code className="bg-vaulto-secondary px-1 py-0.5 rounded text-xs font-mono">{children}</code>,
                        pre: ({ children }) => <pre className="bg-vaulto-secondary p-2 rounded overflow-x-auto mb-2">{children}</pre>,
                        blockquote: ({ children }) => <blockquote className="border-l-4 border-vaulto-primary pl-4 italic mb-2">{children}</blockquote>,
                        h1: ({ children }) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-base font-bold mb-2">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-sm font-bold mb-1">{children}</h3>,
                      }}
                    >
                      {message.answer}
                    </ReactMarkdown>
                  </div>
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
          <div ref={messagesEndRef} />
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
