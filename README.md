# portfolio_web_app# lab-6-PKHubmaster PARMJIT KANTH

Name: Coding Crafters
Date: MArch 11, 2025

Instructions:
==========================================================================================================
1) git clone https://github.com/2025-Winter-ITE-5425-0NA/project-phase-1-code-crafters
2) cd .. \project-phase-1-code-crafters\
3) npm install
4) Popualate your Mongo db collections using the following json files which are part of the code:
\scripts\portfolio.profiles.json --> create a Mongo collection called profiles, and insert the new records from json
\scripts\portfolio.systemusers.json --> create a Mongo collection called systemusers, and insert the new records from json
\scripts\portfolio.userprofileaccess.json --> create a Mongo collection called userprofileacess, and insert the new records from json
5) npm run dev
6) browse to:  http://localhost:3000 (our landing page)
7) then browse to: http://localhost:3000/home (our home page)
8) Try logging in as admin (username: admin, passwd: test), or an employer (username: employer4, passwd: etest4)
9) then click on Project Experience button, which takes you to: http://localhost:3000/project-experience
10) try the workflows as per document, or any other operation

What we acheived in Phase 3:
=============================

A) We fully documented these features and operations:
6.1. Explanation of Web Application Architecture..........................................................................................6
6.2. Explanation of Mongo Database Design...................................................................................................7
6.3. Explanation of API Routes.........................................................................................................................8
6.4. Description of Workflow #1: Admin Invites a New Employer for Trial......................................................9
6.5. Description of Workflow #2: Existing Employer Requests to View Candidate Profile............................11
6.6. Operation: Admin Adds a New Candidate Profile...................................................................................19
6.7. Operation: Admin Adds/Edits/Deletes Projects and/or Skills to a Profile..............................................22
6.8. Operation: Employer Signs-Up (Adds a new SystemUser record with hashed password)......................24
6.9. Security Feature: JWT for Authentication and Authorization.................................................................26

B) Each team member created (at least) 1 main 2nd feature:
● Parm:
○ database enhancements: we used 3 collections to get the correct balance of functionality
○ API routes to allow admin user to perform CRUD operations to add a new candidate profile, add projects and/or skills per profile, and limit employer users to only GET data (READ-only for candidate profile data)
● Apurva:
○ Improved styling for all pages
○ JWT for user authentication and authorization
● Christian:
○ Created workflow to have employers request for viewing a candidate profile, and a separate page to allow admin to review (Approve, or Reject the request)
○ Improved landing page and navigation (refresh, auto-update page after CRUD operations)

What we acheived in Phase 1 and Phase 2:
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
