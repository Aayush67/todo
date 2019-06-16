
# Todo Application

This project is generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.8.

## Features
This is simple Todo Application with the following features:
1. Adding todos
2. Viewing the list of todos
3. Deleting single/multiple todos
4. Updating todo

## Description
1. This application is making use of angular material. 
2. It has 3 fields Title, Description and Time.
3. To add data in time field, a calender icon needs to be clicked which pops out calendar allowing to select event time.
4. All the fields are mandatory.
5. On adding todo the event time selected should always be greater than current time.

## Get Started

## Install npm packages

Install the npm package in package.json with `npm install` command
Now the app is ready to start

## Running Application

1. Run `ng serve`.
2. Navigate to `http://localhost:4200/`. 
3. The app will automatically reload if you change any of the source files.
4. It loads the add todo page where we can provide title , description and time of todo task and add it to our todo list with add button.
5. After adding todo , control navigates to list todo page where we can view added todos.
6. List todo has functionality of deleting and updating single item with corresponding delete/update button.
7. Also we can delete multiple item by marking the checkbox of the item to be deleted and then pressing Delete Selected Items button.
8. From list todo page we can also move back to add page to add more items. 
9. Remember that to delete single todo you don't need mark the checkbox , it can be done with delete button.
10. Currently server is running on url `http://localhost:8085/quizapp` which we have configured in environment.ts file in environment
    directory.
    
## 

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

