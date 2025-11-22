import React, { useState } from 'react';

interface ForumCategory {
  id: string;
  name: string;
  description: string;
  topics: number;
  icon: React.ReactNode;
}

interface ForumTopic {
  id: string;
  categoryId: string;
  title: string;
  author: string;
  datePosted: string;
  replies: number;
  views: number;
  lastReply?: {
    author: string;
    date: string;
  };
  pinned?: boolean;
}

interface ForumPost {
  id: string;
  topicId: string;
  author: string;
  authorAvatar: string;
  content: string;
  datePosted: string;
  likes: number;
  isReply?: boolean;
  replyTo?: string;
}

const forumCategories: ForumCategory[] = [
  {
    id: 'first-trimester',
    name: 'First Trimester',
    description: 'Discussions about weeks 1-12 of pregnancy',
    topics: 156,
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  },
  {
    id: 'second-trimester',
    name: 'Second Trimester',
    description: 'Discussions about weeks 13-26 of pregnancy',
    topics: 203,
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
      </svg>
    )
  },
  {
    id: 'third-trimester',
    name: 'Third Trimester',
    description: 'Discussions about weeks 27-40+ of pregnancy',
    topics: 187,
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: 'labor-birth',
    name: 'Labor & Birth',
    description: 'Discussions about labor, delivery, and birth stories',
    topics: 145,
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    id: 'newborn',
    name: 'Newborn Care',
    description: 'Discussions about caring for your newborn baby',
    topics: 276,
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )
  },
  {
    id: 'nutrition-fitness',
    name: 'Nutrition & Fitness',
    description: 'Discussions about healthy eating and staying active during pregnancy',
    topics: 118,
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
];

const sampleTopics: ForumTopic[] = [
  {
    id: 'topic-1',
    categoryId: 'first-trimester',
    title: 'Morning sickness remedies that actually work',
    author: 'MomToBe2024',
    datePosted: '2023-10-15T08:30:00Z',
    replies: 28,
    views: 342,
    lastReply: {
      author: 'PregnancyPro',
      date: '2023-10-23T14:12:00Z'
    },
    pinned: true
  },
  {
    id: 'topic-2',
    categoryId: 'first-trimester',
    title: 'Should I announce my pregnancy before 12 weeks?',
    author: 'UnsureMama',
    datePosted: '2023-10-16T15:42:00Z',
    replies: 42,
    views: 516,
    lastReply: {
      author: 'ThirdTimeMom',
      date: '2023-10-24T09:30:00Z'
    }
  },
  {
    id: 'topic-3',
    categoryId: 'second-trimester',
    title: 'Anatomy scan anxiety - any tips?',
    author: 'FirstBaby2024',
    datePosted: '2023-10-14T10:15:00Z',
    replies: 19,
    views: 201,
    lastReply: {
      author: 'MidwifeHelper',
      date: '2023-10-22T11:45:00Z'
    }
  },
  {
    id: 'topic-4',
    categoryId: 'third-trimester',
    title: 'How to sleep comfortably in the third trimester?',
    author: 'DueMarch2024',
    datePosted: '2023-10-19T21:03:00Z',
    replies: 35,
    views: 428,
    lastReply: {
      author: 'SleepExpert',
      date: '2023-10-24T07:18:00Z'
    }
  },
  {
    id: 'topic-5',
    categoryId: 'labor-birth',
    title: 'Positive birth stories please!',
    author: 'AnxiousMama',
    datePosted: '2023-10-20T16:49:00Z',
    replies: 31,
    views: 389,
    lastReply: {
      author: 'HappyBirthDay',
      date: '2023-10-24T16:20:00Z'
    },
    pinned: true
  },
  {
    id: 'topic-6',
    categoryId: 'newborn',
    title: 'Breastfeeding vs Formula - feeling guilty',
    author: 'NewMom2023',
    datePosted: '2023-10-18T12:30:00Z',
    replies: 47,
    views: 623,
    lastReply: {
      author: 'LactationConsultant',
      date: '2023-10-24T14:35:00Z'
    }
  }
];

