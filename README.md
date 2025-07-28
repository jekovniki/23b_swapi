## Description

A small project that uses the SWAPI database and provides paginated api with the ability, to sort and filter (filtering by multiple criteria).

## Project setup

After you pull the repository, follow the steps bellow:

```bash
# 1.
$ npm install # install node packages
# 2. make a copy of the .env.example, name it .env - configure the variables if necessary
# 3.
$ docker-compose up # run the infra
# 4.
$ npm run seed # initial fetch of the database. You need to have internet connection.
# 5.
$ npm run start:dev # start the project
```

After the setup you can start the project any time (when you have the infra running) with npm `npm run start:dev`

## Documentation

Inside of the repository there is a **postman.json** file that you can import so you get a preset of all api calls and examples. (Yep, I didn't do swagger)

### Pagination

You have two query params for the pagination: `offset` and `limit`. **Limit** is the amount of items that you will fetch and **offset** is the starting position.
By default every api call will fetch the first 10 items. (?limit=10&offset=0).

Here are a couple of examples:

```bash
/api/v1/films?limit=20&offset=0 # this is going to be page 1 with 20 items
/api/v1/films?limit=20&offset=20 # this is going to be page 2 with 20 items
/api/v1/films?limit=20&offset=40 # this is going to be page 3 with 20 item and etc.
```

### Sorting

You have two parameters for sorting: `order` and `sortBy`. Order accepts two values - either `asc` or `desc`. SortBy accepts values, that are defined in the controller.

Example:

```bash
/api/v1/films?order=asc&sortBy=title # this is going to order the results ascending by title
/api/v1/films?order=desc&sortBy=episodeId # this is going to order the results descending by episodeId
```

### Filtering
