export const API_URL = 'https://back-leitores.herokuapp.com/api';

interface ISupporter {
  name?: string;
  image?: string;
  description?: string;
}

export function SUPPORTER_GET() {
  return {
    url: API_URL + '/supporters',
    options: {
      method: 'GET',
    },
  };
}

export function SUPPORTER_GET_ID(id: string) {
  return {
    url: `${API_URL}/supporters/${id}`,
    options: {
      method: 'GET',
    },
  };
}

export function SUPPORTER_POST(body: ISupporter) {
  return {
    url: API_URL + '/supporters',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function SUPPORTER_PUT(id: string, body: ISupporter) {
  return {
    url: `${API_URL}/supporters/${id}`,
    options: {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function SUPPORTER_DELETE(id: string) {
  return {
    url: `${API_URL}/supporters/${id}`,
    options: {
      method: 'DELETE',
    },
  };
}

