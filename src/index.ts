import { execSync } from 'child_process';
import inquirer from 'inquirer';
import * as fs from 'fs';
import { URL } from 'url';
import { IMessages } from './interfaces/IMessages';
import { messages } from './messages';

/**
 * The Messages class is responsible for storing and retrieving localized messages.
 * It contains methods to set the current language and retrieve messages based on a key.
 */
class Messages {
    static messages: IMessages = messages;

    /**
     * The current language being used for messages.
     * By default, it is set to English ('en').
     */
    static currentLanguage: keyof IMessages = 'en';

    /**
     * Sets the language for messages.
     * @param {keyof IMessages} language - The language code to set ('en' for English, 'pt' for Portuguese).
     */
    static setLanguage(language: keyof IMessages) {
        this.currentLanguage = language;
    }

    /**
     * Retrieves a message string based on the provided key.
     * The message returned will be in the current language set.
     * @param {MessageKey} key - The key representing the message to retrieve.
     * @returns {string} The localized message corresponding to the key.
     */
    static get(key: MessageKey): string {
        return this.messages[this.currentLanguage][key];
    }
}

/**
 * The ProjectInitializer class is responsible for initializing a new project.
 * It handles user prompts, project setup, and Git operations such as cloning and committing changes.
 */
class ProjectInitializer {

    /**
     * Prompts the user to select a language.
     * Once a language is selected, all subsequent prompts will be in that language.
     * The selected language is stored in the Messages class for future reference.
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
     * Validates the project name entered by the user.
     * The project name must consist only of alphanumeric characters, underscores, and dashes.
     * @param {string} name - The project name entered by the user.
     * @returns {boolean | string} Returns true if the project name is valid, otherwise returns an error message.
     */
    private static isValidProjectName(name: string): boolean | string {
        return /^[a-zA-Z0-9_-]+$/.test(name) || Messages.get('projectName');
    }

    /**
     * Validates the Git repository URL entered by the user.
     * The URL must be a valid HTTPS or SSH URL for GitHub repositories.
     * @param {string} url - The Git repository URL entered by the user.
     * @param {string} type - The type of URL (either 'https' or 'ssh').
     * @returns {boolean | string} Returns true if the URL is valid, otherwise returns an error message.
     */
    private static isValidGitRepoURL(url: string, type: string): boolean | string {
        if (type === 'https') {
            try {
                const parsedUrl = new URL(url);
                return parsedUrl.origin === 'https://github.com' || Messages.get('invalidGitRepoURL');
            } catch (error) {
                return Messages.get('invalidGitRepoURL');
            }
        } else if (type === 'ssh') {
            return /^git@github\.com:[\w.-]+\/[\w.-]+\.git$/.test(url) || Messages.get('invalidGitRepoURL');
        }
        return Messages.get('invalidGitRepoURL');
    }

