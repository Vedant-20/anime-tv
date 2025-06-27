# AnimeTV - Modern Anime Discovery Platform

A modern, responsive anime discovery platform built with React and Tailwind CSS, featuring a beautiful dark mode interface and comprehensive anime information.

## ✨ Features

### 🎨 Modern UI/UX
- **Dark Mode Design**: Beautiful dark theme with gradient accents
- **Responsive Layout**: Optimized for all device sizes
- **Glass Morphism**: Modern backdrop blur effects
- **Smooth Animations**: Hover effects and transitions
- **Modern Typography**: Inter font family for better readability

### 🔍 Search & Discovery
- **Real-time Search**: Search anime by title with instant results
- **Top Anime Collection**: Curated list of top-rated anime
- **Advanced Filtering**: Sort by various criteria
- **Search History**: Track your search patterns

### 📱 User Experience
- **Loading States**: Skeleton loaders and spinners
- **Error Handling**: Graceful error boundaries and notifications
- **Form Validation**: Input validation with user feedback
- **Accessibility**: Keyboard navigation and screen reader support

### 🎬 Anime Information
- **Detailed Profiles**: Comprehensive anime information
- **Character Database**: Character information and images
- **Trailer Integration**: Embedded video trailers
- **Rating System**: User ratings and reviews
- **Genre Classification**: Detailed genre information

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd anime-tv
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **API**: Jikan API (MyAnimeList)
- **Icons**: Heroicons (SVG)
- **Fonts**: Inter (Google Fonts)

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Main navigation and search
│   ├── Home.jsx            # Search results page
│   ├── Details.jsx         # Anime details page
│   ├── Footer.jsx          # Footer component
│   ├── LoadingSpinner.jsx  # Loading animation
│   ├── SkeletonLoader.jsx  # Skeleton loading states
│   ├── Notification.jsx    # Toast notifications
│   └── ErrorBoundary.jsx   # Error handling
├── App.jsx                 # Main application component
├── main.jsx               # Application entry point
└── index.css              # Global styles and utilities
```

## 🎨 Design System

### Color Palette
- **Primary**: Purple (#8B5CF6) to Pink (#EC4899)
- **Secondary**: Cyan (#06B6D4) to Blue (#3B82F6)
- **Background**: Dark grays (#111827, #1F2937)
- **Text**: White and light grays
- **Accents**: Yellow (#F59E0B), Green (#10B981), Red (#EF4444)

### Typography
- **Font Family**: Inter
- **Weights**: 300, 400, 500, 600, 700, 800, 900
- **Responsive**: Scales from mobile to desktop

### Components
- **Cards**: Glass morphism with hover effects
- **Buttons**: Gradient backgrounds with animations
- **Inputs**: Modern styling with focus states
- **Badges**: Color-coded status indicators

## 🔧 Customization

### Adding New Features
1. Create new components in the `components/` directory
2. Add routes in `App.jsx`
3. Update styling using Tailwind classes
4. Test responsiveness across devices

### Styling Modifications
- Edit `src/index.css` for global styles
- Use Tailwind utility classes for component styling
- Add custom CSS classes for complex animations

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🚀 Performance Optimizations

- **Lazy Loading**: Images load as needed
- **Code Splitting**: Route-based code splitting
- **Optimized Images**: Proper image sizing and formats
- **Minimal Bundle**: Tree-shaking and optimization

## 🐛 Error Handling

- **Error Boundaries**: Catch and handle React errors
- **API Error Handling**: Graceful API failure handling
- **User Feedback**: Clear error messages and notifications
- **Fallback UI**: Loading states and error pages

## 📊 API Integration

The application uses the Jikan API to fetch anime data:
- **Base URL**: `https://api.jikan.moe/v4/`
- **Endpoints**: 
  - `/top/anime` - Top anime list
  - `/anime` - Search anime
  - `/anime/{id}` - Anime details
  - `/anime/{id}/characters` - Character information

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Jikan API**: For providing anime data
- **MyAnimeList**: For the comprehensive anime database
- **Tailwind CSS**: For the utility-first CSS framework
- **React Community**: For the amazing ecosystem

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation

---

Built with ❤️ by Vedant Warjurkar
