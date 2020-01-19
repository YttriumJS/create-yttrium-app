#!/usr/bin/env node

const os = require('os')
const { spawn } = require('child_process')
const fs = require('fs-extra')
const path = require('path')
const minimist = require('minimist')
const chalk = require('chalk')
const validateProjectName = require('validate-npm-package-name')
const art = require('./art')

async function main () {
  const args = minimist(process.argv.slice(2))

  if (args.help) {
    console.log('Usage: create-yttrium-app <project-directory>')
    process.exit(1)
  }

  const projectName = args._[0]
  if (!projectName) {
    console.error('Please specify the project directory:')
    console.log(
      `\t${chalk.cyan('create-yttrium-app')} ${chalk.green('<project-directory>')}`
    )
    console.log()
    console.log('For example:')
    console.log(`\t${chalk.cyan('create-yttrium-app')} ${chalk.green('yeet')}`)
    console.log()
    process.exit(1)
  }

  const root = path.resolve(projectName)
  const appName = path.basename(root)

  checkAppName(appName)
  fs.ensureDirSync(projectName)
  console.log(art())
  console.log()
  console.log(`Creating a new Yttrium app in ${root}.`)
  console.log()

  const packageJson = {
    name: appName,
    version: '0.1.0',
    private: true,
    scripts: {
      start: 'node index.js'
    },
    dependencies: {
      'yttrium-server': '^1.0.3'
    }
  }
  fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify(packageJson, null, 2) + os.EOL
  )

  const cyaDir = __dirname
  fs.copySync(path.join(cyaDir, 'template'), root)

  console.log('Installing packages...')
  console.log()
  process.chdir(root)
  await install()

  console.log(chalk.green('Done!'))
}

function install () {
  return new Promise((resolve, reject) => {
    const command = 'npm'
    const args = ['install', '--loglevel', 'error']

    const child = spawn(command, args, { stdio: 'inherit' })
    child.on('close', code => {
      if (code !== 0) {
        const e = new Error()
        e.command = `${command} ${args.join(' ')}`
        reject(e)
        return
      }
      resolve()
    })
  })
}

function checkAppName (appName) {
  const validationResult = validateProjectName(appName)
  if (!validationResult.validForNewPackages) {
    console.error(
      chalk.red(
        `Cannot create a project named ${chalk.green(
          `"${appName}"`
        )} because of npm naming restrictions:\n`
      )
    );
    [
      ...(validationResult.errors || []),
      ...(validationResult.warnings || [])
    ].forEach(error => {
      console.error(chalk.red(`  * ${error}`))
    })
    console.error(chalk.red('\nPlease choose a different project name.'))
    process.exit(1)
  }

  if (appName === 'yttrium-server') {
    console.error(
      chalk.red(
        `Cannot create a project named ${chalk.green(
          `"${appName}"`
        )} because a dependency with the same name exists.\n` +
          'Due to the way npm works, the following names are not allowed:\n\n'
      ) +
        chalk.cyan('\tyttrium-server') +
        chalk.red('\n\nPlease choose a different project name.')
    )
    process.exit(1)
  }
}

main()
