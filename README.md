# ts-cli-template-maker

The `ts-cli-template-maker` is a command-line interface tool designed to streamline the creation of TypeScript projects using a pre-defined template. This tool leverages a specific TypeScript ORM template to kickstart your project, handling cloning, branch selection, renaming, and dependency installations with minimal user input.

[![Switch to Portuguese](https://img.shields.io/badge/lang-Portuguese-green.svg)](#portuguese)

## Features

- **Easy Setup**: Set up a new TypeScript project in seconds with a single command.
- **Customizable Template Selection**: Use any TypeScript template repository URL to create your project.
- **Branch Selection**: Optionally choose a specific branch to clone from the template repository.
- **Automatic Dependency Installation**: Automatically installs all npm dependencies after creating the project.
- **Interactive CLI**: Simple and interactive prompts to collect user input.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/en/) (version 12.x or higher recommended)
- [npm](https://www.npmjs.com/) (typically comes with Node.js)

## Installation

`ts-cli-template-maker` does not require a global installation. You can run it directly using `npx` to avoid cluttering your system with global packages:

```bash
npx ts-cli-template-maker
```

## Usage

To use `ts-cli-template-maker`, simply run the following command in your terminal:

```bash
npx ts-cli-template-maker
```

You will be prompted to provide the following information:
1. **Language Selection**: Choose between English and Portuguese.
2. **Project Name**: Enter the name for your project.
3. **Template Repository URL**: Provide the URL of the TypeScript template repository you want to use.
4. **Branch Name**: Optionally, specify a branch to clone (leave blank to use the default branch).
5. **New Repository URL**: Optionally, provide a new GitHub repository URL for your project.
6. **Package Name**: Define the package name for your project (default is derived from the template repository name).
7. **Description**: Provide a short description for your project.
8. **Author**: Specify the author's name.
9. **License**: Choose the license for your project (default is ISC).
10. **Keywords**: Enter keywords for your project, separated by commas.

After answering the prompts, the CLI will:
- Clone the template repository into a new directory with your project name.
- Optionally clone a specific branch if specified.
- Update the `package.json` with the information you provided.
- Install all npm dependencies.
- Set up the GitHub repository if a new URL was provided.

## Switching Languages

To switch to the Portuguese version of this README, click the button below:

[![Switch to Portuguese](https://img.shields.io/badge/lang-Portuguese-green.svg)](#portuguese)

---

## <a name="portuguese"></a>ts-cli-template-maker

O `ts-cli-template-maker` é uma ferramenta de interface de linha de comando projetada para agilizar a criação de projetos TypeScript usando um template pré-definido. Esta ferramenta utiliza um template específico de ORM em TypeScript para iniciar seu projeto, lidando com clonagem, seleção de branch, renomeação e instalações de dependências com mínima interação do usuário.

[![Switch to English](https://img.shields.io/badge/lang-English-blue.svg)](#english)

## Funcionalidades

- **Configuração Fácil**: Configure um novo projeto TypeScript em segundos com um único comando.
- **Seleção de Template Personalizável**: Use qualquer URL de repositório de template TypeScript para criar seu projeto.
- **Seleção de Branch**: Opcionalmente, escolha uma branch específica para clonar do repositório de template.
- **Instalação Automática de Dependências**: Instala automaticamente todas as dependências do npm após criar o projeto.
- **CLI Interativo**: Prompts simples e interativos para coletar as informações do usuário.

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado:
- [Node.js](https://nodejs.org/en/) (recomendado versão 12.x ou superior)
- [npm](https://www.npmjs.com/) (normalmente já vem com o Node.js)

## Instalação

O `ts-cli-template-maker` não requer uma instalação global. Você pode executá-lo diretamente usando `npx` para evitar poluir seu sistema com pacotes globais:

```bash
npx ts-cli-template-maker
```

## Uso

Para usar o `ts-cli-template-maker`, simplesmente execute o seguinte comando no seu terminal:

```bash
npx ts-cli-template-maker
```

Você será solicitado a fornecer as seguintes informações:
1. **Seleção de Idioma**: Escolha entre Inglês e Português.
2. **Nome do Projeto**: Insira o nome do seu projeto.
3. **URL do Repositório de Template**: Forneça a URL do repositório de template TypeScript que você deseja usar.
4. **Nome da Branch**: Opcionalmente, especifique uma branch para clonar (deixe em branco para usar a branch padrão).
5. **Nova URL do Repositório**: Opcionalmente, forneça uma nova URL do repositório GitHub para o seu projeto.
6. **Nome do Pacote**: Defina o nome do pacote para o seu projeto (padrão é derivado do nome do repositório de template).
7. **Descrição**: Forneça uma breve descrição para o seu projeto.
8. **Autor**: Especifique o nome do autor.
9. **Licença**: Escolha a licença para o seu projeto (padrão é ISC).
10. **Palavras-chave**: Insira palavras-chave para o seu projeto, separadas por vírgulas.

Após responder aos prompts, a CLI irá:
- Clonar o repositório de template em um novo diretório com o nome do seu projeto.
- Opcionalmente, clonar uma branch específica, se especificada.
- Atualizar o `package.json` com as informações fornecidas.
- Instalar todas as dependências do npm.
- Configurar o repositório GitHub, se uma nova URL for fornecida.

## Trocando de Idioma

Para mudar para a versão em inglês deste README, clique no botão abaixo:

[![Switch to English](https://img.shields.io/badge/lang-English-blue.svg)](#english)
