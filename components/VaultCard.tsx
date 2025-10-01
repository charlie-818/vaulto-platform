'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Vault } from '@/types'
import { TrendingUp, TrendingDown, ExternalLink, Info, DollarSign, Shield, Target, Users } from 'lucide-react'

interface VaultCardProps {
  vault: Vault
  onInvest: (vaultId: string, amount: number) => void
  isWalletConnected: boolean
}

export default function VaultCard({ vault, onInvest, isWalletConnected }: VaultCardProps) {
  const [investAmount, setInvestAmount] = useState('')
  const [showDetails, setShowDetails] = useState(false)

  const getVaultLogo = () => {
    const logoMap: Record<string, string> = {
      'yield-vault': '/logos/yield-optimizer.svg',
      'ai-growth-vault': '/logos/ai-growth.svg',
      'stable-income-vault': '/logos/stable-income.svg',
      'defi-arbitrage-vault': '/logos/defi-arbitrage.svg',
      'ethereum-staking-vault': '/logos/eth-staking.svg',
      'momentum-trading-vault': '/logos/momentum-trader.svg'
    }
    
    const logoPath = logoMap[vault.id] || '/logos/yield-optimizer.svg'
    
    return (
      <div className="relative w-12 h-12 mr-3">
        <Image
          src={logoPath}
          alt={`${vault.name} Logo`}
          fill
          className="object-contain"
        />
      </div>
    )
  }

  const handleInvest = () => {
    const amount = parseFloat(investAmount)
    if (amount >= vault.minimumDeposit) {
      onInvest(vault.id, amount)
      setInvestAmount('')
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-400'
      case 'medium': return 'text-yellow-400'
      case 'high': return 'text-red-400'
      default: return 'text-vaulto-light/70'
    }
  }

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'low': return <Shield className="w-4 h-4" />
      case 'medium': return <Target className="w-4 h-4" />
      case 'high': return <TrendingUp className="w-4 h-4" />
      default: return <Info className="w-4 h-4" />
    }
  }

  return (
    <div className="bg-vaulto-secondary border border-vaulto-primary/20 rounded-xl p-6 hover:border-vaulto-primary/40 transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="mb-2">
            <h3 className="text-xl font-bold text-vaulto-light">{vault.name}</h3>
            <span className="text-sm text-vaulto-light/70 font-mono">{vault.symbol}</span>
          </div>
          <p className="text-vaulto-light/70 text-sm mb-3">{vault.description}</p>
          <div className="flex items-center space-x-4 text-sm">
            <div className={`flex items-center space-x-1 ${getRiskColor(vault.riskLevel)}`}>
              {getRiskIcon(vault.riskLevel)}
              <span className="capitalize">{vault.riskLevel} Risk</span>
            </div>
            <div className="flex items-center space-x-1 text-vaulto-light/70">
              <Users className="w-4 h-4" />
              <span>{formatCurrency(vault.totalValueLocked)} TVL</span>
            </div>
          </div>
        </div>
        <a
          href={vault.hyperliquidLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1 text-vaulto-primary hover:text-vaulto-primary/80 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          <span className="text-sm">Hyperliquid</span>
        </a>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-vaulto-dark/50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-sm text-vaulto-light/70">Current Return</span>
          </div>
          <div className="text-lg font-bold text-green-400">
            {formatPercentage(vault.currentReturn)}
          </div>
        </div>
        <div className="bg-vaulto-dark/50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Target className="w-4 h-4 text-vaulto-primary" />
            <span className="text-sm text-vaulto-light/70">Target Return</span>
          </div>
          <div className="text-lg font-bold text-vaulto-primary">
            {formatPercentage(vault.targetReturn)}
          </div>
        </div>
      </div>

      {/* Performance History */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-vaulto-light mb-2">Performance History</h4>
        <div className="grid grid-cols-4 gap-2">
          {vault.performanceHistory.map((period) => (
            <div key={period.period} className="bg-vaulto-dark/50 rounded-lg p-2 text-center">
              <div className="text-xs text-vaulto-light/70 mb-1">{period.period}</div>
              <div className={`text-sm font-medium ${
                period.return >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {formatPercentage(period.return)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strategy & Assets */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-medium text-vaulto-light">Strategy</h4>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-vaulto-primary hover:text-vaulto-primary/80 text-sm transition-colors"
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>
        </div>
        <p className="text-sm text-vaulto-light/70 mb-2">{vault.strategy}</p>
        {showDetails && (
          <div className="space-y-3">
            <div>
              <h5 className="text-xs font-medium text-vaulto-light mb-1">Assets</h5>
              <div className="flex flex-wrap gap-1">
                {vault.assets.map((asset) => (
                  <span
                    key={asset}
                    className="px-2 py-1 bg-vaulto-primary/20 text-vaulto-primary text-xs rounded"
                  >
                    {asset}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-vaulto-light/70">Management Fee:</span>
                <span className="text-vaulto-light ml-1">{vault.managementFee}%</span>
              </div>
              <div>
                <span className="text-vaulto-light/70">Performance Fee:</span>
                <span className="text-vaulto-light ml-1">{vault.performanceFee}%</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Investment Section */}
      <div className="border-t border-vaulto-primary/20 pt-4">
        <div className="flex items-center space-x-2 mb-3">
          <DollarSign className="w-4 h-4 text-vaulto-light/70" />
          <span className="text-sm text-vaulto-light/70">
            Minimum: {formatCurrency(vault.minimumDeposit)}
          </span>
        </div>
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Amount to invest"
            value={investAmount}
            onChange={(e) => setInvestAmount(e.target.value)}
            className="flex-1 px-3 py-2 bg-vaulto-dark border border-vaulto-light/20 rounded-lg text-vaulto-light placeholder-vaulto-light/50 focus:outline-none focus:border-vaulto-primary"
            disabled={!isWalletConnected}
          />
          <button
            onClick={handleInvest}
            disabled={!isWalletConnected || !investAmount || parseFloat(investAmount) < vault.minimumDeposit}
            className="px-4 py-2 bg-vaulto-primary text-vaulto-dark font-medium rounded-lg hover:bg-vaulto-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Invest
          </button>
        </div>
        {!isWalletConnected && (
          <p className="text-xs text-vaulto-light/50 mt-2">
            Connect your wallet to invest
          </p>
        )}
      </div>
    </div>
  )
}
