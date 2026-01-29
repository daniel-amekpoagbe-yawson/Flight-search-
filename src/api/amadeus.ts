import axios from "axios";

const API_KEY = import.meta.env.VITE_AMADEUS_KEY;
const API_SECRET = import.meta.env.VITE_AMADEUS_SECRET;

const tokenClient = axios.create({
  baseURL: "https://test.api.amadeus.com/v1/security",
});

const apiClient = axios.create({
  baseURL: "https://test.api.amadeus.com",
});

let accessToken: string | null = null;

export async function getAccessToken() {
  if (accessToken) return accessToken;

  const res = await tokenClient.post(
    "/oauth2/token",
    new URLSearchParams({
      grant_type: "client_credentials",
      client_id: API_KEY,
      client_secret: API_SECRET,
    })
  );

  accessToken = res.data.access_token;
  return accessToken;
}

export async function searchFlights(params: {
  origin: string;
  destination: string;
  date: string;
}) {
  const token = await getAccessToken();

  const res = await apiClient.get("/v2/shopping/flight-offers", {
    headers: { Authorization: `Bearer ${token}` },
    params: {
      originLocationCode: params.origin,
      destinationLocationCode: params.destination,
      departureDate: params.date,
      adults: 1,
      max: 30,
    },
  });

  return res.data;
}
