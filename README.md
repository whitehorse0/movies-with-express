## movies-with-express
simple movies explore - a small ExpressJS server to search movies on https://omdbapi.com/

----------

### Getting started

----------

## Code overview

### Folders

- `controllers` - Contains all the application controller
- `routes` - Contains all the the route definitions for our API
- `service` - Contains API service third part, which we are currently using it https://omdbapi.com/

Run the project development server

    npm start

The api can now be accessed at

    http://localhost:3000

To check the list of available api and can be accessed at

    http://localhost:3000/endpoints


----------

#### Available endpoint:
Search

    http://localhost:3000/movies

Query String

| **Required** 	|       **Key**      |  **Valid Options**   |
|---------------|--------------------|----------------------|
| Yes      	    | search         	 |          -         	|
| Optional      | title         	 |          -         	|
| No      	    | type               | movie,series,episode |
| No     	    | year          	 |          -     	    |
| No     	    | page          	 |        1 - 100    	|

``` http://localhost:3000/movies?search=batman&page=1 ```

with Param Id

    http://localhost:3000/movies/:id

Param :id is imdbID 

``` http://localhost:3000/movies/tt2975590 ```
