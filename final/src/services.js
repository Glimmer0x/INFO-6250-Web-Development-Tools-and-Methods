export function fetchLogin(username) {
  return fetch("/api/session/", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ username }),
  })
    .catch((err) => Promise.reject({ error: "network-error" }))
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }
      return response.json();
    });
}

export function fetchSession() {
  return fetch("/api/session/", {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  })
    .catch((err) => Promise.reject({ error: "network-error" }))
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }
      return response.json();
    });
}

export function fetchLogout() {
  return fetch("/api/session/", {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  })
    .catch((err) => Promise.reject({ error: "network-error" }))
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }
      return response.json();
    });
}

export function fetchBalance() {
  return fetch("/api/balance/", {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  })
    .catch((err) => Promise.reject({ error: "network-error" }))
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }
      return response.json();
    });
}

export function fetchRank() {
  return fetch("/api/rank/", {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  })
    .catch((err) => Promise.reject({ error: "network-error" }))
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }
      return response.json();
    });
}

export function fetchRankUpdate(clicks) {
  return fetch("/api/rank/", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ clicks }),
  })
    .catch((err) => Promise.reject({ error: "network-error" }))
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }
      return response.json();
    });
}
