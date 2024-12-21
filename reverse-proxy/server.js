const express = require('express');
const httpProxy = require('http-proxy-middleware');

const app = express();

// Proxy requests to the frontend
app.use('/', httpProxy.createProxyMiddleware({
    target: 'http://frontend:3000',
    changeOrigin: true,
    logLevel: 'debug',
}));

// Proxy requests to the backend
app.use('/api', httpProxy.createProxyMiddleware({
    target: 'http://backend:8000',
    changeOrigin: true,
    logLevel: 'debug',
}));

// Start the server
app.listen(80, () => {
    console.log('Proxy server running on port 80');
});
