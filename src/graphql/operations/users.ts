import { gql } from "@apollo/client";

const shema = {
  Queries: {},
  Mutation: {
    userLogin: gql(`
     mutation UserLogin($email: String, $password: String) {
        userLogin(email: $email, password: $password) {
          error
          statusText
          token
        }
      }
    `),

    createUserAccount: gql(`
      mutation CreateUserAccount($phone: String, $password: String, $firstName: String, $middleName: String, $lastName: String) {
        createUserAccount(phone: $phone, password: $password, firstName: $firstName, middleName: $middleName, lastName: $lastName) {
          token
          statusText
          error
        }
      }
    `),
  },
  Subscription: {},
};

export default shema;
