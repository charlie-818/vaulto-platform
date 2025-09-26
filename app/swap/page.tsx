'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { TrendingUp, Filter, Search, ExternalLink, Target, Activity } from 'lucide-react'
import AIAssistant from '@/components/AIAssistant'
import WalletButton from '@/components/WalletButton'
import AssetListItem from '@/components/AssetListItem'
import { tokenizedAssets, mockTransactions } from '@/lib/mockData'
import { WalletState, Transaction, TokenizedAsset } from '@/types'
import { generateMockAddress, generateMockTxHash } from '@/lib/utils'

export default function SwapPage() {
  const pathname = usePathname()
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
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <div className="relative w-32 h-20">
                  <Image
                    src="/logo.png"
                    alt="Vaulto Logo"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              <nav className="flex items-center space-x-6">
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
            Investment Opportunities
          </h1>
          <p className="text-xl text-vaulto-light/70 max-w-3xl mx-auto">
            Discover and invest in tokenized assets including stocks, commodities, pre-IPO companies, and early-stage startups. 
            Trade with real-time prices and market data.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-vaulto-secondary border border-vaulto-primary/20 rounded-xl p-6 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-vaulto-primary/20 rounded-lg">
              <Filter className="w-5 h-5 text-vaulto-primary" />
            </div>
            <h3 className="text-xl font-bold text-vaulto-light">Filter Assets</h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-vaulto-light/70" />
              <input
                type="text"
                placeholder="Search assets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-vaulto-dark border border-vaulto-light/20 rounded-lg text-vaulto-light placeholder-vaulto-light/50 focus:outline-none focus:border-vaulto-primary"
              />
            </div>
            <div className="flex items-center space-x-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 bg-vaulto-dark border border-vaulto-light/20 rounded-lg text-vaulto-light focus:outline-none focus:border-vaulto-primary"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
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
