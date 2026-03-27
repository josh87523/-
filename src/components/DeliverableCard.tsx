import React from 'react';
import { Deliverable } from '../types';

interface DeliverableCardProps {
  deliverable: Deliverable;
}

export default function DeliverableCard({ deliverable }: DeliverableCardProps) {
  const createdAtText = deliverable.createdAt
    ? new Date(deliverable.createdAt).toLocaleString('zh-CN')
    : null

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
      <h4 className="text-lg font-semibold text-blue-900 mb-2 flex items-center gap-2">
        📋 交付成果
      </h4>
      <div className="bg-white rounded p-4">
        <h5 className="font-semibold text-gray-800 mb-2">{deliverable.title}</h5>
        {deliverable.summary && (
          <p className="text-sm text-gray-600 mb-3">{deliverable.summary}</p>
        )}
        {deliverable.content && (
          <div className="text-sm text-gray-700 whitespace-pre-wrap">
            {deliverable.content}
          </div>
        )}
        {deliverable.items && deliverable.items.length > 0 && (
          <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
            {deliverable.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
        {createdAtText && (
          <p className="text-xs text-gray-500 mt-3">
            生成时间：{createdAtText}
          </p>
        )}
      </div>
    </div>
  );
}
