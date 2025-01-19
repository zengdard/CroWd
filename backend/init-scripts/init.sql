CREATE DATABASE IF NOT EXISTS crowd;
USE crowd;

-- Ajout des droits à l'utilisateur
GRANT ALL PRIVILEGES ON crowd.* TO 'user'@'%';
FLUSH PRIVILEGES;
