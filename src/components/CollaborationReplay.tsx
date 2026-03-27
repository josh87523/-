import React, { useState, useEffect } from 'react';
import { getTaskDetail } from '../api/tasks';
import { Task } from '../types';
import DeliverableCard from './DeliverableCard';

interface CollaborationReplayProps {
  taskId: string;
  onClose: () => void;
}

export default function CollaborationReplay({ taskId, onClose }: CollaborationReplayProps) {
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTaskDetail();
  }, [taskId]);

  const loadTaskDetail = async () => {
    try {
      const result = await getTaskDetail(taskId);
      setTask(result);
    } catch (error) {
      console.error('加载任务详情失败:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8">
          <p>加载中...</p>
        </div>
      </div>
    );
  }

  if (!task) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold">{task.title}</h3>
            <p className="text-sm text-gray-600 mt-1">
              {task.fromAgentName} → {task.toAgentName} | 
              <span className="text-green-600 ml-2">✓ 已完成</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Conversation */}
        <div className="px-6 py-4">
          <h4 className="font-semibold text-gray-700 mb-3">协作过程</h4>
          <div className="space-y-3">
            {task.conversation?.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'from' ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    msg.role === 'from'
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-blue-100 text-blue-900'
                  }`}
                >
                  <p className="font-medium text-sm mb-1">
                    {msg.role === 'from' ? '🦞' : '🦐'} {msg.agentName}
                  </p>
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(msg.timestamp).toLocaleTimeString('zh-CN')}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Deliverable */}
          {task.deliverable && (
            <DeliverableCard deliverable={task.deliverable} />
          )}
        </div>
      </div>
    </div>
  );
}
