# Fix Non-Functional Onboarding Flow Buttons Implementation Plan

## Overview

Fix three critical non-functional buttons in the onboarding flow that prevent new users from accessing key platform features. The buttons currently either navigate to incorrect pages or have no functionality at all, creating a broken first-time user experience.

## Current State Analysis

The onboarding flow at `/onboarding` has three major issues:

1. **"Find hospital near me" button** - Navigates to wrong page (`/account/gp-record` instead of `/account/link-phb`)
2. **"Upload records now" button** - No onClick handler attached (completely non-functional)
3. **"Set up emergency contacts" button** - No onClick handler attached and no dedicated emergency contacts page exists

### Key Discoveries:

- **OnboardingFlow.tsx:103** - Handler `handleGoToGPRecord` navigates to `/account/gp-record` (wrong page)
- **OnboardingFlow.tsx:222-224** - "Upload records now" button has no onClick handler
- **OnboardingFlow.tsx:260-262** - "Set up emergency contacts" button has no onClick handler
- **LinkPHBPage.tsx** - Correct hospital finding page exists with full geolocation and registration functionality
- **HealthRecordsPage.tsx** - Complete file upload system exists with security features (OTP, encryption, virus scanning)
- **patientTypes.ts:40-45** - `EmergencyContact` interface exists but no UI for regular users to manage contacts
- **authContext.tsx** - Has `registerWithHospital`, `fetchNearbyHospitals`, `updateUserProfile` methods available

## Desired End State

After this plan is complete:

1. Users clicking "Find hospital near me" will navigate to the correct hospital finding page
2. Users clicking "Upload records now" will navigate to the medical records upload page
3. Users clicking "Set up emergency contacts" will navigate to a dedicated emergency contacts management page
4. Users can successfully complete all onboarding steps and access the features being promoted
5. First-time user experience is smooth and all promised features are accessible

### Verification:
- Navigate through entire onboarding flow
- Click all three action buttons
- Verify each navigates to correct page
- Verify all three destination pages function correctly
- Complete onboarding and verify features remain accessible from account navigation

## What We're NOT Doing

- Not modifying the onboarding flow structure or design
- Not changing the "Set up later" / "Explore later" / "Configure later" buttons
- Not adding new onboarding steps
- Not modifying backend authentication or user verification flows
- Not implementing 2FA or other security features (separate concern)
- Not changing the hospital registration or medical records upload backend logic
- Not modifying OTP verification requirements for medical records

## Implementation Approach

This plan uses a **phased approach** to minimize risk and allow for incremental testing:

**Phase 1**: Fix the two quick wins (hospital finding and records upload) - minimal changes, immediate impact
**Phase 2**: Implement comprehensive emergency contacts management system - requires new component, routes, and backend coordination

This approach allows Phase 1 to be deployed immediately while Phase 2 undergoes proper backend coordination and testing.

---

## Phase 1: Fix Hospital Finding and Records Upload Buttons

### Overview
Fix the two buttons that have simple solutions - correcting a navigation destination and adding a simple onClick handler. These changes are low-risk and provide immediate value.

### Changes Required:

#### 1. Fix "Find Hospital Near Me" Button Navigation
**File**: `src/features/auth/OnboardingFlow.tsx`

**Change**: Update the `handleGoToGPRecord` handler to navigate to correct page

**Current code (line 99-104)**:
```typescript
const handleGoToGPRecord = (e: React.MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();
  console.log('Navigating to GP Record page using window.location');
  window.location.href = '/account/gp-record';
};
```

**Updated code**:
```typescript
const handleGoToGPRecord = (e: React.MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();
  console.log('Navigating to Hospital Registration page using window.location');
  window.location.href = '/account/link-phb';
};
```

**Also rename the function for clarity**:
```typescript
// Rename from handleGoToGPRecord to handleFindHospital
const handleFindHospital = (e: React.MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();
  console.log('Navigating to Hospital Registration page');
  window.location.href = '/account/link-phb';
};
```

