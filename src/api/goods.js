import request from '@/utils/request'

export function getallgoods(data) {
  return request({
    url: '/getallgoods',
    method: 'get',
    data
  })
}
