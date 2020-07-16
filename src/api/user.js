import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login.php',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/info.php',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/logout.php',
    method: 'post'
  })
}
