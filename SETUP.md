# Counseling Clinic Dashboard - Setup Guide

## Prerequisites Installation

### Option 1: Install Node.js directly
1. Visit [nodejs.org](https://nodejs.org/)
2. Download and install the LTS version for macOS
3. Verify installation: `node --version` and `npm --version`

### Option 2: Install using Homebrew (if available)
```bash
# Install Homebrew first (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node
```

### Option 3: Use Node Version Manager (nvm)
```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart terminal or run: source ~/.bashrc
# Install Node.js
nvm install node
nvm use node
```

## Project Setup

1. **Navigate to project directory**
   ```bash
   cd counseling-clinic-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to `http://localhost:3000`

## Alternative: Static HTML Demo

If you want to see a quick demo without Node.js, you can:

1. Open `demo.html` in your browser (I'll create this)
2. This provides a static preview of the dashboard design

## Deployment Options

### GitHub Pages (Recommended)
1. Push code to GitHub repository
2. Enable GitHub Pages in repository settings
3. The GitHub Actions workflow will automatically deploy

### Netlify
1. Connect GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel` in project directory

## Troubleshooting

### Common Issues
- **Port already in use**: Change port in `vite.config.ts`
- **Permission errors**: Use `sudo` for global installations
- **Build errors**: Clear node_modules and reinstall: `rm -rf node_modules && npm install`

### Getting Help
- Check the README.md for detailed documentation
- Create an issue in the GitHub repository
- Contact: your-email@example.com
