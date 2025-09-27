'use client'

import { useState } from 'react'
import { TrendingUp, TrendingDown, Copy, ExternalLink, BarChart3, Clock, Users, Target } from 'lucide-react'
import { CustomIndex } from '@/types'
import { formatCurrency, formatPercentage } from '@/lib/utils'
import ExplainButton from './ExplainButton'

interface IndexCardProps {
  index: CustomIndex
  onInvest: (amount: number) => void
  onExplain: (context: string, question?: string) => void
  isWalletConnected: boolean
}

export default function IndexCard({ index, onInvest, onExplain, isWalletConnected }: IndexCardProps) {
  const [investAmount, setInvestAmount] = useState('')

  const handleInvest = () => {
    const amount = parseFloat(investAmount)
    if (amount > 0) {
      onInvest(amount)
      setInvestAmount('')
    }
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(index.contractAddress)
  }

  const getCategoryIcon = () => {
    switch (index.category) {
      case 'stocks':
        return <BarChart3 className="w-5 h-5 text-blue-400" />
      case 'startups':
        return <TrendingUp className="w-5 h-5 text-green-400" />
      case 'commodities':
        return <Target className="w-5 h-5 text-yellow-400" />
      case 'mixed':
        return <Users className="w-5 h-5 text-purple-400" />
      default:
        return <BarChart3 className="w-5 h-5 text-vaulto-primary" />
    }
  }

  const getCategoryColor = () => {
    switch (index.category) {
      case 'stocks':
        return 'text-blue-400'
      case 'startups':
        return 'text-green-400'
      case 'commodities':
        return 'text-yellow-400'
      case 'mixed':
        return 'text-purple-400'
      default:
        return 'text-vaulto-primary'
    }
  }

  const isPositive24h = index.change24h >= 0
  const isPositive7d = index.change7d >= 0
  const isPositive30d = index.change30d >= 0

  return (
    <div className="bg-vaulto-secondary border border-vaulto-primary/20 rounded-xl p-5 hover:border-vaulto-primary/50 transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          {getCategoryIcon()}
          <div>
            <h3 className="text-lg font-bold text-vaulto-light">{index.name}</h3>
            <p className="text-vaulto-light/70 text-sm">{index.symbol}</p>
          </div>
        </div>
        <ExplainButton
          context={`${index.name} custom index`}
          question={`What is the ${index.name} and how does it work?`}
          onClick={onExplain}
        />
      </div>

      {/* Description */}
      <p className="text-vaulto-light/70 text-sm mb-4 line-clamp-2">{index.description}</p>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-lg font-bold text-vaulto-light">
            {formatCurrency(index.currentValue)}
          </div>
          <div className={`text-sm font-medium ${
            index.change24h >= 0 ? 'text-green-400' : 'text-red-400'
          }`}>
            {index.change24h >= 0 ? (
              <TrendingUp className="w-3 h-3 inline mr-1" />
            ) : (
              <TrendingDown className="w-3 h-3 inline mr-1" />
            )}
            {formatPercentage(index.change24h)}
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-vaulto-light/70">{index.assetCount} Assets</div>
          <div className={`text-xs ${getCategoryColor()}`}>
            {index.category.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Top Holdings Preview */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-vaulto-light/70">Top Holdings</span>
          <span className="text-xs text-vaulto-light/50">
            {index.assets.slice(0, 2).reduce((sum, asset) => sum + asset.weight, 0)}% combined
          </span>
        </div>
        <div className="flex items-center space-x-4">
          {index.assets.slice(0, 2).map((asset) => (
            <div key={asset.id} className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 rounded-full bg-vaulto-primary"></div>
              <span className="text-xs text-vaulto-light/70">{asset.asset.name}</span>
              <span className="text-xs text-vaulto-light/50">({asset.weight}%)</span>
            </div>
          ))}
        </div>
      </div>

      {/* Investment Form */}
      <div className="space-y-2">
        <input
          type="number"
          value={investAmount}
          onChange={(e) => setInvestAmount(e.target.value)}
          placeholder="Amount (vltUSD)"
          className="w-full bg-vaulto-dark border border-vaulto-light/20 rounded-lg px-3 py-2 text-sm text-vaulto-light placeholder-vaulto-light/50 focus:outline-none focus:border-vaulto-primary"
          disabled={!isWalletConnected}
        />
        <button
          onClick={handleInvest}
          disabled={!investAmount || !isWalletConnected}
          className="w-full bg-vaulto-primary text-vaulto-dark font-medium py-2 rounded-lg text-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          {isWalletConnected ? 'Invest' : 'Connect Wallet'}
        </button>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mt-3">
        {index.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 bg-vaulto-primary/10 text-vaulto-primary text-xs rounded"
          >
            {tag}
          </span>
        ))}
        {index.tags.length > 2 && (
          <span className="px-2 py-0.5 text-vaulto-light/50 text-xs">
            +{index.tags.length - 2}
          </span>
        )}
      </div>
    </div>
  )
}
