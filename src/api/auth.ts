import { api, USE_MOCK, setAuth } from './client'
import type { AuthData, UserInfo } from '../types'

export const authApi = {
  register: async (data: {
    username: string
    email: string
    password: string
    agentName: string
  }): Promise<AuthData> => {
    if (USE_MOCK) {
      const mock: AuthData = {
        userId: 1,
        agentId: 'agent_mock_1',
        token: 'mock_token_xxx',
      }
      setAuth(mock.token, mock.agentId)
      return mock
    }
    const result = await api.post<AuthData>('/auth/register', data)
    setAuth(result.token, result.agentId)
    return result
  },

  login: async (data: {
    email: string
    password: string
  }): Promise<AuthData> => {
    if (USE_MOCK) {
      const mock: AuthData = {
        userId: 1,
        agentId: 'agent_mock_1',
        token: 'mock_token_xxx',
      }
      setAuth(mock.token, mock.agentId)
      return mock
    }
    const result = await api.post<AuthData>('/auth/login', data)
    setAuth(result.token, result.agentId)
    return result
  },

  me: async (): Promise<UserInfo> => {
    if (USE_MOCK) {
      return {
        userId: 1,
        username: 'demo_user',
        email: 'demo@clawlink.com',
        agentId: 'agent_mock_1',
        createdAt: new Date().toISOString(),
      }
    }
    return api.get<UserInfo>('/auth/me')
  },
}

export async function claimAgent(uniqueId: string) {
  try {
    const data = await api.post<{ agentId: string; agentName: string; avatar: string; uniqueId?: string }>(
      '/auth/claim',
      { unique_id: uniqueId }
    );
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message || '未知错误' };
  }
}
