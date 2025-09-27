'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Send, Bot, Search, ExternalLink } from 'lucide-react'
import AIAssistant from '@/components/AIAssistant'
import WalletButton from '@/components/WalletButton'
import { WalletState } from '@/types'
import { generateMockAddress } from '@/lib/utils'

export default function AIPage() {
  const pathname = usePathname()
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    balance: 0
  })
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false)
  const [aiContext, setAiContext] = useState('')
  const [aiQuestion, setAiQuestion] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const handleConnectWallet = () => {
    const mockAddress = generateMockAddress()
    setWalletState({
      isConnected: true,
      address: mockAddress,
      balance: 10000
    })
  }

  const handleDisconnectWallet = () => {
    setWalletState({
      isConnected: false,
      balance: 0
    })
  }

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
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="relative w-16 h-6">
                  <Image
                    src="/logo.png"
                    alt="Vaulto Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
              <nav className="flex items-center space-x-4">
                <Link
                  href="/"
                  className={`text-sm font-medium transition-all duration-200 ${
                    pathname === '/'
                      ? 'text-vaulto-primary'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Mint
                </Link>
                <Link
                  href="/swap"
                  className={`text-sm font-medium transition-all duration-200 ${
                    pathname === '/swap'
                      ? 'text-vaulto-primary'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Invest
                </Link>
                <Link
                  href="/vaults"
                  className={`text-sm font-medium transition-all duration-200 ${
                    pathname === '/vaults'
                      ? 'text-vaulto-primary'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Vaults
                </Link>
                <Link
                  href="/predictions"
                  className={`text-sm font-medium transition-all duration-200 ${
                    pathname === '/predictions'
                      ? 'text-vaulto-primary'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Predictions
                </Link>
                <Link
                  href="/ai"
                  className={`text-sm font-medium transition-all duration-200 ${
                    pathname === '/ai'
                      ? 'text-vaulto-primary'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Learn
                </Link>
              </nav>
            </div>
            <WalletButton
              walletState={walletState}
              onConnect={handleConnectWallet}
              onDisconnect={handleDisconnectWallet}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 relative z-10">
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-vaulto-light mb-4">
            Crypto Investment Agent
          </h1>
          <p className="text-xl text-vaulto-light/70 max-w-3xl mx-auto">
            Get personalized investment guidance, market insights, and educational content powered by AI. 
            Ask questions about stablecoins, tokenized assets, and investment strategies.
          </p>
        </div>

        {/* Live Crypto Navigator Button */}
        <div className="text-center mb-12">
          <a
            href="https://vaulto.fi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-vaulto-primary/80 to-vaulto-primary/60 text-vaulto-dark font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <div className="p-2 bg-vaulto-dark/20 rounded-lg">
              <ExternalLink className="w-5 h-5" />
            </div>
            <span className="text-lg">Launch Live Crypto Navigator</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <p className="text-vaulto-light/60 text-sm mt-3">
            Access real-time crypto markets and DeFi protocols
          </p>
        </div>

        {/* AI Search Bar */}
        <div className="max-w-4xl mx-auto">
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
        <div className="max-w-4xl mx-auto mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleAskQuestion(question)}
                className="bg-vaulto-secondary border border-vaulto-primary/20 rounded-lg p-4 text-left hover:border-vaulto-primary/50 transition-colors group"
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-vaulto-primary/20 rounded-lg group-hover:bg-vaulto-primary/30 transition-colors">
                    <Send className="w-4 h-4 text-vaulto-primary" />
                  </div>
                  <p className="text-vaulto-light group-hover:text-vaulto-primary transition-colors">
                    {question}
                  </p>
                </div>
              </button>
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
