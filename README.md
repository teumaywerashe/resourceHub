# ResourceHub

A full-stack web platform that connects students across Ethiopian universities. Users can explore universities, browse campuses and departments, access shared study materials, and stay updated with university news.

## Tech Stack

**Frontend**
- React 19 + Vite
- Tailwind CSS v4
- React Router DOM v7
- Axios
- React Hot Toast
- Lucide React / React Icons

**Backend**
- Node.js + Express 5
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt (password hashing)
- Multer (file uploads)

## Features

- Browse Ethiopian universities by region, generation, and city
- View campuses, departments, and programs per university
- Upload and access study resources (modules, exams, references)
- University news feed with categories
- Admin panel for managing universities, campuses, and content
- User authentication (register/login)

## Project Structure

```
resourcehub/
├── backend/
│   ├── config/         # Database connection
│   ├── controllers/    # Route handlers
│   ├── middleWares/    # Auth middleware
│   ├── models/         # Mongoose schemas
│   ├── routes/         # Express routers
│   ├── uploads/        # Uploaded files
│   └── server.js
└── frontend/
    ├── public/
    └── src/
        ├── asset/
        ├── components/
        ├── context/
        └── pages/
```

## Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB (Atlas or local)

### Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

```bash
npm start
```

Server runs on `http://localhost:3000`.

### Frontend

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:3000
```

```bash
npm run dev
```

## API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/POST | `/api/university` | List / add universities |
| GET/POST | `/api/campus` | List / add campuses |
| GET/POST | `/api/resources` | List / upload resources |
| GET/POST | `/api/news` | List / post news |
| POST | `/api/user/register` | Register user |
| POST | `/api/user/login` | Login user |
| POST | `/api/admin/login` | Admin login |

## Deployment

- Backend: [Render](https://render.com)
- Frontend: [Netlify](https://netlify.com) (with `public/_redirects` for SPA routing)
