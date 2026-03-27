import React, { useState, useEffect } from 'react';
import { getTasks } from '../api/tasks';
import { Task } from '../types';

interface TaskListProps {
  agentId: string;
  onTaskClick: (taskId: string) => void;
}

export default function TaskList({ agentId, onTaskClick }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, [agentId]);

  const loadTasks = async () => {
    try {
      const result = await getTasks(agentId);
      setTasks(result.tasks || []);
    } catch (error) {
      console.error('加载任务失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const sentTasks = tasks.filter(t => t.fromAgentId === agentId);
  const receivedTasks = tasks.filter(t => t.toAgentId === agentId);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return '●';
      case 'matched': return '⏳';
      case 'in_progress': return '⏳';
      case 'completed': return '✓';
      default: return '●';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-gray-500';
      case 'matched': return 'text-blue-500';
      case 'in_progress': return 'text-blue-500';
      case 'completed': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return '待处理';
      case 'matched': return '已匹配';
      case 'in_progress': return '进行中';
      case 'completed': return '已完成';
      default: return status;
    }
  };

  if (loading) {
    return <div className="text-center py-4">加载中...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
      <h3 className="text-xl font-semibold mb-4">协作任务</h3>

      {/* 发出的请求 */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-gray-700 mb-3">发出的请求</h4>
        {sentTasks.length === 0 ? (
          <p className="text-gray-500 text-sm">暂无发出的请求</p>
        ) : (
          <div className="space-y-2">
            {sentTasks.map(task => (
              <div
                key={task.taskId}
                onClick={() => task.status === 'completed' && onTaskClick(task.taskId)}
                className={`border rounded-lg p-3 ${task.status === 'completed' ? 'cursor-pointer hover:bg-gray-50' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`${getStatusColor(task.status)} font-bold`}>
                        {getStatusIcon(task.status)}
                      </span>
                      <span className="font-medium">{task.title}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      → {task.toAgentName}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 rounded ${getStatusColor(task.status)} bg-opacity-10`}>
                      {getStatusText(task.status)}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{new Date(task.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 收到的请求 */}
      <div>
        <h4 className="text-lg font-medium text-gray-700 mb-3">收到的请求</h4>
        {receivedTasks.length === 0 ? (
          <p className="text-gray-500 text-sm">暂无收到的请求</p>
        ) : (
          <div className="space-y-2">
            {receivedTasks.map(task => (
              <div
                key={task.taskId}
                onClick={() => task.status === 'completed' && onTaskClick(task.taskId)}
                className={`border rounded-lg p-3 ${task.status === 'completed' ? 'cursor-pointer hover:bg-gray-50' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`${getStatusColor(task.status)} font-bold`}>
                        {getStatusIcon(task.status)}
                      </span>
                      <span className="font-medium">{task.title}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      ← {task.fromAgentName}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 rounded ${getStatusColor(task.status)} bg-opacity-10`}>
                      {getStatusText(task.status)}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{new Date(task.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
