### Trello Clone Example

------------------------------------------

### Stack:
Php: v.7.4.* or higher

Symfony: v.5.0.* or higher

React: v.16.12.* or higher 

Mysql: v.14.14 or higher

composer

npm or yarn

Third party libs:

   [react-trello](https://github.com/rcdexta/react-trello)
   
   [react-bootstrap](https://react-bootstrap.netlify.com/)

--------------------------------------

### Short Description

Symfony backend provides API with next endpoints:

 - `/api/cards` - [method: GET] provides data from Db to React App
 - `/api/lanes/reset` - [method: POST] reset data in DB to actual.
 
 React App is rendered on `/` route provided by Symfony App.
 
 App Component get data from backend and sets it to Board Component.
 
 Some of Components of Board are overridden.
 
 On click on 'Save Changes' Button data from redux store 
 and 'Edit card form' data are sent to backend.
  
--------------------------------------

#### Quick Install:

1.Clone repository

2.Run console in project folder

    
    composer install
    
then run
    
    npm install or yarn install


#### Db setup:

1.Check that MySql is already installed on host

2.Edit line in .env file according to yours db-connection:
    
    
    DATABASE_URL=mysql://use:pass@host/DB_name
    
3.Run console in project folder to create DB
    
    
    php bin/console doctrine:database:create
    

then run migrations
    
    
     php bin/console doctrine:migrations:migrate
     
-----------------------------------------------

Feel free to open issue if you have any questions.
