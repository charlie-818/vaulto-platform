'use client'

import { useState } from 'react'
import { TrendingUp, TrendingDown, BarChart3, Target, Zap, Activity, Eye, EyeOff } from 'lucide-react'
import { CustomIndex, TokenizedAsset } from '@/types'
import { formatCurrency, formatPercentage } from '@/lib/utils'

interface TradingDashboardProps {
  indices: CustomIndex[]
  assets: TokenizedAsset[]
  onIndexInvest: (indexId: string, amount: number) => void
  onAssetTrade: (assetId: string, amount: number, type: 'buy' | 'sell') => void
  isWalletConnected: boolean
}

export default function TradingDashboard({ 
  indices, 
  assets, 
  onIndexInvest, 
  onAssetTrade, 
  isWalletConnected 
}: TradingDashboardProps) {
  const [activeTab, setActiveTab] = useState<'indices' | 'assets' | 'portfolio'>('indices')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<CustomIndex | null>(null)

  // Mock portfolio data
  const mockPortfolio = {
    totalValue: 25430.67,
    totalChange24h: 2.34,
    positions: [
      { asset: 'vltTECH', amount: 45.67, value: 11230.45, change24h: 1.23 },
      { asset: 'vltAI', amount: 23.45, value: 3680.12, change24h: 5.67 },
      { asset: 'vltTSLA', amount: 12.34, value: 3032.89, change24h: -0.89 },
      { asset: 'vltGOLD', amount: 8.90, value: 17687.21, change24h: 0.45 }
    ]
  }

  const getTopPerformers = () => {
    const allItems = [
      ...indices.map(index => ({ ...index, type: 'index' as const })),
      ...assets.map(asset => ({ ...asset, type: 'asset' as const }))
    ]
    return allItems
      .sort((a, b) => b.change24h - a.change24h)
      .slice(0, 5)
  }

  const getTopLosers = () => {
    const allItems = [
      ...indices.map(index => ({ ...index, type: 'index' as const })),
      ...assets.map(asset => ({ ...asset, type: 'asset' as const }))
    ]
    return allItems
      .sort((a, b) => a.change24h - b.change24h)
      .slice(0, 5)
  }

  const topPerformers = getTopPerformers()
  const topLosers = getTopLosers()

  return (
    <div className="space-y-6">
      {/* Portfolio Overview */}
      <div className="bg-gradient-to-r from-vaulto-primary/10 to-vaulto-secondary/10 border border-vaulto-primary/30 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-vaulto-primary/20 rounded-lg">
              <BarChart3 className="w-5 h-5 text-vaulto-primary" />
            </div>
            <h2 className="text-xl font-bold text-vaulto-light">Trading Dashboard</h2>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={`p-2 rounded-lg transition-colors ${
                showAdvanced ? 'bg-vaulto-primary/20 text-vaulto-primary' : 'bg-vaulto-dark/50 text-vaulto-light/70 hover:text-vaulto-light'
              }`}
            >
              {showAdvanced ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {isWalletConnected && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-vaulto-dark/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-vaulto-light/70 text-sm">Portfolio Value</span>
                <Target className="w-4 h-4 text-vaulto-primary" />
              </div>
              <div className="text-2xl font-bold text-vaulto-light">
                {formatCurrency(mockPortfolio.totalValue)}
              </div>
              <div className={`flex items-center space-x-1 mt-1 ${
                mockPortfolio.totalChange24h >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {mockPortfolio.totalChange24h >= 0 ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span className="text-sm font-medium">
                  {formatPercentage(mockPortfolio.totalChange24h)}
                </span>
              </div>
            </div>

            <div className="bg-vaulto-dark/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-vaulto-light/70 text-sm">Active Positions</span>
                <Activity className="w-4 h-4 text-vaulto-primary" />
              </div>
              <div className="text-2xl font-bold text-vaulto-light">
                {mockPortfolio.positions.length}
              </div>
              <div className="text-sm text-vaulto-light/70 mt-1">
                Across indices & assets
              </div>
            </div>

            <div className="bg-vaulto-dark/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-vaulto-light/70 text-sm">Available Balance</span>
                <Zap className="w-4 h-4 text-vaulto-primary" />
              </div>
              <div className="text-2xl font-bold text-vaulto-light">
                {formatCurrency(10000)}
              </div>
              <div className="text-sm text-vaulto-light/70 mt-1">
                Ready to invest
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Market Movers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-vaulto-secondary border border-vaulto-primary/20 rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <h3 className="text-lg font-bold text-vaulto-light">Top Performers</h3>
          </div>
          <div className="space-y-3">
            {topPerformers.map((item, idx) => (
              <div key={`${item.type}-${item.id}`} className="flex items-center justify-between p-3 bg-vaulto-dark/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-green-400/20 flex items-center justify-center text-xs font-bold text-green-400">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="text-vaulto-light font-medium">{item.name}</div>
                    <div className="text-vaulto-light/70 text-sm">{item.symbol}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-medium">
                    {formatPercentage(item.change24h)}
                  </div>
                  <div className="text-vaulto-light/70 text-sm">
                    {formatCurrency('currentValue' in item ? item.currentValue : item.currentPrice)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-vaulto-secondary border border-vaulto-primary/20 rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingDown className="w-5 h-5 text-red-400" />
            <h3 className="text-lg font-bold text-vaulto-light">Top Losers</h3>
          </div>
          <div className="space-y-3">
            {topLosers.map((item, idx) => (
              <div key={`${item.type}-${item.id}`} className="flex items-center justify-between p-3 bg-vaulto-dark/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-red-400/20 flex items-center justify-center text-xs font-bold text-red-400">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="text-vaulto-light font-medium">{item.name}</div>
                    <div className="text-vaulto-light/70 text-sm">{item.symbol}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-red-400 font-medium">
                    {formatPercentage(item.change24h)}
                  </div>
                  <div className="text-vaulto-light/70 text-sm">
                    {formatCurrency('currentValue' in item ? item.currentValue : item.currentPrice)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Advanced Features */}
      {showAdvanced && (
        <div className="bg-vaulto-secondary border border-vaulto-primary/20 rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Zap className="w-5 h-5 text-vaulto-primary" />
            <h3 className="text-lg font-bold text-vaulto-light">Advanced Trading Features</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-vaulto-dark/50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="w-4 h-4 text-vaulto-primary" />
                <span className="text-vaulto-light font-medium">Dollar-Cost Averaging</span>
              </div>
              <p className="text-vaulto-light/70 text-sm mb-3">
                Automatically invest fixed amounts at regular intervals
              </p>
              <button className="w-full bg-vaulto-primary/20 text-vaulto-primary py-2 rounded-lg text-sm font-medium hover:bg-vaulto-primary/30 transition-colors">
                Set Up DCA
              </button>
            </div>

            <div className="bg-vaulto-dark/50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <BarChart3 className="w-4 h-4 text-vaulto-primary" />
                <span className="text-vaulto-light font-medium">Portfolio Rebalancing</span>
              </div>
              <p className="text-vaulto-light/70 text-sm mb-3">
                Automatically maintain target allocation across assets
              </p>
              <button className="w-full bg-vaulto-primary/20 text-vaulto-primary py-2 rounded-lg text-sm font-medium hover:bg-vaulto-primary/30 transition-colors">
                Configure Rebalancing
              </button>
            </div>

            <div className="bg-vaulto-dark/50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="w-4 h-4 text-vaulto-primary" />
                <span className="text-vaulto-light font-medium">Stop-Loss Orders</span>
              </div>
              <p className="text-vaulto-light/70 text-sm mb-3">
                Automatically sell when prices drop below threshold
              </p>
              <button className="w-full bg-vaulto-primary/20 text-vaulto-primary py-2 rounded-lg text-sm font-medium hover:bg-vaulto-primary/30 transition-colors">
                Set Stop-Loss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
