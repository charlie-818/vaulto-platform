'use client'

import { useState } from 'react'
import Image from 'next/image'
import { TrendingUp, TrendingDown, Copy, ExternalLink } from 'lucide-react'
import { TokenizedAsset } from '@/types'
import { formatCurrency, formatPercentage } from '@/lib/utils'
import { getCompanyLogo, getTypeIcon } from '@/lib/logoMapping'
import ExplainButton from './ExplainButton'

interface AssetCardProps {
  asset: TokenizedAsset
  onSwap: (amount: number) => void
  onExplain: (context: string, question?: string) => void
  isWalletConnected: boolean
}

export default function AssetCard({ asset, onSwap, onExplain, isWalletConnected }: AssetCardProps) {
  const [swapAmount, setSwapAmount] = useState('')

  const handleSwap = () => {
    const amount = parseFloat(swapAmount)
    if (amount > 0) {
      onSwap(amount)
      setSwapAmount('')
    }
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(asset.contractAddress)
  }

  const getAssetLogo = () => {
    const companyLogo = getCompanyLogo(asset.name)
    if (companyLogo.type === 'image' && companyLogo.src) {
      return (
        <div className="relative w-8 h-8">
          <Image
            src={companyLogo.src}
            alt={companyLogo.alt}
            fill
            className="object-contain"
          />
        </div>
      )
    } else if (companyLogo.type === 'icon' && companyLogo.icon) {
      return (
        <div className="text-2xl" title={companyLogo.alt}>
          {companyLogo.icon}
        </div>
      )
    } else if (companyLogo.type === 'emoji' && companyLogo.emoji) {
      return (
        <div className="text-2xl" title={companyLogo.alt}>
          {companyLogo.emoji}
        </div>
      )
    }
    
    // Fallback to type icon
    const typeIcon = getTypeIcon(asset.type)
    return (
      <div className="text-2xl" title={typeIcon.alt}>
        {typeIcon.icon}
      </div>
    )
  }

  const getTypeColor = () => {
    switch (asset.type) {
      case 'stock':
        return 'text-blue-400'
      case 'commodity':
        return 'text-yellow-400'
      case 'private-company':
        return 'text-purple-400'
    }
  }

  const isPositive = asset.change24h >= 0

  return (
    <div className="bg-vaulto-secondary border border-vaulto-primary/20 rounded-xl p-6 hover:border-vaulto-primary/50 transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {getAssetLogo()}
          <div>
            <h3 className="text-xl font-bold text-vaulto-light">{asset.name}</h3>
            <p className="text-vaulto-light/70 text-sm">{asset.symbol}</p>
          </div>
        </div>
        <ExplainButton
          context={`${asset.name} tokenized asset`}
          question={`What is ${asset.name} and should I invest in it?`}
          onClick={onExplain}
        />
      </div>

      {/* Description */}
      <p className="text-vaulto-light/70 mb-4">{asset.description}</p>

      {/* Type and Category */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className={`text-sm font-medium ${getTypeColor()}`}>
            {asset.type.replace('-', ' ').toUpperCase()}
          </span>
        </div>
        <span className="text-vaulto-light/70 text-sm">{asset.category}</span>
      </div>

      {/* Price and Change */}
      <div className="bg-vaulto-dark/50 rounded-lg p-3 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-vaulto-light">Current Price</span>
          <span className="text-vaulto-light text-lg font-bold">
            {formatCurrency(asset.currentPrice)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-vaulto-light/70 text-sm">24h Change</span>
          <div className={`flex items-center space-x-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">
              {formatPercentage(asset.change24h)}
            </span>
          </div>
        </div>
        {asset.marketCap && (
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-vaulto-light/20">
            <span className="text-vaulto-light/70 text-sm">Market Cap</span>
            <span className="text-vaulto-light text-sm font-medium">
              {formatCurrency(asset.marketCap, 'USD')}
            </span>
          </div>
        )}
      </div>

      {/* Contract Address */}
      <div className="bg-vaulto-dark/30 rounded-lg p-3 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-vaulto-light/70 text-sm">Contract Address</span>
          <button
            onClick={copyAddress}
            className="flex items-center space-x-1 text-vaulto-primary hover:text-vaulto-primary/80 transition-colors"
          >
            <span className="text-sm font-mono">
              {asset.contractAddress.slice(0, 6)}...{asset.contractAddress.slice(-4)}
            </span>
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Swap Form */}
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-vaulto-light mb-2">
            Amount to Swap (vltUSD)
          </label>
          <input
            type="number"
            value={swapAmount}
            onChange={(e) => setSwapAmount(e.target.value)}
            placeholder="0.00"
            className="w-full bg-vaulto-dark border border-vaulto-light/20 rounded-lg px-4 py-3 text-vaulto-light placeholder-vaulto-light/50 focus:outline-none focus:border-vaulto-primary"
            disabled={!isWalletConnected}
          />
        </div>
        <button
          onClick={handleSwap}
          disabled={!swapAmount || !isWalletConnected}
          className="w-full bg-vaulto-primary text-vaulto-dark font-semibold py-3 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          {isWalletConnected ? 'Swap to Token' : 'Connect Wallet to Swap'}
        </button>
      </div>
    </div>
  )
}
