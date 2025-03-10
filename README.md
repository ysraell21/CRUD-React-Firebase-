# React Firebase CRUD App

This is a CRUD (Create, Read, Update, Delete) application built with React (Vite), Material UI, and Firebase Firestore as the database.

## Features

- Create, read, update, and delete employee records.
- Search employees dynamically.
- Responsive UI with Material UI.
- Data persistence using Firebase Firestore.

## Tech Stack

- **React (Vite)** - Frontend framework
- **Material UI** - UI components
- **Firebase Firestore** - NoSQL database

## Installation

### Prerequisites

Make sure you have **Node.js** installed.

### Steps

1. Clone the repository:

   ```sh
   git clone git@github.com:ysraell21/CRUD-React-Firebase-.git
   ```

2. Install dependencies:

   ```sh
   yarn
   ```

3. Create a `.env` file in the project root and add your Firebase configuration:

   ```sh
   VITE_API_KEY=your-api-key
   VITE_AUTH_DOMAIN=your-auth-domain
   VITE_PROJECT_ID=your-project-id
   VITE_STORAGE_BUCKET=your-storage-bucket
   VITE_MESSAGING_SENDER_ID=your-messaging-sender-id
   VITE_APP_ID=your-app-id
   VITE_MEASUREMENT_ID=your-measurement-id
   ```

4. Start the development server:

   ```sh
   yarn dev
   ```

## Usage

- The **Employee Table** displays all employees.
- Click **"Add Employee"** to open a modal for creating a new employee.
- Use the **search bar** to filter employees.
- Click **Edit** to update an employee.
- Click **Delete** to remove an employee.
- Click **View** to view specific employee.

## Project Structure

```
├── src
│   ├── components
│   │   ├── DataTable.tsx        # Main employee table
│   │   ├── EmployeeModal.tsx    # Modal for adding/editing employees
│   │   ├── ViewEmployeeModal.tsx    # Modal for viewing specific employee
│   │   ├── types.ts            # Type definitions
│   ├── config
│   │   ├── firestore.ts        # Firebase configuration
│   ├── App.tsx                 # Main app component
├── .env                         # Environment variables (not committed)
├── package.json                 # Dependencies
└── vite.config.ts               # Vite configuration
```

