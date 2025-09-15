# 🗄️ Database Setup Guide

## Prerequisites
Your Supabase credentials have been configured in `.env.local`:
- **URL**: https://fcqrexzjznmowzjcqvnd.supabase.co
- **Anon Key**: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjcXJleHpqem5tb3d6amNxdm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4MzU5MTksImV4cCI6MjA3MzQxMTkxOX0.uT_nAMTJYReezfGq0i-HZ4q8hFnEOCvZY3cYmveW65A

## 📋 Step-by-Step Database Setup

### Step 1: Access Supabase Dashboard
1. Go to: https://fcqrexzjznmowzjcqvnd.supabase.co
2. Click on your project dashboard
3. Navigate to **SQL Editor** in the left sidebar

### Step 2: Apply Database Schema
1. In the SQL Editor, click **"New Query"**
2. Copy the entire content from `database/schema.sql` file
3. Paste it into the SQL query editor
4. Click **"Run"** to execute the schema

### Step 2.1: Apply Schema Updates (IMPORTANT)
1. After the main schema is applied, click **"New Query"** again
2. Copy the entire content from `database/schema-updates.sql` file
3. Paste it into the SQL query editor
4. Click **"Run"** to execute the updates

**Note:** The schema updates fix RLS (Row Level Security) issues that prevent user registration. This step is required for authentication to work properly.

### Step 3: Verify Tables Created
After running the schema, you should see these tables in your **Table Editor**:
- ✅ `users` - User profiles and authentication data
- ✅ `service_providers` - Barber/stylist business profiles
- ✅ `services` - Services offered by providers
- ✅ `products` - Beauty products for sale
- ✅ `appointments` - Booking and scheduling data
- ✅ `transactions` - Payment and transaction records
- ✅ `reviews` - Customer reviews and ratings
- ✅ `notifications` - In-app notifications
- ✅ `favorites` - User favorites (providers/products)
- ✅ `loyalty_points` - Loyalty program data
- ✅ `cart_items` - Shopping cart items
- ✅ `orders` - Product orders
- ✅ `order_items` - Individual order line items

### Step 4: Configure Authentication (Optional)
1. Go to **Authentication > Providers**
2. Enable additional sign-in methods:
   - Google OAuth
   - Facebook OAuth
   - Apple OAuth (for mobile)

### Step 5: Set Up Storage Buckets (Optional)
1. Go to **Storage**
2. Create the following buckets:
   - `avatars` (for user profile pictures)
   - `portfolio` (for provider work galleries)
   - `products` (for product images)
   - `documents` (for business licenses, certifications)

### Step 6: Configure Storage Policies
For each bucket, set up these policies:

**Public Read Access:**
```sql
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (true);
```

**Authenticated Upload Access:**
```sql
CREATE POLICY "Authenticated users can upload" ON storage.objects 
FOR INSERT WITH CHECK (auth.role() = 'authenticated');
```

### Step 7: Test Authentication
1. Start your development server: `npm run dev`
2. Go to http://localhost:3003
3. Try signing up with a test account
4. Verify the user appears in the `auth.users` table
5. Check that a corresponding record is created in the `users` table

## 🔧 Troubleshooting

### Common Issues:

**1. Permission Denied Errors**
- Make sure RLS (Row Level Security) is properly configured
- Check that your policies allow the intended operations

**2. Missing Extensions**
- Ensure `uuid-ossp` and `postgis` extensions are enabled
- These should be automatically created by the schema

**3. Authentication Not Working**
- Verify your `.env.local` file has the correct Supabase URL and anon key
- Check that the Supabase project is active and not paused

**4. Tables Not Created**
- Make sure you copied the entire schema.sql content
- Check for any SQL errors in the query execution

## 🚀 Next Steps

Once your database is set up:
1. ✅ Authentication should work (sign up/sign in)
2. ✅ User profiles will be created automatically
3. ✅ Role-based dashboards will display correctly
4. ✅ Service provider tools will be functional
5. ✅ Product marketplace features will work

## 📞 Need Help?

If you encounter any issues:
1. Check the Supabase dashboard logs
2. Verify all environment variables are correct
3. Ensure the database schema was applied completely
4. Test with a fresh browser session

Happy coding! 🎉