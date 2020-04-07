const api = {
  getUser(username) { 
    return axios.get(`https://api.github.com/users/${username}/repos?per_page=100`).catch(err =>{
      console.log('user not found')
      process.exit(1)
    }) 

  }
};

module.exports = api;