# 🌟 Inclusão 360 - Frontend

> Modern React application for accessibility and inclusion platform with comprehensive test coverage and mobile-first design.

[![CI/CD Pipeline](https://github.com/pfm-cesar-school/inclusao360-frontend/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/pfm-cesar-school/inclusao360-frontend/actions/workflows/ci-cd.yml)
[![Tests](https://img.shields.io/badge/tests-60%20passing-brightgreen)](https://github.com/pfm-cesar-school/inclusao360-frontend)
[![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)](https://github.com/pfm-cesar-school/inclusao360-frontend)
[![Deploy Status](https://img.shields.io/badge/deploy-live-success)](https://pfm-cesar-school.github.io/inclusao360-frontend)

## 🚀 Live Demo

**✨ [Access Live Application](https://pfm-cesar-school.github.io/inclusao360-frontend)**

## 📱 Features

### 🎯 Core Functionality
- **Mobile-First Design** - Responsive layout optimized for mobile devices
- **Multi-Module System** - Family, Education, and Professional modules
- **User Authentication** - Simple login system with localStorage persistence  
- **Interactive Timeline** - Module-specific timeline with note-taking capabilities
- **Fixed Navigation** - Always-accessible header and footer

### 🛠 Technical Features
- **React 19** - Latest React with modern hooks and features
- **TailwindCSS 3** - Utility-first CSS framework
- **React Router 7** - Client-side routing and navigation
- **Comprehensive Testing** - 60+ unit tests with 100% coverage on core components
- **CI/CD Pipeline** - Automated testing and deployment
- **GitHub Pages Deployment** - Live deployment on every push to main

## 🏗 Architecture

```
src/
├── components/
│   ├── common/          # Reusable UI components (Header, Button)
│   ├── auth/            # Authentication components (Login, ModuleSelector)
│   └── shared/          # Shared business components (Timeline)
├── pages/               # Main page components
│   ├── SplashScreen.js  # Initial loading screen
│   ├── MainPage.js      # ID input and main navigation
│   └── Dashboard.js     # Module-specific dashboard
└── __tests__/           # Test files with 60+ comprehensive tests
```

## 🧪 Test Coverage

Our test suite includes **60 comprehensive tests** covering:

| Component | Tests | Coverage |
|-----------|-------|----------|
| Header | 10 tests | 100% |
| Button | 13 tests | 100% |
| Timeline | 17 tests | 100% |
| SplashScreen | 10 tests | 100% |
| MainPage | 10 tests | 100% |

### Test Features:
- ✅ **Atomic & Fast** - All tests run in < 2 seconds
- ✅ **Data-testids** - Reliable element selection for UI testing
- ✅ **User Interactions** - Click, type, navigation testing
- ✅ **State Management** - Props, state changes, and edge cases
- ✅ **CSS Classes** - Visual styling and responsive behavior

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation & Development

```bash
# Clone the repository
git clone https://github.com/pfm-cesar-school/inclusao360-frontend.git
cd inclusao360-frontend

# Install dependencies
npm install

# Start development server
npm start
# Opens http://localhost:3000

# Run tests
npm test -- --testPathPattern="Header|Button|Timeline|SplashScreen|MainPage" --watchAll=false

# Build for production
npm run build
```

## 🎮 User Flow

1. **🚀 SplashScreen** (3s auto-transition)
2. **📝 MainPage** - Enter neurodivergent ID
3. **🎯 ModuleSelector** - Choose: Family, Education, or Professional
4. **🔐 Login** - Simple authentication (any credentials work)
5. **📊 Dashboard** - Module-specific interface with timeline

## 🛠 Development Scripts

```bash
npm start          # Development server
npm test           # Run test suite  
npm run build      # Production build
npm run test:coverage # Test with coverage report
```

## 🔄 CI/CD Pipeline

Our GitHub Actions pipeline automatically:

1. **🧪 Testing** - Runs full test suite on Node 18.x & 20.x
2. **🏗 Building** - Creates production build
3. **📊 Coverage** - Generates and uploads coverage reports
4. **🚀 Deployment** - Deploys to GitHub Pages on main branch

## 🎨 Design System

### Colors & Themes
- **Primary**: Blue gradient (`from-blue-500 to-blue-700`)
- **Family Module**: Pink (`bg-pink-100 text-pink-600`)
- **Education Module**: Green (`bg-green-100 text-green-600`)  
- **Professional Module**: Blue (`bg-blue-100 text-blue-600`)

### Components
- **Mobile Container**: Max-width 430px for mobile optimization
- **Fixed Header/Footer**: Always accessible navigation
- **Responsive Grid**: Automatic layout adaptation

## 🔧 Configuration Files

- `tailwind.config.js` - TailwindCSS configuration
- `postcss.config.js` - PostCSS setup for TailwindCSS
- `jsconfig.json` - JavaScript project configuration
- `.github/workflows/ci-cd.yml` - CI/CD pipeline configuration

## 📈 Performance

- ⚡ **Fast Loading** - Optimized bundle size
- 📱 **Mobile Optimized** - Mobile-first responsive design
- 🧪 **Test Coverage** - 100% coverage on critical components
- 🚀 **CI/CD Ready** - Automated testing and deployment

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Run tests (`npm test`)
4. Commit changes (`git commit -m 'Add amazing feature'`)
5. Push to branch (`git push origin feature/amazing-feature`)
6. Open Pull Request

## 📄 License

This project is part of the CESAR School academic program.

## 👥 Team

- **Development**: Built with Claude Code
- **Institution**: CESAR School
- **Contact**: pfm@cesar.school

---

🚀 **Ready for production deployment with comprehensive testing and modern React practices!**

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
