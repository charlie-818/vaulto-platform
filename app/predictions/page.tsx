'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  TrendingUp, 
  Filter, 
  Search, 
  ExternalLink, 
  Target, 
  Clock, 
  DollarSign, 
  BarChart3,
  TrendingDown,
  Activity,
  AlertCircle,
  CheckCircle,
  XCircle,
  Info
} from 'lucide-react'
import AIAssistant from '@/components/AIAssistant'
import WalletButton from '@/components/WalletButton'
import { predictionMarkets, marketInsights } from '@/lib/mockData'
import { WalletState, PredictionMarket, MarketInsight } from '@/types'
import { generateMockAddress } from '@/lib/utils'

export default function PredictionsPage() {
  const pathname = usePathname()
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    balance: 0
  })
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false)
  const [aiContext, setAiContext] = useState('')
  const [aiQuestion, setAiQuestion] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('volume')
  const [selectedMarket, setSelectedMarket] = useState<PredictionMarket | null>(null)
  const [liveOdds, setLiveOdds] = useState<{[key: string]: {[key: string]: number}}>({})

  // Simulate live odds updates
  useEffect(() => {
    const updateOdds = () => {
      const newOdds: {[key: string]: {[key: string]: number}} = {}
      predictionMarkets.forEach(market => {
        newOdds[market.id] = {}
        market.outcomes.forEach(outcome => {
          // Simulate small price movements
          const currentPrice = outcome.lastPrice
          const volatility = 0.02 // 2% max change
          const change = (Math.random() - 0.5) * volatility
          const newPrice = Math.max(0.01, Math.min(0.99, currentPrice + change))
          newOdds[market.id][outcome.id] = newPrice
        })
      })
      setLiveOdds(newOdds)
    }

    updateOdds()
    const interval = setInterval(updateOdds, 3000) // Update every 3 seconds
    return () => clearInterval(interval)
  }, [])

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

  const handleExplain = (context: string, question?: string) => {
    setAiContext(context)
    setAiQuestion(question || '')
    setAiAssistantOpen(true)
  }

  const handlePlaceBet = (marketId: string, outcomeId: string, amount: number) => {
    if (!walletState.isConnected) {
      handleConnectWallet()
      return
    }
    // Mock bet placement
    console.log(`Placing bet: ${amount} on ${outcomeId} in market ${marketId}`)
  }

  const filteredMarkets = predictionMarkets.filter(market => {
    const matchesSearch = market.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         market.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         market.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || market.category === selectedCategory
    return matchesSearch && matchesCategory
  }).sort((a, b) => {
    switch (sortBy) {
      case 'volume':
        return b.totalVolume - a.totalVolume
      case 'liquidity':
        return b.liquidity - a.liquidity
      case 'endDate':
        return new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
      default:
        return 0
    }
  })

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'price', label: 'Price Predictions' },
    { value: 'regulation', label: 'Regulation' },
    { value: 'adoption', label: 'Adoption' },
    { value: 'technology', label: 'Technology' },
    { value: 'macro', label: 'Macro' }
  ]

  const sortOptions = [
    { value: 'volume', label: 'Highest Volume' },
    { value: 'liquidity', label: 'Highest Liquidity' },
    { value: 'endDate', label: 'Ending Soon' }
  ]

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'price': return TrendingUp
      case 'regulation': return AlertCircle
      case 'adoption': return CheckCircle
      case 'technology': return Activity
      case 'macro': return BarChart3
      default: return Target
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'price': return 'text-green-400'
      case 'regulation': return 'text-yellow-400'
      case 'adoption': return 'text-blue-400'
      case 'technology': return 'text-purple-400'
      case 'macro': return 'text-orange-400'
      default: return 'text-vaulto-light'
    }
  }

  const formatTimeRemaining = (endDate: Date) => {
    const now = new Date()
    const diff = endDate.getTime() - now.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    
    if (days > 0) return `${days}d ${hours}h`
    if (hours > 0) return `${hours}h`
    return 'Ending soon'
  }

  const getMarketInsights = (marketId: string) => {
    return marketInsights.filter(insight => insight.marketId === marketId)
  }

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
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-vaulto-light mb-4">
            Prediction Markets
          </h1>
          <p className="text-xl text-vaulto-light/70 max-w-3xl mx-auto">
            Trade on the future of crypto with real-time odds and market insights. Bet on price movements, regulatory developments, and adoption trends.
          </p>
        </div>

        {/* Prediction Markets Platform Button */}
        <div className="text-center mb-12">
          <a
            href="https://vaulto.info"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-vaulto-primary/80 to-vaulto-primary/60 text-vaulto-dark font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <div className="p-2 bg-vaulto-dark/20 rounded-lg">
              <ExternalLink className="w-5 h-5" />
            </div>
            <span className="text-lg">Trade Prediction Markets</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <p className="text-vaulto-light/60 text-sm mt-3">
            Access live prediction markets and crypto trading opportunities
          </p>
        </div>

        {/* Live Market Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-vaulto-secondary border border-vaulto-primary/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-vaulto-light/70 text-sm">Total Volume</p>
                <p className="text-2xl font-bold text-vaulto-light">$12.4M</p>
              </div>
              <DollarSign className="w-8 h-8 text-vaulto-primary" />
            </div>
          </div>
          <div className="bg-vaulto-secondary border border-vaulto-primary/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-vaulto-light/70 text-sm">Active Markets</p>
                <p className="text-2xl font-bold text-vaulto-light">{predictionMarkets.length}</p>
              </div>
              <Activity className="w-8 h-8 text-vaulto-primary" />
            </div>
          </div>
          <div className="bg-vaulto-secondary border border-vaulto-primary/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-vaulto-light/70 text-sm">Total Liquidity</p>
                <p className="text-2xl font-bold text-vaulto-light">$9.8M</p>
              </div>
              <BarChart3 className="w-8 h-8 text-vaulto-primary" />
            </div>
          </div>
          <div className="bg-vaulto-secondary border border-vaulto-primary/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-vaulto-light/70 text-sm">Live Updates</p>
                <p className="text-2xl font-bold text-green-400">Live</p>
              </div>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-vaulto-light/70" />
            <input
              type="text"
              placeholder="Search markets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-vaulto-secondary border border-vaulto-light/20 rounded-lg text-vaulto-light placeholder-vaulto-light/50 focus:outline-none focus:border-vaulto-primary"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-vaulto-light/70" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-vaulto-secondary border border-vaulto-light/20 rounded-lg text-vaulto-light focus:outline-none focus:border-vaulto-primary"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-vaulto-light/70" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-vaulto-secondary border border-vaulto-light/20 rounded-lg text-vaulto-light focus:outline-none focus:border-vaulto-primary"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Markets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {filteredMarkets.map((market) => {
            const CategoryIcon = getCategoryIcon(market.category)
            const insights = getMarketInsights(market.id)
            const currentOdds = liveOdds[market.id] || {}
            
            return (
              <div key={market.id} className="bg-vaulto-secondary border border-vaulto-primary/20 rounded-xl p-6 hover:border-vaulto-primary/40 transition-colors">
                {/* Market Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 bg-vaulto-primary/20 rounded-lg flex items-center justify-center`}>
                      <CategoryIcon className={`w-5 h-5 ${getCategoryColor(market.category)}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-vaulto-light mb-1">{market.title}</h3>
                      <div className="flex items-center space-x-2 text-sm text-vaulto-light/70">
                        <Clock className="w-4 h-4" />
                        <span>{formatTimeRemaining(market.endDate)}</span>
                        <span>•</span>
                        <span>{market.marketMaker}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-vaulto-light/70">Volume</p>
                    <p className="text-lg font-bold text-vaulto-light">${(market.totalVolume / 1000000).toFixed(1)}M</p>
                  </div>
                </div>

                {/* Market Description */}
                <p className="text-vaulto-light/70 mb-4 text-sm">{market.description}</p>

                {/* Outcomes */}
                <div className="space-y-3 mb-4">
                  {market.outcomes.map((outcome) => {
                    const currentPrice = currentOdds[outcome.id] || outcome.lastPrice
                    const priceChange = currentPrice - outcome.lastPrice
                    const isPositive = priceChange > 0
                    
                    return (
                      <div key={outcome.id} className="flex items-center justify-between p-3 bg-vaulto-dark/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <span className="text-vaulto-light font-medium">{outcome.name}</span>
                          <div className="flex items-center space-x-1">
                            {isPositive ? (
                              <TrendingUp className="w-4 h-4 text-green-400" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-red-400" />
                            )}
                            <span className={`text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                              {priceChange > 0 ? '+' : ''}{(priceChange * 100).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-vaulto-light font-bold">{(currentPrice * 100).toFixed(1)}%</p>
                            <p className="text-xs text-vaulto-light/70">{(1 / currentPrice).toFixed(2)}x</p>
                          </div>
                          <button
                            onClick={() => handlePlaceBet(market.id, outcome.id, 100)}
                            className="px-4 py-2 bg-vaulto-primary text-vaulto-dark font-medium rounded-lg hover:bg-vaulto-primary/90 transition-colors text-sm"
                          >
                            Bet
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Market Insights */}
                {insights.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Info className="w-4 h-4 text-vaulto-primary" />
                      <span className="text-sm font-medium text-vaulto-light">Latest Insights</span>
                    </div>
                    <div className="space-y-2">
                      {insights.slice(0, 2).map((insight) => (
                        <div key={insight.id} className="p-3 bg-vaulto-dark/30 rounded-lg">
                          <div className="flex items-start justify-between mb-1">
                            <h4 className="text-sm font-medium text-vaulto-light">{insight.title}</h4>
                            <span className={`text-xs px-2 py-1 rounded ${
                              insight.impact === 'positive' ? 'bg-green-400/20 text-green-400' :
                              insight.impact === 'negative' ? 'bg-red-400/20 text-red-400' :
                              'bg-gray-400/20 text-gray-400'
                            }`}>
                              {insight.impact}
                            </span>
                          </div>
                          <p className="text-xs text-vaulto-light/70 mb-2">{insight.description}</p>
                          <div className="flex items-center justify-between text-xs text-vaulto-light/50">
                            <span>{insight.source}</span>
                            <span>Confidence: {(insight.confidence * 100).toFixed(0)}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {market.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-vaulto-primary/20 text-vaulto-primary text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Market Actions */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleExplain(`Prediction Market: ${market.title}`, 'What are the key factors affecting this prediction?')}
                    className="text-vaulto-primary hover:text-vaulto-primary/80 text-sm font-medium"
                  >
                    Get AI Analysis
                  </button>
                  <a
                    href="#"
                    className="flex items-center space-x-1 text-vaulto-light/70 hover:text-vaulto-light text-sm"
                  >
                    <span>View Details</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        {/* No Results */}
        {filteredMarkets.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-vaulto-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-vaulto-light/50" />
            </div>
            <h3 className="text-lg font-medium text-vaulto-light mb-2">No markets found</h3>
            <p className="text-vaulto-light/70">
              Try adjusting your search criteria or category filter
            </p>
          </div>
        )}

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
