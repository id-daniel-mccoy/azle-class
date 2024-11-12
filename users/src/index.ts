import {
    blob,
    Canister,
    ic,
    Err,
    nat64,
    Ok,
    Opt,
    Principal,
    query,
    Record,
    Result,
    StableBTreeMap,
    text,
    update,
    Variant,
    Vec,
    bool
} from 'azle/experimental';

const owner: string = "7zdi6-6h2gk-g4j54-cigti-iiu4u-lj4vy-bewjf-oouoc-dnlck-fyfy5-aae";

const UserAccount = Record({
    id: text,
    username: text,
    description: text
});
type UserAccount = typeof UserAccount.tsType;

const UserMap = StableBTreeMap<string, UserAccount>(0);

export default Canister({
    isUsersEmpty: query([], bool, () => {
        return UserMap.isEmpty();
    }), 
    usersLength: query([], nat64, () => {
        return UserMap.len();
    }),
    getAllUsers: query([], Vec(UserAccount), () => {
        return UserMap.values();
    }),
    getSingleUser: query([text], Variant({Ok: UserAccount, Err: text}), (id: string) => {
        const user = UserMap.get(id);
        if (user === null) {
            return Err("User not found");
        }
        return Ok(user);
    }),
    createNewUser: update([text, text], Variant({Ok: UserAccount, Err: text}), (username: string, description: string) => {
        const id = ic.caller().toText();
        const account: UserAccount = {id, username, description};
        try {
            UserMap.insert(id, account);
            return Ok(account);
        } catch (error) {
            return Err(error);
        }
    }),
    deleteUser: update([text], Variant({Ok: text, Err: text}), (id: string) => {
        const user = UserMap.get(id);
        if (ic.caller().toText() !== owner) {
            return Err("Only the canister owner can delete users.");
        }
        if (user === null) {
            return Err("User not found");
        }
        UserMap.remove(id);
        return Ok("User deleted.");
    }),
    deleteAllUsers: update([], text, () => {
        if (ic.caller().toText() !== owner) {
            return "Only the canister owner can delete users.";
        }
        const length = UserMap.len();
        for (let i = 0; i < length; i++) {
            UserMap.remove(UserMap.keys()[0]);
        }
        return "All users deleted.";
    })
})
