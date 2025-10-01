'use client'

import { useState } from 'react'
import { Send, Search, ExternalLink } from 'lucide-react'
import AIAssistant from '@/components/AIAssistant'
import VideoEmbed from '@/components/VideoEmbed'

export default function AIPage() {
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false)
  const [aiContext, setAiContext] = useState('')
  const [aiQuestion, setAiQuestion] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const handleAskQuestion = (question: string) => {
    setAiQuestion(question)
    setAiContext('General investment and platform guidance')
    setAiAssistantOpen(true)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setAiQuestion(searchQuery.trim())
      setAiContext('AI search query')
      setAiAssistantOpen(true)
      setSearchQuery('')
    }
  }

  const quickQuestions = [
    "What are the best investment opportunities right now?",
    "How do stablecoins work?",
    "What's the difference between tokenized stocks and regular stocks?",
    "Should I invest in AI companies?",
    "How do I choose between different stablecoin types?",
    "What are the risks of tokenized assets?"
  ]

  // Featured educational videos from VaultoAI channel
  // Real YouTube videos from @VaultoAI channel with actual titles and descriptions
  const featuredVideos = [
    {
      id: '4YWZ166wdAQ', // https://youtu.be/4YWZ166wdAQ
      title: 'What are RWAs',
      description: 'Learn about Real World Assets (RWAs) and how they are being tokenized on blockchain networks.',
      duration: '12:45',
      thumbnail: 'https://img.youtube.com/vi/4YWZ166wdAQ/hqdefault.jpg',
      category: 'RWAs',
      isNew: true
    },
    {
      id: 'HL0ejk84EAE', // https://youtu.be/HL0ejk84EAE
      title: 'Ethereum PoS Explained',
      description: 'Understanding Ethereum\'s transition to Proof of Stake consensus mechanism and its benefits.',
      duration: '18:32',
      thumbnail: 'https://img.youtube.com/vi/HL0ejk84EAE/hqdefault.jpg',
      category: 'Ethereum',
      isNew: false
    },
    {
      id: 't-tShuw61Jo', // https://youtu.be/t-tShuw61Jo
      title: 'Fiat vs Stablecoins',
      description: 'Compare traditional fiat currencies with stablecoins and understand their role in the crypto ecosystem.',
      duration: '15:28',
      thumbnail: 'https://img.youtube.com/vi/t-tShuw61Jo/hqdefault.jpg',
      category: 'Stablecoins',
      isNew: true
    },
    {
      id: 'v1w3EEqKEYk', // https://youtu.be/v1w3EEqKEYk
      title: 'Tokenized Wall Street',
      description: 'Explore how traditional Wall Street assets are being tokenized and made accessible through blockchain.',
      duration: '21:15',
      thumbnail: 'https://img.youtube.com/vi/v1w3EEqKEYk/hqdefault.jpg',
      category: 'Tokenized Assets',
      isNew: false
    }
  ]


  return (
    <div className="min-h-screen bg-vaulto-dark relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-vaulto-primary/5 via-transparent to-vaulto-secondary/5"></div>
      <div className="absolute inset-0 opacity-30" style={{
        background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1), transparent 50%)'
      }}></div>
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20 relative z-10">
        
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-vaulto-light mb-2">
                AI Investment Assistant
              </h1>
              <p className="text-vaulto-light/70">
                Get personalized guidance and educational content powered by AI
              </p>
            </div>
            
            {/* External Link */}
            <a
              href="https://vaulto.fi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 bg-vaulto-primary text-vaulto-dark text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              <span>Live Navigator</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* AI Search Bar */}
        <div className="mb-8">
          <div className="bg-vaulto-secondary border border-vaulto-primary/20 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-vaulto-primary/20 rounded-lg">
                <Search className="w-5 h-5 text-vaulto-primary" />
              </div>
              <h3 className="text-xl font-bold text-vaulto-light">Ask AI Anything</h3>
            </div>
            <p className="text-vaulto-light/70 mb-6">
              Search for specific information about investments, market analysis, or get personalized advice.
            </p>
            <form onSubmit={handleSearch} className="flex space-x-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ask about investments, stablecoins, market trends..."
                  className="w-full bg-vaulto-dark border border-vaulto-light/20 rounded-lg px-4 py-3 pr-12 text-vaulto-light placeholder-vaulto-light/50 focus:outline-none focus:border-vaulto-primary"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-vaulto-light/50" />
              </div>
              <button
                type="submit"
                disabled={!searchQuery.trim()}
                className="bg-vaulto-primary text-vaulto-dark font-semibold px-6 py-3 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity flex items-center space-x-2"
              >
                <span>Search</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Quick Questions */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleAskQuestion(question)}
                className="bg-vaulto-secondary border border-vaulto-primary/20 rounded-lg p-3 text-left hover:border-vaulto-primary/50 transition-colors group"
              >
                <div className="flex items-start space-x-2">
                  <div className="p-1.5 bg-vaulto-primary/20 rounded-md group-hover:bg-vaulto-primary/30 transition-colors flex-shrink-0">
                    <Send className="w-3 h-3 text-vaulto-primary" />
                  </div>
                  <p className="text-vaulto-light group-hover:text-vaulto-primary transition-colors text-sm leading-relaxed">
                    {question}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Educational Videos Section */}
        <div className="mb-8">

          {/* Featured Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {featuredVideos.map((video, index) => (
              <VideoEmbed
                key={video.id}
                videoId={video.id}
                title={video.title}
                description={video.description}
                duration={video.duration}
                category={video.category}
                thumbnail={video.thumbnail}
                isNew={video.isNew}
                onAskAI={handleAskQuestion}
              />
            ))}
          </div>

        </div>
      </main>

      {/* AI Assistant */}
      <AIAssistant
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
        context={aiContext}
        initialQuestion={aiQuestion}
      />
    </div>
  )
}