const samplePosts: ForumPost[] = [
  {
    id: 'post-1',
    topicId: 'topic-1',
    author: 'MomToBe2024',
    authorAvatar: 'https://i.pravatar.cc/150?img=32',
    content: `<p>Hi everyone! I'm 8 weeks pregnant and the morning sickness is hitting me hard. It's not just in the morning either - it's all day! I've tried crackers and ginger tea but they're not helping much.</p>
    <p>Has anyone found remedies that actually work? I'm desperate at this point and struggling to get through the workday.</p>
    <p>Thanks in advance for any suggestions!</p>`,
    datePosted: '2023-10-15T08:30:00Z',
    likes: 24
  },
  {
    id: 'post-2',
    topicId: 'topic-1',
    author: 'ThirdTimeMom',
    authorAvatar: 'https://i.pravatar.cc/150?img=29',
    content: `<p>I've been through this three times now, and what worked for me was:</p>
    <ul>
      <li>Sea-Bands (acupressure wristbands)</li>
      <li>Vitamin B6 + Unisom (ask your doctor first!)</li>
      <li>Small, frequent meals - never letting my stomach get empty</li>
      <li>Ice cold water with lemon</li>
      <li>Preggie pop drops (available at most pharmacies)</li>
    </ul>
    <p>Hang in there! For most women, it starts to improve around weeks 12-14. But definitely talk to your doctor if it's severe - there are prescription options too.</p>`,
    datePosted: '2023-10-15T09:42:00Z',
    likes: 36,
    isReply: true,
    replyTo: 'post-1'
  },
  {
    id: 'post-3',
    topicId: 'topic-1',
    author: 'PregnancyPro',
    authorAvatar: 'https://i.pravatar.cc/150?img=36',
    content: `<p>I'm a prenatal dietitian, and I often recommend these evidence-based strategies to my clients:</p>
    <ol>
      <li>Protein-rich snacks before bed can help with morning nausea</li>
      <li>Staying very well hydrated (try freezing Gatorade into ice chips)</li>
      <li>Ginger in capsule form (stronger than tea)</li>
      <li>Separating liquids from solids (don't drink with meals)</li>
      <li>Avoiding triggers - strong smells, heat, humidity</li>
    </ol>
    <p>If you're unable to keep food/water down for 24+ hours, have dark urine, feel dizzy, or are losing weight rapidly, please contact your healthcare provider as you may have hyperemesis gravidarum which requires medical treatment.</p>`,
    datePosted: '2023-10-15T11:15:00Z',
    likes: 53,
    isReply: true,
    replyTo: 'post-1'
  }
];

