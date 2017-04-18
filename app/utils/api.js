var axios = require('axios');
var github_id = '';
var github_secret = '';
var github_params = '?client_id=' + github_id + '&client_secret=' + github_secret;

function getProfile(user_name) {
  return axios.get('https://api.github.com/users/' + user_name + github_params)
    .then(function (user) {
      return user.data;
    });
}

function getRepos(user_name) {
  return axios.get('https://api.github.com/users/' + user_name + '/repos' + github_params + '&per_page=100');
}

function getStars(repos) {
  repos.data.reduce(function (count, repo) {
    return count + repo.stargazers_count
  }, 0);
}

function calculateScore(profile, repos) {
  var followers = profile.followers;
  var total_stars = getStars(repos);
  return followers * 3 + total_stars;
}

function handleError(error) {
  console.warn(error);
  return null;
}

function getUserData(player) {
  return axios.all([getProfile(player), getRepos(player)])
    .then(function (data) {
      var profile = data[0];
      var repos = data[1];
      return {
        profile: profile,
        score: calculateScore(profile, repos)
      }
    });
}

function sortPlayers(players) {
  return players.sort(function (p1, p2) {
    return p2.score - p1.score;
  });
}

module.exports = {
  fetchPopularRepos: function (language) {
    var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + language + '&sort=stars&order=desc&type=Repositories');
    return axios.get(encodedURI)
      .then(function (response) {
        return response.data.items;
      });
  },

  battle: function (players) {
    return axios.all(players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError);
  }

}