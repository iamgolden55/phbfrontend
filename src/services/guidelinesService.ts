// src/services/guidelinesService.ts

import { createApiUrl } from '../utils/config';

export interface ClinicalGuideline {
  id: number;
  guideline_id: string;
  title: string;
  description: string;
  version: string;
  organization: number;
  organization_name: string;
  created_by: number;
  created_by_name: string;
  created_by_email: string;
  category: string;
  specialty?: string;
  keywords: string[];
  content_type: 'pdf' | 'text' | 'mixed';
  text_content?: string;
  effective_date: string;
  expiry_date?: string;
  is_active: boolean;
  is_published: boolean;
  approval_status: 'draft' | 'pending_review' | 'approved' | 'rejected' | 'archived';
  approved_by?: number;
  approved_by_name?: string;
  approved_at?: string;
  created_at: string;
  updated_at: string;
  access_count: number;
  target_roles: string[];
  priority: 'low' | 'medium' | 'high' | 'critical';
  file_path?: string;
  file_url?: string;
  download_url: string;
  is_expired: boolean;
  is_effective: boolean;
  is_accessible: boolean;
  is_bookmarked: boolean;
  user_notes?: string;
}

export interface GuidelineCreateData {
  title: string;
  description: string;
  version?: string;
  category: string;
  specialty?: string;
  keywords?: string[];
  content_type?: 'pdf' | 'text' | 'mixed';
  text_content?: string;
  effective_date: string;
  expiry_date?: string;
  target_roles?: string[];
  priority?: 'low' | 'medium' | 'high' | 'critical';
}

export interface GuidelineStats {
  total_guidelines: number;
  published_guidelines: number;
  draft_guidelines: number;
  pending_approval: number;
  total_downloads: number;
  categories: { category: string; count: number }[];
}

export interface GuidelineAccess {
  id: number;
  guideline: number;
  user: number;
  action: 'view' | 'download' | 'shared' | 'printed' | 'bookmarked';
  accessed_at: string;
  ip_address: string;
  user_agent: string;
}

export interface GuidelineBookmark {
  id: number;
  user: number;
  guideline: number;
  bookmarked_at: string;
  notes?: string;
  is_active: boolean;
}

export interface GuidelineCategory {
  category: string;
  display_name: string;
  count: number;
}

// Helper function to get auth token (fixed to prioritize doctor auth correctly)
const getAuthToken = (): string | null => {
  let token = null;
  
  // First priority: Standard auth token (for doctors and other medical staff)
  token = localStorage.getItem('phb_auth_token');
  
  // Second priority: Professional token (alternative doctor auth)
  if (!token) {
    token = localStorage.getItem('phb_professional_token');
  }
  
  // Third priority: Organization auth (for hospital admins)
  if (!token) {
    const organizationAuth = localStorage.getItem('organizationAuth');
    if (organizationAuth) {
      try {
        const authData = JSON.parse(organizationAuth);
        token = authData.tokens?.access;
      } catch (e) {
        console.error('Failed to parse organization auth data:', e);
      }
    }
  }
  
  // Final fallback: Legacy token key
  if (!token) {
    token = localStorage.getItem('phb_token');
  }
  
  return token;
};

