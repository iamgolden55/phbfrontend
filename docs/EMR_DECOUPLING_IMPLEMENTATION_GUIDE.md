# EMR System Decoupling Implementation Guide

**Version**: 1.0
**Date**: 2025-12-12
**Status**: Technical Implementation Guide
**Target Audience**: Development Team

---

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Phase 1: White-Label Foundation](#phase-1-white-label-foundation)
4. [Phase 2: API Abstraction & Microservice Separation](#phase-2-api-abstraction--microservice-separation)
5. [Phase 3: Feature Decoupling](#phase-3-feature-decoupling)
6. [Phase 4: Interoperability](#phase-4-interoperability)
7. [Testing Strategy](#testing-strategy)
8. [Deployment Guide](#deployment-guide)
9. [Rollback Plan](#rollback-plan)

---

## Overview

This guide provides step-by-step instructions for decoupling the EMR (Electronic Medical Records) system from the PHB ecosystem to create a standalone, white-label product that can be sold to independent hospitals.

### Goals
- ✅ Remove PHB-specific branding and make system brand-agnostic
- ✅ Decouple shared services (appointments, prescriptions, medical records)
- ✅ Create standalone microservice architecture
- ✅ Enable multi-tenant deployments
- ✅ Maintain backward compatibility with PHB deployment

### Architecture Before & After

**Before (Current State)**:
```
┌─────────────────────────────────────────────────┐
│              PHB Monolithic System              │
├─────────────────────────────────────────────────┤
│  Users  │  Professionals  │  Organizations     │
│         │                 │   (EMR System)      │
└─────────────────────────────────────────────────┘
         │
         ▼
   Single Database
   Single API
   PHB Branding
```

**After (Decoupled State)**:
```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ PHB Patients │  │ PHB Doctors  │  │  Standalone  │
│   System     │  │   System     │  │  EMR System  │
└──────────────┘  └──────────────┘  └──────────────┘
       │                 │                  │
       └─────────────────┴──────────────────┘
                         │
                    ┌────▼────┐
                    │   API   │
                    │ Gateway │
                    └────┬────┘
         ┌──────────────┼──────────────┐
         ▼              ▼              ▼
   ┌─────────┐   ┌──────────┐   ┌──────────┐
   │ Patient │   │  Doctor  │   │ Hospital │
   │   MS    │   │    MS    │   │    MS    │
   └─────────┘   └──────────┘   └──────────┘
```

---

## Prerequisites

### Development Environment
- Node.js 18+
- Python 3.10+
- PostgreSQL 14+
- Docker & Docker Compose
- Git

### Team Requirements
- 2 Backend Developers (Django/Python)
- 2 Frontend Developers (React/TypeScript)
- 1 DevOps Engineer
- 1 QA Engineer

### Access Requirements
- Full access to both frontend and backend repositories
- Database access (dev, staging, production)
- AWS/Cloud infrastructure access
- CI/CD pipeline access

---

## Phase 1: White-Label Foundation

**Duration**: 4-6 weeks
**Priority**: P1 - Critical
**Goal**: Remove PHB branding and create configurable branding system

### Step 1.1: Create Organization Branding Database Schema

**File**: `/Users/new/Newphb/basebackend/api/models/medical/organization_branding.py`

```python
# api/models/medical/organization_branding.py

from django.db import models
from django.core.validators import URLValidator
from .hospital import Hospital

class OrganizationBranding(models.Model):
    """
    Configurable branding for white-label deployments.
    Each hospital can have custom branding, or use deployment-wide defaults.
    """

    # Link to hospital (null = deployment default)
    hospital = models.OneToOneField(
        Hospital,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='branding',
        help_text="Hospital this branding applies to. Null = deployment default."
    )

    # Organization Identity
    organization_name = models.CharField(
        max_length=200,
        default="Hospital Management System",
        help_text="Organization/Hospital name"
    )
    organization_short_name = models.CharField(
        max_length=50,
        default="HMS",
        help_text="Short name/abbreviation (e.g., 'HMS', 'MedTech')"
    )
    tagline = models.CharField(
        max_length=255,
        blank=True,
        help_text="Organization tagline"
    )

    # Visual Branding
    logo_url = models.URLField(
        blank=True,
        null=True,
        help_text="URL to organization logo"
    )
    favicon_url = models.URLField(
        blank=True,
        null=True,
        help_text="URL to favicon"
    )
    primary_color = models.CharField(
        max_length=7,
        default="#0066CC",
        help_text="Primary brand color (hex format: #RRGGBB)"
    )
    secondary_color = models.CharField(
        max_length=7,
        default="#004499",
        help_text="Secondary brand color (hex format: #RRGGBB)"
    )
    accent_color = models.CharField(
        max_length=7,
        default="#FF6600",
        help_text="Accent color (hex format: #RRGGBB)"
    )

    # Contact Information
    contact_email = models.EmailField(
        default="support@hospital.com",
        help_text="General contact email"
    )
    support_email = models.EmailField(
        default="support@hospital.com",
        help_text="Technical support email"
    )
    support_phone = models.CharField(
        max_length=20,
        blank=True,
        help_text="Support phone number"
    )
    helpline_phone = models.CharField(
        max_length=20,
        blank=True,
        help_text="24/7 helpline number"
    )

    # Web Presence
    website_url = models.URLField(
        blank=True,
        validators=[URLValidator()],
        help_text="Organization website"
    )
    terms_url = models.URLField(
        blank=True,
        help_text="Terms of service URL"
    )
    privacy_url = models.URLField(
        blank=True,
        help_text="Privacy policy URL"
    )

    # Social Media
    facebook_url = models.URLField(blank=True)
    twitter_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    instagram_url = models.URLField(blank=True)

    # Legal Information
    company_registration_number = models.CharField(
        max_length=100,
        blank=True,
        help_text="Company registration/license number"
    )
    address = models.TextField(
        blank=True,
        help_text="Registered business address"
    )
    copyright_text = models.CharField(
        max_length=255,
        default="© 2025 Hospital Management System. All rights reserved.",
        help_text="Copyright notice"
    )

    # Feature Flags
    enable_online_booking = models.BooleanField(default=True)
    enable_telemedicine = models.BooleanField(default=False)
    enable_pharmacy = models.BooleanField(default=True)
    enable_lab = models.BooleanField(default=True)
    enable_radiology = models.BooleanField(default=True)

    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Organization Branding"
        verbose_name_plural = "Organization Brandings"

    def __str__(self):
        if self.hospital:
            return f"Branding for {self.hospital.name}"
        return f"Default Branding: {self.organization_name}"

    @classmethod
    def get_default_branding(cls):
        """Get deployment-wide default branding"""
        branding, created = cls.objects.get_or_create(
            hospital=None,
            defaults={
                'organization_name': 'Hospital Management System',
                'organization_short_name': 'HMS'
            }
        )
        return branding

    @classmethod
    def get_branding_for_hospital(cls, hospital):
        """Get branding for specific hospital, fall back to default"""
        try:
            return hospital.branding
        except cls.DoesNotExist:
            return cls.get_default_branding()
```

**Migration**:
```bash
cd /Users/new/Newphb/basebackend
python manage.py makemigrations
python manage.py migrate
```

**Create Initial Data**:
```python
# Create management command: api/management/commands/setup_default_branding.py
from django.core.management.base import BaseCommand
from api.models.medical.organization_branding import OrganizationBranding

class Command(BaseCommand):
    help = 'Setup default branding configuration'

    def handle(self, *args, **options):
        branding = OrganizationBranding.get_default_branding()
        self.stdout.write(
            self.style.SUCCESS(f'Default branding created: {branding.organization_name}')
        )
```

Run:
```bash
python manage.py setup_default_branding
```

---

### Step 1.2: Create Branding API Endpoints

**File**: `/Users/new/Newphb/basebackend/api/views/hospital/branding_views.py`

```python
# api/views/hospital/branding_views.py

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from api.models.medical.organization_branding import OrganizationBranding
from api.serializers import OrganizationBrandingSerializer

class OrganizationBrandingViewSet(viewsets.ModelViewSet):
    """
    API endpoints for organization branding management
    """
    queryset = OrganizationBranding.objects.all()
    serializer_class = OrganizationBrandingSerializer

    def get_permissions(self):
        if self.action in ['retrieve', 'public_branding']:
            return [AllowAny()]
        return [IsAuthenticated()]

    @action(detail=False, methods=['get'], permission_classes=[AllowAny])
    def public_branding(self, request):
        """
        Get public branding information (no authentication required)
        Used by login pages, public pages, etc.
        """
        hospital_id = request.query_params.get('hospital_id')

        if hospital_id:
            try:
                hospital = Hospital.objects.get(id=hospital_id)
                branding = OrganizationBranding.get_branding_for_hospital(hospital)
            except Hospital.DoesNotExist:
                branding = OrganizationBranding.get_default_branding()
        else:
            branding = OrganizationBranding.get_default_branding()

        serializer = self.get_serializer(branding)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def my_branding(self, request):
        """
        Get branding for currently authenticated hospital admin
        """
        if not hasattr(request.user, 'hospital_admin_profile'):
            return Response(
                {'error': 'User is not a hospital admin'},
                status=status.HTTP_403_FORBIDDEN
            )

        hospital = request.user.hospital_admin_profile.hospital
        branding = OrganizationBranding.get_branding_for_hospital(hospital)
        serializer = self.get_serializer(branding)
        return Response(serializer.data)

    @action(detail=False, methods=['post', 'put'])
    def update_my_branding(self, request):
        """
        Update branding for currently authenticated hospital
        """
        if not hasattr(request.user, 'hospital_admin_profile'):
            return Response(
                {'error': 'User is not a hospital admin'},
                status=status.HTTP_403_FORBIDDEN
            )

        hospital = request.user.hospital_admin_profile.hospital

        try:
            branding = hospital.branding
            serializer = self.get_serializer(branding, data=request.data, partial=True)
        except OrganizationBranding.DoesNotExist:
            data = request.data.copy()
            data['hospital'] = hospital.id
            serializer = self.get_serializer(data=data)

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)
```

**Add to URLs** (`api/urls.py`):
```python
from api.views.hospital.branding_views import OrganizationBrandingViewSet

# In router section
router.register(r'branding', OrganizationBrandingViewSet, basename='branding')
```

**API Endpoints**:
- `GET /api/branding/public_branding/` - Get public branding (no auth)
- `GET /api/branding/my_branding/` - Get authenticated hospital's branding
- `POST /api/branding/update_my_branding/` - Update hospital branding

---

### Step 1.3: Create Frontend Branding Context

**File**: `/Users/new/phbfinal/phbfrontend/src/contexts/BrandingContext.tsx`

```typescript
// src/contexts/BrandingContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../utils/config';

export interface BrandingConfig {
  organizationName: string;
  organizationShortName: string;
  tagline: string;
  logoUrl: string;
  faviconUrl: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  contactEmail: string;
  supportEmail: string;
  supportPhone: string;
  helplinePhone: string;
  websiteUrl: string;
  termsUrl: string;
  privacyUrl: string;
  facebookUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  copyrightText: string;
  enableOnlineBooking: boolean;
  enableTelemedicine: boolean;
  enablePharmacy: boolean;
  enableLab: boolean;
  enableRadiology: boolean;
}

interface BrandingContextType {
  branding: BrandingConfig | null;
  loading: boolean;
  error: string | null;
  refreshBranding: () => Promise<void>;
}

const defaultBranding: BrandingConfig = {
  organizationName: 'Hospital Management System',
  organizationShortName: 'HMS',
  tagline: '',
  logoUrl: '',
  faviconUrl: '',
  primaryColor: '#0066CC',
  secondaryColor: '#004499',
  accentColor: '#FF6600',
  contactEmail: 'support@hospital.com',
  supportEmail: 'support@hospital.com',
  supportPhone: '',
  helplinePhone: '',
  websiteUrl: '',
  termsUrl: '',
  privacyUrl: '',
  facebookUrl: '',
  twitterUrl: '',
  linkedinUrl: '',
  instagramUrl: '',
  copyrightText: '© 2025 Hospital Management System. All rights reserved.',
  enableOnlineBooking: true,
  enableTelemedicine: false,
  enablePharmacy: true,
  enableLab: true,
  enableRadiology: true,
};

const BrandingContext = createContext<BrandingContextType>({
  branding: defaultBranding,
  loading: false,
  error: null,
  refreshBranding: async () => {},
});

export const useBranding = () => {
  const context = useContext(BrandingContext);
  if (!context) {
    throw new Error('useBranding must be used within BrandingProvider');
  }
  return context;
};

interface BrandingProviderProps {
  children: React.ReactNode;
  hospitalId?: string;
}

export const BrandingProvider: React.FC<BrandingProviderProps> = ({
  children,
  hospitalId
}) => {
  const [branding, setBranding] = useState<BrandingConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBranding = async () => {
    try {
      setLoading(true);
      setError(null);

      const url = hospitalId
        ? `${API_BASE_URL}/branding/public_branding/?hospital_id=${hospitalId}`
        : `${API_BASE_URL}/branding/public_branding/`;

      const response = await axios.get(url);

      // Convert snake_case from API to camelCase for frontend
      const brandingData: BrandingConfig = {
        organizationName: response.data.organization_name,
        organizationShortName: response.data.organization_short_name,
        tagline: response.data.tagline || '',
        logoUrl: response.data.logo_url || '',
        faviconUrl: response.data.favicon_url || '',
        primaryColor: response.data.primary_color,
        secondaryColor: response.data.secondary_color,
        accentColor: response.data.accent_color,
        contactEmail: response.data.contact_email,
        supportEmail: response.data.support_email,
        supportPhone: response.data.support_phone || '',
        helplinePhone: response.data.helpline_phone || '',
        websiteUrl: response.data.website_url || '',
        termsUrl: response.data.terms_url || '',
        privacyUrl: response.data.privacy_url || '',
        facebookUrl: response.data.facebook_url || '',
        twitterUrl: response.data.twitter_url || '',
        linkedinUrl: response.data.linkedin_url || '',
        instagramUrl: response.data.instagram_url || '',
        copyrightText: response.data.copyright_text,
        enableOnlineBooking: response.data.enable_online_booking,
        enableTelemedicine: response.data.enable_telemedicine,
        enablePharmacy: response.data.enable_pharmacy,
        enableLab: response.data.enable_lab,
        enableRadiology: response.data.enable_radiology,
      };

      setBranding(brandingData);

      // Apply branding to document
      applyBrandingToDocument(brandingData);
    } catch (err) {
      console.error('Failed to fetch branding:', err);
      setError('Failed to load branding configuration');
      setBranding(defaultBranding);
      applyBrandingToDocument(defaultBranding);
    } finally {
      setLoading(false);
    }
  };

  const applyBrandingToDocument = (config: BrandingConfig) => {
    // Update document title
    document.title = config.organizationName;

    // Update favicon
    if (config.faviconUrl) {
      const favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement;
      if (favicon) {
        favicon.href = config.faviconUrl;
      }
    }

    // Update CSS variables for theming
    document.documentElement.style.setProperty('--brand-primary', config.primaryColor);
    document.documentElement.style.setProperty('--brand-secondary', config.secondaryColor);
    document.documentElement.style.setProperty('--brand-accent', config.accentColor);

    // Update meta tags
    const metaTags = [
      { name: 'description', content: `${config.organizationName} - Healthcare Management Platform` },
      { property: 'og:title', content: config.organizationName },
      { property: 'og:site_name', content: config.organizationName },
      { name: 'twitter:title', content: config.organizationName },
    ];

    metaTags.forEach(({ name, property, content }) => {
      const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
      const meta = document.querySelector(selector) as HTMLMetaElement;
      if (meta) {
        meta.content = content;
      }
    });
  };

  useEffect(() => {
    fetchBranding();
  }, [hospitalId]);

  return (
    <BrandingContext.Provider
      value={{
        branding,
        loading,
        error,
        refreshBranding: fetchBranding,
      }}
    >
      {children}
    </BrandingContext.Provider>
  );
};
```

---

### Step 1.4: Replace PHB Logo Component

**File**: `/Users/new/phbfinal/phbfrontend/src/components/Logo.tsx`

```typescript
// src/components/Logo.tsx

import React from 'react';
import { useBranding } from '../contexts/BrandingContext';

interface LogoProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'medium',
  showText = true
}) => {
  const { branding } = useBranding();

  const sizeClasses = {
    small: 'h-8',
    medium: 'h-12',
    large: 'h-16',
  };

  const textSizeClasses = {
    small: 'text-lg',
    medium: 'text-2xl',
    large: 'text-3xl',
  };

  if (!branding) {
    return (
      <div className={`flex items-center ${className}`}>
        <div className={`${sizeClasses[size]} w-auto bg-gray-200 animate-pulse rounded`} />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {branding.logoUrl ? (
        <img
          src={branding.logoUrl}
          alt={`${branding.organizationName} Logo`}
          className={`${sizeClasses[size]} w-auto object-contain`}
        />
      ) : (
        <div
          className={`${sizeClasses[size]} w-auto px-4 rounded-lg flex items-center justify-center font-bold text-white`}
          style={{ backgroundColor: branding.primaryColor }}
        >
          {branding.organizationShortName}
        </div>
      )}

      {showText && (
        <div className="flex flex-col">
          <span
            className={`font-bold ${textSizeClasses[size]}`}
            style={{ color: branding.primaryColor }}
          >
            {branding.organizationName}
          </span>
          {branding.tagline && size !== 'small' && (
            <span className="text-xs text-gray-600">{branding.tagline}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;
```

**Replace Old PHBLogo**:
```bash
# Find all imports of PHBLogo and replace with Logo
cd /Users/new/phbfinal/phbfrontend
grep -r "import.*PHBLogo" src/ --files-with-matches | xargs sed -i '' 's/PHBLogo/Logo/g'
grep -r "from.*PHBLogo" src/ --files-with-matches | xargs sed -i '' 's/PHBLogo/Logo/g'
```

---

### Step 1.5: Update Header Component

**File**: `/Users/new/phbfinal/phbfrontend/src/components/Header.tsx`

Replace PHB-specific content with branding context:

```typescript
// src/components/Header.tsx (key changes)

import { useBranding } from '../contexts/BrandingContext';
import Logo from './Logo';

const Header: React.FC = () => {
  const { branding } = useBranding();

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Logo size="medium" showText={true} />

        {/* Navigation */}
        <nav>
          {/* ... navigation items ... */}
        </nav>

        {/* Contact Info - use branding */}
        {branding?.supportPhone && (
          <div className="text-sm text-gray-600">
            Support: {branding.supportPhone}
          </div>
        )}
      </div>
    </header>
  );
};
```

---

### Step 1.6: Update Footer Component

**File**: `/Users/new/phbfinal/phbfrontend/src/components/Footer.tsx`

```typescript
// src/components/Footer.tsx (key changes)

import { useBranding } from '../contexts/BrandingContext';
import Logo from './Logo';

const Footer: React.FC = () => {
  const { branding } = useBranding();

  if (!branding) return null;

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div>
            <Logo size="small" showText={true} className="mb-4" />
            <p className="text-gray-400 text-sm">
              {branding.tagline || `${branding.organizationName} - Healthcare Management Platform`}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {branding.websiteUrl && (
                <li>
                  <a href={branding.websiteUrl} className="text-gray-400 hover:text-white">
                    About Us
                  </a>
                </li>
              )}
              {branding.termsUrl && (
                <li>
                  <a href={branding.termsUrl} className="text-gray-400 hover:text-white">
                    Terms of Service
                  </a>
                </li>
              )}
              {branding.privacyUrl && (
                <li>
                  <a href={branding.privacyUrl} className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Email: {branding.contactEmail}</li>
              <li>Support: {branding.supportEmail}</li>
              {branding.supportPhone && <li>Phone: {branding.supportPhone}</li>}
              {branding.helplinePhone && <li>Helpline: {branding.helplinePhone}</li>}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              {branding.facebookUrl && (
                <a href={branding.facebookUrl} target="_blank" rel="noopener noreferrer">
                  {/* Facebook icon */}
                </a>
              )}
              {branding.twitterUrl && (
                <a href={branding.twitterUrl} target="_blank" rel="noopener noreferrer">
                  {/* Twitter icon */}
                </a>
              )}
              {branding.linkedinUrl && (
                <a href={branding.linkedinUrl} target="_blank" rel="noopener noreferrer">
                  {/* LinkedIn icon */}
                </a>
              )}
              {branding.instagramUrl && (
                <a href={branding.instagramUrl} target="_blank" rel="noopener noreferrer">
                  {/* Instagram icon */}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          {branding.copyrightText}
        </div>
      </div>
    </footer>
  );
};
```

---

### Step 1.7: Update Organization Layouts

**File**: `/Users/new/phbfinal/phbfrontend/src/layouts/OrganizationLayout.tsx`

```typescript
// src/layouts/OrganizationLayout.tsx (key changes)

import { useBranding } from '../contexts/BrandingContext';
import Logo from '../components/Logo';

const OrganizationLayout: React.FC = () => {
  const { branding } = useBranding();
  const { userData } = useOrganizationAuth();

  // Get organization type display
  const formattedType = userData?.hospital?.hospital_type
    ? userData.hospital.hospital_type.charAt(0).toUpperCase() + userData.hospital.hospital_type.slice(1)
    : 'Organization';

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Replace PHB branding */}
          <Logo size="medium" showText={true} />

          {/* Organization Type Badge */}
          <div className="text-sm font-medium" style={{ color: branding?.primaryColor }}>
            {branding?.organizationName} {formattedType}
          </div>

          {/* ... rest of header ... */}
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-gray-100 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          {branding?.copyrightText || `© 2025 ${branding?.organizationName}. All rights reserved.`}
        </div>
      </footer>
    </div>
  );
};
```

---

### Step 1.8: Update App.tsx with BrandingProvider

**File**: `/Users/new/phbfinal/phbfrontend/src/App.tsx`

```typescript
// src/App.tsx

import { BrandingProvider } from './contexts/BrandingContext';

function App() {
  return (
    <BrandingProvider>
      <AuthProvider>
        <ProfessionalAuthProvider>
          <OrganizationAuthProvider>
            <Router>
              {/* ... routes ... */}
            </Router>
          </OrganizationAuthProvider>
        </ProfessionalAuthProvider>
      </AuthProvider>
    </BrandingProvider>
  );
}
```

---

### Step 1.9: Update Environment Variables

**File**: `/Users/new/phbfinal/phbfrontend/.env.example`

Add branding configuration:

```bash
# Branding Configuration (Optional - overrides database settings)
VITE_ORG_NAME=Hospital Management System
VITE_ORG_SHORT_NAME=HMS
VITE_ORG_LOGO_URL=
VITE_PRIMARY_COLOR=#0066CC
VITE_CONTACT_EMAIL=support@hospital.com
VITE_SUPPORT_PHONE=
```

---

### Step 1.10: Testing White-Label System

**Create Test Script**: `scripts/test-white-label.sh`

```bash
#!/bin/bash

# Test white-label branding

echo "Testing White-Label Branding System..."

# Test 1: Create custom branding via API
echo "Test 1: Creating custom branding..."
curl -X POST http://localhost:8000/api/branding/public_branding/ \
  -H "Content-Type: application/json" \
  -d '{
    "organization_name": "St. Mary Hospital",
    "organization_short_name": "SMH",
    "primary_color": "#FF0000",
    "contact_email": "contact@stmary.com"
  }'

# Test 2: Fetch branding
echo "\nTest 2: Fetching branding..."
curl http://localhost:8000/api/branding/public_branding/

# Test 3: Test frontend with custom branding
echo "\nTest 3: Starting frontend with custom branding..."
cd /Users/new/phbfinal/phbfrontend
VITE_ORG_NAME="St. Mary Hospital" bun run dev

echo "\nWhite-label testing complete!"
```

---

## Phase 2: API Abstraction & Microservice Separation

**Duration**: 6-8 weeks
**Priority**: P1 - Critical
**Goal**: Separate hospital EMR into standalone microservice

### Step 2.1: Create Hospital Microservice Project Structure

```bash
mkdir -p /Users/new/hospital-emr-microservice
cd /Users/new/hospital-emr-microservice

# Initialize Django project
django-admin startproject hospital_emr .
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install django djangorestframework django-cors-headers psycopg2-binary \
  celery redis python-dotenv pyjwt requests
```

**Project Structure**:
```
hospital-emr-microservice/
├── hospital_emr/          # Django project
│   ├── settings/
│   │   ├── base.py
│   │   ├── development.py
│   │   └── production.py
│   ├── urls.py
│   └── wsgi.py
├── apps/
│   ├── hospitals/         # Hospital management
│   ├── departments/       # Department management
│   ├── admissions/        # Patient admissions
│   ├── staff/             # Staff management
│   ├── billing/           # Billing operations
│   └── auth/              # Authentication
├── common/                # Shared utilities
│   ├── permissions.py
│   ├── pagination.py
│   └── exceptions.py
├── docker/
│   ├── Dockerfile
│   └── docker-compose.yml
├── requirements.txt
└── manage.py
```

---

### Step 2.2: Extract Hospital Models to Microservice

Copy models from main backend:

```bash
# Copy hospital models
cp /Users/new/Newphb/basebackend/api/models/medical/hospital.py \
   /Users/new/hospital-emr-microservice/apps/hospitals/models.py

# Copy department models
cp /Users/new/Newphb/basebackend/api/models/medical/department.py \
   /Users/new/hospital-emr-microservice/apps/departments/models.py

# Copy admission models
cp /Users/new/Newphb/basebackend/api/models/medical/admission.py \
   /Users/new/hospital-emr-microservice/apps/admissions/models.py
```

**Update Models** - Remove PHB-specific dependencies:

```python
# apps/hospitals/models.py

from django.db import models
from django.conf import settings
import uuid

class Hospital(models.Model):
    """
    Standalone Hospital model (PHB-independent)
    """
    # Keep all existing fields from original Hospital model
    # ... (same as before)

    # REMOVE: user = models.ForeignKey(settings.AUTH_USER_MODEL...)
    # REPLACE with:
    admin_user_id = models.CharField(
        max_length=100,
        null=True,
        blank=True,
        help_text="Reference to admin user (can be from external auth system)"
    )

    # Add external system references
    external_system_id = models.CharField(
        max_length=255,
        null=True,
        blank=True,
        help_text="ID in external system (e.g., PHB system)"
    )
    external_system_type = models.CharField(
        max_length=50,
        null=True,
        blank=True,
        choices=[
            ('phb', 'PHB System'),
            ('standalone', 'Standalone'),
            ('custom', 'Custom Integration')
        ],
        default='standalone'
    )
```

---

### Step 2.3: Create Standalone Authentication

**File**: `apps/auth/models.py`

```python
# apps/auth/models.py

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
import uuid

class HospitalUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email is required')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class HospitalUser(AbstractBaseUser, PermissionsMixin):
    """
    Standalone user model for hospital EMR system
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)

    # Hospital affiliation
    hospital = models.ForeignKey(
        'hospitals.Hospital',
        on_delete=models.CASCADE,
        related_name='users',
        null=True,
        blank=True
    )

    # Role
    ROLE_CHOICES = [
        ('hospital_admin', 'Hospital Administrator'),
        ('doctor', 'Doctor'),
        ('nurse', 'Nurse'),
        ('pharmacist', 'Pharmacist'),
        ('lab_tech', 'Lab Technician'),
        ('radiologist', 'Radiologist'),
        ('receptionist', 'Receptionist'),
        ('billing', 'Billing Staff'),
    ]
    role = models.CharField(max_length=50, choices=ROLE_CHOICES)

    # Status
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)

    # 2FA
    otp_secret = models.CharField(max_length=100, blank=True, null=True)
    otp_required_for_login = models.BooleanField(default=False)

    # Timestamps
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(null=True, blank=True)

    objects = HospitalUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.email})"

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"
```

---

### Step 2.4: Create API Gateway

**Project**: Create separate API Gateway service

```bash
mkdir -p /Users/new/hospital-api-gateway
cd /Users/new/hospital-api-gateway

# Initialize Node.js/Express gateway
npm init -y
npm install express http-proxy-middleware cors dotenv jsonwebtoken helmet
```

**File**: `server.js`

```javascript
// server.js - API Gateway

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

// Security
app.use(helmet());
app.use(cors());
app.use(express.json());

// Service endpoints
const SERVICES = {
  hospital: process.env.HOSPITAL_SERVICE_URL || 'http://localhost:8001',
  patients: process.env.PATIENTS_SERVICE_URL || 'http://localhost:8002',
  appointments: process.env.APPOINTMENTS_SERVICE_URL || 'http://localhost:8003',
  phb: process.env.PHB_SERVICE_URL || 'http://localhost:8000',
};

// Routing logic
app.use('/api/hospitals', createProxyMiddleware({
  target: SERVICES.hospital,
  changeOrigin: true,
  pathRewrite: { '^/api/hospitals': '/api/v1/hospitals' },
}));

app.use('/api/departments', createProxyMiddleware({
  target: SERVICES.hospital,
  changeOrigin: true,
  pathRewrite: { '^/api/departments': '/api/v1/departments' },
}));

app.use('/api/admissions', createProxyMiddleware({
  target: SERVICES.hospital,
  changeOrigin: true,
  pathRewrite: { '^/api/admissions': '/api/v1/admissions' },
}));

app.use('/api/staff', createProxyMiddleware({
  target: SERVICES.hospital,
  changeOrigin: true,
  pathRewrite: { '^/api/staff': '/api/v1/staff' },
}));

// Optional: Route to PHB services if enabled
app.use('/api/phb/appointments', createProxyMiddleware({
  target: SERVICES.phb,
  changeOrigin: true,
  pathRewrite: { '^/api/phb/appointments': '/api/appointments' },
  onProxyReq: (proxyReq, req, res) => {
    // Only proxy if PHB integration is enabled
    if (!process.env.ENABLE_PHB_INTEGRATION) {
      res.status(503).json({ error: 'PHB integration not enabled' });
      return;
    }
  },
}));

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    services: SERVICES,
    timestamp: new Date().toISOString(),
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
```

**File**: `.env`

```bash
PORT=8080
HOSPITAL_SERVICE_URL=http://localhost:8001
PATIENTS_SERVICE_URL=http://localhost:8002
APPOINTMENTS_SERVICE_URL=http://localhost:8003
PHB_SERVICE_URL=http://localhost:8000

# Feature flags
ENABLE_PHB_INTEGRATION=false
```

---

### Step 2.5: Create Service Abstraction Layer

**File**: `/Users/new/phbfinal/phbfrontend/src/services/abstractions/PatientServiceAbstraction.ts`

```typescript
// src/services/abstractions/PatientServiceAbstraction.ts

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  email?: string;
  phone?: string;
  address?: string;
  // ... other fields
}

export interface PatientServiceInterface {
  searchPatients(query: string): Promise<Patient[]>;
  getPatientById(patientId: string): Promise<Patient>;
  createPatient(data: Partial<Patient>): Promise<Patient>;
  updatePatient(patientId: string, data: Partial<Patient>): Promise<Patient>;
  deletePatient(patientId: string): Promise<void>;
}

// Local implementation (standalone EMR)
export class LocalPatientService implements PatientServiceInterface {
  private apiUrl = '/api/v1/patients';

  async searchPatients(query: string): Promise<Patient[]> {
    const response = await fetch(`${this.apiUrl}/search?q=${query}`);
    return response.json();
  }

  async getPatientById(patientId: string): Promise<Patient> {
    const response = await fetch(`${this.apiUrl}/${patientId}`);
    return response.json();
  }

  async createPatient(data: Partial<Patient>): Promise<Patient> {
    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async updatePatient(patientId: string, data: Partial<Patient>): Promise<Patient> {
    const response = await fetch(`${this.apiUrl}/${patientId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async deletePatient(patientId: string): Promise<void> {
    await fetch(`${this.apiUrl}/${patientId}`, { method: 'DELETE' });
  }
}

// PHB integration implementation (optional plugin)
export class PHBPatientService implements PatientServiceInterface {
  private apiUrl = '/api/phb/registry';

  async searchPatients(query: string): Promise<Patient[]> {
    // Search in PHB registry
    const response = await fetch(`${this.apiUrl}/search?hpn=${query}`);
    const phbPatients = await response.json();

    // Map PHB format to local format
    return phbPatients.map(this.mapPHBPatient);
  }

  async getPatientById(patientId: string): Promise<Patient> {
    const response = await fetch(`${this.apiUrl}/${patientId}`);
    const phbPatient = await response.json();
    return this.mapPHBPatient(phbPatient);
  }

  private mapPHBPatient(phbPatient: any): Patient {
    // Convert PHB patient format to local format
    return {
      id: phbPatient.user_id,
      firstName: phbPatient.first_name,
      lastName: phbPatient.last_name,
      dateOfBirth: phbPatient.date_of_birth,
      gender: phbPatient.gender,
      email: phbPatient.email,
      phone: phbPatient.phone,
      address: phbPatient.address,
    };
  }

  // PHB registry doesn't allow creation/deletion
  async createPatient(data: Partial<Patient>): Promise<Patient> {
    throw new Error('Cannot create patients in PHB registry. Patients must register through PHB.');
  }

  async updatePatient(patientId: string, data: Partial<Patient>): Promise<Patient> {
    throw new Error('Cannot update PHB registry patients from EMR.');
  }

  async deletePatient(patientId: string): Promise<void> {
    throw new Error('Cannot delete PHB registry patients from EMR.');
  }
}

// Service factory
export class PatientServiceFactory {
  private static instance: PatientServiceInterface;

  static getService(): PatientServiceInterface {
    if (!this.instance) {
      const enablePHBIntegration = import.meta.env.VITE_ENABLE_PHB_INTEGRATION === 'true';

      this.instance = enablePHBIntegration
        ? new PHBPatientService()
        : new LocalPatientService();
    }

    return this.instance;
  }

  static resetService() {
    this.instance = null as any;
  }
}

// Usage in components
export const patientService = PatientServiceFactory.getService();
```

---

**(Continued in next section due to length...)**

This guide continues with:
- Phase 3: Feature Decoupling (appointments, prescriptions, medical records)
- Phase 4: Interoperability (HL7 FHIR, DICOM)
- Testing strategies
- Deployment guide
- Rollback plan

Would you like me to continue with the remaining phases, or shall I now create the NHS market entry documentation?
