# 75 Hard Elite Tracker 🏆

![75 Hard Elite Tracker](https://hard75-tracker-aditya-pro.web.app/icons/icon-512.png)

A premium, cloud-synced Progressive Web App (PWA) designed to help users conquer the 75 Hard challenge with discipline and style.

## 🚀 Live Demo
**[https://hard75-tracker-aditya-pro.web.app](https://hard75-tracker-aditya-pro.web.app)**

## ✨ Key Features

- **Personalized Discipline Dashboard**: Real-time tracking of the mandatory 75 Hard tasks.
- **Dual Workouts Enforcement**: Specifically split into Indoor and Outdoor 45-minute sessions to ensure strict rule compliance.
- **Auth & Cloud Sync**: Secure authentication via Email/Password and **Google Login**. All progress is synced to Firebase in real-time.
- **Visual Journey Progress**: A dynamic grid view allows you to see your 75-day progress and streaks at a glance.
- **PWA Ready**: Installable on iOS and Android for a native, standalone app experience.
- **Premium UX/UI**: High-end glassmorphism design with celebrate-on-completion animations.

## 📱 Mobile Installation (PWA)

This app is a Progressive Web App (PWA). You can install it on your home screen for a native app experience:

### On iOS (iPhone/iPad):
1. Open the [Live Demo](https://hard75-tracker-aditya-pro.web.app) in **Safari**.
2. Tap the **Share** button (square with up arrow).
3. Scroll down and tap **"Add to Home Screen"**.

### On Android:
1. Open the [Live Demo](https://hard75-tracker-aditya-pro.web.app) in **Chrome**.
2. Tap the **three dots** (menu) in the top-right corner.
3. Tap **"Install app"** or **"Add to Home screen"**.

## 🛠 Tech Stack

- **Frontend**: React (Vite)
- **Styling**: Vanilla CSS (Custom tokens) + Framer Motion (Animations)
- **Icons**: Lucide React
- **Backend/Auth**: Firebase (Authentication & Cloud Firestore)
- **Hosting**: Firebase Hosting
- **PWA**: Custom Manifest & Service Worker

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd 75Hard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Firebase Configuration**:
   - Create a project in [Firebase Console](https://console.firebase.google.com/).
   - Enable Authentication (Email/Password & Google).
   - Create a Firestore Database.
   - Update `src/lib/firebase.js` with your project credentials.

4. **Run development server**:
   ```bash
   npm run dev
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

## 🌍 Deployment

The project is configured for Firebase Hosting. To deploy:

```bash
npx firebase deploy
```

## 🛡 License
MIT License. Created by Aditya.
