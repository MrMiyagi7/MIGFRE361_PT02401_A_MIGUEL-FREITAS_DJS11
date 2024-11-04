import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ShowDetails() {
  const { id } = useParams(); // Extract show ID from URL parameters
  const [showDetails, setShowDetails] = useState(null);
  const [error, setError] = useState(null);
  const [expandedSeasons, setExpandedSeasons] = useState({});

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await axios.get(
          "https://podcast-api.netlify.app/id/${id}"
        );
        setShowDetails(response.data);
      } catch (error) {
        setError("Failed to fetch show details");
      }
    };
    fetchShowDetails();
  });
}
