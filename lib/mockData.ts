import { Stablecoin, TokenizedAsset, Transaction, Vault, PredictionMarket, MarketInsight } from '@/types'

export const stablecoins: Stablecoin[] = [
  {
    id: 'vltusd',
    name: 'USD',
    symbol: 'vltUSD',
    description: 'Fiat-backed stablecoin pegged to USD with full transparency',
    type: 'fiat-backed',
    contractAddress: '0x1234567890123456789012345678901234567890',
    reserveStatus: 'healthy',
    reserveAmount: 125000000,
    color: 'primary'
  },
  {
    id: 'vltusdy',
    name: 'Yield',
    symbol: 'vltUSDy',
    description: 'Yield-bearing stablecoin with automated yield generation',
    type: 'yield-bearing',
    targetYield: 8.5,
    contractAddress: '0x2345678901234567890123456789012345678901',
    reserveStatus: 'healthy',
    reserveAmount: 87500000,
    color: 'primary'
  },
  {
    id: 'vltusde',
    name: 'Ethereum',
    symbol: 'vltUSDe',
    description: 'Crypto-native stablecoin with algorithmic stability',
    type: 'crypto-native',
    contractAddress: '0x3456789012345678901234567890123456789012',
    reserveStatus: 'warning',
    reserveAmount: 45000000,
    color: 'primary'
  }
]

export const tokenizedAssets: TokenizedAsset[] = [
  // Tokenized Stocks
  {
    id: 'tsla',
    name: 'Tesla Inc.',
    symbol: 'tTSLA',
    type: 'stock',
    description: 'Tokenized Tesla stock with real-time price tracking',
    contractAddress: '0x4567890123456789012345678901234567890123',
    currentPrice: 245.67,
    change24h: 2.34,
    volume24h: 125000000,
    marketCap: 780000000000,
    category: 'Technology'
  },
  {
    id: 'aapl',
    name: 'Apple Inc.',
    symbol: 'tAAPL',
    type: 'stock',
    description: 'Tokenized Apple stock with dividend distribution',
    contractAddress: '0x5678901234567890123456789012345678901234',
    currentPrice: 189.23,
    change24h: -1.12,
    volume24h: 89000000,
    marketCap: 2950000000000,
    category: 'Technology'
  },
  // Tokenized Commodities
  {
    id: 'gold',
    name: 'Gold Token',
    symbol: 'tGOLD',
    type: 'commodity',
    description: 'Tokenized gold with physical backing',
    contractAddress: '0x6789012345678901234567890123456789012345',
    currentPrice: 1987.45,
    change24h: 0.87,
    volume24h: 45000000,
    category: 'Precious Metals'
  },
  {
    id: 'oil',
    name: 'Crude Oil Token',
    symbol: 'tOIL',
    type: 'commodity',
    description: 'Tokenized WTI crude oil futures',
    contractAddress: '0x7890123456789012345678901234567890123456',
    currentPrice: 78.92,
    change24h: -2.15,
    volume24h: 32000000,
    category: 'Energy'
  },
  // Tokenized Private Companies
  {
    id: 'openai',
    name: 'OpenAI',
    symbol: 'tOPENAI',
    type: 'private-company',
    description: 'Pre-IPO tokenized shares of OpenAI',
    contractAddress: '0x8901234567890123456789012345678901234567',
    currentPrice: 125.50,
    change24h: 5.67,
    volume24h: 15000000,
    marketCap: 80000000000,
    category: 'AI/Technology'
  },
  {
    id: 'stripe',
    name: 'Stripe',
    symbol: 'tSTRIPE',
    type: 'private-company',
    description: 'Pre-IPO tokenized shares of Stripe',
    contractAddress: '0x9012345678901234567890123456789012345678',
    currentPrice: 89.75,
    change24h: 1.23,
    volume24h: 12000000,
    marketCap: 95000000000,
    category: 'Fintech'
  },
  // Early Stage Startups
  {
    id: 'anthropic',
    name: 'Anthropic',
    symbol: 'tANTHROPIC',
    type: 'startup',
    description: 'Early-stage AI safety company developing Claude AI',
    contractAddress: '0xa123456789012345678901234567890123456789',
    currentPrice: 12.45,
    change24h: 8.92,
    volume24h: 8500000,
    marketCap: 15000000000,
    category: 'AI/Safety'
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    symbol: 'tMIDJOURNEY',
    type: 'startup',
    description: 'AI-powered image generation platform',
    contractAddress: '0xb234567890123456789012345678901234567890',
    currentPrice: 8.75,
    change24h: 12.34,
    volume24h: 6200000,
    marketCap: 8000000000,
    category: 'AI/Creative'
  },
  {
    id: 'runway',
    name: 'Runway',
    symbol: 'tRUNWAY',
    type: 'startup',
    description: 'AI video editing and generation platform',
    contractAddress: '0xc345678901234567890123456789012345678901',
    currentPrice: 15.20,
    change24h: 6.78,
    volume24h: 4800000,
    marketCap: 12000000000,
    category: 'AI/Video'
  },
  {
    id: 'character-ai',
    name: 'Character.AI',
    symbol: 'tCHARACTER',
    type: 'startup',
    description: 'Conversational AI platform for character interactions',
    contractAddress: '0xd456789012345678901234567890123456789012',
    currentPrice: 6.90,
    change24h: 15.67,
    volume24h: 3200000,
    marketCap: 5000000000,
    category: 'AI/Conversational'
  },
  {
    id: 'perplexity',
    name: 'Perplexity AI',
    symbol: 'tPERPLEXITY',
    type: 'startup',
    description: 'AI-powered search engine and research assistant',
    contractAddress: '0xe567890123456789012345678901234567890123',
    currentPrice: 22.10,
    change24h: 4.56,
    volume24h: 7500000,
    marketCap: 18000000000,
    category: 'AI/Search'
  },
  {
    id: 'hugging-face',
    name: 'Hugging Face',
    symbol: 'tHUGGING',
    type: 'startup',
    description: 'Open-source AI model platform and community',
    contractAddress: '0xf678901234567890123456789012345678901234',
    currentPrice: 18.75,
    change24h: 7.89,
    volume24h: 6800000,
    marketCap: 14000000000,
    category: 'AI/Open Source'
  }
]

