import React from 'react'
import { Icon } from '..'

const LoginForm = () => {
  return (
    <form className='w-[500px] h-auto bg-white rounded-xl p-5 '>
      <h1 className='text-center text-fontHeadingPrimary font-bold'>Login</h1>
      <p className='text-center'>Welcome back!</p>
      <div className="input-container p-1 border border-t-0 border-r-0 border-l-0 mb-5">
        <label className="input-label block w-full h-auto my-1" htmlFor="username">
          Username
        </label>
        <div className="icon-text-container w-full h-auto flex items-center gap-2">
          <Icon icon={"user-alt"} width={20} color='gray' />
          <input
            className="input-field w-full h-auto bg-white rounded-md p-2 outline-none"
            type="text"
            name="username"
            id="username"
            placeholder="Type your username"
          />
        </div>
      </div>
      <div className="input-container p-1 border border-t-0 border-r-0 border-l-0 mb-5">
        <label className="input-label block w-full h-auto my-1" htmlFor="password">
          Password
        </label>
        <div className="icon-text-container w-full h-auto flex items-center gap-2">
          <Icon icon={"lock"} width={20} color='gray' />
          <input
            className="input-field w-full h-auto bg-white rounded-md p-2 outline-none"
            type="password"
            name="password"
            id="password"
            placeholder="Type your password"
          />
        </div>
      </div>
      <div className="login-button-container">
        <button className="login-button w-full h-auto p-2 bg-gradient-to-r from-blue-300 via-purple-500 to-blue-500 rounded-full transition-all ease-in-out duration-1000 ">
          Login
        </button>
      </div>

      <div className="other-signin-options py-5">
        <p className="sub-heading text-center">Or Sign-Up using</p>

        <div className="buttons-container w-full h-auto flex items-center justify-center gap-2 my-5">
          <button>
            <Icon icon={["fab", "google"]} width={25} color='red' />
          </button>
          <button>
            <Icon icon={["fab", "twitter"]} width={25} color='sky-blue' />
          </button>
          <button>
            <Icon icon={["fab", "facebook"]} width={25} color='blue' />
          </button>
        </div>

        <p className="sub-heading text-center">Or</p>

        <div className="button-container text-center">
          SIGN UP
        </div>
      </div>
    </form>
  )
}

export default LoginForm
