#!/usr/bin/env node

import { execSync } from 'child_process';
import inquirer from 'inquirer';
import * as fs from 'fs';
import { URL } from 'url';

// Define the valid keys for messages
type MessageKey =
    | 'selectLanguage'
    | 'projectName'
    | 'repoURL'
    | 'newRepoURL'
    | 'operationCanceled'
    | 'creatingProject'
    | 'installingDependencies'
    | 'settingRemote'
    | 'projectReady'
    | 'errorPackageJson'
    | 'errorOccurred'
    | 'unknownErrorOccurred'
    | 'invalidGitRepoURL';

// Interface for the structure of messages in each language
interface ILanguageMessages {
    selectLanguage: string;
    projectName: string;
    repoURL: string;
    newRepoURL: string;
    operationCanceled: string;
    creatingProject: string;
    installingDependencies: string;
    settingRemote: string;
    projectReady: string;
    errorPackageJson: string;
    errorOccurred: string;
    unknownErrorOccurred: string;
    invalidGitRepoURL: string;
}

// Interface for the object containing all messages
interface IMessages {
    en: ILanguageMessages;
    pt: ILanguageMessages;
}

class Messages {
    static messages: IMessages = {
        en: {
            selectLanguage: 'Select your language',
            projectName: 'What is your project name? (c: to cancel)',
            repoURL: 'Which TypeScript template repository you want to use (Repo URL)? (c: to cancel)',
            newRepoURL: 'Enter the new GitHub repository URL for your project (leave blank to skip, c: to cancel):',
            operationCanceled: 'Operation canceled by the user.',
            creatingProject: 'Creating a new project in .',
            installingDependencies: 'Installing dependencies 💼...',
            settingRemote: 'Setting new remote origin to ',
            projectReady: 'Project is ready to go! 🚀🚀🚀',
            errorPackageJson: 'Error: package.json not found in the template. Please check the template structure.',
            errorOccurred: 'Failed to create project due to an error: ',
            unknownErrorOccurred: 'An unknown error occurred: ',
            invalidGitRepoURL: 'Please enter a valid GitHub repository URL.',
        },
        pt: {
            selectLanguage: 'Selecione seu idioma',
            projectName: 'Qual é o nome do seu projeto? (c: para cancelar)',
            repoURL: 'Qual repositório de template TypeScript você deseja usar (URL do repositório)? (c: para cancelar)',
            newRepoURL: 'Insira a nova URL do repositório GitHub para o seu projeto (deixe em branco para pular, c: para cancelar):',
            operationCanceled: 'Operação cancelada pelo usuário.',
            creatingProject: 'Criando um novo projeto em .',
            installingDependencies: 'Instalando dependências 💼...',
            settingRemote: 'Configurando novo remote origin para ',
            projectReady: 'Projeto está pronto para começar! 🚀🚀🚀',
            errorPackageJson: 'Erro: package.json não encontrado no template. Verifique a estrutura do template.',
            errorOccurred: 'Falha ao criar o projeto devido a um erro: ',
            unknownErrorOccurred: 'Ocorreu um erro desconhecido: ',
            invalidGitRepoURL: 'Por favor, insira uma URL válida do repositório GitHub.',
        }
    };

    static currentLanguage: keyof IMessages = 'en';

    /**
     * Sets the current language for messages.
     * @param {keyof IMessages} language - The language to set (e.g., 'en' or 'pt').
     */
    static setLanguage(language: keyof IMessages) {
        this.currentLanguage = language;
    }

    /**
     * Retrieves a message based on the current language and key.
     * @param {MessageKey} key - The key of the message to retrieve.
     * @returns {string} - The localized message.
     */
    static get(key: MessageKey): string {
        return this.messages[this.currentLanguage][key];
    }
}

class ProjectInitializer {

