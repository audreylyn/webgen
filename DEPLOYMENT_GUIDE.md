# Deployment Guide for WebGen AI on Vercel

## Prerequisites
- Vercel account (sign up at https://vercel.com)
- Domain: likhasiteworks.dev (already purchased)
- Supabase database already configured

## Step 1: Deploy to Vercel

### Option A: Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Option B: Deploy via GitHub (Recommended)
1. Push your code to a GitHub repository
2. Visit https://vercel.com/new
3. Import your GitHub repository
4. Vercel will auto-detect the Vite framework

## Step 2: Configure Environment Variables in Vercel

Go to your Vercel project settings and add these environment variables:

```
VITE_SUPABASE_URL=https://ynuobqfmwcinrhanbpfi.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InludW9icWZtd2NpbnJoYW5icGZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwMjA5MjYsImV4cCI6MjA3OTU5NjkyNn0.RfKocHAnq9kZTlteK-_7X2wTtouoKs9AmEfUNRJqmDc
VITE_SUPABASE_IMAGE_BUCKET=webgen-images
VITE_ADMIN_EMAIL=audreylynvillanueva1504@gmail.com
GEMINI_API_KEY=your_gemini_api_key_here
```

## Step 3: Configure Domain on Vercel

1. Go to your Vercel project → Settings → Domains
2. Add your domains:
   - `likhasiteworks.dev` (main domain)
   - `app.likhasiteworks.dev` (admin dashboard)
   - `*.likhasiteworks.dev` (wildcard for client subdomains)

## Step 4: Configure DNS Records on name.com

Based on your screenshot, go to name.com DNS management and add these records:

### A Record (for root domain)
```
Type: A
Host: @
Answer: [Your Vercel IP - get from Vercel dashboard]
TTL: 300
```

### CNAME Record (for app subdomain)
```
Type: CNAME
Host: app
Answer: cname.vercel-dns.com
TTL: 300
```

### CNAME Record (for wildcard subdomains)
```
Type: CNAME
Host: *
Answer: cname.vercel-dns.com
TTL: 300
```

### Alternative: Use Vercel Nameservers (Recommended)

Instead of individual records, you can point your entire domain to Vercel:

1. In Vercel, go to your project → Domains → Add Domain
2. Add `likhasiteworks.dev`
3. Vercel will provide nameservers like:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`

4. On name.com, update your nameservers to Vercel's nameservers

## Step 5: How Subdomain Routing Works

### Main App (Dashboard/Builder)
- `app.likhasiteworks.dev` → Shows admin dashboard
- `likhasiteworks.dev` → Shows admin dashboard

### Client Websites
- `client123.likhasiteworks.dev` → Queries database for subdomain "client123" → Shows that client's website

### Implementation Details
The app checks the hostname on load:
1. If hostname is `app.likhasiteworks.dev` or root domain → Show dashboard
2. If hostname is `[anything-else].likhasiteworks.dev` → Query Supabase for website with matching subdomain → Show preview

## Step 6: Testing

### After DNS propagation (can take up to 48 hours):

1. Test main app:
   - Visit `https://app.likhasiteworks.dev`
   - Should show login/dashboard

2. Test client subdomain:
   - Create a website in the builder with subdomain "test"
   - Visit `https://test.likhasiteworks.dev`
   - Should show that website's preview

## Step 7: SSL Certificates

Vercel automatically provisions SSL certificates for:
- Your main domain
- All subdomains (including wildcard)

No additional configuration needed.

## Troubleshooting

### DNS not resolving
- Wait up to 48 hours for DNS propagation
- Use `dig likhasiteworks.dev` to check DNS records
- Use `nslookup app.likhasiteworks.dev` to verify CNAME

### Subdomain not working
- Verify the website has a `subdomain` field in the database
- Check that the website `status` is "active"
- Check browser console for errors

### Environment variables not working
- Ensure all `VITE_*` variables are set in Vercel
- Redeploy after adding environment variables
- Variables must start with `VITE_` to be exposed to the client

## Architecture Summary

```
┌─────────────────────────────────────────────────┐
│           likhasiteworks.dev / name.com         │
│              (DNS Configuration)                │
└──────────────┬──────────────────────────────────┘
               │
               │ Wildcard DNS (*.likhasiteworks.dev)
               │
               ▼
┌─────────────────────────────────────────────────┐
│              Vercel Hosting                     │
│         (React App Deployment)                  │
└──────────────┬──────────────────────────────────┘
               │
               │ Client-side routing based on hostname
               │
    ┌──────────┴──────────┐
    │                     │
    ▼                     ▼
┌─────────┐         ┌──────────┐
│ app.*   │         │ client.* │
│ Dashboard│         │ Preview  │
└─────────┘         └──────────┘
                          │
                          │ Query by subdomain
                          ▼
                   ┌──────────────┐
                   │   Supabase   │
                   │   Database   │
                   └──────────────┘
```

## Next Steps

1. Deploy to Vercel (Option A or B above)
2. Configure environment variables
3. Add domains in Vercel dashboard
4. Update DNS on name.com
5. Wait for DNS propagation
6. Test both admin and client subdomains
7. Create your first client website and test the subdomain

## Security Notes

- Never commit `.env` file to git
- Use environment variables in Vercel for all secrets
- The Supabase anon key is safe to expose to clients (RLS protects data)
- Consider enabling RLS policies if not already enabled

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify DNS propagation with online tools
4. Ensure all environment variables are set correctly
