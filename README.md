# Vaulto - AI-Powered Stablecoin Platform

A modern Web3 platform for minting stablecoins and swapping tokenized assets with AI-powered investment guidance.

## Features

### 🤖 AI Assistant
- Dedicated side window that launches via "Explain" buttons throughout the application
- Provides natural language answers to investment, product, and platform questions
- Minimally intrusive design that doesn't consume main screen real estate
- Context-aware responses based on user interactions

### 💰 Stablecoin Minting (Homepage)
- **vltUSD**: Fiat-backed stablecoin with full transparency
- **vltUSDy**: Yield-bearing stablecoin with 8.5% target APY
- **vltUSDe**: Crypto-native stablecoin with algorithmic stability
- Real-time reserve status and proof-of-collateral display
- Mint and burn functionality with simple input fields
- Contract addresses and transparency features

### 🔄 Swap & Investment Page
- Tokenized stocks (Tesla, Apple)
- Tokenized commodities (Gold, Oil)
- Tokenized private companies (OpenAI, Stripe)
- Easy swap interface with vltUSD
- Asset filtering and search functionality
- Integrated AI guidance for investment decisions

### 🔐 Mock Wallet Integration
- Simulated wallet connection (no real backend)
- Mock transaction generation
- Transaction history tracking
- Address display and copying

### 🎨 Design System
- **Colors**: Deep blue/gray base with neon teal, electric purple, and soft metallics
- **Accessibility**: ADA-compliant with proper focus states and ARIA labels
- **Responsive**: Mobile-first design that works on all screen sizes
- **Modern**: Glass morphism effects, gradients, and smooth animations

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **State Management**: React hooks (useState)

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
vaulto-platform/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage (stablecoin minting)
│   └── swap/              # Swap page
│       └── page.tsx
├── components/            # React components
│   ├── AIAssistant.tsx    # AI chat interface
│   ├── AssetCard.tsx      # Tokenized asset cards
│   ├── ExplainButton.tsx  # AI explanation triggers
│   ├── Navigation.tsx     # Site navigation
│   ├── StablecoinCard.tsx # Stablecoin minting cards
│   ├── TransactionHistory.tsx # Transaction list
│   └── WalletButton.tsx   # Wallet connection
├── lib/                   # Utilities and data
│   ├── mockData.ts        # Sample data
│   └── utils.ts           # Helper functions
├── types/                 # TypeScript definitions
│   └── index.ts
└── ...config files
```

## Key Components

### AIAssistant
- Modal-based chat interface
- Context-aware responses
- Typing indicators and smooth animations
- Keyboard navigation support

### StablecoinCard
- Individual stablecoin information display
- Mint/burn functionality
- Reserve status indicators
- Contract address display

### AssetCard
- Tokenized asset information
- Price tracking and 24h changes
- Swap functionality
- Category filtering

### WalletButton
- Mock wallet connection
- Address display and copying
- Connection status indicators

## Mock Data

The application uses mock data for demonstration purposes:
- **Stablecoins**: vltUSD, vltUSDy, vltUSDe with realistic parameters
- **Tokenized Assets**: Stocks, commodities, and private companies
- **Transactions**: Sample transaction history
- **Wallet**: Mock addresses and balances

## Accessibility Features

- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Management**: Clear focus indicators and logical tab order
- **Color Contrast**: High contrast ratios for text and interactive elements
- **Responsive Design**: Works on all screen sizes and devices

## Future Enhancements

- Real wallet integration (MetaMask, WalletConnect)
- Actual smart contract interactions
- Real-time price feeds
- Advanced AI capabilities
- Portfolio tracking
- Yield farming strategies

## License

This project is for demonstration purposes only. All transactions and wallet integrations are simulated.
