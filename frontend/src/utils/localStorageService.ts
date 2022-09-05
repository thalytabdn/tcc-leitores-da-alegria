export function setField(key: string, value: string) {
  localStorage.setItem(key, value);
}

export function getField(key: string) {
  let result: any = "";

  if (localStorage.getItem(key)) {
    result = localStorage.getItem(key);
  }
  return result;
}

export function removeField(key: string) {
  localStorage.removeItem(key);
}

export function isAuth() {
  const id = localStorage.getItem("id");

  if (!id) {
    return false;
  }

  return true;
}

export function havePermission(roles: number[]){
  const userRole = Number(getField("role"));
  let permission = false;

  if(roles.includes(userRole)){
    permission = true;
  }

  return permission;
}


