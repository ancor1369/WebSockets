#  Real time communication

This project shows how it is possible to use socket.io to build a chat application on top of it. As it has communication backend writen for its ussage with Node js, it allows writing its logics on javascript and therefore making its use very easy on web environments.

To demonstrate the ussage of this library, this implementation creates a simple chat room that allows the users to communicates with each other so that when at least two users are connected, they can share messages back and forth.

The architecture is as it is following explained. It has a backend server built on Node.js that receives and manages the chat room, Every user who connects is joined into the chat room that was created and then every message that is shared in the chat room, is emmited to the users connected.

The front end has a chat.js file that manages all the incomming and outgoing messages and intereacts with the html file which defines the actual screen the end user is working with.

The first thing when running the application is to provide name and room name in the following form.

![image](https://user-images.githubusercontent.com/25968721/66840521-3223f300-ef36-11e9-9fa5-710832071324.png)

Once the user is loged into the system, it is possible for them to interact as it is shown in the following image.

![image](https://user-images.githubusercontent.com/25968721/66841412-a90dbb80-ef37-11e9-8cff-f81a64714c22.png)

## How to run this sample

Clone the repository, then install all the npm packages taht are required and finally run the server.

```bash
$ git clone https://github.com/ancor1369/WebSockets.git
$ cd WebSockets/
$ npm install
$ cd server
$ node server.js
Server is up on 3000
```

Once the server is runnig, you can open a web browser and head to localhost:3000, Once you have one web broser open, open another instance of the web browser and head to the same url localhost:3000, Then you can log to the same room and start interacting.

This is a project that is updated every time we want to put in place new changes.
