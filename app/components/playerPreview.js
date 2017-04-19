var React = require('react');
var PropTypes = require('prop-types');

function PlayerPreview(props) {
  return (
    <div>
      <div className='column'>
        <img
          className='avatar'
          src={props.avatar}
          alt={'avatar for ' + props.user_name}/>
        <h2 className='user_name'>@{props.user_name}</h2>
      </div>
      {props.children}
    </div>

  );
}

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  user_name: PropTypes.string.isRequired
}

module.exports = PlayerPreview;