A fullstack application with just the possiblity to post comments on a page.
The source code is inspired from https://github.com/bradtraversy/microposts_fullstack_vue. 

# Starting the app the "Bare metal" way
Goal is to launch all the necessary services that make the application. They run in the background.
## Prerequisites
* Have node and package manager yarn.
* Have mongo program.
* Have vue-cli.

## Start the database
The server uses a Mongo database, so this step is needed. Launch a Mongo server with a path to specify where to store the data. Example:
```mongod --dbpath F:\myJunk\jsJunk\mevnJunk\commentsPage\data```

## Start the server-side
The server entry point is *server/index.js*, and the raw way to launch it from the project root is
```node server/index.js```
But there is a better way:
```yarn start```

## Start the client-side
The client's entry point is *client/src/main.js*. To launch it, go into directory *client/src* and launch
```yarn serve```
