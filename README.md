# Catch Express Errors 🚀

Catch Express Errors is a lightweight package that provides error handling and async error catching for your Express applications. It helps you handle application errors gracefully and ensures that no errors go unnoticed.

## Installation

Install the package using npm:

```shell
npm install catch-express-errors
```

## Features

✅ Global error handler for Express  
✅ Catch async function errors  
✅ Custom AppError class for consistent error handling  
✅ Supports both TypeScript and JavaScript  
✅ Compatible with CommonJS and ES modules  
✅ Easily integrate with existing Express applications  
✅ Lightweight and minimalistic

## Usage

### Global Error Handler

In your `app.ts` or `app.js` file:

```typescript
import express from "express";
import { handleGlobalErrors, AppError } from "catch-express-errors";

const app = express();

// ...

// ... Your Express routes and middleware

app.use(handleGlobalErrors());

// ...
```

You can also use a logger with the global error handler:

```typescript
import { createLogger } from "winston";

const logger = createLogger({
  // configure your logger
});

// ... Your Express routes and middleware

app.use(handleGlobalErrors(logger));
```

### Catch Async Function Errors

Wrap your async route handler functions using the `catchAsync` function to catch any errors and pass them to the global error handler:

```javascript
const catchAsync = require("catch-express-errors/catchAsync");

app.get(
  "/users",
  catchAsync(async (req, res) => {
    // Your async code here
  })
);
```

Or

```typescript
import { catchAsync, AppError } from "catch-express-errors";

const signUp = catchAsync(async (req, res, next) => {
  // Your async code here
  if (err) return next(new AppError("Invalid authentication", 401)); // AppError example
});

// ...
```

### AppError

Use the `AppError` class to create custom errors with consistent properties:

```javascript
const { AppError } = require("catch-express-errors");

const getUserData = async () => {
  if (!data) throw new AppError("User not found!", 404);
};
```

or

```typescript
import { AppError } from "catch-express-errors";

// Example usage
return next(new AppError("Please login again", 401));
```


## License

This package is licensed under the [MIT License](https://opensource.org/licenses/MIT). See the [LICENSE](./LICENSE) file for more information.

## Contributing

Contributions are welcome! Feel free to open issues and submit pull requests to improve this package.

## Support

If you have any questions, suggestions, or need assistance, please feel free to contact the package maintainer or open an issue on the GitHub repository.
