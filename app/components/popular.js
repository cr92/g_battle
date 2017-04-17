var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');

function SelectLanguage(props) {
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
        })}
    </ul>
  )
}

function RepoGrid(props) {
  return (
    <ul className='popular_list'>
      {props
        .repos
        .map(function (repo, index) {
          return (
            <li key={repo.name} className='popular_item'>
              <div className='popular_rank'>
                #{index + 1}
              </div>
              <ul className='space_list_items'>
                <li>
                  <img
                    className='avatar'
                    src={repo.owner.avatar_url}
                    alt={'Avatar for ' + repo.owner.login}/>
                </li>
                <li>
                  <a href={repo.html_url}>{repo.name}</a>
                </li>
                <li>
                  @{repo.owner.login}
                </li>
                <li>
                  {repo.stargazers_count}
                  stars
                </li>
              </ul>
            </li>
          );
        })}
    </ul>
  );
}

SelectLanguage.PropTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

RepoGrid.PropTypes = {
  repos: PropTypes.array.isRequired
}

class Popular extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null
    }
    this.updateLanguage = this
      .updateLanguage
      .bind(this);
  }

  componentDidMount()
  {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(lang)
  {
    this
      .setState(function () {
        return {selectedLanguage: lang, repos: null}
      });

    api
      .fetchPopularRepos(lang)
      .then(function (repos) {
        this
          .setState(function () {
            return {repos: repos}
          });
      }.bind(this));
  }

  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}/>
          
          {!this.state.repos
          ? <p className='wait_loader'><img src="https://media.giphy.com/media/TkXCbTx9gfUJi/giphy.gif" alt="Loading"/></p>
          : <RepoGrid repos={this.state.repos}/>}

      </div>
    );
  }
}

module.exports = Popular;