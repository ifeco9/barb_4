#!/usr/bin/env node

/**
 * Supabase Database Setup Script
 * This script applies the database schema to your Supabase instance
 */

const fs = require('fs');
const path = require('path');

// Color console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logStep(step, message) {
  log(`[${step}] ${message}`, 'blue');
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

async function main() {
  log('\n🚀 Barberng PWA Database Setup', 'cyan');
  log('=====================================', 'cyan');

  // Check if environment file exists
  const envPath = path.join(__dirname, '.env.local');
  if (!fs.existsSync(envPath)) {
    logError('Environment file (.env.local) not found!');
    logWarning('Please make sure you have created .env.local with your Supabase credentials');
    process.exit(1);
  }

  // Read environment variables
  require('dotenv').config({ path: envPath });
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    logError('Missing Supabase credentials in .env.local');
    logWarning('Please ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set');
    process.exit(1);
  }

  logStep('1', 'Environment variables loaded successfully');
  log(`   Supabase URL: ${supabaseUrl}`, 'magenta');

  // Read schema file
  const schemaPath = path.join(__dirname, 'database', 'schema.sql');
  if (!fs.existsSync(schemaPath)) {
    logError('Database schema file not found at database/schema.sql');
    process.exit(1);
  }

  const schema = fs.readFileSync(schemaPath, 'utf8');
  logStep('2', 'Database schema loaded');

  // Manual setup instructions
  log('\n📋 MANUAL SETUP INSTRUCTIONS', 'yellow');
  log('==============================', 'yellow');
  
  log('\n1. Go to your Supabase Dashboard:', 'cyan');
  log(`   ${supabaseUrl.replace('/rest/v1', '')}/project/default/editor`, 'blue');
  
  log('\n2. Navigate to SQL Editor', 'cyan');
  
  log('\n3. Create a new query and paste the schema content', 'cyan');
  
  log('\n4. Execute the schema to create all tables and policies', 'cyan');

  log('\n📄 SCHEMA CONTENT TO COPY:', 'yellow');
  log('==========================', 'yellow');
  console.log(schema);

  log('\n🔧 ADDITIONAL SETUP STEPS:', 'yellow');
  log('==========================', 'yellow');
  
  log('\n5. Enable authentication providers (optional):', 'cyan');
  log('   - Go to Authentication > Providers', 'blue');
  log('   - Enable Google, Facebook, or other social providers', 'blue');
  
  log('\n6. Configure storage buckets (optional):', 'cyan');
  log('   - Go to Storage', 'blue');
  log('   - Create buckets for: avatars, portfolio, products', 'blue');
  
  log('\n7. Set up email templates (optional):', 'cyan');
  log('   - Go to Authentication > Email Templates', 'blue');
  log('   - Customize signup, reset password templates', 'blue');

  logSuccess('\nSetup instructions provided! Follow the steps above to complete your database setup.');
  
  log('\n🚀 Next Steps:', 'green');
  log('==============', 'green');
  log('1. Apply the schema in Supabase Dashboard', 'cyan');
  log('2. Test authentication by signing up a user', 'cyan');
  log('3. Verify database tables are created correctly', 'cyan');
  log('4. Start the development server: npm run dev', 'cyan');
}

main().catch(error => {
  logError(`Setup failed: ${error.message}`);
  process.exit(1);
});#!/usr/bin/env node

/**
 * Supabase Database Setup Script
 * This script applies the database schema to your Supabase instance
 */

const fs = require('fs');
const path = require('path');

// Color console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logStep(step, message) {
  log(`[${step}] ${message}`, 'blue');
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

async function main() {
  log('\n🚀 Barberng PWA Database Setup', 'cyan');
  log('=====================================', 'cyan');

  // Check if environment file exists
  const envPath = path.join(__dirname, '.env.local');
  if (!fs.existsSync(envPath)) {
    logError('Environment file (.env.local) not found!');
    logWarning('Please make sure you have created .env.local with your Supabase credentials');
    process.exit(1);
  }

  // Read environment variables
  require('dotenv').config({ path: envPath });
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    logError('Missing Supabase credentials in .env.local');
    logWarning('Please ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set');
    process.exit(1);
  }

  logStep('1', 'Environment variables loaded successfully');
  log(`   Supabase URL: ${supabaseUrl}`, 'magenta');

  // Read schema file
  const schemaPath = path.join(__dirname, 'database', 'schema.sql');
  if (!fs.existsSync(schemaPath)) {
    logError('Database schema file not found at database/schema.sql');
    process.exit(1);
  }

  const schema = fs.readFileSync(schemaPath, 'utf8');
  logStep('2', 'Database schema loaded');

  // Manual setup instructions
  log('\n📋 MANUAL SETUP INSTRUCTIONS', 'yellow');
  log('==============================', 'yellow');
  
  log('\n1. Go to your Supabase Dashboard:', 'cyan');
  log(`   ${supabaseUrl.replace('/rest/v1', '')}/project/default/editor`, 'blue');
  
  log('\n2. Navigate to SQL Editor', 'cyan');
  
  log('\n3. Create a new query and paste the schema content', 'cyan');
  
  log('\n4. Execute the schema to create all tables and policies', 'cyan');

  log('\n📄 SCHEMA CONTENT TO COPY:', 'yellow');
  log('==========================', 'yellow');
  console.log(schema);

  log('\n🔧 ADDITIONAL SETUP STEPS:', 'yellow');
  log('==========================', 'yellow');
  
  log('\n5. Enable authentication providers (optional):', 'cyan');
  log('   - Go to Authentication > Providers', 'blue');
  log('   - Enable Google, Facebook, or other social providers', 'blue');
  
  log('\n6. Configure storage buckets (optional):', 'cyan');
  log('   - Go to Storage', 'blue');
  log('   - Create buckets for: avatars, portfolio, products', 'blue');
  
  log('\n7. Set up email templates (optional):', 'cyan');
  log('   - Go to Authentication > Email Templates', 'blue');
  log('   - Customize signup, reset password templates', 'blue');

  logSuccess('\nSetup instructions provided! Follow the steps above to complete your database setup.');
  
  log('\n🚀 Next Steps:', 'green');
  log('==============', 'green');
  log('1. Apply the schema in Supabase Dashboard', 'cyan');
  log('2. Test authentication by signing up a user', 'cyan');
  log('3. Verify database tables are created correctly', 'cyan');
  log('4. Start the development server: npm run dev', 'cyan');
}

main().catch(error => {
  logError(`Setup failed: ${error.message}`);
  process.exit(1);
});