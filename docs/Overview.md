# Overview of API

## Framework

The API is part of a **MERN** framework, making use of *MongoDB*, *Express*, and *NodeJS* to simplify and accelerate development and functionality of the system.

## Components

There are 5 main parts of the API:

1. controllers
2. db
3. models
4. routes
5. scripts

Each of the different parts are connected and serves a different purpose in the handling and the processing of a request to the API. The purpose and specifications of each part can be found in their respective Markdown file.

## Deployment

The API is deployed to Google Cloud Run, which containerizes the API and allows it to scale relatively seamlessly. Deploying is automatically managed. All that is needed to deploy the API to the cloud is a commit to the main branch of the github repository.

### Docker

There is a "Dockerfile" in the repo that defines how the image is built and served.

## Types of Data

The API mainly handles two kinds of data:

1. User Data
2. Task Data

## Flow of Application

The application works in this way:

1. Launches to server.js
2. Based on request link, follows specified route which is linked to a controller
3. Runs code in specified controller
