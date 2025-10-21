# 📚 eBook Referral System

A modern eBook purchase platform built with Next.js featuring a referral reward system. Users can share referral links to earn credits, and both the referrer and referred user receive rewards on the first purchase.

## ✨ Features

- **eBook Marketplace** - Browse and purchase digital books
- **Referral System** - Share your unique referral link with friends
- **Credit Rewards** - Earn 2 credits when your referral makes their first purchase
- **User Dashboard** - Track your referrals, orders, and credit balance
- **Real-time Stats** - Monitor total, pending, and converted referrals
- **Order History** - View all your past purchases with pagination
- **Secure Authentication** - JWT-based auth with session management

## 🎁 How Referral System Works

1. **Share Your Link** - Every user gets a unique referral code
2. **Friend Registers** - New user signs up using your referral link
3. **First Purchase** - When referred user makes their first purchase
4. **Both Get Rewards** - Both referrer and referred user receive **2 credits** each
5. **Use Credits** - Apply credits towards future purchases

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Data Fetching:** TanStack Query (React Query)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Form Validation:** Zod

## 📋 Prerequisites

- Node.js 20+ 
- pnpm (recommended package manager)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <https://github.com/sohan-fahad/referral-system-web.git>
cd referral-system-web
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the environment variables in `.env`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4001/api
```

> **Note:** Make sure to configure all required environment variables as specified in `.env.example`

### 4. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.



