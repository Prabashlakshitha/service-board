GlobalTNA — Mini Service Request Board
A full-stack web application where homeowners can post trade service requests and tradespeople can browse, view, and manage them.
Built as part of the GlobalTNA Full-Stack Developer Intern Technical Assessment.


Tech Stack
Layer   Technology
Frontend  Next.js 14 (App Router)
Backend   Node.js + Express
Database  MongoDB Atlas (free tier)
ODM    Mongoose
Styling  Tailwind CSS


mini_service/
├── frontend/          ← Next.js app (port 3000)
└── backend/           ← Express API (port 5000)

Backend — create backend/.env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/globaltna?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:3000

Variable    Description
MONGO_URI     Your MongoDB Atlas connection string. Replace <username> and <password> with your Atlas credentials.
PORT         Port the Express server runs on. Default is 5000.
NODE_ENV     Set to development locally, production when deployed.
CLIENT_ORIGIN   URL of your frontend. Default is http://localhost:3000.


Frontend — create frontend/.env.local

NEXT_PUBLIC_API_URL=http://localhost:5000

Variable  Description

NEXT_PUBLIC_API_URL     Base URL of your Express backend. Change this to your deployed backend URL when deploying.  


Make sure you have these installed before starting:

Node.js v18 or later
npm v9 or later
A free MongoDB Atlas account


Set up MongoDB Atlas

Go to mongodb.com/atlas and sign in
Create a free M0 cluster
Create a database user with a username and password
Under Network Access, add your IP address (or 0.0.0.0/0 to allow all)
Click Connect → Drivers → Node.js and copy your connection string
Replace <password> in the string with your actual password
Add /globaltna before the ? — this sets the database name

mongodb+srv://yourusername:yourpassword@cluster0.ab1cd.mongodb.net/globaltna?retryWrites=true&w=majority


Set up the backend

cd backend
npm install
cp .env.example .env

Open backend/.env and paste your MongoDB connection string as MONGO_URI.

 Seed the database (optional but recommended)
This inserts 10 sample job requests so you can test the app immediately:

npm run seed

Set up the frontend

cd ../frontend
npm install
cp .env.local.example .env.local

The default value in .env.local points to http://localhost:5000 which is correct for local development.

Terminal 1 — Start the backend

cd backend
npm run dev

Terminal 2 — Start the frontend
cd frontend
npm run dev

expected outcome:
▲ Next.js 14
- Local: http://localhost:3000

API Reference
Base URL: http://localhost:5000

Method  Endpoint         Description
GET    /api/jobsList      all jobs. Supports ?category=Plumbing, ?status=Open, ?search=keyword
GET   /api/jobs/:id       Fetch a single job by ID
POST     /api/jobs        Create a new job request
PATCH   /api/jobs/:id     Update job status only (Open, In Progress, Closed)
DELETE  /api/jobs/:id     Delete a job request

Features

Browse all service requests with live search, category filter, and status filter
Post a new service request with client-side validation
View full job details and update status (Open → In Progress → Closed)
Delete a job request with confirmation dialog
Skeleton loading states and empty/error states throughout
Keyword search across job title and description 
10 sample jobs via seed script (bonus)


