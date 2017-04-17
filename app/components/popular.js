var React = require('react');
var PropTypes = require('prop-types');

function SelectLanguage(props){
    var languages = [
      'All',
      'JavaScript',
      'Ruby',
      'Java',
      'CSS',
      'Python'
    ];
    return (
      <ul className='lang_list'>
        {languages
          .map(function (lang) {
            return (
              <li
                style={lang === props.selectedLanguage
                ? {
                  'color': 'red'
                }
                : {
                  'color': 'black'
                }}
                key={lang}
                onClick={props
                .onSelect
                .bind(null, lang)}>
                {lang}
              </li>
            );
          })
        }
      </ul>
    )
}


SelectLanguage.PropTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

class Popular extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      selectedLanguage: 'All'
    }
    this.updateLanguage = this
      .updateLanguage
      .bind(this);
  }

  updateLanguage(lang)
  {
    this
      .setState(function () {
        return {selectedLanguage: lang}
      });
  }

  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}/>
      </div>
    );
  }
}

module.exports = Popular;