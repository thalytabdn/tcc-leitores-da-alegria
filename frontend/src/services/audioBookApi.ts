export const API_URL = 'https://back-leitores.herokuapp.com/api';

interface IAudioBook {
  title?: string;
  url?: string;
  description?: string;
}

export function AUDIOBOOK_GET() {
  return {
    url: API_URL + '/audioBooks',
    options: {
      method: 'GET',
    },
  };
}

export function AUDIOBOOK_GET_ID(id: string) {
  return {
    url: `${API_URL}/audioBooks/${id}`,
    options: {
      method: 'GET',
    },
  };
}

export function AUDIOBOOK_POST(body: IAudioBook) {
  return {
    url: API_URL + '/audioBooks',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function AUDIOBOOK_PUT(id: string, body: IAudioBook) {
  return {
    url: `${API_URL}/audioBooks/${id}`,
    options: {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function AUDIOBOOK_DELETE(id: string) {
  return {
    url: `${API_URL}/audioBooks/${id}`,
    options: {
      method: 'DELETE',
    },
  };
}

