export const API_URL = 'https://back-leitores.herokuapp.com/api';

interface IEvent {
  local: string;
  date: Date;
  time: string;
  readersName: string;
  bookName: string;
  bookImage: string;
  bookDescription: string;
}

export function EVENT_GET() {
  return {
    url: API_URL + '/events',
    options: {
      method: 'GET',
    },
  };
}

export function EVENT_GET_ID(id: string) {
  return {
    url: `${API_URL}/events/${id}`,
    options: {
      method: 'GET',
    },
  };
}

export function EVENT_POST(body: IEvent) {
  return {
    url: API_URL + '/events',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function EVENT_PUT(id: string, body: IEvent) {
  return {
    url: `${API_URL}/events/${id}`,
    options: {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function EVENT_DELETE(id: string) {
  return {
    url: `${API_URL}/events/${id}`,
    options: {
      method: 'DELETE',
    },
  };
}

