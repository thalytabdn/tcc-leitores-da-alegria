export const API_URL = 'https://back-leitores.herokuapp.com/api';

interface IUser {
  name?: string;
  email?: string;
  password?: string;
  role?: number;
}

interface IUserLogin {
  email: string;
  password: string;
}

interface IResetPassword {
  oldPassword: string;
  newPassword: string;
  id: string;
}

export function USER_GET() {
  return {
    url: API_URL + '/users',
    options: {
      method: 'GET',
    },
  };
}

export function USER_LOGIN(body: IUserLogin) {
  return {
    url: API_URL + '/login',
    
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function PASSWORD_RESET(body: IResetPassword) {
  return {
    url: API_URL + `/resetPassword/${body.id}`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({'password' : body}),
    },
  };
}

export function USER_GET_ID(id: string) {
  return {
    url: `${API_URL}/users/${id}`,
    options: {
      method: 'GET',
    },
  };
}

export function USER_POST(body: IUser) {
  return {
    url: `${API_URL}/register`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function USER_PUT(id: string, body: IUser) {
  return {
    url: `${API_URL}/users/${id}`,
    options: {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function USER_DELETE(id: string) {
  return {
    url: `${API_URL}/users/${id}`,
    options: {
      method: 'DELETE',
    },
  };
}