    /**
     * Prompts the user for various inputs required to initialize the project.
     * This includes the project name, Git repository URL, branch name, and other details.
     * The user's responses are validated and stored for later use in the project setup.
     * @returns {Promise<Object>} An object containing the user's responses.
     */
    private static async promptUser() {
        await this.promptLanguage();

        const { repoURLType } = await inquirer.prompt([
            {
                type: 'list',
                name: 'repoURLType',
                message: Messages.get('repoURLType'),
                choices: [
                    { name: 'HTTPS', value: 'https' },
                    { name: 'SSH', value: 'ssh' }
                ],
                default: 'https'
            }
        ]);

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
                    return this.isValidGitRepoURL(input, repoURLType);
                },
            },
            {
                type: 'input',
                name: 'branchName',
                message: Messages.get('branchName'),
                default: '',
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
                    return input === '' || this.isValidGitRepoURL(input, repoURLType);
                },
            },
            {
                type: 'input',
                name: 'packageName',
                message: Messages.get('packageName'),
                default: (answers: { projectName: string }) => {
                    // Automatically set the package name to the project name provided by the user.
                    return answers.projectName;
                },
            },
            {
                type: 'input',
                name: 'description',
                message: Messages.get('description'),
                default: '',
            },
            {
                type: 'input',
                name: 'author',
                message: Messages.get('author'),
                default: '',
            },
            {
                type: 'input',
                name: 'license',
                message: Messages.get('license'),
                default: 'ISC',
            },
            {
                type: 'input',
                name: 'keywords',
                message: Messages.get('keywords'),
                default: '',
                filter: (input: string) => input.split(',').map(keyword => keyword.trim()).filter(keyword => keyword.length > 0),
            },
            {
                type: 'list',
                name: 'mainBranchName',
                message: Messages.get('mainBranchName'),
                choices: [
                    { name: 'master', value: 'master' },
                    { name: 'main', value: 'main' }
                ],
                default: 'main'
            }
        ]);

        return answers;
    }

    /**
     * The main method responsible for creating the project.
     * It clones the Git repository, updates the `package.json` file with the user's inputs, installs dependencies,
     * sets the remote URL, cleans up branches, and commits the changes.
     */
    public static async createProject(): Promise<void> {
        const { projectName, repoURL, branchName, newRepoURL, packageName, description, author, license, keywords, mainBranchName } = await this.promptUser();

        try {
            console.log(`${Messages.get('creatingProject')} ./${projectName} 👷‍♀️🚧`);
            const branchOption = branchName ? `-b ${branchName}` : '';
            execSync(`git clone ${branchOption} ${repoURL} ${projectName}`, { stdio: 'inherit' });

            const packagePath = `${projectName}/package.json`;
            if (fs.existsSync(packagePath)) {
                const packageFile = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
                packageFile.name = packageName;
                packageFile.version = '1.0.0';
                packageFile.description = description;
                packageFile.author = author;
                packageFile.license = license;
                packageFile.keywords = keywords;
                packageFile.repository.url = newRepoURL || repoURL;
                packageFile.bugs.url = `${packageFile.repository.url.replace('.git', '')}/issues`;
                packageFile.homepage = `${packageFile.repository.url.replace('.git', '')}#readme`;

                fs.writeFileSync(packagePath, JSON.stringify(packageFile, null, 2), 'utf8');

                console.log(Messages.get('installingDependencies'));
                execSync(`cd ${projectName} && npm install`, { stdio: 'inherit' });

                if (newRepoURL) {
                    console.log(`${Messages.get('settingRemote')} ${newRepoURL} 🔧`);
                    execSync(`cd ${projectName} && git remote set-url origin ${newRepoURL}`, { stdio: 'inherit' });
                }

                console.log(Messages.get('cleaningUpBranches'));
                execSync(`cd ${projectName} && git switch --orphan ${mainBranchName} && git branch -D ${branchName}`, { stdio: 'inherit' });
                const branches = execSync(`cd ${projectName} && git branch --format="%(refname:short)" --merged`)
                    .toString()
                    .split('\n')
                    .map(branch => branch.trim())
                    .filter(branch => branch && branch !== mainBranchName);
                for (const branch of branches) {
                    console.log(`Deleting branch: ${branch}`);
                    execSync(`cd ${projectName} && git branch -D ${branch}`, { stdio: 'inherit' });
                }

                // Commit the changes to the package.json file with a detailed commit message
                console.log(`Committing changes to ${mainBranchName} branch`);
                execSync(
                    `cd ${projectName} && git add . && git commit -m "chore(package): update project details and create main branch\n\nUpdated the \`package.json\` to reflect the new project details, including the project name, description, repository URL, and keywords for the \`${projectName}\`."`,
                    { stdio: 'inherit' }
                );

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

// Start the project creation process by invoking the createProject method.
// If any error occurs during the process, it will be caught and logged to the console.
ProjectInitializer.createProject().catch((err) => {
    if (err instanceof Error) {
        console.error(`${Messages.get('errorOccurred')}${err.message}`);
    } else {
        console.error(`${Messages.get('unknownErrorOccurred')}`);
    }
});
