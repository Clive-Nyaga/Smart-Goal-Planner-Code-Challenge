# Smart Goal Planner

A React application for tracking financial goals and savings progress. This app allows users to create, update, and delete financial goals, as well as make deposits toward their goals.

## Features

- Create and manage financial goals with target amounts
- Track savings progress for each goal
- Make deposits to increase saved amounts
- View an overview of all goals and total progress
- Categorize goals for better organization

## Tech Stack

- React with Hooks (useState, useEffect)
- Vite for fast development and building
- JSON Server for mock API
- Bootstrap 5 for styling
- Bootstrap Icons for UI elements

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the JSON Server (in a separate terminal):
   ```
   npx json-server --watch db.json
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## Project Structure

```
/src
  /assets            # Static assets
  /components        # React components
    /App             # Main App component
    /DepositForm     # Form for making deposits
    /GoalForm        # Form for creating goals
    /GoalItem        # Individual goal display
    /GoalList        # List of all goals
    /Overview        # Summary of all goals
    index.js         # Barrel file for easy component imports
  index.css          # Global styles
  main.jsx           # Entry point
```

## Recent Fixes

- Fixed component export structure in `src/components/index.js`
- Created proper entry point in `src/main.jsx`
- Fixed CSS layout issues in `src/index.css`
- Added Bootstrap and Bootstrap Icons to `index.html`
- Updated page title to "Smart Goal Planner"

## Development

This project uses Vite for fast development with HMR (Hot Module Replacement).

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
# Smart-Goal-Planner-Code-Challenge
