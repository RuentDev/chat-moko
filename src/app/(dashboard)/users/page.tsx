import React from 'react'

const Users = async () => {

  const res = await fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json())

  return (
    <main>
      {res.map((user: any) => (
        <div key={user.id}>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
        </div>
      ))}
    </main>
  )
}

export default Users
