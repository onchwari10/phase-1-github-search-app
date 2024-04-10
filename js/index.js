document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const userList = document.getElementById('user-list');
    const repoList = document.getElementById('repo-list');
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const searchTerm = searchInput.value.trim();
      if (searchTerm !== '') {
        try {
          const users = await searchUsers(searchTerm);
          displayUsers(users);
        } catch (error) {
          console.error('Error searching users:', error);
        }
      }
    });
  
    userList.addEventListener('click', async (event) => {
      if (event.target.tagName === 'A') {
        const username = event.target.textContent;
        try {
          const repos = await getUserRepos(username);
          displayRepos(repos);
        } catch (error) {
          console.error('Error fetching user repos:', error);
        }
      }
    });
  
    async function searchUsers(query) {
      const url = `https://api.github.com/search/users?q=${query}`;
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      const data = await response.json();
      return data.items;
    }
  
    async function getUserRepos(username) {
      const url = `https://api.github.com/users/${username}/repos`;
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      return response.json();
    }
  
    function displayUsers(users) {
      userList.innerHTML = '';
      users.forEach(user => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = user.html_url;
        link.textContent = user.login;
        listItem.appendChild(link);
        userList.appendChild(listItem);
      });
    }
  
    function displayRepos(repos) {
      repoList.innerHTML = '';
      repos.forEach(repo => {
        const listItem = document.createElement('li');
        listItem.textContent = repo.full_name;
        repoList.appendChild(listItem);
      });
    }
  });
  