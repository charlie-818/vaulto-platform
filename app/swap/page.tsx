'use client'

import { useState } from 'react'
import { TrendingUp, Filter, Search, ExternalLink, Target, Activity } from 'lucide-react'
import AIAssistant from '@/components/AIAssistant'
import AssetListItem from '@/components/AssetListItem'
import IndexCard from '@/components/IndexCard'
import IndexDetailsModal from '@/components/IndexDetailsModal'
import TradingDashboard from '@/components/TradingDashboard'
import { tokenizedAssets, customIndices, mockTransactions } from '@/lib/mockData'
import { WalletState, Transaction, TokenizedAsset, CustomIndex, IndexTrade } from '@/types'
import { generateMockAddress, generateMockTxHash } from '@/lib/utils'

export default function SwapPage() {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    balance: 0
  })
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions)
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false)
  const [aiContext, setAiContext] = useState('')
  const [aiQuestion, setAiQuestion] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [activeView, setActiveView] = useState<'dashboard' | 'indices' | 'assets'>('dashboard')
  const [selectedIndex, setSelectedIndex] = useState<CustomIndex | null>(null)
  const [indexTrades, setIndexTrades] = useState<IndexTrade[]>([])

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

  const handleBuy = (assetSymbol: string, amount: number) => {
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'swap',
      asset: assetSymbol,
      amount: amount,
      timestamp: new Date(),
      status: 'completed',
      txHash: generateMockTxHash()
    }
    setTransactions(prev => [newTransaction, ...prev])
  }

  const handleSell = (assetSymbol: string, amount: number) => {
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'swap',
      asset: assetSymbol,
      amount: -amount, // Negative amount for sell
      timestamp: new Date(),
      status: 'completed',
      txHash: generateMockTxHash()
    }
    setTransactions(prev => [newTransaction, ...prev])
  }

  const handleExplain = (context: string, question?: string) => {
    setAiContext(context)
    setAiQuestion(question || '')
    setAiAssistantOpen(true)
  }

  const handleIndexInvest = (indexId: string, amount: number) => {
    const newTrade: IndexTrade = {
      id: Date.now().toString(),
      type: 'buy',
      indexId: indexId,
      amount: amount,
      price: customIndices.find(i => i.id === indexId)?.currentValue || 0,
      timestamp: new Date(),
      status: 'completed',
      txHash: generateMockTxHash()
    }
    setIndexTrades(prev => [newTrade, ...prev])
  }

  const handleAssetTrade = (assetId: string, amount: number, type: 'buy' | 'sell') => {
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'swap',
      asset: assetId,
      amount: type === 'buy' ? amount : -amount,
      timestamp: new Date(),
      status: 'completed',
      txHash: generateMockTxHash()
    }
    setTransactions(prev => [newTransaction, ...prev])
  }

  const filteredAssets = tokenizedAssets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || asset.type === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = [
    { value: 'all', label: 'All Assets' },
    { value: 'stock', label: 'Tokenized Stocks' },
    { value: 'commodity', label: 'Tokenized Commodities' },
    { value: 'private-company', label: 'Private Companies' },
    { value: 'startup', label: 'Early Stage Startups' }
  ]

  const filteredIndices = customIndices.filter(index => {
    const matchesSearch = index.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         index.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || 
                           (selectedCategory === 'stock' && index.category === 'stocks') ||
                           (selectedCategory === 'startup' && index.category === 'startups') ||
                           (selectedCategory === 'commodity' && index.category === 'commodities') ||
                           (selectedCategory === 'private-company' && index.category === 'mixed')
    return matchesSearch && matchesCategory
  })

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
        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-vaulto-light mb-2">
                Investment Opportunities
              </h1>
              <p className="text-vaulto-light/70">
                Discover and invest in tokenized assets and custom indices
              </p>
            </div>
            
            {/* View Toggle - Segmented Control */}
            <div className="flex items-center bg-slate-800/50 rounded-lg p-1 border border-slate-700/50">
              <button
                onClick={() => setActiveView('dashboard')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeView === 'dashboard'
                    ? 'bg-vaulto-primary text-vaulto-dark shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveView('indices')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeView === 'indices'
                    ? 'bg-vaulto-primary text-vaulto-dark shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Indices
              </button>
              <button
                onClick={() => setActiveView('assets')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeView === 'assets'
                    ? 'bg-vaulto-primary text-vaulto-dark shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Assets
              </button>
            </div>
          </div>
        </div>

        {/* Content based on active view */}
        {activeView === 'dashboard' && (
          <TradingDashboard
            indices={customIndices}
            assets={tokenizedAssets}
            onIndexInvest={handleIndexInvest}
            onAssetTrade={handleAssetTrade}
            isWalletConnected={walletState.isConnected}
          />
        )}

        {activeView === 'indices' && (
          <>
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-vaulto-light/70" />
                <input
                  type="text"
                  placeholder="Search indices..."
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
            </div>

            {/* Index Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredIndices.map((index) => (
                <IndexCard
                  key={index.id}
                  index={index}
                  onInvest={(amount) => handleIndexInvest(index.id, amount)}
                  onExplain={handleExplain}
                  isWalletConnected={walletState.isConnected}
                />
              ))}
            </div>

            {/* No Results */}
            {filteredIndices.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-vaulto-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-vaulto-light/50" />
                </div>
                <h3 className="text-lg font-medium text-vaulto-light mb-2">No indices found</h3>
                <p className="text-vaulto-light/70">
                  Try adjusting your search criteria or category filter
                </p>
              </div>
            )}
          </>
        )}

        {activeView === 'assets' && (
          <>
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-vaulto-light/70" />
                <input
                  type="text"
                  placeholder="Search assets..."
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
            </div>

            {/* Asset List Header */}
            <div className="bg-gradient-to-r from-vaulto-primary/10 to-vaulto-secondary/10 border border-vaulto-primary/30 rounded-xl p-6 mb-6 hidden md:block">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-vaulto-primary/20 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-vaulto-primary" />
                </div>
                <h3 className="text-xl font-bold text-vaulto-light">Available Assets</h3>
              </div>
              <div className="grid grid-cols-12 gap-4 items-center text-vaulto-light/80 text-sm font-semibold">
                <div className="col-span-3 flex items-center space-x-2">
                  <Target className="w-4 h-4 text-vaulto-primary" />
                  <span>Asset</span>
                </div>
                <div className="col-span-3 text-right flex items-center justify-end space-x-2">
                  <span>Price</span>
                  <TrendingUp className="w-4 h-4 text-vaulto-primary" />
                </div>
                <div className="col-span-3 text-right flex items-center justify-end space-x-2">
                  <span>24h Volume</span>
                  <Activity className="w-4 h-4 text-vaulto-primary" />
                </div>
                <div className="col-span-3 text-right flex items-center justify-end space-x-2">
                  <span>Market Cap</span>
                  <Target className="w-4 h-4 text-vaulto-primary" />
                </div>
              </div>
            </div>

            {/* Asset List */}
            <div className="space-y-3 mb-12">
              {filteredAssets.map((asset) => (
                <AssetListItem
                  key={asset.id}
                  asset={asset}
                  onBuy={(amount) => handleBuy(asset.symbol, amount)}
                  onSell={(amount) => handleSell(asset.symbol, amount)}
                  isWalletConnected={walletState.isConnected}
                />
              ))}
            </div>

            {/* No Results */}
            {filteredAssets.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-vaulto-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-vaulto-light/50" />
                </div>
                <h3 className="text-lg font-medium text-vaulto-light mb-2">No assets found</h3>
                <p className="text-vaulto-light/70">
                  Try adjusting your search criteria or category filter
                </p>
              </div>
            )}
          </>
        )}

      </main>

      {/* AI Assistant */}
      <AIAssistant
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
        context={aiContext}
        initialQuestion={aiQuestion}
      />

      {/* Index Details Modal */}
      {selectedIndex && (
        <IndexDetailsModal
          index={selectedIndex}
          isOpen={!!selectedIndex}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </div>
  )
}