class GuidelinesService {
  // Fetch all guidelines accessible to the current user
  async getGuidelines(params?: {
    category?: string;
    specialty?: string;
    approval_status?: string;
    priority?: string;
    is_published?: boolean;
    search?: string;
  }): Promise<ClinicalGuideline[]> {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const searchParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== '') {
            searchParams.append(key, String(value));
          }
        });
      }

      const apiUrl = createApiUrl('api/clinical-guidelines/');
      const fullUrl = searchParams.toString() ? `${apiUrl}?${searchParams}` : apiUrl;

      const response = await fetch(fullUrl, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Failed to fetch guidelines: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching guidelines:', error);
      throw error;
    }
  }

  // Get a specific guideline by ID
  async getGuideline(guidelineId: string): Promise<ClinicalGuideline> {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(createApiUrl(`api/clinical-guidelines/${guidelineId}/`), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch guideline: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching guideline:', error);
      throw error;
    }
  }

  // Create a new guideline
  async createGuideline(data: GuidelineCreateData): Promise<ClinicalGuideline> {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(createApiUrl('api/clinical-guidelines/'), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Failed to create guideline: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating guideline:', error);
      throw error;
    }
  }

  // Update an existing guideline
  async updateGuideline(guidelineId: string, data: Partial<GuidelineCreateData>): Promise<ClinicalGuideline> {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(createApiUrl(`api/clinical-guidelines/${guidelineId}/`), {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to update guideline: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating guideline:', error);
      throw error;
    }
  }

  // Delete a guideline
  async deleteGuideline(guidelineId: string): Promise<void> {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(createApiUrl(`api/clinical-guidelines/${guidelineId}/`), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete guideline: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting guideline:', error);
      throw error;
    }
  }

  // Approve a guideline
  async approveGuideline(guidelineId: string): Promise<ClinicalGuideline> {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(createApiUrl(`api/clinical-guidelines/${guidelineId}/approve/`), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to approve guideline: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error approving guideline:', error);
      throw error;
    }
  }

  // Publish a guideline
  async publishGuideline(guidelineId: string): Promise<ClinicalGuideline> {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(createApiUrl(`api/clinical-guidelines/${guidelineId}/publish/`), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to publish guideline: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error publishing guideline:', error);
      throw error;
    }
  }

  // Upload a guideline with file
  async uploadGuideline(formData: FormData): Promise<ClinicalGuideline> {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(createApiUrl('api/clinical-guidelines/upload/'), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          // Don't set Content-Type for FormData, let browser set it
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Failed to upload guideline: ${response.status}`);
      }

      const result = await response.json();
      return result.guideline || result;
    } catch (error) {
      console.error('Error uploading guideline:', error);
      throw error;
    }
  }

  // Update guideline file
  async updateGuidelineFile(guidelineId: string, formData: FormData): Promise<ClinicalGuideline> {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(createApiUrl(`api/clinical-guidelines/${guidelineId}/update-file/`), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          // Don't set Content-Type for FormData, let browser set it
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to update guideline file: ${response.status}`);
      }

      const result = await response.json();
      return result.guideline || result;
    } catch (error) {
      console.error('Error updating guideline file:', error);
      throw error;
    }
  }

  // Download guideline file
  async downloadGuideline(guidelineId: string): Promise<Blob> {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(createApiUrl(`api/clinical-guidelines/${guidelineId}/download/`), {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to download guideline: ${response.status}`);
      }

      return await response.blob();
    } catch (error) {
      console.error('Error downloading guideline:', error);
      throw error;
    }
  }

  // Toggle bookmark
  async toggleBookmark(guidelineId: string): Promise<GuidelineBookmark> {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(createApiUrl(`api/clinical-guidelines/${guidelineId}/bookmark/`), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to toggle bookmark: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      throw error;
    }
  }

  // Remove bookmark
  async removeBookmark(guidelineId: string): Promise<void> {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(createApiUrl(`api/clinical-guidelines/${guidelineId}/bookmark/`), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to remove bookmark: ${response.status}`);
      }
    } catch (error) {
      console.error('Error removing bookmark:', error);
      throw error;
    }
  }

  // Get bookmarked guidelines
  async getBookmarkedGuidelines(): Promise<ClinicalGuideline[]> {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(createApiUrl('api/clinical-guidelines/my_bookmarks/'), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch bookmarked guidelines: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching bookmarked guidelines:', error);
      throw error;
    }
  }

  // Get guideline categories
  async getCategories(): Promise<GuidelineCategory[]> {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(createApiUrl('api/clinical-guidelines/categories/'), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  // Get guidelines statistics
  async getGuidelinesStats(): Promise<GuidelineStats> {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(createApiUrl('api/clinical-guidelines/stats/'), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch guidelines stats: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching guidelines stats:', error);
      throw error;
    }
  }

  // Get guideline access logs (hospital admin only)
  async getAccessLogs(): Promise<GuidelineAccess[]> {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(createApiUrl('api/guideline-access/'), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch access logs: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching access logs:', error);
      throw error;
    }
  }

  // Get guideline bookmarks (hospital admin only)
  async getBookmarks(): Promise<GuidelineBookmark[]> {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(createApiUrl('api/guideline-bookmarks/'), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch bookmarks: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
      throw error;
    }
  }
}

// Export a singleton instance
const guidelinesService = new GuidelinesService();
export default guidelinesService;