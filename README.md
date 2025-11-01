# Lunex/flux-1-schnell-txt2img

![Group 10](https://github.com/user-attachments/assets/4331475a-18b2-428c-8064-c0693c10577a)

A modern, chat-based text-to-image generation application powered by FLUX.1 Schnell. Generate stunning AI images through an intuitive conversational interface, similar to ChatGPT but for image creation.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.x-61dafb.svg)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-47A248.svg)](https://www.mongodb.com/)

## Features

- Chat-Based Interface: Conversational UI similar to ChatGPT for natural interaction
- Lightning Fast: Powered by FLUX.1 Schnell for rapid image generation
- Multiple Images: Generate multiple images simultaneously from a single prompt
- High Resolution: Support for high-resolution image outputs
- Smart Storage: Images automatically stored for 7 days with auto-cleanup
- Responsive Design: Beautiful dark-themed interface that works on all devices
- User Management: Individual user accounts with conversation history
- Real-time Generation: See your images appear as they're generated

## Interfaces

<img width="1622" height="963" alt="Screenshot 2025-10-29 232928" src="https://github.com/user-attachments/assets/4f989338-3d7b-4a03-8d85-c30540d94359" />
<img width="1642" height="981" alt="Screenshot 2025-10-29 230909" src="https://github.com/user-attachments/assets/f22e24b1-6bf5-44dd-be68-3529ba2078b0" />
<img width="1650" height="975" alt="Screenshot 2025-10-29 231001" src="https://github.com/user-attachments/assets/5a3a4a53-a17c-43b5-8416-de03472d2557" />
<img width="1622" height="969" alt="Screenshot 2025-10-29 232750" src="https://github.com/user-attachments/assets/798cfd64-fd81-467a-9701-2f4cf4c963eb" />
<img width="1633" height="979" alt="Screenshot 2025-10-29 232901" src="https://github.com/user-attachments/assets/2a53d5e5-85c5-4f7f-9042-b2b71c87da42" />

## Tech Stack

### Frontend

- React.js 18.x - Modern UI library
- React Router - Navigation and routing
- Axios - HTTP client for API requests
- CSS3 - Custom styling with dark theme

### Backend

- Express.js - Fast, minimalist web framework
- MongoDB - NoSQL database for flexible data storage
- Mongoose - MongoDB object modeling
- Node.js - JavaScript runtime

### AI Model

- FLUX.1 Schnell - State-of-the-art text-to-image model via API

## Project Structure

```
lunex/
├── node_modules/
├── public/
├── server/
│   ├── models/
│   ├── node_modules/
│   ├── validation/
│   ├── .env
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
├── src/
│   ├── app/
│   │   ├── error-pages/
│   │   ├── MainScreen.js
│   │   ├── SplashScreen.js
│   │   └── style.css
│   ├── assets/
│   │   └── logo.svg
│   ├── components/
│   │   ├── Alert.jsx
│   │   ├── Message.jsx
│   │   ├── PreviewImage.jsx
│   │   ├── PromptBox.jsx
│   │   ├── PromptHistory.jsx
│   │   ├── Response.jsx
│   │   ├── Skeleton.jsx
│   │   └── UserInformationDropDown.jsx
│   ├── models/
│   ├── App.js
│   └── index.js
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- MongoDB 6.x or higher
- FLUX.1 Schnell API key
- npm or yarn package manager

### Installation

1. Clone the repository

```bash
git clone https://github.com/DilshanX09/lunex-flux-1-schnell-txt2img
cd lunex-flux-1-schnell-txt2img
```

2. Install backend dependencies

```bash
cd server
npm install
```

3. Install frontend dependencies

```bash
npm install
```

4. Configure environment variables

Create `.env` file in the `server` directory:

```env

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/lunex
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lunex

# FLUX API Configuration
FLUX_API_KEY=your_flux_api_key_here
FLUX_API_URL=https://api.flux.ai/v1/generate

# Image Storage
IMAGE_EXPIRY_DAYS=7
```

5. Start MongoDB

```bash
# If using local MongoDB
mongod
```

6. Run the application

Backend:

```bash
cd server
npm start
```

Frontend (in a new terminal):

```bash
npm start
```

The application will be available at `http://localhost:3000`

## Usage

### Creating Images

1. Start a New Chat: Click "Create new image" or start typing in the prompt box
2. Enter Your Prompt: Type a detailed description of the image you want to generate
3. Generate: Hit Enter or click the generate button
4. View Results: Images will appear in the chat interface as they're generated
5. Download: Click the download button on any image to save it locally

### Chat History

- All your conversations are automatically saved
- Access previous chats from the prompt history
- Continue generating images in any conversation thread

## Components Overview

### Frontend Components

- **Alert.jsx**: Notification and alert messages
- **Message.jsx**: Chat message display component
- **PreviewImage.jsx**: Image preview and modal component
- **PromptBox.jsx**: Input area for text prompts
- **PromptHistory.jsx**: Sidebar showing previous conversations
- **Response.jsx**: AI response display component
- **Skeleton.jsx**: Loading placeholder component
- **UserInformationDropDown.jsx**: User menu and settings dropdown

### Main Screens

- **MainScreen.js**: Primary application interface
- **SplashScreen.js**: Loading screen on app startup

## Configuration

### Image Cleanup

Images are automatically cleaned up after 7 days. The cleanup job runs daily to remove expired images from both the database and storage.

## Database Schema

### User Collection

```javascript
{
     userId: {
          type: String,
          required: true,
          unique: true
     },
     username: {
          type: String,
          required: true,
          unique: true,
          minlength: 3,
          maxlength: 30,
          trim: true,
     },
     email: {
          type: String,
          required: true,
          unique: true,
          lowercase: true,
          trim: true,
          match: /.+\@.+\..+/
     },
     password: {
          type: String,
          required: true,
          minlength: 6,
          select: false,
     },
     createdAt: {
          type: Date,
          default: Date.now
     }
}
```

### Conversation Collection

```javascript
{
     conversationId: { type: String, required: true },
     userId: { type: String },
     chatId: { type: String, required: true },
     prompt: { type: String, required: true },
     images: [String],
     imagesNeeded: { type: Number, default: 1 },
     resolution: { type: String, default: '1024x1024' },
     imageEngine: { type: String, default: 'Flux-1' },
     createdAt: { type: Date, default: Date.now }
}
```

## Security Features

- Password hashing with bcrypt
- Input validation and sanitization
- Rate limiting on generation endpoints
- CORS configuration
- Environment variable protection

## Deployment

### Frontend (Vercel/Netlify)

```bash
npm run build
# Deploy the 'build' folder to your hosting platform
```

### Backend (Railway/Heroku/DigitalOcean)

```bash
cd server
# Set environment variables in your hosting platform
# Deploy with Node.js runtime
```

### MongoDB Atlas

1. Create a free cluster at MongoDB Atlas
2. Update `MONGODB_URI` in your environment variables
3. Whitelist your server's IP address or use 0.0.0.0/0 for all IPs

## Environment Variables

### Server (.env in /server)

```
MONGODB_URI=your_mongodb_connection_string
FLUX_API_KEY=your_flux_api_key
IMAGE_EXPIRY_DAYS=7
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Common Issues

**MongoDB Connection Failed**

- Ensure MongoDB is running locally or check your Atlas connection string
- Verify network access in MongoDB Atlas settings

**API Key Invalid**

- Check your FLUX API key in the .env file
- Ensure the API key has proper permissions

**Images Not Loading**

- Check CORS settings in server.js
- Verify image URLs are accessible
- Check browser console for errors

Built by the ❤️ Chamod Dilshan
