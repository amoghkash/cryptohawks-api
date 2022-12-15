# Models

## What are models?

Models are created to simplify the making and management of documents within the database. There are two models, the task model and the user model. They both allow you to easily access and manipulate their respective collections in the cloud.

## How they work

Models are connected to a schema and a collection.

### Schema

The schema defines what fields are in a document along with the type of data in each field. If any field is needed to be added to a document, the model must first be updated. If a document for a user is attempting to be made without fulfilling all the model's requirements, the mongoose library will throw an error.

### Collection

The Model is also connnected to a collection. For example, the Task model is connected to the 'task' collection, while the User model is connected to the 'user' collection. When using a model to access data, the collection will automatically be set.

## Model List

1. User Schema
   1. username
      - String
      - **Required**
      - Max Length: 200 characters
   2. name
      - String
      - **Required**
      - Max Length: 200 characters
   3. password
      - String
      - **Required**
      - Max Length: 200 characters
   4. subteam
      - Object
   5. grade
      - Number
   6. tasks
      - Array
      - **Required**
   7. admin
      - Boolean
      - **Required**
   8. Timestamps
      - Date Created
      - Date Updated

2. Task Schema
   1. title
      - String
      - **Required**
   2. uid
      - Number
      - **Required**
   3. description
      - String
      - **Required**
   4. assignee
      - String
   5. isCompleted
      - Boolean
      - **Required**
   6. percentCompleted
      - Number
      - **Required**
   7. startDate
      - Date
   8. endDate
      - Date
   9. type
      - String
      - **Required**
