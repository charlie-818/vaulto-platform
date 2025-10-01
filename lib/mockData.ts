import { Stablecoin, TokenizedAsset, Transaction, Vault, PredictionMarket, MarketInsight, CustomIndex, PriceData } from '@/types'

// Generate realistic price history data
const generatePriceHistory = (currentPrice: number, days: number = 30): PriceData[] => {
  const data: PriceData[] = []
  let price = currentPrice * 0.8 // Start 20% lower
  
  for (let i = days; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const time = Math.floor(date.getTime() / 1000)
    
    // Generate realistic OHLC data with some volatility
    const volatility = 0.02 + Math.random() * 0.03 // 2-5% daily volatility
    const change = (Math.random() - 0.5) * volatility
    const open = price
    const close = price * (1 + change)
    const high = Math.max(open, close) * (1 + Math.random() * 0.01)
    const low = Math.min(open, close) * (1 - Math.random() * 0.01)
    const volume = Math.floor(Math.random() * 1000000) + 500000
    
    data.push({
      time,
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
      volume
    })
    
    price = close
  }
  
  return data
}

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
    symbol: 'vltTSLA',
    type: 'stock',
    description: 'Tokenized Tesla stock with real-time price tracking',
    contractAddress: '0x4567890123456789012345678901234567890123',
    currentPrice: 245.67,
    change24h: 2.34,
    volume24h: 125000000,
    marketCap: 780000000000,
    category: 'Technology',
    priceHistory: generatePriceHistory(245.67)
  },
  {
    id: 'aapl',
    name: 'Apple Inc.',
    symbol: 'vltAAPL',
    type: 'stock',
    description: 'Tokenized Apple stock with dividend distribution',
    contractAddress: '0x5678901234567890123456789012345678901234',
    currentPrice: 189.23,
    change24h: -1.12,
    volume24h: 89000000,
    marketCap: 2950000000000,
    category: 'Technology',
    priceHistory: generatePriceHistory(189.23)
  },
  // Tokenized Commodities
  {
    id: 'gold',
    name: 'Gold Token',
    symbol: 'vltGOLD',
    type: 'commodity',
    description: 'Tokenized gold with physical backing',
    contractAddress: '0x6789012345678901234567890123456789012345',
    currentPrice: 1987.45,
    change24h: 0.87,
    volume24h: 45000000,
    category: 'Precious Metals',
    priceHistory: generatePriceHistory(1987.45)
  },
  {
    id: 'oil',
    name: 'Crude Oil Token',
    symbol: 'vltOIL',
    type: 'commodity',
    description: 'Tokenized WTI crude oil futures',
    contractAddress: '0x7890123456789012345678901234567890123456',
    currentPrice: 78.92,
    change24h: -2.15,
    volume24h: 32000000,
    category: 'Energy',
    priceHistory: generatePriceHistory(78.92)
  },
  // Tokenized Private Companies
  {
    id: 'openai',
    name: 'OpenAI',
    symbol: 'vltOPENAI',
    type: 'private-company',
    description: 'Pre-IPO tokenized shares of OpenAI',
    contractAddress: '0x8901234567890123456789012345678901234567',
    currentPrice: 125.50,
    change24h: 5.67,
    volume24h: 15000000,
    marketCap: 80000000000,
    category: 'AI/Technology',
    priceHistory: generatePriceHistory(125.50)
  },
  {
    id: 'stripe',
    name: 'Stripe',
    symbol: 'vltSTRIPE',
    type: 'private-company',
    description: 'Pre-IPO tokenized shares of Stripe',
    contractAddress: '0x9012345678901234567890123456789012345678',
    currentPrice: 89.75,
    change24h: 1.23,
    volume24h: 12000000,
    marketCap: 95000000000,
    category: 'Fintech',
    priceHistory: generatePriceHistory(89.75)
  },
  // Early Stage Startups
  {
    id: 'anthropic',
    name: 'Anthropic',
    symbol: 'vltANTHROPIC',
    type: 'startup',
    description: 'Early-stage AI safety company developing Claude AI',
    contractAddress: '0xa123456789012345678901234567890123456789',
    currentPrice: 12.45,
    change24h: 8.92,
    volume24h: 8500000,
    marketCap: 15000000000,
    category: 'AI/Safety',
    priceHistory: generatePriceHistory(12.45)
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    symbol: 'vltMIDJOURNEY',
    type: 'startup',
    description: 'AI-powered image generation platform',
    contractAddress: '0xb234567890123456789012345678901234567890',
    currentPrice: 8.75,
    change24h: 12.34,
    volume24h: 6200000,
    marketCap: 8000000000,
    category: 'AI/Creative',
    priceHistory: generatePriceHistory(8.75)
  },
  {
    id: 'runway',
    name: 'Runway',
    symbol: 'vltRUNWAY',
    type: 'startup',
    description: 'AI video editing and generation platform',
    contractAddress: '0xc345678901234567890123456789012345678901',
    currentPrice: 15.20,
    change24h: 6.78,
    volume24h: 4800000,
    marketCap: 12000000000,
    category: 'AI/Video',
    priceHistory: generatePriceHistory(15.20)
  },
  {
    id: 'character-ai',
    name: 'Character.AI',
    symbol: 'vltCHARACTER',
    type: 'startup',
    description: 'Conversational AI platform for character interactions',
    contractAddress: '0xd456789012345678901234567890123456789012',
    currentPrice: 6.90,
    change24h: 15.67,
    volume24h: 3200000,
    marketCap: 5000000000,
    category: 'AI/Conversational',
    priceHistory: generatePriceHistory(6.90)
  },
  {
    id: 'perplexity',
    name: 'Perplexity AI',
    symbol: 'vltPERPLEXITY',
    type: 'startup',
    description: 'AI-powered search engine and research assistant',
    contractAddress: '0xe567890123456789012345678901234567890123',
    currentPrice: 22.10,
    change24h: 4.56,
    volume24h: 7500000,
    marketCap: 18000000000,
    category: 'AI/Search',
    priceHistory: generatePriceHistory(22.10)
  },
  {
    id: 'hugging-face',
    name: 'Hugging Face',
    symbol: 'vltHUGGING',
    type: 'startup',
    description: 'Open-source AI model platform and community',
    contractAddress: '0xf678901234567890123456789012345678901234',
    currentPrice: 18.75,
    change24h: 7.89,
    volume24h: 6800000,
    marketCap: 14000000000,
    category: 'AI/Open Source',
    priceHistory: generatePriceHistory(18.75)
  }
]

