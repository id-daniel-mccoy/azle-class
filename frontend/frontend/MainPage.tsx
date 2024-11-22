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

  // These were the original functions from the hello canister.

  // const getMessage = async() => {
  //   console.log("Calling canister...");
  //   const message = await basicActor.getMessage();
  //   console.log("My Message: " + message);
  // }

  // const setMessage = async() => {
  //   console.log("Setting message");
  //   const message = document.getElementById("message") as HTMLInputElement;
  //   await basicActor.setMessage(message.value);
  //   message.value = "";
  //   console.log("Message set!");
  // }

  // Plug Wallet and Permissioned Calling

  const plugLogin = async() => {
    console.log("Logging in...");
    const userObject = await PlugLogin(whitelist);
    setUser(userObject);
    console.log("Logged in!");
  }

  const getHelloActor = async() => {
    const actor = Actor.createActor(hello.idlFactory, { agent: user?.agent, canisterId: "6deh6-waaaa-aaaap-ansea-cai" });
    console.log(actor);
    return actor;
  }

  // Original function from the hello canister.

  // const getMesssageWithAuth = async() => {
  //   console.log("Calling canister with auth...");
  //   const actor = await getHelloActor();
  //   const message = await actor.getMessage();
  //   console.log("My Message: " + message);
  // }

  type returnNumber = {
    Ok: number;
    Err: string;
  }

  type returnBool = {
    Ok: boolean;
    Err: string;
  }

  type returnString = {
    Ok: string;
    Err: string;
  }

  type UserMap = {
    id: string;
    nickname: string;
    message: string;
  };

  type returnUsers = {
    Ok: UserMap[];
    Err: string;
  }

  const countUsers = async() => {
    console.log("Calling canister...");
    const actor = await getHelloActor();
    const count = await actor.countUsers() as returnNumber;
    console.log(Number(count.Ok));
  }

  const isUsersEmpty = async() => {
    console.log("Calling canister...");
    const actor = await getHelloActor();
    const isEmpty = await actor.isUsersEmpty() as returnBool;
    console.log(isEmpty.Ok? "Empty" : "Not Empty");
  }

  const getAllUsers = async() => {
    console.log("Calling canister...");
    const actor = await getHelloActor();
    const users = await actor.getAllUsers() as returnUsers;
    if (users.Ok) {
      console.log(users.Ok[0]);
    } else {
      console.log(users.Err);
    }
  }

  const createNewUser = async() => {
    console.log("Creating user...");
    const nickname = document.getElementById("newuser") as HTMLInputElement;
    const actor = await getHelloActor();
    const response = await actor.createNewUser(nickname.value) as returnString;
    if (response.Ok) {
      console.log(response.Ok);
    } else {
      console.log(response.Err);
    }
  }

  return (
    <div className="app">
      <div className="header">
        <h1>Welcome!</h1>
      </div>
      <div className="content">
        <h3>Unauthorized Calling</h3>
        {/* <button onClick={getMessage}>Get Message</button>
        <input type="text" id="message" placeholder="Enter message here"></input>
        <button onClick={setMessage}>Set Message</button> */}
      </div>
      <div className="content">
        <h3>IC Auth Example</h3>
        <button onClick={plugLogin}>Plug Login</button>
        Logged In As: {user ? user.principal : "Not Logged In"}
        <button onClick={getHelloActor}>Get Actor</button>
        <button onClick={countUsers}>Count Users</button>
        <button onClick={isUsersEmpty}>Is Users Empty</button>
        <button onClick={getAllUsers}>Get All Users</button>
        <input type='text' id='newuser' placeholder='Enter Nickname'></input>
        <button onClick={createNewUser}>Create New User</button>
      </div>
    </div>
  )
}