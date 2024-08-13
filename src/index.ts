#!/usr/bin/env node

import { execSync } from 'child_process';
import inquirer from 'inquirer';
import * as fs from 'fs';
import { URL } from 'url';

/**
 * Class to handle the initialization of a new project.
 */
class ProjectInitializer {

    /**
     * Validates if the given project name contains only letters, numbers, underscores, and dashes.
     * @param {string} name - The project name to validate.
     * @returns {boolean} - Returns true if valid, false otherwise.
     */
    private static isValidProjectName(name: string): boolean {
        return /^[a-zA-Z0-9_-]+$/.test(name);
    }

    /**
     * Validates if the given URL is a valid GitHub repository URL.
     * @param {string} url - The URL to validate.
     * @returns {boolean} - Returns true if valid, false otherwise.
     */
    private static isValidGitRepoURL(url: string): boolean {
        try {
            const parsedUrl = new URL(url);
            return parsedUrl.origin === 'https://github.com';
        } catch (error) {
            return false;
        }
    }

    /**
     * Prompts the user for inputs, including the option to cancel.
     */
    private static async promptUser() {
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'projectName',
                message: 'What is your project name?',
                choices: [
                    {
                        name: 'Enter project name',
                        value: 'input',
                    },
                    {
                        name: 'Cancel',
                        value: 'cancel',
                    },
                ],
                validate: (input: string) => this.isValidProjectName(input) || 'Project name can only contain letters, numbers, underscores, and dashes.',
                filter: async (val: string) => {
                    if (val === 'cancel') {
                        console.log('Operation canceled by the user.');
                        process.exit(0);
                    }
                    return await inquirer.prompt({
                        type: 'input',
                        name: 'projectName',
                        message: 'Please enter your project name:',
                        validate: (input: string) => this.isValidProjectName(input) || 'Project name can only contain letters, numbers, underscores, and dashes.',
                    }).then(answer => answer.projectName);
                },
            },
            {
                type: 'list',
                name: 'repoURL',
                message: 'Which TypeScript template repository you want to use (Repo URL)?',
                choices: [
                    {
                        name: 'Enter repository URL',
                        value: 'input',
                    },
                    {
                        name: 'Cancel',
                        value: 'cancel',
                    },
                ],
                validate: (input: string) => this.isValidGitRepoURL(input) || 'Please enter a valid GitHub repository URL.',
                filter: async (val: string) => {
                    if (val === 'cancel') {
                        console.log('Operation canceled by the user.');
                        process.exit(0);
                    }
                    return await inquirer.prompt({
                        type: 'input',
                        name: 'repoURL',
                        message: 'Please enter the repository URL:',
                        validate: (input: string) => this.isValidGitRepoURL(input) || 'Please enter a valid GitHub repository URL.',
                    }).then(answer => answer.repoURL);
                },
            },
            {
                type: 'list',
                name: 'newRepoURL',
                message: 'Enter the new GitHub repository URL for your project (leave blank to skip):',
                choices: [
                    {
                        name: 'Enter new repository URL',
                        value: 'input',
                    },
                    {
                        name: 'Cancel',
                        value: 'cancel',
                    },
                ],
                filter: async (val: string) => {
                    if (val === 'cancel') {
                        console.log('Operation canceled by the user.');
                        process.exit(0);
                    }
                    return await inquirer.prompt({
                        type: 'input',
                        name: 'newRepoURL',
                        message: 'Please enter the new repository URL (leave blank to skip):',
                        validate: (input: string) => input === '' || this.isValidGitRepoURL(input) || 'Please enter a valid GitHub repository URL.',
                    }).then(answer => answer.newRepoURL);
                },
            }
        ]);

        return answers;
    }

    /**
     * Creates a new project by cloning a repository, setting up the project structure,
     * and optionally setting a new remote origin for the project.
     */
    public static async createProject(): Promise<void> {
        const { projectName, repoURL, newRepoURL } = await this.promptUser();

        try {
            console.log(`Creating a new project in ./${projectName} 👷‍♀️🚧`);
            execSync(`git clone ${repoURL} ${projectName}`, { stdio: 'inherit' });

            const packagePath = `${projectName}/package.json`;
            if (fs.existsSync(packagePath)) {
                const packageFile = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
                packageFile.name = projectName;
                fs.writeFileSync(packagePath, JSON.stringify(packageFile, null, 2), 'utf8');

                console.log('Installing dependencies 💼...');
                execSync(`cd ${projectName} && npm install`, { stdio: 'inherit' });

                // If the user provided a new repository URL, update the remote origin
                if (newRepoURL) {
                    console.log(`Setting new remote origin to ${newRepoURL} 🔧`);
                    execSync(`cd ${projectName} && git remote set-url origin ${newRepoURL}`, { stdio: 'inherit' });
                }

                console.log('Project is ready to go! 🚀🚀🚀');
            } else {
                console.error('Error: package.json not found in the template. Please check the template structure.');
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Failed to create project due to an error: ${error.message}`);
            } else {
                console.error(`An unknown error occurred: ${error}`);
            }
        }
    }
}

// Execute the project initialization
ProjectInitializer.createProject().catch((err) => {
    if (err instanceof Error) {
        console.error(`Encountered an error: ${err.message}`);
    } else {
        console.error('An unknown error occurred during the project initialization.');
    }
});
