# Shopping Website Frontend

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Setup](#setup)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Introduction

This repository contains the frontend code for the Shopping Website project, focusing on sports product sales. It includes functionalities such as user registration, login, cart management, wishlist management, order management, profile editing, and viewing items from different categories.

---

## Features

List of main features or functionalities provided by the Shopping Website frontend:

- **User Authentication**: Register and login functionalities using JWT.
- **Cart Management**: Add, remove, and update items in the shopping cart.
- **Wishlist**: Save items to a wishlist for future purchase.
- **Orders Management**: View and manage user orders.
- **Profile Management**: Edit user profile information.
- **Category-based Item Listings**: Display items from various categories.

---

## Technologies Used

List of technologies and libraries used in the project:

- React JS
- Axios for HTTP requests
- React Router for navigation
- JWT for authentication

---

## Installation

To install and run the project locally, follow these steps:

```bash
git clone https://github.com/amitsaviro/FE-ShoopingWebsite.git
cd FE-ShoopingWebsite
npm install
```

---

## Setup

Before running the frontend application, make sure to configure the following:

- Set up environment variables for API endpoints and authentication tokens.
- Update any configuration files related to backend API URLs.
- Ensure backend server is running and accessible.

---

## API Endpoints

Document the APIs used by the frontend to communicate with the backend. Example:

### Authentication

- **Login**: POST `/authauthenticate/create`
  - Description: User login endpoint.
  - Request Body: { username, password }
  - Response: JWT token on successful login.

### User Management

- **Register**: POST `/customer/create`
  - Description: User registration endpoint.
  - Request Body: { username, email, password }
  - Response: Success message or error details.

### Cart Management

- **Add to Cart**: POST `/orderItem/create`
  - Description: Add item to the shopping cart.
  - Request Body: { itemId, quantity }
  - Response: Success message or error details.

### Wishlist

- **Add to Wishlist**: POST `/favoriteList/create`
  - Description: Add item to the wishlist.
  - Request Body: { itemId }
  - Response: Success message or error details.

### Orders Management

- **View Orders**: GET `/orderList/get`
  - Description: Retrieve user's order history.
  - Response: List of orders with details.

### Profile Management

- **Edit Profile**: PUT `/customer/update`
  - Description: Update user profile information.
  - Request Body: { updated fields }
  - Response: Success message or error details.

---

## Usage

To start the frontend development server, run:

```bash
npm start
```
The development server will start at http://localhost:3000.

---

## Contributing

Contributions to this project are welcome. To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.
