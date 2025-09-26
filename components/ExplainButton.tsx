'use client'

import { HelpCircle } from 'lucide-react'

interface ExplainButtonProps {
  context: string
  question?: string
  onClick: (context: string, question?: string) => void
  className?: string
}

export default function ExplainButton({ context, question, onClick, className = '' }: ExplainButtonProps) {
  return (
    <button
      onClick={() => onClick(context, question)}
      className={`inline-flex items-center space-x-1 px-3 py-1.5 bg-vaulto-primary/20 border border-vaulto-primary/30 rounded-lg text-vaulto-primary hover:bg-vaulto-primary/30 transition-colors text-sm font-medium ${className}`}
      aria-label={`Get AI explanation for ${context}`}
    >
      <HelpCircle className="w-4 h-4" />
      <span>Explain</span>
    </button>
  )
}
