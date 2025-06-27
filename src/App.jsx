import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import Home from "./components/Home";
import Details from "./components/Details";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorBoundary from "./components/ErrorBoundary";
import Notification from "./components/Notification";

function App() {
  const [animeList, setAnimeList] = useState([]);
  const [allAnime, setAllAnime] = useState([]);
  const [topAnime, setTopAnime] = useState([]);
  const [trendingAnime, setTrendingAnime] = useState([]);
  const [seasonalAnime, setSeasonalAnime] = useState([]);
  const [upcomingAnime, setUpcomingAnime] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingAll, setIsLoadingAll] = useState(false);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'info' });
  const navigate = useNavigate();

  const showNotification = (message, type = 'info') => {
    setNotification({ show: true, message, type });
  };

  const hideNotification = () => {
    setNotification({ show: false, message: '', type: 'info' });
  };

  // Helper function to handle API calls with retry logic
  const fetchWithRetry = async (url, retries = 3, delay = 1000) => {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url);

        if (response.status === 429) {
          // Rate limited - wait and retry
          if (i < retries - 1) {
            await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
            continue;
          }
          throw new Error('Rate limit exceeded. Please try again later.');
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
      } catch (error) {
        if (i === retries - 1) {
          throw error;
        }
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
      }
    }
  };

  const GetTopAnime = async () => {
    try {
      const temp = await fetchWithRetry(`https://api.jikan.moe/v4/top/anime?limit=25`);
      setTopAnime(temp.data.slice(0, 10));
    } catch (err) {
      console.error("Error fetching top anime:", err);
      showNotification('Failed to load top anime', 'error');
    }
  };

  const GetTrendingAnime = async () => {
    try {
      const temp = await fetchWithRetry(`https://api.jikan.moe/v4/seasons/now?limit=25`);
      setTrendingAnime(temp.data.slice(0, 8));
    } catch (err) {
      console.error("Error fetching trending anime:", err);
      showNotification('Failed to load trending anime', 'error');
    }
  };

  const GetSeasonalAnime = async () => {
    try {
      const temp = await fetchWithRetry(`https://api.jikan.moe/v4/seasons/upcoming?limit=25`);
      setSeasonalAnime(temp.data.slice(0, 6));
    } catch (err) {
      console.error("Error fetching seasonal anime:", err);
      showNotification('Failed to load seasonal anime', 'error');
    }
  };

  const GetUpcomingAnime = async () => {
    try {
      const temp = await fetchWithRetry(`https://api.jikan.moe/v4/top/anime?filter=airing&limit=25`);
      setUpcomingAnime(temp.data.slice(0, 6));
    } catch (err) {
      console.error("Error fetching upcoming anime:", err);
      showNotification('Failed to load upcoming anime', 'error');
    }
  };

  const LoadAllData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Load data sequentially to avoid rate limiting
      await GetTopAnime();
      await new Promise(resolve => setTimeout(resolve, 500)); // 500ms delay

      await GetTrendingAnime();
      await new Promise(resolve => setTimeout(resolve, 500)); // 500ms delay

      await GetSeasonalAnime();
      await new Promise(resolve => setTimeout(resolve, 500)); // 500ms delay

      await GetUpcomingAnime();

      showNotification('Anime collection loaded successfully!', 'success');
    } catch (err) {
      setError(err.message);
      showNotification('Failed to load some anime data', 'error');
      console.error("Error loading anime data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const FetchAllAnime = async () => {
    try {
      setIsLoadingAll(true);
      setError(null);

      // Fetch popular anime for browsing (using top anime with proper limit)
      const temp = await fetchWithRetry(`https://api.jikan.moe/v4/top/anime?limit=25`);
      setAllAnime(temp.data);
      showNotification(`Loaded ${temp.data.length} anime for browsing!`, 'success');
    } catch (err) {
      setError('Failed to load anime for browsing');
      showNotification('Failed to load anime for browsing', 'error');
      console.error("Error fetching all anime:", err);
    } finally {
      setIsLoadingAll(false);
    }
  };

  const HandleSearch = async (e) => {
    e.preventDefault();

    if (!search.trim()) {
      showNotification('Please enter a search term', 'warning');
      return;
    }

    try {
      setIsSearching(true);
      setError(null);
      await FetchAnime(search);
      navigate('/explore');
      showNotification(`Searching for "${search}"...`, 'info');
    } catch (err) {
      showNotification('Search failed. Please try again.', 'error');
    } finally {
      setIsSearching(false);
    }
  };

  const FetchAnime = async (query) => {
    try {
      const temp = await fetchWithRetry(
        `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&order_by=title&sort=asc&limit=25`
      );

      if (temp.data.length === 0) {
        setError("No anime found for your search. Try a different term.");
        showNotification('No results found. Try different keywords.', 'warning');
      } else {
        setAnimeList(temp.data);
        setError(null);
        showNotification(`Found ${temp.data.length} anime results!`, 'success');
      }
    } catch (err) {
      throw new Error('Failed to fetch anime data');
    }
  };

  useEffect(() => {
    LoadAllData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="xl" text="Loading Anime Collection..." />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-900">
        <Notification
          message={notification.message}
          type={notification.type}
          isVisible={notification.show}
          onClose={hideNotification}
        />

        <Routes>
          <Route path="/" element={
            <div className="space-y-8">
              <Header
                HandleSearch={HandleSearch}
                search={search}
                setSearch={setSearch}
                topAnime={topAnime}
                trendingAnime={trendingAnime}
                seasonalAnime={seasonalAnime}
                upcomingAnime={upcomingAnime}
                isLoading={isLoading}
                error={error}
                setError={setError}
                isSearching={isSearching}
              />
              {error && (
                <div className="max-w-4xl mx-auto px-4">
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                    <p className="text-red-400 text-center">{error}</p>
                  </div>
                </div>
              )}
            </div>
          } />

          <Route path="/explore" element={
            <Home
              animeList={animeList}
              isLoading={isSearching}
              error={error}
            />
          } />

          <Route path="/browse" element={
            <Home
              animeList={allAnime}
              isLoading={isLoadingAll}
              error={error}
              isBrowsePage={true}
              onLoadData={FetchAllAnime}
            />
          } />

          <Route path="/anime/:id" element={<Details />} />
        </Routes>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;
