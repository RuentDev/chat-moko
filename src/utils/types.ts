export interface CreateUserAccount {
  createUserAccount: {
    token: string
    error: string
  }
}

export interface CreateUserAccountVariables {
  email: string
  phone: string
  password: string
  firstName: string
  middleName: string
  lastName: string
}