#!/usr/bin/env node

import { execSync } from 'child_process';
import inquirer from 'inquirer';
import * as fs from 'fs';
import { URL } from 'url';

class ProjectInitializer {
    private static isValidProjectName(name: string): boolean {
        return /^[a-zA-Z0-9_-]+$/.test(name);
    }

    private static isValidGitRepoURL(url: string): boolean {
        try {
            new URL(url);
            return url.startsWith('https://github.com/');
        } catch (error) {
            return false;
        }
    }

    public static async createProject() {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'projectName',
                message: 'What is your project name?',
                validate: (input: string) => this.isValidProjectName(input) || 'Project name can only contain letters, numbers, underscores, and dashes.',
            },
            {
                type: 'input',
                name: 'repoURL',
                message: 'Which TS template repository you want to use (Repo URL)?',
                validate: (input: string) => this.isValidGitRepoURL(input) || 'Please enter a valid GitHub repository URL.',
            },
        ]);

        const { projectName, repoURL } = answers;

        try {
            console.log(`Creating a new project in ./${projectName} 👷‍♀️🚧`);
            execSync(`git clone ${repoURL} ${projectName}`, { stdio: 'inherit' });

            const packagePath = `${projectName}/package.json`;
            if (fs.existsSync(packagePath)) {
                const packageFile = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
                packageFile.name = projectName;
                fs.writeFileSync(packagePath, JSON.stringify(packageFile, null, 2));

                console.log('Installing dependencies 💼...');
                execSync(`cd ${projectName} && npm install`, { stdio: 'inherit' });

                console.log('Project is ready to go! 🚀🚀🚀');
            } else {
                console.error('Error: package.json not found in the template. Please check the template structure.');
            }
        } catch (error) {
            console.error(`Failed to create project due to an error: ${error}`);
        }
    }
}

ProjectInitializer.createProject().catch((err) => console.error(`Encountered an error: ${err}`));
