export const ROOT_API_URL = "https://norma.nomoreparties.space/api";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const checkSuccess = (data) => {
  if (data?.success) return data;
  else return Promise.reject(data);
}

const checkResponse = (response) => {
  return response.ok ? response.json() : response.json().then((err) => Promise.reject(err));
}

export const responseIngredients = async () => {
  const response = await fetch(ROOT_API_URL + "/ingredients");
  const data = await checkResponse(response);
  return (await checkSuccess(data)).data;
};

export const sendOrder = async (ingredientIds) => {
  const response = await fetch(ROOT_API_URL + "/orders", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      ingredients: ingredientIds,
    }),
  });
  const data = await checkResponse(response);
  return await checkSuccess(data);
}

export const expiresAccess = new Date(Date.now() + 20 * 60 * 1000).toUTCString();
export const expiresRefresh = new Date(Date.now() + 20 * 60 * 100000).toUTCString();

export const setCookie = (name, value, expires) => (document.cookie = `${name}=${value};Expires=${expires}`);
  
export const getCookie = (name) => {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const deleteCookie = (name) =>
  (document.cookie = `${name}=;Expires=${new Date(0).toUTCString()}`)

export const passwordReset = async (email) => {
  const response = await fetch(ROOT_API_URL + "/password-reset", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      email: email,
    }),
  });
  const data = await checkResponse(response);
  return await checkSuccess(data);
}

export const setNewPassword = async (newPassword, token) => {
  const response = await fetch(ROOT_API_URL + "/password-reset/reset", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      password: newPassword,
      token: token,
    }),
  });
  const data = await checkResponse(response);
  return await checkSuccess(data);
}

export const registerUser = async (email, password, name) => {
  const response = await fetch(ROOT_API_URL + "/auth/register", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  });
  const data = await checkResponse(response);
  return await checkSuccess(data);
}

export const loginUser = async (email, password) => {
  const response = await fetch(ROOT_API_URL + "/auth/login ", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  const data = await checkResponse(response);
  return await checkSuccess(data);
}

export const logoutUser = async (tokenBody) => {
  const response = await fetch(ROOT_API_URL + "/auth/logout ", {
    method: "POST",
    headers: headers,
    body: JSON.stringify(tokenBody),
  });
  const data = await checkResponse(response);
  return await checkSuccess(data);
}

export const getUser = () => {
  return fetchWithRefreshToken(ROOT_API_URL + "/auth/user", {
    method: "GET",
    headers: {
      ...headers,
      Authorization: getCookie("accessToken"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
}

export const updateUser = (data) => {
  return fetchWithRefreshToken(ROOT_API_URL + "/auth/user", {
    method: "PATCH",
    headers: {
      ...headers,
      Authorization: getCookie("accessToken"),
    },
    body: JSON.stringify(data),
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
}

export const updateToken = async () => {
  const response = await fetch(`${ROOT_API_URL}/auth/token`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ token: getCookie("refreshToken") }),
  });
  return checkResponse(response);
}

const fetchWithRefreshToken = (url, options) => {
  return fetch(url, options)
    .then((response) => checkResponse(response))
    .catch((response) => {
      return response.json().then((err) => {
        if (err.message === "jwt expired") {
          return updateToken().then((response) => {
            setCookie("refreshToken", response.refreshToken, expiresAccess);
            setCookie("accessToken", response.accessToken, expiresRefresh);
            options.headers.Authorization = response.accessToken;
            return fetch(url, options).then((response) => checkResponse(response));
          });
        } else {
          deleteCookie("accessToken");
          deleteCookie("refreshToken");
          return Promise.reject(err);
        }
      });
    });
}