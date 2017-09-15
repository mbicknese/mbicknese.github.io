import axios from 'axios'
import 'es6-promise/auto'

import conf from '../config'
import { onlyTitle, onlyDate } from '../utils'

/**
 * Format GitHub Api url for content list
 * @returns {string}
 */
function getListUrl () {
  // @see https://developer.github.com/v3/repos/contents/#get-contents
  // @example https://api.github.com/repos/viko16/vue-ghpages-blog/contents/markdown?ref=markdown
  let url = `https://api.github.com/repos/${conf.repo}/contents/`
  if (conf.path) url += conf.path
  if (conf.branch) url += `?ref=${conf.branch}`
  return url
}

/**
 * Format GitHub raw url for file content
 * @param {string} filename
 * @returns {string}
 */
function getPostUrl (filename) {
  return `https://raw.githubusercontent.com/${conf.repo}/master/posts/${filename}`
}

// Cache processor
const Cache = {
  get: (key) => {
    if (!window.sessionStorage) return false
    return JSON.parse(window.sessionStorage.getItem(key))
  },
  set: (key, data) => {
    if (!window.sessionStorage) return false
    window.sessionStorage.setItem(key, JSON.stringify(data))
    return true
  },
  has: (key) => {
    return Boolean(window.sessionStorage && window.sessionStorage.hasOwnProperty(key))
  }
}

export default {

  getList () {
    if (Cache.has('list')) {
      // Read from cache
      return Promise.resolve(Cache.get('list'))
    } else {
      return axios.get(getListUrl())
        .then(res => res.data)
        .then(arr => {
          // Data cleaning
          const list = arr.map(({name, sha, size}) => ({
            title: onlyTitle(name),
            date: onlyDate(name),
            name: name,
            sha,
            size
          }))
          // Save into cache
          Cache.set('list', list)
          // ..then return
          return list
        })
    }
  },

  getDetail (filename) {
    const cacheKey = 'post.' + filename

    if (Cache.has(cacheKey)) {
      // Read from cache
      return Promise.resolve(Cache.get(cacheKey))
    } else {
      return axios.get(getPostUrl(filename))
        .then(res => res.data)
        .then(content => {
          // Save into cache
          Cache.set(cacheKey, content)
          // ..then return
          return content
        })
    }
  }
}
