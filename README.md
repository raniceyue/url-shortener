# URL Shortener
[![Build Status](https://app.travis-ci.com/raniceyue/url-shortener.svg?token=KMaa5sPVDNpzppnHPfJi&branch=master)](https://app.travis-ci.com/raniceyue/url-shortener)

A URL shortener (not really) built using the MERN stack, i.e.
1. Express + Node for the backend API
2. MongoDB Atlas for the database (NoSQL, document based)
3. React for the frontend

Both the frontend and backend are written in Typescript.

## Running this locally
1. Ensure you're using Node 12
2. Run `yarn install`
3. Set up the environment variables by creating `.env` files in the frontend and backend directories
4. In the root directory, run `yarn dev` to run both the frontend and backend concurrently
   
   OR

   `cd backend/ && yarn dev` in one terminal and `cd frontend/ && yarn start` in the other

The backend will be hosted on `localhost:8000`

The frontend will be hosted on `localhost:3000/url-shortener`

## Features and Implementation
### Creating short links
Users are able to create short links that will persist for up to 30 days in the databse. Users are able to give names/labels to the short links generated.

There is no need for the user to create an acount as all the links created by the user will be stored in the browser's `localStorage`.

**Implementation**

In order to generate a short link, the application uses the SHA256 cryptographic hash function to create a hash corresponding to the long link provided, and takes the first 8 characters of the generated hash for the short link.

Each new link created will be stored in the application's database. If a user creates a short link that already exists in the database, no new entry will be created in the database, instead, the existing entry's TTL will be extended by another 30 days.

### Deleting short links
Users are able to delete short links. However, these links will not be deleted from the application's database, and will only be deleted from the user's `localStorage`, this is because there may be other users also using that short link. 

**Using the short links**

The short links use the URL of the application's backend (`https://ranice-url-shortener.herokuapp.com`) as the base url. This is not very short and in fact makes the links longer, but because I cannot afford to buy my own domain, this is the only way.

### Some Reflection
This implementation of the "sharing" of short links is not very good. The implementatin of only shallow deletion of links is also not very good. Also, storing the user's links in their browser's `localStorage` would mean if they clear all their browser's data, all their links will be gone.

Also, every time the user starts the application, the application has to make an API call to get the corresponding long url of every link stored in the browser's `localStorage` which is not good. 

The ideal implementation would be to create some user authentication system to be able to concretely map users to the links they have created, OR to use cookies to remember users and their links.

However, because of my unfamiliarity of implementing user authentication systems outside of Firebase (my free trial has expired), and unfamilirity with dealing with cookies, this is the best method I can think of as of now.

## [Backend](https://ranice-url-shortener.herokuapp.com)

### Backend API Calls
| Endpoint | Method | Body | Description |
|----------|--------|--------|-------------|
|`/:short`| `GET` | - | Redirect users to the long link mapped to the provided hash (`:short`). |
|`/api/urls/` | `POST` | `short: string`<br>`long: string` | Create a short link given a long link. If a short link already exists for the given long link, the TTL for the short link in the database will be extended. |
|`/api/urls/:short`| `GET` | - | Returns the corresponding long link for the hash (`:short`) provided in the request's parameters. |

## [Frontend](https://raniceyue.github.io/url-shortener)
The frontend is deployed on GitHub Pages. Due to a lack of time, I decided to use Material UI to implement the styling of the frontend.

The frontend is mobile responsive.