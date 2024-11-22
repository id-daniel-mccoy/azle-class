import {
    blob,
    Canister,
    ic,
    Err,
    nat64,
    Ok,
    Opt,
    Principal,
    Record,
    Result,
    StableBTreeMap,
    text,
    Variant,
    Vec,
    update,
    query,
    bool
} from 'azle/experimental';

const message: string = 'Hello world!';
const owner: string = "7zdi6-6h2gk-g4j54-cigti-iiu4u-lj4vy-bewjf-oouoc-dnlck-fyfy5-aae";

const UserMap = Record({
    id: text,
    nickname: text,
    message: text,
});
type UserMap = typeof UserMap.tsType;

// The actual data map.
const users = StableBTreeMap<text, UserMap>(0);

export default Canister({
    getAllUsers: query([], Variant({ Ok: Vec(UserMap), Err: text }), () => {
        try {
            const result = users.values();
            return Ok(result);
        } catch (error) {
            return Err(error);
        }
    }),
    isUsersEmpty: query([], Variant({ Ok: bool, Err: text }), () => {
        try {
            const result = users.isEmpty();
            return Ok(result);
        } catch (error) {
            return Err(error);
        }
    }),
    countUsers: query([], Variant({ Ok: nat64, Err: text }), () => {
        try {
            const result = users.len();
            return Ok(result);
        } catch (error) {
            return Err(error);
        }
    }),
    createNewUser: update([text], Variant({ Ok: text, Err: text }), (nickname) => {
        try {
            const id = ic.caller().toText();
            const message = "";
            const newUser = { id, nickname, message };
            users.insert(id, newUser);
            return Ok("User created successfully");
        } catch (error) {
            return Err("Error creating new user: " + error);
        }
    }),
});
