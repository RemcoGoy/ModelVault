# ModelVault

![PyPI - Python Version](https://img.shields.io/pypi/pyversions/fastapi)
![Node Current](https://img.shields.io/node/v/react)
![NPM Version](https://img.shields.io/npm/v/react)


This 3D model management tool lays the foundation for efficient asset organization.  The project is under active development, with exciting features like advanced search and format conversion on the roadmap

## Running locally (for development)

### Backend

```bash
cd backend
uvicorn main:app [--reload]
```

### Frontend

```bash
cd frontend
npm run dev
```

## Running locally (Docker)

### Backend

```bash
cd backend
docker build -t modelvault-backend:latest .
docker run -d -p 8000:8000 modelvault-backend:latest
```

### Frontend

```bash
cd frontend
docker build -t modelvault-frontend:latest .
docker run -d -p 3000:3000 modelvault-frontend:latest
```