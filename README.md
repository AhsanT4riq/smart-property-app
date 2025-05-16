# Smart Property App Monorepo

A modern, full-stack property management solution.

- **Backend:** Node.js, Apollo Server (GraphQL), Prisma, PostgreSQL, Clerk Auth
- **Mobile App:** React Native (Expo), Apollo Client, Clerk SDK

Managed as a monorepo with [pnpm workspaces](https://pnpm.io/).

---

## 📁 Project Structure

```
smart-property-app/
├── pnpm-workspace.yaml
├── backend/
│   ├── package.json
│   ├── prisma/
│   ├── src/
│   └── ...
├── mobile/
│   ├── package.json
│   ├── app.json
│   └── ...
```

---

## 🚀 Getting Started

### 1. Install Dependencies

From the project root:

```bash
pnpm install
```

---

### 2. Backend Setup

```bash
cd backend
cp .env.example .env              # Copy and configure your environment variables
pnpm migrate                      # Run Prisma migrations (or: npx prisma migrate dev)
pnpm generate                     # Generate Prisma client (or: npx prisma generate)
pnpm dev                          # Start the backend server (GraphQL at http://localhost:4000/)
```

- Requires PostgreSQL and Clerk credentials in `.env`.
- All resolvers are protected by Clerk JWT authentication.

---

### 3. Mobile App Setup (Expo)

```bash
cd mobile
pnpm install
pnpm expo start                   # Launch Expo DevTools for local development
```

- Uses React Native + Expo for iOS and Android
- Apollo Client for API integration
- Clerk SDK for authentication

---

### 4. Running a Development Build on Physical Device

- Install [EAS CLI](https://docs.expo.dev/eas/):
  ```bash
  pnpm add -g eas-cli
  ```
- Configure EAS for your project:
  ```bash
  eas build:configure
  ```
- Set your iOS `bundleIdentifier` and Android `package` in `app.json`:

  ```json
  {
    "expo": {
      "ios": { "bundleIdentifier": "com.yourcompany.smartproperty" },
      "android": { "package": "com.yourcompany.smartproperty" }
    }
  }
  ```

- Build and install on your device:
  ```bash
  eas build --platform ios --profile development
  # or
  eas build --platform android --profile development
  ```

---

### 5. Monorepo Tips

- Managed by `pnpm` workspaces (`pnpm-workspace.yaml`)
- Each app (`backend`, `mobile`) can be developed and deployed independently
- Run scripts in a subproject with:
  ```bash
  pnpm --filter backend dev
  pnpm --filter mobile expo start
  ```

---

## 🔑 Authentication

- All GraphQL endpoints are secured with [Clerk](https://clerk.com/) JWT authentication.
- The mobile app uses Clerk’s React Native SDK for user login and session management.

---

## 🧩 Tech Stack

- **Backend:** Node.js, TypeScript, Apollo Server, Prisma, PostgreSQL, Clerk
- **Mobile:** React Native, Expo, Apollo Client, Clerk SDK
- **Monorepo Tooling:** pnpm workspaces

---

## 🛠️ Useful Commands

| Command                               | Description                          |
| ------------------------------------- | ------------------------------------ | ----------------------------------- |
| `pnpm install`                        | Install all dependencies (root)      |
| `pnpm --filter backend dev`           | Start backend dev server             |
| `pnpm --filter mobile expo start`     | Start Expo dev server for mobile app |
| `npx prisma migrate dev` (in backend) | Run DB migrations                    |
| `npx prisma generate` (in backend)    | Generate Prisma client               |
| `eas build:configure` (in mobile)     | Setup EAS for Expo builds            |
| `eas build --platform ios             | android`                             | Build dev client for device testing |

---

## 🧪 Testing

- **Backend:** Use GraphQL Playground at `http://localhost:4000/` (must be authenticated)
- **Mobile:** Use Expo Go for quick JS testing or a custom dev build for native modules and Clerk auth

---

## 👏 Contributing

1. Fork this repo
2. Create a branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -am 'Add feature'`)
4. Push and open a PR

---

## 📄 License

[MIT](LICENSE)

---

## 📣 Contact

For issues, feature requests, or collaboration, please open a GitHub Issue or contact the maintainer.
