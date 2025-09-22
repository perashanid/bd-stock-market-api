# 🇧🇩 Bangladesh Stock Market API

An unofficial REST API that provides real-time and historical data from the Dhaka Stock Exchange (DSE). This API crawls data from dsebd.org and serves it in a clean, structured JSON format.

## 🚀 Live API

**Base URL:** https://bd-stock-market-api.onrender.com

## ✨ Features

- [x] Real-time stock data from Dhaka Stock Exchange
- [x] Historical data with date range queries
- [x] Top 30 performing stocks
- [x] DSEX index data
- [x] RESTful JSON API
- [x] CORS enabled
- [x] Health monitoring
- [ ] Chittagong Stock Exchange
- [ ] Database persistence
- [ ] Rate limiting
- [ ] Authentication
## 🔗 Quick Links

### 🏥 Health & Status
- [Health Check](https://bd-stock-market-api.onrender.com/health) - Check if API is running
- [API Status](https://bd-stock-market-api.onrender.com/v1/dse/status) - Detailed API information
- [Hello Endpoint](https://bd-stock-market-api.onrender.com/v1/dse/hello) - Simple greeting
- [API Info](https://bd-stock-market-api.onrender.com/api-info) - JSON API documentation

### 📊 Stock Data
- [Latest Stock Data](https://bd-stock-market-api.onrender.com/v1/dse/latest) - Current market data
- [Top 30 Stocks](https://bd-stock-market-api.onrender.com/v1/dse/top30) - Best performing stocks
- [All DSEX Data](https://bd-stock-market-api.onrender.com/v1/dse/dsexdata) - Complete DSEX index
- [DSEX for BEXIMCO](https://bd-stock-market-api.onrender.com/v1/dse/dsexdata?symbol=BEXIMCO) - Specific symbol data

### 📅 Historical Data
- [Sample Historical Data](https://bd-stock-market-api.onrender.com/v1/dse/historical?start=2024-01-01&end=2024-01-07) - Date range query
- [Historical with Code](https://bd-stock-market-api.onrender.com/v1/dse/historical?start=2024-01-01&end=2024-01-07&code=BEXIMCO) - Specific instrument

### 📖 Documentation
- [Interactive Documentation](https://bd-stock-market-api.onrender.com/) - Web interface with test buttons

## 📋 API Endpoints

### 1. Latest Stock Data
```
GET /v1/dse/latest
```
**Description:** Retrieves the latest stock market data from DSE  
**Parameters:** None  
**Example:** https://bd-stock-market-api.onrender.com/v1/dse/latest

### 2. Top 30 Stocks
```
GET /v1/dse/top30
```
**Description:** Get the top 30 performing stocks  
**Parameters:** None  
**Example:** https://bd-stock-market-api.onrender.com/v1/dse/top30

### 3. DSEX Data
```
GET /v1/dse/dsexdata
```
**Description:** Fetch DSEX (Dhaka Stock Exchange) index data  
**Optional Parameters:**
- `symbol` (string): Filter data for a specific stock symbol  

**Examples:**
- All DSEX data: https://bd-stock-market-api.onrender.com/v1/dse/dsexdata
- Specific symbol: https://bd-stock-market-api.onrender.com/v1/dse/dsexdata?symbol=BEXIMCO

### 4. Historical Stock Data
```
GET /v1/dse/historical
```
**Description:** Get historical stock data for a date range  
**Required Parameters:**
- `start` (string): Start date (YYYY-MM-DD format)
- `end` (string): End date (YYYY-MM-DD format)  
- `code` (string, optional): Specific instrument code (default: "All Instrument")

**Examples:**
- Date range: https://bd-stock-market-api.onrender.com/v1/dse/historical?start=2024-01-01&end=2024-01-07
- With specific code: https://bd-stock-market-api.onrender.com/v1/dse/historical?start=2024-01-01&end=2024-01-07&code=BEXIMCO

### 5. Health Check
```
GET /health
```
**Description:** Check API health and uptime  
**Example:** https://bd-stock-market-api.onrender.com/health

### 6. API Status
```
GET /v1/dse/status
```
**Description:** Get comprehensive API status and endpoint information  
**Example:** https://bd-stock-market-api.onrender.com/v1/dse/status
  

## Data Fields Description

- `TRADING CODE`: The unique identifier of the stock in the market.
- `LTP*` (Last Traded Price): **The Current Score** - The latest price at which the stock was traded.
- `HIGH`:  The highest price at which the stock traded for the day.
- `LOW`: The lowest price for the stock in the day.
- `CLOSEP*` (Closing Price): The price at which the stock ended the trading day.
- `YCP*` (Yesterday's Closing Price)
- `CHANGE`: How much the stock has gained or lost compared to the previous day.
- `TRADE`: Total number of trades for the stock.
- `VALUE (mn)`: Total monetary value of all trades in millions.
- `VOLUME`: The total number of shares that were traded.


## 🛠️ Usage Examples

### Using curl
```bash
# Get latest stock data
curl https://bd-stock-market-api.onrender.com/v1/dse/latest

# Get top 30 stocks
curl https://bd-stock-market-api.onrender.com/v1/dse/top30

# Get historical data
curl "https://bd-stock-market-api.onrender.com/v1/dse/historical?start=2024-01-01&end=2024-01-07"

# Health check
curl https://bd-stock-market-api.onrender.com/health
```

### Using JavaScript/Fetch
```javascript
// Get latest stock data
const response = await fetch('https://bd-stock-market-api.onrender.com/v1/dse/latest');
const data = await response.json();
console.log(data);

// Get specific symbol data
const symbolData = await fetch('https://bd-stock-market-api.onrender.com/v1/dse/dsexdata?symbol=BEXIMCO');
const result = await symbolData.json();
console.log(result);
```

### Using Python
```python
import requests

# Get latest stock data
response = requests.get('https://bd-stock-market-api.onrender.com/v1/dse/latest')
data = response.json()
print(data)

# Get historical data
params = {
    'start': '2024-01-01',
    'end': '2024-01-07',
    'code': 'BEXIMCO'
}
historical = requests.get('https://bd-stock-market-api.onrender.com/v1/dse/historical', params=params)
print(historical.json())
```

## 📊 Response Format

All endpoints return JSON responses in the following format:

```json
{
  "success": true,
  "message": "Retrieved 100 latest stock records",
  "data": [
    {
      "TRADING CODE": "BEXIMCO",
      "LTP*": "15.50",
      "HIGH": "16.00",
      "LOW": "15.20",
      "CLOSEP*": "15.40",
      "YCP*": "15.30",
      "CHANGE": "0.20",
      "TRADE": "1250",
      "VALUE (mn)": "19.375",
      "VOLUME": "125000"
    }
  ],
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🚀 Local Development

### Prerequisites
- Node.js >= 18.0.0
- npm >= 8.0.0

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd bd-stock-api

# Install dependencies
npm install

# Create environment file (optional for local development)
# Environment variables will be set by deployment platform

# Build the project
npm run build

# Start development server
npm run dev

# Start production server
npm start
```

### Environment Variables
```env
PORT=3000
NODE_ENV=production
DSE_BASE_URL=https://dsebd.org
ALLOWED_ORIGINS=*
```

## 🌐 Deployment

This API is deployed on [Render](https://render.com) and automatically builds from the main branch.

**Live URL:** https://bd-stock-market-api.onrender.com

## ⚠️ Important Notes

- This is an **unofficial API** that scrapes data from dsebd.org
- Data availability depends on the source website
- Use responsibly and respect rate limits
- For production use, consider implementing caching and error handling
- No authentication required, but please don't abuse the service

## 🐛 Issues & Support

If you encounter any issues or the data is not coming through properly, please:
1. Check the [health endpoint](https://bd-stock-market-api.onrender.com/health) first
2. Try the [API status endpoint](https://bd-stock-market-api.onrender.com/v1/dse/status)
3. Report issues on the GitHub repository

## 📄 License

This project is for educational and development purposes only. Please respect the terms of service of the data source (dsebd.org).

---

**Made with ❤️ for the Bangladesh developer community**