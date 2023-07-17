const handleFetch = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

export const http = {
  get: async (url: string) => handleFetch(url),

  post: async (url: string, body?: Record<string, unknown>) => {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    return handleFetch(url, options);
  },

  put: async (url: string, body?: Record<string, unknown>) => {
    const options: RequestInit = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    return handleFetch(url, options);
  },

  delete: async (url: string) => {
    const options: RequestInit = {
      method: "DELETE",
    };

    return handleFetch(url, options);
  },
};
