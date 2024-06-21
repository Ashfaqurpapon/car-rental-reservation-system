
# Car Rental Reservation System Backend 

The Car Rental Reservation System Backend is a Node.js application designed to facilitate the operations of a car rental business. It provides APIs for user authentication, car management, and booking management. Both admin and user roles are supported, each with specific functionalities to ensure a smooth and secure booking experience.

# Live Link


The live version of the Car Rental Reservation System can be accessed at: https://your-live-url.com

# Features

User Authentication: Secure registration and login for users and admins.

Car Management: Admins can add, update, and soft delete cars.

Booking Management: Users can book cars, view their booking history, and admins can oversee all bookings.

Cost Calculation: Admins can calculate the total rental cost based on booking duration.

Role-Based Access: Different functionalities for admins and users.

# Technology Stack

Programming Language: TypeScript

Framework: Express.js

Database: MongoDB

ODM: Mongoose

Authentication: JWT (JSON Web Tokens)

# API Endpoints

Authentication


Sign Up: POST /api/auth/signup

Sign In: POST /api/auth/signin

Car Management (Admin)

Create a Car: POST /api/cars

Get All Cars: GET /api/cars

Get A Car: GET /api/cars/:id

Update A Car: PUT /api/cars/:id

Delete A Car: DELETE /api/cars/:id

Get:/api/bookings

Post:/api/bookings

Get:/api/bookings/my-bookings

Put:/api/cars/return




# Setup and Installation


Clone the repository:

Install dependencies:

Environment Variables:

Run the application:



# Usage


Sign Up: Create a new user or admin account.

Sign In: Log in to get the JWT token.

Car Management: Admins can create, update, view, and soft-delete cars.

Booking Management: Users can book cars 
and view their booking history; admins can oversee all bookings.
