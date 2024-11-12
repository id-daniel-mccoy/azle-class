## Quick React Template For The Internet Computer
### Version 1.2.2

This is a TypeScript based React web template for building web apps and deploying them to the Internet Computer blockchain network.

Currently uses DFX 0.13.1 and Dfinity versions 0.19.3.

### Setup:

Easy Setup:

```
npm run setup
```

Note: If you have a password set on your DFX identity you will need to enter it once during the initial setup.

If for any reason the easy setup does not work please follow the steps below to manually setup the project.

```
npm install
dfx start --clean --background
dfx deploy
dfx stop
```

### Developer Mode:

```
npm run dev
```

### Deploy To Mainnet:

```
dfx deploy --network ic
```

Disclaimer:

This template framework is constantly being updated and modified. This means that anyone using this tooling should expect there to be changes to the UI, node/react versions, and dfinity tooling versions as this repo matures.