import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

export const getImageUrl = (path, size = 'w500') => {
  if (!path) return null;
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

export const fetchTrending = async (mediaType = 'all', timeWindow = 'day') => {
  try {
    const response = await api.get(`/trending/${mediaType}/${timeWindow}`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending content:', error);
    return [];
  }
};

export const fetchMovies = async (category = 'popular', page = 1) => {
  try {
    const response = await api.get(`/movie/${category}`, {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${category} movies:`, error);
    return { results: [], total_pages: 0 };
  }
};

export const fetchTVShows = async (category = 'popular', page = 1) => {
  try {
    const response = await api.get(`/tv/${category}`, {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${category} TV shows:`, error);
    return { results: [], total_pages: 0 };
  }
};

export const fetchDetails = async (mediaType, id) => {
  try {
    const response = await api.get(`/${mediaType}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${mediaType} details:`, error);
    return null;
  }
};

export const fetchVideos = async (mediaType, id) => {
  try {
    const response = await api.get(`/${mediaType}/${id}/videos`);
    return response.data.results;
  } catch (error) {
    console.error(`Error fetching ${mediaType} videos:`, error);
    return [];
  }
};

export const searchContent = async (query, page = 1) => {
  try {
    const response = await api.get('/search/multi', {
      params: { query, page },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching content:', error);
    return { results: [], total_pages: 0 };
  }
};