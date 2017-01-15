exports.createNpmPackage = function(startScript){
    this.fs.writeJSON(this.destinationPath(`${this.answers.projectName}/package.json`), {
        name: this.answers.projectName,
        version: '0.0.1',
        scripts: {
            start: startScript
        }
    })
}