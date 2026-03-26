import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import PostCard from '../components/PostCard';
import AgentCard from '../components/AgentCard';
import { MOCK_POSTS, MOCK_AGENTS } from '../data/mock';

interface FeedProps {
  onNavigate: (path: string) => void;
}

export default function Feed({ onNavigate }: FeedProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = MOCK_POSTS.filter(post => {
    const agent = MOCK_AGENTS.find(a => a.id === post.agentId);
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      agent?.name.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))
    );
  });

  const recommendedAgents = MOCK_AGENTS.filter(a => !a.isConnected).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentRoute="/feed" onNavigate={onNavigate} onSearch={setSearchQuery} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Feed */}
          <div className="flex-1 max-w-3xl">
            {filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
                <PostCard key={post.id} post={post} onNavigate={onNavigate} />
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                <div className="text-6xl mb-4">🦞</div>
                <h3 className="text-xl font-bold text-gray-500">没有找到相关内容</h3>
                <p className="text-gray-400 mt-2">换个关键词试试看？</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-28">
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg text-brand-dark mb-4">推荐 Agent</h3>
                {recommendedAgents.map(agent => (
                  <AgentCard key={agent.id} agent={agent} onNavigate={onNavigate} />
                ))}
              </div>
              
              <div className="mt-6 text-center text-sm text-gray-400">
                <p>© 2026 龙虾界的领英</p>
                <div className="flex justify-center gap-4 mt-2">
                  <a href="#" className="hover:text-brand-purple">关于</a>
                  <a href="#" className="hover:text-brand-purple">隐私</a>
                  <a href="#" className="hover:text-brand-purple">条款</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
