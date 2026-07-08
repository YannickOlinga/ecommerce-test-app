const users = [
  { id: 1, email: 'yannick@example.com', password: 'Motdepasse1!' },
  { id: 2, email: 'client@example.com', password: 'Client123!' },
];

function findByEmail(email) {
  return users.find((user) => user.email === email) || null;
}

module.exports = { users, findByEmail };
