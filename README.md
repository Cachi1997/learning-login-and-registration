# learning-login-and-registration

This is a small project with the purpose of learning user login and registration. This app can store links and users 

## Installation

- First you need any SQL based DB, i personally chose MYSQL.

- Then you need to create in src folder a file called keys.js. In this file you have to specify your database info. Here is an example

```js
module.exports{
    database:{
        host: "DB-HOST", //if you run this app locally, probably it will be localhost
		user: "YOUR-DB-USERNAME", //username you use to log in your db, could be root 
		password: "YOUR-DB-PASSWORD",
		database: "NAME-OF-YOUR-DATABASE" //You can use the default name "database_links" or you can change it in the db.sql file
    }
}
```

- Run the sql script wrote on the db.sql file inside your chosen engine (mysql, postgres, etc).

- Now open a terminal or a command prompt inside the project and run this

```sh
npm run dev
```

- Done! You now can save your links. Enjoy!