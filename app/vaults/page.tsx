'use client'

import { useState } from 'react'
import { Search, ExternalLink } from 'lucide-react'
import AIAssistant from '@/components/AIAssistant'
import VaultCard from '@/components/VaultCard'
import { vaults, mockTransactions } from '@/lib/mockData'
import { WalletState, Transaction, Vault } from '@/types'
import { generateMockAddress, generateMockTxHash } from '@/lib/utils'

export default function VaultsPage() {
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20 relative z-10">
        
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-vaulto-light mb-2">
                Investment Vaults
              </h1>
              <p className="text-vaulto-light/70">
                Professionally managed vaults with automated strategies
              </p>
            </div>
            
            {/* External Link */}
            <a
              href="https://vaulto.holdings"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 bg-vaulto-primary text-vaulto-dark text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              <span>Investment Holdings</span>
              <ExternalLink className="w-4 h-4" />
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
          <div>
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
          <div>
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
