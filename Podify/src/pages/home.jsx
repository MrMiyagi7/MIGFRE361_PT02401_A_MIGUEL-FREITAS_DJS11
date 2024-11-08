import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../home.css";

export default function Home() {
  const [podcasts, setPodcasts] = useState([]);
  const [genres] = useState([
    { id: 1, title: "Personal Growth" },
    { id: 2, title: "Investigative Journalism" },
    { id: 3, title: "History" },
    { id: 4, title: "Comedy" },
    { id: 5, title: "Entertainment" },
    { id: 6, title: "Business" },
    { id: 7, title: "Fiction" },
    { id: 8, title: "News" },
    { id: 9, title: "Kids and Family" },
  ]);
  const [selectedGenreId, setSelectedGenreId] = useState(null);
  const [sortCriteria, setSortCriteria] = useState("a-z");
  const [error, setError] = useState(null);

  const convertDate = (updated) => {
    const date = new Date(updated);
    return date.toLocaleDateString("en-us", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const sortPodcasts = (podcasts) => {
    switch (sortCriteria) {
      case "a-z":
        return podcasts.sort((a, b) => a.title.localeCompare(b.title));
      case "z-a":
        return podcasts.sort((a, b) => b.title.localeCompare(a.title));
      case "recently-updated":
        return podcasts.sort(
          (a, b) => new Date(b.updated) - new Date(a.updated)
        );
      case "furthest-updated":
        return podcasts.sort(
          (a, b) => new Date(a.updated) - new Date(b.updated)
        );
      default:
        return podcasts;
    }
  };

  const fetchPodcasts = async () => {
    try {
      const response = await axios.get("https://podcast-api.netlify.app");
      // Sort podcasts alphabetically by title
      const sortedPodcasts = response.data.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      setPodcasts(sortedPodcasts);
    } catch (error) {
      console.error("Error fetching all podcasts:", error);
      setError("Failed to fetch podcasts");
    }
  };

  const fetchPodcastsByGenre = async (genreId) => {
    try {
      const genreResponse = await axios.get(
        `https://podcast-api.netlify.app/genre/${genreId}`
      );
      const showIds = genreResponse.data.shows;

      const detailedShows = await Promise.all(
        showIds.map(async (id) => {
          try {
            const showResponse = await axios.get(
              `https://podcast-api.netlify.app/id/${id}`
            );
            return showResponse.data;
          } catch (showError) {
            console.error(`Error fetching details for show ${id}:`, showError);
            return null;
          }
        })
      );

      // Filter out any null responses and sort alphabetically by title
      const validShows = detailedShows
        .filter((show) => show !== null)
        .sort((a, b) => a.title.localeCompare(b.title));
      setPodcasts(validShows);
    } catch (error) {
      console.error("Error fetching podcasts for selected genre:", error);
      setError("Failed to fetch podcasts for selected genre");
    }
  };

  useEffect(() => {
    fetchPodcasts();
  }, []);

  console.log(podcasts);

  const handleGenreChange = (event) => {
    const genreId = event.target.value ? parseInt(event.target.value) : null;
    setSelectedGenreId(genreId);
    if (genreId) {
      fetchPodcastsByGenre(genreId);
    } else {
      fetchPodcasts(); // Fetch all podcasts again if "All Genres" is selected
    }
  };

  const getGenreTitles = (genreIds) => {
    if (!genreIds || !Array.isArray(genreIds)) return "Unknown";

    const titles = genreIds
      .map((id) => {
        const genre = genres.find((genre) => genre.id === id);
        return genre ? genre.title : null;
      })
      .filter(Boolean)
      .join(", ");

    return titles || "Unknown";
  };

  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="genre-container">
        <select
          className="genre-select"
          onChange={handleGenreChange}
          defaultValue=""
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.title}
            </option>
          ))}
        </select>
        <h1> Browse Podcasts</h1>
      </div>
      <div className="podcast-previews">
        {podcasts.length === 0 ? (
          <div className="loader"></div>
        ) : (
          podcasts.map((podcast) => (
            <Link to={`/show/${podcast.id}`} key={podcast.id}>
              <div className="podcast-card">
                <div className="podcast-info">
                  <img src={podcast.image} alt={`${podcast.title} cover`} />
                  <h3>{podcast.title}</h3>
                  <h4>{`Seasons: ${podcast.seasons}`}</h4>
                  <h4>{`Last Updated: ${convertDate(podcast.updated)}`}</h4>
                  <p className="podcast-genres">
                    {`${getGenreTitles(podcast.genres)}`}
                  </p>
                  <p className="podcast-description">{podcast.description}</p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
