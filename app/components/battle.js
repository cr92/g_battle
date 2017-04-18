var React = require('react');
var PropTypes = require('prop-types');

class PlayerInput extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      user_name: ''
    }
    this.handleChange = this
      .handleChange
      .bind(this);
    this.handleSubmitPlayer = this
      .handleSubmitPlayer
      .bind(this);
  }

  handleChange(event)
  {
    var value = event.target.value;
    this.setState(function () {
      return {user_name: value}
    });
  }

  handleSubmitPlayer(event)
  {
    console.log('here in player ' + this.props.id + ' ' + this.state.user_name);
    event.preventDefault();
    this
      .props
      .onSubmit(this.props.id, this.state.user_name)
  }

  render()
  {
    return (
      <form className='column' onSubmit={this.handleSubmitPlayer}>
        <label className='header' htmlFor='user_name'>
          {this.props.label}
        </label>
        <input
          id='user_name'
          placeholder='github id'
          type='text'
          autoComplete='off'
          value={this.state.user_name}
          onChange={this.handleChange}/>
        <button className='button' type='submit' disabled={!this.state.user_name}>Submit</button>
      </form>

    );
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

class Battle extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null
    }

    this.handleSubmitBattle = this
      .handleSubmitBattle
      .bind(this);
  }

  handleSubmitBattle(id, user_name)
  {
    console.log('here in battle');
    this.setState(function () {
      var new_state = {};
      new_state[id + 'Name'] = user_name;
      new_state[id + 'Image'] = 'https://github.com' + user_name + '.png?size=200';
      return new_state;
    });
  }

  render()
  {
    var playerOneName = this.state.playerOneName;
    var playerTwoName = this.state.playerTwoName;
    var playerOneImage = this.state.playerOneImage;
    var playerTwoImage = this.state.playerTwoImage;

    console.log('rendering...');

    return (
      <div>
        <div className='row'>
          {!playerOneName && <PlayerInput
            id='playerOne'
            label='Player One'
            onSubmit={this.handleSubmitBattle}/>}
          {!playerTwoName && <PlayerInput
            id='playerTwo'
            label='Player Two'
            onSubmit={this.handleSubmitBattle}/>}
        </div>
      </div>
    );
  }
}

module.exports = Battle;