**Update button onClick (line 185)**:
```typescript
<button
  className="flex-1 bg-[#005eb8] text-white py-2 px-4 rounded hover:bg-[#004c93] transition-colors"
  onClick={handleFindHospital}
>
  Find hospitals near me
</button>
```

#### 2. Add "Upload Records Now" Button Handler
**File**: `src/features/auth/OnboardingFlow.tsx`

**Change**: Add new handler function and attach to button

**Add new handler after `handleFindHospital` (around line 105)**:
```typescript
// Function to navigate to Health Records page
const handleUploadRecords = (e: React.MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();
  console.log('Navigating to Health Records page');
  window.location.href = '/account/health-records';
};
```

**Update button with onClick handler (line 222-224)**:
```typescript
<button
  className="flex-1 bg-[#005eb8] text-white py-2 px-4 rounded hover:bg-[#004c93] transition-colors"
  onClick={handleUploadRecords}
>
  Upload records now
</button>
```

### Success Criteria:

#### Automated Verification:
- [ ] TypeScript compilation passes: `bun run typecheck`
- [ ] No linting errors: `bun run lint`
- [ ] Development server starts without errors: `bun run dev`
- [ ] No console errors when navigating to `/onboarding`

#### Manual Verification:
- [ ] Navigate to `/onboarding` in browser
- [ ] Click "Find hospitals near me" button → navigates to `/account/link-phb`
- [ ] Verify LinkPHBPage loads correctly and shows hospital list
- [ ] Go back to onboarding, navigate to step 4 (Medical Records)
- [ ] Click "Upload records now" button → navigates to `/account/health-records`
- [ ] Verify HealthRecordsPage loads correctly (may require OTP verification)
- [ ] Test both buttons work consistently on multiple attempts
- [ ] No JavaScript errors in browser console

**Implementation Note**: After completing this phase and all automated verification passes, pause here for manual confirmation from the human that the manual testing was successful before proceeding to Phase 2.

---

## Phase 2: Implement Emergency Contacts Management System

### Overview
Create a comprehensive emergency contacts management system with dedicated UI, CRUD operations, and backend integration. This allows users to add, edit, and delete multiple emergency contacts with proper validation.

### Changes Required:

#### 1. Create EmergencyContact Type Definition
**File**: `src/types/emergencyContact.ts` (new file)

**Create new type definition file**:
```typescript
// Emergency contact type definitions for user emergency contact management

export interface EmergencyContact {
  id?: string; // Optional for new contacts, required for existing
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  is_primary?: boolean; // Flag to indicate primary contact
  created_at?: string;
  updated_at?: string;
}

export interface EmergencyContactFormData {
  name: string;
  relationship: string;
  phone: string;
  email: string;
}

// Relationship options for dropdown
export const RELATIONSHIP_OPTIONS = [
  { value: 'spouse', label: 'Spouse' },
  { value: 'partner', label: 'Partner' },
  { value: 'parent', label: 'Parent' },
  { value: 'child', label: 'Child' },
  { value: 'sibling', label: 'Sibling' },
  { value: 'friend', label: 'Friend' },
  { value: 'relative', label: 'Other Relative' },
  { value: 'caregiver', label: 'Caregiver' },
  { value: 'other', label: 'Other' },
] as const;

// Validation helper
export const validateEmergencyContact = (contact: EmergencyContactFormData): string[] => {
  const errors: string[] = [];

  if (!contact.name || contact.name.trim().length === 0) {
    errors.push('Name is required');
  }

  if (!contact.relationship || contact.relationship.trim().length === 0) {
    errors.push('Relationship is required');
  }

  if (!contact.phone || contact.phone.trim().length === 0) {
    errors.push('Phone number is required');
  } else {
    // Basic phone validation - adjust regex based on requirements
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(contact.phone)) {
      errors.push('Phone number contains invalid characters');
    }
  }

  if (contact.email && contact.email.trim().length > 0) {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contact.email)) {
      errors.push('Invalid email format');
    }
  }

  return errors;
};
```