export const vaults: Vault[] = [
  {
    id: 'yield-vault',
    name: 'Yield Optimizer',
    symbol: 'YIELD-VAULT',
    description: 'Professional yield farming strategy across multiple DeFi protocols with automated rebalancing',
    strategy: 'Multi-protocol yield farming with risk-adjusted allocation',
    riskLevel: 'medium',
    targetReturn: 12.5,
    currentReturn: 14.2,
    totalValueLocked: 2500000,
    minimumDeposit: 1000,
    managementFee: 0.5,
    performanceFee: 10,
    hyperliquidLink: 'https://hyperliquid.xyz/vaults/yield-optimizer',
    assets: ['ETH', 'USDC', 'DAI', 'WETH'],
    performanceHistory: [
      { period: '1M', return: 1.2 },
      { period: '3M', return: 3.8 },
      { period: '6M', return: 7.1 },
      { period: '1Y', return: 14.2 }
    ],
    color: 'primary',
    status: 'active'
  },
  {
    id: 'ai-growth-vault',
    name: 'AI Growth Fund',
    symbol: 'AI-GROWTH',
    description: 'Concentrated portfolio of AI and technology tokens with active management',
    strategy: 'AI sector focus with momentum and fundamental analysis',
    riskLevel: 'high',
    targetReturn: 25.0,
    currentReturn: 28.7,
    totalValueLocked: 1800000,
    minimumDeposit: 5000,
    managementFee: 1.0,
    performanceFee: 15,
    hyperliquidLink: 'https://hyperliquid.xyz/vaults/ai-growth',
    assets: ['ETH', 'ARB', 'OP', 'MATIC', 'LINK'],
    performanceHistory: [
      { period: '1M', return: 2.8 },
      { period: '3M', return: 8.4 },
      { period: '6M', return: 18.2 },
      { period: '1Y', return: 28.7 }
    ],
    color: 'primary',
    status: 'active'
  },
  {
    id: 'stable-income-vault',
    name: 'Stable Income',
    symbol: 'STABLE-INCOME',
    description: 'Low-risk strategy focused on stablecoin yield and conservative DeFi positions',
    strategy: 'Conservative yield generation with capital preservation focus',
    riskLevel: 'low',
    targetReturn: 8.0,
    currentReturn: 8.3,
    totalValueLocked: 4200000,
    minimumDeposit: 500,
    managementFee: 0.3,
    performanceFee: 5,
    hyperliquidLink: 'https://hyperliquid.xyz/vaults/stable-income',
    assets: ['USDC', 'USDT', 'DAI', 'FRAX'],
    performanceHistory: [
      { period: '1M', return: 0.7 },
      { period: '3M', return: 2.1 },
      { period: '6M', return: 4.2 },
      { period: '1Y', return: 8.3 }
    ],
    color: 'primary',
    status: 'active'
  },
  {
    id: 'defi-arbitrage-vault',
    name: 'DeFi Arbitrage',
    symbol: 'DEFI-ARB',
    description: 'Automated arbitrage opportunities across DEXs and lending protocols',
    strategy: 'Cross-protocol arbitrage with MEV protection',
    riskLevel: 'medium',
    targetReturn: 15.0,
    currentReturn: 16.8,
    totalValueLocked: 1200000,
    minimumDeposit: 2000,
    managementFee: 0.8,
    performanceFee: 12,
    hyperliquidLink: 'https://hyperliquid.xyz/vaults/defi-arbitrage',
    assets: ['ETH', 'WETH', 'USDC', 'WBTC'],
    performanceHistory: [
      { period: '1M', return: 1.4 },
      { period: '3M', return: 4.2 },
      { period: '6M', return: 8.9 },
      { period: '1Y', return: 16.8 }
    ],
    color: 'primary',
    status: 'active'
  },
  {
    id: 'ethereum-staking-vault',
    name: 'Ethereum Staking Plus',
    symbol: 'ETH-STAKING+',
    description: 'Enhanced Ethereum staking with liquid staking derivatives and yield optimization',
    strategy: 'Liquid staking with additional yield strategies',
    riskLevel: 'low',
    targetReturn: 6.5,
    currentReturn: 7.1,
    totalValueLocked: 3500000,
    minimumDeposit: 1000,
    managementFee: 0.4,
    performanceFee: 8,
    hyperliquidLink: 'https://hyperliquid.xyz/vaults/eth-staking-plus',
    assets: ['ETH', 'stETH', 'rETH', 'cbETH'],
    performanceHistory: [
      { period: '1M', return: 0.6 },
      { period: '3M', return: 1.8 },
      { period: '6M', return: 3.5 },
      { period: '1Y', return: 7.1 }
    ],
    color: 'primary',
    status: 'active'
  },
  {
    id: 'momentum-trading-vault',
    name: 'Momentum Trader',
    symbol: 'MOMENTUM',
    description: 'Algorithmic momentum trading across major cryptocurrencies with risk management',
    strategy: 'Systematic momentum following with dynamic position sizing',
    riskLevel: 'high',
    targetReturn: 20.0,
    currentReturn: 22.4,
    totalValueLocked: 950000,
    minimumDeposit: 3000,
    managementFee: 1.2,
    performanceFee: 18,
    hyperliquidLink: 'https://hyperliquid.xyz/vaults/momentum-trader',
    assets: ['BTC', 'ETH', 'SOL', 'AVAX', 'DOT'],
    performanceHistory: [
      { period: '1M', return: 1.9 },
      { period: '3M', return: 5.6 },
      { period: '6M', return: 12.3 },
      { period: '1Y', return: 22.4 }
    ],
    color: 'primary',
    status: 'active'
  }
]

