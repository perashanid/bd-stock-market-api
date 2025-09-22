# Bangladesh Stock Market API - Deployment Guide

## 🚀 Quick Start

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Test API endpoints
npm run test:api
```

### Production Build
```bash
# Build TypeScript
npm run build

# Start production server
npm start
```

## 📋 API Endpoints

### Base URL
- **Local**: `http://localhost:3000`
- **Production**: `https://your-domain.com`

### Available Endpoints

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| GET | `/health` | Health check | None |
| GET | `/` | API documentation | None |
| GET | `/v1/dse/hello` | Test endpoint | None |
| GET | `/v1/dse/status` | API status | None |
| GET | `/v1/dse/latest` | Latest stock data | None |
| GET | `/v1/dse/dsexdata` | DSEX data | `symbol` (optional) |
| GET | `/v1/dse/top30` | Top 30 stocks | None |
| GET | `/v1/dse/historical` | Historical data | `start`, `end` (required), `code` (optional) |

### Example Requests

```bash
# Get latest stock data
curl http://localhost:3000/v1/dse/latest

# Get DSEX data for specific symbol
curl "http://localhost:3000/v1/dse/dsexdata?symbol=BEXIMCO"

# Get historical data
curl "http://localhost:3000/v1/dse/historical?start=2024-01-01&end=2024-01-07"
```

## 🐳 Docker Deployment

### Build and Run with Docker
```bash
# Build Docker image
npm run docker:build

# Run container
npm run docker:run

# Or use Docker Compose
npm run docker:compose
```

### Docker Compose Commands
```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild and restart
docker-compose up -d --build
```

## ☁️ Cloud Deployment Options

### 1. Heroku
```bash
# Install Heroku CLI and login
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set DSE_BASE_URL=https://dsebd.org

# Deploy
git push heroku main
```

### 2. Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

### 3. Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### 4. DigitalOcean App Platform
1. Connect your GitHub repository
2. Set environment variables in the dashboard
3. Deploy automatically on push

## 🔧 Environment Configuration

### Required Environment Variables
```env
PORT=3000
NODE_ENV=production
DSE_BASE_URL=https://dsebd.org
```

### Optional Environment Variables
```env
ALLOWED_ORIGINS=*
API_RATE_LIMIT=100
API_TIMEOUT=30000
LOG_LEVEL=info
```

## 🧪 Testing

### Manual Testing
Use the provided test files:
- `api-test.http` - For REST Client extension
- `test-api.js` - Node.js test script

```bash
# Run comprehensive tests
node test-api.js

# Test against different URL
node test-api.js https://your-api-domain.com
```

### API Response Format
All API responses follow this structure:
```json
{
  "success": true,
  "data": [...],
  "message": "Description of the response"
}
```

### Error Response Format
```json
{
  "success": false,
  "message": "Error description",
  "statusCode": 400
}
```

## 📊 Monitoring

### Health Check
- Endpoint: `GET /health`
- Returns server status, uptime, and environment info

### Performance Monitoring
- Monitor response times for data-heavy endpoints
- Set up alerts for API downtime
- Track error rates and response codes

## 🔒 Security Considerations

### Production Checklist
- [ ] Set specific CORS origins (not `*`)
- [ ] Implement rate limiting
- [ ] Add API key authentication if needed
- [ ] Use HTTPS in production
- [ ] Monitor for unusual traffic patterns
- [ ] Keep dependencies updated

### Rate Limiting (Optional)
Add rate limiting middleware:
```bash
npm install express-rate-limit
```

## 🚨 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Kill process on port 3000
   npx kill-port 3000
   ```

2. **TypeScript compilation errors**
   ```bash
   # Clean build
   rm -rf dist/
   npm run build
   ```

3. **API not responding**
   - Check if DSE website is accessible
   - Verify environment variables
   - Check server logs

### Logs
```bash
# View application logs
npm run docker:logs

# Or check container logs
docker logs <container-id>
```

## 📈 Scaling

### Horizontal Scaling
- Use load balancer (nginx, HAProxy)
- Deploy multiple instances
- Implement caching (Redis)

### Vertical Scaling
- Increase memory allocation
- Optimize Node.js heap size
- Use clustering

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy API
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run test:api
      # Add deployment steps here
```

## 📞 Support

For issues and questions:
1. Check the troubleshooting section
2. Review API logs
3. Test with the provided test scripts
4. Verify environment configuration

---

**Happy Deploying! 🚀**