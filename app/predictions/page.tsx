'use client'

import { useState, useEffect } from 'react'
import { 
  TrendingUp, 
  Filter, 
  Search, 
  ExternalLink, 
  Target, 
  Clock, 
  DollarSign, 
  BarChart3,
  Activity,
  AlertCircle,
  CheckCircle,
  Info,
  Zap
} from 'lucide-react'
import AIAssistant from '@/components/AIAssistant'
import { predictionMarkets, marketInsights } from '@/lib/mockData'
import { PredictionMarket, MarketInsight } from '@/types'

export default function PredictionsPage() {
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

  const handleExplain = (context: string, question?: string) => {
    setAiContext(context)
    setAiQuestion(question || '')
    setAiAssistantOpen(true)
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20 relative z-10">
        
        {/* Page Header */}
        <div className="mb-8 pt-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-vaulto-light mb-2">
                Market Intelligence
              </h1>
              <p className="text-vaulto-light/70">
                Real-time market sentiment and data-driven insights
              </p>
            </div>
            
            {/* External Link */}
            <a
              href="https://vaulto.info"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 bg-vaulto-primary text-vaulto-dark text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              <span>Live Markets</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Market Intelligence Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-vaulto-light/70" />
            <input
              type="text"
              placeholder="Search market insights and predictions..."
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
            
            // Get the top outcome
            const topOutcome = market.outcomes.reduce((prev, current) => {
              const prevPrice = currentOdds[prev.id] || prev.lastPrice
              const currentPrice = currentOdds[current.id] || current.lastPrice
              return currentPrice > prevPrice ? current : prev
            })
            const topPrice = currentOdds[topOutcome.id] || topOutcome.lastPrice
            
            return (
              <div key={market.id} className="bg-vaulto-secondary border border-vaulto-primary/20 rounded-xl p-6 hover:border-vaulto-primary/40 transition-all hover:shadow-lg">
                {/* Simplified Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className={`w-10 h-10 bg-vaulto-primary/20 rounded-lg flex items-center justify-center shrink-0`}>
                      <CategoryIcon className={`w-5 h-5 ${getCategoryColor(market.category)}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-vaulto-light mb-2 leading-tight">{market.title}</h3>
                      <div className="flex items-center space-x-3 text-sm text-vaulto-light/60">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{formatTimeRemaining(market.endDate)}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="w-3.5 h-3.5" />
                          <span>${(market.totalVolume / 1000000).toFixed(1)}M</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Prediction - Simplified to show top outcome */}
                <div className="bg-gradient-to-br from-vaulto-dark/70 to-vaulto-dark/40 rounded-lg p-5 mb-4 border border-vaulto-primary/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-vaulto-light/70 text-sm">Top Prediction</span>
                    <div className={`w-2 h-2 rounded-full ${topPrice > 0.5 ? 'bg-green-400' : 'bg-yellow-400'} animate-pulse`} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-vaulto-light font-semibold text-base">{topOutcome.name}</span>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-vaulto-primary">{(topPrice * 100).toFixed(0)}%</p>
                      <p className="text-xs text-vaulto-light/50">probability</p>
                    </div>
                  </div>
                </div>

                {/* Key Insight - Show only one */}
                {insights.length > 0 && (
                  <div className="bg-vaulto-dark/30 rounded-lg p-4 mb-4 border border-vaulto-primary/10">
                    <div className="flex items-start space-x-3">
                      <Info className="w-4 h-4 text-vaulto-primary mt-0.5 shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm text-vaulto-light/80 leading-relaxed">{insights[0].description}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bottom Actions - Simplified */}
                <div className="flex items-center justify-between pt-3 border-t border-vaulto-light/10">
                  <button
                    onClick={() => handleExplain(`Market Intelligence: ${market.title}`, 'What are the key factors affecting this market prediction and how can I use this information for investment decisions?')}
                    className="flex items-center space-x-2 text-vaulto-primary hover:text-vaulto-primary/80 text-sm font-medium transition-colors"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Analyze</span>
                  </button>
                  <div className="flex items-center space-x-2">
                    {market.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-vaulto-primary/10 text-vaulto-primary/70 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
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
