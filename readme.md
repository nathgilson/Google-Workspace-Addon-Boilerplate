<p align="center">
<img height="100px" src="https://www.gstatic.com/images/icons/material/system/1x/pets_black_48dp.png">
</p>

<p align="center"> Your boilerplate project for <br>developing Google Workspace add-ons</p>

<p align="center">
***
</p>

[Google Workspace add-ons](https://developers.google.com/workspace/add-ons/how-tos/building-gsuite-addons) are the extensions that can be found in the side panel of most Google apps (Gmail, Google Drive, Sheets, Docs, Slides, etc), unlike the more complexe [Editor add-ons](https://developers.google.com/workspace/add-ons/how-tos/building-editor-addons) that can be found in the "Add-ons" tab of Google Sheets, Docs and Slides.

<p align="center">
<img height="300px" src="https://developers.google.com/workspace/add-ons/images/gsuite-addons-cats.png">
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
  - [Autocomplete](#autocomplete)
  - [Card Builder](#card-builder)

<br/>

## 🔎 About <a name = "about"></a>

[Google Apps Script](https://developers.google.com/apps-script/overview) is Google's Javascript-based development platform for building applications and add-ons for Google Sheets, Docs, Forms and other Google Apps.

This repo is a boilerplate project that uses the same development tools that you use for building traditional websites (Node, TypeScript, ES6, etc), all inside Google Apps Script projects.

See below how to get started!

<br/>

## 🚜 Install <a name = "install"></a>

These instructions will get you set up with a copy of the project code on your local machine. It will also get you logged in to `clasp` so you can manage script projects from the command line.

See [deploy](#deploy) for notes on how to deploy the project and see it live in Gmail, Calendar, and Drive.

### Prerequisites <a name = "prerequisites"></a>

- Make sure you're running at least [Node.js](https://nodejs.org/en/download/) v10 and `npm` v6.

- You'll need to enable the Google Apps Script API. You can do that by visiting [script.google.com/home/usersettings](https://script.google.com/home/usersettings).

### 🏁 Getting started <a name = "getting-started"></a>

**1.** First, let's clone the repo and install the dependencies.

```bash
git clone https://github.com/nathgilson/Google-Workspace-Addon-Boilerplate
cd Google-Workspace-Addon-Boilerplate
cd addOn
npm install
```

<p align="center">
<img width="500px" src="https://i.imgur.com/EGSsCqO.gif">
</p>

**2.** Next, we'll need to log in to [clasp](https://github.com/google/clasp), which lets us manage our Google Apps Script projects locally.

```bash
npm run login
```

<p align="center">
<img width="500px" src="https://i.imgur.com/zKCgkMl.gif">
</p>

**3.** Now let's run the setup script to create a New spreadsheet and script project from the command line.

```bash
npm run setup
```

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

- `parentId` (optional): An array with a single string, the ID of the parent file (spreadsheet, doc, etc.) that the script project is bound to. You can get this ID from the url, where the format is usually `https://docs.google.com/spreadsheets/d/{id}/edit`. This allows you to run `npm run open` and open your file directly from the command line.

- `rootDir`: This should always be `"./dist"`, i.e. the local build folder that is used to store project files.

</details>

Next, let's deploy the app so we can see it live in Google Workspace.

<br/>

## 🚀 Deploy <a name = "deploy"></a>

Run the deploy command. You may be prompted to update your manifest file. Type 'yes'.

```bash
npm run deploy
```

The deploy command will build all necessary files using production settings, including all server code (Google Apps Script code) and config files. All bundled files will be outputted to the `dist/` folder, then pushed to the Google Apps Script project.

Now open Google Sheets and navigate to your new spreadsheet (e.g. the file "My Project"). You can also run `npm run open`. Make sure to refresh the page if you already had it open. You will now see a new menu item appear containing your app!

<p align="center">
<img width="500px" src="https://i.imgur.com/W7UkEpv.gif">
</p>

<br/>

## ⛏️ Usage <a name = "Usage"></a>

### The included sample app

The sample app is inspired from Google's quickstart: [Cats Google Workspace Add-on](https://developers.google.com/workspace/add-ons/cats-quickstart)

### Typescript

This project supports typescript.

To use, simply use a typescript extension in the code (.ts), and your typescript file will compile to the proper format.

To use typescript in server code, just change the file extension to .ts. The server-side code already utilizes type definitions for Google Apps Script APIs.

A basic typescript configuration is used here, because after code is transpiled from typescript to javascript it is once again transpiled to code that is compatible with Google Apps Script. However, if you want more control over your setup you can modify the included [tsconfig.json file](./tsconfig.json).

### Adding packages

For instance, install `axios` from npm:

```bash
npm install axios
```

Important: Since Google Apps Scripts projects don't let you easily reference external files, this project will bundle an entire app into one .gs file. This can result in large files if you are importing large packages. To help split up the files, you can grab a CDN url for your package and declare it in the [webpack file, here](./webpack.config.js#L157). If set up properly, this will add a script tag that will load packages from a CDN, reducing your bundle size.

### Modifying scopes

If you modify this project to work with Google Forms or Calendar, make sure to edit the oauthScopes in the [appscript.json file](./appsscript.json).

See https://developers.google.com/apps-script/manifest for information on the `appsscript.json` structure.

### Autocomplete

This project includes support for autocompletion and complete type definitions for Google Apps Script methods.

<p align="center">
<img width="500px" src="https://i.imgur.com/E7FLeTX.gif">
</p>

All available methods from the Google Apps Script API are shown with full definitions and links to the official documentation, plus information on argument, return type and sample code.

### Card builder

The online [Card builder](https://gw-card-builder.web.app/) can help you prototype your app's interface.

<br/>
