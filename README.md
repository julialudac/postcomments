A fullstack application with just the possiblity to post comments on a page.
The source code is inspired from https://github.com/bradtraversy/microposts_fullstack_vue. 

# Starting the app the "Bare metal" way
Goal is to launch all the necessary services that make the application. They run in the background.
## Prerequisites
* Have node and package manager yarn.
* Have mongo program.
* Enter `yarn install` at the root of the project to install the necessary node dependencies for the server side
 and in *client* to install the necessary node dependencies for the client code.

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

# Starting the app the "Docker" way

## Prerequisites
* Have Docker installed

## Start the database, the server-side and the client-side
docker-compose takes care of all of that!
```docker-compose up```
And when you are done with the program:
```docker-compose down```

## Some details about a docker containers struggle: CORS
The initial plan is to not export the server-side to port 5000 but use its name *server* so that the client-side can communicate with through their common docker network, just like the server communicates with the database. Unfortunately, I didn't manage to, even by doing all my possible to deal with the CORS policy. Nonetheless it's possible to do curl requests to the server from any container on the network, so I thought it can be Vue that isn't allowing CORS (thought about it too but the problem is still here). Things I tried:
* allow CORS on server side
* allow CORS on Vue with the file *vue.config.js* as stated in the docs
* use a plugin o the browser to disable CORS policy (*CORS everywhere* on Firefox)
