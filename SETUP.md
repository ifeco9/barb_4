# Barberng Setup Guide

## Quick Start

To get Barberng running on your local machine, follow these steps:

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the example environment file and add your configuration:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual values:

```env
# Supabase Configuration (Required)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Barberng
NODE_ENV=development
```

### 3. Set Up Database

1. Create a new Supabase project at https://supabase.com
2. Go to the SQL Editor in your Supabase dashboard
3. Copy the contents of `database/schema.sql`
4. Paste and execute it in the SQL Editor

### 4. Start Development Server

```bash
npm run dev
```

Your app will be available at http://localhost:3000

## Detailed Setup Instructions

### Supabase Configuration

#### Creating a Supabase Project

1. **Sign up** at https://supabase.com
2. **Create a new project**
   - Choose a project name (e.g., "barberng")
   - Set a database password
   - Select your region
3. **Wait for setup** to complete (usually 1-2 minutes)

#### Getting Your API Keys

1. Go to **Settings > API** in your Supabase dashboard
2. Copy the following values to your `.env.local`:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **Anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`  
   - **Service role secret** → `SUPABASE_SERVICE_ROLE_KEY`

#### Database Schema Setup

1. Go to **SQL Editor** in your Supabase dashboard
2. Create a **New query**
3. Copy the entire contents of `database/schema.sql`
4. Paste it into the query editor
5. Click **Run** to execute

This will create:
- All required tables with proper relationships
- User roles and enums
- Row Level Security (RLS) policies
- Indexes for performance
- Triggers for automatic timestamp updates

#### Authentication Configuration

1. Go to **Authentication > Settings** in Supabase
2. Configure the following:
   
   **Site URL**: `http://localhost:3000`
   
   **Redirect URLs**: 
   ```
   http://localhost:3000/auth/callback
   http://localhost:3000/auth/confirm
   ```

3. **Enable providers** you want to use:
   - Email (enabled by default)
   - Google OAuth (optional)
   - Apple OAuth (optional)

### Optional Integrations

#### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add to your `.env.local`:
   ```env
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

#### Stripe Payment Setup

1. Create account at https://stripe.com
2. Get your API keys from the dashboard
3. Add to your `.env.local`:
   ```env
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

#### Mapbox Integration

1. Create account at https://mapbox.com
2. Get your access token
3. Add to your `.env.local`:
   ```env
   NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=pk.eyJ1...
   ```

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type checking
npm run type-check
```

## File Structure Overview

```
src/
├── app/                    # Next.js 13 App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/
│   ├── auth/              # Authentication components
│   ├── home/              # Homepage sections
│   ├── layout/            # Navigation and footer
│   ├── ui/                # Reusable UI components
│   └── providers.tsx      # Context providers
├── lib/
│   ├── supabase.ts        # Supabase client
│   └── pwa.ts             # PWA utilities
├── store/
│   ├── index.ts           # Redux store
│   └── slices/            # Redux slices
├── types/
│   ├── database.ts        # Database types
│   └── index.ts           # General types
└── utils/                 # Utility functions
```

## Troubleshooting

### Common Issues

#### "Module not found" errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Supabase connection issues
- Check your environment variables are correct
- Ensure your Supabase project is active
- Verify the database schema was applied correctly

#### TypeScript errors
```bash
# Check types
npm run type-check

# Reset TypeScript cache
rm -rf .next
npm run dev
```

#### PWA not working
- Ensure you're running on HTTPS or localhost
- Check service worker registration in browser dev tools
- Verify manifest.json is accessible

### Getting Help

If you encounter issues:

1. **Check the console** for error messages
2. **Verify environment variables** are set correctly
3. **Check Supabase logs** in the dashboard
4. **Review the database schema** to ensure it's applied
5. **Check browser dev tools** for network/console errors

### Browser Requirements

- **Chrome/Edge**: Version 80+
- **Firefox**: Version 75+
- **Safari**: Version 13+
- **Mobile browsers**: iOS Safari 13+, Chrome Mobile 80+

## Next Steps

Once you have the basic setup running:

1. **Test user registration** - Create a new account
2. **Verify database** - Check if user data appears in Supabase
3. **Explore the UI** - Navigate through the homepage
4. **Check PWA features** - Try installing the app
5. **Start customizing** - Modify components to fit your needs

## Production Deployment

### Environment Variables for Production

Update these values for production:

```env
NEXT_PUBLIC_APP_URL=https://your-domain.com
NODE_ENV=production
```

### Recommended Hosting

- **Vercel** (Recommended for Next.js)
- **Netlify**
- **Railway**

### PWA Deployment Checklist

- [ ] HTTPS enabled
- [ ] Service worker registered
- [ ] Manifest.json accessible
- [ ] Icons in all required sizes
- [ ] Offline functionality tested
- [ ] Push notifications configured

For detailed deployment instructions, see the main README.md file.