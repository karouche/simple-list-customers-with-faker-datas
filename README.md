This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Projects setting  
  In the project, I used some libraries to achieve it, it's an exercise to get into React practice (we need to install them through npm or yarn !).

 - <b>fakers</b> : a _JavaScript library_ for generating fake data 
 - <b>json-server</b> : JSON Server to allow quickly spin up a fake REST API
 - <b>axios</b> :Promise based HTTP client.
 - <b>paginate-array</b> and <b>react-paginate</b> : React components for pagination of datas.
 - <b>react-map-api</b> : This component allows to integrate the Google Maps API provided by https://www.mapbox.com/, a public token from mapbox is used in the current project.
  

### `npm  run server-customers`

Runs the json-server and expose *users*  and *products* services on http://localhost:3000.
We may regenerate the datas with : <b>npm run gen-consumers</b>, this will generate a  *dbconsumers.json* file in the <b>server</b> folder.
Once the json server is launched (with the command above!), our "db consumers" will be exposed through theses urls  : 
http://localhost:3000/users  & http://localhost:3000/products

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:4200](http://localhost:4200) to view it in the browser (the port 3000 is already busy !! ).

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `Deployement`

a demo can be found here : https://customers-sales-demo.netlify.app/
the resources users and products are respectively loaded from https://json-server-consumers.herokuapp.com/users and https://json-server-consumers.herokuapp.com/products
