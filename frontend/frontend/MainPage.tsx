import React, { useEffect, useState } from "react";
import { HttpAgent, Actor } from "@dfinity/agent";
import { PlugLogin, Types } from "ic-auth";
import * as hello from "./interfaces/hello";

export function MainPage() {

  const whitelist = ["6deh6-waaaa-aaaap-ansea-cai"];
  const [user, setUser] = useState<Types.UserObject | null>(null);

  // No authentication calling.

  const basicAgent = new HttpAgent({ host: "https://ic0.app" });
  const basicActor = Actor.createActor(hello.idlFactory, { agent: basicAgent, canisterId: "6deh6-waaaa-aaaap-ansea-cai" });

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

  // Plug Wallet and Permissioned Calling

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

  return (
    <div className="app">
      <div className="header">
        <h1>Welcome!</h1>
      </div>
      <div className="content">
        <h3>Unauthorized Calling</h3>
        <button onClick={getMessage}>Get Message</button>
        <input type="text" id="message" placeholder="Enter message here"></input>
        <button onClick={setMessage}>Set Message</button>
      </div>
      <div className="content">
        <h3>IC Auth Example</h3>
        <button onClick={plugLogin}>Plug Login</button>
        Logged In As: {user ? user.principal : "Not Logged In"}
        <button onClick={getMesssageWithAuth}>Get Message</button>
      </div>
    </div>
  )
}