export const vaults: Vault[] = [
  {
    id: 'btc-long-bias',
    name: 'BTC Long Bias',
    symbol: 'BTC-LONG',
    description: 'Leveraged long positions on Bitcoin with dynamic hedging during downtrends',
    strategy: 'Hyperliquid perps: 2-3x BTC longs with stop losses and momentum indicators',
    riskLevel: 'high',
    targetReturn: 35.0,
    currentReturn: 42.3,
    totalValueLocked: 3200000,
    minimumDeposit: 2000,
    managementFee: 1.0,
    performanceFee: 20,
    hyperliquidLink: 'https://hyperliquid.xyz/vaults/btc-long-bias',
    assets: ['BTC', 'WBTC'],
    performanceHistory: [
      { period: '1M', return: 3.8 },
      { period: '3M', return: 12.4 },
      { period: '6M', return: 24.1 },
      { period: '1Y', return: 42.3 }
    ],
    color: 'primary',
    status: 'active'
  },
  {
    id: 'eth-long-short',
    name: 'ETH Long/Short',
    symbol: 'ETH-LS',
    description: 'Market neutral ETH strategy using longs on ETH and shorts on weaker L1s',
    strategy: 'Hyperliquid perps: Long ETH, short competing L1s based on relative strength',
    riskLevel: 'medium',
    targetReturn: 18.0,
    currentReturn: 21.2,
    totalValueLocked: 2800000,
    minimumDeposit: 1500,
    managementFee: 0.8,
    performanceFee: 15,
    hyperliquidLink: 'https://hyperliquid.xyz/vaults/eth-long-short',
    assets: ['ETH', 'ADA', 'DOT', 'AVAX'],
    performanceHistory: [
      { period: '1M', return: 2.1 },
      { period: '3M', return: 6.8 },
      { period: '6M', return: 13.5 },
      { period: '1Y', return: 21.2 }
    ],
    color: 'primary',
    status: 'active'
  },
  {
    id: 'altcoin-momentum',
    name: 'Altcoin Momentum',
    symbol: 'ALT-MOM',
    description: 'Rotates between high momentum altcoins with leveraged long positions',
    strategy: 'Hyperliquid perps: Longs on top 20 altcoins by momentum and volume',
    riskLevel: 'high',
    targetReturn: 45.0,
    currentReturn: 52.7,
    totalValueLocked: 1900000,
    minimumDeposit: 3000,
    managementFee: 1.5,
    performanceFee: 25,
    hyperliquidLink: 'https://hyperliquid.xyz/vaults/altcoin-momentum',
    assets: ['SOL', 'AVAX', 'MATIC', 'ARB', 'OP', 'SUI'],
    performanceHistory: [
      { period: '1M', return: 5.2 },
      { period: '3M', return: 16.8 },
      { period: '6M', return: 32.4 },
      { period: '1Y', return: 52.7 }
    ],
    color: 'primary',
    status: 'active'
  },
  {
    id: 'funding-arb',
    name: 'Funding Rate Arbitrage',
    symbol: 'FUND-ARB',
    description: 'Exploits positive funding rates by holding spot and shorting perps',
    strategy: 'Hyperliquid perps: Delta neutral positions capturing funding payments',
    riskLevel: 'low',
    targetReturn: 12.0,
    currentReturn: 14.8,
    totalValueLocked: 4500000,
    minimumDeposit: 1000,
    managementFee: 0.5,
    performanceFee: 10,
    hyperliquidLink: 'https://hyperliquid.xyz/vaults/funding-arb',
    assets: ['BTC', 'ETH', 'SOL', 'ARB'],
    performanceHistory: [
      { period: '1M', return: 1.3 },
      { period: '3M', return: 3.9 },
      { period: '6M', return: 7.8 },
      { period: '1Y', return: 14.8 }
    ],
    color: 'primary',
    status: 'active'
  },
  {
    id: 'defi-bluechip-long',
    name: 'DeFi Blue Chip Longs',
    symbol: 'DEFI-LONG',
    description: 'Long-only positions on established DeFi protocols with strong fundamentals',
    strategy: 'Hyperliquid perps: 1.5-2x leveraged longs on major DeFi tokens',
    riskLevel: 'medium',
    targetReturn: 28.0,
    currentReturn: 31.5,
    totalValueLocked: 2100000,
    minimumDeposit: 2000,
    managementFee: 0.9,
    performanceFee: 18,
    hyperliquidLink: 'https://hyperliquid.xyz/vaults/defi-bluechip',
    assets: ['UNI', 'AAVE', 'MKR', 'CRV', 'LDO'],
    performanceHistory: [
      { period: '1M', return: 2.9 },
      { period: '3M', return: 9.2 },
      { period: '6M', return: 18.7 },
      { period: '1Y', return: 31.5 }
    ],
    color: 'primary',
    status: 'active'
  },
  {
    id: 'btc-eth-pairs',
    name: 'BTC/ETH Pairs Trading',
    symbol: 'BTC-ETH-PAIR',
    description: 'Market neutral strategy trading the BTC/ETH ratio with mean reversion',
    strategy: 'Hyperliquid perps: Long underperformer, short outperformer based on ratio',
    riskLevel: 'low',
    targetReturn: 15.0,
    currentReturn: 16.9,
    totalValueLocked: 3800000,
    minimumDeposit: 1500,
    managementFee: 0.6,
    performanceFee: 12,
    hyperliquidLink: 'https://hyperliquid.xyz/vaults/btc-eth-pairs',
    assets: ['BTC', 'ETH'],
    performanceHistory: [
      { period: '1M', return: 1.5 },
      { period: '3M', return: 4.8 },
      { period: '6M', return: 9.2 },
      { period: '1Y', return: 16.9 }
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

export const customIndices: CustomIndex[] = [
  {
    id: 'tech-giants-index',
    name: 'Tech Giants Index',
    symbol: 'vltTECH',
    description: 'Diversified exposure to major technology companies including Apple, Tesla, and other blue-chip tech stocks',
    category: 'stocks',
    currentValue: 245.67,
    change24h: 2.34,
    change7d: 5.67,
    change30d: 12.45,
    totalValueLocked: 12500000,
    volume24h: 2500000,
    assetCount: 5,
    assets: [
      {
        id: 'aapl',
        weight: 35,
        asset: tokenizedAssets.find(a => a.id === 'aapl')!
      },
      {
        id: 'tsla',
        weight: 30,
        asset: tokenizedAssets.find(a => a.id === 'tsla')!
      },
      {
        id: 'openai',
        weight: 20,
        asset: tokenizedAssets.find(a => a.id === 'openai')!
      },
      {
        id: 'stripe',
        weight: 10,
        asset: tokenizedAssets.find(a => a.id === 'stripe')!
      },
      {
        id: 'anthropic',
        weight: 5,
        asset: tokenizedAssets.find(a => a.id === 'anthropic')!
      }
    ],
    rebalancingFrequency: 'monthly',
    lastRebalanced: new Date(Date.now() - 86400000 * 15),
    nextRebalancing: new Date(Date.now() + 86400000 * 15),
    performanceHistory: [
      { period: '1M', return: 12.45, volatility: 18.2 },
      { period: '3M', return: 28.67, volatility: 22.1 },
      { period: '6M', return: 45.23, volatility: 19.8 },
      { period: '1Y', return: 78.91, volatility: 24.5 }
    ],
    fees: {
      managementFee: 0.5,
      performanceFee: 10
    },
    contractAddress: '0x1234567890123456789012345678901234567890',
    color: 'primary',
    tags: ['Technology', 'Blue Chip', 'Diversified'],
    priceHistory: generatePriceHistory(245.67)
  },
  {
    id: 'ai-startups-index',
    name: 'AI Startups Index',
    symbol: 'vltAI',
    description: 'High-growth AI startups and emerging technology companies with exponential potential',
    category: 'startups',
    currentValue: 156.78,
    change24h: 8.92,
    change7d: 15.67,
    change30d: 42.18,
    totalValueLocked: 8500000,
    volume24h: 1800000,
    assetCount: 6,
    assets: [
      {
        id: 'anthropic',
        weight: 25,
        asset: tokenizedAssets.find(a => a.id === 'anthropic')!
      },
      {
        id: 'midjourney',
        weight: 20,
        asset: tokenizedAssets.find(a => a.id === 'midjourney')!
      },
      {
        id: 'runway',
        weight: 20,
        asset: tokenizedAssets.find(a => a.id === 'runway')!
      },
      {
        id: 'character-ai',
        weight: 15,
        asset: tokenizedAssets.find(a => a.id === 'character-ai')!
      },
      {
        id: 'perplexity',
        weight: 12,
        asset: tokenizedAssets.find(a => a.id === 'perplexity')!
      },
      {
        id: 'hugging-face',
        weight: 8,
        asset: tokenizedAssets.find(a => a.id === 'hugging-face')!
      }
    ],
    rebalancingFrequency: 'quarterly',
    lastRebalanced: new Date(Date.now() - 86400000 * 45),
    nextRebalancing: new Date(Date.now() + 86400000 * 45),
    performanceHistory: [
      { period: '1M', return: 42.18, volatility: 35.6 },
      { period: '3M', return: 89.45, volatility: 42.1 },
      { period: '6M', return: 156.78, volatility: 38.9 },
      { period: '1Y', return: 278.34, volatility: 45.2 }
    ],
    fees: {
      managementFee: 1.0,
      performanceFee: 15
    },
    contractAddress: '0x2345678901234567890123456789012345678901',
    color: 'primary',
    tags: ['AI', 'Startups', 'High Growth', 'Emerging Tech'],
    priceHistory: generatePriceHistory(156.78)
  },
  {
    id: 'commodities-basket',
    name: 'Commodities Basket',
    symbol: 'vltCOMM',
    description: 'Diversified exposure to precious metals, energy, and agricultural commodities',
    category: 'commodities',
    currentValue: 1234.56,
    change24h: -0.87,
    change7d: 2.34,
    change30d: 5.67,
    totalValueLocked: 3200000,
    volume24h: 850000,
    assetCount: 4,
    assets: [
      {
        id: 'gold',
        weight: 40,
        asset: tokenizedAssets.find(a => a.id === 'gold')!
      },
      {
        id: 'oil',
        weight: 35,
        asset: tokenizedAssets.find(a => a.id === 'oil')!
      },
      {
        id: 'silver',
        weight: 15,
        asset: {
          id: 'silver',
          name: 'Silver Token',
          symbol: 'vltSILVER',
          type: 'commodity',
          description: 'Tokenized silver with physical backing',
          contractAddress: '0x3456789012345678901234567890123456789012',
          currentPrice: 28.45,
          change24h: 1.23,
          volume24h: 18000000,
          category: 'Precious Metals'
        }
      },
      {
        id: 'copper',
        weight: 10,
        asset: {
          id: 'copper',
          name: 'Copper Token',
          symbol: 'vltCOPPER',
          type: 'commodity',
          description: 'Tokenized copper futures with industrial exposure',
          contractAddress: '0x4567890123456789012345678901234567890123',
          currentPrice: 4.12,
          change24h: -0.45,
          volume24h: 12000000,
          category: 'Industrial Metals'
        }
      }
    ],
    rebalancingFrequency: 'weekly',
    lastRebalanced: new Date(Date.now() - 86400000 * 3),
    nextRebalancing: new Date(Date.now() + 86400000 * 4),
    performanceHistory: [
      { period: '1M', return: 5.67, volatility: 12.3 },
      { period: '3M', return: 12.45, volatility: 15.8 },
      { period: '6M', return: 18.92, volatility: 14.2 },
      { period: '1Y', return: 22.34, volatility: 16.7 }
    ],
    fees: {
      managementFee: 0.3,
      performanceFee: 8
    },
    contractAddress: '0x3456789012345678901234567890123456789012',
    color: 'primary',
    tags: ['Commodities', 'Diversified', 'Inflation Hedge'],
    priceHistory: generatePriceHistory(1234.56)
  },
  {
    id: 'mixed-growth-index',
    name: 'Mixed Growth Index',
    symbol: 'vltGROWTH',
    description: 'Balanced portfolio combining tech stocks, AI startups, and commodities for diversified growth',
    category: 'mixed',
    currentValue: 189.23,
    change24h: 3.45,
    change7d: 8.92,
    change30d: 18.67,
    totalValueLocked: 9800000,
    volume24h: 1650000,
    assetCount: 8,
    assets: [
      {
        id: 'aapl',
        weight: 20,
        asset: tokenizedAssets.find(a => a.id === 'aapl')!
      },
      {
        id: 'tsla',
        weight: 15,
        asset: tokenizedAssets.find(a => a.id === 'tsla')!
      },
      {
        id: 'anthropic',
        weight: 15,
        asset: tokenizedAssets.find(a => a.id === 'anthropic')!
      },
      {
        id: 'gold',
        weight: 15,
        asset: tokenizedAssets.find(a => a.id === 'gold')!
      },
      {
        id: 'midjourney',
        weight: 10,
        asset: tokenizedAssets.find(a => a.id === 'midjourney')!
      },
      {
        id: 'runway',
        weight: 10,
        asset: tokenizedAssets.find(a => a.id === 'runway')!
      },
      {
        id: 'oil',
        weight: 10,
        asset: tokenizedAssets.find(a => a.id === 'oil')!
      },
      {
        id: 'openai',
        weight: 5,
        asset: tokenizedAssets.find(a => a.id === 'openai')!
      }
    ],
    rebalancingFrequency: 'monthly',
    lastRebalanced: new Date(Date.now() - 86400000 * 12),
    nextRebalancing: new Date(Date.now() + 86400000 * 18),
    performanceHistory: [
      { period: '1M', return: 18.67, volatility: 22.4 },
      { period: '3M', return: 34.56, volatility: 25.8 },
      { period: '6M', return: 52.89, volatility: 23.1 },
      { period: '1Y', return: 89.12, volatility: 26.7 }
    ],
    fees: {
      managementFee: 0.7,
      performanceFee: 12
    },
    contractAddress: '0x4567890123456789012345678901234567890123',
    color: 'primary',
    tags: ['Diversified', 'Growth', 'Balanced', 'Multi-Asset'],
    priceHistory: generatePriceHistory(189.23)
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