#### 2. Update Auth Context with Emergency Contact Methods
**File**: `src/features/auth/authContext.tsx`

**Add to User interface (around line 5-32)**:
```typescript
interface User {
  // ... existing fields
  emergency_contacts?: EmergencyContact[];
}
```

**Add to AuthContextType interface (around line 94-130)**:
```typescript
interface AuthContextType {
  // ... existing fields
  emergencyContacts: EmergencyContact[];
  fetchEmergencyContacts: () => Promise<EmergencyContact[]>;
  addEmergencyContact: (contact: EmergencyContactFormData) => Promise<EmergencyContact>;
  updateEmergencyContact: (id: string, contact: EmergencyContactFormData) => Promise<EmergencyContact>;
  deleteEmergencyContact: (id: string) => Promise<void>;
  setPrimaryEmergencyContact: (id: string) => Promise<void>;
}
```

**Add state for emergency contacts (around line 150)**:
```typescript
const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);
```

**Add emergency contact API methods (add after updateUserProfile function, around line 1040)**:
```typescript
// Fetch user's emergency contacts
const fetchEmergencyContacts = async (): Promise<EmergencyContact[]> => {
  if (!user) {
    throw new Error("User not authenticated");
  }

  setIsLoading(true);
  setError(null);

  try {
    const response = await fetch(`${API_BASE_URL}/api/users/emergency-contacts/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch emergency contacts');
    }

    const data = await response.json();
    const contacts = data.emergency_contacts || [];
    setEmergencyContacts(contacts);
    return contacts;
  } catch (err: any) {
    console.error("Fetch emergency contacts failed:", err);
    setError(err.message || "Failed to fetch emergency contacts");
    throw err;
  } finally {
    setIsLoading(false);
  }
};

// Add a new emergency contact
const addEmergencyContact = async (contact: EmergencyContactFormData): Promise<EmergencyContact> => {
  if (!user) {
    throw new Error("User not authenticated");
  }

  setIsLoading(true);
  setError(null);

  try {
    const response = await fetch(`${API_BASE_URL}/api/users/emergency-contacts/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(contact),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to add emergency contact');
    }

    const data = await response.json();
    const newContact = data.emergency_contact;

    // Update local state
    setEmergencyContacts(prev => [...prev, newContact]);

    return newContact;
  } catch (err: any) {
    console.error("Add emergency contact failed:", err);
    setError(err.message || "Failed to add emergency contact");
    throw err;
  } finally {
    setIsLoading(false);
  }
};

// Update an existing emergency contact
const updateEmergencyContact = async (id: string, contact: EmergencyContactFormData): Promise<EmergencyContact> => {
  if (!user) {
    throw new Error("User not authenticated");
  }

  setIsLoading(true);
  setError(null);

  try {
    const response = await fetch(`${API_BASE_URL}/api/users/emergency-contacts/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(contact),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update emergency contact');
    }

    const data = await response.json();
    const updatedContact = data.emergency_contact;

    // Update local state
    setEmergencyContacts(prev =>
      prev.map(c => c.id === id ? updatedContact : c)
    );

    return updatedContact;
  } catch (err: any) {
    console.error("Update emergency contact failed:", err);
    setError(err.message || "Failed to update emergency contact");
    throw err;
  } finally {
    setIsLoading(false);
  }
};

