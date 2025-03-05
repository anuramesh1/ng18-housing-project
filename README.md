# Angular Homes App - A simple web application that shows list of houses served via API.
- Install Angular if you don't have it installed. This application is using Angular 18+
	`npm install -g @angular/cli`

- Clone this branch to your local machine
	`git clone https://github.com/anuramesh1/ng18-housing-project.git`

- Once the code has been downloaded
	`cd ng18-housing-project`

- Install the dependencies
    `npm install` 

- Run the application
    `ng serve`
	
	
--To build Prod artifact run the following command. This created a zip file contains the artifact that can be deployed in any prod web server.
   `npm run build:prod:zip'	
	
- If you don't have a spring boot or any other microservice app that hosts the APIs, you can access the API data from db.json file using local json server.
- To install json-server 
	`npm install json-server`

- To start the json-server and server the API from db.json in port 3000
	`json-server --port 3000 --watch db.json`	
	
- Check the "environment.ts" file to update the URL accordingly.
 - To run using json server use the url http://localhost:3000
 - To run using SpringBoot server running in port 8080 use http://localhost:8080/housing -- This is where my springboot app is deployed.

