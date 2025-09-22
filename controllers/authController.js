import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';
import authMiddleware from '../middleware/auth';

const user = [];

const usersFilePath = path.join(__dirname, '../db.json');

// Função para ler usuários do arquivo JSON
function readUsers() {
  try {
    if (!fs.existsSync(usersFilePath)) {
      // Criar diretório se não existir
      const dir = path.dirname(usersFilePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      // Criar arquivo com usuários padrão
      const defaultUsers = [
        { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
        { id: 2, username: 'user', password: 'user123', role: 'user' }
      ];
      fs.writeFileSync(usersFilePath, JSON.stringify(defaultUsers, null, 2));
      return defaultUsers;
    }
    
    const data = fs.readFileSync(usersFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler arquivo de usuários:', error);
    return [];
  }
}

// Função para salvar usuários no arquivo JSON
function saveUsers(users) {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    return true;
  } catch (error) {
    console.error('Erro ao salvar usuários:', error);
    return false;
  }
}

export const registrar = async (req, res) => {
    const { username, email, password } = req.body;

    const userExist = user.find((u) => u.username === username);
    if (userExist) {
        return res.status(400).json({ message: "Usuário já existe" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    user.push({ username, email, password: hashPassword });
    res.json({ message: "Usuário registro com sucesso" });
}

export const logar = async (req, res) => {
    const { username, password } = req.body;

    const users = readUsers();
    const user = user.find((u) => u.username === username && u.password === password);
    if (!user) {
        return res.status(400).json({ message: "Usuário não encontrado" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Senha inválida" });
    }

    const token = jwt.sign({ username }, "secreta123", { expiresIn: "1h" });
    res.json({ token });
}