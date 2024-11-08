# 🎧 Podify - Podcast App

Welcome to **Podify**! Podify is a React-based podcast streaming app that allows users to browse, explore, and listen to a wide range of podcasts across multiple genres. The app is live and accessible at [https://podifypod.netlify.app/](https://podifypod.netlify.app/).

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Use Cases](#use-cases)
- [Contact Information](#contact-information)

---

## Project Overview

Podify is a personal portfolio project that demonstrates the integration of multiple API endpoints to showcase a podcast collection. This app allows users to discover podcasts by genre, view detailed information about each show, explore seasons and episodes, and stream audio directly from the app.

## Technologies Used

- **React** with JavaScript
- **CSS** for styling
- **Netlify** for deployment
- **API Fetching** for data integration

## Setup Instructions

To run Podify locally, please follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/MrMiyagi7/podify.git
   cd Podify

   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the development server:

   ```
   npm run dev
   ```

For deployment, the app is live at https://podifypod.netlify.app/.

## Usage

Podify provides a streamlined experience for browsing and streaming podcasts. Use the navigation to explore genres, view show previews, and listen to individual episodes. Below are key features and example use cases:

- **Discover New Shows**: Users can explore new podcasts by genre, find show previews, and view trending shows.
- **Detailed Show Information**: Clicking on a show preview provides more information, including a list of seasons and episodes.
- **Stream Episodes**: Users can select individual episodes within a show to stream directly from the app.
- **Explore by Genre**: Using genre-specific links, users can filter shows to match their interests, such as Personal Growth, Comedy, or History.
- **Save and Return**: The app encourages users to bookmark shows of interest, enabling easy return to favorites.
- **Responsive Design**: Podify is designed for both desktop and mobile viewing, ensuring a seamless experience across devices.

## API Endpoints

Podify connects with three API endpoints to retrieve podcast data. Each endpoint serves specific data for users to interact with:

- **Preview Shows**: `https://podcast-api.netlify.app`  
  Returns an array of preview data for all available podcasts.

- **Genres**: `https://podcast-api.netlify.app/genre/<ID>`  
  Returns detailed genre information for specific shows.

- **Show Details**: `https://podcast-api.netlify.app/id/<ID>`  
  Returns detailed information about a show, including seasons and episodes.

## Contact Information

Developed by Miguel Freitas

- **Email**: freitas.miguel.miguel@gmail.com
- **GitHub**: [MrMiyagi7](https://github.com/MrMiyagi7)

For more information, please reach out or explore the [live app](https://podifypod.netlify.app/).
