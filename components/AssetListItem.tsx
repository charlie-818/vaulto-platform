'use client'

import { useState } from 'react'
import Image from 'next/image'
import { TrendingUp, TrendingDown, ChevronDown, ChevronUp } from 'lucide-react'
import { TokenizedAsset } from '@/types'
import { formatCurrency, formatPercentage, formatLargeNumber } from '@/lib/utils'
import { getCompanyLogo } from '@/lib/logoMapping'
import PriceChart from './PriceChart'

interface AssetListItemProps {
  asset: TokenizedAsset
  onBuy: (amount: number) => void
  onSell: (amount: number) => void
  isWalletConnected: boolean
}

export default function AssetListItem({ asset, onBuy, onSell, isWalletConnected }: AssetListItemProps) {
  const [buyAmount, setBuyAmount] = useState('')
  const [sellAmount, setSellAmount] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)

  const handleBuy = () => {
    const amount = parseFloat(buyAmount)
    if (amount > 0) {
      onBuy(amount)
      setBuyAmount('')
    }
  }

  const handleSell = () => {
    const amount = parseFloat(sellAmount)
    if (amount > 0) {
      onSell(amount)
      setSellAmount('')
    }
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
    
    // Fallback
    return (
      <div className="w-8 h-8 bg-vaulto-primary/20 rounded-full flex items-center justify-center">
        <span className="text-vaulto-primary font-bold text-sm">
          {asset.symbol.charAt(1)}
        </span>
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
      case 'startup':
        return 'text-green-400'
      default:
        return 'text-vaulto-light/70'
    }
  }

  const isPositive = asset.change24h >= 0

  return (
    <div className="bg-vaulto-secondary border border-vaulto-primary/20 rounded-lg hover:border-vaulto-primary/50 transition-colors">
      {/* Main Row - Clickable */}
      <div 
        className="grid grid-cols-12 gap-4 items-center p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Asset Info */}
        <div className="col-span-12 md:col-span-3 flex items-center space-x-3">
          {getAssetLogo()}
          <div>
            <h3 className="text-lg font-semibold text-vaulto-light">{asset.name}</h3>
            <p className="text-vaulto-light/70 text-sm">{asset.symbol}</p>
            <span className={`text-xs font-medium ${getTypeColor()}`}>
              {asset.type.replace('-', ' ').toUpperCase()}
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="col-span-6 md:col-span-3">
          <div className="text-right">
            <div className="text-lg font-bold text-vaulto-light">
              {formatCurrency(asset.currentPrice)}
            </div>
            <div className={`flex items-center justify-end space-x-1 text-sm ${
              isPositive ? 'text-green-400' : 'text-red-400'
            }`}>
              {isPositive ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="font-medium">
                {formatPercentage(asset.change24h)}
              </span>
            </div>
          </div>
        </div>

        {/* Volume */}
        <div className="col-span-6 md:col-span-3">
          <div className="text-right">
            <div className="text-vaulto-light font-medium">
              {asset.volume24h ? formatLargeNumber(asset.volume24h) : 'N/A'}
            </div>
            <div className="text-vaulto-light/70 text-sm">24h Volume</div>
          </div>
        </div>

        {/* Market Cap */}
        <div className="col-span-6 md:col-span-3">
          <div className="text-right">
            <div className="text-vaulto-light font-medium">
              {asset.marketCap ? formatLargeNumber(asset.marketCap) : 'N/A'}
            </div>
            <div className="text-vaulto-light/70 text-sm">Market Cap</div>
          </div>
        </div>
      </div>

      {/* Expanded Section */}
      {isExpanded && (
        <div className="border-t border-vaulto-primary/20 p-4 bg-vaulto-dark/30">
          {/* Price Chart */}
          {asset.priceHistory && asset.priceHistory.length > 0 && (
            <div className="mb-6">
              <PriceChart 
                data={asset.priceHistory} 
                symbol={asset.symbol}
                height={300}
                className="w-full"
              />
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Asset Details */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-vaulto-light">Asset Details</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-vaulto-light/70">Description:</span>
                  <span className="text-vaulto-light text-sm">{asset.description}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-vaulto-light/70">Category:</span>
                  <span className="text-vaulto-light text-sm">{asset.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-vaulto-light/70">Contract:</span>
                  <span className="text-vaulto-light text-sm font-mono">
                    {asset.contractAddress.slice(0, 6)}...{asset.contractAddress.slice(-4)}
                  </span>
                </div>
              </div>
            </div>

            {/* Buy/Sell Actions */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-vaulto-light">Trade</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-vaulto-light">Buy Amount</label>
                  <input
                    type="number"
                    value={buyAmount}
                    onChange={(e) => setBuyAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-vaulto-dark border border-vaulto-light/20 rounded px-3 py-2 text-vaulto-light placeholder-vaulto-light/50 focus:outline-none focus:border-vaulto-primary"
                    disabled={!isWalletConnected}
                  />
                  <button
                    onClick={handleBuy}
                    disabled={!buyAmount || !isWalletConnected}
                    className="w-full bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Buy
                  </button>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-vaulto-light">Sell Amount</label>
                  <input
                    type="number"
                    value={sellAmount}
                    onChange={(e) => setSellAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-vaulto-dark border border-vaulto-light/20 rounded px-3 py-2 text-vaulto-light placeholder-vaulto-light/50 focus:outline-none focus:border-vaulto-primary"
                    disabled={!isWalletConnected}
                  />
                  <button
                    onClick={handleSell}
                    disabled={!sellAmount || !isWalletConnected}
                    className="w-full bg-red-600 text-white font-semibold py-2 rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Sell
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
