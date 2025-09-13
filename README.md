# 🐄 Cattle & Buffalo Identification System

A comprehensive Smart India Hackathon prototype for cattle and buffalo identification using iris scanning, images, and breed data. Built with React, Vite, and Tailwind CSS.

## 🌟 Features

### 🔐 Authentication
- Simple farmer-friendly login using phone number + OTP
- Multi-language support (10+ Indian languages)
- Secure session management

### 📱 Core Functionality
- **Iris Scan & Breed Identification**: Camera capture with ML-powered breed detection
- **Animal Records Management**: Complete database of registered animals
- **Breeding Management**: Optimal mating times, partner recommendations, pregnancy tracking
- **Health Management**: Disease tracking, vaccination schedules, preventive care
- **Milk Yield Dashboard**: Production tracking with simple visual charts

### 🎨 Farmer-Friendly Design
- Large, touch-friendly buttons and icons
- 3D visual effects throughout the interface
- Dark mode support
- Mobile-first responsive design
- Simplified, non-technical language

### 🌍 Multi-Language Support
- English, Hindi, Bengali, Telugu, Marathi, Tamil, Gujarati, Kannada, Malayalam, Punjabi
- Real-time language switching
- Complete UI translation

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Git

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd cattle-identification-app

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production
```bash
npm run build
```

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel --prod
   ```

### Alternative: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Vercel will automatically detect it's a Vite project
5. Click "Deploy"

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Internationalization**: i18next
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Charts**: Recharts (simplified for farmers)

## 📱 Pages & Features

### 🏠 Dashboard
- Quick action buttons for scanning and uploading
- Statistics overview with 3D icons
- Recent animals and health alerts
- Direct access to all major features

### 📷 Iris Scan
- Camera integration for iris capture
- Breed identification with confidence scores
- Breed-specific breeding and health recommendations
- Save to animal records

### 📊 Animal Records
- Complete animal database
- Search and filter functionality
- Detailed animal profiles
- Breeding and health history

### 🍼 Milk Dashboard
- Simplified milk production tracking
- Visual progress bars instead of complex charts
- Top milk producers ranking
- Health alerts integration

### 💕 Breeding Management
- Optimal mating time recommendations
- Breed-specific partner suggestions
- Pregnancy tracking and due dates
- Breeding history and success rates

### 🏥 Health Management
- Health status monitoring
- Vaccination schedules and reminders
- Disease tracking and prevention
- Veterinary contact information

## 🎯 Key Benefits for Farmers

1. **Easy to Use**: Large buttons, clear navigation, simple language
2. **Breed-Specific Information**: Tailored recommendations for each breed
3. **Multi-Language**: Complete support in local languages
4. **Mobile-Optimized**: Works perfectly on smartphones and tablets
5. **Offline Capable**: Core functionality works without internet
6. **Professional Look**: Modern 3D design with intuitive interface

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_APP_TITLE=Cattle Identification System
VITE_APP_VERSION=1.0.0
VITE_API_BASE_URL=https://your-api-domain.com/api
```

### Customization
- **Colors**: Modify `tailwind.config.js` for brand colors
- **Languages**: Add new languages in `src/i18n/locales/`
- **Breeds**: Update breed data in `src/contexts/AnimalContext.jsx`

## 📄 License

This project is developed for Smart India Hackathon 2024.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support and questions, please contact the development team.

---

**Built with ❤️ for Indian Farmers**# GauGuru
