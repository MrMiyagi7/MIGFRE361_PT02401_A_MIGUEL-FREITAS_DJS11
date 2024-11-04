import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ShowDetails() {
  const { id } = useParams(); // Extract show ID from URL parameters
  const [showDetails, setShowDetails] = useState(null);
  const [error, setError] = useState(null);
  const [expandedSeasons, setExpandedSeasons] = useState({});

  useEffect(() => {});
}
