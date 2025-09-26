// Logo mapping for companies and assets
// This file maps company names to their logo paths or fallback icons

export interface LogoInfo {
  type: 'image' | 'icon' | 'emoji'
  src?: string
  icon?: string
  emoji?: string
  alt: string
}

export const companyLogos: Record<string, LogoInfo> = {
  // Stock companies
  'Tesla Inc.': {
    type: 'image',
    src: '/1200px-Tesla_logo.png',
    alt: 'Tesla Logo'
  },
  'Apple Inc.': {
    type: 'image',
    src: '/apple-logo.png',
    alt: 'Apple Logo'
  },
  
  // Private companies
  'OpenAI': {
    type: 'image',
    src: '/chat-gpt-logo-vector-black-3ded.png',
    alt: 'OpenAI Logo'
  },
  'Stripe': {
    type: 'image',
    src: '/stripe-logo-png_seeklogo-290635.png',
    alt: 'Stripe Logo'
  },
  
  // AI Startups
  'Anthropic': {
    type: 'image',
    src: '/anthropic-logo-png_seeklogo-489572.png',
    alt: 'Anthropic Logo'
  },
  'Midjourney': {
    type: 'image',
    src: '/logos/midjourney.svg',
    alt: 'Midjourney Logo'
  },
  'Runway': {
    type: 'image',
    src: '/logos/runway.svg',
    alt: 'Runway Logo'
  },
  'Character.AI': {
    type: 'image',
    src: '/logos/character-ai.svg',
    alt: 'Character.AI Logo'
  },
  'Perplexity AI': {
    type: 'image',
    src: '/logos/perplexity-ai.svg',
    alt: 'Perplexity AI Logo'
  },
  'Hugging Face': {
    type: 'image',
    src: '/logos/hugging-face.svg',
    alt: 'Hugging Face Logo'
  },
  
  // Commodities
  'Gold Token': {
    type: 'image',
    src: '/logos/gold.svg',
    alt: 'Gold Token Logo'
  },
  'Crude Oil Token': {
    type: 'image',
    src: '/british-petroleum-logo-png_seeklogo-471800.png',
    alt: 'Crude Oil Token Logo'
  }
}

export const getCompanyLogo = (companyName: string): LogoInfo => {
  return companyLogos[companyName] || {
    type: 'icon',
    icon: '📊',
    alt: `${companyName} Logo`
  }
}

export const getTypeIcon = (type: string): LogoInfo => {
  switch (type) {
    case 'stock':
      return {
        type: 'icon',
        icon: '📈',
        alt: 'Stock Icon'
      }
    case 'commodity':
      return {
        type: 'icon',
        icon: '🥇',
        alt: 'Commodity Icon'
      }
    case 'private-company':
      return {
        type: 'icon',
        icon: '🏢',
        alt: 'Private Company Icon'
      }
    case 'startup':
      return {
        type: 'icon',
        icon: '🚀',
        alt: 'Startup Icon'
      }
    default:
      return {
        type: 'icon',
        icon: '📊',
        alt: 'Asset Icon'
      }
  }
}
