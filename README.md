# CKAN Search
The CKAN search frontend is an react redux application created to showcase the ontology features created in CKAN using the [ckanext-ontology](https://github.com/OpenTransportDataProject/ckanext-ontology) plugin. The frontend passes data to and from the CKAN server and uses the D3 library to visualize data relations.

## Setup
To work on this project one need to have installed [nodejs](https://nodejs.org/en/) and npm.

Install project dependencies:
```
$ npm install
```

Start dev server with hot reload:
```bash
$ npm start
```

## Build
Build and compile the source code for web deployment
```bash
$ npm run build
```

## Linting
ESLint is used to maintain high code quality and a unified code style.
To run the linter, use:
```
$ npm run lint
```
