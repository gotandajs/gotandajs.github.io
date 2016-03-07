import 'normalize.css'
import './css/index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import voronoi from './js/voronoi'
import Slack   from './js/slack.jsx'
import './js/analytics'

voronoi();
ReactDOM.render(<Slack />, document.getElementById('slack_form'));
