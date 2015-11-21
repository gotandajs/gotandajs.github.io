import React from 'react'
import ReactDOM from 'react-dom'
import voronoi from './voronoi'
import Slack   from './slack.jsx'

voronoi();
ReactDOM.render(<Slack />, document.querySelector('#slack_form'));
