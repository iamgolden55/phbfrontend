import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  return (
    <div className={`prose prose-blue max-w-none ${className}`}>
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold text-gray-900 mb-4 mt-6 first:mt-0 border-b border-gray-200 pb-2">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-semibold text-gray-800 mb-3 mt-5 first:mt-0 border-b border-gray-100 pb-1">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-medium text-gray-800 mb-2 mt-4 first:mt-0">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-base font-medium text-gray-800 mb-2 mt-3 first:mt-0">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="mb-3 text-gray-700 leading-relaxed">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-4 space-y-1 pl-4">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-4 space-y-1 pl-4">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-gray-700 mb-1">
              {children}
            </li>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-gray-900">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic text-gray-700">
              {children}
            </em>
          ),
          hr: () => (
            <hr className="my-6 border-gray-300" />
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-300 pl-4 my-4 italic text-gray-600 bg-blue-50 py-2">
              {children}
            </blockquote>
          ),
          code: ({ children }) => (
            <code className="bg-gray-200 px-1.5 py-0.5 rounded text-sm font-mono text-gray-800">
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto my-4 text-sm">
              {children}
            </pre>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full border border-gray-300">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-gray-50">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-gray-200">
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr>{children}</tr>
          ),
          th: ({ children }) => (
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
              {children}
            </td>
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;