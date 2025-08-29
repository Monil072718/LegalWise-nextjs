# MongoDB Atlas Setup Guide

## 1. Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new cluster (choose the free tier)

## 2. Configure Database Access

1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Create a username and password
4. Set privileges to "Read and write to any database"

## 3. Configure Network Access

1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Choose "Allow Access from Anywhere" (0.0.0.0/0) for development
4. For production, add only your server's IP address

## 4. Get Connection String

1. Go to "Clusters" and click "Connect"
2. Choose "Connect your application"
3. Select "Node.js" and version "4.1 or later"
4. Copy the connection string

## 5. Update Environment Variables

Replace the connection string in your `.env.local` file:

\`\`\`
DATABASE_URL="mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/lawgpt_db?retryWrites=true&w=majority"
\`\`\`

Replace:
- `username` with your database username
- `password` with your database password
- `cluster0.xxxxx.mongodb.net` with your actual cluster URL
- `lawgpt_db` with your preferred database name

## 6. Setup Database

Run the following commands:

\`\`\`bash
npm run setup
npm run db:seed
\`\`\`

## 7. Verify Setup

You can verify your setup by:
1. Running `npm run db:studio` to open Prisma Studio
2. Checking your MongoDB Atlas dashboard for data
\`\`\`

Create a database connection test utility:
