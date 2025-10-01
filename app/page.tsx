'use client'

import { useState } from 'react'
import AIAssistant from '@/components/AIAssistant'
import StablecoinCard from '@/components/StablecoinCard'
import { stablecoins, mockTransactions } from '@/lib/mockData'
import { WalletState, Transaction } from '@/types'
import { generateMockAddress, generateMockTxHash } from '@/lib/utils'

export default function HomePage() {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    balance: 0
  })
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions)
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false)
  const [aiContext, setAiContext] = useState('')
  const [aiQuestion, setAiQuestion] = useState('')

  const handleConnectWallet = () => {
    const mockAddress = generateMockAddress()
    setWalletState({
      isConnected: true,
      address: mockAddress,
      balance: 10000 // Mock balance
    })
  }

  const handleDisconnectWallet = () => {
    setWalletState({
      isConnected: false,
      balance: 0
    })
  }

  const handleMint = (stablecoinSymbol: string, amount: number) => {
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'mint',
      asset: stablecoinSymbol,
      amount: amount,
      timestamp: new Date(),
      status: 'completed',
      txHash: generateMockTxHash()
    }
    setTransactions(prev => [newTransaction, ...prev])
  }

  const handleBurn = (stablecoinSymbol: string, amount: number) => {
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'burn',
      asset: stablecoinSymbol,
      amount: amount,
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
          <h1 className="text-3xl font-bold text-vaulto-light mb-2">
            Mint Stablecoins
          </h1>
          <p className="text-vaulto-light/70">
            Create stablecoins backed by collateral with transparent risk metrics
          </p>
        </div>

        {/* Stablecoin Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {stablecoins.map((stablecoin) => (
            <StablecoinCard
              key={stablecoin.id}
              stablecoin={stablecoin}
              onMint={(amount) => handleMint(stablecoin.symbol, amount)}
              onBurn={(amount) => handleBurn(stablecoin.symbol, amount)}
              onExplain={handleExplain}
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
