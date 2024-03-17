# ts-cli-template-maker

The `ts-cli-template-maker` is a command-line interface tool designed to streamline the creation of TypeScript projects using a pre-defined template. This tool leverages a specific TypeScript ORM template to kickstart your project, handling cloning, renaming, and dependency installations with minimal user input.

## Features

- **Easy Setup**: Set up a new TypeScript project in seconds with a single command.
- **Customizable Template Selection**: Use any TypeScript template repository URL to create your project.
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
