# Neo-Soft Backend Project

This is a backend assignment implementing REST APIs using **Node.js, Express, TypeScript, and MongoDB**. The project interacts with JSONPlaceholder to fetch, store, and manage users, posts, and comments in a MongoDB database.

## 🚀 Features
- Fetch users, posts, and comments from JSONPlaceholder
- Store users and their related data in MongoDB
- CRUD operations for users
- REST API using Express.js

---
## 📁 Project Structure
```
backend-assignment/
│── src/
│   ├── controllers/
│   │   ├── userController.ts
│   ├── models/
│   │   ├── userModel.ts
│   ├── routes/
│   │   ├── userRoutes.ts
│   ├── database.ts
│   ├── server.ts
│── package.json
│── tsconfig.json
│── README.md
```

---
## ⚙️ Installation & Setup

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/GowriSupriya/Neo-soft.git
cd backend-assignment
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Setup Environment Variables**
Create a `.env` file in the root directory and add:
```
MONGO_URI=mongodb://localhost:27017
DB_NAME=testDB
PORT=5000
```

### **4️⃣ Start MongoDB**
Make sure MongoDB is running locally:
```sh
mongod
```

### **5️⃣ Run the Server**
For development:
```sh
npm run dev
```
For production:
```sh
npm start
```

---
## 📌 API Endpoints
| Method | Endpoint               | Description                   |
|--------|------------------------|-------------------------------|
| GET    | `/api/load-users`      | Fetch & store users in DB     |
| GET    | `/api/user/:userId`    | Get a user by ID              |
| POST   | `/api/add-user`        | Add a new user                |
| DELETE | `/api/delete-user/:id` | Delete a user by ID           |
| DELETE | `/api/delete-all-users`| Delete all users from DB      |

---
## 🛠️ Tech Stack
- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB**
- **Axios** (for API requests)
- **Dotenv** (for environment variables)

---
## 👩‍💻 Author
**Gandu Gowri Supriya**

