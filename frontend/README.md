# Library System - Frontend

Modern React + Vite frontend for Library System with multi-page routing.

## Features

- 🎨 Beautiful UI with gradient design
- 📚 Browse books with details view
- ➕ Add new books
- 👥 View user profiles
- 🏠 Home page with features overview
- 📱 Responsive design
- ⚡ Fast Vite dev server

## Setup

```powershell
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173/`

## Pages

- **Home** (`/`) - Overview and features
- **Browse Books** (`/browse`) - List and detail view
- **Add Book** (`/add-book`) - Create new books
- **Profile** (`/profile`) - View users

## API Integration

Frontend calls backend at `http://localhost:5000` by default.
Override with `VITE_API_BASE` environment variable.
