function toggleMenu() {
  const nav = document.querySelector(".nav-links");
  nav.style.display = nav.style.display === "flex" ? "none" : "flex";
}

async function fetchGitHubProjects() {
  const username = 'Mncedisi19';
  const url = `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch repos');
    }
    const repos = await response.json();

    // Sort by stargazers_count descending, then by updated_at descending
    repos.sort((a, b) => {
      if (b.stargazers_count !== a.stargazers_count) {
        return b.stargazers_count - a.stargazers_count;
      }
      return new Date(b.updated_at) - new Date(a.updated_at);
    });

    // Take top 2
    const topRepos = repos.slice(0, 2);

    const container = document.getElementById('projects-container');
    container.innerHTML = ''; // Clear any existing content

    topRepos.forEach(repo => {
      const card = document.createElement('div');
      card.className = 'project-card';

      const title = document.createElement('h3');
      title.textContent = repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()); // Capitalize words

      const tools = document.createElement('p');
      tools.innerHTML = `<b>Tools:</b> ${repo.language || 'N/A'}`;

      const desc = document.createElement('p');
      desc.textContent = repo.description || 'No description available.';

      const link = document.createElement('a');
      link.href = repo.html_url;
      link.target = '_blank';
      link.textContent = 'View Project';

      card.appendChild(title);
      card.appendChild(tools);
      card.appendChild(desc);
      card.appendChild(link);

      container.appendChild(card);
    });
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    const container = document.getElementById('projects-container');
    container.innerHTML = '<p>Unable to load projects at this time.</p>';
  }
}

// Call the function when the page loads
window.addEventListener('DOMContentLoaded', fetchGitHubProjects);