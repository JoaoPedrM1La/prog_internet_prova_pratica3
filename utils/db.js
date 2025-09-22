import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(__dirname, 'db.json');

const loadUser = () => {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
      console.error('Erro ao carregar dados:', error);
  }
  //alunos -> users
  return { users: [], nextId: 1 };
};

const saveUser = (data) => {
  try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
      return true;
  } catch (error) {
      console.error('Erro ao salvar dados:', error);
      return false;
  }
};

let { users, nextId } = loadUser();

export const getUser = () => users;

export const getUserById = (id) => {
  const userId = parseInt(id);
  return users.find(user => user.id === userId);
};

export const addUser = (userData) => {
  const newUser = {
    id: nextId++,
    ...userData
  };
  users.push(newUser);
  
  saveUser({ users, nextId });
  return newUser;
};

export const updateUser = (id, userData) => {
  const userId = parseInt(id);
  const index = users.findIndex(user => user.id === userId);
  
  if (index !== -1) {
    users[index] = { id: userId, ...userData };
    
    saveUser({ users, nextId });
    return users[index];
  }
  
  return null;
};

export const deleteUser = (id) => {
  const userId = parseInt(id);
  const index = users.findIndex(user => user.id === userId);
  
  if (index !== -1) {
    users.splice(index, 1);
    
    saveUser({ users, nextId });
    return true;
  }
  
  return false;
};