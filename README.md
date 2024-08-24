# Budget Envelopes API

This API allows users to manage budget envelopes. Users can create, update, delete, and transfer funds between envelopes.

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/budget-envelopes-api.git
   ```

2. Navigate into the project directory:
   ```bash
   cd budget-envelopes-api
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the server:
   ```bash
   npm start
   ```

The server will start on `http://localhost:3000`.

## API Endpoints

### Create a New Envelope

- **URL**: `/envelopes/create`
- **Method**: `POST`
- **Body Parameters**:
  - `title` (string): The title of the envelope.
  - `budget` (number): The initial budget of the envelope.
- **Response**: Returns the created envelope and updated total budget.

### Retrieve a Specific Envelope

- **URL**: `/envelopes/:id`
- **Method**: `GET`
- **Response**: Returns the details of the specified envelope.

### Update an Envelope

- **URL**: `/envelopes/:id`
- **Method**: `PUT`
- **Body Parameters** (optional):
  - `title` (string): The new title of the envelope.
  - `budget` (number): The new budget of the envelope.
  - `extractAmount` (number): The amount to subtract from the envelope's budget.
- **Response**: Returns the updated envelope and total budget.

### Delete an Envelope

- **URL**: `/envelopes/:id`
- **Method**: `DELETE`
- **Response**: Confirms the deletion and returns the updated list of envelopes.

### Transfer Budget Between Envelopes

- **URL**: `/envelopes/transfer/:from/:to`
- **Method**: `POST`
- **Body Parameters**:
  - `amount` (number): The amount to transfer from the `from` envelope to the `to` envelope.
- **Response**: Confirms the transfer and returns the updated envelopes.

## Testing

You can use [Postman](https://www.postman.com/) or similar tools to test the API.

### Example Postman Requests

- **Create Envelope**:
  - Method: `POST`
  - URL: `http://localhost:3000/envelopes/create`
  - Body:
    ```json
    {
      "title": "Dining Out",
      "budget": 200
    }
    ```

- **Transfer Budget**:
  - Method: `POST`
  - URL: `http://localhost:3000/envelopes/transfer/1/2`
  - Body:
    ```json
    {
      "amount": 50
    }
    ```