const PregnancyForums: React.FC = () => {
  const [view, setView] = useState<'categories' | 'topics' | 'posts'>('categories');
  const [selectedCategory, setSelectedCategory] = useState<ForumCategory | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<ForumTopic | null>(null);
  const [newPostContent, setNewPostContent] = useState<string>('');

  // Show topics in a category
  const handleCategoryClick = (category: ForumCategory) => {
    setSelectedCategory(category);
    setView('topics');
  };

  // Show posts in a topic
  const handleTopicClick = (topic: ForumTopic) => {
    setSelectedTopic(topic);
    setView('posts');
  };

  // Go back to categories view
  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setView('categories');
  };

  // Go back to topics view
  const handleBackToTopics = () => {
    setSelectedTopic(null);
    setView('topics');
  };

  // Handle posting a new message
  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPostContent.trim() === '') return;

    // In a real application, this would send the post to a server
    alert('Your post has been submitted. In a real application, this would be saved to a database.');
    setNewPostContent('');
  };

  // Filter topics by selected category
  const filteredTopics = selectedCategory
    ? sampleTopics.filter(topic => topic.categoryId === selectedCategory.id)
    : [];

  // Filter posts by selected topic
  const filteredPosts = selectedTopic
    ? samplePosts.filter(post => post.topicId === selectedTopic.id)
    : [];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Pregnancy Community Forums</h2>

        {/* Navigation breadcrumbs */}
        <div className="flex items-center mb-6 text-sm">
          <button
            className="text-[#0891b2] hover:underline"
            onClick={handleBackToCategories}
          >
            Forums
          </button>

          {selectedCategory && (
            <>
              <svg className="h-4 w-4 mx-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <button
                className={`${selectedTopic ? 'text-[#0891b2] hover:underline' : 'text-gray-700'}`}
                onClick={handleBackToTopics}
                disabled={!selectedTopic}
              >
                {selectedCategory.name}
              </button>
            </>
          )}

          {selectedTopic && (
            <>
              <svg className="h-4 w-4 mx-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-700">{selectedTopic.title}</span>
            </>
          )}
        </div>

        {/* Forum rules notice */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-blue-800 text-sm">
            <span className="font-bold">Community Guidelines:</span> Please be respectful and supportive of other members.
            Remember that medical advice should come from healthcare professionals. Our forums are
            moderated to ensure a safe space for discussion.
          </p>
        </div>

        {/* Categories View */}
        {view === 'categories' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Forum Categories</h3>
              <div className="text-sm text-gray-500">
                {forumCategories.reduce((total, category) => total + category.topics, 0)} topics total
              </div>
            </div>

            {forumCategories.map(category => (
              <div
                key={category.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleCategoryClick(category)}
              >
                <div className="flex items-center">
                  <div className="text-[#0891b2] mr-4">
                    {category.icon}
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-lg">{category.name}</h4>
                    <p className="text-gray-600 text-sm">{category.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-[#0891b2]">{category.topics}</div>
                    <div className="text-gray-500 text-sm">Topics</div>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-8 bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold mb-2">Community Statistics</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#0891b2]">1,085</div>
                  <div className="text-sm text-gray-600">Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#0891b2]">1,142</div>
                  <div className="text-sm text-gray-600">Topics</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#0891b2]">15,678</div>
                  <div className="text-sm text-gray-600">Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#0891b2]">264</div>
                  <div className="text-sm text-gray-600">Online Today</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Topics View */}
        {view === 'topics' && selectedCategory && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">{selectedCategory.name}</h3>
              <button className="bg-[#0891b2] text-white px-4 py-2 rounded-md hover:bg-[#004c93]">
                New Topic
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 mb-4 grid grid-cols-12 text-sm font-medium">
              <div className="col-span-7">Topic</div>
              <div className="col-span-1 text-center">Replies</div>
              <div className="col-span-1 text-center">Views</div>
              <div className="col-span-3 text-right">Last Reply</div>
            </div>

            {filteredTopics.length > 0 ? (
              <div className="space-y-2">
                {filteredTopics.map(topic => (
                  <div
                    key={topic.id}
                    className={`border-b py-3 grid grid-cols-12 items-center hover:bg-gray-50 cursor-pointer ${topic.pinned ? 'bg-blue-50' : ''}`}
                    onClick={() => handleTopicClick(topic)}
                  >
                    <div className="col-span-7">
                      <div className="flex items-center">
                        {topic.pinned && (
                          <svg className="h-4 w-4 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                          </svg>
                        )}
                        <div>
                          <div className="font-medium">{topic.title}</div>
                          <div className="text-sm text-gray-500">
                            by <span className="text-[#0891b2]">{topic.author}</span> • {new Date(topic.datePosted).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-1 text-center font-medium">
                      {topic.replies}
                    </div>
                    <div className="col-span-1 text-center text-gray-500">
                      {topic.views}
                    </div>
                    <div className="col-span-3 text-right text-sm">
                      {topic.lastReply ? (
                        <div>
                          <div className="text-[#0891b2]">{topic.lastReply.author}</div>
                          <div className="text-gray-500">{new Date(topic.lastReply.date).toLocaleDateString()}</div>
                        </div>
                      ) : (
                        <span className="text-gray-500">No replies yet</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-gray-500">
                <p>No topics have been created in this category yet.</p>
                <button className="mt-4 bg-[#0891b2] text-white px-4 py-2 rounded-md hover:bg-[#004c93]">
                  Be the first to post
                </button>
              </div>
            )}
          </div>
        )}

        {/* Posts View */}
        {view === 'posts' && selectedTopic && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">{selectedTopic.title}</h3>
              <div className="text-sm text-gray-500">
                {selectedTopic.replies} replies • {selectedTopic.views} views
              </div>
            </div>

            {filteredPosts.length > 0 ? (
              <div className="space-y-6 mb-8">
                {filteredPosts.map((post, index) => (
                  <div
                    key={post.id}
                    className={`border-b pb-6 ${post.isReply ? 'pl-6 ml-6 border-l' : ''}`}
                  >
                    <div className="flex items-start">
                      <img
                        src={post.authorAvatar}
                        alt={post.author}
                        className="h-10 w-10 rounded-full mr-4"
                      />
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <div className="font-bold text-[#0891b2]">{post.author}</div>
                          <div className="text-sm text-gray-500">
                            {new Date(post.datePosted).toLocaleString()}
                          </div>
                        </div>
                        <div
                          className="mt-3 prose max-w-none"
                          dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                        <div className="mt-4 flex items-center">
                          <button className="flex items-center text-gray-500 hover:text-gray-700">
                            <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                            </svg>
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center text-gray-500 hover:text-gray-700 ml-4">
                            <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                            </svg>
                            <span>Reply</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-gray-500">
                <p>No replies to this topic yet.</p>
                <p className="mt-2">Be the first to respond below.</p>
              </div>
            )}

            {/* Reply Form */}
            <div className="mt-8 bg-gray-50 p-6 rounded-lg">
              <h4 className="font-bold mb-4">Post a Reply</h4>
              <form onSubmit={handlePostSubmit}>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-md min-h-[150px]"
                  placeholder="Write your reply here..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                ></textarea>
                <div className="mt-4 flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#0891b2] text-white px-6 py-2 rounded-md hover:bg-[#004c93]"
                    disabled={newPostContent.trim() === ''}
                  >
                    Post Reply
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Login prompt for non-logged in users (simulated) */}
        <div className="mt-10 bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <h3 className="font-bold mb-2">Join Our Community</h3>
          <p className="mb-4">Create an account to start new topics and join the conversation with other members.</p>
          <div className="flex justify-center space-x-4">
            <button className="bg-[#0891b2] text-white px-6 py-2 rounded-md hover:bg-[#004c93]">
              Sign Up
            </button>
            <button className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-100">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PregnancyForums;
