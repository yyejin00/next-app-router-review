//next.js 에서는 fetch 함수에 캐싱 기능이 붙어있기 때문에, axios사용하지 않아도 된다.
const BASE_URL = 'https://learn.codeit.kr/v2/codeitmall';

async function request(path, { headers, ...options } = {}) {
  const url = path.startsWith('http') ? path : `${BASE_URL}${path}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });

  if (!response.ok) {
    const error = new Error(`HTTP error! status: ${response.status}`);
    error.status = response.status;
    throw error;
  }

  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

export async function get(path, options = {}) {
  return request(path, {
    ...options,
    method: 'GET',
  });
}

export async function post(path, data, options = {}) {
  return request(path, {
    ...options,
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function patch(path, data, options = {}) {
  return request(path, {
    ...options,
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function del(path, options = {}) {
  return request(path, {
    ...options,
    method: 'DELETE',
  });
}
