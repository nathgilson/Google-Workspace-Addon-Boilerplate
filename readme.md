<p align="center">
<img height="400px" src="https://developers.google.com/workspace/add-ons/images/gsuite-addons-cats.png">
</p>

<p align="center"> This is your boilerplate project for developing Google Workspace add-ons inside Google Sheets, Docs, Forms and Slides projects. It's perfect for personal projects and for publishing complex add-ons in the G Workspace Marketplace.
</p>

---

## 📝 Table of Contents

- [About](#about)
- [Install](#install)
  - [Prerequisites](#prerequisites)
  - [Getting started](#getting-started)
- [Deploy](#deploy)
- [Usage](#usage)
  - [The included sample app](#the-included-sample-app)
  - [Typescript](#new-typescript)
  - [Adding packages](#adding-packages)
  - [Modifying scopes](#modifying-scopes)
  - [Autocomplete](#Autocomplete)

<br/>

## 🔎 About <a name = "about"></a>

[Google Apps Script](https://developers.google.com/apps-script/overview) is Google's Javascript-based development platform for building applications and add-ons for Google Sheets, Docs, Forms and other Google Apps.

This repo is a boilerplate project that uses the same development tools that you use for building traditional websites, all inside Google Apps Script projects.

See below how to get started!

todo

<br/>

## 🚜 Install <a name = "install"></a>

These instructions will get you set up with a copy of the project code on your local machine. It will also get you logged in to `clasp` so you can manage script projects from the command line.

See [deploy](#deploy) for notes on how to deploy the project and see it live in a Google Spreadsheet.

### Prerequisites <a name = "prerequisites"></a>

- Make sure you're running at least [Node.js](https://nodejs.org/en/download/) v10 and `npm` v6.

- You'll need to enable the Google Apps Script API. You can do that by visiting [script.google.com/home/usersettings](https://script.google.com/home/usersettings).

### 🏁 Getting started <a name = "getting-started"></a>

**1.** First, let's clone the repo and install the dependencies.

```bash
git clone https://github.com/nathgilson/Google-Workspace-Addon-Boilerplate
cd Google-Workspace-Addon-Boilerplate
npm install
```

<img width="100%" src="https://i.imgur.com/EGSsCqO.gif">

**2.** Next, we'll need to log in to [clasp](https://github.com/google/clasp), which lets us manage our Google Apps Script projects locally.

```bash
npm run login
```

<img width="100%" src="https://i.imgur.com/zKCgkMl.gif">

**3.** Now let's run the setup script to create a New spreadsheet and script project from the command line.

```bash
npm run setup
```

<img width="100%" src="https://imgur.com/Zk2eHFV.gif">

Alternatively, you can use an existing Google Spreadsheet and Script file instead of creating a new one.

<details>
  <summary>See instructions here for using an existing project.</summary>

You will need to update the `.clasp.json` file in the root of this project with the following three key/value pairs:

```json
{
  "scriptId": "1PY037hPcy................................................",
  "parentId": ["1Df30......................................."],
  "rootDir": "./dist"
}
```

- `scriptId`: Your existing script project's `scriptId`. You can find it by opening your spreadsheet, selecting **Tools > Script Editor** from the menubar, then **File > Project properties**, and it will be listed as "Script ID".

- `parentId`: An array with a single string, the ID of the parent file (spreadsheet, doc, etc.) that the script project is bound to. You can get this ID from the url, where the format is usually `https://docs.google.com/spreadsheets/d/{id}/edit`. This allows you to run `npm run open` and open your file directly from the command line.

- `rootDir`: This should always be `"./dist"`, i.e. the local build folder that is used to store project files.

</details>

Next, let's deploy the app so we can see it live in Google Spreadsheets.

<br/>

## 🚀 Deploy <a name = "deploy"></a>

Run the deploy command. You may be prompted to update your manifest file. Type 'yes'.

```bash
npm run deploy
```

The deploy command will build all necessary files using production settings, including all server code (Google Apps Script code) and config files. All bundled files will be outputted to the `dist/` folder, then pushed to the Google Apps Script project.

Now open Google Sheets and navigate to your new spreadsheet (e.g. the file "My Project"). You can also run `npm run open`. Make sure to refresh the page if you already had it open. You will now see a new menu item appear containing your app!

<img width="100%" src="https://i.imgur.com/W7UkEpv.gif">

<br/>

## ⛏️ Usage <a name = "Usage"></a>

### The included sample app

Todo

### Typescript

This project now supports typescript!

To use, simply use a typescript extension in the code (.ts), and your typescript file will compile to the proper format.

To use typescript in server code, just change the file extension to .ts. The server-side code already utilizes type definitions for Google Apps Script APIs.

A basic typescript configuration is used here, because after code is transpiled from typescript to javascript it is once again transpiled to code that is compatible with Google Apps Script. However, if you want more control over your setup you can modify the included [tsconfig.json file](./tsconfig.json).

### Adding packages

For instance, install `axios` from npm:

```bash
npm install axios
```

Important: Since Google Apps Scripts projects don't let you easily reference external files, this project will bundle an entire app into one HTML file. This can result in large files if you are importing large packages. To help split up the files, you can grab a CDN url for your package and declare it in the [webpack file, here](./webpack.config.js#L157). If set up properly, this will add a script tag that will load packages from a CDN, reducing your bundle size.

### Modifying scopes

The included app only requires access to Google Spreadsheets and to loading dialog windows. If you make changes to the app's requirements, for instance, if you modify this project to work with Google Forms or Docs, make sure to edit the oauthScopes in the [appscript.json file](./appsscript.json).

See https://developers.google.com/apps-script/manifest for information on the `appsscript.json` structure.

### Autocomplete

This project includes support for autocompletion and complete type definitions for Google Apps Script methods.

![autocomplete support](https://i.imgur.com/E7FLeTX.gif "autocomplete")

All available methods from the Google Apps Script API are shown with full definitions and links to the official documentation, plus information on argument, return type and sample code.

<br/>