export const predictionMarkets: PredictionMarket[] = [
  {
    id: 'btc-100k-2024',
    title: 'Bitcoin reaches $100,000 by end of 2024',
    description: 'Will Bitcoin price reach or exceed $100,000 USD by December 31, 2024?',
    category: 'price',
    endDate: new Date('2024-12-31T23:59:59Z'),
    status: 'active',
    totalVolume: 2450000,
    liquidity: 1800000,
    outcomes: [
      {
        id: 'yes',
        name: 'Yes',
        probability: 0.68,
        odds: 1.47,
        volume: 1650000,
        lastPrice: 0.68
      },
      {
        id: 'no',
        name: 'No',
        probability: 0.32,
        odds: 3.13,
        volume: 800000,
        lastPrice: 0.32
      }
    ],
    marketMaker: 'Polymarket',
    resolutionSource: 'CoinGecko',
    tags: ['Bitcoin', 'Price', '2024']
  },
  {
    id: 'eth-etf-approval',
    title: 'Ethereum ETF approved by SEC in 2024',
    description: 'Will the SEC approve a spot Ethereum ETF before December 31, 2024?',
    category: 'regulation',
    endDate: new Date('2024-12-31T23:59:59Z'),
    status: 'active',
    totalVolume: 3200000,
    liquidity: 2500000,
    outcomes: [
      {
        id: 'yes',
        name: 'Yes',
        probability: 0.45,
        odds: 2.22,
        volume: 1800000,
        lastPrice: 0.45
      },
      {
        id: 'no',
        name: 'No',
        probability: 0.55,
        odds: 1.82,
        volume: 1400000,
        lastPrice: 0.55
      }
    ],
    marketMaker: 'Polymarket',
    resolutionSource: 'SEC.gov',
    tags: ['Ethereum', 'ETF', 'SEC', 'Regulation']
  },
  {
    id: 'solana-200-2024',
    title: 'Solana reaches $200 by end of 2024',
    description: 'Will Solana (SOL) price reach or exceed $200 USD by December 31, 2024?',
    category: 'price',
    endDate: new Date('2024-12-31T23:59:59Z'),
    status: 'active',
    totalVolume: 1200000,
    liquidity: 900000,
    outcomes: [
      {
        id: 'yes',
        name: 'Yes',
        probability: 0.72,
        odds: 1.39,
        volume: 850000,
        lastPrice: 0.72
      },
      {
        id: 'no',
        name: 'No',
        probability: 0.28,
        odds: 3.57,
        volume: 350000,
        lastPrice: 0.28
      }
    ],
    marketMaker: 'Polymarket',
    resolutionSource: 'CoinGecko',
    tags: ['Solana', 'Price', '2024']
  },
  {
    id: 'crypto-market-cap-5t',
    title: 'Total crypto market cap exceeds $5T in 2024',
    description: 'Will the total cryptocurrency market capitalization exceed $5 trillion USD at any point in 2024?',
    category: 'macro',
    endDate: new Date('2024-12-31T23:59:59Z'),
    status: 'active',
    totalVolume: 1800000,
    liquidity: 1400000,
    outcomes: [
      {
        id: 'yes',
        name: 'Yes',
        probability: 0.58,
        odds: 1.72,
        volume: 1100000,
        lastPrice: 0.58
      },
      {
        id: 'no',
        name: 'No',
        probability: 0.42,
        odds: 2.38,
        volume: 700000,
        lastPrice: 0.42
      }
    ],
    marketMaker: 'Polymarket',
    resolutionSource: 'CoinMarketCap',
    tags: ['Market Cap', 'Macro', '2024']
  },
  {
    id: 'ai-token-boom',
    title: 'AI token sector grows 300% in 2024',
    description: 'Will the combined market cap of AI-related tokens (FET, AGIX, OCEAN, etc.) grow by 300% or more in 2024?',
    category: 'adoption',
    endDate: new Date('2024-12-31T23:59:59Z'),
    status: 'active',
    totalVolume: 950000,
    liquidity: 750000,
    outcomes: [
      {
        id: 'yes',
        name: 'Yes',
        probability: 0.63,
        odds: 1.59,
        volume: 600000,
        lastPrice: 0.63
      },
      {
        id: 'no',
        name: 'No',
        probability: 0.37,
        odds: 2.70,
        volume: 350000,
        lastPrice: 0.37
      }
    ],
    marketMaker: 'Polymarket',
    resolutionSource: 'CoinGecko',
    tags: ['AI', 'Tokens', 'Adoption', '2024']
  },
  {
    id: 'layer2-tvl-100b',
    title: 'Layer 2 TVL exceeds $100B in 2024',
    description: 'Will the total value locked (TVL) across all Layer 2 solutions exceed $100 billion USD in 2024?',
    category: 'technology',
    endDate: new Date('2024-12-31T23:59:59Z'),
    status: 'active',
    totalVolume: 750000,
    liquidity: 600000,
    outcomes: [
      {
        id: 'yes',
        name: 'Yes',
        probability: 0.41,
        odds: 2.44,
        volume: 450000,
        lastPrice: 0.41
      },
      {
        id: 'no',
        name: 'No',
        probability: 0.59,
        odds: 1.69,
        volume: 300000,
        lastPrice: 0.59
      }
    ],
    marketMaker: 'Polymarket',
    resolutionSource: 'L2Beat',
    tags: ['Layer 2', 'TVL', 'Technology', '2024']
  },
  {
    id: 'defi-tvl-200b',
    title: 'DeFi TVL reaches $200B in 2024',
    description: 'Will the total value locked in DeFi protocols reach or exceed $200 billion USD in 2024?',
    category: 'adoption',
    endDate: new Date('2024-12-31T23:59:59Z'),
    status: 'active',
    totalVolume: 1100000,
    liquidity: 850000,
    outcomes: [
      {
        id: 'yes',
        name: 'Yes',
        probability: 0.52,
        odds: 1.92,
        volume: 650000,
        lastPrice: 0.52
      },
      {
        id: 'no',
        name: 'No',
        probability: 0.48,
        odds: 2.08,
        volume: 450000,
        lastPrice: 0.48
      }
    ],
    marketMaker: 'Polymarket',
    resolutionSource: 'DeFiLlama',
    tags: ['DeFi', 'TVL', 'Adoption', '2024']
  },
  {
    id: 'crypto-regulation-clarity',
    title: 'Major crypto regulation clarity in US by 2024',
    description: 'Will the US Congress pass comprehensive cryptocurrency regulation providing clear guidelines by end of 2024?',
    category: 'regulation',
    endDate: new Date('2024-12-31T23:59:59Z'),
    status: 'active',
    totalVolume: 1600000,
    liquidity: 1200000,
    outcomes: [
      {
        id: 'yes',
        name: 'Yes',
        probability: 0.35,
        odds: 2.86,
        volume: 800000,
        lastPrice: 0.35
      },
      {
        id: 'no',
        name: 'No',
        probability: 0.65,
        odds: 1.54,
        volume: 800000,
        lastPrice: 0.65
      }
    ],
    marketMaker: 'Polymarket',
    resolutionSource: 'Congress.gov',
    tags: ['Regulation', 'US', 'Congress', '2024']
  }
]

