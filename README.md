# Myface

## Technologies Used:

### Front-End Stack:
- [![React](https://img.shields.io/badge/React-✓-brightgreen)](https://reactjs.org/)
- [![React Router DOM](https://img.shields.io/badge/React_Router_DOM-✓-blueviolet)](https://reactrouter.com/)
- [![React Redux](https://img.shields.io/badge/React_Redux-✓-blueviolet)](https://react-redux.js.org/)

### Back-End:
- [![Myface Server](https://img.shields.io/badge/MyfaceServer-✓-blue)](https://github.com/StoyanBanov/myface-server)

### CDN:
- [![Cloudinary](https://img.shields.io/badge/Cloudinary-✓-blue)](https://cloudinary.com/)

## Table of Contents:

- [Project Overview](#project-overview)
- [Features](#features)
- [Running the Application](#running-the-application)
- [Deployment Info](#deployment-info)

## Project Overview:

Myface is a small social network. The web application is my(Stoyan Banov) entry to the project task from the SoftUni ReactJS course.

## Features

### Guest:
- **View Posts:**
  - View posts that don't have a visibility restriction

### Logged-In User:
- **View Posts:**
  - View posts that don't have a visibility restriction
  - View the visible posts of their friends
  - View their own posts

- **Post Management:**
  - CRUD
  - Posts include text and/or images
 
- **Like Post:**
  - Add like to a post
  - Remove like from a post
 
- **Comment Post:**
  - Add comment to a post
  - Remove comment from a post
    
- **Search:**
  - Search users
  - Search posts

- **Friendships:**
  - Request friendships
  - Accep friendship requests
  - Remove friendships
 
- **Chat:**
  - Send text and images
  - Upon befriending another user, a chat is created
  - Chats remain even after a friendship is removed

## Running the application
  - In the root directory of the project create a .env file with the following properties:
    - VITE_HOST=(address to the [Myface Server](https://github.com/StoyanBanov/myface-server))
  - Install dependencies - npm i
  - Run the appliaction - npm run dev
  - Run the [Myface Server](https://github.com/StoyanBanov/myface-server)

## Deployment Info
 - Deployed on [Netlify](https://www.netlify.com/)

#### Live Demo: 

[<img alt="Play Button" src="https://user-images.githubusercontent.com/114406139/211439129-37c7a037-dde4-49d6-bf62-4ffc4f315fa9.PNG" />](https://myface-app.netlify.app/)
