var React = require('react');
var PropTypes = require('prop-types');

var styles = {
  content: {
    textAlign: 'center',
    fontSize: '30px'
  }
}

class Loading extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      text: props.text,
      speed: props.speed
    }
  }

  componentDidMount()
  {
    var stopper = this.props.text + '...';
    this.anim_interval = window.setInterval(function () {
      if (this.state.text === stopper) {
        this
          .setState(function () {
            return {text: this.props.text}
          });
      } else {
        this
          .setState(function (prevState) {
            return {
              text: prevState.text + '.'
            }
          });
      }
    }.bind(this), this.props.speed)
  }

  componentWillUnmount()
  {
    window.clearInterval(this.anim_interval);
  }

  render()
  {
    return (
      <p style={styles.content}>
        {this.state.text}
      </p>
    );
  }
}

Loading.defaultProps = {
  text: 'Loading',
  speed: 250
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired
}

module.exports = Loading;