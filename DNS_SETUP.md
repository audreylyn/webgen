# Quick DNS Setup Guide for name.com

## Current Setup (from your screenshot)
You already have one A record pointing to an IP. You need to add wildcard support.

## Required DNS Records on name.com

### Option 1: Keep Current Setup and Add Wildcard
1. Keep your existing A record:
   ```
   Type: A
   Host: n8n-server.likhasiteworks.dev
   Answer: 136.117.127.253
   TTL: 300
   ```

2. Add these new records:

   **For root domain:**
   ```
   Type: A
   Host: @
   Answer: 76.76.21.21
   TTL: 300
   ```
   Note: Get the correct Vercel IP from your Vercel dashboard

   **For app subdomain:**
   ```
   Type: CNAME
   Host: app
   Answer: cname.vercel-dns.com
   TTL: 300
   ```

   **For wildcard subdomains:**
   ```
   Type: CNAME
   Host: *
   Answer: cname.vercel-dns.com
   TTL: 300
   ```

### Option 2: Use Vercel Nameservers (RECOMMENDED)

This is simpler and more reliable:

1. In Vercel Dashboard:
   - Go to your project → Domains
   - Click "Add Domain"
   - Enter `likhasiteworks.dev`
   - Vercel will show you nameservers (usually `ns1.vercel-dns.com` and `ns2.vercel-dns.com`)

2. On name.com:
   - Go to "Manage Nameservers"
   - Replace current nameservers with Vercel's nameservers
   - Wait for propagation (can take 24-48 hours)

## What Each DNS Record Does

| Record Type | Host | Purpose |
|-------------|------|---------|
| A | @ | Points root domain (likhasiteworks.dev) to Vercel |
| CNAME | app | Points app.likhasiteworks.dev to Vercel |
| CNAME | * | Points all subdomains (*.likhasiteworks.dev) to Vercel |

## Verification

After DNS propagation, test with these commands:

```bash
# Test root domain
nslookup likhasiteworks.dev

# Test app subdomain
nslookup app.likhasiteworks.dev

# Test wildcard (replace 'test' with any subdomain)
nslookup test.likhasiteworks.dev
```

All should resolve to Vercel's servers.

## Timeline

- DNS changes: 5-60 minutes (usually)
- Full propagation: Up to 48 hours
- SSL certificate: Automatic (1-2 hours after DNS resolves)

## Visual Guide for name.com Interface

Based on your screenshot, here's what to do:

1. Click "Add Record" button
2. Select record type (CNAME or A)
3. Fill in Host field (e.g., "app" or "*")
4. Fill in Answer field (e.g., "cname.vercel-dns.com")
5. Set TTL to 300
6. Click "Add Record"

Repeat for each record type above.

## Important Notes

- The wildcard (*) record will catch ALL subdomains
- Your existing n8n-server.likhasiteworks.dev record will continue to work
- Vercel will handle SSL certificates automatically for all domains
- Changes can take time to propagate globally
