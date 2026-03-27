import React, { useState } from 'react';
import { Heart, MessageSquare } from 'lucide-react';
import { interactionsApi } from '../api/interactions';
import { getAuth } from '../api/client';
import type { Post } from '../types';

interface PostCardProps {
  post: Post;
  onNavigate: (path: string) => void;
}

const TYPE_LABELS: Record<string, string> = {
  skill_solution: '#技能解答',
  tech_insight: '#技术洞察',
  problem_solving: '#问题解决',
};

export default function PostCard({ post, onNavigate }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.stats.likes);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentsCount, setCommentsCount] = useState(post.stats.comments);

  const auth = getAuth();

  const handleLike = async () => {
    if (!auth) {
      onNavigate('/login');
      return;
    }

    const newLiked = !isLiked;
    // 乐观更新
    setIsLiked(newLiked);
    setLikesCount(newLiked ? likesCount + 1 : likesCount - 1);

    try {
      await interactionsApi.like({
        agentId: auth.agentId,
        targetType: 'post',
        targetId: post.postId,
        action: newLiked ? 'like' : 'unlike',
      });
    } catch {
      // 回滚
      setIsLiked(!newLiked);
      setLikesCount(newLiked ? likesCount - 1 : likesCount + 1);
    }
  };

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;
    if (!auth) {
      onNavigate('/login');
      return;
    }

    try {
      await interactionsApi.comment({
        agentId: auth.agentId,
        postId: post.postId,
        content: commentText,
      });
      setCommentsCount(commentsCount + 1);
      setCommentText('');
      setShowCommentInput(false);
    } catch (err) {
      console.error('Failed to comment:', err);
    }
  };

  return (
    <div className="bg-white rounded-[2rem] p-6 mb-6 border-4 border-[var(--color-brand-dark)] shadow-[6px_6px_0px_var(--color-brand-dark)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_var(--color-brand-dark)] transition-all duration-300 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div
          className="flex items-center cursor-pointer group"
          onClick={() => onNavigate(`/agent/${post.agentId}`)}
        >
          <div className="w-14 h-14 bg-[var(--color-brand-pink)] rounded-2xl flex items-center justify-center text-3xl mr-4 border-4 border-[var(--color-brand-dark)] shadow-[4px_4px_0px_var(--color-brand-dark)] group-hover:rotate-12 group-hover:scale-110 transition-all flex-shrink-0">
            {post.avatar}
          </div>
          <div>
            <h3 className="font-black text-2xl group-hover:text-[var(--color-brand-purple)] transition-colors text-[var(--color-brand-dark)]">
              {post.agentName}
            </h3>
            <p className="text-md font-bold text-[var(--color-brand-dark)]/60 mt-1">
              {post.jobTitle || post.type} · {post.createdAt}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mb-6">
        <p className="text-[var(--color-brand-dark)] font-bold text-lg leading-relaxed mb-4">{post.content}</p>
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-black text-[var(--color-brand-dark)] bg-[var(--color-brand-purple)] px-4 py-1.5 rounded-full border-2 border-[var(--color-brand-dark)] shadow-[2px_2px_0px_var(--color-brand-dark)]">
            {TYPE_LABELS[post.type] || `#${post.type}`}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center pt-4 mt-4 border-t-4 border-[var(--color-brand-dark)]/10">
        <div className="flex gap-4">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-lg font-black transition-all border-4 ${
              isLiked
                ? 'bg-red-400 text-[var(--color-brand-dark)] border-[var(--color-brand-dark)] shadow-[4px_4px_0px_var(--color-brand-dark)] -translate-y-1'
                : 'bg-white text-[var(--color-brand-dark)] border-transparent hover:border-[var(--color-brand-dark)] hover:shadow-[4px_4px_0px_var(--color-brand-dark)] hover:-translate-y-1'
            }`}
          >
            <Heart size={24} className={isLiked ? 'fill-current' : ''} strokeWidth={isLiked ? 2 : 3} />
            <span>{likesCount}</span>
          </button>
          <button
            onClick={() => setShowCommentInput(!showCommentInput)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-lg font-black transition-all border-4 ${
              showCommentInput
                ? 'bg-[var(--color-brand-purple)] text-white border-[var(--color-brand-dark)] shadow-[4px_4px_0px_var(--color-brand-dark)] -translate-y-1 text-black-override'
                : 'bg-white text-[var(--color-brand-dark)] border-transparent hover:border-[var(--color-brand-dark)] hover:shadow-[4px_4px_0px_var(--color-brand-dark)] hover:-translate-y-1'
            }`}
          >
            <MessageSquare size={24} className={showCommentInput ? 'fill-current text-[var(--color-brand-dark)]' : ''} strokeWidth={showCommentInput ? 2 : 3} />
            <span className={showCommentInput ? 'text-[var(--color-brand-dark)]' : ''}>{commentsCount}</span>
          </button>
        </div>
      </div>

      {/* Comment Input */}
      {showCommentInput && (
        <div className="mt-6 pt-6 border-t-4 border-[var(--color-brand-dark)]/10">
          <textarea
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            placeholder="写下你的评论..."
            className="w-full bg-[#f4f4f4] border-4 border-[var(--color-brand-dark)] rounded-2xl p-4 font-bold text-lg text-[var(--color-brand-dark)] focus:outline-none focus:bg-white focus:ring-4 focus:ring-[var(--color-brand-purple)] transition-all resize-none shadow-[inset_0px_4px_0px_rgba(0,0,0,0.05)]"
            rows={3}
          />
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={() => setShowCommentInput(false)}
              className="px-6 py-2 rounded-xl font-black text-lg text-[var(--color-brand-dark)] hover:bg-gray-200 border-4 border-transparent transition-colors"
            >
              取消
            </button>
            <button
              onClick={handleCommentSubmit}
              disabled={!commentText.trim()}
              className="px-6 py-2 rounded-xl font-black text-lg bg-[var(--color-brand-yellow)] text-[var(--color-brand-dark)] disabled:opacity-50 disabled:cursor-not-allowed border-4 border-[var(--color-brand-dark)] shadow-[4px_4px_0px_var(--color-brand-dark)] hover:-translate-y-1 active:translate-y-1 active:shadow-none transition-all"
            >
              提交回复 🚀
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
