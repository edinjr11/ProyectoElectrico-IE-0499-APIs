# Electric Project - IE-0499
### Refactor this ---
## Packages used
    - npm i express moongosee dotenv cors cookie-parser bcrypt jsonwebtoken cloudinary express-fileupload googleapis node-fetch nodemailer
    - npm i -D nodemon
---
## Front-End <-> Back-End communication - List of APIs
### 1. Login
Create a login form and send an object to the respective API via `POST` request, object accepted:
````
{
    email: email
    password: password
}
````
The previous object needs to be send to the `${BACKEND_HOST}/user/login` path and it will be parsed and accepted if authentication passes. When requesting to the API, a message will be send with a `400 code` if there's a problem related to the parameters send via body on the POST request or a `500 code` if there was an error on the request itself. If login was succesful a `Login success` message is sent within the response, also a cookie with a refresh_token of seven days is passed to the `${BACKEND_HOST}/user/refresh_token` path.

### 2. Access Token
After login a cookie with a refresh_token of seven days is passed to the `${BACKEND_HOST}/user/refresh_token`, a request to the respective API via `POST` must be performed in order to get the cookie and then store on the browser (this action is recommended to do it every time there is a login from any user), the API will get an object like this one:
````
{
    refresh_token: refreshtoken
}
````
After hitting the `${BACKEND_HOST}/user/refresh_token` endpoint the response will get the refresh token from the cookie created when logging in and this token can be stored on the browser.

### 3. Register
Create a register form and send an object to the respective API via `POST` request, object accepted:
````
{
    name: name
    email: email
    password: password
}
````
The previous object needs to be send to the `${BACKEND_HOST}/user/register` path and it will be parsed and accepted if authentication passes. When requesting to the API, a message will be send with a `400 code` if there's a problem related to the parameters send via body on the POST request or a `500 code` if there was an error on the request itself. If register was succesful a `Registration success. Activate your account accessing your email.` message is sent within the response, also a confirmation email is sent to the new user's email where it contains a URL `${FRONTEND_HOST}/user/activate/${activation_token}` with an activation token as a `http` parameter that is available for 10 minutes and it contains user information, when accessed this URL the registration is successful.

### 4. Activate Email
Create an endpoint for `${FRONTEND_HOST}/user/activate/${activation_token}`(this is gonna be accessed from the email) where **activation_token** can be taken as a parameter, after getting the **activation_token** send an object to the respective API via `POST` request, object accepted:
````
{
    activation_token: activation_token
}
````
The previous object needs to be send to the `${BACKEND_HOST}/user/activation` path and it will be parsed and accepted if authentication passes. When requesting to the API, a message will be send a `500 code` if there was an error on the request itself. Then the token is verified, if verification was succesful the user is saved correctly on the database and an  `Account has been activated.` message is sent within the response.

### 5. Logout
Create a logout button and send a `POST` request to the respective API. This request will simply clear the cookie that is stored on the `${BACKEND_HOST}/user/refresh_token`. When requesting to the API, a message will be send with a `500 code` if there was an error on the request itself. If logout was succesful a `Logged out.` message is sent within the response.

### 6. Get user information
E`${FRONTEND_HOST}/user/activate/${activation_token}`(this is gonna be accessed from the email) where **activation_token** can be taken as a parameter, after getting the **activation_token** send an object to the respective API via `POST` request, object accepted:
````
{
    activation_token: activation_token
}
````
The previous object needs to be send to the `${BACKEND_HOST}/user/activation` path and it will be parsed and accepted if authentication passes. When requesting to the API, a message will be send a `500 code` if there was an error on the request itself. Then the token is verified, if verification was succesful the user is saved correctly on the database and an  `Account has been activated.` message is sent within the response.
--- 
## Functions used in APIs
    - Email validation: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
---