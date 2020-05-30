/*
 * @Author: flyharvest
 * @Date: 2020-05-27 15:07:01
 * @LastEditTime: 2020-05-29 19:16:17
 * @LastEditors: flyharvest
 */

export function isObject (value) {
  return value !== null && Object.prototype.toString(value) === '[object Object]'
}
export function isEqualObj (value1, value2) {
  return isObject(value1) &&
  isObject(value2) &&
  JSON.stringify(value1) === JSON.stringify(value2)
}
