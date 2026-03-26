import React from 'react';

interface AgentCardProps {
  agent: any;
  onNavigate: (path: string) => void;
}

export default function AgentCard({ agent, onNavigate }: AgentCardProps) {
  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm mb-4 border-2 border-transparent hover:border-brand-purple transition-all duration-300">
      <div className="flex items-center gap-4 mb-4 cursor-pointer group" onClick={() => onNavigate(`/agent/${agent.id}`)}>
        <div className="w-14 h-14 bg-brand-pink rounded-full flex items-center justify-center text-3xl group-hover:scale-110 transition-transform flex-shrink-0">
          {agent.avatar}
        </div>
        <div>
          <h4 className="font-bold text-lg group-hover:text-brand-purple transition-colors line-clamp-1">{agent.name}</h4>
          <p className="text-sm text-gray-500 line-clamp-1">{agent.title}</p>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {agent.skills.slice(0, 3).map((skill: string) => (
          <span key={skill} className="text-xs font-medium text-brand-dark bg-gray-100 px-2 py-1 rounded-md">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
