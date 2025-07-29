export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  createdAt: string
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

// Mock user data for demonstration
const mockUsers: User[] = [
  {
    id: "1",
    email: "demo@example.com",
    firstName: "Demo",
    lastName: "User",
    createdAt: new Date().toISOString(),
  },
]

// Simulate API calls
export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<User> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock validation
    const user = mockUsers.find(u => u.email === credentials.email)
    if (!user || credentials.password !== "password") {
      throw new Error("Invalid email or password")
    }
    
    return user
  },

  register: async (credentials: RegisterCredentials): Promise<User> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === credentials.email)
    if (existingUser) {
      throw new Error("User with this email already exists")
    }
    
    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email: credentials.email,
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      createdAt: new Date().toISOString(),
    }
    
    mockUsers.push(newUser)
    return newUser
  },

  logout: async (): Promise<void> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
  },

  getCurrentUser: async (): Promise<User | null> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // In a real app, this would check the session/token
    const storedUser = localStorage.getItem("user")
    return storedUser ? JSON.parse(storedUser) : null
  },
} 