var React = require('react');
var QueryString = require('query-string');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;
var api = require('../utils/api');
var PlayerPreview = require('./playerPreview');
var Loading = require('./loading');

function Profile(props) {
  var info = props.profile_info;
  return (
    <PlayerPreview avatar={info.avatar_url} user_name={info.login}>
      <ul className='space-list-items'>
        <li>Followers: {info.followers}</li>
        <li>Following: {info.following}</li>
        <li>Public Repos: {info.public_repos}</li>
        {info.name && <li>{info.name}</li>}
        {info.location && <li>{info.location}</li>}
        {info.company && <li>{info.company}</li>}
        {info.blog && <li>
          <a href={info.blog}>{info.blog}</a>
        </li>}
      </ul>
      {JSON.stringify(props.info, null, 2)}
    </PlayerPreview>
  );
}

Profile.propTypes = {
  profile_info: PropTypes.object.isRequired
}

function Player(props) {
  return (
    <div>
      <h1 className='header'>{props.label}
        : {props.profile.login}</h1>
      <h3 style={{
        textAlign: 'center'
      }}>Score: {props.score}</h3>
      <Profile profile_info={props.profile}/>
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
          <Loading text='Fighting'/>
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
        <Player label='Won' score={winner.score} profile={winner.profile}/>
        <Player label='Lost' score={loser.score} profile={loser.profile}/>
      </div>
    );
  }
}

module.exports = Results;