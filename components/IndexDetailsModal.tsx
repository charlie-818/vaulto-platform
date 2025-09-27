'use client'

import { useState } from 'react'
import { X, TrendingUp, TrendingDown, BarChart3, Clock, Target, ExternalLink } from 'lucide-react'
import { CustomIndex } from '@/types'
import { formatCurrency, formatPercentage } from '@/lib/utils'
import PriceChart from './PriceChart'

interface IndexDetailsModalProps {
  index: CustomIndex
  isOpen: boolean
  onClose: () => void
}

export default function IndexDetailsModal({ index, isOpen, onClose }: IndexDetailsModalProps) {
  if (!isOpen) return null

  const getRiskLevel = (volatility: number) => {
    if (volatility < 15) return { level: 'Low', color: 'text-green-400' }
    if (volatility < 25) return { level: 'Medium', color: 'text-yellow-400' }
    return { level: 'High', color: 'text-red-400' }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-vaulto-secondary border border-vaulto-primary/20 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-vaulto-light/20">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-vaulto-primary/20 rounded-lg">
              <BarChart3 className="w-6 h-6 text-vaulto-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-vaulto-light">{index.name}</h2>
              <p className="text-vaulto-light/70">{index.symbol}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-vaulto-dark/50 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-vaulto-light" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Price Chart */}
          {index.priceHistory && index.priceHistory.length > 0 && (
            <div className="mb-6">
              <PriceChart 
                data={index.priceHistory} 
                symbol={index.symbol}
                height={400}
                className="w-full"
              />
            </div>
          )}
          
          {/* Performance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-vaulto-dark/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-vaulto-light/70 text-sm">Current Value</span>
                <TrendingUp className="w-4 h-4 text-vaulto-primary" />
              </div>
              <div className="text-2xl font-bold text-vaulto-light">
                {formatCurrency(index.currentValue)}
              </div>
              <div className="flex items-center space-x-1 mt-1">
                <span className="text-sm text-vaulto-light/70">24h:</span>
                <div className={`flex items-center space-x-1 ${
                  index.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {index.change24h >= 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span className="text-sm font-medium">
                    {formatPercentage(index.change24h)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-vaulto-dark/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-vaulto-light/70 text-sm">Total Value Locked</span>
                <Target className="w-4 h-4 text-vaulto-primary" />
              </div>
              <div className="text-2xl font-bold text-vaulto-light">
                {formatCurrency(index.totalValueLocked)}
              </div>
              <div className="text-sm text-vaulto-light/70 mt-1">
                {index.assetCount} assets
              </div>
            </div>

            <div className="bg-vaulto-dark/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-vaulto-light/70 text-sm">24h Volume</span>
                <BarChart3 className="w-4 h-4 text-vaulto-primary" />
              </div>
              <div className="text-2xl font-bold text-vaulto-light">
                {formatCurrency(index.volume24h)}
              </div>
              <div className="text-sm text-vaulto-light/70 mt-1">
                Active trading
              </div>
            </div>
          </div>

          {/* Performance History */}
          <div className="bg-vaulto-dark/50 rounded-lg p-4">
            <h3 className="text-lg font-bold text-vaulto-light mb-4">Performance History</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {index.performanceHistory.map((period, idx) => {
                const risk = getRiskLevel(period.volatility)
                return (
                  <div key={idx} className="text-center">
                    <div className="text-sm text-vaulto-light/70 mb-1">{period.period}</div>
                    <div className={`text-lg font-bold ${
                      period.return >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {formatPercentage(period.return)}
                    </div>
                    <div className="text-xs text-vaulto-light/50">
                      Vol: <span className={risk.color}>{risk.level}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Asset Composition */}
          <div className="bg-vaulto-dark/50 rounded-lg p-4">
            <h3 className="text-lg font-bold text-vaulto-light mb-4">Asset Composition</h3>
            <div className="space-y-3">
              {index.assets.map((asset, idx) => (
                <div key={asset.id} className="flex items-center justify-between p-3 bg-vaulto-dark/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-vaulto-primary/20 flex items-center justify-center text-sm font-bold text-vaulto-primary">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="text-vaulto-light font-medium">{asset.asset.name}</div>
                      <div className="text-vaulto-light/70 text-sm">{asset.asset.symbol}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-vaulto-light font-medium">{asset.weight}%</div>
                    <div className="text-vaulto-light/70 text-sm">
                      {formatCurrency(asset.asset.currentPrice)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rebalancing Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-vaulto-dark/50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Clock className="w-5 h-5 text-vaulto-primary" />
                <h3 className="text-lg font-bold text-vaulto-light">Rebalancing</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-vaulto-light/70">Frequency:</span>
                  <span className="text-vaulto-light capitalize">{index.rebalancingFrequency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-vaulto-light/70">Last Rebalanced:</span>
                  <span className="text-vaulto-light">
                    {index.lastRebalanced.toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-vaulto-light/70">Next Rebalancing:</span>
                  <span className="text-vaulto-light">
                    {index.nextRebalancing.toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-vaulto-dark/50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Target className="w-5 h-5 text-vaulto-primary" />
                <h3 className="text-lg font-bold text-vaulto-light">Fees</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-vaulto-light/70">Management Fee:</span>
                  <span className="text-vaulto-light">{index.fees.managementFee}% annually</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-vaulto-light/70">Performance Fee:</span>
                  <span className="text-vaulto-light">{index.fees.performanceFee}% of gains</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-vaulto-dark/50 rounded-lg p-4">
            <h3 className="text-lg font-bold text-vaulto-light mb-3">Index Tags</h3>
            <div className="flex flex-wrap gap-2">
              {index.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-vaulto-primary/20 text-vaulto-primary text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
