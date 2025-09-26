'use client'

import { Clock, CheckCircle, XCircle, ExternalLink, Copy } from 'lucide-react'
import { Transaction } from '@/types'
import { formatCurrency } from '@/lib/utils'

interface TransactionHistoryProps {
  transactions: Transaction[]
}

export default function TransactionHistory({ transactions }: TransactionHistoryProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-400" />
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-400" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-400'
      case 'pending':
        return 'text-yellow-400'
      case 'failed':
        return 'text-red-400'
      default:
        return 'text-gray-400'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'mint':
        return 'text-vaulto-primary'
      case 'burn':
        return 'text-red-400'
      case 'swap':
        return 'text-vaulto-primary'
      default:
        return 'text-vaulto-light/70'
    }
  }

  const copyTxHash = (txHash: string) => {
    navigator.clipboard.writeText(txHash)
  }

  return (
    <div className="bg-vaulto-secondary border border-vaulto-primary/20 rounded-xl p-6">
      <h3 className="text-xl font-bold text-vaulto-light mb-4">Transaction History</h3>
      
      {transactions.length === 0 ? (
        <div className="text-center py-8">
          <Clock className="w-12 h-12 text-vaulto-light/70 mx-auto mb-4" />
          <p className="text-vaulto-light/70">No transactions yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="bg-vaulto-dark/30 rounded-lg p-4 hover:bg-vaulto-dark/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(tx.status)}
                  <div>
                    <span className={`text-sm font-medium ${getTypeColor(tx.type)}`}>
                      {tx.type.toUpperCase()}
                    </span>
                    <span className="text-vaulto-light/70 text-sm ml-2">
                      {tx.asset}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-vaulto-light font-medium">
                    {formatCurrency(tx.amount)}
                  </div>
                  <div className="text-vaulto-light/70 text-sm">
                    {tx.timestamp.toLocaleDateString()} {tx.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
              
              {tx.txHash && (
                <div className="flex items-center justify-between pt-2 border-t border-vaulto-light/20">
                  <span className="text-vaulto-light/70 text-sm">Transaction Hash</span>
                  <button
                    onClick={() => copyTxHash(tx.txHash!)}
                    className="flex items-center space-x-1 text-vaulto-primary hover:text-vaulto-primary/80 transition-colors"
                  >
                    <span className="text-sm font-mono">
                      {tx.txHash.slice(0, 10)}...{tx.txHash.slice(-8)}
                    </span>
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
