## ICP TypeScript Master Class
### Session #4 - Authentication And Permissioned Calling
### Author: Daniel McCoy

This is the class repository for session 4 of the ICP TypeScript Master Course. This repo includes all of the source code worked on throughout the course as well as documentation for each part. The system is setup in a multi-canister architecture that is more ideal for efficiently running lots of different example projects, it is not designed for single project scalability, only for educational purposes.

### Setup Instructions:

You will need NodeJS v20.18.0 and DFX v0.20.1 to operate this repository.

#### Step 1: Clone Repo:

```
git clone -b session_4 https://github.com/id-daniel-mccoy/azle-class.git session4
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

In this session we went over the different wallets and authentication providers for the Internet Computer, installed the `ic-auth` npm package, created a Plug Wallet login in our frontend, and practiced our first permissioned canister call.

<br />

**Step 1 - Authentication Providers**

There are 4 main authenticaton providers on the Internet Computer:

- Plug Wallet (https://plugwallet.ooo) - Plug Wallet is one of the oldest and most stable wallets for the Internet Computer. It is install via a browser extension and comes feature loaded for most of your needs.
- Stoic Wallet (https://stoicwallet.com) - Stoic, developed originally by the Toniq team, is also one of the oldest wallets on the Internet Computer. The wallet is served fully over the web. The creators were also one of the first to develop a widely used NFT/Token standard (EXT), so the wallet is very NFT centric.
- NFID (https://nfid.one) - NFID, develped by IdentityLabs, is a unique and multifaceted wallet that offers inclusive login options such as creating your wallet with a Google account. They are also the lead developers of some of the newest authentication standards, making them a safe bet for a nice wallet.
- Internet Identity (https://identity.ic0.app) - II was developed by the Dfinity Foundation themselves and is arguably the safest login method, however it is not exactly a wallet inherently. It uses a unique from of cryptographic authentication that allows you to login via biometrics and ledger devices, and also allows staking with Neurons.

<br />

**Step 2 - Installing Necessary Packages**

Before we can start integrating wallet logins into the frontend we created in session 3, we need to first install some packages and import them into our frontend. The frontend template we set up last time should have most of what we need, but we need to download by `ic-auth` npm package by running this command:

```
npm install ic-auth
```

After that succeeds, we need to import some things into our frontend. At the very top of the `MainPage.tsx` file, add these imports:

```ts
import { HttpAgent, Actor } from "@dfinity/agent";
import { PlugLogin, Types } from "ic-auth";
```

<br />

**Step 3 - Sync Your Backend To Your Frontend**

Before we can begin calling your canister or creating actors to interface from the frontend, we need to make sure our frontend understands what our backend actually is. Last session we ran a command that generated interfaces for us, we just need to copy them to our frontend. This needs to be done ANYTIME a change is made to our backend.

To do this, first create a folder called `interfaces` in the `frontend/frontend` directory. Next, navigate to the `hello/test/dfx_generated` directory and you should find a folder called `hello` with some js and ts files in it. Copy that entire folder into the interfaces folder you created in the frontend.

Again this MUST be done every time you update your backend canister functions.

Now you must import this interface into your frontend by adding this line to the top of `MainPage.tsx`:

```ts
import * as hello from "./interfaces/hello";
```

<br />

**Step 4 - Creating A Basic Agent And Actor**

An agent is a data object that can act either anonymously or can be attached to an identity that is supplied by a wallet login. To create a basic, anonymous actor to call a canister function that is not permissioned, we can use the `HttpAgent` and `Actor` types supplied by the `@dfinity/agent` package. To do this, add these lines into the main function of your `MainPage.tsx`:

```ts
  const basicAgent = new HttpAgent({ host: "https://ic0.app" });
  const basicActor = Actor.createActor(hello.idlFactory, { agent: basicAgent, canisterId: "6deh6-waaaa-aaaap-ansea-cai" });
```

Replace the existing canister ID with your canister ID for your backend. You can find it in your `canister_ids.json` file you created in session 3. These will create an anonymous actor that will allow us to call a canister.

<br />

**Step 5 - Making Basic Canister Calls**

Now that we have an actor that is capable of making calls to our backend, lets create our frontend functions:

```ts
  const getMessage = async() => {
    console.log("Calling canister...");
    const message = await basicActor.getMessage();
    console.log("My Message: " + message);
  }

  const setMessage = async() => {
    console.log("Setting message");
    const message = document.getElementById("message") as HTMLInputElement;
    await basicActor.setMessage(message.value);
    message.value = "";
    console.log("Message set!");
  }
