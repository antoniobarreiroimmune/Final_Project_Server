# Project - Restaurant

## Description

This is a full_stack application that manages the needs of forensic medicine workers in the administrative legal field of their processes. Workers can log in, create procedures, update them, and pass them to another department for management

## Installation

1. Clone the repository

```bash
git clone
```

2. Install the dependencies

```bash
npm install
```

3. Create a .env file in the root folder and add the following environment variables:

```bash
PORT=3001
DB_URI=your_mongoDB_URI

```

4. Run the server to develop locally

```bash
npm run dev
```




# API Routes



## **User routes**:

| URL path                    | HTTP Method       | Response                          | Action                        |
| :--------------------------:|:-----------------:| :--------------------------------:| :----------------------------:|
| /api/procedures/create             | POST            | [restaurants]                           | Get logged user's favorite restaurants |
| /api/users/likeRestaurant/:restaurant_id              | PUT               | {updatedUser}                           | Like Restaurant |
| /api/users/dislikeRestaurant/:restaurant_id              | PUT               | {updatedUser}                           | Dislike Restaurant |

## **Auth routes**:

| URL path                    | HTTP Method       | Response                          | Action                        |
| :--------------------------:|:-----------------:| :--------------------------------:| :----------------------------:|
| /api/auth/login             | POST              | {authToken}                       | Log user in             |

## **Upload routes**:

| URL path                    | HTTP Method       | Response                          | Action                        |
| :--------------------------:|:-----------------:| :--------------------------------:| :----------------------------:|
| /api/upload     | POST               | CLOUDINARY_LINK                            | Upload Image to Cloudinary