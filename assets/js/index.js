
async function getRepositoryDetails(name, owner) {
  let response = await fetch(`https://api.github.com/repos/${owner}/${name}`);
  let data = await response.json();
  return data;
}

function buildRepository(repository) {
  return `
<div class="repository col">
  <a href="${repository.homepage || repository.html_url}">
    <h3>${repository.name}</h3>
  </a>
  <p class="lead">${repository.description}</p>
</div>
  `;
};

async function buildRepositories(container, owner, repositories) {
  let elements = [];
  for (let name of repositories) {
    elements.push(await getRepositoryDetails(name, owner));
  }
  for (let element of elements) {
    container.insertAdjacentHTML('beforeend', buildRepository(element));
  };
}

document.addEventListener("DOMContentLoaded", () => {
  buildRepositories(document.getElementById('projects'), 'yannprada', [
    'cookie-garden-helper',
    'mouse-rotation',
    'brainfuckjs',
  ]);
});
