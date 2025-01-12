db.createUser({
  user: 'admin',
  pwd: 'password123',
  roles: [
    {
      role: 'readWrite',
      db: 'crowdfunding'
    }
  ]
});

db.createCollection('users');
db.createCollection('projects');
db.createCollection('contributions');
