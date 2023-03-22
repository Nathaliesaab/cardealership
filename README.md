
# Car Dealership

This project is a web application that uses React for the frontend, ASP.NET for the backend, and MySQL for the database. Follow the steps below to set up the project on your local machine.




# Prerequisites

Before setting up the project, ensure that you have the following software installed on your local machine:

* Node.js and npm (https://nodejs.org/en/download/)
* Visual Studio (https://visualstudio.microsoft.com/downloads/)
* MySQL Server (https://dev.mysql.com/downloads/mysql/)
* NET SDK version 7.0 or higher (https://dotnet.microsoft.com/en-us/download/visual-studio-sdks)


# Getting Started

1. Clone the project repository to your local machine using the command:

#### 
```bash
git clone https://github.com/Nathaliesaab/cardealership.git
```

#### Front Setup 
Install Node.js dependencies.
```
cd car-dealership/ClientApp
npm install 
```

#### Backend Setup 
Install ASP.NET dependencies.

```
cd car-dealership
dotnet restore
```

#### Database Setup 

1. Create a new database in MySQL.
2. Install car-dealership.sql file and import into newly created database.
3. Open the appsettings.json file in project/server.
4. Update the ConnectionStrings section with your MySQL server, database name, username, and password.

#### Build and run the project.

1. For the frontend:
```
cd car-dealership/car-dealership/ClientApp
npm run build 
npm run start 
```

2. For the backend:
```
cd car-dealership/car-dealership
dotnet build 
dotnet start 
```
## Usage

Once the project is running, you can use it as follows:

* The React front-end is accessible at https://localhost:44396/
* The ASP.NET back-end API is accessible at https://localhost:5291/api.
* The MySQL database can be accessed through the configured connection string in the appsettings.json file.

## Troubleshooting

1. If you encounter any issues during installation or usage, refer to the project documentation.
2. If you encounter issues with MySQL, make sure the server is running and that the connection string in appsettings.json is correct.
3. If you encounter issues with Node.js or npm, try updating to the latest versions or clearing your cache (npm cache clean).

That's it! You should now have a working React, ASP.NET, and MySQL project.
