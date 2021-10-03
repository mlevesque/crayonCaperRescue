function buildComponents() {
    const mainContainer = document.createElement('div');
    mainContainer.innerHTML = "Hello, world!";
    return mainContainer;
}

document.body.appendChild(buildComponents());
