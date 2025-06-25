import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

// ES Modules fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(cors({
 origin: ['http://localhost:5173', 'https://dosad.netlify.app'], // Replace with your Vite frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Initialize data files if they don't exist
const initFile = (fileName) => {
  const filePath = path.join(dataDir, fileName);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]', 'utf-8');
    console.log(`Created ${fileName}`);
  }
};

initFile('orders.json');
initFile('contacts.json');

// Helper function to save data
const saveData = (fileName, data) => {
  const filePath = path.join(dataDir, fileName);
  try {
    const existingData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const newData = [...existingData, data];
    fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));
    return true;
  } catch (error) {
    console.error(`Error saving to ${fileName}:`, error);
    return false;
  }
};

// API Endpoint: Save Order
app.post('/api/orders', (req, res) => {
  try {
    const orderData = {
      ...req.body,
      orderId: `DO${Date.now()}`,
      date: new Date().toISOString(),
      status: 'received'
    };

    const success = saveData('orders.json', orderData);
    
    if (success) {
      res.status(201).json({ 
        success: true,
        orderId: orderData.orderId
      });
    } else {
      throw new Error('Failed to save order');
    }
  } catch (error) {
    console.error('Order submission error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to process order'
    });
  }
});

// API Endpoint: Save Contact
app.post('/api/contacts', (req, res) => {
  try {
    const contactData = {
      ...req.body,
      id: `CT${Date.now()}`,
      date: new Date().toISOString(),
      status: 'unread'
    };

    // Basic validation
    if (!contactData.name || !contactData.email || !contactData.message) {
      return res.status(400).json({ 
        success: false,
        message: 'Missing required fields'
      });
    }

    const success = saveData('contacts.json', contactData);
    
    if (success) {
      res.status(201).json({ 
        success: true,
        message: 'Contact form submitted successfully'
      });
    } else {
      throw new Error('Failed to save contact');
    }
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to process contact form'
    });
  }
});

// API Endpoint: Get Orders (for admin)
app.get('/api/orders', (req, res) => {
  try {
    const orders = JSON.parse(fs.readFileSync(path.join(dataDir, 'orders.json'), 'utf-8'));
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load orders' });
  }
});

// API Endpoint: Get Contacts (for admin)
app.get('/api/contacts', (req, res) => {
  try {
    const contacts = JSON.parse(fs.readFileSync(path.join(dataDir, 'contacts.json'), 'utf-8'));
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load contacts' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API Endpoints:`);
  console.log(`- POST /api/orders`);
  console.log(`- POST /api/contacts`);
  console.log(`- GET /api/orders (admin)`);
  console.log(`- GET /api/contacts (admin)`);
});