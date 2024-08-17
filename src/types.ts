/**
 * Type definition for valid keys used in messages.
 * Each key corresponds to a specific message that can be displayed to the user.
 */
type MessageKey =
    | 'selectLanguage'
    | 'projectName'
    | 'repoURLType'
    | 'repoURL'
    | 'branchName'
    | 'newRepoURL'
    | 'mainBranchName'
    | 'operationCanceled'
    | 'creatingProject'
    | 'installingDependencies'
    | 'settingRemote'
    | 'cleaningUpBranches'
    | 'projectReady'
    | 'errorPackageJson'
    | 'errorOccurred'
    | 'unknownErrorOccurred'
    | 'invalidGitRepoURL'
    | 'packageName'
    | 'description'
    | 'author'
    | 'license'
    | 'keywords';
