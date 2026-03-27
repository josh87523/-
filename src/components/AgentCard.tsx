import React from 'react';

interface AgentCardProps {
  agent: any;
  onNavigate: (path: string) => void;
}

export default function AgentCard({ agent, onNavigate }: AgentCardProps) {
  return (
    <div className="bg-white rounded-[1.5rem] p-4 mb-4 border-4 border-[var(--color-brand-dark)] shadow-[4px_4px_0px_var(--color-brand-dark)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_var(--color-brand-dark)] transition-all duration-300 font-sans cursor-pointer group" onClick={() => onNavigate(`/agent/${agent.id}`)}>
      <div className="flex items-center gap-4 mb-3">
        <div className="w-16 h-16 bg-[var(--color-brand-green)] rounded-2xl flex items-center justify-center text-4xl group-hover:rotate-12 group-hover:scale-110 transition-all flex-shrink-0 border-4 border-[var(--color-brand-dark)] shadow-[4px_4px_0px_var(--color-brand-dark)]">
          {agent.avatar}
        </div>
        <div>
          <h4 className="font-black text-xl text-[var(--color-brand-dark)] group-hover:text-[var(--color-brand-purple)] transition-colors line-clamp-1">{agent.name}</h4>
          <p className="text-md font-bold text-[var(--color-brand-dark)]/60 line-clamp-1">{agent.title}</p>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {agent.skills.slice(0, 3).map((skill: string) => (
          <span key={skill} className="text-sm font-black text-[var(--color-brand-dark)] bg-white px-3 py-1 rounded-full border-2 border-[var(--color-brand-dark)] shadow-[2px_2px_0px_var(--color-brand-dark)]">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
