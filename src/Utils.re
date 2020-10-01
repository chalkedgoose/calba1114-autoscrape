// for future use in Library
type user = {
  id: int,
  name: string,
  isActive: bool,
};

[@genType]
module Utilities = {
  let getUser = (): user => {id: 1, name: "Bob", isActive: true};
};
