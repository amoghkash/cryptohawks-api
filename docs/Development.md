# CryptoHawks API Development Guide

## Setup

To get started, make sure you have the following installed:

- [NodeJS](https://nodejs.org/en/)
- Node Package Manager(NPM) *this should install with NodeJS*

After you have NodeJS and NPM installed, test the installation by running the following commands in your terminal/command prompt:

- `node -v`
- `npm -v`

If both the commands above indicate that you have node and npm installed, navigate go to the main directiory of the repository in the CLI, where the package.json file is located. In the CLI type npm install. While it may show a few errors, as long as it prints out that an x number of packages were installed, it has succeeded.

## Environments

### Development

This is the enviroment that is used for development of the API. It has features such as:

- Real-time code execution
  - Server restarts whenever changes are made to the code

To get the development server running on your local machine, run the following command:

`npm start`

### Production

This is the enviroment that is used for production of the API. It doesn't have any special features, but it is a stable enviroment and is what is deployed to the cloud.

To get the production server running on your local machine, run the following command:

`npm run prod`
