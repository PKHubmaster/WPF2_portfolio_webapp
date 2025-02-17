# portfolio_web_app# lab-6-PKHubmaster PARMJIT KANTH

Name: PARMJIT KANTH
Date: February 7, 2025

Instructions:
==========================================================================================================
1) git clone https://github.com/2025-Winter-ITE-5425-0NA/lab-6-PKHubmaster.git
2) cd cd .\lab-6-PKHubmaster\
3) npm install
4) npm run dev
5) browse to:  http://localhost:3000 (our landing page)
6) then browse to: http://localhost:3000/home (our home page)
7) then click on Project Experience button, which takes you to: http://localhost:3000/project-experience
8) experiment with the CRUD operations, they all work


What we acheived in this lab:
=============================
A)) DONE: Create an model for one of your project feature and create Rest API with Next JS Route Handlers:
    We addressed a feature called "Project Experience", which is a page in our portfolio management Nextjs React app

B) DONE: Create a new Next.js project with TypeScript:

C) DONE: Install necessary dependencies
    npm install mongoose
    npm install dotenv
    npm install mongodb

D) DONE: Define your Mongoose schema and model (our schema has 5 fields and a date timestamp)

E) DONE: Create route handlers for CRUD operations (see the route.ts files as per structure below):
    src
    ├── app
    │   ├── api
    │   │   └── projects
    │   │       ├── route.ts
    │   │       └── [id]
    │   │           └── route.ts

F) DONE: Create the User interface for this project feature (the project-experience\page.tsx is the UI of focus)

G) DONE: Fetches and displays a list of users when the component mounts (in our case, its a list of projects)

H) DONE: Provides a form to add new users. (in mur case, its a form to add a new project)

I) DONE: Updates the list of users after adding a new user. (in our case, its an update option for project records in Atlas)

J) DONE: Include list, update, and delete functionality for users (well, for projects)

-end
