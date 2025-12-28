# Gigzi Web Application

A complete web version of the Gigzi mobile app with all features implemented. This is a fully functional web application built with React, Vite, and Tailwind CSS.

## Features

### User Features
- ✅ **Authentication**: Login/Signup with OTP-based authentication
- ✅ **Home Page**: Browse events, artists, and shows with featured content
- ✅ **Shop**: Browse and purchase products
- ✅ **Search**: Search artists with filters (category, city)
- ✅ **Artist Profiles**: View artist details, portfolios, and book slots
- ✅ **Booking Flow**: Complete booking process with payment integration
- ✅ **Orders**: Track and manage bookings
- ✅ **Cart & Wishlist**: Shopping cart and wishlist functionality
- ✅ **Account Management**: Profile, settings, addresses

### Artist Features
- ✅ **Artist Dashboard**: View orders, stats, and earnings
- ✅ **Portfolio Management**: Add/edit portfolio items (images/videos)
- ✅ **Slot Management**: Create and manage availability slots
- ✅ **Wallet**: View earnings and transaction history

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Icons**: Lucide React

## Project Structure

```
src/
├── components/
│   └── Layout/
│       ├── Navbar.jsx          # Navigation bar
│       └── ProtectedRoute.jsx  # Route protection
├── pages/
│   ├── Login.jsx               # User login
│   ├── Signup.jsx              # User signup
│   ├── Home.jsx                # Home page with events/artists/shows
│   ├── Shop.jsx                # Shop page
│   ├── Account.jsx             # User account page
│   ├── Orders.jsx              # Orders list
│   ├── Cart.jsx                # Shopping cart
│   ├── Wishlist.jsx            # Wishlist
│   ├── Search.jsx              # Search artists
│   ├── ArtistProfile.jsx      # Artist profile view
│   ├── PreBooking.jsx          # Booking form
│   └── artist/
│       ├── Dashboard.jsx       # Artist dashboard
│       ├── Portfolio.jsx      # Portfolio management
│       ├── Slots.jsx          # Slot management
│       └── Wallet.jsx         # Wallet/earnings
├── store/
│   └── authStore.js           # Authentication state (Zustand)
├── utils/
│   └── apiService.js          # API service (Axios wrapper)
└── App.jsx                     # Main app component with routing

```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file (optional):
```env
VITE_API_URL=https://gigzi-dev.vercel.app
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## API Integration

The app connects to the Gigzi backend API. Make sure the backend is running and accessible. The default API URL is `https://gigzi-dev.vercel.app`.

### Key API Endpoints Used

- Authentication: `/v3/auth/*`
- Artists: `/client/booking/*`
- Orders: `/client/order/*`
- Artist Dashboard: `/artist/*`
- Portfolio: `/artist/profile/*`
- Slots: `/artist/addSlots/*`
- Wallet: `/artist/wallet/*`

## Features Implementation Status

✅ All core features from the mobile app have been implemented:
- Authentication flow (Login/Signup with OTP)
- Home page with Events/Artists/Shows tabs
- Artist browsing and search
- Artist profile viewing
- Booking flow
- Order management
- Shop, Cart, Wishlist
- Artist dashboard
- Portfolio management
- Slot management
- Wallet/earnings

## Responsive Design

The application is fully responsive and works on:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## Color Scheme

The app uses the same color scheme as the mobile app:
- Primary: `#021d5c` (Dark Blue)
- Secondary: `#4D55CC` (Purple Blue)
- Accent: `#06328c` (Medium Blue)
- Success: `#10B981` (Green)
- Warning: `#F59E0B` (Orange)
- Error: `#EF4444` (Red)

## Notes

- The app uses JWT tokens for authentication
- State is persisted using Zustand's persist middleware
- All API calls are handled through the centralized `apiService`
- Protected routes require authentication
- Artist-specific routes require the `artist` role

## Future Enhancements

- Payment gateway integration (Razorpay)
- Real-time notifications
- Chat functionality
- Advanced filtering and sorting
- Image upload for portfolio
- Analytics dashboard
