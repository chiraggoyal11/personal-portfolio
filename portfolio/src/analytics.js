import ReactGA from 'react-ga4'

const TRACKING_ID = 'G-REC6V5NSQY' // Your Google Analytics Measurement ID

export const initGA = () => {
  // Only initialize in production (not during local development)
  if (window.location.hostname !== 'localhost') {
    ReactGA.initialize(TRACKING_ID)
    console.log('Google Analytics initialized')
  }
}

export const logPageView = () => {
  if (window.location.hostname !== 'localhost') {
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname })
  }
}

export const logEvent = (category, action, label) => {
  if (window.location.hostname !== 'localhost') {
    ReactGA.event({
      category: category,
      action: action,
      label: label,
    })
  }
}
