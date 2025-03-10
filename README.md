React Firebase CRUD App

This is a CRUD (Create, Read, Update, Delete) application built with React (Vite), Material UI, and Firebase Firestore as the database.

Features

Create, read, update, and delete employee records.

Search employees dynamically.

Responsive UI with Material UI.

Data persistence using Firebase Firestore.

Tech Stack

React (Vite) - Frontend framework

Material UI - UI components

Firebase Firestore - NoSQL database

Installation

Prerequisites

Make sure you have Node.js installed.

Steps

Clone the repository:

git clone <repo-url>
cd react-firebase-crud

Install dependencies:

npm install

Create a .env file in the project root and add your Firebase configuration:

VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id

Start the development server:

npm run dev

Usage

The Employee Table displays all employees.

Click "Add Employee" to open a modal for creating a new employee.

Use the search bar to filter employees.

Click Edit to update an employee.

Click Delete to remove an employee.


Project Structure

├── src
│   ├── components
│   │   ├── DataTable.tsx  # Main employee table
│   │   ├── EmployeeModal.tsx  # Modal for adding/editing employees
│   ├── config
│   │   ├── firestore.ts  # Firebase configuration
│   ├── types
│   │   ├── types.ts  # Type definitions
│   ├── App.tsx  # Main app component
├── .env  # Environment variables (not committed)
├── package.json  # Dependencies
└── vite.config.ts  # Vite configuration