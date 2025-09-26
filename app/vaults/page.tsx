'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { TrendingUp, Filter, Search, ExternalLink, Target } from 'lucide-react'
import AIAssistant from '@/components/AIAssistant'
import WalletButton from '@/components/WalletButton'
import VaultCard from '@/components/VaultCard'
import { vaults, mockTransactions } from '@/lib/mockData'
import { WalletState, Transaction, Vault } from '@/types'
import { generateMockAddress, generateMockTxHash } from '@/lib/utils'

export default function VaultsPage() {
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
  const [selectedRisk, setSelectedRisk] = useState('all')
  const [sortBy, setSortBy] = useState('return')

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

  const handleInvest = (vaultId: string, amount: number) => {
    const vault = vaults.find(v => v.id === vaultId)
    if (vault) {
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        type: 'swap',
        asset: vault.symbol,
        amount: amount,
        timestamp: new Date(),
        status: 'completed',
        txHash: generateMockTxHash()
      }
      setTransactions(prev => [newTransaction, ...prev])
    }
  }

  const handleExplain = (context: string, question?: string) => {
    setAiContext(context)
    setAiQuestion(question || '')
    setAiAssistantOpen(true)
  }

  const filteredVaults = vaults.filter(vault => {
    const matchesSearch = vault.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vault.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vault.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRisk = selectedRisk === 'all' || vault.riskLevel === selectedRisk
    return matchesSearch && matchesRisk
  }).sort((a, b) => {
    switch (sortBy) {
      case 'return':
        return b.currentReturn - a.currentReturn
      case 'tvl':
        return b.totalValueLocked - a.totalValueLocked
      case 'risk':
        const riskOrder = { low: 1, medium: 2, high: 3 }
        return riskOrder[a.riskLevel] - riskOrder[b.riskLevel]
      default:
        return 0
    }
  })

  const riskLevels = [
    { value: 'all', label: 'All Risk Levels' },
    { value: 'low', label: 'Low Risk' },
    { value: 'medium', label: 'Medium Risk' },
    { value: 'high', label: 'High Risk' }
  ]

  const sortOptions = [
    { value: 'return', label: 'Highest Return' },
    { value: 'tvl', label: 'Highest TVL' },
    { value: 'risk', label: 'Lowest Risk' }
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
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-vaulto-light mb-4">
            Investment Vaults
          </h1>
          <p className="text-xl text-vaulto-light/70 max-w-3xl mx-auto">
            Discover professionally managed investment vaults with automated strategies. 
            Earn competitive yields through diversified portfolios of tokenized assets, DeFi protocols, and yield farming strategies.
          </p>
        </div>

        {/* Investment Holdings Platform Button */}
        <div className="text-center mb-12">
          <a
            href="https://vaulto.holdings"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-vaulto-primary to-vaulto-secondary text-vaulto-dark font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <div className="p-2 bg-vaulto-dark/20 rounded-lg">
              <ExternalLink className="w-5 h-5" />
            </div>
            <span className="text-lg">Access Investment Holdings</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <p className="text-vaulto-light/60 text-sm mt-3">
            Manage your investment portfolio and track vault performance
          </p>
        </div>

        {/* Hyperliquid Integration Banner */}
        <div className="bg-gradient-to-r from-vaulto-primary/20 to-vaulto-secondary border border-vaulto-primary/30 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-vaulto-primary/20 rounded-lg flex items-center justify-center">
                <ExternalLink className="w-6 h-6 text-vaulto-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-vaulto-light">Powered by Hyperliquid</h3>
                <p className="text-vaulto-light/70">
                  All vaults are professionally managed through Hyperliquid's institutional-grade infrastructure
                </p>
              </div>
            </div>
            <a
              href="https://hyperliquid.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-vaulto-primary text-vaulto-dark font-medium rounded-lg hover:bg-vaulto-primary/90 transition-colors"
            >
              Visit Hyperliquid
            </a>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-vaulto-light/70" />
            <input
              type="text"
              placeholder="Search vaults..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-vaulto-secondary border border-vaulto-light/20 rounded-lg text-vaulto-light placeholder-vaulto-light/50 focus:outline-none focus:border-vaulto-primary"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-vaulto-light/70" />
            <select
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
              className="px-4 py-3 bg-vaulto-secondary border border-vaulto-light/20 rounded-lg text-vaulto-light focus:outline-none focus:border-vaulto-primary"
            >
              {riskLevels.map(risk => (
                <option key={risk.value} value={risk.value}>
                  {risk.label}
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

        {/* Vault Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {filteredVaults.map((vault) => (
            <VaultCard
              key={vault.id}
              vault={vault}
              onInvest={handleInvest}
              isWalletConnected={walletState.isConnected}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredVaults.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-vaulto-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-vaulto-light/50" />
            </div>
            <h3 className="text-lg font-medium text-vaulto-light mb-2">No vaults found</h3>
            <p className="text-vaulto-light/70">
              Try adjusting your search criteria or risk level filter
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
