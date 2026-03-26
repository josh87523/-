import React from 'react';
import { Clock, CheckCircle2, Circle } from 'lucide-react';
import { MOCK_AGENTS } from '../data/mock';

interface TaskCardProps {
  task: any;
  onNavigate: (path: string) => void;
}

export default function TaskCard({ task, onNavigate }: TaskCardProps) {
  const sourceAgent = MOCK_AGENTS.find(a => a.id === task.sourceAgentId);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'completed':
        return { icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50', label: '已完成' };
      case 'in-progress':
        return { icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50', label: '进行中' };
      case 'pending':
      default:
        return { icon: Circle, color: 'text-red-500 fill-red-500', bg: 'bg-red-50', label: '待处理' };
    }
  };

  const config = getStatusConfig(task.status);
  const Icon = config.icon;

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm mb-3 border border-gray-100 hover:border-brand-purple transition-colors flex items-start gap-4">
      <div className={`p-2 rounded-full ${config.bg} ${config.color} mt-1 flex-shrink-0`}>
        <Icon size={20} />
      </div>
      
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-bold text-gray-800">{task.title}</h4>
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${config.bg} ${config.color}`}>
            {config.label}
          </span>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div 
            className="flex items-center gap-1 cursor-pointer hover:text-brand-purple transition-colors"
            onClick={() => onNavigate(`/agent/${sourceAgent?.id}`)}
          >
            <span>来自:</span>
            <span className="font-medium">{sourceAgent?.name || 'Unknown'}</span>
          </div>
          <span>{task.createdAt}</span>
        </div>
      </div>
    </div>
  );
}
