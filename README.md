# SSR Website with Database Integration

This project demonstrates how to build a Server-Side Rendered (SSR) website using Node.js, Express, MongoDB, and EJS templates. The website integrates data from the Epic Games API and stores it in a database for efficient retrieval and display.

## Features
- Server-side rendering of dynamic pages using EJS templates.
- Integration with the Epic Games API to fetch and display Fortnite data.
- MongoDB for storing and managing data.
- Scheduled tasks to pull and update data periodically.
- Organized project structure for scalability and maintainability.

## Project Structure
```
project-root/
├── server.js            // Main server file (entry point)
├── db/                  // Database-related files
│   ├── connect.js       // DB connection setup
│   └── shopModel.js     // Example database schema
├── services/            // API and external data handling
│   └── epicGamesAPI.js  // Functions for Epic Games API calls
├── tasks/               // Scheduled tasks
│   └── dataPull.js      // Script to pull data periodically
├── views/               // EJS templates for SSR
│   ├── index.ejs        // Home page
│   ├── creators.ejs     // Creators page
│   └── stats.ejs        // Stats page
├── public/              // Static assets
│   ├── css/
│   │   └── styles.css   // Main CSS file
│   └── js/
│       └── scripts.js   // Main JavaScript file
└── package.json         // Node.js project file
```

## Setup Instructions

### Prerequisites
- Node.js installed on your system.
- MongoDB installed and running locally or remotely.
- API key for the Epic Games API.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/fncreate.git
   cd project-root
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the project root.
   - Add your Epic Games API key:
     ```env
     API_KEY=your-epic-games-api-key
     ```

4. Start MongoDB:
   Ensure MongoDB is running locally or configure your connection string in `db/connect.js`.

5. Start the server:
   ```bash
   node server.js
   ```

6. Access the application:
   Open your browser and navigate to `http://localhost:3000`.

## Key Components

### Database Connection (`db/connect.js`)
Handles the connection to the MongoDB database.

### Epic Games API Integration (`services/epicGamesAPI.js`)
Contains functions to fetch data from the Epic Games API.

### Scheduled Tasks (`tasks/dataPull.js`)
Automatically pulls data from the API and updates the database daily using `node-schedule`.

### EJS Templates (`views/`)
Renders pages with server-side data:
- `index.ejs`: Displays the daily shop.
- `creators.ejs`: Placeholder for creators data.
- `stats.ejs`: Placeholder for stats data.

### Static Assets (`public/`)
Includes CSS and JavaScript files for frontend styling and interactivity.

## Future Enhancements
- Implement dynamic data for the `creators` and `stats` pages.
- Add user authentication for personalized features.
- Enhance the styling with a modern UI framework like Bootstrap or Tailwind CSS.
- Optimize API calls with caching.

## Troubleshooting
- **Database connection issues:** Ensure MongoDB is running and accessible.
- **API errors:** Check your API key and rate limits.
- **Static files not loading:** Verify the `public` directory is correctly served.

## License
This project is open-source and available under the [MIT License](LICENSE).

