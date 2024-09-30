# GitHub Repository Dashboard

## Overview
This project provides a web application dashboard for developers to view and analyze GitHub repositories based on various filters. It fetches public repositories using the GitHub API and includes charts for summarizing and comparing repositories across different programming stacks.
## Features

- **Display Top Repositories:** View the first 50 repositories with the highest number of stars for a selected programming language.
- **Dynamic Filtering:** Change the selected programming language and sorting order for the repositories.
- **Infinite Scroll:** Implement infinite scrolling to load additional repositories seamlessly.
- **View Options:** Toggle between card view and grid view, with persistence of the selected language and sorting order between views.
- **Charting:** Utilize charts to provide a meaningful quick summary of the data. Users can compare repositories based on various metrics, such as the number of stars, forks, and contributions.

## Tech Stack

- **Frontend:** Angular with Syncfusion Angular UI Components
- **API:** GitHub API for fetching public repositories

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Bayzed-Meer/Github-Repository-Dashboard.git
    ```
2. Navigate to the project directory:
   ```bash
   cd Github-Repository-Dashboard
   ```
3. Install the dependencies:
   ```bash
    npm install
    ```
4. Start the Angular application:
    ```bash
      ng serve
      ```
5. Open the browser and navigate to `http://localhost:4200/` to view the application.
