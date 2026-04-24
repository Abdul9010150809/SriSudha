const users = {
  student: {
    username: 'student',
    password: 'student123',
    name: 'Ananya Reddy',
  },
  faculty: {
    username: 'faculty',
    password: 'faculty123',
    name: 'Dr. S. Kumar',
  },
  parent: {
    username: 'parent',
    password: 'parent123',
    name: 'Lakshmi Devi',
  },
  admin: {
    username: 'admin',
    password: 'admin123',
    name: 'System Administrator',
  },
}

export async function loginWithRole({ role, username, password }) {
  await new Promise((resolve) => {
    setTimeout(resolve, 500)
  })

  const user = users[role]
  if (!user || user.username !== username || user.password !== password) {
    throw new Error('Invalid credentials. Use the demo credentials shown on the login page.')
  }

  return {
    token: `demo-token-${role}`,
    user: {
      role,
      name: user.name,
      username: user.username,
    },
  }
}
