import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

export const dynamic = 'force-dynamic'

const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
}) : null

export async function POST(request: NextRequest) {
  try {
    console.log('API route called')
    const { message, context } = await request.json()
    console.log('Received message:', message)

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    if (!openai) {
      console.log('OpenAI not initialized - API key missing')
      return NextResponse.json({ 
        error: 'AI service is not available. Please check configuration.' 
      }, { status: 503 })
    }

    // Create a system prompt that provides context about Vaulto platform
    const systemPrompt = `You are Vaulto AI, an expert investment assistant for the Vaulto platform. Vaulto is a DeFi platform that offers:

## Stablecoins
- vltUSD: Fiat-backed stablecoin
- vltUSDy: Yield-bearing stablecoin (target 8.5% APY)
- vltUSDe: Crypto-native stablecoin

## Tokenized Assets
Real-world assets like stocks, commodities, and private companies represented as blockchain tokens

## Investment Strategies
Automated yield farming, liquidity provision, and DeFi strategies

## Key Features
Minting, swapping, vault management, and transparent on-chain operations

Instructions:
- Always format your responses using Markdown for better readability
- Use bold for important terms and concepts
- Use bullet points and numbered lists for structured information
- Use code blocks for technical terms or addresses
- Provide helpful, accurate, and educational responses about investments, DeFi, stablecoins, and tokenized assets
- Be conversational but professional
- If asked about specific Vaulto features, explain them clearly with proper formatting
- If asked about general investment advice, provide balanced guidance while noting that this is not financial advice
- Structure your responses with clear headings and organized information`

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      max_tokens: 500,
      temperature: 0.7,
      stream: true,
    })

    // Create a readable stream
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          let fullContent = ''
          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content || ''
            if (content) {
              fullContent += content
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: fullContent })}\n\n`))
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
        } catch (error) {
          console.error('Streaming error:', error)
          controller.error(error)
        }
      }
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })

  } catch (error) {
    console.error('OpenAI API error:', error)
    console.error('Error details:', error instanceof Error ? error.message : 'Unknown error')
    return NextResponse.json(
      { error: 'Failed to get AI response', details: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 500 }
    )
  }
}
