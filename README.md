# AquaUTM

AquaUTM Swimming Pool Management System

## Setup Instructions

1. Install Node.js (v14 or higher)
2. Install MySQL database
3. Create a database named `aquautm`
4. Run the following commands:

```bash
npm install
npm start
```

The server will start on port 5000 by default.

## Environment Variables

Create a `.env` file with the following variables:

- DB_HOST (default: localhost)
- DB_USER (default: root)
- DB_PASSWORD (default: empty)
- DB_NAME (default: aquautm)
- PORT (default: 5000)

## Features

- User registration and login
- Event listings
- Responsive design

## log-in test

- Insert admin user (password: admin123)
- Note: The password hash below is for 'admin123' using bcrypt with salt rounds 10
- IMPORTANT: Replace 'youremail@example.com'with your email.
- IMPORTANt: IF it said "Incorect password" go to forgot password option to change the password.
```bash
INSERT INTO users (first_name, last_name, email, password, role, twofa_enabled) VALUES
('Admin', 'User', 'youremail@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', FALSE);
```
- Insert athlete user (password: athlete123)
- Note: The password hash below is for 'athlete123' using bcrypt with salt rounds 10.
- IMPORTANt: IF it said "Incorect password" go to forgot password option to change the password. 
```bash
INSERT INTO users (first_name, last_name, email, password, role, twofa_enabled) VALUES
('Athlete', 'User', 'youremail@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'athlete', FALSE);
```
## Install node mailer(For 2fac and reset password)
```bash
npm install nodemailer
```
