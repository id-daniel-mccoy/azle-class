export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'countUsers' : IDL.Func(
        [],
        [IDL.Variant({ 'Ok' : IDL.Nat64, 'Err' : IDL.Text })],
        ['query'],
      ),
    'createNewUser' : IDL.Func(
        [IDL.Text],
        [IDL.Variant({ 'Ok' : IDL.Text, 'Err' : IDL.Text })],
        [],
      ),
    'getAllUsers' : IDL.Func(
        [],
        [
          IDL.Variant({
            'Ok' : IDL.Vec(
              IDL.Record({
                'id' : IDL.Text,
                'nickname' : IDL.Text,
                'message' : IDL.Text,
              })
            ),
            'Err' : IDL.Text,
          }),
        ],
        ['query'],
      ),
    'isUsersEmpty' : IDL.Func(
        [],
        [IDL.Variant({ 'Ok' : IDL.Bool, 'Err' : IDL.Text })],
        ['query'],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
