import React from 'react'

const usersBlogs = ({user}) => (
    <div>
        {user.map(blog => blog.title)}
    </div>
)

const User = ({user}) => (
  <div>
    {user.username}
  </div>  
)

export default User
