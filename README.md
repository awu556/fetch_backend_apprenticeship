<h2>Fetch Rewards Coding Exercise - Backend Software Engineering</h2>

Welcome! Thanks for taking the time to review my asssessment. Below are a couple of details on getting started and available functionality.

**Requirements**

- Node
- npm

**Optional tools (for testing)**

- Postman

**Installing Dependencies**

Run `npm install` in the root of the project folder.

**Running The Server**

Run `npm run start-server` in the root of the project folder.

By default the server will run at `localhost:8000` unless an environment variable is declared in Node.

**HTTP Route Functionality**

_GET Routes_

`http://localhost:8000/api/transactions`

- Will return a list ordered by timestamp and date of mock data transactions created with payer, points, and timestamp. This route is used to keep track of transaction history.

`http://localhost:8000/api/transactions/payerBalances`

- Will return a list of all point balances for payers listed in the transactions history.

_POST Routes_

`http://localhost:8000/api/transactions/add`

- Can add a single transaction (as 1 object) or multiple transactions (as an array of objects) to the transaction history with included timestamps. Updates the trasaction history as well as payer point balances.

  - Single transaction example:

  ```
  {
      "payer": "WALMART",
      "points": 1500
  }
  ```

  - Multiple transactions example:

  ```
  [
     {
      "payer": "WALMART",
      "points": 1500
     },
     {
      "payer": "TARGET",
      "points": 600
     },
     {
      "payer": "BESTBUY",
      "points": 200
     },
     {
      "payer": "STOP&SHOP",
      "points": 450
     }
  ]
  ```

`http://localhost:8000/api/transactions/spendPoints`

- When given a object of point values, will return a list of point expenditures for each payer based on the order of current transaction history. When points are spent, it updates the payer balances and transaction history.

  - Points example

  ```
  {
    "points": 5000
  }
  ```
