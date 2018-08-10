
async function getJson(url) {
  let response = await fetch(url);
  return await response.json();
}

async function getRepositoryDetails(name, owner) {
  const url = `https://api.github.com/repos/${owner}/${name}`;
  let data = await getJson(url);
  data.branches = await getJson(`${url}/branches`);
  data.branches_count = data.branches.length;
  data.commits = await getJson(`${url}/commits`);
  data.commits_count = data.commits.length;
  return data;
}

function buildRepository(repository) {
  return `
<div class="repository col">
  <a href="${repository.homepage || repository.html_url}">
    <h3>${repository.name}</h3>
  </a>
  <p class="lead">${repository.description}</p>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="branches">
          <ion-icon name="git-branch"></ion-icon>
          Branches:
          ${repository.branches_count}
        </div>
        <div class="commits">
          <ion-icon name="git-commit"></ion-icon>
          Commits:
          ${repository.commits_count}
        </div>
        ${repository.forks_count ? `
        <div class="forks">
          <ion-icon src="assets/svg/octicon-repo-forked.svg"></ion-icon>
          Forks:
          ${repository.forks_count}
        </div>
        `: ``}
      </div>
      <div class="col text-right">
        <div class="subs">
          Subscribers:
          ${repository.subscribers_count}
        </div>
      </div>
    </div>
  </div>
</div>
  `;
};

async function buildRepositories(container, owner, repositories, $progressBar) {
  let elements = [];
  for (let name of repositories) {
    elements.push(await getRepositoryDetails(name, owner));
  }
  for (let element of elements) {
    container.insertAdjacentHTML('beforeend', buildRepository(element));
  };
  $progressBar.classList.add('hide');
}

document.addEventListener("DOMContentLoaded", () => {
  buildRepositories(
    document.getElementById('projects'),
    'yannprada',
    [
      'cookie-garden-helper',
      'mouse-rotation',
      'brainfuckjs',
    ],
    document.getElementById('projectsLoading')
  );
});
