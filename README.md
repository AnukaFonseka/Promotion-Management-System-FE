# Promotion Management System (Frontend)

This is the frontend implementation of the **Promotion Management System**, built using **Vite** and **React**. It provides a user interface for managing promotions, including creating, updating, deleting promotions, and viewing them with images.

---

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [License](#license)

---

## Features
- User authentication (JWT-based) for login and registration.
- Role-based access control (Admin and User).
- Create, update, delete, and view promotions and Users.
- Image upload support for promotions.

---

## Technologies Used
- **Vite**
- **React**
- **Redux Toolkit with RTK Query**
- **Tailwind CSS**

---

## Setup Instructions

### Prerequisites
- Node.js and npm installed

### Steps
1. Clone the repository:
   ```
   git clone https://github.com/AnukaFonseka/Promotion-Management-System-FE.git
   cd Promotion-Management-System-FE
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Configure the API base URL:
   Update the `baseUrl` in your `src/store/api.js` file and `src/store/authApi.js` file to point to your backend API:
   ```javascript
   import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

   export const promotionApi = createApi({
     reducerPath: 'promotionApi',
     baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
     endpoints: (builder) => ({
       // Define endpoints here
     }),
   });
   ```
4. Run the application:
   ```
   npm run dev
   ```

---

## License
This project is for educational purposes and part of an assignment submission. Do not use it for commercial purposes.

