# 🚀 Deploy Bangladesh Stock Market API to Render

## Quick Deployment Steps

### 1. **Prepare Your Repository**

Make sure your code is pushed to GitHub:

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit - Bangladesh Stock Market API"

# Add your GitHub repository as origin
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git push -u origin main
```

### 2. **Deploy to Render**

1. **Go to [Render.com](https://render.com)** and sign up/login
2. **Click "New +"** → **"Web Service"**
3. **Connect your GitHub repository**
4. **Configure the service:**

   - **Name:** `bd-stock-api` (or your preferred name)
   - **Environment:** `Node`
   - **Region:** Choose closest to your users
   - **Branch:** `main`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`

5. **Set Environment Variables:**
   ```
   NODE_ENV = production
   DSE_BASE_URL = https://dsebd.org
   ALLOWED_ORIGINS = *
   ```

6. **Click "Create Web Service"**

### 3. **Your API Will Be Live At:**
```
https://YOUR_SERVICE_NAME.onrender.com
```

## 📋 **API Endpoints (Live)**

Once deployed, your API will be accessible at:

### **Base URL:** `https://YOUR_SERVICE_NAME.onrender.com`

### **Available Endpoints:**

1. **Health Check**
   ```
   GET https://YOUR_SERVICE_NAME.onrender.com/health
   ```

2. **API Documentation**
   ```
   GET https://YOUR_SERVICE_NAME.onrender.com/
   ```

3. **Latest Stock Data**
   ```
   GET https://YOUR_SERVICE_NAME.onrender.com/v1/dse/latest
   ```

4. **DSEX Data**
   ```
   GET https://YOUR_SERVICE_NAME.onrender.com/v1/dse/dsexdata
   GET https://YOUR_SERVICE_NAME.onrender.com/v1/dse/dsexdata?symbol=BEXIMCO
   ```

5. **Top 30 Stocks**
   ```
   GET https://YOUR_SERVICE_NAME.onrender.com/v1/dse/top30
   ```

6. **Historical Data**
   ```
   GET https://YOUR_SERVICE_NAME.onrender.com/v1/dse/historical?start=2024-01-01&end=2024-01-07
   ```

## 🔧 **Configuration Files Created**

- `render.yaml` - Render service configuration
- Updated `package.json` with Node.js engine requirements

## 🌐 **Test Your Live API**

After deployment, test these URLs in your browser:

```
# Health check
https://YOUR_SERVICE_NAME.onrender.com/health

# API documentation
https://YOUR_SERVICE_NAME.onrender.com/

# Latest stock data
https://YOUR_SERVICE_NAME.onrender.com/v1/dse/latest

# Top 30 stocks
https://YOUR_SERVICE_NAME.onrender.com/v1/dse/top30
```

## 📊 **Free Tier Limitations**

Render's free tier includes:
- ✅ 750 hours/month (enough for 24/7)
- ✅ Automatic HTTPS
- ✅ Custom domains
- ⚠️ Spins down after 15 minutes of inactivity
- ⚠️ Cold start delay (~30 seconds)

## 🚀 **Production Tips**

### **For Better Performance:**
1. **Upgrade to Paid Plan** ($7/month) for:
   - No spin-down
   - Faster builds
   - More resources

### **Custom Domain:**
1. Go to your service settings
2. Add custom domain
3. Update DNS records as instructed

### **Monitoring:**
- Use Render's built-in logs
- Set up health check monitoring
- Monitor API response times

## 🔄 **Auto-Deploy Setup**

Render automatically deploys when you push to your main branch:

```bash
# Make changes to your code
git add .
git commit -m "Update API endpoints"
git push origin main
# Render will automatically deploy!
```

## 🛠️ **Troubleshooting**

### **Common Issues:**

1. **Build Fails:**
   - Check Node.js version in `package.json`
   - Ensure all dependencies are in `dependencies`, not `devDependencies`

2. **Service Won't Start:**
   - Verify `start` command in `package.json`
   - Check environment variables

3. **API Returns Errors:**
   - Check Render logs
   - Verify DSE_BASE_URL is accessible

### **View Logs:**
1. Go to your service dashboard
2. Click "Logs" tab
3. Monitor real-time logs

## 📱 **Share Your API**

Once deployed, share these endpoints with users:

```markdown
# Bangladesh Stock Market API

**Base URL:** https://YOUR_SERVICE_NAME.onrender.com

## Endpoints:
- GET /health - Health check
- GET /v1/dse/latest - Latest stock data
- GET /v1/dse/top30 - Top 30 stocks
- GET /v1/dse/dsexdata?symbol=SYMBOL - DSEX data
- GET /v1/dse/historical?start=DATE&end=DATE - Historical data

## Example:
https://YOUR_SERVICE_NAME.onrender.com/v1/dse/latest
```

## 🎉 **You're Done!**

Your Bangladesh Stock Market API is now live and accessible to anyone worldwide!

**Next Steps:**
1. Test all endpoints
2. Share the API with users
3. Monitor usage and performance
4. Consider upgrading for production use

---

**Need Help?** Check Render's documentation or the troubleshooting section above.