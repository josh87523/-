import type {
  AgentProfile,
  AgentRecommendation,
  Comment,
  Pagination,
  Post,
  Skill,
} from '../types'

type BackendAgentBrief = {
  agentId: string
  agentName: string
  avatar?: string
  jobTitle?: string
  bio?: string
  skills?: string[]
}

type BackendAgentProfile = BackendAgentBrief & {
  statsPosts?: number
  statsFollowers?: number
  statsFollowing?: number
  createdAt: string
  updatedAt: string
}

type BackendComment = {
  commentId: string
  agentId: string
  agentName: string
  avatar?: string
  content: string
  createdAt: string
}

type BackendPost = {
  postId: string
  agentId: string
  agentName: string
  agentAvatar?: string
  avatar?: string
  jobTitle?: string
  content: string
  type: string
  images?: string[]
  likesCount?: number
  commentsCount?: number
  sharesCount?: number
  createdAt: string
  comments?: BackendComment[] | null
}

function toSkillList(skills: string[] | Skill[] | undefined): Skill[] {
  if (!skills || skills.length === 0) return []
  if (typeof skills[0] === 'string') {
    return (skills as string[]).map((name) => ({ name, level: 'advanced' as const }))
  }
  return skills as Skill[]
}

export function buildPagination(page: number, limit: number, total: number): Pagination {
  return {
    page,
    limit,
    total,
    hasNext: page * limit < total,
  }
}

export function mapBackendComment(raw: BackendComment): Comment {
  return {
    commentId: raw.commentId,
    agentId: raw.agentId,
    agentName: raw.agentName,
    avatar: raw.avatar || '🦞',
    content: raw.content,
    createdAt: raw.createdAt,
  }
}

export function mapBackendPost(raw: BackendPost): Post {
  return {
    postId: raw.postId,
    agentId: raw.agentId,
    agentName: raw.agentName,
    avatar: raw.agentAvatar || raw.avatar || '🦞',
    jobTitle: raw.jobTitle,
    content: raw.content,
    type: (raw.type as Post['type']) || 'tech_insight',
    images: raw.images || [],
    stats: {
      likes: raw.likesCount ?? 0,
      comments: raw.commentsCount ?? 0,
      shares: raw.sharesCount ?? 0,
    },
    isLiked: false,
    createdAt: raw.createdAt,
    comments: raw.comments?.map(mapBackendComment),
  }
}

export function mapBackendProfile(raw: BackendAgentProfile): AgentProfile {
  return {
    agentId: raw.agentId,
    agentName: raw.agentName,
    avatar: raw.avatar || '🦞',
    jobTitle: raw.jobTitle || '',
    bio: raw.bio || '',
    skills: toSkillList(raw.skills),
    stats: {
      posts: raw.statsPosts ?? 0,
      followers: raw.statsFollowers ?? 0,
      following: raw.statsFollowing ?? 0,
    },
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  }
}

export function mapBackendBriefToProfile(raw: BackendAgentBrief): AgentProfile {
  return {
    agentId: raw.agentId,
    agentName: raw.agentName,
    avatar: raw.avatar || '🦞',
    jobTitle: raw.jobTitle || '',
    bio: raw.bio || '',
    skills: toSkillList(raw.skills),
    stats: {
      posts: 0,
      followers: 0,
      following: 0,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

export function mapBackendBriefToRecommendation(
  raw: BackendAgentBrief,
  index: number
): AgentRecommendation {
  return {
    agentId: raw.agentId,
    agentName: raw.agentName,
    avatar: raw.avatar || '🦞',
    jobTitle: raw.jobTitle || '',
    matchReason: raw.bio || (raw.skills || []).slice(0, 3).join(' · ') || '技能匹配度高',
    matchScore: Math.max(0.6, 0.95 - index * 0.08),
  }
}
