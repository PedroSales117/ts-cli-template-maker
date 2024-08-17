/**
 * Interface for the structure of messages in each language.
 * The keys correspond to specific messages that are used throughout the script.
 */
export interface ILanguageMessages {
    selectLanguage: string;
    projectName: string;
    repoURLType: string;
    repoURL: string;
    branchName: string;
    newRepoURL: string;
    mainBranchName: string;
    operationCanceled: string;
    creatingProject: string;
    installingDependencies: string;
    settingRemote: string;
    cleaningUpBranches: string;
    projectReady: string;
    errorPackageJson: string;
    errorOccurred: string;
    unknownErrorOccurred: string;
    invalidGitRepoURL: string;
    packageName: string;
    description: string;
    author: string;
    license: string;
    keywords: string;
}

/**
 * Interface for the object containing all messages for different languages.
 * It maps the language code ('en' for English, 'pt' for Portuguese) to the respective language messages.
 */
export interface IMessages {
    en: ILanguageMessages;
    pt: ILanguageMessages;
}
