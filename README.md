# Flask React Project

A quora Clone. A place where you can get all your questions answered.

[Live Site Link](https://query11.herokuapp.com/)

## Splash Page!

![query-splashpage](https://user-images.githubusercontent.com/59179145/179097869-9ca1b18f-e5b4-473d-b89d-82f841d56e24.png)

## Home Page

![query-homepage](https://user-images.githubusercontent.com/59179145/179097914-eb39256d-4168-4f68-9051-91407774ac61.png)

## Single question display

![query-singlequestion](https://user-images.githubusercontent.com/59179145/179097947-92b1a591-7cc4-4748-bd1f-8d4b3740877c.png)

## About

Query is a full stack application that allows users to ask questions so other users can answer them and lets you answer other users questions.

## Downloading the App
  1. Clone this repository 
  `git clone git@github.com:javidenis/query.git`
  
  2. Install all packages in both the frontend and backend folders: `npm install` for frontend and `pipenv install` for backend.
  
  3. Create a new .env file in the backend to access the database.  Follow the example .env in the backend. 
  
  4. Setup a PSQL user to match your .env file.
  
  5. Migrate and seed the database in the backend with `flask db migrate`, `flask db upgrade`, `flask seed all`.
  
  6. Run `pipenv shell` then `flask run` in the backend folder and `npm start` in the frontend folder. 
  
  7. Navigate your browser to `localhost:3000`

# Technologies Used

- Python
- Flask
- WTForms
- FlaskWTF
- Flask-Migrate
- FlaskSQLAlchemy
- Alembic
- React
- Boto3 AWS
- Multiselect
