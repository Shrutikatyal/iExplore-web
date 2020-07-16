
# iExplore-app
A web application developed under ACMS (Amazon Campus Mentorship Series) project.

### Problem Statement
Build a web tool which shows a building boundary and all the people moving inside that building. It will capture the movement data using an app which will be installed on the mobile devices of all those people, and that app will keep sending location information to a server periodically. The location accuracy should not be more than 5 meters.

### Built With
* Angular 
* Node
* Visual Code Studio IDE

## Getting Started

### Prerequisites
Angular, Node, Node Package Manager, Git, Server (from where you'll fetch the locations)

### Sub-module used
Node Server (https://github.com/shubhangi-ghosh/ACMS_server.git)

### Installation
To import this project into Visual Code Studio, proceed as follows:

1. Open command palette (ctrl+shift+p) > git clone.
2. Enter URL: **https://github.com/shubhangi-ghosh/ACMS_server.git**
3. Click **Clone**.
4. Open terminal (ctrl+`).
5. Run **npm install** to install the required node modules.
6. Run **ng serve** for a dev server. Navigate to **http://localhost:4200/**. The app will automatically reload if you change any of the source files.

(Make sure your server is running at http://localhost:3000)

## Dev

### To Do
- [x] Setting up Leaflet Map.  
- [x] Connecting to server using an HTTP Client.
- [x] Getting building center from the server.
- [x] Getting location updates when application is running in foreground.
- [x] Updating UI as and when location updates are done.
- [x] Changing building view.
- [x] Searching for a particular user.
- [x] Adding new buildings.
- [x] UI Design.

### Development Decisions
*(Click to expand)*
<details>
  <summary><b>Technology stack</b></summary>
  <br />
  These days there are many frontend frameworks available like React, Vue, Flutter and Angular, through which we can design responsive web-apps. <br /><br/>

  <b><u>Our solution:</u></b><br />
    We have chosen <b>AngularJs</b>. It is a structural framework for dynamic web apps. With AngularJS, designers can use HTML as the template language and it allows for the extension of HTML's syntax to convey the application's components effortlessly.Angular makes much of the code you would otherwise have to write completely redundant.<br/><br/>
  Despite the fact that AngularJS is commonly related to SPA, you can use Angular to build any kind of app, taking advantage of features like: two-way binding, templating, RESTful api handling, modularization, AJAX handling, dependency injection, etc.<br/>
  <br/>
  AngularJS already has the ability to handle your project’s wireframes during initial development and testing, as well as other demands like <b>animations</b> and <b>transitions</b> for powerful websites and web applications.<br/><br/>
</details>

<details>
  <summary><b>Rendering Maps</b></summary>
      <br />  
    There are many options available for rendering maps to web applications but most of them are <b>Proprietary Libraries</b>. Examples of such libraries are Google, Esri and Here which ship custom mapping libraries that allow easy usage of their services in your application. However, we wanted an open library for this work and thus chose <b>Leaflet.js</b>. <br/><br/>
    Leaflet is a <b>light</b> and <b>simple</b> mapping library that is relatively easy to use. The library is licensed under BSD-2-Clause and is available on npm. Leaflet has a strong plugin ecosystem which provides strong additional feature sets which can help make Leaflet as functional as other mapping libraries. Thus making a great fit for our solution.
<br />
<br />
</details> 

<details>
  <summary><b>Connecting the app with Server</b></summary><br />
  Mainly there are three approaches for this:<br />
  <ul>
    <li>Proxy</li>
    <li>CORS(Cross-Origin Resource Sharing)</li>
    <li>Serve Static Files From the API’s Server</li>
  </ul>
  
  <b>1. Proxy </b><br/>
   Well, browsers don’t allow you to make cross domain requests, but servers  do. Using the proxy option means that you’re telling Angular CLI’s server to handle the request sent from Angular and resend it from the development server. This way, the one who “talks” with the API’s server is Angular CLI’s server.<br/><br/>
  
  <b>2. CORS</b><br/>
  Browser security doesn’t allow you to make cross domain requests unless the Control-Allow-Origin header exists at the server’s response. Once you configured your API server to ‘‘answer’’ with this header, you can fetch and post data from a different domain. This technique is called <b>Cross Origin Resource Sharing</b>, or CORS. <br/><br/>
  
  <b>3. Serve Static Files From the API’s Server </b><br/>
  Hosting your Angular project (once it has only HTML and JavaScript files) on the same server where data (APIs) is served from allows to retrieve data.<br/>
  One of the advantages of this strategy is that now you do not face any **“cross-domain”** issues, since the client and API are actually on the same server! However, this approach requires the API’s server to be configured properly.
  
  <b><u>Our solution:</u></b><br />
  We are using <b>CORS</b> in this project because of following reasons:<br />
  <ul>
    <li>Most of the common servers and server frameworks like Node.js’ Express, or Java Spring Boot can be easily configured to make CORS available.</li>
    <li>It allows servers to specify not just who can access its assets, but also how the assets can be accessed.</li>
    <li>Handles the Json/Xml parsing itself</li>
    <li>With CORS, a server can specify who can access its assets and which HTTP request methods are allowed from external resources.</li>
  </ul>
<br />
(To get more info visit:https://www.freecodecamp.org/news/the-best-ways-to-connect-to-the-server-using-angular-cli-b0c6b699716c/)<br/>
</details>

<details>
  <summary><b>Authentication</b></summary>
  <br />
  <p>
    We should verify a user's identity before giving him access to the web-app.
  </p>
<b><u>Our solution:</u></b><br />
  We will authenticate users on the basis of our tailored database. A user of web-app must have the access to see other's location. This access can only be added at the backend and thus no registeration option required on the webapp. 
<br /><br />
</details>

## Screenshots
<details>
  <summary>Click to view</summary>
  <br />
  <p align="center">
    <img src="https://i.postimg.cc/gcsTDwzx/login.png"/>
    <img src="https://i.postimg.cc/VkrZmDjt/home.png"/>
    <img src="https://i.postimg.cc/ncLwwHr0/search.png"/>
    <img src="https://i.postimg.cc/rFYZBvtc/search-Result.png"/>
    <img src="https://i.postimg.cc/d1PS3rq0/add-Building.png"/>
    <img src="https://i.postimg.cc/90LgFk8d/building-Result.png"/>
    <img src="https://i.postimg.cc/3xsSRmBc/building-Search.png"/>
  </p>
</details>

## References
- https://www.youtube.com/watch?v=Fdf5aTYRW0E
- https://blog.fullstacktraining.com/display-real-time-data-in-angular/
- https://www.udemy.com/course/angular-2-and-nodejs-the-practical-guide/
- https://medium.com/ngconf/integrating-maps-into-your-angular-application-with-leaflet-b9aedb040735
- https://stackoverflow.com/questions/44053227/how-to-emit-an-event-from-parent-to-child
