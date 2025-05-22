## Mobile App

The mobile app is built with React Native and Expo, providing a cross-platform solution for iOS and Android.

### Directory Structure

```
mobile/
├── app/                     # Expo Router app directory
│   ├── (auth)/              # Authentication screens
│   ├── (tabs)/              # Main app tabs
│   ├── property/            # Property-related screens
│   ├── maintenance/         # Maintenance-related screens
│   └── _layout.tsx          # Root layout with authentication
├── components/              # Reusable UI components
├── hooks/                   # Custom React hooks
├── api/                     # API integration with backend
├── utils/                   # Utility functions
├── assets/                  # Static assets
│   ├── images/              # App images
│   └── fonts/               # Custom fonts
├── constants/               # App constants
├── styles/                  # Global styles
├── app.json                 # Expo configuration
├── babel.config.js          # Babel configuration
├── global.css               # Global CSS for NativeWind
├── package.json             # Dependencies
└── tailwind.config.js       # TailwindCSS configuration
```

### Key Features

- **Authentication**: Secure sign-in with Clerk (Google OAuth)
- **Property Management**: Create, view, and edit properties
- **Maintenance Tracking**: Submit and track maintenance requests
- **Dashboard**: Overview of properties and maintenance status
- **Offline Support**: Basic functionality when offline

### Running the Mobile App

```bash
cd mobile
yarn start
```

For development build:

```bash
eas build --profile development --platform ios
```

### Environment Variables

Create a `.env` file in the mobile directory with the following variables:

```
EXPO_PUBLIC_API_URL=https://yourapi.execute-api.region.amazonaws.com/prod
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```
