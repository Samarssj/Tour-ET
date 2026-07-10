# Investigation Notes - Tour-ET Backend Issues

## Backend "No Server" Issue
- `tesystem-backend.onrender.com/api/package` returns 404 with header `x-render-routing: no-server`
- This means the backend Web Service is crashed/offline on Render
- Signups reportedly work, so backend must have been running at some point

## Environment Variable Mismatch
- `render.yaml` defines: `JWT_SECRET` (with generateValue: true)
- Code in `auth.js` line 18: `jwt.verify(token, process.env.KEY)`
- Code in `userController.js` lines 56, 74: `jwt.sign({...}, process.env.KEY)`
- **CRITICAL BUG**: The code uses `process.env.KEY` but the Render env var is named `JWT_SECRET`
- On Render, the user must have manually set a `KEY` env var, OR signups fail silently

## Auth Middleware Bug
- `auth.js` `authorizationChecker` is an async function that returns either:
  - `res.status(401).json(...)` (when no auth header)
  - `"NO-TOKEN"` (when token is missing from header)
  - `"NOT-AUTHENTICATED"` (when user not found)
  - `user` object (on success)
  - `res.status(500).json(...)` (on error in catch)
- Controllers check: `if (auth === "NO-TOKEN")` or `if (auth === "NOT-AUTHENTICATED")`
- **BUG**: When auth checker returns a response via `res.status()`, the controller doesn't check for this and proceeds to use the response object as if it were a user
- Also: `authorize(res, auth, "admin")` doesn't return anything, so the controller continues after unauthorized access

## Node Version
- Backend `render.yaml` has `NODE_VERSION: 18.0.0` - should be `18.17.0`

## Package Data
- Backend seeding script `temp.js` has commented-out `Package.create(...)` 
- Only 1 package was manually inserted into MongoDB
- The 1 package shown has name="" and location="Ethiopia/" (empty name, location "Ethiopia/")

## Frontend Backend URL
- `REACT_APP_BACKEND_URL` is set to `https://tesystem-backend.onrender.com/api`
- This is correct per the frontend code
