// Utility functions for authentication

export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

export const isAuthenticated = () => {
  return !!getToken();
};

// Decode JWT token without verification (for client-side use only)
const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
};

export const isAdmin = async (skipApiCheck = false) => {
  const token = getToken();
  if (!token) return false;

  // First try to get role from the token directly
  const decodedToken = parseJwt(token);
  if (decodedToken && decodedToken.role === 'admin') {
    return true;
  }

  // If skipApiCheck is true, don't make the API call
  if (skipApiCheck) return false;

  // Fallback to API check if token doesn't contain role
  try {
    const response = await fetch('http://localhost:5000/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      cache: 'no-store' // Prevent caching of the response
    });

    if (!response.ok) return false;

    const user = await response.json();
    return user.role === 'admin';
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

export const redirectIfNotAdmin = async (context) => {
  const token = getToken();
  
  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  try {
    const response = await fetch('http://localhost:5000/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    const user = await response.json();
    if (user.role !== 'admin') {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    return { props: { user } };
  } catch (error) {
    console.error('Error in redirectIfNotAdmin:', error);
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
};