// Delete an emergency contact
const deleteEmergencyContact = async (id: string): Promise<void> => {
  if (!user) {
    throw new Error("User not authenticated");
  }

  setIsLoading(true);
  setError(null);

  try {
    const response = await fetch(`${API_BASE_URL}/api/users/emergency-contacts/${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete emergency contact');
    }

    // Update local state
    setEmergencyContacts(prev => prev.filter(c => c.id !== id));
  } catch (err: any) {
    console.error("Delete emergency contact failed:", err);
    setError(err.message || "Failed to delete emergency contact");
    throw err;
  } finally {
    setIsLoading(false);
  }
};

// Set a contact as primary
const setPrimaryEmergencyContact = async (id: string): Promise<void> => {
  if (!user) {
    throw new Error("User not authenticated");
  }

  setIsLoading(true);
  setError(null);

  try {
    const response = await fetch(`${API_BASE_URL}/api/users/emergency-contacts/${id}/set-primary/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to set primary contact');
    }

    // Update local state - set all to non-primary except the selected one
    setEmergencyContacts(prev =>
      prev.map(c => ({ ...c, is_primary: c.id === id }))
    );
  } catch (err: any) {
    console.error("Set primary contact failed:", err);
    setError(err.message || "Failed to set primary contact");
    throw err;
  } finally {
    setIsLoading(false);
  }
};
```

**Update context value to include new methods (around line 1200)**:
```typescript
const value = {
  // ... existing values
  emergencyContacts,
  fetchEmergencyContacts,
  addEmergencyContact,
  updateEmergencyContact,
  deleteEmergencyContact,
  setPrimaryEmergencyContact,
};
```

#### 3. Create Emergency Contacts Page Component
**File**: `src/pages/account/EmergencyContactsPage.tsx` (new file)

**Create comprehensive emergency contacts management page**:
```typescript
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../features/auth/authContext';
import { Navigate } from 'react-router-dom';
import {
  EmergencyContact,
  EmergencyContactFormData,
  RELATIONSHIP_OPTIONS,
  validateEmergencyContact
} from '../../types/emergencyContact';
import { Phone, Mail, Star, Edit2, Trash2, Plus, X, AlertCircle } from 'lucide-react';

