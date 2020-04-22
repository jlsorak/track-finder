# track-finder
A React &amp; GraphQL web app to find and favourite Spotify tracks.

![A desktop and mobile screenshot of the Track Finder App](trackFinderScreenshot.png?raw=true)

# Getting started
These instructions will get you up and running on your local machine.

## Prerequisites
The server relies on a [MongoDB](https://www.mongodb.com/) database to persist data so you will need MongoDB installed and running. 

You can check if you have MongoDB installed already by typing `mongo --version` into your command line. If you don't, you can install it relatively quickly using a package manager e.g. `brew install mongodb` for Mac OS or `apt-get install mongodb` on Linux. 

To run MongoDB, run `mongod` in the command line.

For more details, see the [MongoDB intall guide](https://docs.mongodb.com/manual/installation/).

## Installing and starting
You need to run commands in both the client and server directories so you will need 2 terminal windows for this:

### Client
```
cd client
npm install
npm run start
```

### Server
```
cd server
npm install
```
In order to authenticate with the [Spotify API](https://developer.spotify.com/documentation/web-api/) you need a client ID and secret. I can provide these for you or you can get them by signing up for a [Spotify developer account](https://developer.spotify.com/dashboard/#). I just can't commit them to Github for security reasons. Once you have these you can start the server with them:
```
SPOTIFY_CLIENT_ID=[client id goes here] SPOTIFY_CLIENT_SECRET=[client secret goes here] npm run start
```

# Client
The initial boilerplate code comes from [Create React App (CRA)](https://github.com/facebook/create-react-app) which will make future maintainance easier (updating `React-Scripts`). 

## Data
To fetch data form the GraphQL server I have used [Apollo Client](https://www.apollographql.com/docs/react/). There's a number of reasons I chose to use Apollo Client: 
* A shiny new Hooks API which makes fetching data and managing error/loading states easy
* Zero-config intelligent caching to improve the performance of queries
* It offers a local state management solution (i.e. an alternative to Redux/MobX) which could be useful if I was to extend this app further

## Styling
To assist with styling I have made use of [TailwingCSS](https://tailwindcss.com/), a utility-first css framework which offers a variety of classes which can be applied directly in the components. This makes applying styles particulairly quick and easy, especially ones that target specific breakpoints in order to produce a responsive design.

At build-time, [PostCSS](https://postcss.org/) is used to transform the Tailwind directives in our main stylesheet (`tailwind.css`) and generate an output CSS file `index.css` which is used to style the app. This is done automatically when starting the app.

In addition to making use of the TailwindCSS inside the components bt applying classes, I've moved any styles that are reusable, such as button styles, in to the main stylesheet and used the tailwind `@apply` directive to group tailwind styles into one class. 
e.g.
```
.btn {
  @apply font-bold py-2 px-4 rounded;
}
```
This has the benefit that it reduces code duplication and prevents components becomming too cluttered with classes.

The `tailwind.css` file also includes a very small number of styles that couldn't be applied using TailwindCSS.

### Performance
Tailwind is a relatively heavy framework due to the number of utilities classes it offers. In order to reduce the CSS output, I am using [PurgeCSS](https://purgecss.com/) to remove unused CSS and reduce the file size significantly.

## Accessibility 
Although not fully accessibility audited, the interface has been created with accessibility principles in mind. Particular attention has gone in to ensuring:
* Interactable elements can be accessed using the keyboard only
* A 'Skip to content' link is available
* Colour contrast levels are sufficient (WCAG AA/AAA)
* Suitable ARIA Landmarks are available (`navigation`, `search`, `banner` & `main` are all present)
* Images have suitable alternative text
* Generally using semantic markup

## Icons
Using [React Icons](https://github.com/react-icons/react-icons) to deliver Font Awesome icons as SVGs. This is preferable for performance reasons as it serves only the icons required as opposed to a large font file.

## Improvements
* Images should be optimised or lazy loaded to improve performance
* Perform a full accessibilty audit

# Server
The server is running the [Express integration](https://github.com/apollographql/apollo-server/tree/master/packages/apollo-server-express) of [Apollo-Server](https://github.com/apollographql/apollo-server#readme) and uses MongoDB to persist data. 

## Queries and Mutations
The server exposes 2 queries and 2 mutations in order to fetch and manipulate data for our app.

`favouriteTracks` - a query that fetches the user's favourite tracks from the database
`searchTracks` - a query that takes a search term and uses it to search Spotify's API for a track
`favouriteTrack` - a mutation that takes a trackId and saves this to the database
`unfavouriteTrack` - a mutation that takes a trackId and deletes it from the database, if it exists
``

## Database
A MongoDB database is used to save the user's 'favourite tracks'. I have used [Mongoose](https://mongoosejs.com/), and ODM (Object Document Mapper) which enables us to define and validate schemas for our modelled data. The schema is very simple (one field in fact!) at the moment so this is wasn't absolutely vital, but it certainly helps if the app were to be expanded and more data was stored.

## Spotify Integration
The main data source for the app is the [Spotify Web Api](https://developer.spotify.com/documentation/web-api/). I have followed Apollo's recommended pattern for fetching data from a REST API by making use of [apollo-datasource-rest](https://www.apollographql.com/docs/apollo-server/data/data-sources/) which offers a class which aids with the data fetching.

### Authorization
In order to make requests to the main Spotify API, you must first gain 'App Authorization'. There are a number of authorization flows that Spotify offers, I have used the [Client Credentials Flow](https://developer.spotify.com/documentation/general/guides/authorization-guide/#client-credentials-flow). The Client Credentials Flow requires you to send a client ID and secret (provided when signing up for a developer account) and the API returns an access token which can be used to make requests for data to the API. This is all handled inside the `SpotifyAPI.js`.

