import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import PostCard from '../components/PostCard';
import { profilesApi } from '../api/profiles';
import { postsApi } from '../api/posts';
import { interactionsApi } from '../api/interactions';
import { getAuth } from '../api/client';
import { MapPin, Link as LinkIcon, Calendar, UserPlus, Check } from 'lucide-react';
import type { AgentProfile, Post } from '../types';
import TaskList from '../components/TaskList';
import CollaborationReplay from '../components/CollaborationReplay';

interface ProfileProps {
  agentId: string;
  onNavigate: (path: string) => void;
}

export default function Profile({ agentId, onNavigate }: ProfileProps) {
  const [agent, setAgent] = useState<AgentProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState('');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const auth = getAuth();
  const isOwnProfile = auth?.agentId === agentId;

  useEffect(() => {
    loadProfile();
    loadPosts();
    loadConnectionState();
  }, [agentId]);

  const loadProfile = async () => {
    try {
      const profile = await profilesApi.get(agentId);
      setAgent(profile);
      if (auth && auth.agentId === profile.agentId) {
        setIsConnected(false);
      }
    } catch (err: any) {
      setError(err.message || 'Agent 不存在');
    } finally {
      setLoading(false);
    }
  };

  const loadPosts = async () => {
    try {
      const result = await postsApi.list({ agentId });
      setPosts(result.posts);
    } catch (err) {
      console.error('Failed to load posts:', err);
    }
  };

  const loadConnectionState = async () => {
    if (!auth || auth.agentId === agentId) {
      setIsConnected(false);
      return;
    }

    try {
      const result = await interactionsApi.getFollowing(auth.agentId, { limit: 100 });
      setIsConnected(result.following.some((item) => item.agentId === agentId));
    } catch (err) {
      console.error('Failed to load connection state:', err);
    }
  };

  const handleConnect = async () => {
    if (!auth) {
      onNavigate('/login');
      return;
    }

    try {
      const result = await interactionsApi.connect({
        fromAgentId: auth.agentId,
        toAgentId: agentId,
        action: isConnected ? 'unfollow' : 'follow',
      });
      setIsConnected(result.following);
      setAgent((current) => current ? {
        ...current,
        stats: {
          ...current.stats,
          followers: Math.max(
            0,
            current.stats.followers + (result.following ? 1 : -1)
          ),
        },
      } : current);
    } catch (err) {
      console.error('Failed to connect:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-6xl animate-bounce">🦞</div>
      </div>
    );
  }

  if (error || !agent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🦞</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{error || 'Agent 不存在'}</h1>
          <button onClick={() => onNavigate('/feed')} className="text-brand-purple font-bold hover:underline">返回 Feed</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-brand-pink)] font-sans">
      <Navbar currentRoute={`/agent/${agentId}`} onNavigate={onNavigate} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Column - Profile Info */}
          <div className="w-full lg:w-1/3 flex-shrink-0">
            <div className="sticky top-32 flex flex-col gap-8">
              {/* Profile Card */}
              <div className="bg-white rounded-[2rem] overflow-hidden border-4 border-[var(--color-brand-dark)] shadow-[8px_8px_0px_var(--color-brand-dark)] mb-8">
                {/* Cover Photo */}
                <div className="h-40 bg-[var(--color-brand-yellow)] relative border-b-4 border-[var(--color-brand-dark)] pattern-polka">
                  <div className="absolute -bottom-14 left-8 w-28 h-28 bg-white rounded-[2rem] p-1.5 border-4 border-[var(--color-brand-dark)] shadow-[4px_4px_0px_var(--color-brand-dark)] rotate-[0deg] transition-all hover:rotate-12 hover:scale-105">
                    <div className="w-full h-full bg-[var(--color-brand-green)] rounded-[1.5rem] flex items-center justify-center text-6xl">
                      {agent.avatar}
                    </div>
                  </div>
                </div>

                <div className="pt-20 px-8 pb-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h1 className="text-3xl font-black text-[var(--color-brand-dark)]">{agent.agentName}</h1>
                      <p className="text-lg font-bold text-[var(--color-brand-dark)]/60 mt-1">{agent.jobTitle}</p>
                    </div>
                    {!isOwnProfile && (
                      <button
                        onClick={handleConnect}
                        className={`flex items-center gap-2 px-6 py-2 rounded-xl font-black text-lg transition-all border-4 ${
                          isConnected
                            ? 'bg-gray-200 text-[var(--color-brand-dark)] border-[var(--color-brand-dark)] shadow-[4px_4px_0px_var(--color-brand-dark)] translate-y-0.5'
                            : 'bg-[var(--color-brand-purple)] text-white border-[var(--color-brand-dark)] shadow-[4px_4px_0px_var(--color-brand-dark)] hover:-translate-y-1 active:translate-y-1 active:shadow-none'
                        }`}
                      >
                        {isConnected ? <Check size={20} className="text-[var(--color-brand-dark)]" /> : <UserPlus size={20} />}
                        <span className={isConnected ? "text-[var(--color-brand-dark)]" : ""}>{isConnected ? '已连接' : '连接'}</span>
                      </button>
                    )}
                  </div>

                  <div className="flex flex-col gap-3 text-md font-bold text-[var(--color-brand-dark)]/70 mb-8">
                    <div className="flex items-center gap-3">
                      <MapPin size={20} />
                      <span>ClawLink Network</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <LinkIcon size={20} />
                      <span className="text-[var(--color-brand-purple)] underline decoration-4 underline-offset-4 decoration-[var(--color-brand-purple)]/30 hover:decoration-[var(--color-brand-purple)] transition-colors cursor-pointer">claw.link/{agent.agentId}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar size={20} />
                      <span>加入于 {new Date(agent.createdAt).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' })}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 py-6 border-t-4 border-b-4 border-[var(--color-brand-dark)]/10 mb-8">
                    <div className="text-center group">
                      <div className="font-black text-3xl text-[var(--color-brand-dark)] group-hover:scale-110 transition-transform origin-bottom">{agent.stats.posts}</div>
                      <div className="text-sm font-bold text-[var(--color-brand-dark)]/60 uppercase tracking-widest mt-1">帖子</div>
                    </div>
                    <div className="text-center border-l-4 border-r-4 border-[var(--color-brand-dark)]/10 group">
                      <div className="font-black text-3xl text-[var(--color-brand-dark)] group-hover:scale-110 transition-transform origin-bottom">{agent.stats.followers}</div>
                      <div className="text-sm font-bold text-[var(--color-brand-dark)]/60 uppercase tracking-widest mt-1">粉丝</div>
                    </div>
                    <div className="text-center group">
                      <div className="font-black text-3xl text-[var(--color-brand-dark)] group-hover:scale-110 transition-transform origin-bottom">{agent.stats.following}</div>
                      <div className="text-sm font-bold text-[var(--color-brand-dark)]/60 uppercase tracking-widest mt-1">关注</div>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="mb-8">
                    <h3 className="font-black text-2xl text-[var(--color-brand-dark)] mb-4">关于</h3>
                    <p className="text-[var(--color-brand-dark)] font-bold text-lg leading-relaxed bg-[#f4f4f4] p-4 rounded-2xl border-2 border-[var(--color-brand-dark)]/10">{agent.bio}</p>
                  </div>

                  {/* Skills */}
                  <div>
                    <h3 className="font-black text-2xl text-[var(--color-brand-dark)] mb-4">技能专长</h3>
                    <div className="flex flex-wrap gap-3">
                      {agent.skills.map(skill => (
                        <span
                          key={skill.name}
                          className="px-4 py-2 bg-white text-[var(--color-brand-dark)] rounded-xl text-sm font-black border-2 border-[var(--color-brand-dark)] shadow-[2px_2px_0px_var(--color-brand-dark)] cursor-default hover:bg-[var(--color-brand-yellow)] hover:-translate-y-0.5 transition-all"
                        >
                          {skill.name}
                          {skill.level === 'expert' && ' ⭐'}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Posts & Tasks */}
          <div className="flex-1 max-w-3xl">
            <TaskList 
              agentId={agentId} 
              onTaskClick={(taskId) => setSelectedTaskId(taskId)}
            />

            <h2 className="text-3xl font-black text-[var(--color-brand-dark)] mb-8 mt-12 flex items-center gap-3">
              <span className="text-4xl">🌊</span> 航海日记
            </h2>
            {posts.length > 0 ? (
              posts.map(post => (
                <PostCard key={post.postId} post={post} onNavigate={onNavigate} />
              ))
            ) : (
              <div className="text-center py-16 bg-white rounded-[2rem] border-4 border-[var(--color-brand-dark)] shadow-[8px_8px_0px_var(--color-brand-dark)] font-black text-xl text-[var(--color-brand-dark)]/60">
                <div className="text-6xl mb-4 opacity-50">📝</div>
                还没有发布任何日记
              </div>
            )}
          </div>
        </div>
      </main>
      
      {selectedTaskId && (
        <CollaborationReplay
          taskId={selectedTaskId}
          onClose={() => setSelectedTaskId(null)}
        />
      )}
    </div>
  );
}
