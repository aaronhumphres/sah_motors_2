# SAH-Motors-Full-Stack-App
Project 2
![Alt text](models/images/SAH%20Motors%20JEEP%20Wrangler%202021.png)


-----------------

This app will allow a user to view our selection of rental vehicles. Local hosts (rental owners like ourselves) will be able to add their vehicles to the app to provide local area residents to view a selection of available vehicles to rent in the local geographic area. Users will be able to mark vehicles as favorites for quick reference later. (This will give insight to myself, as to what types of vehicles prospective guests are comparing our vehicles against.)

Users will be able to add images as a comment, to show how much they enjoyed their experience in one of our vehicles, such as this.
![Alt text](models/images/Kandyse%20review%20-%20Jeep.png)

Technologies/Languages
--------------------------

- HTML
- CSS
- JavaScript
- Express
- Mongoose
- Mongo
- Node
- Liquid
- Bootstrap
- Multer




As a User, I want the ability to...
- sign up.
- sign in.
- create my password.
- sign out.
- create my own vehicles.
- update my own vehicles.
- comment on my own vehicles.
- read details on each vehicle.
- delete my own vehicles.
- comment on other vehicles.


| **URL**          | **HTTP Verb**|**Action**|
|------------------|--------------|----------|
| /users/signup    | POST         | create 
| /users/login     | POST         | create      
| /users/logout    | DELETE       | destroy 
| /users/signup    | GET          | new  




#### Fruits


| **URL**          | **HTTP Verb**|**Action**|
|------------------|--------------|----------|
| /vehicles/         | GET          | index  
| /vehicles/:id      | GET          | show       
| /vehicles/new      | GET          | new   
| /vehicles          | POST         | create   
| /vehicles/:id/edit | GET          | edit       
| /vehicles/:id      | PATCH/PUT    | update    
| /vehicles/:id      | DELETE       | destroy  


#### Comments


| **URL**                               | **HTTP Verb**|**Action**|
|---------------------------------------|--------------|----------|
| /comments/:vehicleId                    | POST         | create  
| /comments/delete/:vehicleId/:commentId  | DELETE       | destroy   



WIREFRAMES
--------

![Alt text](models/images/SAH%20APP%20-%20wireframe.png)


ERD
-----

![Alt text](models/images/SAH%20APP%20-%20ERD.png)

reach goal:
Add a sort feature to search by vehicle type (SUV, 4-wheel drive, Minivan, Convertible, etc)
![Alt text](models/images/SAH%20Motors%20App%20assortment.png)
