'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import WalletButton from './WalletButton'
import { WalletState } from '@/types'
import { generateMockAddress } from '@/lib/utils'

export default function Navigation() {
  const pathname = usePathname()
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    balance: 0
  })

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

  const navItems = [
    { href: '/', label: 'Mint' },
    { href: '/swap', label: 'Invest' },
    { href: '/vaults', label: 'Vaults' },
    { href: '/predictions', label: 'Predictions' },
    { href: '/ai', label: 'Learn' }
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Left side: Logo and Navigation */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Vaulto"
                width={100}
                height={32}
                className="h-8 w-auto"
                priority
              />
            </Link>
            
            {/* Navigation Items */}
            <div className="flex items-center space-x-1">
              {navItems.map((item) => {
                // Robust pathname matching logic
                let isActive = false
                
                if (item.href === '/') {
                  // For root path, only match exact path
                  isActive = pathname === '/'
                } else {
                  // For other paths, match exact or if path starts with the href
                  isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                }
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-white bg-slate-800'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Right side: Wallet Button */}
          <div className="flex items-center">
            <WalletButton
              walletState={walletState}
              onConnect={handleConnectWallet}
              onDisconnect={handleDisconnectWallet}
            />
          </div>
        </div>
      </div>
    </nav>
  )
}
