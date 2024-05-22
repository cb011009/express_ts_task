
# Express App with TypeScript

This project is a Node.js application built using Express.js and TypeScript, and it connects to a MongoDB database. It exposes an endpoint, utilizing TypeScript for all coding to ensure maintainability.

## Installation

1.Clone the Repository 

```bash
git clone https://github.com/cb011009/express_ts_task.git
```
2.cd into express_ts_task directory

```bash
cd express_ts_task
```
3.Install dependencies using npm

```bash
npm install
```
## Usage

Development Mode: Run the server in development mode with automatic compilation on file changes, use:

```bash
npm run serve
```
The above command concurrently runs TypeScript compiler (tsc) in watch mode and the server using nodemon.

# Database Structure
In our MongoDB database, there is a collection named students. Each document within this collection represents a student and follows the structure below:

```bash
{
  "_id": "664dad40daf31a9c24e289e6",
  "name": "John Doe",
  "age": 20,
  "degree": "Computer Science"
}
```

# API EndPoints

The API supports the following CRUD operations for managing the students collection in the MongoDB database. These operations have been tested using Postman.

## List All Students at http://localhost:3000/students

- **Endpoint:** `/students`
- **HTTP Method:** `GET`
- **Description:** Retrieves a list of all students in the database.

## Add a New Student at http://localhost:3000/students

- **Endpoint:** `/students`
- **HTTP Method:** `POST`
- **Description:** Adds a new student to the database.
- **Request Body Example:**


```bash
{
  "name": "Jane Smith",
  "age": 22,
  "degree": "Mathematics"
}
```
## Update an Existing Student at http://localhost:3000/students/<id>

- **Endpoint:** `/students/:id`
- **HTTP Method:** `PATCH`
- **Description:** Updates the details of an existing student specified by the student ID.
- **Request Body Example:**


```bash
{
  "name": "Jane Smith",
  "age": 22,
  "degree": "Mathematics"
}
```

  
## Delete an Existing Student at http://localhost:3000/students/<id>

- **Endpoint:** `/students/:id`
- **HTTP Method:** `DELETE`
- **Description:** Deletes a student from the database specified by the student ID.

## Testing

All endpoints have been tested using Postman to ensure they work as expected.