    /**
     * Prompts the user for the language, and updates the prompt message based on the language selected.
     */
    private static async promptLanguage(): Promise<void> {
        const { language } = await inquirer.prompt([
            {
                type: 'list',
                name: 'language',
                message: Messages.get('selectLanguage'),
                choices: [
                    {
                        name: 'English',
                        value: 'en',
                        short: 'English',
                    },
                    {
                        name: 'Português',
                        value: 'pt',
                        short: 'Português',
                    }
                ],
                filter: function (val) {
                    Messages.setLanguage(val);
                    return val;
                },
                transformer: function (input: string, flags: { isFinal: boolean; }) {
                    if (flags.isFinal) {
                        return Messages.get('selectLanguage');
                    }
                    return input === 'en' ? 'Select your language' : 'Selecione seu idioma';
                }
            }
        ]);

        Messages.setLanguage(language);
    }

    /**
     * Validates if the given project name contains only letters, numbers, underscores, and dashes.
     * @param {string} name - The project name to validate.
     * @returns {boolean|string} - Returns true if valid, otherwise returns an error message.
     */
    private static isValidProjectName(name: string): boolean | string {
        return /^[a-zA-Z0-9_-]+$/.test(name) || Messages.get('projectName');
    }

    /**
     * Validates if the given URL is a valid GitHub repository URL.
     * @param {string} url - The URL to validate.
     * @returns {boolean|string} - Returns true if valid, otherwise returns an error message.
     */
    private static isValidGitRepoURL(url: string): boolean | string {
        try {
            const parsedUrl = new URL(url);
            return parsedUrl.origin === 'https://github.com' || Messages.get('invalidGitRepoURL');
        } catch (error) {
            return Messages.get('invalidGitRepoURL');
        }
    }

    /**
     * Prompts the user for inputs, including the option to cancel.
     */
    private static async promptUser() {

        await this.promptLanguage();

        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'projectName',
                message: Messages.get('projectName'),
                validate: (input: string) => {
                    if (input.toLowerCase() === 'c') {
                        console.log(); // Forces a line break
                        console.log(Messages.get('operationCanceled'));
                        process.exit(0);
                    }
                    return this.isValidProjectName(input);
                },
            },
            {
                type: 'input',
                name: 'repoURL',
                message: Messages.get('repoURL'),
                validate: (input: string) => {
                    if (input.toLowerCase() === 'c') {
                        console.log(); // Forces a line break
                        console.log(Messages.get('operationCanceled'));
                        process.exit(0);
                    }
                    return this.isValidGitRepoURL(input);
                },
            },
            {
                type: 'input',
                name: 'newRepoURL',
                message: Messages.get('newRepoURL'),
                validate: (input: string) => {
                    if (input.toLowerCase() === 'c') {
                        console.log(); // Forces a line break
                        console.log(Messages.get('operationCanceled'));
                        process.exit(0);
                    }
                    return input === '' || this.isValidGitRepoURL(input);
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
            console.log(`${Messages.get('creatingProject')} ./${projectName} 👷‍♀️🚧`);
            execSync(`git clone ${repoURL} ${projectName}`, { stdio: 'inherit' });

            const packagePath = `${projectName}/package.json`;
            if (fs.existsSync(packagePath)) {
                const packageFile = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
                packageFile.name = projectName;
                fs.writeFileSync(packagePath, JSON.stringify(packageFile, null, 2), 'utf8');

                console.log(Messages.get('installingDependencies'));
                execSync(`cd ${projectName} && npm install`, { stdio: 'inherit' });

                // If the user provided a new repository URL, update the remote origin
                if (newRepoURL) {
                    console.log(`${Messages.get('settingRemote')} ${newRepoURL} 🔧`);
                    execSync(`cd ${projectName} && git remote set-url origin ${newRepoURL}`, { stdio: 'inherit' });
                }

                console.log(Messages.get('projectReady'));
            } else {
                console.error(Messages.get('errorPackageJson'));
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error(`${Messages.get('errorOccurred')}${error.message}`);
            } else {
                console.error(`${Messages.get('unknownErrorOccurred')}${error}`);
            }
        }
    }
}

// Execute the project initialization
ProjectInitializer.createProject().catch((err) => {
    if (err instanceof Error) {
        console.error(`${Messages.get('errorOccurred')}${err.message}`);
    } else {
        console.error(Messages.get('unknownErrorOccurred'));
    }
});
