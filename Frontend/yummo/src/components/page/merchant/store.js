import { create } from "zustand";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const useMerchantStore = create((set) => ({
  // token: null,
  token: "5a99c68c923d65db2c51da84a736ddc6ac41a40a",
  restaurants: [],
  selectedRestaurant: null,
  setToken: (token) => set({ token }),
  setRestaurants: (restaurants) => set({ restaurants }),
  setSelectedRestaurant: (restaurant) =>
    set({ selectedRestaurant: restaurant }),
}));

export function fetchRestaurants(token) {
  return fetch(`${BACKEND_URL}/api/restaurants`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  }).then((response) => response.json());
}

export async function fetchReservations(resId, token) {
  const response = await fetch(
    `${BACKEND_URL}/api/restaurants/${resId}/reservations`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );

  const reservations = await response.json();

  reservations.sort(
    (a, b) => new Date(a.reserved_at) - new Date(b.reserved_at)
  );

  let completed = [];
  let upcoming = [];

  const now = new Date();
  for (const reservation of reservations) {
    const reservationTime = new Date(reservation.reserved_at);
    if (reservationTime < now) {
      completed.push(reservation);
    } else {
      upcoming.push(reservation);
    }
  }

  return { completed, upcoming };
}

export function fetchReviews(resId, token) {
  return fetch(`${BACKEND_URL}/api/restaurants/${resId}/reviews`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  }).then((response) => response.json());
}