export const API_URL = 'https://back-leitores.herokuapp.com/api';

interface IImage {
  url?: string;
  description?: string;
}

export function IMAGE_GET() {
  return {
    url: API_URL + '/images',
    options: {
      method: 'GET',
    },
  };
}

export function IMAGE_GET_ID(id: string) {
  return {
    url: `${API_URL}/images/${id}`,
    options: {
      method: 'GET',
    },
  };
}

export function IMAGE_POST(body: IImage) {
  return {
    url: API_URL + '/images',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function IMAGE_PUT(id: string, body: IImage) {
  return {
    url: `${API_URL}/images/${id}`,
    options: {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function IMAGE_DELETE(id: string) {
  return {
    url: `${API_URL}/images/${id}`,
    options: {
      method: 'DELETE',
    },
  };
}

