# Routes

## What are Routes?

Routes are bits of logic that detemine how a request is handled. It inherintly contains no logic but it connects a request to a callback(controller). For example, if I had a made a GET request to *'api.cryptohawks.com/user/example'*, the route would be '/user/example'. The route that would handle this is

`
app.get('/user/example', exampleController)
`

Routes are also implmented to make forwarding and organizing link "routing" easier. I can forward all routes that go to /user into a different file that may contain the controllers for '/user/login' and '/user/signup', allowing the link to be expanded, part by part. This works by putting `app.use('/baseLink', baseLinkRouter)` in server.js or within a router to further route a link.

## HTTP Protocol Request Handling

Similarly, the router also handles different kinds of requests (GET, POST, PUT, DELETE) that may be made to the same link. Assume that the route is the same for all these different examples.

If a **GET** request is made, the router `app.get('route', get_exampleController)` is used.

If a **POST** request is made, the router `app.post('route', post_exampleController)` is used.

If a **PUT** request is made, the router `app.put('route', put_exampleController)` is used.

If a **DELETE** request is made, the router `app.delete('route', delete_exampleController)` is used.

Routes can also handle reading the variables inside a link. For example if i have the link '/username/data' where the username is dynamic and should be able to be changed, I would use the route `app.get('/:username/data', controller)`. This passes the username part of the link as a request parameter which can be read and handled uniquely within the controller

## Route List

1. **/user**
   - /
      - *GET*: Connected to getUser Controller
   - /login
      - *POST*: Connected to login Controller
   - /signup
      - *POST*: Connected to signup Controller
   - /:username/tasks
      - *GET*:Connected to returnAllUserTasks Controller
   - /all
      - *GET*:Connected to returnAllUsers Controller

2. **/task**
   - /
      - *POST*: Connected to createTask Controller
      - *PUT*: Connected to updateTask Controller
   - /all
      - *GET*: Connected to returnAllTasks Controller
   - /:taskID
      - *GET*: Connected to getTask Controller
