## ICP TypeScript Master Class
### Session #3 - Creating Your Fullstack Environment
### Author: Daniel McCoy

This is the class repository for session 3 of the ICP TypeScript Master Course. This repo includes all of the source code worked on throughout the course as well as documentation for each part. The system is setup in a multi-canister architecture that is more ideal for efficiently running lots of different example projects, it is not designed for single project scalability, only for educational purposes.

### Setup Instructions:

You will need NodeJS v20.18.0 and DFX v0.20.1 to operate this repository.

#### Step 1: Clone Repo:

```
git clone -b session3 https://github.com/id-daniel-mccoy/azle-class.git session3
```

#### Step 2: Easy Setup:

The base command is only designed for a fresh clone and will try to setup all example canisters in one flow.

As long as you have dfx and node setup properly, you should be able to go into your newly cloned repository and enter this command to get setup:

```
npm run setup
```

#### Manual Setup:

If nothing works or the easy setup is just not getting it done, you can try these steps for any individual canister you need to setup:

```
cd <canisterName>
npm install
dfx start --clean --background
dfx deploy
dfx stop
```
<br />

### Review Of Course Session:

In this session we learned how to create our first canister smart contract live on the network and deploy our backend to it, then we created a basic frontend that we will use in session 4 to interact with it.

<br />

**Step 1 - Create Your Canister**

After you have DFX and NodeJS setup and you have created a Plug Wallet with some ICP token in it, we can create a blank canister using this command:

```
dfx ledger --network ic create-canister <YourWalletPrincipalAddress> --amount 0.2
```

This command will generate you a blank canister and burn 0.2 ICP into Cycles to gas up your canister. Upon completion it will give you your canister address, **Make sure you save it!** It should look a little bit like a short hash of numbers and letters. This will be your canister identifier moving forward.

<br />

**Step 2 - Create A Canister ID File For Your Backend**

Now that you've created a blank canister, we need to attach it to your backend canister so when we go to deploy DFX knows where to put it. First, navigate to your `hello` folder and create a file called `canister_ids.json`.

Edit the new file to look like this, but replace the canister ID with yours.

```
{
  "hello": {
    "ic": "6deh6-waaaa-aaaap-ansea-cai"
  }
}
```

Save that file. DFX should now be able to deploy your backend to this address.

<br />

**Step 3 - Deploying To Mainnet**

Now that you have a canister created and DFX can find it, you're ready to deploy your backend to the mainnet. Make sure you are in the root folder of your `hello` canister and then type these commands:

```
dfx build --network ic
dfx generate --network ic
dfx deploy --network ic
```

This should build and deploy your backend to the mainnnet. Now you can test it!

<br />

**Step 4 - Testing Your Canister**

In this version of our backend, we have two functions called `getMessage` and `setMessage`. From your command line in the root of your `hello` canister, type these commands to test them:

```
dfx canister --network ic call hello getMessage
dfx canister --network ic call hello setMessage "My New Message"
dfx canister --network ic call hello getMessage
```

From running these commands you should be able to see the basic get and set functionality of your new backend.

<br />

**Step 5 - Adding A Basic Frontend**

After you're all set with your backend, you can easily add a frontend to your overall project by cloning a repository made by Daniel McCoy on GitHub. From the root folder of your whole project, just type these commands:

```
git clone https://github.com/id-daniel-mccoy/ic-react.git frontend
cd frontend
npm run setup
```

Now to test run it locally for testing, just run:

```
npm run dev
```

In your browser, navigate to https://localhost:3000/ and you should be able to see a simple website.

**Congratulations, you've finished session 3!**