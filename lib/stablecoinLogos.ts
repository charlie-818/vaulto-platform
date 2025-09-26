// Stablecoin logo mapping for the mint page
// Maps stablecoin types to their corresponding image files

export interface StablecoinLogoInfo {
  src: string
  alt: string
}

export const stablecoinLogos: Record<string, StablecoinLogoInfo> = {
  'vltUSD': {
    src: '/regular.avif',
    alt: 'Vaulto USD - Regular Stablecoin'
  },
  'vltUSDy': {
    src: '/yield.avif',
    alt: 'Vaulto USD Yield - Yield-bearing Stablecoin'
  },
  'vltUSDe': {
    src: '/ethereum.avif',
    alt: 'Vaulto USD Enhanced - Crypto-native Stablecoin'
  }
}

export const getStablecoinLogo = (symbol: string): StablecoinLogoInfo => {
  return stablecoinLogos[symbol] || {
    src: '/regular.avif',
    alt: `${symbol} Stablecoin`
  }
}
