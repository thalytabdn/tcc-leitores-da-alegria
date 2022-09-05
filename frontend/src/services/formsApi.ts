export const API_URL = 'https://back-leitores.herokuapp.com/api';

interface IForm {
  contract?: string;
  subscription?: string;
}

export function FORM_GET() {
  return {
    url: API_URL + '/forms',
    options: {
      method: 'GET',
    },
  };
}

export function FORM_GET_ID(id: string) {
  return {
    url: `${API_URL}/forms/${id}`,
    options: {
      method: 'GET',
    },
  };
}

export function FORM_POST(body: IForm) {
  return {
    url: API_URL + '/forms',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function FORM_PUT(id: string, body: IForm) {
  return {
    url: `${API_URL}/forms/${id}`,
    options: {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function FORM_DELETE(id: string) {
  return {
    url: `${API_URL}/forms/${id}`,
    options: {
      method: 'DELETE',
    },
  };
}

