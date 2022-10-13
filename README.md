# Large project mobile
The start of the large project mobile

## Demo link:
No demo yet

## Table of Content:
- [About The App](#about-the-app)
- [Wireframe](#wireframe)
- [Technologies](#technologies)
- [Setup](#setup)
- [Troubleshooting](#troubleshooting)
- [Status](#status)
- [Credits](#credits)
- [License](#license)

## About The App
Mobile implementation of the large project for COP 4331 

## Wireframe
In progress

## Technologies
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Realm](https://img.shields.io/badge/Realm-39477F?style=for-the-badge&logo=realm&logoColor=white)

## Setup💻

1. Inside the project folder, install node_modules

```
npm install 
```
2. Start metro, the JavaScript bundler that ships with React Native. Metro "takes in an entry file and various options, and returns a single JavaScript file that includes all your code and its dependencies."— Metro Docs

```
npm run start
```
> Let Metro Bundler run in its own terminal

3. Open a new terminal inside the project folder and run android

```
npm run android
```

> Alternative, you can also run on iOS, just replace android with ios in step 3.
> Currently, the project is being developed only on Android.

## Troubleshooting
### Enviroment Issues
#### Android Rebuild
- Uninstall application from emulator/device
- Close out emulator windows 
- Delete everything in android\app\build
- ` rmdir node_modules `
- ` npm cache clean --force `
- ` npm install `
- ` npm run start `
- ` npm run android `


## Status
in progress. 

## Credits
### Contriubutors:
- 
- 

## License

MIT license 
