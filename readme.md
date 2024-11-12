# Support Ticket App

A full-stack support ticket system built with React, Redux, Node.js, Express, and MongoDB. This application allows users to create and manage support tickets, add notes to tickets, and close tickets upon resolution.

> This project is a **study case** from the Udemy course [React Front To Back](https://www.udemy.com/course/modern-react-front-to-back/) by Brad Traversy. It was built to practice React, modern JavaScript, API interaction, and state management.


## Live Preview

Check out the live version of the app here:[Support Ticket App](https://support-ticket-liart.vercel.app/)

```bash
    #Test User:
    email: test4app@gmail.com 
    password: 123456
```

## Features

- **User Authentication**: Secure JWT-based login and registration.
- **Ticket Management**: Create, view, and close support tickets.
- **Notes**: Add notes to support tickets.

## Tech Stack

- **Frontend**: React, Redux, Redux Toolkit, React Router, Axios
- **Backend**: Node.js, Express.js, Mongoose, MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Styling**: CSS3, React Icons

---

## Installation

### Prerequisites

- **Node.js** (v14 or above)
- **MongoDB** (local or hosted, e.g., MongoDB Atlas)

### Installation Steps

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2. **Install Dependencies**:
   - For the backend:
      ```bash
      cd backend
      npm install
      ```
   - For the frontend:
      ```bash
      cd ../frontend
      npm install
      ```

3. **Create a `.env` file** in the `backend` directory with the following content:
    ```plaintext
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4. **Run the App**:
    - To start the backend && frontend:
      ```bash
      npm run dev
      ```

