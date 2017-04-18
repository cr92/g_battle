var React = require('react');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
var Popular = require('./popular');
var Nav = require('./nav');
var Home = require('./home');
var Battle = require('./battle');
var Results = require('./results');

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <Nav/>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/popular' component={Popular}/>
            <Route exact path='/battle' component={Battle}/>
            <Route exact path='/battle/results' component={Results}/>
            <Route render={function () {
              return <p>404</p>
            }}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

module.exports = App;