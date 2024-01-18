# realtime-collaboration-app

It's an application that facilitates real-time collaboration on JSON files. Key features include:

- **Real-Time Editing:** Collaborate with others on JSON files in real-time.

- **User Presence:** Know who is currently editing a file.

- **Change History:** See the last editor's username and timestamp.

- **Download Option:** Download the edited JSON file.

## Tech Stack

- **Frontend:** Angular + Tailwind
- **Backend:** .NET (using SignalR for real-time communication)
- **Editor Component:** ngx-codemirror for JSON editing

## How to Run

### Frontend

1. Navigate to the `Client` folder  `cd Client`.
2. Run  `npm install` to install dependencies.
3. Execute `ng serve` to start the Angular development server.

### Backend

1. From the root folder, run `dotnet run` to start the .NET backend.

### Testing

For Jest testing on the frontend:

1. Navigate to the Client folder: `cd Client`
2. Run tests: `npm run test`
