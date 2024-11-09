## ICP TypeScript Master Class
### Author: Daniel McCoy

This is the class repository for the ICP TypeScript Master Course. This repo includes all of the source code worked on throughout the course as well as documentation for each part. The system is setup in a multi-canister architecture that is more ideal for efficiently running lots of different example projects, it is not designed for single project scalability, only for educational purposes.

### Setup Instructions:

You will need NodeJS v20.18.0 and DFX v0.20.1 to operate this repository.

#### Step 1: Clone Repo:

```
git clone https://github.com/id-daniel-mccoy/azle-class.git
```

#### Step 2: Easy Setup:

The base command is only designed for a fresh clone and will try to setup all example canisters in one flow.

As long as you have dfx and node setup properly, you should be able to go into your newly created azle-class repository and enter this command to get setup:

```
npm run setup
```

#### Setup A Specific Canister:

You can just add the name of the canister at the end of the setup command using a hypen and it should run the setup only for that specific canister like this:

```
npm run setup-hello
```

This will setup the `hello` canister. This will work for any new canister added as long as you add an entry for it in the `package.json` file.

#### Last Resort:

If nothing works or the easy setup is just not getting it done, you can try these steps for any individual canister you need to setup:

```
cd <canisterName>
npm install
dfx start --clean --background
dfx deploy
dfx stop
```

This repository will grow with size as the TypeScript course progresses. Please make sure to run `git pull` at the beginning of every session or to keep a copy of what we have in a separate folder/directory that you can keep updated.