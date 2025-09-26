import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(amount)
}

export function formatPercentage(value: number): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`
}

export function formatLargeNumber(value: number): string {
  if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(2)}B`
  } else if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(2)}M`
  } else if (value >= 1e3) {
    return `$${(value / 1e3).toFixed(2)}K`
  } else {
    return `$${value.toFixed(2)}`
  }
}

export function generateMockTxHash(): string {
  return '0x' + Math.random().toString(16).substr(2, 64)
}

export function generateMockAddress(): string {
  return '0x' + Math.random().toString(16).substr(2, 40)
}

export function getReserveStatusColor(status: string): string {
  switch (status) {
    case 'healthy':
      return 'text-green-400'
    case 'warning':
      return 'text-yellow-400'
    case 'critical':
      return 'text-red-400'
    default:
      return 'text-gray-400'
  }
}

export function getReserveStatusIcon(status: string): string {
  switch (status) {
    case 'healthy':
      return '✅'
    case 'warning':
      return '⚠️'
    case 'critical':
      return '🚨'
    default:
      return '❓'
  }
}
