import { gql } from '@apollo/client'



const shema = {
   Queries: {
   },
   Mutation: {
    userLogin: gql(`
     mutation UserLogin($username: String, $password: String) {
        userLogin(username: $username, password: $password) {
          error
          statusText
          user
        }
      }
    `),

    createUserAccount: gql(`
      mutation CreateUserAccount($phone: String, $password: String, $firstName: String, $middleName: String, $lastName: String) {
        createUserAccount(phone: $phone, password: $password, firstName: $firstName, middleName: $middleName, lastName: $lastName) {
          user
          statusText
          error
        }
      }
    `)
   },
   Subscription: {}
}

export default shema;