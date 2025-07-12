# Synote-Backend: A Scalable Note and Task Management Solution

![Synote-Backend](https://img.shields.io/badge/Synote--Backend-v1.0.0-blue?style=flat-square) ![Node.js](https://img.shields.io/badge/Node.js-v14.17.0-green?style=flat-square) ![MongoDB](https://img.shields.io/badge/MongoDB-v4.4.6-orange?style=flat-square) ![Express](https://img.shields.io/badge/Express-v4.17.1-yellow?style=flat-square)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Authentication](#authentication)
- [AI Integration](#ai-integration)
- [Contributing](#contributing)
- [License](#license)
- [Releases](#releases)

## Overview

Synote-Backend is the server-side component of Synote, a comprehensive note and task management application. This backend is built using Node.js, Express, and MongoDB. It offers secure JWT authentication, RESTful APIs for managing notes and tasks, and integrates AI for summarizing notes. The architecture emphasizes scalability and modularity, making it suitable for various productivity needs.

## Features

- **Secure JWT Authentication**: Ensures that user data remains protected.
- **RESTful APIs**: Efficiently manage notes and tasks, including subtasks.
- **AI Integration**: Automatically summarizes notes to enhance productivity.
- **Cookie-based Session Management**: Simplifies user sessions while maintaining security.
- **Scalable Architecture**: Designed to grow with user needs.
- **Modular Codebase**: Easy to maintain and extend functionality.

## Installation

To set up the Synote-Backend, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/muusti69/Synote-Backend.git
   cd Synote-Backend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**: Create a `.env` file in the root directory and add the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Start the Server**:
   ```bash
   npm start
   ```

The backend will run on `http://localhost:5000`.

## Usage

Once the server is running, you can interact with the APIs using tools like Postman or curl. Below are some common endpoints:

- **Create a Note**: `POST /api/notes`
- **Get All Notes**: `GET /api/notes`
- **Update a Note**: `PUT /api/notes/:id`
- **Delete a Note**: `DELETE /api/notes/:id`
- **Create a Task**: `POST /api/tasks`
- **Get All Tasks**: `GET /api/tasks`

Refer to the API documentation section for detailed usage.

## API Documentation

The Synote-Backend exposes several RESTful APIs. Below is a brief overview:

### Notes API

- **Create Note**: Adds a new note.
  - **Request**: `POST /api/notes`
  - **Body**: `{ "title": "Note Title", "content": "Note Content" }`
  
- **Get Notes**: Retrieves all notes.
  - **Request**: `GET /api/notes`
  
- **Update Note**: Modifies an existing note.
  - **Request**: `PUT /api/notes/:id`
  - **Body**: `{ "title": "Updated Title", "content": "Updated Content" }`
  
- **Delete Note**: Removes a note.
  - **Request**: `DELETE /api/notes/:id`

### Tasks API

- **Create Task**: Adds a new task.
  - **Request**: `POST /api/tasks`
  - **Body**: `{ "title": "Task Title", "description": "Task Description" }`
  
- **Get Tasks**: Retrieves all tasks.
  - **Request**: `GET /api/tasks`
  
- **Update Task**: Modifies an existing task.
  - **Request**: `PUT /api/tasks/:id`
  - **Body**: `{ "title": "Updated Task Title", "description": "Updated Task Description" }`
  
- **Delete Task**: Removes a task.
  - **Request**: `DELETE /api/tasks/:id`

## Authentication

The Synote-Backend uses JWT for user authentication. Here’s how it works:

1. **User Registration**: Users can create an account by sending a `POST` request to `/api/auth/register`.
2. **User Login**: Users can log in by sending a `POST` request to `/api/auth/login`. A JWT will be returned upon successful authentication.
3. **Protected Routes**: To access protected routes, include the JWT in the `Authorization` header as `Bearer <token>`.

## AI Integration

The backend integrates AI capabilities to summarize notes. This feature enhances user productivity by providing concise summaries of longer notes. The AI service can be accessed through the `POST /api/notes/summarize` endpoint.

### Summarization Request

- **Request**: 
  - **Endpoint**: `POST /api/notes/summarize`
  - **Body**: `{ "noteId": "note_id_here" }`

- **Response**: 
  - **Summary**: The AI will return a summarized version of the note.

## Contributing

Contributions are welcome! To contribute to Synote-Backend, follow these steps:

1. **Fork the Repository**: Click the "Fork" button at the top right of the page.
2. **Create a Branch**: 
   ```bash
   git checkout -b feature/YourFeatureName
   ```
3. **Make Your Changes**: Implement your feature or fix.
4. **Commit Your Changes**: 
   ```bash
   git commit -m "Add Your Feature"
   ```
5. **Push to Your Branch**: 
   ```bash
   git push origin feature/YourFeatureName
   ```
6. **Open a Pull Request**: Go to the original repository and create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Releases

For the latest updates and version information, visit the [Releases](https://github.com/muusti69/Synote-Backend/releases) section. Download and execute the necessary files to stay up-to-date with the latest features and improvements. 

For more information, you can also check the [Releases](https://github.com/muusti69/Synote-Backend/releases) section. 

Feel free to explore the project, and contribute to make Synote even better!