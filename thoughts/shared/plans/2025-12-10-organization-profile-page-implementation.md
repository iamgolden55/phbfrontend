---
date: 2025-12-10T19:45:00+0000
author: Claude (Sonnet 4.5)
status: ready_for_implementation
priority: critical
estimated_effort: 2 days
tags: [implementation-plan, organization, profile, settings, frontend]
related_research: thoughts/shared/research/2025-12-10-organization-dashboard-missing-features.md
---

# Implementation Plan: Organization Profile Page

**Priority**: 🚨 Critical
**Estimated Effort**: 2 days
**Dependencies**: Organization Settings Hub
**Related Research**: `thoughts/shared/research/2025-12-10-organization-dashboard-missing-features.md`

## Overview

Create a comprehensive Organization Profile page (similar to Medesk's "My Practice" and "Organisation Profile" sections) where admins can view and edit their organization's details including basic information, contact methods, physical address, website, and bank details for payment processing.

## Goals

1. Display complete organization profile information
2. Enable editing of organization details
3. Support multiple contact methods (phones, emails)
4. Manage physical address with timezone
5. Store bank details for payment processing
6. Upload and manage organization logo
7. Validate all input fields
8. Handle form submission with error handling

## UI Layout (Reference: Medesk Screenshot 1)

```
┌─────────────────────────────────────────────────────┐
│  ← Organisation Profile                    [Edit]   │
├─────────────────────────────────────────────────────┤
│                                                      │
│  📷 Logo                                            │
│  [Upload Button]                                    │
│                                                      │
│  [UK] Medesk Demo Clinic                           │
│  Practice                                           │
│                                                      │
│  Contacts                                           │
│  📞 +44 20 3608 3182                               │
│  📞 +44 7580 296196                                │
│  📞 +44 20 3608 3183                               │
│  ✉️ may@medesk.co.uk                               │
│  ✉️ ck@medesk.co.uk                                │
│                                                      │
│  Address                                            │
│  📍 2 Eastbourne Terrace, Paddington, London,      │
│     W2 6LG                                          │
│  🌍 Timezone Europe/London                         │
│                                                      │
│  Site                                               │
│  🌐 https://www.medesk.co.uk                       │
│                                                      │
│  Bank Details                                       │
│  [Expandable Section]                               │
│                                                      │
└─────────────────────────────────────────────────────┘
```

## File Structure

```
src/pages/organization/settings/
└── OrganizationProfilePage.tsx          # Main profile page

src/components/organization/profile/
├── ProfileHeader.tsx                     # Header with edit button
├── ProfileLogoUpload.tsx                 # Logo upload widget
├── ProfileBasicInfo.tsx                  # Name and type display/edit
├── ProfileContactsList.tsx               # Multiple contacts management
├── ProfileAddress.tsx                    # Address with timezone
├── ProfileBankDetails.tsx                # Bank information (collapsible)
└── ProfileEditModal.tsx                  # Edit modal/form

src/services/
└── organizationProfileService.ts         # API service

src/types/
└── organizationProfile.ts                # TypeScript interfaces
```

## TypeScript Interfaces

**Location**: `src/types/organizationProfile.ts`

```typescript
export interface OrganizationProfile {
  id: string;
  name: string;
  type: 'hospital' | 'ngo' | 'pharmacy';
  code: string;
  description?: string;
  logo_url?: string;

  // Contacts
  phones: PhoneContact[];
  emails: EmailContact[];

  // Address
  address: Address;

  // Website
  website_url?: string;

  // Bank details
  bank_details?: BankDetails;

  // Metadata
  created_at: string;
  updated_at: string;
}

export interface PhoneContact {
  id: string;
  number: string;
  type: 'main' | 'mobile' | 'fax' | 'other';
  label?: string;
  is_primary: boolean;
}

export interface EmailContact {
  id: string;
  email: string;
  type: 'general' | 'support' | 'billing' | 'admin' | 'other';
  label?: string;
  is_primary: boolean;
}

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  state_province?: string;
  postal_code: string;
  country: string;
  timezone: string;
  latitude?: number;
  longitude?: number;
}

export interface BankDetails {
  bank_name: string;
  account_name: string;
  account_number: string;
  sort_code?: string;      // UK
  routing_number?: string;  // US
  iban?: string;           // International
  swift_bic?: string;      // International
  currency: string;
}

export interface ProfileUpdateRequest {
  name?: string;
  description?: string;
  phones?: PhoneContact[];
  emails?: EmailContact[];
  address?: Address;
  website_url?: string;
  bank_details?: BankDetails;
}
```

## Component Specifications

### 1. OrganizationProfilePage.tsx (Main Page)

**Location**: `src/pages/organization/settings/OrganizationProfilePage.tsx`

```tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import ProfileHeader from '@/components/organization/profile/ProfileHeader';
import ProfileLogoUpload from '@/components/organization/profile/ProfileLogoUpload';
import ProfileBasicInfo from '@/components/organization/profile/ProfileBasicInfo';
import ProfileContactsList from '@/components/organization/profile/ProfileContactsList';
import ProfileAddress from '@/components/organization/profile/ProfileAddress';
import ProfileBankDetails from '@/components/organization/profile/ProfileBankDetails';
import ProfileEditModal from '@/components/organization/profile/ProfileEditModal';
import { organizationProfileService } from '@/services/organizationProfileService';
import type { OrganizationProfile } from '@/types/organizationProfile';

const OrganizationProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<OrganizationProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await organizationProfileService.getProfile();
      setProfile(data);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      toast.error('Failed to load organization profile');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (updates: ProfileUpdateRequest) => {
    try {
      const updated = await organizationProfileService.updateProfile(updates);
      setProfile(updated);
      setEditMode(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error('Failed to update profile');
      throw error;
    }
  };

  const handleLogoUpload = async (file: File) => {
    try {
      const updated = await organizationProfileService.uploadLogo(file);
      setProfile(updated);
      toast.success('Logo updated successfully');
    } catch (error) {
      console.error('Failed to upload logo:', error);
      toast.error('Failed to upload logo');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Failed to load profile</p>
          <button
            onClick={fetchProfile}
            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileHeader
        title="Organisation Profile"
        onBack={() => navigate('/organization/settings')}
        onEdit={() => setEditMode(true)}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Logo */}
          <ProfileLogoUpload
            logoUrl={profile.logo_url}
            onUpload={handleLogoUpload}
          />

          {/* Basic Info */}
          <ProfileBasicInfo
            name={profile.name}
            type={profile.type}
            code={profile.code}
            description={profile.description}
          />

          {/* Contacts */}
          <ProfileContactsList
            phones={profile.phones}
            emails={profile.emails}
          />

          {/* Address */}
          <ProfileAddress address={profile.address} />

          {/* Website */}
          {profile.website_url && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Site</h3>
              <a
                href={profile.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 hover:underline flex items-center"
              >
                <span className="mr-2">🌐</span>
                {profile.website_url}
              </a>
            </div>
          )}

          {/* Bank Details */}
          {profile.bank_details && (
            <ProfileBankDetails bankDetails={profile.bank_details} />
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editMode && (
        <ProfileEditModal
          profile={profile}
          onClose={() => setEditMode(false)}
          onSave={handleUpdateProfile}
        />
      )}
    </div>
  );
};

export default OrganizationProfilePage;
```

### 2. ProfileEditModal.tsx (Edit Form)

**Location**: `src/components/organization/profile/ProfileEditModal.tsx`

```tsx
import React, { useState } from 'react';
import { XMarkIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import type {
  OrganizationProfile,
  ProfileUpdateRequest,
  PhoneContact,
  EmailContact
} from '@/types/organizationProfile';

interface ProfileEditModalProps {
  profile: OrganizationProfile;
  onClose: () => void;
  onSave: (updates: ProfileUpdateRequest) => Promise<void>;
}

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  profile,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState<ProfileUpdateRequest>({
    name: profile.name,
    description: profile.description || '',
    phones: [...profile.phones],
    emails: [...profile.emails],
    address: { ...profile.address },
    website_url: profile.website_url || '',
    bank_details: profile.bank_details ? { ...profile.bank_details } : undefined
  });
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'contacts' | 'address' | 'bank'>('basic');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await onSave(formData);
    } catch (error) {
      // Error handled in parent
    } finally {
      setSaving(false);
    }
  };

  const addPhone = () => {
    setFormData(prev => ({
      ...prev,
      phones: [
        ...(prev.phones || []),
        {
          id: `new-${Date.now()}`,
          number: '',
          type: 'main',
          is_primary: (prev.phones?.length || 0) === 0
        }
      ]
    }));
  };

  const removePhone = (id: string) => {
    setFormData(prev => ({
      ...prev,
      phones: prev.phones?.filter(p => p.id !== id)
    }));
  };

  const updatePhone = (id: string, updates: Partial<PhoneContact>) => {
    setFormData(prev => ({
      ...prev,
      phones: prev.phones?.map(p =>
        p.id === id ? { ...p, ...updates } : p
      )
    }));
  };

  const addEmail = () => {
    setFormData(prev => ({
      ...prev,
      emails: [
        ...(prev.emails || []),
        {
          id: `new-${Date.now()}`,
          email: '',
          type: 'general',
          is_primary: (prev.emails?.length || 0) === 0
        }
      ]
    }));
  };

  const removeEmail = (id: string) => {
    setFormData(prev => ({
      ...prev,
      emails: prev.emails?.filter(e => e.id !== id)
    }));
  };

  const updateEmail = (id: string, updates: Partial<EmailContact>) => {
    setFormData(prev => ({
      ...prev,
      emails: prev.emails?.map(e =>
        e.id === id ? { ...e, ...updates } : e
      )
    }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
          <form onSubmit={handleSubmit}>
            {/* Header */}
            <div className="bg-white px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Edit Organisation Profile
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px px-6">
                {[
                  { id: 'basic', label: 'Basic Info' },
                  { id: 'contacts', label: 'Contacts' },
                  { id: 'address', label: 'Address' },
                  { id: 'bank', label: 'Bank Details' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`
                      mr-8 py-4 px-1 border-b-2 font-medium text-sm
                      ${activeTab === tab.id
                        ? 'border-orange-500 text-orange-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                    `}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="px-6 py-6 max-h-[60vh] overflow-y-auto">
              {/* Basic Info Tab */}
              {activeTab === 'basic' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Organisation Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Brief description of your organization..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Website URL
                    </label>
                    <input
                      type="url"
                      value={formData.website_url}
                      onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                      placeholder="https://www.example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                </div>
              )}

              {/* Contacts Tab */}
              {activeTab === 'contacts' && (
                <div className="space-y-6">
                  {/* Phones */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-semibold text-gray-900">Phone Numbers</h4>
                      <button
                        type="button"
                        onClick={addPhone}
                        className="flex items-center text-sm text-orange-600 hover:text-orange-700"
                      >
                        <PlusIcon className="w-4 h-4 mr-1" />
                        Add Phone
                      </button>
                    </div>
                    <div className="space-y-3">
                      {formData.phones?.map(phone => (
                        <div key={phone.id} className="flex items-center space-x-2">
                          <input
                            type="tel"
                            value={phone.number}
                            onChange={(e) => updatePhone(phone.id, { number: e.target.value })}
                            placeholder="+44 20 1234 5678"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                          />
                          <select
                            value={phone.type}
                            onChange={(e) => updatePhone(phone.id, { type: e.target.value as any })}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                          >
                            <option value="main">Main</option>
                            <option value="mobile">Mobile</option>
                            <option value="fax">Fax</option>
                            <option value="other">Other</option>
                          </select>
                          <button
                            type="button"
                            onClick={() => removePhone(phone.id)}
                            className="p-2 text-red-600 hover:text-red-800"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Emails */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-semibold text-gray-900">Email Addresses</h4>
                      <button
                        type="button"
                        onClick={addEmail}
                        className="flex items-center text-sm text-orange-600 hover:text-orange-700"
                      >
                        <PlusIcon className="w-4 h-4 mr-1" />
                        Add Email
                      </button>
                    </div>
                    <div className="space-y-3">
                      {formData.emails?.map(email => (
                        <div key={email.id} className="flex items-center space-x-2">
                          <input
                            type="email"
                            value={email.email}
                            onChange={(e) => updateEmail(email.id, { email: e.target.value })}
                            placeholder="email@example.com"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                          />
                          <select
                            value={email.type}
                            onChange={(e) => updateEmail(email.id, { type: e.target.value as any })}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                          >
                            <option value="general">General</option>
                            <option value="support">Support</option>
                            <option value="billing">Billing</option>
                            <option value="admin">Admin</option>
                            <option value="other">Other</option>
                          </select>
                          <button
                            type="button"
                            onClick={() => removeEmail(email.id)}
                            className="p-2 text-red-600 hover:text-red-800"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Address Tab */}
              {activeTab === 'address' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address Line 1 *
                    </label>
                    <input
                      type="text"
                      value={formData.address?.line1 || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        address: { ...formData.address!, line1: e.target.value }
                      })}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      value={formData.address?.line2 || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        address: { ...formData.address!, line2: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        value={formData.address?.city || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          address: { ...formData.address!, city: e.target.value }
                        })}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        value={formData.address?.postal_code || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          address: { ...formData.address!, postal_code: e.target.value }
                        })}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country *
                    </label>
                    <select
                      value={formData.address?.country || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        address: { ...formData.address!, country: e.target.value }
                      })}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="">Select country</option>
                      <option value="GB">United Kingdom</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      {/* Add more countries */}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Timezone *
                    </label>
                    <select
                      value={formData.address?.timezone || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        address: { ...formData.address!, timezone: e.target.value }
                      })}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="">Select timezone</option>
                      <option value="Europe/London">Europe/London (GMT)</option>
                      <option value="America/New_York">America/New_York (EST)</option>
                      <option value="America/Los_Angeles">America/Los_Angeles (PST)</option>
                      {/* Add more timezones */}
                    </select>
                  </div>
                </div>
              )}

              {/* Bank Details Tab */}
              {activeTab === 'bank' && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 mb-4">
                    Bank details are used for payment processing and payouts.
                  </p>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      value={formData.bank_details?.bank_name || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        bank_details: {
                          ...formData.bank_details!,
                          bank_name: e.target.value,
                          account_name: formData.bank_details?.account_name || '',
                          account_number: formData.bank_details?.account_number || '',
                          currency: formData.bank_details?.currency || 'GBP'
                        }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Account Name
                    </label>
                    <input
                      type="text"
                      value={formData.bank_details?.account_name || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        bank_details: {
                          ...formData.bank_details!,
                          account_name: e.target.value,
                          bank_name: formData.bank_details?.bank_name || '',
                          account_number: formData.bank_details?.account_number || '',
                          currency: formData.bank_details?.currency || 'GBP'
                        }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Account Number
                      </label>
                      <input
                        type="text"
                        value={formData.bank_details?.account_number || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          bank_details: {
                            ...formData.bank_details!,
                            account_number: e.target.value,
                            bank_name: formData.bank_details?.bank_name || '',
                            account_name: formData.bank_details?.account_name || '',
                            currency: formData.bank_details?.currency || 'GBP'
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Sort Code (UK)
                      </label>
                      <input
                        type="text"
                        value={formData.bank_details?.sort_code || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          bank_details: {
                            ...formData.bank_details!,
                            sort_code: e.target.value,
                            bank_name: formData.bank_details?.bank_name || '',
                            account_name: formData.bank_details?.account_name || '',
                            account_number: formData.bank_details?.account_number || '',
                            currency: formData.bank_details?.currency || 'GBP'
                          }
                        })}
                        placeholder="12-34-56"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                disabled={saving}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {saving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditModal;
```

## API Service

**Location**: `src/services/organizationProfileService.ts`

```typescript
import axios from 'axios';
import { API_BASE_URL } from '@/utils/config';
import type { OrganizationProfile, ProfileUpdateRequest } from '@/types/organizationProfile';

class OrganizationProfileService {
  private getAuthHeaders() {
    const token = localStorage.getItem('phb_organization_token');
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }

  async getProfile(): Promise<OrganizationProfile> {
    const response = await axios.get(
      `${API_BASE_URL}/api/organizations/profile/`,
      { headers: this.getAuthHeaders(), withCredentials: true }
    );
    return response.data;
  }

  async updateProfile(updates: ProfileUpdateRequest): Promise<OrganizationProfile> {
    const response = await axios.patch(
      `${API_BASE_URL}/api/organizations/profile/`,
      updates,
      { headers: this.getAuthHeaders(), withCredentials: true }
    );
    return response.data;
  }

  async uploadLogo(file: File): Promise<OrganizationProfile> {
    const formData = new FormData();
    formData.append('logo', file);

    const token = localStorage.getItem('phb_organization_token');
    const response = await axios.post(
      `${API_BASE_URL}/api/organizations/profile/logo/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      }
    );
    return response.data;
  }
}

export const organizationProfileService = new OrganizationProfileService();
```

## Backend API Requirements

```
GET /api/organizations/profile/
Response: OrganizationProfile

PATCH /api/organizations/profile/
Request: ProfileUpdateRequest
Response: OrganizationProfile

POST /api/organizations/profile/logo/
Request: multipart/form-data with 'logo' file
Response: OrganizationProfile with updated logo_url
```

## Validation Rules

**Name**: Required, min 2 chars, max 100 chars
**Phone**: Valid phone format with country code
**Email**: Valid email format
**Address Line 1**: Required
**City**: Required
**Postal Code**: Required
**Country**: Required (ISO code)
**Timezone**: Required (IANA timezone)
**Bank Account Number**: Numeric, length varies by country
**Sort Code**: UK format XX-XX-XX
**IBAN**: International format validation

## Implementation Checklist

- [ ] Create TypeScript interfaces
- [ ] Implement OrganizationProfilePage
- [ ] Implement ProfileEditModal with tabs
- [ ] Implement all display components (Basic Info, Contacts, Address, Bank)
- [ ] Create API service
- [ ] Add routing to App.tsx
- [ ] Add validation
- [ ] Test form submission
- [ ] Test logo upload
- [ ] Test responsive design
- [ ] Add loading/error states

## Estimated Timeline

**Day 1**: TypeScript interfaces, main page, display components
**Day 2**: Edit modal with tabs, API service, validation, testing