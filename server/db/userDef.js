const axios = require('axios');
module.exports = async () => {
  const usersGit = [
    'olehcambel',
    'ruanyf',
    'gaearon',
    'domenic',
    'sofer',
    'tj',
    'yyx990803',
    'HyukjinKwon',
    'JakeWharton',
    'DavdRoman',
    'miqueiaspenha',
    'haata',
    'mattrobenolt',
    'leroux',
    'michaelcullum',
    'FiloSottile',
    'sindresorhus',
    'freddier',
    'eklitzke',
    'Andrea',
    'SamTheDev',
    'yydcdut',
    'diutsu',
    'robbenmu'
  ];

  const promise = [];

  usersGit.forEach(user => {
    promise.push(axios.get(`https://api.github.com/users/${user}`));
  });
  const resolve = await axios.all(promise);
  const result = resolve.map(({ data }) => ({
    name: data.name,
    githubName: data.login,
    bio: data.bio,
    company: data.company,
    avatarUrl: data.avatar_url
  }));

  return result;
};
