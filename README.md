# track-finder
A React &amp; GraphQL web app to find and favourite Spotify tracks.

![A desktop and mobile screenshot of the Track Finder app](trackFinderScreenshot.png?raw=true)

# Getting started
These instructions will get you up and running on your local machine.

## Prerequisites
The server relies on a [MongoDB](https://www.mongodb.com/) database to persist data so you will need MongoDB installed and running. 

You can check if you have MongoDB installed already by typing `mongo --version` into your command line. If you don't, you can install it relatively quickly using a package manager e.g. `brew install mongodb` for Mac OS or `apt-get install mongodb` on Linux. 

To run MongoDB, run `mongod` in the command line.

For more details, see the [MongoDB intall guide](https://docs.mongodb.com/manual/installation/).

## Installing and starting
Clone the project and navigate to the directory:
```
git clone git@github.com:jlsorak/track-finder.git
cd track-finder
```

You will need 2 terminal windows for the next part as you need to run commands in the client and server directories:

### Server
To authenticate with the [Spotify API](https://developer.spotify.com/documentation/web-api/) you need a client ID and secret. I can provide these for you or you can get them by signing up for a [Spotify developer account](https://developer.spotify.com/dashboard/#). I just can't commit them to Github for security reasons. Once you have these you can start the server with them:
```
cd server
npm install
SPOTIFY_CLIENT_ID=[client id goes here] SPOTIFY_CLIENT_SECRET=[client secret goes here] npm run start
```

### Client
```
cd client
npm install
npm run start
```
This should then open the app at `http://localhost:3000/`

## Running the tests
Currently, only the frontend contains tests. You can run these by using:
```
cd client
npm run test
```
By default, this will only run the tests changed since the last commit, so you will need to press `a` on your keyboard once the test runner has started to run all the tests.

# Client
The initial boilerplate code comes from [Create React App (CRA)](https://github.com/facebook/create-react-app) which will make future maintenance easier (updating `React-Scripts`). 

## Data
To fetch data from the GraphQL server I have used [Apollo Client](https://www.apollographql.com/docs/react/). There are several reasons I chose to use Apollo Client: 
* A shiny new Hooks API which makes fetching data and managing error/loading states easy
* Zero-config intelligent caching to improve the performance of queries
* It offers a local state management solution (i.e. an alternative to Redux/MobX) which could be useful if I was to extend this app further

## Styling
To assist with styling I have made use of [TailwingCSS](https://tailwindcss.com/), a utility-first CSS framework which offers a variety of classes which can be applied directly in the components. This makes applying styles particularly quick and easy, especially ones that target specific breakpoints to produce a responsive design.

At build-time, [PostCSS](https://postcss.org/) is used to transform the Tailwind directives in our main stylesheet (`tailwind.css`) and generate an output CSS file `index.css` which is used to style the app. This is done automatically when starting the app.

In addition to making use of the TailwindCSS inside the components bt applying classes, I've moved any styles that are reusable, such as button styles, into the main stylesheet and used the tailwind `@apply` directive to group tailwind styles into one class. 
e.g.
```
.btn {
  @apply font-bold py-2 px-4 rounded;
}
```
This has the benefit that it reduces code duplication and prevents components from becoming too cluttered with classes.

The `tailwind.css` file also includes a very small number of styles that couldn't be applied using TailwindCSS.

### Performance
Tailwind is a relatively heavy framework due to the number of utility classes it offers. To reduce the CSS output, I am using [PurgeCSS](https://purgecss.com/) to remove unused CSS and reduce the file size significantly.

## Accessibility 
Although not fully accessibility audited, the interface has been created with accessibility principles in mind. Particular attention has gone into ensuring:
* Interactable elements can be accessed using the keyboard only
* A 'Skip to content' link is available
* Colour contrast levels are sufficient (WCAG AA/AAA)
* Suitable ARIA Landmarks are available (`navigation`, `search`, `banner` & `main` are all present)
* Images have suitable alternative text
* Generally using semantic markup

Although automated tests should not be a replacement for manual testing, I also ran the app through [Accessibility Insights](https://accessibilityinsights.io/docs/en/web/overview)'s automated checks which identified no issues.

## Icons
Using [React Icons](https://github.com/react-icons/react-icons) to deliver Font Awesome icons as SVGs. This is preferable for performance reasons as it serves only the icons required as opposed to a large font file.

## Unit tests
The majority of components have tests against them, found in the `__tests__` directory. The test runner is [Jest](https://jestjs.io/) and I have used [testing-library (React)](https://testing-library.com/) to help with testing the React components. Testing-library offers an opinionated set of utilities to encourage good practices. I am more familiar with Enzyme than testing-library so it was interesting to read into their [guiding principles](https://testing-library.com/docs/guiding-principles). 

Testing components which query/mutate data is a little trickier, I used the [@apollo/react-testing](https://www.apollographql.com/docs/react/development-testing/testing/#an-introduction) library to create a [mocked provider](https://www.apollographql.com/docs/react/development-testing/testing/#mockedprovider) which aided in testing mock query data and loading/error states.

## Improvements
* Images should be optimised or lazy-loaded to improve performance
* Further improve test coverage
* Perform a manual accessibility audit to identify issues


# Server
The server is running the [Express integration](https://github.com/apollographql/apollo-server/tree/master/packages/apollo-server-express) of [Apollo-Server](https://github.com/apollographql/apollo-server#readme) and uses MongoDB to persist data. 

## Queries and Mutations
The server exposes 2 queries and 2 mutations to fetch and manipulate data for our app.

`favouriteTracks` - a query that fetches the user's favourite tracks from the database  
`searchTracks` - a query that takes a search term and uses it to search Spotify's API for a track  
`favouriteTrack` - a mutation that takes a track's id and saves this to the database  
`unfavouriteTrack` - a mutation that takes a track's id and deletes it from the database, if it exists  

## Database
A MongoDB database is used to save the user's 'favourite tracks'. I have used [Mongoose](https://mongoosejs.com/), and ODM (Object Document Mapper) which enables us to define and validate schemas for our modelled data. The schema is very simple (one field in fact!) at the moment so this is wasn't vital, but it certainly helps if the app were to be expanded and more data was stored.

## Spotify Integration
The main data source for the app is the [Spotify Web Api](https://developer.spotify.com/documentation/web-api/). I have followed Apollo's recommended pattern for fetching data from a REST API by making use of [apollo-datasource-rest](https://www.apollographql.com/docs/apollo-server/data/data-sources/) which offers a class which aids with the data fetching.

### Authorization
To make requests to the main Spotify API, you must first gain 'App Authorization'. There are a number of authoation-flows that Spotify offers, I have used the [Client Credentials Flow](https://developer.spotify.com/documentation/general/guides/authorization-guide/#client-credentials-flow). The Client Credentials Flow requires you to send a client ID and secret (provided when signing up for a developer account) and the API returns an access token which can be used to make requests for data to the API. This is all handled inside the `SpotifyAPI.js`.

