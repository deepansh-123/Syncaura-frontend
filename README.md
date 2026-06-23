# Syncaura 🚀

A modern, collaborative workspace platform designed for teams to organize projects, tasks, chats, and video meetings in one single place. 

I've set up the frontend with React, Vite, and Tailwind CSS, using Redux Toolkit for global state management. We also have full validation rules and secure authentication workflows with automatic session refreshing.

---

## Features

Here is what we have built into the app:
* **Multi-Role Access**: Dedicated dashboard views for Admins, Co-Admins, and Users.
* **Projects & Tasks**: Project boards and to-do checklists to keep tasks organized.
* **Real-time Chat**: Message threads designed to connect with a Socket.IO backend.
* **Video Meetings**: Virtual meet room scheduler for team video/audio calls.
* **Attendance Tracker**: A simple clock-in sheet for logging attendance and leaves.
* **Document Repository**: A central space to upload and preview shared documents.
* **Complaints Portal**: Form to submit and track feedback or issues.
* **Notice Board**: Corporate bulletin board for pinning team announcements.
* **Theme Customization**: Global Light/Dark mode switcher.
* **JWT Interceptors**: Handles access token injection and token refreshes under the hood.

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React, Vite |
| **Styling** | Tailwind CSS, Lucide React, Framer Motion |
| **State Management** | Redux Toolkit |
| **Routing** | React Router Dom (v7) |
| **Network Client** | Axios |
| **Alerts** | React Toastify |
| **Form Validation** | React Hook Form |

---

## System Architecture

Here is a quick map of how the frontend client talks to the backend services:

```
[React Forms & UI Pages]
      │
      ▼  (validates input formatting locally)
[React Hook Form & Validation Rules]
      │
      ▼  (dispatches thunk actions)
[Redux Store & Slices]
      │
      ▼  (injects tokens / auto-refreshes on 401s)
[Axios Client & Interceptors]
      │
      ▼  (HTTP / WebSockets on Port 5000)
[Express / Node Backend Server] ◄───► [Socket.IO Server]
      │
      ▼
[MongoDB Database]
```

---

## Processing Workflow

Here is how data flows when you register or log in:

1. **User Submits Details**: Form fields verify email formatting and password rules locally using React Hook Form.
2. **Dispatch Async Action**: On validation success, the page dispatches a Redux thunk (e.g. `loginUser`).
3. **Axios Interceptor**: The request interceptor automatically reads the access token from local storage and appends it to request headers.
4. **Backend Processing**: The server checks the database, issues a short-lived `accessToken` and a long-lived `refreshToken`, and sends them back.
5. **Update Store**: The thunk updates our Redux auth slice state, saves the tokens to local storage, and redirects the user to the correct dashboard.
6. **Token Refresh**: If a request fails because of an expired token (401 error), the interceptor pauses the request queue, fetches a new access token, and retries the failed requests. If it fails, the user is logged out automatically.

---

## Cost-Efficient Architecture

We designed this app to run efficiently and keep hosting/processing costs low:
* **Client-Side Validation**:catches format errors before hitting the network, saving server CPU cycles.
* **Request Queuing Interceptor**: Pauses outgoing calls during token refresh to avoid duplicate refresh calls.
* **Redux Selector Memoization**: Prevents unnecessary UI renders and keeps the app fast.

---

## Running the Application

1. Make sure you are in the project folder:
   ```bash
   cd Syncaura-frontend-1
   ```
2. Install all the packages:
   ```bash
   npm install
   ```
3. Run the local dev server:
   ```bash
   npm run dev
   ```

---

## API Documentation

For instructions on how to call backend endpoints and handle API responses:
* Check out our **[API_Architecture.md](file:///c:/Users/Shivratna/OneDrive/Desktop/Syncora%20Fr/Syncaura-frontend-1/API_Architecture.md)**.

---

## Roadmap

- [ ] Connect the chat component with live WebSockets.
- [ ] Add Jitsi Meet video frames in the meeting dashboard.
- [ ] Integrate file upload logic in the document hub.
- [ ] Optimize the views for mobile screens.
- [ ] Add Progressive Web App (PWA) support for offline usage.
- [ ] Write frontend unit tests.

---

## Author

**Shivratna Shinde**  
Information Technology Student | Full-Stack Developer | Team Lead

* [LinkedIn](https://www.linkedin.com/in/shivratna-shinde-a0a208226/)
* [GitHub](https://github.com/Shivratna-27)
* [Portfolio](https://shivratnashinde.com/)
