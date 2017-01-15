fetch('/api')
    .then(result => result.json())
    .then(json => {
        document.querySelector('h1').innerHTML = json.projectName;
    });