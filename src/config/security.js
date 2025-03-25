const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const csrf = require('csurf');
const hpp = require('hpp');
const xssClean = require('xss-clean');
const sanitizeHtml = require('sanitize-html');

// Rate limiting
const limiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW || 900000, // 15 minutes
  max: process.env.RATE_LIMIT || 100,
  message: 'Too many requests from this IP, please try again later'
});

// CORS options
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 // 24 hours
};

// Sanitize options
const sanitizeOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    '*': ['class', 'style']
  },
  allowedSchemes: ['http', 'https', 'mailto']
};

// Security middleware configuration
const securityConfig = (app) => {
  // Basic security headers
  app.use(helmet());

  // Rate limiting
  app.use(limiter);

  // CORS protection
  app.use(cors(corsOptions));

  // Prevent parameter pollution
  app.use(hpp());

  // XSS protection
  app.use(xssClean());

  // CSRF protection
  if (process.env.NODE_ENV === 'production') {
    app.use(csrf({ cookie: true }));
  }

  // Custom security middleware
  app.use((req, res, next) => {
    // Sanitize input data
    if (req.body) {
      Object.keys(req.body).forEach(key => {
        if (typeof req.body[key] === 'string') {
          req.body[key] = sanitizeHtml(req.body[key], sanitizeOptions);
        }
      });
    }
    
    // Add security headers
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    
    next();
  });

  // Error handler for CSRF
  app.use((err, req, res, next) => {
    if (err.code === 'EBADCSRFTOKEN') {
      return res.status(403).json({
        error: 'Invalid or missing CSRF token'
      });
    }
    next(err);
  });
};

module.exports = securityConfig;