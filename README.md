# 📍 Geolocation Sorter

A lightweight Node.js web service that sorts multiple addresses by distance from a user‑provided location. The app uses the Radar Geocoding & Distance API to calculate distances and returns the results in ascending order.

👉 **Live Demo:** https://geolocation-sorter.onrender.com

---

## 📦 Features

### 📍 Distance Sorting  
Users can enter:

- A starting location  
- Multiple destination addresses  
- Dynamically add more address fields  

The server calculates the distance from the starting point to each address and returns a sorted list.

### ⚙️ Server‑Side Processing  
- Accepts form data via POST  
- Uses Radar API for geocoding + distance  
- Returns JSON with sorted results  
- Includes basic validation and error handling  

### 🧭 Frontend UI  
- Clean, minimal HTML/CSS interface  
- Add unlimited address fields  
- Loading spinner + error messages  
- Results displayed in sorted order  

---

## 🚀 Running the App

### Install dependencies
npm install

### Start the server
node index.js


The server runs on **http://localhost:3000** by default.

---

## 🔐 Environment Variables

Create a `.env` file with:

### `API_KEY`
Your Radar API key for geocoding and distance calculations.

### `JWT_KEY`
Secret used to sign and verify data.

---

## 🛠️ Technologies Used

- **Node.js**
- **Express**
- **Radar API**
- **JWT**
- **HTML/CSS/JS (vanilla)**

---

## 📜 License

Copyright (c) 2025  
elvis dovi

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---