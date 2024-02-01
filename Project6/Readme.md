# Trash Or Not

### 1. Purpose of the application
The goal was to set up a website that allows users to report illegal junkyards around Berlin (Sperrmüll). After logging in, users can add new found junk yards to the database by putting them on the map. Also, they can report in case they or someone else has cleaned up a location where there was previously an illegal junk yard. A profile page for each user keeps track of the locations that they have reported and cleaned up.

### 2. Used programming languages and frameworks 
Javascript and Node.js for the backend, Typescript and React for the frontend. Additionally, leaflet was used for the map features and mongoose, passport and bcrypt for communicating safely with the MongoDB database.

### 3. Timeframe
This project was created in a timespan of roughly six weeks as there was Christmas recess in between.

### 4. Strong points of this projects
The web app was the first time that I wrote an entire backend in Node.js. This meant that I learned how to implement checks for user creation and authentication. Also, I learned how to write requests and filters for a MongoDB database. Furthermore, on the frontend side I had the chance to try out Leaflet's map service.

### 5. Downsides / Room for improvement
The visualization/map with the locations of the illegal junk yards gets quite full and hard to read when you consider the addition of more and more datapoints. A clustering algorithm or a different viz that first goes by districts and then allows the user to add new points would be a possible way to go. Also, the user profile is very rudimentary as it does not feature things like social media account embeddings or even a profile picture.
