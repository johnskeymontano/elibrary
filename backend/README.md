# Backend (LibrarySystem)

Quick start:

1. Install dependencies

```
cd backend
npm install
```

2. Create a `.env` in `backend/` with:

```
MONGO_URI=mongodb://localhost:27017/librarydb
PORT=5000
```

3. Start MongoDB locally (example using Docker):

```
docker run -p 27017:27017 -d --name library-mongo mongo:6
```

4. Start the server in dev mode:

```
npm run dev
```

API endpoints:
- `GET /` - health check
- `GET /api/books` - list books
- `GET /api/users` - list users (dev)
- `POST /api/users` - create user (dev)
