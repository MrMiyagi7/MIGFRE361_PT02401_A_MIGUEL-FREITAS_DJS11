import React from "react";

export default function Filter ({
    genres,
    selectedGenreId,
    onGenreChange,
    onSortChange,
}){
    return (
        <div className="filter-container">
          <select
            className="genre-select"
            onChange={onGenreChange}
            value={selectedGenreId || ""}
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.title}
              </option>
            ))}
          </select>
    
          <select className="sort-select" onChange={onSortChange} defaultValue="">
            <option value="">Sort By</option>
            <option value="title-asc">Title A-Z</option>
            <option value="title-desc">Title Z-A</option>
            <option value="updated-recent">Most Recently Updated</option>
            <option value="updated-oldest">Oldest Updated</option>
          </select>
        </div>
      );
    }
}

