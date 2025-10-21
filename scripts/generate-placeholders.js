const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Create public/images directory if it doesn't exist
const imagesDir = path.join(__dirname, '../public/images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Product images to generate
const images = [
  'diya-set.jpg',
  'rangoli-stencil.jpg',
  'silk-saree.jpg',
  'mithai-box.jpg',
  'pooja-thali.jpg',
  'led-lights.jpg',
  'diwali-bg.jpg',
  'diwali-pattern.jpg'
];

// Colors for the placeholders
const colors = [
  '#f59e0b', // amber-500
  '#ef4444', // red-500
  '#3b82f6', // blue-500
  '#10b981', // emerald-500
  '#8b5cf6', // violet-500
  '#ec4899', // pink-500
  '#14b8a6', // teal-500
  '#f97316'  // orange-500
];

// Generate each image
images.forEach((imageName, index) => {
  const width = 800;
  const height = 600;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Background color
  const colorIndex = index % colors.length;
  ctx.fillStyle = colors[colorIndex] + '40'; // Add some transparency
  ctx.fillRect(0, 0, width, height);
  
  // Text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 30px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Product name (filename without extension)
  const productName = imageName.split('.')[0].replace(/-/g, ' ');
  ctx.fillText(productName.toUpperCase(), width / 2, height / 2);
  
  // Add some decorative elements
  ctx.strokeStyle = '#ffffff80';
  ctx.lineWidth = 2;
  ctx.strokeRect(50, 50, width - 100, height - 100);
  
  // Save the image
  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(path.join(imagesDir, imageName), buffer);
});

console.log(`Generated ${images.length} placeholder images in ${imagesDir}`);
