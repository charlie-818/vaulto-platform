#!/bin/bash

echo "🚀 Setting up Vaulto Platform..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if installation was successful
if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
    echo ""
    echo "🎉 Setup complete! You can now run:"
    echo "   npm run dev"
    echo ""
    echo "Then open http://localhost:3000 in your browser"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi
