#!/usr/bin/env node

/**
 * Bangladesh Stock Market API Test Script
 * Run this script to test all API endpoints
 * Usage: node test-api.js [base-url]
 */

const axios = require('axios');

// Configuration
const BASE_URL = process.argv[2] || 'http://localhost:3000';
const API_VERSION = 'v1';

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

// Test results tracking
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

// Helper function to log with colors
function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

// Helper function to make API requests
async function makeRequest(method, endpoint, expectedStatus = 200, params = {}) {
  totalTests++;
  const url = `${BASE_URL}${endpoint}`;
  
  try {
    log(`\n${colors.blue}Testing: ${method} ${endpoint}${colors.reset}`);
    
    const config = {
      method,
      url,
      params,
      timeout: 10000
    };

    const response = await axios(config);
    
    if (response.status === expectedStatus) {
      passedTests++;
      log(`✅ PASS - Status: ${response.status}`, colors.green);
      
      // Log response data info
      if (response.data) {
        if (response.data.data && Array.isArray(response.data.data)) {
          log(`   📊 Data: ${response.data.data.length} records`, colors.blue);
        }
        if (response.data.message) {
          log(`   💬 Message: ${response.data.message}`, colors.blue);
        }
      }
      
      return response.data;
    } else {
      failedTests++;
      log(`❌ FAIL - Expected: ${expectedStatus}, Got: ${response.status}`, colors.red);
      return null;
    }
  } catch (error) {
    if (error.response && error.response.status === expectedStatus) {
      passedTests++;
      log(`✅ PASS - Expected error status: ${error.response.status}`, colors.green);
      return error.response.data;
    } else {
      failedTests++;
      log(`❌ FAIL - ${error.message}`, colors.red);
      if (error.response) {
        log(`   Status: ${error.response.status}`, colors.red);
        log(`   Data: ${JSON.stringify(error.response.data, null, 2)}`, colors.red);
      }
      return null;
    }
  }
}

// Main test function
async function runTests() {
  log(`${colors.bold}🚀 Starting Bangladesh Stock Market API Tests${colors.reset}`);
  log(`${colors.blue}Base URL: ${BASE_URL}${colors.reset}`);
  log(`${colors.blue}API Version: ${API_VERSION}${colors.reset}`);
  
  // Test 1: Health Check
  await makeRequest('GET', '/health');
  
  // Test 2: Root Documentation
  await makeRequest('GET', '/');
  
  // Test 3: Hello Endpoint
  await makeRequest('GET', `/${API_VERSION}/dse/hello`);
  
  // Test 4: API Status
  await makeRequest('GET', `/${API_VERSION}/dse/status`);
  
  // Test 5: Latest Stock Data
  await makeRequest('GET', `/${API_VERSION}/dse/latest`);
  
  // Test 6: DSEX Data (All)
  await makeRequest('GET', `/${API_VERSION}/dse/dsexdata`);
  
  // Test 7: DSEX Data with Symbol Filter
  await makeRequest('GET', `/${API_VERSION}/dse/dsexdata`, 200, { symbol: 'BEXIMCO' });
  
  // Test 8: Top 30 Stocks
  await makeRequest('GET', `/${API_VERSION}/dse/top30`);
  
  // Test 9: Historical Data (Valid)
  const startDate = '2024-01-01';
  const endDate = '2024-01-07';
  await makeRequest('GET', `/${API_VERSION}/dse/historical`, 200, {
    start: startDate,
    end: endDate
  });
  
  // Test 10: Historical Data with Specific Code
  await makeRequest('GET', `/${API_VERSION}/dse/historical`, 200, {
    start: startDate,
    end: endDate,
    code: 'BEXIMCO'
  });
  
  // Test 11: Invalid Endpoint (404)
  await makeRequest('GET', '/invalid-endpoint', 404);
  
  // Test 12: Historical Data Missing Parameters (400)
  await makeRequest('GET', `/${API_VERSION}/dse/historical`, 400, {
    start: startDate
  });
  
  // Test 13: Historical Data Invalid Date Format (400)
  await makeRequest('GET', `/${API_VERSION}/dse/historical`, 400, {
    start: 'invalid-date',
    end: endDate
  });
  
  // Test 14: Historical Data Start After End (400)
  await makeRequest('GET', `/${API_VERSION}/dse/historical`, 400, {
    start: '2024-01-07',
    end: '2024-01-01'
  });
  
  // Test Summary
  log(`\n${colors.bold}📊 Test Summary:${colors.reset}`);
  log(`Total Tests: ${totalTests}`);
  log(`Passed: ${passedTests}`, colors.green);
  log(`Failed: ${failedTests}`, failedTests > 0 ? colors.red : colors.green);
  log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`, 
      passedTests === totalTests ? colors.green : colors.yellow);
  
  if (failedTests === 0) {
    log(`\n🎉 All tests passed! Your API is ready for deployment.`, colors.green);
  } else {
    log(`\n⚠️  Some tests failed. Please check the API implementation.`, colors.yellow);
  }
}

// Performance test function
async function performanceTest() {
  log(`\n${colors.bold}⚡ Running Performance Tests${colors.reset}`);
  
  const endpoints = [
    `/${API_VERSION}/dse/latest`,
    `/${API_VERSION}/dse/top30`,
    `/${API_VERSION}/dse/dsexdata`
  ];
  
  for (const endpoint of endpoints) {
    const startTime = Date.now();
    try {
      await axios.get(`${BASE_URL}${endpoint}`, { timeout: 30000 });
      const duration = Date.now() - startTime;
      log(`${endpoint}: ${duration}ms`, duration < 5000 ? colors.green : colors.yellow);
    } catch (error) {
      log(`${endpoint}: Failed - ${error.message}`, colors.red);
    }
  }
}

// Run tests
async function main() {
  try {
    await runTests();
    await performanceTest();
  } catch (error) {
    log(`\n❌ Test execution failed: ${error.message}`, colors.red);
    process.exit(1);
  }
}

// Handle command line arguments
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
Bangladesh Stock Market API Test Script

Usage: node test-api.js [base-url]

Options:
  base-url    Base URL of the API (default: http://localhost:3000)
  --help, -h  Show this help message

Examples:
  node test-api.js
  node test-api.js http://localhost:3000
  node test-api.js https://your-api-domain.com
  `);
  process.exit(0);
}

main();