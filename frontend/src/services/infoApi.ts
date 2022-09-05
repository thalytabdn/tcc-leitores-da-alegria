export const API_URL = 'https://back-leitores.herokuapp.com/api';

interface IInfo {
  title?: string;
  text?: string;
}

export function INFO_GET() {
  return {
    url: API_URL + '/infos',
    options: {
      method: 'GET',
    },
  };
}

export function INFO_GET_ID(id: string) {
  return {
    url: `${API_URL}/infos/${id}`,
    options: {
      method: 'GET',
    },
  };
}

export function INFO_POST(body: IInfo) {
  return {
    url: API_URL + '/infos',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function INFO_PUT(id: string, body: IInfo) {
  return {
    url: `${API_URL}/infos/${id}`,
    options: {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function INFO_DELETE(id: string) {
  return {
    url: `${API_URL}/infos/${id}`,
    options: {
      method: 'DELETE',
    },
  };
}

