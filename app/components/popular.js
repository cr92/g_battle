var React = require('react');

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
                style={lang === this.state.selectedLanguage
                ? {
                  'color': 'red'
                }
                : {
                  'color': 'black'
                }}
                key={lang}
                onClick={this
                .updateLanguage
                .bind(null, lang)}>
                {lang}
              </li>
            );
          }, this)
}
      </ul>
    );
  }
}

module.exports = Popular;