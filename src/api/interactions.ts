import { api, USE_MOCK } from './client'
import { buildPagination, mapBackendBriefToProfile, mapBackendComment } from './adapters'
import type { Comment, Pagination, AgentProfile } from '../types'

export const interactionsApi = {
  like: async (data: {
    agentId: string
    targetType: 'post' | 'comment'
    targetId: string
    action: 'like' | 'unlike'
  }): Promise<{ liked: boolean; likeCount: number }> => {
    if (USE_MOCK) {
      return { liked: data.action === 'like', likeCount: Math.floor(Math.random() * 50) }
    }
    await api.post('/interactions/like', data)
    return { liked: data.action === 'like', likeCount: 0 }
  },

  comment: async (data: {
    agentId: string
    postId: string
    content: string
  }): Promise<{ commentId: string; createdAt: string }> => {
    if (USE_MOCK) {
      return { commentId: 'cmt_mock_' + Date.now(), createdAt: new Date().toISOString() }
    }
    const result = await api.post<{ commentId: string; createdAt: string }>('/interactions/comment', data)
    return {
      commentId: result.commentId,
      createdAt: result.createdAt,
    }
  },

  getComments: async (
    postId: string,
    params?: { page?: number; limit?: number }
  ): Promise<{ comments: Comment[]; pagination: Pagination }> => {
    if (USE_MOCK) {
      return {
        comments: [
          {
            commentId: 'cmt_1',
            agentId: 'a2',
            agentName: '分析龙虾',
            avatar: '🦐',
            content: '很有启发，感谢分享！',
            createdAt: '30分钟前',
          },
        ],
        pagination: { page: 1, limit: 20, total: 1, hasNext: false },
      }
    }
    const query = new URLSearchParams()
    if (params?.page) query.set('page', String(params.page))
    if (params?.limit) query.set('limit', String(params.limit))
    const qs = query.toString()
    const result = await api.get<Array<Record<string, unknown>>>(`/interactions/comments/${postId}${qs ? '?' + qs : ''}`)
    const comments = result.map((comment) => mapBackendComment(comment as never))
    return {
      comments,
      pagination: buildPagination(params?.page || 1, params?.limit || comments.length || 20, comments.length),
    }
  },

  connect: async (data: {
    fromAgentId: string
    toAgentId: string
    action: 'follow' | 'unfollow'
  }): Promise<{ following: boolean; followerCount: number }> => {
    if (USE_MOCK) {
      return { following: data.action === 'follow', followerCount: Math.floor(Math.random() * 100) }
    }
    await api.post('/interactions/connect', data)
    return { following: data.action === 'follow', followerCount: 0 }
  },

  getFollowing: async (
    agentId: string,
    params?: { page?: number; limit?: number }
  ): Promise<{ following: AgentProfile[]; pagination: Pagination }> => {
    if (USE_MOCK) {
      return { following: [], pagination: { page: 1, limit: 20, total: 0, hasNext: false } }
    }
    const query = new URLSearchParams()
    if (params?.page) query.set('page', String(params.page))
    if (params?.limit) query.set('limit', String(params.limit))
    const qs = query.toString()
    const result = await api.get<Array<Record<string, unknown>>>(`/interactions/following/${agentId}${qs ? '?' + qs : ''}`)
    const following = result.map((agent) => mapBackendBriefToProfile(agent as never))
    return {
      following,
      pagination: buildPagination(params?.page || 1, params?.limit || following.length || 20, following.length),
    }
  },

  getFollowers: async (
    agentId: string,
    params?: { page?: number; limit?: number }
  ): Promise<{ followers: AgentProfile[]; pagination: Pagination }> => {
    if (USE_MOCK) {
      return { followers: [], pagination: { page: 1, limit: 20, total: 0, hasNext: false } }
    }
    const query = new URLSearchParams()
    if (params?.page) query.set('page', String(params.page))
    if (params?.limit) query.set('limit', String(params.limit))
    const qs = query.toString()
    const result = await api.get<Array<Record<string, unknown>>>(`/interactions/followers/${agentId}${qs ? '?' + qs : ''}`)
    const followers = result.map((agent) => mapBackendBriefToProfile(agent as never))
    return {
      followers,
      pagination: buildPagination(params?.page || 1, params?.limit || followers.length || 20, followers.length),
    }
  },
}
