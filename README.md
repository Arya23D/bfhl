# BFHL Assignment

This project consists of a backend API built with Express.js and a frontend application built with Next.js, TypeScript, and Tailwind CSS.

## Live Deployment URLs

- Backend URL: https://bfhl-brown.vercel.app/
- Frontend URL: https://bfhl-zrmk.vercel.app/

## Project Structure

The project is divided into two main parts:
- Backend (Express.js API)
- Frontend (Next.js Application)

## Backend Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)

### Development Steps

1. Clone the repository and navigate to the backend directory:
```bash
git clone <repository-url>
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend root directory:
```env
PORT=4000
USER_ID=john_doe_17091999
EMAIL=john@xyz.com
ROLL_NUMBER=22BCS10915
```

4. Start the development server:
```bash
npm run dev
```

The backend server will start at http://localhost:4000

### API Endpoints

- GET `/bfhl`: Returns operation code
- POST `/bfhl`: Processes array data and returns filtered results

## Frontend Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)

### Development Steps

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the frontend root directory:
```env
NEXT_PUBLIC_API_URL=https://bfhl-brown.vercel.app/bfhl
```

4. Start the development server:
```bash
npm run dev
```

The frontend application will start at http://localhost:3000

## Testing the Application

1. Open the frontend application in your browser
2. Enter a JSON input in the format:
```json
{
  "data": ["M", "1", "334", "4", "B"]
}
```
3. Click Submit
4. Use the multi-select filter to view different parts of the response

## Deployment

Both frontend and backend are deployed on Vercel:

### Backend Deployment
- Platform: Vercel
- Environment Variables Required:
  - PORT
  - USER_ID
  - EMAIL
  - ROLL_NUMBER

### Frontend Deployment
- Platform: Vercel
- Environment Variables Required:
  - NEXT_PUBLIC_API_URL

## Built With

Backend:
- Express.js
- Node.js
- CORS
- dotenv

Frontend:
- Next.js
- TypeScript
- Tailwind CSS
- React

## Additional Notes

- Make sure all environment variables are properly set before running the application
