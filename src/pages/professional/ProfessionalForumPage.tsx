import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useProfessionalAuth } from '../../features/professional/professionalAuthContext';

interface ForumPost {
  id: number;
  title: string;
  content: string;
  authorId: number;
  authorName: string;
  authorRole: string;
  authorSpecialty?: string;
  date: string;
  tags: string[];
  replies: ForumReply[];
  likes: number;
  views: number;
}

interface ForumReply {
  id: number;
  content: string;
  authorId: number;
  authorName: string;
  authorRole: string;
  authorSpecialty?: string;
  date: string;
  likes: number;
}

const ProfessionalForumPage: React.FC = () => {
  const { professionalUser } = useProfessionalAuth();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [replyContent, setReplyContent] = useState<string>('');

  // Mock categories for forum
  const categories = [
    { id: 'all', name: 'All Topics' },
    { id: 'clinical', name: 'Clinical Cases' },
    { id: 'research', name: 'Research Discussions' },
    { id: 'education', name: 'Continuing Education' },
    { id: 'technology', name: 'Healthcare Technology' },
    { id: 'policy', name: 'Healthcare Policy' },
    { id: 'wellness', name: 'Physician Wellness' }
  ];

  // Mock forum posts data
  const forumPosts: ForumPost[] = [
    {
      id: 1,
      title: 'Challenging case: Atypical presentation of Guillain-Barré Syndrome',
      content: `I recently encountered a case that I believe was Guillain-Barré Syndrome, but with an atypical presentation that made diagnosis challenging. The patient initially presented with asymmetric weakness and only mild sensory symptoms.

What made this case particularly interesting was the absence of the classic ascending paralysis pattern. Instead, the weakness was more prominent in the upper extremities at onset. CSF analysis showed elevated protein with normal cell count, consistent with the albumino-cytologic dissociation typically seen in GBS, and EMG studies eventually confirmed the diagnosis.

Has anyone else encountered similar atypical presentations of GBS? I'd be interested in hearing your experiences and how you approached diagnosis and treatment in these cases.`,
      authorId: 1,
      authorName: 'Dr. Sarah Johnson',
      authorRole: 'doctor',
      authorSpecialty: 'Neurology',
      date: 'May 15, 2023',
      tags: ['clinical cases', 'neurology', 'diagnosis'],
      replies: [
        {
          id: 1,
          content: "I had a similar case last year with a patient who presented with facial diplegia and paresthesia before developing any limb weakness. We initially suspected Bell's palsy until the symptoms progressed. Early administration of IVIG seemed to prevent further progression. The literature suggests that up to 10% of GBS cases can present with atypical patterns. The key is to maintain a high index of suspicion and perform appropriate neurodiagnostic studies.",
          authorId: 2,
          authorName: 'Dr. Michael Chen',
          authorRole: 'doctor',
          authorSpecialty: 'Neurology',
          date: 'May 15, 2023',
          likes: 12
        },
        {
          id: 2,
          content: "This is a great case discussion. I would add that we're increasingly recognizing various phenotypic variants of GBS. The Miller Fisher variant (ophthalmoplegia, ataxia, areflexia) is well-known, but pharyngeal-cervical-brachial variant and paraparetic variants are less commonly recognized. Electrodiagnostic studies and anti-ganglioside antibody testing can be very helpful in these cases.",
          authorId: 3,
          authorName: 'Dr. Rebecca Torres',
          authorRole: 'doctor',
          authorSpecialty: 'Neurology',
          date: 'May 16, 2023',
          likes: 8
        }
      ],
      likes: 24,
      views: 156
    },
    // Other posts remain the same...
  ];

  // Filter posts based on category and search term
  const filteredPosts = forumPosts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.tags.some(tag => tag.toLowerCase().includes(activeCategory.toLowerCase()));
    const matchesSearch =
      searchTerm === '' ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  // Handler for submitting a reply
  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedPost || !replyContent.trim() || !professionalUser) return;

    // In a real app, this would be an API call to submit the reply
    // For now, we'll just update the UI optimistically

    alert("Reply submitted successfully! (This is a demo - in a real app, your reply would be saved to the database)");
    setReplyContent('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Helmet>
        <title>Professional Forum | PHB Professional</title>
      </Helmet>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-800">Professional Forum</h1>
        <button
          className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center transition"
        >
          <span className="material-icons mr-1">add</span>
          Create New Post
        </button>
      </div>

      {/* Rest of the component remains the same... */}

      <div className="mt-6">
        <div className="flex items-center justify-center">
          <div className="bg-blue-100 rounded p-4 text-center">
            <h2 className="text-2xl font-bold text-blue-800">Coming Soon</h2>
            <p className="text-gray-600">This page is currently under development.</p>
          </div>
        </div>
        
      </div>

    </div>
  );
};

export default ProfessionalForumPage;
