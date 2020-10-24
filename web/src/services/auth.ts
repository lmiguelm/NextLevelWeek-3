import api from './api';

interface ReturnData {
  token: string;
  user: object;
}

export function login(email: string, password: string): Promise<ReturnData> {
  return new Promise(async (resolve, reject) => {
    try {
        const res = await api.post('/login', {
            email,
            password 
        });

        const token = res.headers.authorization;
        const user = res.data;

        return resolve({
            token,
            user
        });
            
    } catch(e) {            
      reject(e.response.data.message);
    } 
  });
}