const EmergencyContactsPage: React.FC = () => {
  const {
    isAuthenticated,
    emergencyContacts,
    fetchEmergencyContacts,
    addEmergencyContact,
    updateEmergencyContact,
    deleteEmergencyContact,
    setPrimaryEmergencyContact,
    isLoading: authLoading,
  } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingContact, setEditingContact] = useState<EmergencyContact | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [formData, setFormData] = useState<EmergencyContactFormData>({
    name: '',
    relationship: '',
    phone: '',
    email: '',
  });

  const [formErrors, setFormErrors] = useState<string[]>([]);

  // Load emergency contacts on mount
  useEffect(() => {
    const loadContacts = async () => {
      try {
        await fetchEmergencyContacts();
      } catch (error) {
        console.error('Failed to load emergency contacts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!authLoading) {
      loadContacts();
    }
  }, [authLoading]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const resetForm = () => {
    setFormData({
      name: '',
      relationship: '',
      phone: '',
      email: '',
    });
    setFormErrors([]);
    setShowAddForm(false);
    setEditingContact(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear errors when user starts typing
    setFormErrors([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    // Validate form
    const errors = validateEmergencyContact(formData);
    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      if (editingContact) {
        // Update existing contact
        await updateEmergencyContact(editingContact.id!, formData);
        setSuccessMessage('Emergency contact updated successfully');
      } else {
        // Add new contact
        await addEmergencyContact(formData);
        setSuccessMessage('Emergency contact added successfully');
      }
      resetForm();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error: any) {
      setErrorMessage(error.message || 'Failed to save emergency contact');
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };

  const handleEdit = (contact: EmergencyContact) => {
    setEditingContact(contact);
    setFormData({
      name: contact.name,
      relationship: contact.relationship,
      phone: contact.phone,
      email: contact.email || '',
    });
    setShowAddForm(true);
    setFormErrors([]);
  };

  const handleDelete = async (id: string) => {
    setSuccessMessage('');
    setErrorMessage('');

    try {
      await deleteEmergencyContact(id);
      setSuccessMessage('Emergency contact deleted successfully');
      setDeleteConfirmId(null);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error: any) {
      setErrorMessage(error.message || 'Failed to delete emergency contact');
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };

  const handleSetPrimary = async (id: string) => {
    setSuccessMessage('');
    setErrorMessage('');

    try {
      await setPrimaryEmergencyContact(id);
      setSuccessMessage('Primary contact updated successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error: any) {
      setErrorMessage(error.message || 'Failed to set primary contact');
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };

  const sortedContacts = [...emergencyContacts].sort((a, b) => {
    // Primary contact first
    if (a.is_primary && !b.is_primary) return -1;
    if (!a.is_primary && b.is_primary) return 1;
    // Then by name
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="bg-white">
      <div className="bg-[#005eb8] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Emergency Contacts</h1>
          <p className="text-xl font-medium">
            Manage your emergency contact information
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        {/* Info Banner */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-800 mb-1">Why add emergency contacts?</h3>
              <p className="text-blue-700 text-sm">
                Emergency contacts are notified in case of medical emergencies and can access
                your essential medical information to help healthcare providers give you the best care.
              </p>
            </div>
          </div>
        </div>

        {/* Success/Error Messages */}
        {successMessage && (
          <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-500 text-green-700">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
            {errorMessage}
          </div>
        )}

        {/* Add Contact Button */}
        {!showAddForm && (
          <div className="mb-6">
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center px-4 py-2 bg-[#005eb8] text-white rounded-md hover:bg-[#004a93] transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Emergency Contact
            </button>
          </div>
        )}

        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {editingContact ? 'Edit Emergency Contact' : 'Add Emergency Contact'}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {formErrors.length > 0 && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <ul className="list-disc list-inside text-red-700 text-sm">
                  {formErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter contact's full name"
                  required
                />
              </div>

              <div>
                <label htmlFor="relationship" className="block text-sm font-medium text-gray-700 mb-1">
                  Relationship <span className="text-red-500">*</span>
                </label>
                <select
                  id="relationship"
                  name="relationship"
                  value={formData.relationship}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select relationship</option>
                  {RELATIONSHIP_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+234 800 000 0000"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address (optional)
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="contact@example.com"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#005eb8] text-white rounded-md hover:bg-[#004a93] transition-colors"
                >
                  {editingContact ? 'Update Contact' : 'Add Contact'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Contacts List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Your Emergency Contacts</h2>

          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#005eb8]"></div>
              <p className="mt-2 text-gray-500">Loading emergency contacts...</p>
            </div>
          ) : sortedContacts.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">No emergency contacts yet</p>
              <p className="text-gray-500 text-sm mt-1">
                Add your first emergency contact to ensure someone can be reached in case of an emergency
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {sortedContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">{contact.name}</h3>
                        {contact.is_primary && (
                          <span className="flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                            <Star className="h-3 w-3 mr-1 fill-current" />
                            Primary
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-3 capitalize">{contact.relationship}</p>

                      <div className="space-y-1">
                        <div className="flex items-center text-gray-700">
                          <Phone className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-sm">{contact.phone}</span>
                        </div>
                        {contact.email && (
                          <div className="flex items-center text-gray-700">
                            <Mail className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="text-sm">{contact.email}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                      {!contact.is_primary && (
                        <button
                          onClick={() => handleSetPrimary(contact.id!)}
                          className="p-2 text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 rounded-md transition-colors"
                          title="Set as primary contact"
                        >
                          <Star className="h-5 w-5" />
                        </button>
                      )}
                      <button
                        onClick={() => handleEdit(contact)}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        title="Edit contact"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(contact.id!)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        title="Delete contact"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Delete Confirmation */}
                  {deleteConfirmId === contact.id && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-red-800 text-sm mb-3">
                        Are you sure you want to delete this emergency contact?
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDelete(contact.id!)}
                          className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
                        >
                          Yes, Delete
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(null)}
                          className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-800 mb-2">Tips for Emergency Contacts</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Add at least one emergency contact who can be easily reached</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Mark your primary contact - this person will be contacted first in emergencies</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Keep contact information up to date</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Inform your emergency contacts that they are listed</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContactsPage;
```

#### 4. Add Route for Emergency Contacts Page
**File**: `src/App.tsx`

**Import the new page (add to imports section, around line 1-50)**:
```typescript
import EmergencyContactsPage from './pages/account/EmergencyContactsPage';
```

**Add route in the account section (around line 632-665)**:
```typescript
{/* Account pages */}
<Route element={<ProtectedRoute />}>
  <Route element={<MainLayout />}>
    <Route path="/account" element={<AccountPage />} />
    <Route path="/account/personal-details" element={<PersonalDetailsPage />} />
    <Route path="/account/contact-preferences" element={<ContactPreferencesPage />} />
    <Route path="/account/emergency-contacts" element={<EmergencyContactsPage />} />  {/* NEW ROUTE */}
    <Route path="/account/password" element={<PasswordPage />} />
    {/* ... other routes */}
  </Route>
</Route>
```

#### 5. Add Button Handler in Onboarding Flow
**File**: `src/features/auth/OnboardingFlow.tsx`

**Add handler function (after `handleUploadRecords`, around line 115)**:
```typescript
// Function to navigate to Emergency Contacts page
const handleEmergencyContacts = (e: React.MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();
  console.log('Navigating to Emergency Contacts page');
  window.location.href = '/account/emergency-contacts';
};
```

**Update button with onClick handler (line 260-262)**:
```typescript
<button
  className="flex-1 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
  onClick={handleEmergencyContacts}
>
  Set up emergency contacts
</button>
```

#### 6. Add Link in Account Page Navigation (Optional but Recommended)
**File**: `src/pages/AccountPage.tsx`

**Add emergency contacts link to account navigation (around line 157-177)**:
```typescript
{/* Add after contact preferences link */}
<Link
  to="/account/emergency-contacts"
  className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
>
  <h3 className="font-semibold text-lg mb-1">Emergency Contacts</h3>
  <p className="text-gray-600 text-sm">
    Manage your emergency contact information
  </p>
</Link>
```

### Success Criteria:

#### Automated Verification:
- [ ] TypeScript compilation passes: `bun run typecheck`
- [ ] No linting errors: `bun run lint`
- [ ] Development server starts without errors: `bun run dev`
- [ ] No console errors when navigating to `/account/emergency-contacts`
- [ ] EmergencyContactsPage component renders without errors

#### Manual Verification:
- [ ] Navigate to `/onboarding`, go to emergency step (step 5)
- [ ] Click "Set up emergency contacts" button → navigates to `/account/emergency-contacts`
- [ ] EmergencyContactsPage loads correctly with empty state
- [ ] Click "Add Emergency Contact" button → form appears
- [ ] Fill out form with valid data → contact is added successfully
- [ ] Verify contact appears in the list
- [ ] Click "Set as primary" on a contact → star icon appears
- [ ] Click "Edit" on a contact → form populates with existing data
- [ ] Update contact information → changes are saved
- [ ] Click "Delete" on a contact → confirmation appears
- [ ] Confirm deletion → contact is removed from list
- [ ] Test form validation by submitting empty form → error messages appear
- [ ] Test phone validation with invalid characters → error message appears
- [ ] Test email validation with invalid format → error message appears
- [ ] Add multiple contacts → all appear in sorted order (primary first, then alphabetical)
- [ ] Navigate back to onboarding → complete flow successfully
- [ ] Verify emergency contacts link appears in `/account` page navigation
- [ ] No JavaScript errors in browser console during any operation

**Implementation Note**: After completing this phase and all automated verification passes, pause here for manual confirmation from the human that the manual testing was successful.

---

## Testing Strategy

### Unit Tests:
*Note: No test framework currently configured. Consider adding Vitest in future.*

Manual testing is primary verification method for this implementation.

### Integration Tests:
- Complete onboarding flow from start to finish
- Test all three buttons in sequence
- Verify navigation works consistently
- Test emergency contacts CRUD operations
- Verify data persistence across page refreshes

### Manual Testing Steps:

**Onboarding Flow Test**:
1. Clear browser cache and localStorage
2. Register a new user account
3. Complete OTP verification
4. Land on onboarding page
5. Navigate through all 6 steps
6. On step 3, click "Find hospitals near me" → verify correct navigation
7. Return to onboarding, continue to step 4
8. On step 4, click "Upload records now" → verify correct navigation
9. Return to onboarding, continue to step 5
10. On step 5, click "Set up emergency contacts" → verify correct navigation
11. Add at least one emergency contact
12. Return to onboarding and complete the flow
13. Verify all features remain accessible from account page

**Emergency Contacts Full Test**:
1. Navigate to `/account/emergency-contacts`
2. Add first contact with all fields → verify success
3. Add second contact with only required fields → verify success
4. Set second contact as primary → verify star appears
5. Edit first contact → verify changes save
6. Try to add contact with invalid phone → verify validation works
7. Try to add contact with invalid email → verify validation works
8. Delete second contact → verify removal
9. Refresh page → verify first contact persists
10. Check browser console for errors → should be none

**Cross-browser Test**:
- Test in Chrome, Firefox, Safari
- Test responsive behavior on mobile
- Verify all buttons work on touch devices

## Performance Considerations

- **Phase 1**: No performance impact - simple navigation changes
- **Phase 2**:
  - Emergency contacts API calls should be cached locally
  - Avoid unnecessary re-fetches when navigating between pages
  - Form validation is client-side (fast)
  - Consider pagination if user has >20 emergency contacts (unlikely)

## Migration Notes

**Data Migration**: Not applicable - no existing data to migrate

**Backend Requirements for Phase 2**:

The backend must implement the following API endpoints:

```
GET    /api/users/emergency-contacts/              - List all emergency contacts for authenticated user
POST   /api/users/emergency-contacts/              - Create new emergency contact
GET    /api/users/emergency-contacts/{id}/         - Get specific emergency contact
PUT    /api/users/emergency-contacts/{id}/         - Update emergency contact
DELETE /api/users/emergency-contacts/{id}/         - Delete emergency contact
POST   /api/users/emergency-contacts/{id}/set-primary/  - Set as primary contact
```

**Expected Request/Response Formats**:

**POST/PUT** `/api/users/emergency-contacts/`:
```json
{
  "name": "John Doe",
  "relationship": "spouse",
  "phone": "+234 800 123 4567",
  "email": "john@example.com"
}
```

**Response** (all endpoints):
```json
{
  "success": true,
  "emergency_contact": {
    "id": "uuid-here",
    "name": "John Doe",
    "relationship": "spouse",
    "phone": "+234 800 123 4567",
    "email": "john@example.com",
    "is_primary": false,
    "created_at": "2025-10-31T12:00:00Z",
    "updated_at": "2025-10-31T12:00:00Z"
  }
}
```

**GET** `/api/users/emergency-contacts/`:
```json
{
  "success": true,
  "emergency_contacts": [
    {
      "id": "uuid-here",
      "name": "John Doe",
      "relationship": "spouse",
      "phone": "+234 800 123 4567",
      "email": "john@example.com",
      "is_primary": true,
      "created_at": "2025-10-31T12:00:00Z",
      "updated_at": "2025-10-31T12:00:00Z"
    }
  ]
}
```

**Backend Implementation Requirements**:
1. Emergency contacts should be linked to authenticated user
2. Phone number validation on backend
3. Email validation on backend (if provided)
4. Only one contact can be marked as primary per user
5. When setting a new primary, unset previous primary automatically
6. Return appropriate HTTP status codes (200, 201, 400, 404, 500)
7. Include proper CORS headers for cookie-based authentication

## References

- Original research: `thoughts/shared/research/2025-10-31-onboarding-non-functional-features.md`
- Onboarding flow documentation: `docs/onboarding-flow.md`
- Emergency contact interface: `src/features/professional/patients/patientTypes.ts:40-45`
- Auth context: `src/features/auth/authContext.tsx`
- Hospital finding page: `src/pages/account/LinkPHBPage.tsx`
- Health records page: `src/pages/account/HealthRecordsPage.tsx`