export const marketInsights: MarketInsight[] = [
  {
    id: 'insight-1',
    marketId: 'btc-100k-2024',
    type: 'technical',
    title: 'Bitcoin Technical Analysis: Bullish Breakout Pattern',
    description: 'BTC has broken above key resistance at $75,000 with strong volume. RSI showing bullish divergence and MACD crossing above signal line.',
    impact: 'positive',
    confidence: 0.78,
    source: 'TradingView',
    timestamp: new Date(Date.now() - 1800000)
  },
  {
    id: 'insight-2',
    marketId: 'eth-etf-approval',
    type: 'news',
    title: 'SEC Commissioner Signals Openness to Ethereum ETF',
    description: 'Recent comments from SEC Commissioner suggest growing institutional acceptance of Ethereum as a commodity, potentially easing ETF approval process.',
    impact: 'positive',
    confidence: 0.65,
    source: 'CoinDesk',
    timestamp: new Date(Date.now() - 3600000)
  },
  {
    id: 'insight-3',
    marketId: 'solana-200-2024',
    type: 'fundamental',
    title: 'Solana Ecosystem Growth Accelerating',
    description: 'Monthly active addresses on Solana increased 40% in Q4 2024, with significant growth in DeFi and NFT activity. Network upgrades improving scalability.',
    impact: 'positive',
    confidence: 0.82,
    source: 'Solana Foundation',
    timestamp: new Date(Date.now() - 5400000)
  },
  {
    id: 'insight-4',
    marketId: 'crypto-market-cap-5t',
    type: 'fundamental',
    title: 'Institutional Adoption Driving Market Growth',
    description: 'BlackRock and other major institutions continue to increase crypto allocations. Corporate treasury adoption accelerating with favorable regulatory environment.',
    impact: 'positive',
    confidence: 0.71,
    source: 'Bloomberg',
    timestamp: new Date(Date.now() - 7200000)
  },
  {
    id: 'insight-5',
    marketId: 'ai-token-boom',
    type: 'sentiment',
    title: 'AI Token Sentiment Reaching New Highs',
    description: 'Social media sentiment for AI tokens has increased 150% in the past month. Growing interest in AI infrastructure and applications driving demand.',
    impact: 'positive',
    confidence: 0.69,
    source: 'LunarCrush',
    timestamp: new Date(Date.now() - 9000000)
  },
  {
    id: 'insight-6',
    marketId: 'layer2-tvl-100b',
    type: 'technical',
    title: 'Layer 2 Scaling Solutions Gaining Traction',
    description: 'Arbitrum and Optimism showing strong growth metrics. New Layer 2 solutions launching with improved user experience and lower costs.',
    impact: 'positive',
    confidence: 0.74,
    source: 'L2Beat',
    timestamp: new Date(Date.now() - 10800000)
  }
]

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'mint',
    asset: 'vltUSD',
    amount: 1000,
    timestamp: new Date(Date.now() - 3600000),
    status: 'completed',
    txHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890'
  },
  {
    id: '2',
    type: 'swap',
    asset: 'tTSLA',
    amount: 4.07,
    timestamp: new Date(Date.now() - 7200000),
    status: 'completed',
    txHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
  },
  {
    id: '3',
    type: 'mint',
    asset: 'vltUSDy',
    amount: 500,
    timestamp: new Date(Date.now() - 10800000),
    status: 'completed',
    txHash: '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321'
  }
]
