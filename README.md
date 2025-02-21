# 🏥 BabySteps Appointment Booking System
![image](https://github.com/user-attachments/assets/d773abbb-1379-4aae-948f-8d475851a5fd)

![image](https://github.com/user-attachments/assets/3e371351-dc50-437e-a47d-bf31230b3e44)
![image](https://github.com/user-attachments/assets/124575b6-d3e2-4f11-904b-56071116d188)
![image](https://github.com/user-attachments/assets/8eb7704b-d3a0-49df-94c7-9048dd8ce88e)
![image](https://github.com/user-attachments/assets/7d0408e8-1048-4327-a27c-06e514ceb4b1)



## 📌 Overview
The **BabySteps Appointment Booking System** is a full-stack web application designed for prenatal care services. It enables users to:
- 👩⚕️ View available doctors and their schedules
- 📅 Check real-time available time slots
- 🗓️ Book/Cancel appointments with validation
- 📱 Access via mobile-friendly interface

### **Tech Stack**
| Category        | Technologies                                                                 |
|-----------------|------------------------------------------------------------------------------|
| **Frontend**    | React, React Router, Material-UI (MUI), date-fns, React Big Calendar         |
| **Backend**     | Node.js, Express, MongoDB, Mongoose                                          |
| **State**       | React Context API, Local Storage                                            |
| **Validation**  | Express-validator, Mongoose schema validation                               |
| **Deployment**  | Docker, Render/Vercel (Backend), Netlify (Frontend)                         |

---

## 🚀 **Installation & Setup**

### **Prerequisites**
- Node.js v16+
- MongoDB Atlas account or local MongoDB instance
- Git

```bash
# 1️⃣ Clone Repository
git clone https://github.com/Rijish13Ahuja/Babysteps.git
cd Babysteps

# 2️⃣ Install Backend Dependencies
cd backend
npm install

# 3️⃣ Install Frontend Dependencies
cd ../frontend
npm install

# 4️⃣ Configure Environment
# Backend .env (backend/.env)
MONGO_URI=your_mongodb_connection_string
PORT=5000

# Frontend .env (frontend/.env)
REACT_APP_API_URL=http://localhost:5000

# 5️⃣ Start Development Servers
# Backend
cd ../backend
npm run dev

# Frontend (in new terminal)
cd ../frontend
npm start
```

---

## 📂 Project Structure

```plaintext
Babysteps/
├── backend/
│   ├── config/           # Database configuration
│   ├── controllers/      # Route controllers
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API endpoints
│   ├── server.js         # Entry point
│   └── .env              # Environment variables
│
└── frontend/
    ├── public/           # Static assets
    ├── src/
    │   ├── components/   # Reusable UI components
    │   ├── pages/        # Application views
    │   ├── services/     # API service layer
    │   ├── App.js        # Root component
    │   └── index.js      # React entry point
    └── .env              # Frontend environment
```

---

## 🌐 API Endpoints

### **Doctor Routes**
| Method | Endpoint                     | Description                          |
|--------|------------------------------|--------------------------------------|
| GET    | `/api/doctors`               | Get all doctors                      |
| GET    | `/api/doctors/:id/slots`     | Get available slots for a doctor     |

### **Appointment Routes**
| Method | Endpoint                     | Description                          |
|--------|------------------------------|--------------------------------------|
| GET    | `/api/appointments`          | Get all appointments                 |
| POST   | `/api/appointments`          | Create new appointment               |
| PUT    | `/api/appointments/:id`      | Update appointment                   |
| DELETE | `/api/appointments/:id`      | Cancel appointment                   |

---

## ✨ Key Features
- **Real-time Availability**  
  🕒 Dynamic time slot calculation based on doctor's schedule
- **Prevent Double Booking**  
  ⚠️ Conflict detection for overlapping appointments
- **Responsive UI**  
  📱 Mobile-first design with Material-UI components
- **Appointment Management**  
  ✏️ Edit/Cancel appointments with audit trail
- **Error Handling**  
  ❌ Comprehensive validation and error messages

---

## 🛠️ Troubleshooting

### **Common Issues**
1. **MongoDB Connection Failed**
   ```bash
   # Verify MongoDB service status
   mongod --version
   
   # Check connection string format
   mongodb+srv://<username>:<password>@cluster.mongodb.net/dbname
   ```

2. **Dependency Installation Errors**
   ```bash
   # Clean install
   rm -rf node_modules package-lock.json
   npm cache clean --force
   npm install
   ```

3. **CORS Errors**
   ```javascript
   // backend/server.js
   app.use(cors({
     origin: 'http://localhost:3000',
     credentials: true
   }));
   ```

---

## 🚢 Deployment

### **Backend (Node.js)**
1. Create `Dockerfile`:
   ```dockerfile
   FROM node:16-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   CMD ["npm", "start"]
   ```

2. Deploy to Render/DigitalOcean

### **Frontend (React)**
```bash
npm run build
# Deploy build/ folder to Netlify/Vercel
```

---

## 🤝 Contributing
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request



---

## 📬 Contact  
Rijish Ahuja   
Project Link: [https://github.com/Rijish13Ahuja/Babysteps](https://github.com/Rijish13Ahuja/Babysteps)

---

Made with ❤️ by [Rijish AHuja] | *Give it a ⭐ if you find this useful!*
