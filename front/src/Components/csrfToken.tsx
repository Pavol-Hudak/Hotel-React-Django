let csrfToken: string = '';


export const fetchCsrfToken = async (): Promise<string> => {
  if (csrfToken) {
    return csrfToken;
  }
  
  try {
    const response = await fetch('api/get-csrf');
    if (response.ok) {
      const data = await response.json();
      csrfToken = data.csrfToken;
      return csrfToken;
    } else {
      // throw new Error('Failed to fetch CSRF token');
      return ' ';
    }
  } catch (error) {
    console.error(error);
    // throw new Error("Failed to get token");
    return ' ';
  }
};

export const getCsrfToken = (): string | null => {
  return csrfToken;
};