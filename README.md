-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                                                    Full Stack Web Development Project 
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------

YelpCamp is a full stack website project designed to allow users to create and review campgrounds. This project demonstrates the implementation of a comprehensive web application with authentication, 
database integration, and responsive design.

# Technologies
- Backend: Node.js, Express
- Frontend: HTML, CSS, JavaScript, EJS
- Database: MongoDB, Mongoose
- Authentication: Passport.js

# Features 
- User authentication and authorization
- CRUD functionality for campgrounds and reviews
- Responsive design for various devices
- Secure password handling
- Comment and rating system


------------------------------------------------------
        Home Page
-------------------------------------------------------
The homepage serves as the entry point for YelpCamp. It includes the following features:  
=> Login and Signup: Users can either log in to their existing accounts or sign up for a new account. Authentication is required to create, edit, or delete campgrounds.  
=> Campground Options: Users can view a list of all available campgrounds. Each campground entry includes an image and a brief description.  

-------------------------------------------------------
        Campgrounds Page 
--------------------------------------------------------
The Campground page provides a comprehensive list of all available campgrounds and offers additional functionality:  
=> List of Campgrounds: Displays all campgrounds with images, descriptions, and basic information.  
=> Login Options: Users can log in to access more features such as adding new campgrounds or leaving reviews.  
=> New Campground Option: Authenticated users can create a new campground by clicking on the "Add New Campground" button, which redirects them to a form for entering campground details.  

---------------------------------------------------------
        Campground Detail Page (/campground/:id)
----------------------------------------------------------
The Campground Detail Page provides in-depth information about a specific campground. The page offers several interactive elements based on the user's authentication status.  
=> Campground Details: Displays comprehensive details about the selected campground, including {Title, Image, Description, Location, Reviews and ratings}  
=> Login Options: If the user is not logged in, login and signup buttons are prominently displayed.  
=> Redirects: Unauthenticated users attempting to access features that require authentication are redirected to the login page.  
=> Edit Options: Authenticated users who own the campground have the option to edit the campground details.  

---------------------------------------------------------
         New Campground Page
----------------------------------------------------------
The New Campground Page allows authenticated users to create and add a new campground to the YelpCamp platform. This page includes a form for entering all necessary details about the new campground.  
=> Form for New Campground: A user-friendly form where users can input details about the new campground.  
=> Authentication Required: Only accessible to authenticated users. Unauthenticated users are redirected to the login page.  
=> Form Fields:   
      Name: The name of the campground.  
      Image: An image of the campground.  
      Description: A brief description of the campground.  
      Location: Location of the campground.  
=> Submit Button: Submits the form and adds the new campground to the database.  

# Attached PDF
The repository includes a PDF file named YelpCamp.pdf. This document provides additional details and a browser run image depiction of the YelpCamp project.   ![Yelpcamp](Yelpcamp.pdf)
You can find the PDF file in the root directory of the repository. Open it using any standard PDF viewer to get a detailed understanding of the project and its various components.


