Backend - Customer Management API
This backend API is built using ASP.NET Core and provides a set of CRUD operations for managing customer data. The API is designed to handle requests for creating, reading, updating, and deleting customer records. It follows a clean architecture pattern, ensuring separation of concerns and maintainability.

Features:
Get All Customers: Retrieve a list of all customers.
Get Customer by ID: Fetch a specific customer by their unique ID.
Create Customer: Add a new customer to the database.
Update Customer: Modify existing customer information.
Delete Customer: Remove a customer from the database.
Endpoints:
GET /customers: Retrieves all customers.
GET /customers/{id}: Retrieves a customer by ID.
POST /customers: Creates a new customer.
PUT /customers: Updates an existing customer.
DELETE /customers/{id}: Deletes a customer by ID.
Technologies Used:
ASP.NET Core
Entity Framework Core
Dependency Injection

Frontend - Customer Management Application
This frontend application is built using Angular and provides a user-friendly interface for managing customers. It leverages reactive forms for efficient form handling and state management via NgRx.

Features:
Customer List: Display all customers in a tabular format.
Create Customer: Form for adding new customers.
Edit Customer: Form for updating existing customer information.
Form Validation: Ensures all inputs are valid before submission.
Loading Spinner: Displays a spinner while data is being processed.
Technologies Used:
Angular
Reactive Forms
HttpClient Module for API requests
NgRx for state management
Toastr for user notifications