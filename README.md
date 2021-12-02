# ServerTest App

This project was created with [Node.js](https://nodejs.org/es/) version 12.22.4

# technologies
 - [Cors](https://www.npmjs.com/package/cors)
 - [Csv-parser](https://www.npmjs.com/package/csv-parser)
 - [Dotenv](https://www.npmjs.com/package/dotenv)
 - [Express](https://www.npmjs.com/package/express)
 - [Sequelize](https://sequelize.org/v4/manual/installation/getting-started)
 - [MariaDb](https://www.npmjs.com/package/mariadb)
 - [Myme-types](https://www.npmjs.com/package/mime-types)
 - [Multer](https://www.npmjs.com/package/multer) 

# Routes
 - /api/location?page=1 - GET **(Method get locations of database)**
 - /api/location - POST **(Method upload a file csv of locations and save in database the data)**


## Install and Test
```
npm install
npm run start

LOAD DATABASE:
Run Scripts in order
$ CREATE SCHEMA `locations`;
$ CREATE TABLE `locations`.`location` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `lat` VARCHAR(45) NOT NULL,
  `lon` VARCHAR(45) NOT NULL,
  `createdAt` TIMESTAMP NOT NULL,
  `updatedAt` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`));
```

### If an error occurres

- PERMISSION DENIED for upload files
> Solution:
> sudo chmod -R 777 uploads