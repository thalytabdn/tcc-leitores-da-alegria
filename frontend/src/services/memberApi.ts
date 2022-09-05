export const API_URL = 'https://back-leitores.herokuapp.com/api';

interface IMember {
  name?: string;
  image?: string;
  description?: string;
}

export function MEMBER_GET() {
  return {
    url: API_URL + '/members',
    options: {
      method: 'GET',
    },
  };
}

export function MEMBER_GET_ID(id: string) {
  return {
    url: `${API_URL}/members/${id}`,
    options: {
      method: 'GET',
    },
  };
}

export function MEMBER_POST(body: IMember) {
  return {
    url: API_URL + '/members',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function MEMBER_PUT(id: string, body: IMember) {
  return {
    url: `${API_URL}/members/${id}`,
    options: {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function MEMBER_DELETE(id: string) {
  return {
    url: `${API_URL}/members/${id}`,
    options: {
      method: 'DELETE',
    },
  };
}

