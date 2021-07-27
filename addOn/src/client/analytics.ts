import axios from 'axios'

import { GAEvent } from '../types'

export const logPageview = (userId: string | undefined, page: string): void => {
  if (userId) {
    axios.post('https://www.google-analytics.com/collect', null, {
      params: {
        v: '1',
        tid: 'UA-170636686-2',
        cid: userId,
        z: Math.floor(Math.random() * 10e7),

        t: 'pageview',
        dp: page
      }
    })
  }
}

export const logEvent = (userId: string | undefined, event: GAEvent): void => {
  if (userId) {
    axios.post('https://www.google-analytics.com/collect', null, {
      params: {
        v: '1',
        tid: 'UA-170636686-2',
        cid: userId,
        z: Math.floor(Math.random() * 10e7),

        t: 'event',
        ec: event.category,
        ea: event.action,
        el: event.label
      }
    })
  }
}
