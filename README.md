# Catch Express Errors 🚀

Catch Express Errors is a lightweight package that provides error handling and async error catching for your Express applications. It helps you handle application errors gracefully and ensures that no errors go unnoticed.

## Installation

Install the package using npm:

```shell
npm install catch-express-error
```

## Features

✅ Global error handler for Express  
✅ Catch async function errors  
✅ Custom AppError class for consistent error handling  
✅ Supports both TypeScript and JavaScript  
✅ Compatible with CommonJS and ES modules  
✅ Easily integrate with existing Express applications  
✅ Lightweight and minimalistic

## Usage:

### AppError

**Description:** 
`AppError` is a custom error class designed to represent application-specific errors. It extends the built-in `Error` class and allows you to create instances of errors with customized properties.

**Parameters:**
1. `message` (string): A descriptive message explaining the error.
2. `statusCode` (number, optional): The HTTP status code associated with the error. Defaults to 400 (Bad Request) if not provided.
3. `details` (any, optional): Additional details or data related to the error.
4. `name` (string, optional): A custom name for the error. Defaults to "App Error" if not provided.
5. `code` (string | number, optional): A custom error code or identifier.
   
### catchAsync

**Description:** 
`catchAsync` is a higher-order function that wraps an asynchronous function to catch any errors it may throw and pass them to Express.js's error handling middleware.

**Parameters:**
1. `fn` (Function): The asynchronous function to be wrapped. It should accept `(req, res, next)` parameters.

### handleGlobalErrors

**Description:** 
`handleGlobalErrors` is an Express.js error handling middleware that centralizes error handling for your application. It handles different types of errors and provides appropriate responses, including logging.

**Parameters:**
1. `logger` (Logger | null, optional): An optional Winston logger instance for logging errors. If not provided or set to `null`, errors will be logged to the console.
2. `isProduction` (boolean, optional): A flag indicating whether the application is in production mode. Defaults to `false` if not provided.

**Please note that `AppError` is a class, and `catchAsync` and `handleGlobalErrors` are functions that can be used as middleware in your Express.js application to handle errors in a standardized way.**

## Examples:
### Global Error Handler

In your `app.ts` or `app.js` file:

```typescript
import express from "express";
import { handleGlobalErrors, AppError } from "catch-express-error";

const app = express();

// ...

// ... Your Express routes and middleware

app.use(handleGlobalErrors()); 

// ...
```

You can also use a logger with the global error handler:

```typescript
import { handleGlobalErrors} from "catch-express-error";

import { createLogger } from "winston";

const logger = createLogger({
  // configure your logger
});

const app = express();

// ... Your Express routes and middleware

app.use(handleGlobalErrors(logger));
```

Production and Development mode with and without logger.:

```typescript
import { handleGlobalErrors} from "catch-express-error";
import { createLogger } from "winston";

const logger = createLogger({
  // configure your logger
});

const app = express();

// ... Your Express routes and middleware

app.use(handleGlobalErrors()); // Without 'logger' and 'development' mode

app.use(handleGlobalErrors(logger)); // With 'logger' and 'development' mode.

app.use(handleGlobalErrors(null, true)); // Without 'logger' and 'production' mode.

app.use(handleGlobalErrors(logger, true)); // With 'logger' and 'production' mode.

```

### Catch Async Function Errors

Wrap your async route handler functions using the `catchAsync` function to catch any errors and pass them to the global error handler:

```javascript
const { catchAsync } = require("catch-express-error");

app.get(
  "/users",
  catchAsync(async (req, res) => {
    // Your async code here
  })
);
```

Or

```typescript
import { catchAsync, AppError } from "catch-express-error";

const signUp = catchAsync(async (req, res, next) => {
  // Your async code here
  if (err) return next(new AppError("Invalid authentication", 401)); // AppError example
});

// ...
```

### AppError

Use the `AppError` class to create custom errors with consistent properties:

```javascript
const { AppError } = require("catch-express-error");

const getUserData = async () => {
  if (!data) throw new AppError("User not found!", 404);
};
```

or

```typescript
import { AppError } from "catch-express-error";

// Example usage
return next(new AppError("Please login again", 401));
```

## License

This package is licensed under the [MIT License](https://opensource.org/licenses/MIT). See the [LICENSE](./LICENSE) file for more information.

## Contributing

Contributions are welcome! Feel free to open issues and submit pull requests to improve this package.

## Support

If you have any questions, suggestions, or need assistance, please feel free to contact the package maintainer or open an issue on the GitHub repository.
