# Blog-Post
This is a blog post built with MERN stack.

## Tech Stack
- ReactJs (Typescript)
- NodeJs (Using Express)
- MongoDB (Either on local machine or Mongodb Atlas)

## Installation

- `git clone https://github.com/Sun-Deep/Blog-Post.git`

### For Client

- Navigate into client folder
- `npm install`
- `npm start`

### For Server

- Navigate into server folder
- Set Environemnt variable .env file
  - JWT_SECRET
  - MONGODB_URI
  
 Otherwise it will take fallback value from `src/config/config.js`
 - `npm install`
 - `npm run dev:start` for running in development mode
