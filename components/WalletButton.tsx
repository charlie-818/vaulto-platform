'use client'

import { useState } from 'react'
import { Wallet, LogOut, Copy, Check } from 'lucide-react'
import { WalletState } from '@/types'
import { generateMockAddress } from '@/lib/utils'

interface WalletButtonProps {
  walletState: WalletState
  onConnect: () => void
  onDisconnect: () => void
}

export default function WalletButton({ walletState, onConnect, onDisconnect }: WalletButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleConnect = () => {
    // Mock wallet connection
    const mockAddress = generateMockAddress()
    onConnect()
  }

  const handleDisconnect = () => {
    onDisconnect()
  }

  const handleCopyAddress = async () => {
    if (walletState.address) {
      await navigator.clipboard.writeText(walletState.address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (walletState.isConnected) {
    return (
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1.5 px-2 py-1 bg-vaulto-primary/20 border border-vaulto-primary/30 rounded-md">
          <div className="w-1.5 h-1.5 bg-vaulto-primary rounded-full animate-pulse"></div>
          <span className="text-vaulto-primary text-xs font-medium leading-none">Connected</span>
        </div>
        <div className="flex items-center space-x-1.5 px-2 py-1 bg-vaulto-secondary border border-vaulto-light/20 rounded-md">
          <span className="text-vaulto-light/70 text-xs font-mono leading-none">
            {walletState.address?.slice(0, 6)}...{walletState.address?.slice(-4)}
          </span>
          <button
            onClick={handleCopyAddress}
            className="p-0.5 hover:bg-vaulto-light/10 rounded transition-colors"
            aria-label="Copy address"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-vaulto-primary" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-vaulto-light/70" />
            )}
          </button>
        </div>
        <button
          onClick={handleDisconnect}
          className="p-1 hover:bg-vaulto-secondary rounded-md transition-colors"
          aria-label="Disconnect wallet"
        >
          <LogOut className="w-4 h-4 text-vaulto-light/70" />
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={handleConnect}
      className="flex items-center space-x-2 px-3 py-1 bg-vaulto-primary text-vaulto-dark text-sm font-semibold rounded-md hover:opacity-90 transition-opacity shadow-md"
    >
      <Wallet className="w-4 h-4" />
      <span>Connect</span>
    </button>
  )
}