```

To use these, you will have to create a text input in your HTML as well as a couple buttons. On behalf of this template, I suggest this format:

```html
    <div className="content">
        <h3>Unauthorized Calling</h3>
        <button onClick={getMessage}>Get Message</button>
        <input type="text" id="message" placeholder="Enter message here"></input>
        <button onClick={setMessage}>Set Message</button>
    </div>
```

After saving, if you start your frontend you should see a couple of buttons and a text box, here you can test your first frontend canister calls.

<br />

**Step 6 - Adding A Wallet Login And Making A Permissioned Call**

Now that we have tested basic canister calling, lets dig deeper. We need to create a wallet login, store the user login into state, and make some extra functions.

First lets add the state entries. You will need one called a whitelist that is just an array of the canister addresses your wallet will be calling. The second is a standard React useState entry that will store the user profile that `ic-auth` gives you after login. Add these to the top of your main function in `MainPage.tsx`:

```ts
  const whitelist = ["6deh6-waaaa-aaaap-ansea-cai"];
  const [user, setUser] = useState<Types.UserObject | null>(null);
```

Replace the canister ID with yours.

Next, we need to add our wallet login code from `ic-auth` and a separate actor creation function that we can use for wallet calls later on. We will also add a basic call to the `getMessage` function from our backend. Add these to your main function:

```ts
  const plugLogin = async() => {
    console.log("Logging in...");
    const userObject = await PlugLogin(whitelist);
    setUser(userObject);
    console.log("Logged in!");
  }

  const getHelloActor = async() => {
    const actor = Actor.createActor(hello.idlFactory, { agent: user?.agent, canisterId: "6deh6-waaaa-aaaap-ansea-cai" });
    return actor;
  }

  const getMesssageWithAuth = async() => {
    console.log("Calling canister with auth...");
    const actor = await getHelloActor();
    const message = await actor.getMessage();
    console.log("My Message: " + message);
  }
```

These fucntions will handle the login with Plug Wallet, create the authenticated agent, and then you can use the actor creation function to create authenticated actors anytime you need to call a canister on behalf of a user. We also created the basic canister call. Now we just need to attach them to buttons. For the sake of this template, I suggest adding another content box into the HTML with the following:

```html
    <div className="content">
        <h3>IC Auth Example</h3>
        <button onClick={plugLogin}>Plug Login</button>
        Logged In As: {user ? user.principal : "Not Logged In"}
        <button onClick={getMesssageWithAuth}>Get Message</button>
    </div>
```

Now you should be able to use these buttons on the frontend to login and make a call to your backend.

<br />

**Step 7 - Adding Permissions To Your Backend Functions**

In order to truly test the permissioned calling, we need to make our backend test for it. We will do this by using the `ic` API offered by the `azle/experimental` package. To do this, first we need to enable our canister to be in experimental mode. Change your `hello/dfx.json` file to look like this:

```json
{
    "canisters": {
        "hello": {
            "type": "azle",
            "main": "src/index.ts",
            "declarations": {
                "output": "test/dfx_generated/hello",
                "node_compatibility": true
            },
            "custom": {
                "experimental": true
            }
        }
    }
}
```

Next, we need to import `ic` by adding this line in your `hello/src/index.ts` file:

```ts
import { ic } from 'azle/experimental';
```

Now we need to give Azle something to read against, and change one of our functions to check for it. To do this, we specify ourselves as the owner of the canister and then use the `ic.caller()` functionality to check against it during a call. To do this, make your `hello/src/index.ts` file look like this, except change the owner string to your wallet address:

```ts
import { IDL, query, update } from 'azle';
import { ic } from 'azle/experimental';

export default class {
    message: string = 'Hello world!';
    owner: string = "7zdi6-6h2gk-g4j54-cigti-iiu4u-lj4vy-bewjf-oouoc-dnlck-fyfy5-aae";

    @query([], IDL.Text)
    getMessage(): string {
        if (ic.caller().toText() === this.owner) {
            return this.message;
        } else {
            return "You are not the owner!";
        }
    }

    @update([IDL.Text])
    setMessage(message: string): void {
        this.message = message;
    }
}
```

This will make it so that you can change the message from any wallet or anonymous agent, but you can only receive it if you are logged in as the owner.

<br />

**Step 8 - Testing Your Permissions**

Before you can test everything, we have to rebuild, regenerate the interfaces, and redeploy the new canister. To do this, run these commands in the root of your `hello` folder:

```
dfx build --network ic
dfx generate --network ic
dfx deploy --network ic
```

Next, you must sync the new backend interfaces with your frontend. Navigate to `hello/test/dfx_generated` and copy the `hello` folder inside of that, then navigate to your `frontend/frontend/interfaces` folder, delete the current `hello` folder in there and paste the one you just copied. Now your frontend is ready to use!

Enjoy testing your new permissioned calling and feel free to play around with it further!

**Congratulations, you've finished session 4!**