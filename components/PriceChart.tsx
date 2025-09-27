'use client'

import { useEffect, useRef, useState } from 'react'
import { createChart, IChartApi, ISeriesApi, ColorType } from 'lightweight-charts'

interface PriceData {
  time: number
  open: number
  high: number
  low: number
  close: number
  volume?: number
}

interface PriceChartProps {
  data: PriceData[]
  symbol: string
  height?: number
  className?: string
}

export default function PriceChart({ data, symbol, height = 300, className = '' }: PriceChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showFallback, setShowFallback] = useState(false)
  const [chartReady, setChartReady] = useState(false)

  // Timeout mechanism to show fallback if chart doesn't load
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoading) {
        // Chart loading timeout, showing fallback
        setShowFallback(true)
        setIsLoading(false)
      }
    }, 1500) // 1.5 second timeout

    return () => clearTimeout(timeout)
  }, [isLoading])

  // Initialize chart once
  useEffect(() => {
    if (!chartContainerRef.current) {
      return
    }

    // Check if lightweight-charts is available
    if (typeof createChart === 'undefined') {
      setShowFallback(true)
      setIsLoading(false)
      return
    }

    // Wait for container to be visible and properly sized
    const initChart = () => {
      const container = chartContainerRef.current
      if (!container) return

      try {
        const containerWidth = Math.max(container.clientWidth || 400, 300) // Ensure minimum width

        // Create chart with proper dimensions

        // Create chart
        const chart = createChart(container, {
          layout: {
            background: { type: ColorType.Solid, color: 'transparent' },
            textColor: '#E5E7EB',
          },
          grid: {
            vertLines: { color: '#374151' },
            horzLines: { color: '#374151' },
          },
          crosshair: {
            mode: 1,
          },
          rightPriceScale: {
            borderColor: '#374151',
            textColor: '#E5E7EB',
          },
          timeScale: {
            borderColor: '#374151',
            textColor: '#E5E7EB',
            timeVisible: true,
            secondsVisible: false,
          },
          width: containerWidth,
          height: height - 60,
        })

        // Create candlestick series
        const candlestickSeries = chart.addCandlestickSeries({
          upColor: '#10B981',
          downColor: '#EF4444',
          borderDownColor: '#EF4444',
          borderUpColor: '#10B981',
          wickDownColor: '#EF4444',
          wickUpColor: '#10B981',
        })

        // Store references
        chartRef.current = chart
        seriesRef.current = candlestickSeries

        // Chart created successfully

        // Handle resize
        const handleResize = () => {
          if (container && chartRef.current) {
            const newWidth = Math.max(container.clientWidth || 400, 300)
            chartRef.current.applyOptions({
              width: newWidth,
            })
          }
        }

        window.addEventListener('resize', handleResize)
        
        // Set loading to false after chart is created
        setIsLoading(false)
        setError(null)
        setShowFallback(false)
        setChartReady(true)
        
        // Chart initialization complete

        return () => {
          window.removeEventListener('resize', handleResize)
          if (chartRef.current) {
            chartRef.current.remove()
            chartRef.current = null
            seriesRef.current = null
          }
        }
      } catch (err) {
        console.error('Error creating chart:', err)
        setError('Failed to create chart')
        setIsLoading(false)
        setShowFallback(true)
      }
    }

    // Add a small delay to ensure container is properly sized
    const timeout = setTimeout(initChart, 100)
    
    return () => {
      clearTimeout(timeout)
      if (chartRef.current) {
        chartRef.current.remove()
        chartRef.current = null
        seriesRef.current = null
      }
    }
  }, [height])

  // Update data when it changes
  useEffect(() => {
    if (seriesRef.current && data && data.length > 0) {
      try {
        // Ensure data is properly formatted
        const formattedData = data.map(item => ({
          time: item.time,
          open: Number(item.open),
          high: Number(item.high),
          low: Number(item.low),
          close: Number(item.close)
        }))
        
        seriesRef.current.setData(formattedData)
        
        // Force chart to fit content
        if (chartRef.current) {
          chartRef.current.timeScale().fitContent()
        }
      } catch (error) {
        console.error('Error setting chart data:', error)
        setError('Failed to load chart data')
      }
    }
  }, [data, symbol, chartReady])

  // Fallback chart component with simple price visualization
  const FallbackChart = () => {
    if (!data || data.length === 0) {
      return (
        <div className={`bg-vaulto-dark/30 rounded-lg p-4 ${className}`}>
          <div className="flex items-center justify-center" style={{ height: height - 60, minHeight: '200px' }}>
            <div className="text-vaulto-light/70">No data available</div>
          </div>
        </div>
      )
    }
    
    const prices = data.map(d => d.close)
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
    const priceRange = maxPrice - minPrice
    
    // Chart data processed successfully
    
    return (
      <div className={`bg-vaulto-dark/30 rounded-lg p-4 ${className}`}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-vaulto-light">{symbol} Price Chart</h3>
          <div className="flex space-x-2 text-sm text-vaulto-light/70">
            <span>1D</span>
            <span>1W</span>
            <span>1M</span>
            <span>3M</span>
          </div>
        </div>
        <div className="relative bg-vaulto-dark/20 rounded border border-vaulto-primary/20" style={{ height: height - 60, minHeight: '200px' }}>
          {/* Grid background */}
          <div className="absolute inset-0 opacity-20">
            <div className="h-full w-full" style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }} />
          </div>
          
          {/* Line Chart SVG */}
          <div className="absolute inset-0 p-4">
            <svg 
              width="100%" 
              height="100%" 
              viewBox="0 0 100 100" 
              preserveAspectRatio="none"
              className="overflow-visible"
            >
              {/* Area fill under the line */}
              <defs>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(16, 185, 129, 0.3)" />
                  <stop offset="100%" stopColor="rgba(16, 185, 129, 0.05)" />
                </linearGradient>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="50%" stopColor="#059669" />
                  <stop offset="100%" stopColor="#047857" />
                </linearGradient>
              </defs>
              
              {/* Area path with smooth curves */}
              <path
                d={(() => {
                  const points = data.slice(-20).map((item, index) => {
                    const x = (index / 19) * 100
                    const y = priceRange > 0 ? 100 - (((item.close - minPrice) / priceRange) * 80 + 10) : 50
                    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
                  }).join(' ')
                  return `${points} L 100 100 L 0 100 Z`
                })()}
                fill="url(#areaGradient)"
                className="transition-all duration-300"
              />
              
              {/* Main line with smooth curves */}
              <path
                d={(() => {
                  const points = data.slice(-20).map((item, index) => {
                    const x = (index / 19) * 100
                    const y = priceRange > 0 ? 100 - (((item.close - minPrice) / priceRange) * 80 + 10) : 50
                    
                    if (index === 0) return `M ${x} ${y}`
                    if (index === data.slice(-20).length - 1) return `L ${x} ${y}`
                    
                    // Create smooth curves between points
                    const prevItem = data.slice(-20)[index - 1]
                    const prevY = priceRange > 0 ? 100 - (((prevItem.close - minPrice) / priceRange) * 80 + 10) : 50
                    const prevX = ((index - 1) / 19) * 100
                    
                    const cp1x = prevX + (x - prevX) * 0.5
                    const cp1y = prevY
                    const cp2x = prevX + (x - prevX) * 0.5
                    const cp2y = y
                    
                    return `C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${x} ${y}`
                  }).join(' ')
                  return points
                })()}
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="1.2"
                className="transition-all duration-300"
                style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }}
              />
              
            </svg>
          </div>
          
          {/* Price labels */}
          <div className="absolute top-2 left-2 text-xs text-vaulto-light/70 bg-vaulto-dark/50 px-2 py-1 rounded">
            ${maxPrice.toFixed(2)}
          </div>
          <div className="absolute bottom-2 left-2 text-xs text-vaulto-light/70 bg-vaulto-dark/50 px-2 py-1 rounded">
            ${minPrice.toFixed(2)}
          </div>
          
          {/* Trend indicator */}
          <div className="absolute top-2 right-2 flex items-center space-x-2">
            <div className={`text-xs px-2 py-1 rounded flex items-center space-x-1 ${
              data[data.length - 1].close >= data[data.length - 2].close 
                ? 'text-green-400 bg-green-500/20' 
                : 'text-red-400 bg-red-500/20'
            }`}>
              <span>{data[data.length - 1].close >= data[data.length - 2].close ? '↗' : '↘'}</span>
              <span>
                {((data[data.length - 1].close - data[data.length - 2].close) / data[data.length - 2].close * 100).toFixed(2)}%
              </span>
            </div>
            <div className="text-xs text-vaulto-primary bg-vaulto-dark/50 px-2 py-1 rounded">
              Line Chart
            </div>
          </div>
          
          {/* Current price display */}
          <div className="absolute bottom-2 right-2 text-sm font-semibold text-vaulto-light bg-vaulto-dark/50 px-2 py-1 rounded">
            ${data[data.length - 1].close.toFixed(2)}
          </div>
        </div>
      </div>
    )
  }

  // Show fallback chart if there's an error or if the main chart fails to load
  if (error || showFallback) {
    return <FallbackChart />
  }

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center bg-vaulto-dark/30 rounded-lg ${className}`} style={{ height }}>
        <div className="text-vaulto-light/70">Loading chart...</div>
      </div>
    )
  }

  return (
    <div className={`bg-vaulto-dark/30 rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-vaulto-light">{symbol} Price Chart</h3>
        <div className="flex space-x-2 text-sm text-vaulto-light/70">
          <span>1D</span>
          <span>1W</span>
          <span>1M</span>
          <span>3M</span>
        </div>
      </div>
      <div 
        ref={chartContainerRef} 
        style={{ 
          height: height - 60,
          width: '100%',
          minHeight: '200px'
        }} 
      />
    </div>
  )
}
