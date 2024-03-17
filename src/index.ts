#!/usr/bin/env node

import { execSync } from 'child_process';
import inquirer from 'inquirer';
import * as fs from 'fs';

async function createProject() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'What is your project name?',
    },
    {
      type: 'input',
      name: 'repoURL',
      message: 'Which TS template repository you want to use (Repo URL)?',
    },
  ]);

  const { projectName } = answers;
  const { repoURL } = answers

  console.log(`Creating a new project in ./${projectName}`);
  execSync(`git clone ${repoURL} ${projectName}`);

  const packagePath = `${projectName}/package.json`;
  const packageFile = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  packageFile.name = projectName;
  fs.writeFileSync(packagePath, JSON.stringify(packageFile, null, 2));

  console.log('Installing dependencies...');
  execSync(`cd ${projectName} && npm install`);

  console.log('Project is ready to go!');
}

createProject().catch((err) => console.error(err));
