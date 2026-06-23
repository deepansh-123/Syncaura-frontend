# Syncaura Frontend - API & Auth Architecture Guide

Hey team, Shivratna here. 

I have set up our frontend's core API integration, authentication service, and token management systems. This document serves as our master integration guide. Please read it thoroughly to understand how everything is structured, how data flows, and the best practices we need to follow while working on our tasks.

---

## 1. Folder Structure & Service Layer

Here is where our API communication and authentication logic lives:

* `src/config/axios.js` -> Our network client. It contains an Axios instance with request and response interceptors to handle tokens automatically.
* `src/redux/features/authThunks.js` -> Asynchronous Redux thunks for executing API requests (register, login, refresh, etc.).
* `src/redux/slices/authSlice.js` -> The Redux slice storing state (user data, loading status, access token, and authentication flags).
* `src/services/errorHandler.js` -> Centralized error processing and custom styled toast notification utility.
* `src/constant/validationRules.js` -> Standard schemas for client-side input validations (name, email, password formats).
* `src/pages/SignIn.jsx` & `src/pages/SignUp.jsx` -> Views handling login and registration forms.

---

## 2. Authentication API Endpoints

These are the backend authentication endpoints we communicate with (the base URL is configured in `src/config/axios.js` as `http://localhost:5000/api` for local development):

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Authenticate user credentials |
| POST | `/api/auth/logout` | Log out the user and invalidate sessions |
| POST | `/api/auth/refresh` | Refresh an expired access token |
| GET | `/api/auth/me` | Fetch the current logged-in user profile |

---

## 3. System Architecture Diagram

This flowchart mapped below shows how our React client communicates with the backend APIs:

```
[React Forms & UI Pages]
      │
      ▼  (Validates formats client-side first)
[React Hook Form & validationRules.js]
      │
      ▼  (Dispatches async thunk action)
[Redux Store & Slices]
      │
      ▼  (Request interceptor attaches accessToken)
[Axios Client & config/axios.js]
      │
      ▼  (HTTP / WebSockets via Port 5000)
[Express / Node Backend Server] ◄───► [Socket.IO Server]
      │
      ▼
[MongoDB Database]
```

---

## 4. Authentication Flow & Token Management

We handle authentication using **JSON Web Tokens (JWT)**. The token lifecycle is split into two tokens for security:
1. **Access Token**: Short-lived, stored in the Redux store state and mirrored in `localStorage` as `accessToken`.
2. **Refresh Token**: Long-lived, stored in `localStorage` as `refreshToken`.

### A. Automatic Token Attachment (Request Interceptor)
You do not need to manually configure the Bearer Authorization header for every request. The Axios interceptor automatically reads the current access token from local storage and appends it to all outbound headers:

```javascript
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
```

### B. Auto-Token Refresh (Response Interceptor)
If an API request fails with a `401 Unauthorized` status (meaning the access token has expired):
1. The Axios client intercepts the response and pauses the request queue.
2. It sends a `POST` request to `/api/auth/refresh` using the `refreshToken`.
3. If successful, it updates the stored `accessToken` and retries all paused requests in the queue.
4. If refreshing fails (e.g. the refresh token has also expired), it triggers an `auth_session_expired` event, clears local storage, logs the user out, and redirects to the sign-in page.

---

## 5. Request and Response Flow

Here is the exact cycle of a transaction (e.g., submitting a signup or login form):

1. **Submit**: User clicks submit. The form runs the checks inside `validationRules.js`.
2. **Dispatch**: If checks pass, the page dispatches an async thunk (e.g. `loginUser(data)`).
3. **Load**: Redux transitions state (`isLoading = true`) and triggers Axios.
4. **Interceptors**: Axios client applies request interceptors to attach headers and performs the HTTP request.
5. **Resolve/Reject**:
   * **On Success**: Thunk handles the API response, saves tokens in LocalStorage, updates the auth slice state, and triggers a green success toast.
   * **On Failure**: Axios catches the HTTP status error, which is caught by `errorHandler.js` to trigger a red alert toast showing the translated failure message.
6. **Redirect**: The page navigates the user based on their specific account role (Admin, Co-Admin, User).

---

## 6. Best Practices for the Development Team

### A. Calling APIs from UI Pages
Always dispatch Redux thunks using `.unwrap()` in your form handlers so that you can wrap them in local `try/catch` blocks:

```javascript
const onSubmit = async (data) => {
  try {
    const res = await dispatch(loginUser(data)).unwrap();
    handleSuccess(`Welcome Back ${res?.user?.name || "User"}!`);
    navigate("/user-dashboard");
  } catch (err) {
    handleError(err || "Login failed");
  }
};
```

### B. Managing Loading States
To prevent double clicks and duplicate network requests, make sure you disable form buttons and show spinner status using the loading variables:

```javascript
const { isLoading } = useSelector((state) => state.auth);
const { formState: { isSubmitting } } = useForm();

const isPending = isSubmitting || isLoading;

<button type="submit" disabled={isPending}>
  {isPending ? "Loading..." : "Submit"}
</button>
```

### C. Standardized Error Tooltips & Toasting
Always route API errors and success alerts through our unified helpers in `errorHandler.js` rather than importing React-Toastify directly:

```javascript
import { handleError, handleSuccess } from "../services/errorHandler";

// For errors:
handleError(err);

// For success:
handleSuccess("Operation completed successfully!");
```

Let me know if you run into any questions or conflicts when integrating your features!
