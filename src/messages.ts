import { IMessages } from './interfaces/IMessages';

/**
 * The `messages` object contains localized strings used throughout the application.
 * These strings are organized by language codes (e.g., 'en' for English, 'pt' for Portuguese).
 * 
 * Each language object contains key-value pairs, where the key represents a message identifier,
 * and the value is the corresponding localized string in that language.
 * 
 * This object is used to support multi-language functionality within the application, allowing
 * for easy switching between languages without modifying the codebase.
 */
export const messages: IMessages = {
    /**
     * English (en) language messages.
     */
    en: {
        selectLanguage: 'Select your language',
        projectName: 'What is your project name? (c: to cancel)',
        repoURLType: 'Which type of URL do you want to use for the repository? (c: to cancel)',
        repoURL: 'Which TypeScript template repository you want to use (Repo URL)? (c: to cancel)',
        branchName: 'Which branch do you want to clone? (leave blank for default branch)',
        newRepoURL: 'Enter the new GitHub repository URL for your project (leave blank to skip, c: to cancel):',
        mainBranchName: 'Choose the main branch name (master or main):',
        operationCanceled: 'Operation canceled by the user.',
        creatingProject: 'Creating a new project in .',
        installingDependencies: 'Installing dependencies 💼...',
        settingRemote: 'Setting new remote origin to ',
        cleaningUpBranches: 'Cleaning up branches...',
        projectReady: 'Project is ready to go! 🚀🚀🚀',
        errorPackageJson: 'Error: package.json not found in the template. Please check the template structure.',
        errorOccurred: 'Failed to create project due to an error: ',
        unknownErrorOccurred: 'An unknown error occurred: ',
        invalidGitRepoURL: 'Please enter a valid GitHub repository URL.',
        packageName: 'Enter the package name (leave blank for default):',
        description: 'Enter the project description (leave blank for none):',
        author: 'Enter the author name (leave blank for none):',
        license: 'Enter the project license (default: ISC):',
        keywords: 'Enter keywords separated by commas (leave blank for none):',
    },
    /**
     * Portuguese (pt) language messages.
     */
    pt: {
        selectLanguage: 'Selecione seu idioma',
        projectName: 'Qual é o nome do seu projeto? (c: para cancelar)',
        repoURLType: 'Qual tipo de URL você deseja usar para o repositório? (c: para cancelar)',
        repoURL: 'Qual repositório de template TypeScript você deseja usar (URL do repositório)? (c: para cancelar)',
        branchName: 'Qual branch você deseja clonar? (deixe em branco para a branch padrão)',
        newRepoURL: 'Insira a nova URL do repositório GitHub para o seu projeto (deixe em branco para pular, c: para cancelar):',
        mainBranchName: 'Escolha o nome da branch principal (master ou main):',
        operationCanceled: 'Operação cancelada pelo usuário.',
        creatingProject: 'Criando um novo projeto em .',
        installingDependencies: 'Instalando dependências 💼...',
        settingRemote: 'Configurando novo remote origin para ',
        cleaningUpBranches: 'Limpando branches...',
        projectReady: 'Projeto está pronto para começar! 🚀🚀🚀',
        errorPackageJson: 'Erro: package.json não encontrado no template. Verifique a estrutura do template.',
        errorOccurred: 'Falha ao criar o projeto devido a um erro: ',
        unknownErrorOccurred: 'Ocorreu um erro desconhecido: ',
        invalidGitRepoURL: 'Por favor, insira uma URL válida do repositório GitHub.',
        packageName: 'Digite o nome do pacote (deixe em branco para o padrão):',
        description: 'Digite a descrição do projeto (deixe em branco para nenhum):',
        author: 'Digite o nome do autor (deixe em branco para nenhum):',
        license: 'Digite a licença do projeto (padrão: ISC):',
        keywords: 'Digite palavras-chave separadas por vírgulas (deixe em branco para nenhuma):',
    }
};
