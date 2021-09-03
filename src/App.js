
import './App.css';
import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export default class App extends Component {
  apikey = process.env.REACT_APP_NEWS_API;
  state = {
    progress: 0
  }
  setProgress = (progress) => {
    this.setState({ progress: progress})
  }
  render() {
    return (
      <div className="mw=100">
        <Router>
          <Navbar />
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
            height={3}
          />
          <Switch>
            <Route exact key="general" path="/">
              <News setProgress={this.setProgress} apikey={this.apikey} country="in" category="general" />
            </Route>
            <Route exact key="/business" path="/business">
              <News setProgress={this.setProgress} apikey={this.apikey} country="in" category="business" />
            </Route>
            <Route exact key="/entertainment" path="/entertainment">
              <News setProgress={this.setProgress} apikey={this.apikey} country="in" category="entertainment" />
            </Route>
            <Route exact key="/health" path="/health">
              <News setProgress={this.setProgress} apikey={this.apikey} country="in" category="health" />
            </Route>
            <Route exact key="/science" path="/science">
              <News setProgress={this.setProgress} apikey={this.apikey} country="in" category="science" />
            </Route>
            <Route exact key="/sports" path="/sports">
              <News setProgress={this.setProgress} apikey={this.apikey} country="in" category="sports" />
            </Route>
            <Route exact key="/technology" path="/technology">
              <News setProgress={this.setProgress} apikey={this.apikey} country="in" category="technology" />
            </Route>
          </Switch>
        </Router>
      </div >
    )
  }
}
