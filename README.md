# Node.js + Express.js Authentication Web App

A modern authentication web app built with Node.js, Express.js, and MongoDB. Supports email/password login, Google & GitHub OAuth, password strength meter, CAPTCHA, and more—all with clean EJS views and professional UI.

---

## 📁 Folder Structure

```
├── models/         # Mongoose schemas (User, Auth logic)
├── public/         # Static assets (CSS, images)
├── routes/         # Express route handlers (auth, OAuth, etc.)
├── src/            # App entrypoint, Passport config
├── views/          # EJS templates for all pages
├── .env            # Environment variables (not committed)
├── package.json    # Project metadata & dependencies
```

- **models/**: User schema and authentication logic
- **public/**: CSS styles and static files
- **routes/**: All Express route definitions (login, signup, OAuth, etc.)
- **src/**: Main app file (`index.js`), Passport strategies
- **views/**: EJS templates for login, signup, home, etc.

---

## ✨ Features Overview

- Email + password signup & login
- Google and GitHub OAuth login (Passport.js)
- Password strength meter (Weak, Good, Strong)
- Show/hide password toggle
- Popup messages for errors and success
- Session-based authentication
- CAPTCHA (svg-captcha) on login & signup
- Real-time form validation with visual feedback
- Protected home/dashboard page (requires login)
- Clean, responsive EJS views and CSS

---

## 🛠️ Tech Stack

- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" width="24"/> **Node.js** & <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" alt="Express.js" width="24"/> **Express.js**
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" width="24"/> **MongoDB** & <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongoose/mongoose-original.svg" alt="Mongoose" width="24"/> **Mongoose**
- <img src="https://github.com/patil-prajwal/Tech-Stack-Icons/blob/main/Icons/passport.svg" alt="Passport.js" width="24"/> **Passport.js** (local, Google, GitHub strategies)
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" alt="npm" width="24"/> **bcrypt** (password hashing)
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" alt="npm" width="24"/> **express-session** (session management)
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" alt="npm" width="24"/> **svg-captcha** (CAPTCHA images)
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" alt="npm" width="24"/> **express-rate-limit** (rate limiting)
- <img src="https://ayushchugh.gallerycdn.vsassets.io/extensions/ayushchugh/ejs-snippets-and-color-highlighting/0.0.5/1625124300861/Microsoft.VisualStudio.Services.Icons.Default" alt="EJS" width="24"/> **EJS** (templating)
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS" width="24"/> **CSS** (custom, modern UI)

---

## 📸 Screenshots

Login Page: 

![Screenshot](./public/images/loginPage.png)

Signup Page:

![Screenshot](./public/images/signupPage.png)

---

## 📝 License

MIT License. See [LICENSE](LICENSE) for details.
