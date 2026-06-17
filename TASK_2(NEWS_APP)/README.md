# 📰 News App - Full Stack Application

A modern, full-stack news aggregator and blog platform built with React, Express, MongoDB, and Appwrite.

## 🚀 Features

### User Features

- ✅ User authentication (Sign up, Sign in, Sign out)
- ✅ Profile management with Appwrite image uploads
- ✅ Create, read, update, and delete blog posts
- ✅ Rich text editor for post content
- ✅ Search and filter posts by category, keywords
- ✅ Browse external news from Mediastack API
- ✅ Responsive UI with modern design

### Admin Features

- ✅ Manage all posts from dashboard
- ✅ View post analytics and statistics

## 🛠️ Tech Stack

### Frontend

- **React 19** - UI framework
- **Vite** - Build tool
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Shadcn UI** - UI components
- **React Quill** - Rich text editor
- **Appwrite** - Cloud storage for images

### Backend

- **Express.js** - Server framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Mediastack API** - External news feed

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB)
- Appwrite account ([cloud.appwrite.io](https://cloud.appwrite.io))
- Mediastack API key ([mediastack.com](https://mediastack.com))

### 1. Clone the repository

```bash
cd TASK_2(NEWS_APP)
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173
MEDIASTACK_API_KEY=your_mediastack_api_key
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory:

```env
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_STORAGE_ID=your_storage_bucket_id
VITE_APPWRITE_PROJECT_NAME=NewsApp
VITE_APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
VITE_APPWRITE_BUCKET_NAME=NewsApp-Bucket
VITE_MEDIASTACK_API_KEY=your_mediastack_api_key
```

### 4. Appwrite Setup

Follow the guide in `APPWRITE_SETUP_GUIDE.md` to:

1. Create a project on Appwrite
2. Create a storage bucket
3. Set permissions to allow public read access

## 🚀 Running the Application

### Development Mode

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

Server runs on: http://localhost:5000

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

Client runs on: http://localhost:5173

### Using Docker Compose (Optional)

```bash
docker-compose up
```

This will start:

- MongoDB database
- Mongo Express (DB GUI)
- Backend API
- Frontend dev server

## 📁 Project Structure

```
TASK_2(NEWS_APP)/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── models/          # Database schemas
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Helper functions
│   │   └── server.js        # Entry point
│   ├── .env                 # Environment variables
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── auth/            # Auth components
│   │   ├── components/      # Reusable components
│   │   ├── lib/             # Utilities and configs
│   │   ├── pages/           # Page components
│   │   ├── redux/           # State management
│   │   ├── App.jsx          # Root component
│   │   └── main.jsx         # Entry point
│   ├── .env                 # Environment variables
│   └── package.json
└── docker-compose.yml
```

## 🔑 API Endpoints

### Authentication

- `POST /api/auth/sign-up` - Register new user
- `POST /api/auth/sign-in` - Login user

### Users

- `PUT /api/user/update/:userId` - Update profile
- `DELETE /api/user/delete/:userId` - Delete account
- `POST /api/user/signout` - Logout

### Posts

- `POST /api/post/create` - Create post (authenticated)
- `GET /api/post/getposts` - Get posts with filters
- `PUT /api/post/updatepost/:postId/:userId` - Update post
- `DELETE /api/post/deletepost/:postId/:userId` - Delete post

### News

- `GET /api/news/latest` - Fetch external news

## 🎨 Key Features Explained

### Authentication Flow

1. User signs up with email/password
2. Password is hashed with bcrypt
3. JWT token stored in httpOnly cookie
4. Redux stores user data with persistence

### Post Management

1. Create posts with rich text editor
2. Upload images to Appwrite storage
3. Edit or delete your own posts
4. Search posts by title, content, category

### External News Integration

- Backend proxies requests to Mediastack API
- Filters news by category
- Displays latest news articles

## 🔧 Configuration

### Adding an Admin User

Manually set `isAdmin: true` in MongoDB for a user document to grant admin privileges.

### Changing Post Categories

Edit the categories in:

- `frontend/src/pages/CreatePost.jsx`
- `frontend/src/pages/UpdatePost.jsx`
- `frontend/src/components/Search.jsx`

## 🐛 Troubleshooting

### Images not loading

- Check Appwrite bucket permissions (see `APPWRITE_SETUP_GUIDE.md`)
- Ensure permissions include `Permission.read(Role.any())`

### CORS errors

- Verify `CLIENT_URL` in backend `.env` matches frontend URL
- Check CORS configuration in `backend/src/server.js`

### Database connection failed

- Verify MongoDB URI is correct
- Check MongoDB Atlas network access allows your IP
- Ensure database user has proper permissions

### News API not working

- Verify `MEDIASTACK_API_KEY` is set in both `.env` files
- Check API key validity and quota on Mediastack dashboard

## 📝 Environment Variables Summary

### Backend Required

- `PORT` - Server port (default: 5000)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT signing
- `CLIENT_URL` - Frontend URL for CORS
- `MEDIASTACK_API_KEY` - News API key

### Frontend Required

- `VITE_APPWRITE_PROJECT_ID` - Appwrite project ID
- `VITE_APPWRITE_STORAGE_ID` - Storage bucket ID
- `VITE_APPWRITE_ENDPOINT` - Appwrite endpoint URL
- `VITE_MEDIASTACK_API_KEY` - News API key

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues and questions, please create an issue in the repository.

---

**Built with ❤️ using React, Express, MongoDB, and Appwrite**
