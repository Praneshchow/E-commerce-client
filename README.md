# Ecommerce React Web (Ema-john)

## Github Setup: 

Git clone: `git clone <..link..>` 

Git Remote set: `git remote set-url origin <..link..>`

You can check your remote location: `git remote -v`

Create your own repository. Then set the remote location of your repository.

## React Project Run

React package Install: `npm install`

React project run: `npm run dev`

## Features: 

* API Data Loading
* Authentication Using Firebase (Login and Registration)
* Private Routing
* CRUD Operations on the Server Side (Express and MongoDB)


## API

Link to load API data: https://raw.githubusercontent.com/ProgrammingHero1/ema-john-resources/main/fakeData/products.json


## React Router Setup: 

Run this: `npm install react-router-dom localforage match-sorter sort-by`


## Feature Applied:

* React Router.
* Accessing parent and child component data using context API. 
* Login and Registration using Firebase. 
* Private router (Orders component is a private access). 
* Checklist path/location show After login or load the home section. 



Used Commands for firebase setup and deploy:
-----------------------------------------------------
initial deployment then switched to netlify. 


`npm install -g firebase-tools`

`firebase login`

```

Allow Firebase to collect CLI and Emulator Suite usage and error reporting information? Yes

Are you ready to proceed? Yes

Select a default Firebase project for this directory: Your_project

What do you want to use as your public directory? dist

Configure as a single-page app (rewrite all urls to /index.html)? Yes

Set up automatic builds and deploys with GitHub? No

```

`npm run build`

`firebase deploy`

