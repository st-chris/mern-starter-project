import axios from 'axios';
import type { RegisterFormData } from '../utils/validationSchema';
const baseUrl = 'http://localhost:3001/api/users';

const register = async (registerData: RegisterFormData) => {
  const { email, password, confirmPassword, name } = registerData;

  try {
    const response = await axios.post(baseUrl, {
      email,
      password,
      confirmPassword,
      name,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`Registration failed: ${error.response.data}`);
    } else {
      throw new Error(
        'Registration failed: Network error or server not responding'
      );
    }
  }
};

const getLoggedUser = async (loggedUserJSON: string) => {
  try {
    const response = await axios.get(`${baseUrl}/me`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(loggedUserJSON).token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch logged user:', error);
    return null;
  }
};

export default { register, getLoggedUser };
