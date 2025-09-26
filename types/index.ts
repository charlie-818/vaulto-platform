export interface Stablecoin {
  id: string;
  name: string;
  symbol: string;
  description: string;
  type: 'fiat-backed' | 'yield-bearing' | 'crypto-native';
  targetYield?: number;
  contractAddress: string;
  reserveStatus: 'healthy' | 'warning' | 'critical';
  reserveAmount: number;
  color: string;
}

export interface TokenizedAsset {
  id: string;
  name: string;
  symbol: string;
  type: 'stock' | 'commodity' | 'private-company' | 'startup';
  description: string;
  contractAddress: string;
  currentPrice: number;
  change24h: number;
  volume24h?: number;
  marketCap?: number;
  category: string;
}

export interface Transaction {
  id: string;
  type: 'mint' | 'burn' | 'swap';
  asset: string;
  amount: number;
  timestamp: Date;
  status: 'pending' | 'completed' | 'failed';
  txHash?: string;
}

export interface WalletState {
  isConnected: boolean;
  address?: string;
  balance: number;
}

export interface AIResponse {
  question: string;
  answer: string;
  timestamp: Date;
  context?: string;
}

export interface Vault {
  id: string;
  name: string;
  symbol: string;
  description: string;
  strategy: string;
  riskLevel: 'low' | 'medium' | 'high';
  targetReturn: number;
  currentReturn: number;
  totalValueLocked: number;
  minimumDeposit: number;
  managementFee: number;
  performanceFee: number;
  hyperliquidLink: string;
  assets: string[];
  performanceHistory: {
    period: string;
    return: number;
  }[];
  color: string;
  status: 'active' | 'paused' | 'closed';
}

export interface PredictionMarket {
  id: string;
  title: string;
  description: string;
  category: 'price' | 'regulation' | 'adoption' | 'technology' | 'macro';
  endDate: Date;
  status: 'active' | 'resolved' | 'cancelled';
  totalVolume: number;
  liquidity: number;
  outcomes: {
    id: string;
    name: string;
    probability: number;
    odds: number;
    volume: number;
    lastPrice: number;
  }[];
  marketMaker: string;
  resolutionSource?: string;
  tags: string[];
}

export interface MarketInsight {
  id: string;
  marketId: string;
  type: 'sentiment' | 'technical' | 'fundamental' | 'news';
  title: string;
  description: string;
  impact: 'positive' | 'negative' | 'neutral';
  confidence: number;
  source: string;
  timestamp: Date;
}
