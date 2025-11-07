# Deploying to Vercel

## Prerequisites
1. Create a Vercel account at [vercel.com](https://vercel.com)
2. Install Vercel CLI: `npm install -g vercel`

## Deployment Steps

### 1. Push Your Code to GitHub
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Deploy via Vercel Dashboard (Recommended)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   
4. **Add Environment Variables**:
   - Click "Environment Variables"
   - Add: `MONGO_URI` = your MongoDB connection string
   - Make sure to add it for Production, Preview, and Development

5. Click "Deploy"

### 3. Deploy via CLI (Alternative)

```bash
# Login to Vercel
vercel login

# Deploy
vercel

# Add environment variable
vercel env add MONGO_URI

# Deploy to production
vercel --prod
```

## Important Notes

### API URLs
After deployment, your API will be available at:
- Production: `https://your-app.vercel.app/api/*`

You'll need to update your frontend API calls to use the deployed URL in production.

### Environment Variables
Make sure to add these in Vercel Dashboard:
- `MONGO_URI` - Your MongoDB connection string

### Frontend API Configuration
You may want to create an environment variable for the API URL:

Create `.env.local`:
```
VITE_API_URL=https://your-app.vercel.app
```

Then update your API calls to use:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
```

### Database Access
Ensure your MongoDB Atlas cluster allows connections from:
- `0.0.0.0/0` (all IPs) for Vercel serverless functions
- Or add Vercel's IP addresses to your whitelist

## Troubleshooting

### Build Errors
- Check Vercel deployment logs in the dashboard
- Ensure all dependencies are in `package.json`
- Verify TypeScript compilation works: `npm run build`

### API Errors
- Check Function Logs in Vercel Dashboard
- Verify MONGO_URI environment variable is set
- Check MongoDB Atlas network access settings

### CORS Issues
If you deploy frontend and backend separately:
- Update CORS settings in `api/index.js`
- Add your Vercel frontend URL to allowed origins

## Local Development
Continue using:
```bash
npm run dev
```

This runs both frontend and backend locally on:
- Frontend: http://localhost:5173
- Backend: http://localhost:4000
