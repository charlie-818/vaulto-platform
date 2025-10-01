'use client'

import { useState } from 'react'
import Image from 'next/image'
import { TrendingUp, Shield, Zap, Copy, ExternalLink, Info, AlertTriangle, CheckCircle, Clock, Fuel } from 'lucide-react'
import { Stablecoin } from '@/types'
import { formatCurrency, getReserveStatusColor, getReserveStatusIcon } from '@/lib/utils'
import { getStablecoinLogo } from '@/lib/stablecoinLogos'
import ExplainButton from './ExplainButton'

interface StablecoinCardProps {
  stablecoin: Stablecoin
  onMint: (amount: number) => void
  onBurn: (amount: number) => void
  onExplain: (context: string, question?: string) => void
  isWalletConnected: boolean
}

export default function StablecoinCard({ 
  stablecoin, 
  onMint, 
  onBurn, 
  onExplain, 
  isWalletConnected 
}: StablecoinCardProps) {
  const [mintAmount, setMintAmount] = useState('')
  const [burnAmount, setBurnAmount] = useState('')
  const [activeTab, setActiveTab] = useState<'mint' | 'burn'>('mint')
  const [showTransactionPreview, setShowTransactionPreview] = useState(false)

  // Mock risk metrics - in a real app, these would come from the blockchain
  const getRiskMetrics = () => {
    switch (stablecoin.type) {
      case 'fiat-backed':
        return {
          collateralRatio: 1.05,
          liquidationThreshold: 1.02,
          healthFactor: 2.1,
          riskLevel: 'low'
        }
      case 'yield-bearing':
        return {
          collateralRatio: 1.15,
          liquidationThreshold: 1.10,
          healthFactor: 1.8,
          riskLevel: 'medium'
        }
      case 'crypto-native':
        return {
          collateralRatio: 1.25,
          liquidationThreshold: 1.20,
          healthFactor: 1.5,
          riskLevel: 'high'
        }
    }
  }

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'text-green-400'
      case 'medium': return 'text-yellow-400'
      case 'high': return 'text-red-400'
      default: return 'text-vaulto-light/70'
    }
  }

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return <CheckCircle className="w-4 h-4" />
      case 'medium': return <AlertTriangle className="w-4 h-4" />
      case 'high': return <AlertTriangle className="w-4 h-4" />
      default: return <Info className="w-4 h-4" />
    }
  }

  const handleMint = () => {
    const amount = parseFloat(mintAmount)
    if (amount > 0) {
      onMint(amount)
      setMintAmount('')
    }
  }

  const handleBurn = () => {
    const amount = parseFloat(burnAmount)
    if (amount > 0) {
      onBurn(amount)
      setBurnAmount('')
    }
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(stablecoin.contractAddress)
  }

  const getTypeIcon = () => {
    switch (stablecoin.type) {
      case 'fiat-backed':
        return <Shield className="w-5 h-5" />
      case 'yield-bearing':
        return <TrendingUp className="w-5 h-5" />
      case 'crypto-native':
        return <Zap className="w-5 h-5" />
    }
  }

  const getTypeColor = () => {
    return 'text-vaulto-primary'
  }

  return (
    <div className="bg-vaulto-secondary border border-vaulto-light/20 rounded-xl p-6 hover:border-vaulto-light/40 transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-vaulto-light">{stablecoin.name}</h3>
          <p className="text-vaulto-light/70 text-sm">{stablecoin.symbol}</p>
        </div>
        <ExplainButton
          context={`${stablecoin.symbol} stablecoin`}
          question={`What is ${stablecoin.symbol} and how does it work?`}
          onClick={onExplain}
        />
      </div>

      {/* Description */}
      <p className="text-vaulto-light/70 mb-4">{stablecoin.description}</p>

      {/* Type and Yield */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className={`text-sm font-medium ${getTypeColor()}`}>
            {stablecoin.type.replace('-', ' ').toUpperCase()}
          </span>
        </div>
        {stablecoin.targetYield && (
          <div className="flex items-center space-x-1 text-vaulto-primary">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">{stablecoin.targetYield}% APY</span>
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
              {stablecoin.contractAddress.slice(0, 6)}...{stablecoin.contractAddress.slice(-4)}
            </span>
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Action Tabs */}
      <div className="flex space-x-1 mb-4 bg-vaulto-dark/30 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('mint')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'mint'
              ? 'bg-vaulto-primary text-vaulto-dark'
              : 'text-vaulto-light/70 hover:text-vaulto-light'
          }`}
        >
          Mint
        </button>
        <button
          onClick={() => setActiveTab('burn')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'burn'
              ? 'bg-vaulto-primary text-vaulto-dark'
              : 'text-vaulto-light/70 hover:text-vaulto-light'
          }`}
        >
          Burn
        </button>
      </div>

      {/* Action Form */}
      {activeTab === 'mint' ? (
        <div className="space-y-4">
          {/* Safety Warning */}
          <div className="bg-yellow-500/5 border border-yellow-500/10 rounded-lg p-2">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div className="text-xs">
                <div className="text-yellow-400 font-medium mb-1">Risk Warning</div>
                <div className="text-yellow-300/70">
                  Minting {stablecoin.symbol} involves smart contract risks.
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-vaulto-light mb-2">
              Amount to Mint
            </label>
            <input
              type="number"
              value={mintAmount}
              onChange={(e) => setMintAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-vaulto-dark border border-vaulto-light/20 rounded-lg px-4 py-3 text-vaulto-light placeholder-vaulto-light/50 focus:outline-none focus:border-vaulto-primary"
              disabled={!isWalletConnected}
            />
          </div>

          {/* Transaction Preview */}
          {mintAmount && parseFloat(mintAmount) > 0 && (
            <div className="bg-vaulto-dark/30 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-vaulto-light">Transaction Preview</span>
                <button
                  onClick={() => setShowTransactionPreview(!showTransactionPreview)}
                  className="text-vaulto-primary hover:text-vaulto-primary/80 text-sm"
                >
                  {showTransactionPreview ? 'Hide Details' : 'Show Details'}
                </button>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-vaulto-light/70">You will mint:</span>
                  <span className="text-vaulto-light font-medium">{mintAmount} {stablecoin.symbol}</span>
                </div>
                
                {showTransactionPreview && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-vaulto-light/70">Estimated Gas:</span>
                      <span className="text-vaulto-light font-medium">~$12.50</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-vaulto-light/70">Network Fee:</span>
                      <span className="text-vaulto-light font-medium">0.1%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-vaulto-light/70">Collateral Required:</span>
                      <span className="text-vaulto-light font-medium">
                        {(parseFloat(mintAmount) * getRiskMetrics().collateralRatio).toFixed(2)} USD
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          <button
            onClick={handleMint}
            disabled={!mintAmount || !isWalletConnected}
            className="w-full bg-vaulto-primary text-vaulto-dark font-semibold py-4 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity text-lg"
          >
            {isWalletConnected ? (
              <div className="flex items-center justify-center space-x-2">
                <span>Mint {stablecoin.symbol}</span>
                <Fuel className="w-5 h-5" />
              </div>
            ) : (
              'Connect Wallet to Mint'
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Burn Warning */}
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <div className="text-red-400 font-medium mb-1">Irreversible Action</div>
                <div className="text-red-300/80">
                  Burning {stablecoin.symbol} tokens is permanent and cannot be undone. You will receive collateral back minus any fees.
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-vaulto-light mb-2">
              Amount to Burn
            </label>
            <input
              type="number"
              value={burnAmount}
              onChange={(e) => setBurnAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-vaulto-dark border border-vaulto-light/20 rounded-lg px-4 py-3 text-vaulto-light placeholder-vaulto-light/50 focus:outline-none focus:border-vaulto-primary"
              disabled={!isWalletConnected}
            />
          </div>

          {/* Burn Preview */}
          {burnAmount && parseFloat(burnAmount) > 0 && (
            <div className="bg-vaulto-dark/30 rounded-lg p-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-vaulto-light/70">You will burn:</span>
                  <span className="text-vaulto-light font-medium">{burnAmount} {stablecoin.symbol}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-vaulto-light/70">You will receive:</span>
                  <span className="text-vaulto-light font-medium">
                    {(parseFloat(burnAmount) * 0.99).toFixed(2)} USD (minus 1% fee)
                  </span>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleBurn}
            disabled={!burnAmount || !isWalletConnected}
            className="w-full bg-red-500 text-vaulto-light font-semibold py-4 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity text-lg"
          >
            {isWalletConnected ? (
              <div className="flex items-center justify-center space-x-2">
                <span>Burn {stablecoin.symbol}</span>
                <AlertTriangle className="w-5 h-5" />
              </div>
            ) : (
              'Connect Wallet to Burn'
            )}
          </button>
        </div>
      )}
    </div>
  )
}
