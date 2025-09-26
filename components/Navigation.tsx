'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Coins, TrendingUp, Bot, Shield, Target } from 'lucide-react'

export default function Navigation() {
  const pathname = usePathname()

  const navItems = [
    {
      href: '/',
      label: 'Mint Stablecoins',
      icon: Coins,
      description: 'Mint vltUSD, vltUSDy, vltUSDe'
    },
    {
      href: '/swap',
      label: 'Swap & Invest',
      icon: TrendingUp,
      description: 'Tokenized assets'
    },
    {
      href: '/vaults',
      label: 'Professional Vaults',
      icon: Shield,
      description: 'Managed strategies'
    },
    {
      href: '/predictions',
      label: 'Prediction Markets',
      icon: Target,
      description: 'Live odds & betting'
    },
    {
      href: '/ai',
      label: 'AI Assistant',
      icon: Bot,
      description: 'Investment guidance'
    }
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 transition-all duration-200 ${
                    isActive
                      ? 'text-vaulto-primary'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <div>
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs opacity-75">{item.description}</div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
