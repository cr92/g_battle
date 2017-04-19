var React = require('react');
var QueryString = require('query-string');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;
var api = require('../utils/api');

function Player(props) {
  return (
    <div>
      <h1 className='header'>{props.label} : {props.profile.login}</h1>
      <h3 style={{
        textAlign: 'center'
      }}>Score: {props.score}</h3>
    </div>
  );
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired
}

class Results extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }

  componentDidMount()
  {
    console.log(this.props);
    var players = QueryString.parse(this.props.location.search);
    console.log(players);
    api
      .battle([players.playerOneName, players.playerTwoName])
      .then(function (sorted_players) {
        if (sorted_players === null) {
          this
            .setState(function () {
              return {error: 'GitHub API Error', loading: false}
            });
        }
        this
          .setState(function () {
            return {error: null, winner: sorted_players[0], loser: sorted_players[1], loading: false}
          });
      }.bind(this));
  }

  render()
  {
    var winner = this.state.winner;
    var loser = this.state.loser;
    var error = this.state.error;
    var loading = this.state.loading;

    if (loading === true) {
      return (
        <div>
          <p className='wait_loader'><img src="https://media.giphy.com/media/TkXCbTx9gfUJi/giphy.gif" alt="Loading"/></p>
        </div>
      );
    }

    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to='/battle'>Reset</Link>
        </div>
      );
    }

    console.log(this.state);

    return (
      <div className='row'>

        <Player label='Winner' score={winner.score} profile={winner.profile}/>

        <Player label='Loser' score={loser.score} profile={loser.profile}/>

      </div>
    );
  }
}

module.exports = Results;