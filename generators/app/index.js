const Generator = require('yeoman-generator');
const fs = require('fs');
const exec = require('child_process').exec
const npm = require('./utils/npm');

module.exports = class extends Generator {
	
	constructor(args, opts) {
    	super(args, opts);
		this.answers = {};

		this.on('end', function () {
			exec(`git add -A && git commit -m "First Commit"`,  {cwd: this.answers.projectName});
		});
	}

	prompting(){
		return this.prompt([{
			type: 'input',
			name: 'projectName',
			message: 'Your project Name'
		}, {
			type: 'list',
			name: 'projectType',
			message: 'Type of the project',
			choices: ['Web', 'Back']	
		}, {
			type: 'list',
			name: 'choiceType',
			message: 'Choice of the web project',
			when: (response) => response.projectType === 'Web',
			choices: ['Basic']	
		}, {
			type: 'list',
			name: 'choiceType',
			message: 'Choice of the back project',
			when: (response) => response.projectType === 'Back',
			choices: ['NodeJS']	
		}, {
			type: 'list',
			name: 'documentationFormat',
			message: 'Format of your Documentation',
			choices: ['Markdown', 'AsciiDoc']	
		}]).then(answers => this.answers = answers);
	}

	/**
	 * Create a folder based on the project name
	 */
	createFolder(){
		fs.mkdirSync(this.answers.projectName);
	}

	initGitRepository(){
		exec('git init -q ' + this.answers.projectName);
	}

	createREADME(){
		let file = this.answers.documentationFormat === 'Markdown' ? 'README.md' : 'README.asciidoc'; 
		this.fs.copyTpl(
			this.templatePath(file),
			this.destinationPath(`${this.answers.projectName}/${file}`),
			{ projectName: this.answers.projectName }
		);
	}

	createGitIgnoreFile(){
		this.fs.copyTpl(
			this.templatePath('.gitignore'),
			this.destinationPath(`${this.answers.projectName}/.gitignore`),
			{ patterns: ['node_modules'] }
		);
	}

	createNpmPackage(){
		if(this.answers.projectType === 'Web'){
			npm.createNpmPackage.call(this, './node_modules/.bin/live-server --proxy=/api:http://localhost:3000/api');
		}
		if(this.answers.projectType === 'Back' && this.answers.choiceType === 'NodeJS'){
			npm.createNpmPackage.call(this, 'node index.js');
		}
	}

	installDependencies(){
		if(this.answers.projectType === 'Web'){
    		this.npmInstall(['live-server@1.2.0'], { 'save-dev': true }, null, {cwd: this.answers.projectName});
		}
		if(this.answers.projectType === 'Back' && this.answers.choiceType === 'NodeJS'){
			this.npmInstall(['express@4.14.0'], { 'save': true }, null, {cwd: this.answers.projectName});
		}
	}

	copyWebFiles(){
		if(this.answers.projectType === 'Web'){
			this.fs.copy(
				this.templatePath('web/!(index.html)'),
				this.destinationPath(this.answers.projectName)
			);
			this.fs.copyTpl(
				this.templatePath('web/index.html'),
				this.destinationPath(`${this.answers.projectName}/index.html`),
				{ projectName: this.answers.projectName }
			);
		}
		if(this.answers.projectType === 'Back' && this.answers.choiceType === 'NodeJS'){
			this.fs.copyTpl(
				this.templatePath('back/nodejs/index.js'),
				this.destinationPath(`${this.answers.projectName}/index.js`),
				{ projectName: this.answers.projectName }
			);
		}
	}
}
