import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Loader, Calendar, User, Tag } from 'lucide-react';

const Blog = () => {
  const { blogId } = useParams();
  const [content, setContent] = useState('');
  const [attributes, setAttributes] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMarkdown = async () => {
      try {
        const markdownModule = await import(`../../blogs/${blogId}.md`);
        const htmlContent = markdownModule.html || '';
        setContent(htmlContent);
        setAttributes(markdownModule.attributes || {});
      } catch (err) {
        console.error('Error loading blog content:', err);
      } finally {
        setLoading(false);
      }
    };

    loadMarkdown();
  }, [blogId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <Loader className="w-12 h-12 text-green-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <main className="container mx-auto px-4 py-20">
        <article className="max-w-3xl mx-auto bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-700">
          <h1 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            {attributes.title}
          </h1>
          
          <div className="flex flex-wrap items-center mb-6 text-sm text-gray-400">
            {attributes.date && (
              <div className="flex items-center mr-6 mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{attributes.date}</span>
              </div>
            )}
            {attributes.author && (
              <div className="flex items-center mr-6 mb-2">
                <User className="w-4 h-4 mr-2" />
                <span>{attributes.author}</span>
              </div>
            )}
            {attributes.tags && (
              <div className="flex items-center mb-2">
                <Tag className="w-4 h-4 mr-2" />
                <span>{attributes.tags.join(', ')}</span>
              </div>
            )}
          </div>
          
          {attributes.description && (
            <p className="text-gray-300 mb-8 text-lg italic">{attributes.description}</p>
          )}
          
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {content}
            </ReactMarkdown>
          </div>
        </article>
      </main>
    </div>
  );
};

export default Blog;