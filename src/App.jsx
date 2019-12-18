import React, { useEffect } from 'react'
import ReactGA from 'react-ga'

import { Config } from './config'
import { Home } from './pages/Home'


export const App = () => {

	useEffect(() => {
		if (process.env.NODE_ENV === 'production') {
			ReactGA.initialize(Config.GoogleAnalytics)
			ReactGA.pageview('/')
		}
	}, [])

	return <Home />
}
