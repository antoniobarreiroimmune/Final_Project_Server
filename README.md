# Forensic Medicine API Documentation

This full-stack application caters to the administrative and legal needs of forensic medicine workers. It enables users to log in, create, update, and pass procedures to other departments for further management.

## Base URL

`http://localhost:3001/api`

All endpoints are relative to this base URL.

## Authentication

- **Type:** Bearer Token
- Authentication is required for most endpoints. Ensure to include the bearer token in the header of your requests.

## Endpoints Overview

### User

#### Login

- **Endpoint:** `/auth/login`
- **Method:** POST
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "yourPassword"
  }
  ```
- **Description:** Authenticates a user and returns a session token.
- **Response:** `{ "token": "YOUR_SESSION_TOKEN" }`

### Procedures

#### Create Procedure

- **Endpoint:** `/procedures/create`
- **Method:** POST
- **Description:** Creates a new procedure with detailed information.
- **Body Required:** Yes (procedureNumber, name, firstName, lastName, indicators for gender and domestic violence, judicialBody, procedureReport, procedureCompleted).

#### Edit Procedure

- **Endpoint:** `/procedures/edit/{procedureId}`
- **Method:** PUT
- **Description:** Updates information for an existing procedure by its ID.

#### List Procedures

- **Endpoint:** `/procedures/list`
- **Method:** GET
- **Description:** Retrieves a list of all procedures.

#### Show Procedure Details

- **Endpoint:** `/procedures/show/{procedureId}`
- **Method:** GET
- **Description:** Fetches details of a specific procedure by ID.

### Pathology

#### List Pathologies

- **Endpoint:** `/pathology/list`
- **Method:** GET
- **Description:** Returns a list of pathology records.

#### Show Pathology

- **Endpoint:** `/pathology/{pathologyId}`
- **Method:** GET
- **Description:** Retrieves detailed information for a specified pathology by ID.

#### Edit Pathology

- **Endpoint:** `/pathology/edit/{pathologyId}`
- **Method:** PUT
- **Description:** Updates a specific pathology record by ID.

### Final Report

#### List Final Reports

- **Endpoint:** `/finalreport/list`
- **Method:** GET
- **Description:** Fetches a list of final reports.

#### Show Final Report

- **Endpoint:** `/finalreport/{reportId}`
- **Method:** GET
- **Description:** Retrieves a specific final report by ID.

#### Edit Final Report

- **Endpoint:** `/finalreport/edit/{reportId}`
- **Method:** PUT
- **Description:** Updates the specified final report.

## Note on Responses

Responses for successful requests typically return a JSON object containing the requested data or a confirmation of the action taken. Errors are returned as JSON with an error message and, when applicable, an error code.
