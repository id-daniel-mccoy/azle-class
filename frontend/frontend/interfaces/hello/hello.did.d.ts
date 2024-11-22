import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface _SERVICE {
  'countUsers' : ActorMethod<[], { 'Ok' : bigint } | { 'Err' : string }>,
  'createNewUser' : ActorMethod<
    [string],
    { 'Ok' : string } |
      { 'Err' : string }
  >,
  'getAllUsers' : ActorMethod<
    [],
    {
        'Ok' : Array<{ 'id' : string, 'nickname' : string, 'message' : string }>
      } |
      { 'Err' : string }
  >,
  'isUsersEmpty' : ActorMethod<[], { 'Ok' : boolean } | { 'Err' : string }>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
