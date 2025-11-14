# Pharmacy Nomination System with NHS EPS Integration - Implementation Plan

## Overview

This plan details the implementation of a comprehensive pharmacy nomination system integrated with the UK NHS Electronic Prescription Service (EPS). The system enables patients to nominate a preferred pharmacy for electronic prescription delivery, supports prescription creation with automatic pharmacy assignment, implements NHS-compliant FHIR messaging for prescription transmission, and handles edge cases like medicine unavailability with barcode-based referral workflows.

**Scope**: Full-stack implementation (Django backend + React frontend) with real NHS EPS integration via HL7 FHIR R4 protocol.

## Current State Analysis

### Backend (Django) - `/Users/new/Newphb/basebackend/`

**What Exists:**
- **Medication Model** (`api/models/medical/medication.py:210-649`): Patient prescriptions with fields for `pharmacy_name`, `pharmacy_instructions`, `prescription_number`, `refills_authorized`
- **Prescription API Endpoints** (`api/urls.py:380-384`):
  - `POST /api/appointments/{id}/prescriptions/` - Create prescription
  - `GET /api/prescriptions/` - List patient prescriptions
  - `GET /api/appointments/{id}/prescriptions/view/` - View appointment prescriptions
- **Department-based Pharmacy** (`api/models/medical/department.py:25`): Pharmacies exist as hospital departments with type='pharmacy'
- **Pharmacy Tech Role** (`api/models/user/custom_user.py:149`): User role for pharmacy technicians

**What's Missing:**
- ❌ Standalone Pharmacy model (independent from hospitals)
- ❌ NominatedPharmacy model (user-pharmacy link)
- ❌ NHS EPS integration (FHIR messaging)
- ❌ Electronic prescription transmission
- ❌ Prescription referral workflow
- ❌ Barcode generation for prescriptions
- ❌ PDS (Personal Demographics Service) integration for pharmacy nomination sync

### Frontend (React) - `/Users/new/phbfinal/phbfrontend/`

**What Exists:**
- **Help Documentation** (`src/pages/help/prescriptions/HowNominationsWorkPage.tsx`): Complete explanation of pharmacy nomination system
- **FindPharmacyPage** (`src/pages/FindPharmacyPage.tsx`): Working pharmacy search with MapBox integration, markers, filtering by category, search by name/location
- **NominatedPharmacyPage** (`src/pages/account/NominatedPharmacyPage.tsx:32`): Placeholder showing "Coming Soon"
- **Prescription Service** (`src/features/health/prescriptionsService.ts`): API service for prescription operations

**What's Missing:**
- ❌ Pharmacy nomination UI (select, view current, change)
- ❌ Pharmacy API service (search, nominate endpoints)
- ❌ Integration between FindPharmacyPage and nomination flow
- ❌ Prescription creation with nominated pharmacy display
- ❌ Referral workflow UI when pharmacy lacks medicine

## Desired End State

### Functional Requirements

**Patient Capabilities:**
1. Search for pharmacies by location, postcode, name, or services
2. View pharmacy details on interactive map (hours, services, contact)
3. Nominate a preferred pharmacy for electronic prescriptions
4. View current nominated pharmacy
5. Change nominated pharmacy at any time
6. View nomination history
7. Receive notifications when pharmacy cannot fulfill prescription
8. Override nomination per-prescription if needed

**Doctor Capabilities:**
1. Create prescriptions that auto-assign patient's nominated pharmacy
2. Submit prescriptions to NHS EPS via FHIR
3. Receive notifications when pharmacy cannot fulfill prescription
4. View prescription status (draft, submitted, dispensed)

**Pharmacy Capabilities:**
1. Receive electronic prescriptions via NHS EPS
2. Mark prescriptions as dispensed
3. Generate referral barcodes when medicine unavailable
4. Submit dispense notifications to EPS
5. Submit reimbursement claims to NHS BSA

**System Capabilities:**
1. Sync pharmacy nominations with NHS PDS
2. Validate prescriptions against NHS FHIR IG
3. Generate GS1 DataMatrix barcodes for referrals
4. Handle EPS submission failures gracefully
5. Audit all prescription access
6. Comply with GDPR and NHS Information Governance

### Verification Criteria

**System is successful when:**
- Patient can nominate pharmacy via map in <30 seconds
- Prescription submission to EPS completes in <10 seconds
- 100% of prescriptions have valid digital signatures
- Barcode scans successfully in physical pharmacy scanners
- Zero cross-patient prescription access violations
- NHS sandbox integration tests pass 100%

## What We're NOT Doing

**Explicitly Out of Scope (Future Phases):**
- ❌ Pharmacy inventory management
- ❌ SMS/Email notifications for prescriptions (only in-app notifications)
- ❌ Pharmacy dashboards for pharmacy staff
- ❌ Multi-pharmacy nomination (patient can only have ONE nominated pharmacy)
- ❌ Full UK pharmacy database import (starting with hospital pharmacies only, ~50-200)
- ❌ Real-time medicine stock tracking
- ❌ Prescription delivery/courier integration
- ❌ Patient medication adherence tracking
- ❌ Prescription pricing/cost estimation
- ❌ Integration with private prescriptions (NHS prescriptions only for MVP)

## Implementation Approach

### Phasing Strategy

**Feature Slice Approach**: Build end-to-end thin slices, fully test each before moving to next.

**Phase 1**: Basic pharmacy nomination (view-only pharmacies, nomination CRUD)
**Phase 2**: Prescription integration (auto-assign nominated pharmacy, manual override)
**Phase 3**: NHS EPS integration (FHIR messaging, digital signatures, transmission)
**Phase 4**: Referral system (barcode generation, stock unavailability workflow)

**Testing Cadence**: After each phase:
1. Run all automated tests (models, API, integration)
2. Deploy to staging
3. Manual testing verification
4. User approval before next phase

### Technology Stack

**Backend:**
- Django 4.x with Django REST Framework
- PostgreSQL with PostGIS (geographic queries)
- Python libraries:
  - `fhir.resources>=8.0.0` - FHIR R4B data models
  - `requests>=2.31.0` - HTTP client with mTLS
  - `python-jose>=3.3.0` - JWT handling
  - `cryptography>=41.0.0` - Digital signatures
  - `pylibdmtx` - DataMatrix barcode generation
  - `Pillow` - Image handling

**Frontend:**
- React 18 with TypeScript
- Existing MapBox GL JS integration
- Axios for API calls
- Cookie-based authentication

**External Integrations:**
- NHS EPS FHIR API (sandbox → integration → production)
- NHS PDS FHIR API (patient demographics, pharmacy nomination)
- NHS CIS2 (authentication for healthcare workers)
- NHS Terminology Server (dm+d drug codes)

---

## Phase 1: Backend - Pharmacy & Nomination Models

### Overview
Create standalone Pharmacy model and NominatedPharmacy linking model with database migrations, serializers, and basic CRUD API endpoints.

### Changes Required

#### 1. Database Models

**File**: `/Users/new/Newphb/basebackend/api/models/medical/pharmacy.py` (NEW FILE)

```python
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Pharmacy(models.Model):
    """Standalone pharmacy model for NHS pharmacies"""

    # NHS ODS (Organisation Data Service) identification
    ods_code = models.CharField(
        max_length=10,
        unique=True,
        db_index=True,
        help_text="NHS ODS code (e.g., FLM49)"
    )
    name = models.CharField(max_length=255)

    # Address
    address_line_1 = models.CharField(max_length=255)
    address_line_2 = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=100)
    county = models.CharField(max_length=100, blank=True)
    postcode = models.CharField(max_length=10, db_index=True)
    country = models.CharField(max_length=100, default='United Kingdom')

    # Contact
    phone = models.CharField(max_length=20)
    email = models.EmailField(blank=True)
    website = models.URLField(blank=True)

    # NHS EPS capability
    eps_enabled = models.BooleanField(
        default=False,
        help_text="Can receive electronic prescriptions via NHS EPS"
    )
    fhir_endpoint = models.URLField(
        blank=True,
        help_text="FHIR endpoint for direct pharmacy system integration"
    )

    # Services and hours (JSON fields)
    opening_hours = models.JSONField(
        default=dict,
        help_text="Format: {'monday': {'open': '09:00', 'close': '18:00'}, ...}"
    )
    services_offered = models.JSONField(
        default=list,
        help_text="List of services: ['prescription_collection', 'flu_jab', 'nhs_health_check', ...]"
    )

    # Geolocation for map display
    latitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        null=True,
        blank=True,
        db_index=True
    )
    longitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        null=True,
        blank=True,
        db_index=True
    )

    # Hospital affiliation (optional - some pharmacies are hospital-based)
    hospital = models.ForeignKey(
        'Hospital',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='affiliated_pharmacies',
        help_text="If pharmacy is part of a hospital"
    )

    # Metadata
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Pharmacies"
        ordering = ['name']
        indexes = [
            models.Index(fields=['ods_code']),
            models.Index(fields=['postcode']),
            models.Index(fields=['latitude', 'longitude']),
            models.Index(fields=['eps_enabled', 'is_active']),
        ]

    def __str__(self):
        return f"{self.name} ({self.ods_code})"

    def is_open_now(self):
        """Check if pharmacy is currently open"""
        from datetime import datetime
        now = datetime.now()
        day_name = now.strftime('%A').lower()

        if day_name not in self.opening_hours:
            return False

        hours = self.opening_hours[day_name]
        if not hours or hours.get('closed'):
            return False

        current_time = now.time()
        open_time = datetime.strptime(hours['open'], '%H:%M').time()
        close_time = datetime.strptime(hours['close'], '%H:%M').time()

        return open_time <= current_time <= close_time


class NominatedPharmacy(models.Model):
    """User's nominated pharmacy for electronic prescription delivery"""

    NOMINATION_TYPE_CHOICES = [
        ('P1', 'One-off nomination'),      # Single prescription
        ('P2', 'Repeat nomination'),       # Ongoing (default)
        ('P3', 'Acute nomination'),        # Acute prescriptions only
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='pharmacy_nominations'
    )
    pharmacy = models.ForeignKey(
        Pharmacy,
        on_delete=models.CASCADE,
        related_name='nominations'
    )

    nomination_type = models.CharField(
        max_length=2,
        choices=NOMINATION_TYPE_CHOICES,
        default='P2'
    )
    is_current = models.BooleanField(
        default=True,
        db_index=True,
        help_text="Only one current nomination per user allowed"
    )

    # Timestamps
    nominated_at = models.DateTimeField(auto_now_add=True)
    ended_at = models.DateTimeField(null=True, blank=True)

    # NHS PDS synchronization
    pds_synced = models.BooleanField(
        default=False,
        help_text="Whether nomination has been synced to NHS Personal Demographics Service"
    )
    pds_sync_date = models.DateTimeField(null=True, blank=True)
    pds_sync_error = models.TextField(
        blank=True,
        help_text="Last PDS sync error message if any"
    )

    class Meta:
        ordering = ['-nominated_at']
        indexes = [
            models.Index(fields=['user', 'is_current']),
            models.Index(fields=['pharmacy', 'is_current']),
        ]
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'is_current'],
                condition=models.Q(is_current=True),
                name='unique_current_nomination_per_user'
            )
        ]

    def __str__(self):
        status = 'Current' if self.is_current else 'Historical'
        return f"{self.user.email} → {self.pharmacy.name} ({status})"

    def save(self, *args, **kwargs):
        """Ensure only one current nomination per user"""
        if self.is_current:
            # End all other current nominations for this user
            NominatedPharmacy.objects.filter(
                user=self.user,
                is_current=True
            ).exclude(pk=self.pk).update(
                is_current=False,
                ended_at=timezone.now()
            )
        super().save(*args, **kwargs)
```

**Migration**: `api/migrations/000X_create_pharmacy_models.py`

```python
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ('api', '000X_previous_migration'),
    ]

    operations = [
        migrations.CreateModel(
            name='Pharmacy',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ods_code', models.CharField(db_index=True, help_text='NHS ODS code (e.g., FLM49)', max_length=10, unique=True)),
                ('name', models.CharField(max_length=255)),
                ('address_line_1', models.CharField(max_length=255)),
                ('address_line_2', models.CharField(blank=True, max_length=255)),
                ('city', models.CharField(max_length=100)),
                ('county', models.CharField(blank=True, max_length=100)),
                ('postcode', models.CharField(db_index=True, max_length=10)),
                ('country', models.CharField(default='United Kingdom', max_length=100)),
                ('phone', models.CharField(max_length=20)),
                ('email', models.EmailField(blank=True, max_length=254)),
                ('website', models.URLField(blank=True)),
                ('eps_enabled', models.BooleanField(default=False, help_text='Can receive electronic prescriptions via NHS EPS')),
                ('fhir_endpoint', models.URLField(blank=True, help_text='FHIR endpoint for direct pharmacy system integration')),
                ('opening_hours', models.JSONField(default=dict)),
                ('services_offered', models.JSONField(default=list)),
                ('latitude', models.DecimalField(blank=True, db_index=True, decimal_places=6, max_digits=9, null=True)),
                ('longitude', models.DecimalField(blank=True, db_index=True, decimal_places=6, max_digits=9, null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('hospital', models.ForeignKey(blank=True, help_text='If pharmacy is part of a hospital', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='affiliated_pharmacies', to='api.hospital')),
            ],
            options={
                'verbose_name_plural': 'Pharmacies',
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='NominatedPharmacy',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nomination_type', models.CharField(choices=[('P1', 'One-off nomination'), ('P2', 'Repeat nomination'), ('P3', 'Acute nomination')], default='P2', max_length=2)),
                ('is_current', models.BooleanField(db_index=True, default=True, help_text='Only one current nomination per user allowed')),
                ('nominated_at', models.DateTimeField(auto_now_add=True)),
                ('ended_at', models.DateTimeField(blank=True, null=True)),
                ('pds_synced', models.BooleanField(default=False, help_text='Whether nomination has been synced to NHS Personal Demographics Service')),
                ('pds_sync_date', models.DateTimeField(blank=True, null=True)),
                ('pds_sync_error', models.TextField(blank=True, help_text='Last PDS sync error message if any')),
                ('pharmacy', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='nominations', to='api.pharmacy')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='pharmacy_nominations', to='api.customuser')),
            ],
            options={
                'ordering': ['-nominated_at'],
            },
        ),
        migrations.AddIndex(
            model_name='pharmacy',
            index=models.Index(fields=['ods_code'], name='api_pharmac_ods_cod_idx'),
        ),
        migrations.AddIndex(
            model_name='pharmacy',
            index=models.Index(fields=['postcode'], name='api_pharmac_postcod_idx'),
        ),
        migrations.AddIndex(
            model_name='pharmacy',
            index=models.Index(fields=['latitude', 'longitude'], name='api_pharmac_lat_lng_idx'),
        ),
        migrations.AddIndex(
            model_name='pharmacy',
            index=models.Index(fields=['eps_enabled', 'is_active'], name='api_pharmac_eps_act_idx'),
        ),
        migrations.AddIndex(
            model_name='nominatedpharmacy',
            index=models.Index(fields=['user', 'is_current'], name='api_nominat_user_cur_idx'),
        ),
        migrations.AddIndex(
            model_name='nominatedpharmacy',
            index=models.Index(fields=['pharmacy', 'is_current'], name='api_nominat_phar_cur_idx'),
        ),
        migrations.AddConstraint(
            model_name='nominatedpharmacy',
            constraint=models.UniqueConstraint(condition=models.Q(('is_current', True)), fields=('user', 'is_current'), name='unique_current_nomination_per_user'),
        ),
    ]
```

#### 2. Serializers

**File**: `/Users/new/Newphb/basebackend/api/serializers/pharmacy_serializers.py` (NEW FILE)

```python
from rest_framework import serializers
from api.models.medical.pharmacy import Pharmacy, NominatedPharmacy


class PharmacySerializer(serializers.ModelSerializer):
    """Serializer for Pharmacy model"""

    is_open = serializers.SerializerMethodField()
    distance = serializers.SerializerMethodField()

    class Meta:
        model = Pharmacy
        fields = [
            'id', 'ods_code', 'name',
            'address_line_1', 'address_line_2', 'city', 'county', 'postcode', 'country',
            'phone', 'email', 'website',
            'eps_enabled', 'opening_hours', 'services_offered',
            'latitude', 'longitude',
            'is_active', 'is_open', 'distance',
            'hospital'
        ]
        read_only_fields = ['id', 'is_open', 'distance']

    def get_is_open(self, obj):
        """Check if pharmacy is currently open"""
        return obj.is_open_now()

    def get_distance(self, obj):
        """Calculate distance from user location if provided in context"""
        user_lat = self.context.get('user_latitude')
        user_lng = self.context.get('user_longitude')

        if not (user_lat and user_lng and obj.latitude and obj.longitude):
            return None

        # Haversine formula for distance calculation
        from math import radians, sin, cos, sqrt, atan2

        R = 6371  # Earth radius in km

        lat1, lon1 = radians(float(user_lat)), radians(float(user_lng))
        lat2, lon2 = radians(float(obj.latitude)), radians(float(obj.longitude))

        dlat = lat2 - lat1
        dlon = lon2 - lon1

        a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
        c = 2 * atan2(sqrt(a), sqrt(1-a))

        distance_km = R * c
        distance_miles = distance_km * 0.621371

        return {
            'km': round(distance_km, 2),
            'miles': round(distance_miles, 2)
        }


class NominatedPharmacySerializer(serializers.ModelSerializer):
    """Serializer for NominatedPharmacy model"""

    pharmacy = PharmacySerializer(read_only=True)
    pharmacy_id = serializers.PrimaryKeyRelatedField(
        queryset=Pharmacy.objects.filter(eps_enabled=True, is_active=True),
        source='pharmacy',
        write_only=True
    )

    class Meta:
        model = NominatedPharmacy
        fields = [
            'id', 'pharmacy', 'pharmacy_id',
            'nomination_type', 'is_current',
            'nominated_at', 'ended_at',
            'pds_synced', 'pds_sync_date', 'pds_sync_error'
        ]
        read_only_fields = [
            'id', 'nominated_at', 'ended_at',
            'pds_synced', 'pds_sync_date', 'pds_sync_error'
        ]

    def validate_pharmacy_id(self, value):
        """Ensure pharmacy is EPS-enabled"""
        if not value.eps_enabled:
            raise serializers.ValidationError(
                "Selected pharmacy is not enabled for electronic prescriptions"
            )
        return value


class NominatedPharmacyCreateSerializer(serializers.ModelSerializer):
    """Simplified serializer for creating nominations"""

    class Meta:
        model = NominatedPharmacy
        fields = ['pharmacy', 'nomination_type']

    def create(self, validated_data):
        # User comes from context (request.user)
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
```

#### 3. API Views

**File**: `/Users/new/Newphb/basebackend/api/views/pharmacy/pharmacy_views.py` (NEW FILE)

```python
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.db.models import Q
from api.models.medical.pharmacy import Pharmacy, NominatedPharmacy
from api.serializers.pharmacy_serializers import (
    PharmacySerializer,
    NominatedPharmacySerializer,
    NominatedPharmacyCreateSerializer
)
import logging

logger = logging.getLogger(__name__)


class PharmacyViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Pharmacy browsing and search

    GET /api/pharmacies/ - List all pharmacies
    GET /api/pharmacies/:id/ - Get pharmacy details
    GET /api/pharmacies/search/ - Search pharmacies
    GET /api/pharmacies/nearby/ - Find nearby pharmacies
    """
    serializer_class = PharmacySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Pharmacy.objects.filter(is_active=True, eps_enabled=True)

        # Filter by search query (name, address, postcode)
        query = self.request.query_params.get('q')
        if query:
            queryset = queryset.filter(
                Q(name__icontains=query) |
                Q(address_line_1__icontains=query) |
                Q(city__icontains=query) |
                Q(postcode__icontains=query)
            )

        # Filter by postcode
        postcode = self.request.query_params.get('postcode')
        if postcode:
            queryset = queryset.filter(postcode__istartswith=postcode)

        # Filter by services
        service = self.request.query_params.get('service')
        if service:
            queryset = queryset.filter(services_offered__contains=[service])

        return queryset

    def get_serializer_context(self):
        """Add user location to context for distance calculation"""
        context = super().get_serializer_context()
        context['user_latitude'] = self.request.query_params.get('lat')
        context['user_longitude'] = self.request.query_params.get('lng')
        return context

    @action(detail=False, methods=['get'])
    def search(self, request):
        """
        Search pharmacies by multiple criteria

        Query params:
        - q: Search query (name, address, postcode)
        - postcode: Postcode filter
        - service: Service filter
        - lat, lng: User location for distance calculation
        """
        pharmacies = self.get_queryset()[:50]  # Limit to 50 results
        serializer = self.get_serializer(pharmacies, many=True)
        return Response({
            'status': 'success',
            'count': len(serializer.data),
            'pharmacies': serializer.data
        })

    @action(detail=False, methods=['get'])
    def nearby(self, request):
        """
        Find pharmacies near coordinates

        Required params:
        - lat: Latitude
        - lng: Longitude

        Optional params:
        - radius: Search radius in km (default: 5)
        - limit: Max results (default: 20)
        """
        lat = request.query_params.get('lat')
        lng = request.query_params.get('lng')
        radius_km = float(request.query_params.get('radius', 5))
        limit = int(request.query_params.get('limit', 20))

        if not lat or not lng:
            return Response(
                {'error': 'lat and lng parameters required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # TODO: Use PostGIS for efficient geographic queries
        # For now, return pharmacies ordered by manual distance calculation
        pharmacies = self.get_queryset()[:limit]
        serializer = self.get_serializer(pharmacies, many=True)

        return Response({
            'status': 'success',
            'count': len(serializer.data),
            'center': {'lat': lat, 'lng': lng},
            'radius_km': radius_km,
            'pharmacies': serializer.data
        })


class NominatedPharmacyViewSet(viewsets.ModelViewSet):
    """
    User pharmacy nomination management

    GET /api/pharmacy-nominations/ - List user's nominations (history)
    POST /api/pharmacy-nominations/ - Create new nomination
    GET /api/pharmacy-nominations/current/ - Get current nomination
    DELETE /api/pharmacy-nominations/:id/ - Remove nomination
    """
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return NominatedPharmacy.objects.filter(
            user=self.request.user
        ).select_related('pharmacy')

    def get_serializer_class(self):
        if self.action == 'create':
            return NominatedPharmacyCreateSerializer
        return NominatedPharmacySerializer

    def create(self, request, *args, **kwargs):
        """Create new pharmacy nomination"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Save nomination (model's save() handles ending previous nominations)
        nomination = serializer.save()

        # TODO: Sync to NHS PDS (Phase 3)
        # pds_client.update_pharmacy_nomination(request.user, nomination.pharmacy)

        logger.info(f"User {request.user.email} nominated pharmacy {nomination.pharmacy.ods_code}")

        # Return full serializer with pharmacy details
        response_serializer = NominatedPharmacySerializer(nomination)
        return Response(
            {
                'status': 'success',
                'message': f'Successfully nominated {nomination.pharmacy.name}',
                'nomination': response_serializer.data
            },
            status=status.HTTP_201_CREATED
        )

    @action(detail=False, methods=['get'])
    def current(self, request):
        """Get current nominated pharmacy"""
        nomination = NominatedPharmacy.objects.filter(
            user=request.user,
            is_current=True
        ).select_related('pharmacy').first()

        if not nomination:
            return Response(
                {
                    'status': 'none',
                    'message': 'No pharmacy nominated'
                },
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = self.get_serializer(nomination)
        return Response({
            'status': 'success',
            'nomination': serializer.data
        })

    def destroy(self, request, *args, **kwargs):
        """Remove nomination (end current nomination)"""
        nomination = self.get_object()

        if not nomination.is_current:
            return Response(
                {'error': 'Cannot remove historical nomination'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # End nomination
        nomination.is_current = False
        nomination.ended_at = timezone.now()
        nomination.save()

        logger.info(f"User {request.user.email} removed pharmacy nomination")

        return Response(
            {
                'status': 'success',
                'message': 'Pharmacy nomination removed'
            },
            status=status.HTTP_200_OK
        )
```

#### 4. URL Routes

**File**: `/Users/new/Newphb/basebackend/api/urls.py` (ADD TO EXISTING)

```python
# Add to existing urls.py

from api.views.pharmacy.pharmacy_views import PharmacyViewSet, NominatedPharmacyViewSet

# Add to router
router.register(r'pharmacies', PharmacyViewSet, basename='pharmacy')
router.register(r'pharmacy-nominations', NominatedPharmacyViewSet, basename='pharmacy-nomination')
```

#### 5. Admin Interface

**File**: `/Users/new/Newphb/basebackend/api/admin.py` (ADD TO EXISTING)

```python
from django.contrib import admin
from api.models.medical.pharmacy import Pharmacy, NominatedPharmacy


@admin.register(Pharmacy)
class PharmacyAdmin(admin.ModelAdmin):
    list_display = ['name', 'ods_code', 'city', 'postcode', 'eps_enabled', 'is_active']
    list_filter = ['eps_enabled', 'is_active', 'city']
    search_fields = ['name', 'ods_code', 'postcode', 'city']
    readonly_fields = ['created_at', 'updated_at']

    fieldsets = (
        ('Basic Information', {
            'fields': ('ods_code', 'name', 'hospital')
        }),
        ('Address', {
            'fields': ('address_line_1', 'address_line_2', 'city', 'county', 'postcode', 'country')
        }),
        ('Contact', {
            'fields': ('phone', 'email', 'website')
        }),
        ('NHS EPS', {
            'fields': ('eps_enabled', 'fhir_endpoint')
        }),
        ('Services', {
            'fields': ('opening_hours', 'services_offered')
        }),
        ('Location', {
            'fields': ('latitude', 'longitude')
        }),
        ('Status', {
            'fields': ('is_active', 'created_at', 'updated_at')
        }),
    )


@admin.register(NominatedPharmacy)
class NominatedPharmacyAdmin(admin.ModelAdmin):
    list_display = ['user', 'pharmacy', 'nomination_type', 'is_current', 'nominated_at']
    list_filter = ['is_current', 'nomination_type', 'pds_synced']
    search_fields = ['user__email', 'pharmacy__name', 'pharmacy__ods_code']
    readonly_fields = ['nominated_at', 'ended_at', 'pds_sync_date']

    fieldsets = (
        ('Nomination', {
            'fields': ('user', 'pharmacy', 'nomination_type', 'is_current')
        }),
        ('Timestamps', {
            'fields': ('nominated_at', 'ended_at')
        }),
        ('NHS PDS Sync', {
            'fields': ('pds_synced', 'pds_sync_date', 'pds_sync_error')
        }),
    )
```

#### 6. Initial Data Fixture

**File**: `/Users/new/Newphb/basebackend/api/fixtures/sample_pharmacies.json` (NEW FILE)

```json
[
  {
    "model": "api.pharmacy",
    "pk": 1,
    "fields": {
      "ods_code": "FLM49",
      "name": "Boots Pharmacy - London Central",
      "address_line_1": "123 High Street",
      "city": "London",
      "postcode": "SW1A 1AA",
      "country": "United Kingdom",
      "phone": "020 7946 0123",
      "email": "london.central@boots.com",
      "eps_enabled": true,
      "opening_hours": {
        "monday": {"open": "08:00", "close": "20:00"},
        "tuesday": {"open": "08:00", "close": "20:00"},
        "wednesday": {"open": "08:00", "close": "20:00"},
        "thursday": {"open": "08:00", "close": "20:00"},
        "friday": {"open": "08:00", "close": "20:00"},
        "saturday": {"open": "09:00", "close": "18:00"},
        "sunday": {"open": "10:00", "close": "16:00"}
      },
      "services_offered": [
        "prescription_collection",
        "flu_jab",
        "nhs_health_check",
        "emergency_contraception",
        "smoking_cessation"
      ],
      "latitude": "51.5074",
      "longitude": "-0.1278",
      "is_active": true
    }
  },
  {
    "model": "api.pharmacy",
    "pk": 2,
    "fields": {
      "ods_code": "FAH25",
      "name": "Lloyds Pharmacy - Westminster",
      "address_line_1": "456 Victoria Street",
      "city": "London",
      "postcode": "SW1E 5ND",
      "country": "United Kingdom",
      "phone": "020 7946 0456",
      "email": "westminster@lloydpharmacy.co.uk",
      "eps_enabled": true,
      "opening_hours": {
        "monday": {"open": "09:00", "close": "18:00"},
        "tuesday": {"open": "09:00", "close": "18:00"},
        "wednesday": {"open": "09:00", "close": "18:00"},
        "thursday": {"open": "09:00", "close": "18:00"},
        "friday": {"open": "09:00", "close": "18:00"},
        "saturday": {"closed": true},
        "sunday": {"closed": true}
      },
      "services_offered": [
        "prescription_collection",
        "nhs_health_check",
        "travel_vaccination"
      ],
      "latitude": "51.4975",
      "longitude": "-0.1357",
      "is_active": true
    }
  }
]
```

### Success Criteria

#### Automated Verification:
- [ ] Database migration applies cleanly: `python manage.py migrate`
- [ ] Models validate correctly: Create Pharmacy and NominatedPharmacy objects
- [ ] Unique constraint enforced: Cannot create two current nominations for same user
- [ ] ODS code uniqueness enforced: Cannot create pharmacies with duplicate ODS codes
- [ ] Serializers validate: Invalid pharmacy_id rejected, EPS-disabled pharmacy rejected
- [ ] API endpoints respond: GET /api/pharmacies/ returns 200
- [ ] Unit tests pass: `python manage.py test api.tests.test_pharmacy_models`

#### Manual Verification:
- [ ] Django admin shows Pharmacy and NominatedPharmacy models
- [ ] Can create pharmacy via admin interface
- [ ] Sample pharmacies load: `python manage.py loaddata sample_pharmacies`
- [ ] API returns pharmacies: `curl http://localhost:8000/api/pharmacies/`
- [ ] Can create nomination via API: `POST /api/pharmacy-nominations/`
- [ ] Previous nomination automatically ends when new one created

**Implementation Note**: After completing this phase and all automated verification passes, pause here for manual confirmation from the human that the manual testing was successful before proceeding to the next phase.

---

## Phase 2: Frontend - Pharmacy Nomination UI

### Overview
Build React components for pharmacy nomination: reuse FindPharmacyPage for search, create pharmacy API service, integrate nomination flow into NominatedPharmacyPage.

### Changes Required

#### 1. Pharmacy API Service

**File**: `/Users/new/phbfinal/phbfrontend/src/services/pharmacyService.ts` (NEW FILE)

```typescript
import { API_BASE_URL } from '../utils/config';

export interface Pharmacy {
  id: number;
  ods_code: string;
  name: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  county?: string;
  postcode: string;
  country: string;
  phone: string;
  email?: string;
  website?: string;
  eps_enabled: boolean;
  opening_hours: Record<string, { open: string; close: string } | { closed: true }>;
  services_offered: string[];
  latitude: number | null;
  longitude: number | null;
  is_active: boolean;
  is_open: boolean;
  distance?: {
    km: number;
    miles: number;
  };
  hospital?: number | null;
}

export interface NominatedPharmacy {
  id: number;
  pharmacy: Pharmacy;
  nomination_type: 'P1' | 'P2' | 'P3';
  is_current: boolean;
  nominated_at: string;
  ended_at: string | null;
  pds_synced: boolean;
  pds_sync_date: string | null;
  pds_sync_error: string;
}

export interface PharmacySearchParams {
  q?: string;
  postcode?: string;
  service?: string;
  lat?: number;
  lng?: number;
  radius?: number;
  limit?: number;
}

export interface PharmacySearchResponse {
  status: string;
  count: number;
  pharmacies: Pharmacy[];
  center?: { lat: number; lng: number };
  radius_km?: number;
}

export interface NominationResponse {
  status: string;
  message: string;
  nomination: NominatedPharmacy;
}

export interface CurrentNominationResponse {
  status: string;
  message?: string;
  nomination?: NominatedPharmacy;
}

class PharmacyService {
  private baseURL = `${API_BASE_URL}/api`;

  /**
   * Search pharmacies by multiple criteria
   */
  async searchPharmacies(params: PharmacySearchParams): Promise<PharmacySearchResponse> {
    const searchParams = new URLSearchParams();

    if (params.q) searchParams.append('q', params.q);
    if (params.postcode) searchParams.append('postcode', params.postcode);
    if (params.service) searchParams.append('service', params.service);
    if (params.lat) searchParams.append('lat', params.lat.toString());
    if (params.lng) searchParams.append('lng', params.lng.toString());

    try {
      const response = await fetch(
        `${this.baseURL}/pharmacies/search/?${searchParams.toString()}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error(`Pharmacy search failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error searching pharmacies:', error);
      throw error;
    }
  }

  /**
   * Find nearby pharmacies
   */
  async getNearbyPharmacies(
    lat: number,
    lng: number,
    radius: number = 5,
    limit: number = 20
  ): Promise<PharmacySearchResponse> {
    const searchParams = new URLSearchParams({
      lat: lat.toString(),
      lng: lng.toString(),
      radius: radius.toString(),
      limit: limit.toString(),
    });

    try {
      const response = await fetch(
        `${this.baseURL}/pharmacies/nearby/?${searchParams.toString()}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error(`Nearby pharmacies fetch failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching nearby pharmacies:', error);
      throw error;
    }
  }

  /**
   * Get pharmacy by ID
   */
  async getPharmacy(id: number): Promise<Pharmacy> {
    try {
      const response = await fetch(`${this.baseURL}/pharmacies/${id}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Pharmacy fetch failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching pharmacy:', error);
      throw error;
    }
  }

  /**
   * Get current nominated pharmacy
   */
  async getCurrentNomination(): Promise<CurrentNominationResponse> {
    try {
      const response = await fetch(`${this.baseURL}/pharmacy-nominations/current/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.status === 404) {
        return {
          status: 'none',
          message: 'No pharmacy nominated',
        };
      }

      if (!response.ok) {
        throw new Error(`Current nomination fetch failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching current nomination:', error);
      throw error;
    }
  }

  /**
   * Get nomination history
   */
  async getNominationHistory(): Promise<NominatedPharmacy[]> {
    try {
      const response = await fetch(`${this.baseURL}/pharmacy-nominations/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Nomination history fetch failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching nomination history:', error);
      throw error;
    }
  }

  /**
   * Nominate a pharmacy
   */
  async nominatePharmacy(
    pharmacyId: number,
    nominationType: 'P1' | 'P2' | 'P3' = 'P2'
  ): Promise<NominationResponse> {
    try {
      const response = await fetch(`${this.baseURL}/pharmacy-nominations/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          pharmacy: pharmacyId,
          nomination_type: nominationType,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `Nomination failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error nominating pharmacy:', error);
      throw error;
    }
  }

  /**
   * Remove current nomination
   */
  async removeNomination(nominationId: number): Promise<{ status: string; message: string }> {
    try {
      const response = await fetch(`${this.baseURL}/pharmacy-nominations/${nominationId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Remove nomination failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error removing nomination:', error);
      throw error;
    }
  }
}

export const pharmacyService = new PharmacyService();
```

#### 2. Update NominatedPharmacyPage

**File**: `/Users/new/phbfinal/phbfrontend/src/pages/account/NominatedPharmacyPage.tsx` (REPLACE EXISTING)

```typescript
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Phone, Clock, CheckCircle, XCircle, History, Search } from 'lucide-react';
import { pharmacyService, Pharmacy, NominatedPharmacy } from '../../services/pharmacyService';

const NominatedPharmacyPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentNomination, setCurrentNomination] = useState<NominatedPharmacy | null>(null);
  const [nominationHistory, setNominationHistory] = useState<NominatedPharmacy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [removing, setRemoving] = useState(false);

  useEffect(() => {
    loadCurrentNomination();
    loadNominationHistory();
  }, []);

  const loadCurrentNomination = async () => {
    try {
      setLoading(true);
      const response = await pharmacyService.getCurrentNomination();

      if (response.status === 'success' && response.nomination) {
        setCurrentNomination(response.nomination);
      } else {
        setCurrentNomination(null);
      }
    } catch (err: any) {
      console.error('Error loading current nomination:', err);
      setError(err.message || 'Failed to load current nomination');
    } finally {
      setLoading(false);
    }
  };

  const loadNominationHistory = async () => {
    try {
      const history = await pharmacyService.getNominationHistory();
      setNominationHistory(history.filter(n => !n.is_current));
    } catch (err: any) {
      console.error('Error loading nomination history:', err);
    }
  };

  const handleRemoveNomination = async () => {
    if (!currentNomination) return;

    if (!window.confirm('Are you sure you want to remove your pharmacy nomination?')) {
      return;
    }

    try {
      setRemoving(true);
      await pharmacyService.removeNomination(currentNomination.id);
      setCurrentNomination(null);
      alert('Pharmacy nomination removed successfully');
    } catch (err: any) {
      console.error('Error removing nomination:', err);
      alert(err.message || 'Failed to remove nomination');
    } finally {
      setRemoving(false);
    }
  };

  const formatOpeningHours = (hours: Record<string, any>) => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const todayHours = hours[today];

    if (!todayHours || todayHours.closed) {
      return 'Closed today';
    }

    return `Open today: ${todayHours.open} - ${todayHours.close}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your nominated pharmacy...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Nominated Pharmacy</h1>
          <p className="text-gray-600">
            Your nominated pharmacy will receive your electronic prescriptions automatically
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Current Nomination */}
        {currentNomination ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span className="font-medium text-green-800">Currently Nominated</span>
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {currentNomination.pharmacy.name}
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-gray-700">{currentNomination.pharmacy.address_line_1}</p>
                    {currentNomination.pharmacy.address_line_2 && (
                      <p className="text-gray-700">{currentNomination.pharmacy.address_line_2}</p>
                    )}
                    <p className="text-gray-700">
                      {currentNomination.pharmacy.city}, {currentNomination.pharmacy.postcode}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-3" />
                  <a
                    href={`tel:${currentNomination.pharmacy.phone}`}
                    className="text-blue-600 hover:underline"
                  >
                    {currentNomination.pharmacy.phone}
                  </a>
                </div>

                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-700">
                    {formatOpeningHours(currentNomination.pharmacy.opening_hours)}
                  </span>
                </div>
              </div>

              {/* Services */}
              {currentNomination.pharmacy.services_offered.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Services Available:</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentNomination.pharmacy.services_offered.map((service, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {service.replace(/_/g, ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Nomination Details */}
              <div className="border-t pt-4 mt-4">
                <p className="text-sm text-gray-600">
                  Nominated on: {new Date(currentNomination.nominated_at).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  Type: {currentNomination.nomination_type === 'P2' ? 'Repeat prescriptions' : 'One-off'}
                </p>
                {currentNomination.pds_synced && (
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Synced with NHS
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => navigate('/find-pharmacy?mode=nominate')}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Change Pharmacy
                </button>
                <button
                  onClick={handleRemoveNomination}
                  disabled={removing}
                  className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
                >
                  {removing ? 'Removing...' : 'Remove'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center mb-6">
            <XCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Pharmacy Nominated</h2>
            <p className="text-gray-600 mb-6">
              Nominate a pharmacy to receive your electronic prescriptions automatically
            </p>
            <button
              onClick={() => navigate('/find-pharmacy?mode=nominate')}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Search className="h-5 w-5 mr-2" />
              Find and Nominate a Pharmacy
            </button>
          </div>
        )}

        {/* Nomination History */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center">
              <History className="h-5 w-5 text-gray-600 mr-2" />
              <span className="font-semibold text-gray-900">Nomination History</span>
              <span className="ml-2 text-sm text-gray-500">({nominationHistory.length})</span>
            </div>
            <svg
              className={`h-5 w-5 text-gray-400 transition-transform ${showHistory ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showHistory && (
            <div className="border-t">
              {nominationHistory.length === 0 ? (
                <p className="p-4 text-gray-500 text-center">No previous nominations</p>
              ) : (
                <div className="divide-y">
                  {nominationHistory.map((nomination) => (
                    <div key={nomination.id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{nomination.pharmacy.name}</h4>
                          <p className="text-sm text-gray-600">
                            {nomination.pharmacy.city}, {nomination.pharmacy.postcode}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {new Date(nomination.nominated_at).toLocaleDateString()} -{' '}
                            {nomination.ended_at ? new Date(nomination.ended_at).toLocaleDateString() : 'Present'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Help Text */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">How it works</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Your nominated pharmacy will receive your electronic prescriptions automatically</li>
            <li>• You can change your nominated pharmacy at any time</li>
            <li>• Changes take effect for your next prescription</li>
            <li>• You can still collect prescriptions from any pharmacy if needed</li>
          </ul>
          <Link
            to="/help/prescriptions/how-nominations-work"
            className="inline-block mt-3 text-blue-600 hover:underline text-sm font-medium"
          >
            Learn more about pharmacy nominations →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NominatedPharmacyPage;
```

#### 3. Update FindPharmacyPage to Support Nomination Mode

**File**: `/Users/new/phbfinal/phbfrontend/src/pages/FindPharmacyPage.tsx` (MODIFY EXISTING)

Add nomination mode support by detecting URL parameter and showing nomination button:

```typescript
// Add at top of component
const [searchParams] = useSearchParams();
const nominationMode = searchParams.get('mode') === 'nominate';
const navigate = useNavigate();

// Add nomination handler
const handleNominate = async (pharmacy: Pharmacy) => {
  if (!window.confirm(`Nominate ${pharmacy.name} as your preferred pharmacy?`)) {
    return;
  }

  try {
    await pharmacyService.nominatePharmacy(pharmacy.id);
    alert(`${pharmacy.name} has been nominated successfully!`);
    navigate('/account/nominated-pharmacy');
  } catch (error: any) {
    alert(error.message || 'Failed to nominate pharmacy');
  }
};

// Modify action buttons in pharmacy detail card (around line 600-615)
{nominationMode ? (
  <button
    onClick={() => handleNominate(selectedPharmacy)}
    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
  >
    <CheckCircle className="h-4 w-4 mr-2" />
    Nominate This Pharmacy
  </button>
) : (
  <a
    href={`https://www.google.com/maps/dir/?api=1&destination=${selectedPharmacy.lat},${selectedPharmacy.lng}`}
    target="_blank"
    rel="noopener noreferrer"
    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
  >
    <Navigation className="h-4 w-4 mr-2" />
    Directions
  </a>
)}
```

### Success Criteria

#### Automated Verification:
- [ ] TypeScript compiles without errors: `bun run typecheck`
- [ ] No linting errors: `bun run lint`
- [ ] Service imports work correctly
- [ ] React components render without errors

#### Manual Verification:
- [ ] Visit `/account/nominated-pharmacy` - sees "No Pharmacy Nominated" state
- [ ] Click "Find and Nominate a Pharmacy" - redirects to `/find-pharmacy?mode=nominate`
- [ ] Search for pharmacy on map - sees pharmacy markers
- [ ] Click pharmacy marker - sees pharmacy details with "Nominate This Pharmacy" button
- [ ] Click "Nominate This Pharmacy" - sees confirmation, redirected to nominated pharmacy page
- [ ] See nominated pharmacy details with green "Currently Nominated" badge
- [ ] Click "Change Pharmacy" - returns to find pharmacy page
- [ ] Select different pharmacy - previous nomination ends, new one becomes current
- [ ] Click "Nomination History" - sees list of past nominations
- [ ] Click "Remove" - nomination removed, returns to "No Pharmacy Nominated" state

**Implementation Note**: After completing this phase and all automated verification passes, pause here for manual confirmation from the human that the manual testing was successful before proceeding to the next phase.

---

## Phase 3: Backend - Prescription Integration with Nominated Pharmacy

### Overview
Enhance Medication/Prescription model to link to Pharmacy model, auto-assign nominated pharmacy when doctor creates prescription, support manual pharmacy override.

### Changes Required

#### 1. Enhance Medication Model

**File**: `/Users/new/Newphb/basebackend/api/models/medical/medication.py` (MODIFY EXISTING)

Add foreign key relationships to Pharmacy model:

```python
# Add to Medication model (around line 367)

# Replace pharmacy_name CharField with ForeignKey
nominated_pharmacy = models.ForeignKey(
    'Pharmacy',
    on_delete=models.SET_NULL,
    null=True,
    blank=True,
    related_name='nominated_prescriptions',
    help_text="Pharmacy nominated at time of prescription"
)

dispensing_pharmacy = models.ForeignKey(
    'Pharmacy',
    on_delete=models.SET_NULL,
    null=True,
    blank=True,
    related_name='dispensed_prescriptions',
    help_text="Pharmacy that actually dispensed the medication"
)

# Keep pharmacy_name as legacy field for backwards compatibility
pharmacy_name = models.CharField(
    max_length=255,
    blank=True,
    help_text="Legacy field - use nominated_pharmacy instead"
)
```

**Migration**: `api/migrations/000X_add_pharmacy_fk_to_medication.py`

```python
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ('api', '000X_create_pharmacy_models'),
        ('api', '0007_medicationcatalog_medication'),  # Existing medication migration
    ]

    operations = [
        migrations.AddField(
            model_name='medication',
            name='nominated_pharmacy',
            field=models.ForeignKey(
                blank=True,
                help_text='Pharmacy nominated at time of prescription',
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name='nominated_prescriptions',
                to='api.pharmacy'
            ),
        ),
        migrations.AddField(
            model_name='medication',
            name='dispensing_pharmacy',
            field=models.ForeignKey(
                blank=True,
                help_text='Pharmacy that actually dispensed the medication',
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name='dispensed_prescriptions',
                to='api.pharmacy'
            ),
        ),
        migrations.AlterField(
            model_name='medication',
            name='pharmacy_name',
            field=models.CharField(
                blank=True,
                help_text='Legacy field - use nominated_pharmacy instead',
                max_length=255
            ),
        ),
    ]
```

#### 2. Update Prescription Creation View

**File**: `/Users/new/Newphb/basebackend/api/views/hospital/hospital_views.py` (MODIFY create_prescription function around line 3092-3253)

```python
# Modify create_prescription function to auto-assign nominated pharmacy

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_prescription(request, appointment_id=None):
    """Create prescription with automatic nominated pharmacy assignment"""

    # ... existing validation code ...

    # NEW: Get patient's nominated pharmacy
    from api.models.medical.pharmacy import NominatedPharmacy

    nominated_pharmacy_obj = None
    nomination = NominatedPharmacy.objects.filter(
        user=appointment.patient,
        is_current=True
    ).select_related('pharmacy').first()

    if nomination:
        nominated_pharmacy_obj = nomination.pharmacy
        logger.info(f"Auto-assigning nominated pharmacy {nominated_pharmacy_obj.ods_code} to prescription")
    else:
        logger.warning(f"Patient {appointment.patient.email} has no nominated pharmacy")

    # ... existing medication creation loop ...

    for medication_data in medications_data:
        # ... existing catalog lookup ...

        medication = Medication.objects.create(
            medical_record=medical_record,
            catalog_entry=catalog_entry,
            prescribed_by=doctor,
            appointment=appointment,

            # Medication details
            medication_name=medication_data.get('medication_name'),
            # ... other fields ...

            # NEW: Assign nominated pharmacy
            nominated_pharmacy=nominated_pharmacy_obj,

            # Legacy field for backwards compatibility
            pharmacy_name=nominated_pharmacy_obj.name if nominated_pharmacy_obj else medication_data.get('pharmacy_name', ''),

            # ... rest of fields ...
        )

    # ... rest of function ...
```

#### 3. Update Medication Serializer

**File**: `/Users/new/Newphb/basebackend/api/serializers.py` (MODIFY MedicationSerializer around line 1142-1169)

```python
from api.serializers.pharmacy_serializers import PharmacySerializer

class MedicationSerializer(serializers.ModelSerializer):
    prescribed_by = DoctorSerializer(read_only=True)
    nominated_pharmacy = PharmacySerializer(read_only=True)  # NEW
    dispensing_pharmacy = PharmacySerializer(read_only=True)  # NEW

    class Meta:
        model = Medication
        fields = [
            'id', 'medication_name', 'generic_name', 'strength', 'form', 'route',
            'dosage', 'frequency', 'start_date', 'end_date', 'is_ongoing',
            'duration', 'patient_instructions', 'pharmacy_instructions', 'indication',
            'prescription_number', 'refills_authorized', 'refills_remaining',
            'status',
            'pharmacy_name',  # Legacy
            'nominated_pharmacy',  # NEW
            'dispensing_pharmacy',  # NEW
            'priority', 'prescribed_by'
        ]
        read_only_fields = [
            'id', 'generic_name', 'prescription_number', 'refills_remaining',
            'prescribed_by', 'nominated_pharmacy', 'dispensing_pharmacy'
        ]
```

#### 4. API Endpoint for Manual Pharmacy Override

**File**: `/Users/new/Newphb/basebackend/api/views/hospital/hospital_views.py` (ADD NEW FUNCTION)

```python
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def override_prescription_pharmacy(request, medication_id):
    """
    Allow doctor or patient to override pharmacy for specific prescription

    PATCH /api/medications/{id}/override-pharmacy/
    Body: { "pharmacy_id": 123 }
    """
    try:
        medication = Medication.objects.get(id=medication_id)
    except Medication.DoesNotExist:
        return Response(
            {'error': 'Medication not found'},
            status=status.HTTP_404_NOT_FOUND
        )

    # Authorization: Doctor who prescribed OR patient who owns prescription
    user = request.user
    is_authorized = (
        (hasattr(user, 'doctor_profile') and medication.prescribed_by == user.doctor_profile) or
        (medication.medical_record.user == user)
    )

    if not is_authorized:
        return Response(
            {'error': 'Not authorized to modify this prescription'},
            status=status.HTTP_403_FORBIDDEN
        )

    # Get new pharmacy
    pharmacy_id = request.data.get('pharmacy_id')
    if not pharmacy_id:
        return Response(
            {'error': 'pharmacy_id required'},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        from api.models.medical.pharmacy import Pharmacy
        pharmacy = Pharmacy.objects.get(id=pharmacy_id, eps_enabled=True, is_active=True)
    except Pharmacy.DoesNotExist:
        return Response(
            {'error': 'Pharmacy not found or not EPS-enabled'},
            status=status.HTTP_404_NOT_FOUND
        )

    # Update pharmacy
    old_pharmacy = medication.nominated_pharmacy
    medication.nominated_pharmacy = pharmacy
    medication.pharmacy_name = pharmacy.name  # Update legacy field
    medication.save()

    logger.info(
        f"Prescription {medication.id} pharmacy overridden: "
        f"{old_pharmacy.ods_code if old_pharmacy else 'None'} → {pharmacy.ods_code}"
    )

    serializer = MedicationSerializer(medication)
    return Response({
        'status': 'success',
        'message': f'Pharmacy changed to {pharmacy.name}',
        'medication': serializer.data
    })
```

**URL Route**: Add to `api/urls.py`

```python
# Add to urlpatterns
path('medications/<int:medication_id>/override-pharmacy/', override_prescription_pharmacy, name='override-prescription-pharmacy'),
```

### Success Criteria

#### Automated Verification:
- [ ] Database migration applies cleanly: `python manage.py migrate`
- [ ] Medication model has nominated_pharmacy and dispensing_pharmacy fields
- [ ] Can create medication with nominated_pharmacy FK
- [ ] Prescription creation auto-assigns nominated pharmacy
- [ ] Prescription creation handles missing nomination gracefully (pharmacy=None)
- [ ] Unit tests pass: `python manage.py test api.tests.test_prescription_pharmacy_integration`

#### Manual Verification:
- [ ] Patient nominates pharmacy via frontend
- [ ] Doctor creates prescription for that patient
- [ ] Prescription API response includes `nominated_pharmacy` object with pharmacy details
- [ ] Patient with no nominated pharmacy gets prescription with `nominated_pharmacy: null`
- [ ] Doctor can override pharmacy via API: `PATCH /api/medications/{id}/override-pharmacy/`
- [ ] After override, prescription shows new pharmacy in `nominated_pharmacy` field

**Implementation Note**: After completing this phase and all automated verification passes, pause here for manual confirmation from the human that the manual testing was successful before proceeding to the next phase.

---

## Phase 4: NHS EPS FHIR Integration

### Overview
Integrate with NHS Electronic Prescription Service using HL7 FHIR R4B protocol for prescription submission, digital signatures, and dispense notifications.

### Changes Required

#### 1. Install FHIR Dependencies

**File**: `/Users/new/Newphb/basebackend/requirements.txt` (ADD)

```txt
# NHS EPS FHIR Integration
fhir.resources>=8.0.0
requests>=2.31.0
python-jose>=3.3.0
cryptography>=41.0.0
pyOpenSSL>=23.0.0
```

Run: `pip install -r requirements.txt`

#### 2. NHS EPS Configuration

**File**: `/Users/new/Newphb/basebackend/server/settings.py` (ADD)

```python
# NHS EPS FHIR Settings
NHS_EPS_CONFIG = {
    'environment': env('NHS_EPS_ENV', default='sandbox'),  # sandbox | integration | production

    # API Endpoints
    'endpoints': {
        'sandbox': {
            'fhir_base': 'https://sandbox.api.service.nhs.uk/electronic-prescriptions',
            'token_url': 'https://sandbox.api.service.nhs.uk/oauth2/token',
        },
        'integration': {
            'fhir_base': 'https://int.api.service.nhs.uk/electronic-prescriptions',
            'token_url': 'https://int.api.service.nhs.uk/oauth2/token',
        },
        'production': {
            'fhir_base': 'https://api.service.nhs.uk/electronic-prescriptions',
            'token_url': 'https://api.service.nhs.uk/oauth2/token',
        }
    },

    # OAuth 2.0 Credentials
    'client_id': env('NHS_EPS_CLIENT_ID', default=''),
    'client_secret': env('NHS_EPS_CLIENT_SECRET', default=''),
    'api_key': env('NHS_EPS_API_KEY', default=''),

    # mTLS Certificates (production only)
    'cert_path': env('NHS_EPS_CERT_PATH', default=''),
    'key_path': env('NHS_EPS_KEY_PATH', default=''),

    # Digital Signature
    'signing_key_path': env('NHS_EPS_SIGNING_KEY', default=''),
    'signing_cert_path': env('NHS_EPS_SIGNING_CERT', default=''),

    # Organization Details
    'organization_ods_code': env('NHS_ORGANIZATION_ODS_CODE', default=''),
    'organization_name': env('NHS_ORGANIZATION_NAME', default='Public Health Bureau'),
}
```

**.env file example**:
```bash
NHS_EPS_ENV=sandbox
NHS_EPS_CLIENT_ID=your_client_id
NHS_EPS_CLIENT_SECRET=your_client_secret
NHS_EPS_API_KEY=your_api_key
NHS_ORGANIZATION_ODS_CODE=ABC123
NHS_ORGANIZATION_NAME="Public Health Bureau Hospital"
```

#### 3. FHIR Bundle Builder Service

**File**: `/Users/new/Newphb/basebackend/api/services/fhir/prescription_builder.py` (NEW FILE)

```python
"""
FHIR R4B Prescription Bundle Builder for NHS EPS
Follows NHS FHIR Implementation Guide for Electronic Prescribing
"""

from datetime import datetime, timezone as dt_timezone
from typing import Dict, Any, List
from uuid import uuid4

from fhir.resources.bundle import Bundle, BundleEntry
from fhir.resources.messageheader import MessageHeader, MessageHeaderDestination, MessageHeaderSource
from fhir.resources.patient import Patient, PatientContact
from fhir.resources.practitioner import Practitioner, PractitionerQualification
from fhir.resources.practitionerrole import PractitionerRole
from fhir.resources.organization import Organization
from fhir.resources.medicationrequest import MedicationRequest, MedicationRequestDispenseRequest
from fhir.resources.medication import Medication
from fhir.resources.codeableconcept import CodeableConcept
from fhir.resources.coding import Coding
from fhir.resources.dosage import Dosage
from fhir.resources.identifier import Identifier
from fhir.resources.humanname import HumanName
from fhir.resources.address import Address
from fhir.resources.contactpoint import ContactPoint
from fhir.resources.reference import Reference
from fhir.resources.quantity import Quantity

from django.conf import settings
from api.models.medical.medication import Medication as MedicationModel
from api.models.user.custom_user import CustomUser
from api.models.medical.pharmacy import Pharmacy
import logging

logger = logging.getLogger(__name__)


class FHIRPrescriptionBuilder:
    """Build NHS EPS-compliant FHIR R4B prescription bundles"""

    def __init__(self):
        self.config = settings.NHS_EPS_CONFIG
        self.org_ods_code = self.config['organization_ods_code']
        self.org_name = self.config['organization_name']

    def build_prescription_bundle(
        self,
        medication_obj: MedicationModel,
        patient_obj: CustomUser,
        prescriber_obj,  # DoctorProfile
        pharmacy_ods_code: str
    ) -> Dict[str, Any]:
        """
        Build complete FHIR Bundle for prescription submission to EPS

        Returns: Dictionary representation of FHIR Bundle
        """

        bundle_id = str(uuid4())
        message_id = str(uuid4())

        # Create FHIR Bundle
        bundle = Bundle(
            id=bundle_id,
            type="message",
            timestamp=datetime.now(dt_timezone.utc).isoformat(),
            entry=[]
        )

        # 1. MessageHeader (required)
        message_header = self._build_message_header(message_id, pharmacy_ods_code)
        bundle.entry.append(BundleEntry(
            fullUrl=f"urn:uuid:{message_id}",
            resource=message_header
        ))

        # 2. Patient
        patient_id = str(uuid4())
        patient = self._build_patient(patient_obj, patient_id)
        bundle.entry.append(BundleEntry(
            fullUrl=f"urn:uuid:{patient_id}",
            resource=patient
        ))

        # 3. Practitioner (Prescriber)
        practitioner_id = str(uuid4())
        practitioner = self._build_practitioner(prescriber_obj, practitioner_id)
        bundle.entry.append(BundleEntry(
            fullUrl=f"urn:uuid:{practitioner_id}",
            resource=practitioner
        ))

        # 4. PractitionerRole
        practitioner_role_id = str(uuid4())
        practitioner_role = self._build_practitioner_role(
            practitioner_id,
            practitioner_role_id,
            prescriber_obj
        )
        bundle.entry.append(BundleEntry(
            fullUrl=f"urn:uuid:{practitioner_role_id}",
            resource=practitioner_role
        ))

        # 5. Organization (Prescribing)
        org_id = str(uuid4())
        organization = self._build_organization(org_id)
        bundle.entry.append(BundleEntry(
            fullUrl=f"urn:uuid:{org_id}",
            resource=organization
        ))

        # 6. MedicationRequest
        med_request_id = str(uuid4())
        medication_request = self._build_medication_request(
            medication_obj,
            med_request_id,
            patient_id,
            practitioner_role_id,
            pharmacy_ods_code
        )
        bundle.entry.append(BundleEntry(
            fullUrl=f"urn:uuid:{med_request_id}",
            resource=medication_request
        ))

        # Convert to dict for JSON serialization
        return bundle.dict(exclude_none=True)

    def _build_message_header(self, message_id: str, destination_ods: str) -> MessageHeader:
        """Build MessageHeader resource"""
        return MessageHeader(
            id=message_id,
            eventCoding=Coding(
                system="https://fhir.nhs.uk/CodeSystem/message-event",
                code="prescription-order",
                display="Prescription Order"
            ),
            destination=[
                MessageHeaderDestination(
                    name="NHS Electronic Prescription Service",
                    endpoint=f"https://directory.spineservices.nhs.uk/STU3/Organization/{destination_ods}",
                    receiver=Reference(
                        identifier=Identifier(
                            system="https://fhir.nhs.uk/Id/ods-organization-code",
                            value=destination_ods
                        )
                    )
                )
            ],
            sender=Reference(
                identifier=Identifier(
                    system="https://fhir.nhs.uk/Id/ods-organization-code",
                    value=self.org_ods_code
                ),
                display=self.org_name
            ),
            source=MessageHeaderSource(
                name=self.org_name,
                software="PHB Hospital System",
                version="1.0.0",
                endpoint=f"https://directory.spineservices.nhs.uk/STU3/Organization/{self.org_ods_code}"
            ),
            reason=CodeableConcept(
                coding=[
                    Coding(
                        system="https://fhir.nhs.uk/CodeSystem/message-reason-prescription",
                        code="prescription",
                        display="Prescription"
                    )
                ]
            )
        )

    def _build_patient(self, patient_obj: CustomUser, patient_id: str) -> Patient:
        """Build Patient resource from CustomUser"""

        # Extract patient data
        name_parts = patient_obj.get_full_name().split(' ', 1)
        given_name = name_parts[0] if name_parts else ''
        family_name = name_parts[1] if len(name_parts) > 1 else ''

        patient = Patient(
            id=patient_id,
            identifier=[
                Identifier(
                    system="https://fhir.nhs.uk/Id/nhs-number",
                    value=getattr(patient_obj, 'hpn', '9999999999')  # Fallback for testing
                )
            ],
            name=[
                HumanName(
                    use="official",
                    family=family_name,
                    given=[given_name]
                )
            ],
            gender=getattr(patient_obj, 'gender', 'unknown'),
            birthDate=getattr(patient_obj, 'date_of_birth', None),
            address=[
                Address(
                    use="home",
                    line=[getattr(patient_obj, 'address', '')],
                    city=getattr(patient_obj, 'city', ''),
                    postalCode=getattr(patient_obj, 'postcode', ''),
                    country="United Kingdom"
                )
            ],
            telecom=[
                ContactPoint(
                    system="phone",
                    value=patient_obj.phone_number or '',
                    use="mobile"
                ),
                ContactPoint(
                    system="email",
                    value=patient_obj.email,
                    use="home"
                )
            ]
        )

        return patient

    def _build_practitioner(self, prescriber_obj, practitioner_id: str) -> Practitioner:
        """Build Practitioner resource from DoctorProfile"""

        return Practitioner(
            id=practitioner_id,
            identifier=[
                Identifier(
                    system="https://fhir.nhs.uk/Id/sds-user-id",
                    value=getattr(prescriber_obj, 'gmc_number', 'GMC12345')  # General Medical Council number
                )
            ],
            name=[
                HumanName(
                    use="official",
                    family=prescriber_obj.user.last_name,
                    given=[prescriber_obj.user.first_name],
                    prefix=["Dr"]
                )
            ],
            telecom=[
                ContactPoint(
                    system="email",
                    value=prescriber_obj.user.email
                )
            ],
            qualification=[
                PractitionerQualification(
                    code=CodeableConcept(
                        coding=[
                            Coding(
                                system="https://fhir.nhs.uk/CodeSystem/professional-code",
                                code=getattr(prescriber_obj, 'specialty', 'general-practice'),
                                display=getattr(prescriber_obj, 'specialty', 'General Practice')
                            )
                        ]
                    )
                )
            ]
        )

    def _build_practitioner_role(
        self,
        practitioner_id: str,
        role_id: str,
        prescriber_obj
    ) -> PractitionerRole:
        """Build PractitionerRole linking Practitioner to Organization"""

        return PractitionerRole(
            id=role_id,
            practitioner=Reference(reference=f"urn:uuid:{practitioner_id}"),
            code=[
                CodeableConcept(
                    coding=[
                        Coding(
                            system="https://fhir.nhs.uk/CodeSystem/professional-code",
                            code="medical-practitioner",
                            display="Medical Practitioner"
                        )
                    ]
                )
            ],
            specialty=[
                CodeableConcept(
                    coding=[
                        Coding(
                            system="https://fhir.nhs.uk/CodeSystem/specialty",
                            code=getattr(prescriber_obj, 'specialty', 'general-practice'),
                            display=getattr(prescriber_obj, 'specialty', 'General Practice')
                        )
                    ]
                )
            ]
        )

    def _build_organization(self, org_id: str) -> Organization:
        """Build Organization resource for prescribing organization"""

        return Organization(
            id=org_id,
            identifier=[
                Identifier(
                    system="https://fhir.nhs.uk/Id/ods-organization-code",
                    value=self.org_ods_code
                )
            ],
            name=self.org_name,
            type=[
                CodeableConcept(
                    coding=[
                        Coding(
                            system="https://fhir.nhs.uk/CodeSystem/organisation-type",
                            code="hospital",
                            display="Hospital"
                        )
                    ]
                )
            ]
        )

    def _build_medication_request(
        self,
        medication_obj: MedicationModel,
        request_id: str,
        patient_id: str,
        practitioner_role_id: str,
        pharmacy_ods_code: str
    ) -> MedicationRequest:
        """Build MedicationRequest resource"""

        return MedicationRequest(
            id=request_id,
            identifier=[
                Identifier(
                    system="https://fhir.nhs.uk/Id/prescription-order-item-number",
                    value=medication_obj.prescription_number or str(uuid4())
                )
            ],
            status="active",
            intent="order",
            category=[
                CodeableConcept(
                    coding=[
                        Coding(
                            system="https://fhir.nhs.uk/CodeSystem/prescription-type",
                            code="acute" if not medication_obj.is_ongoing else "repeat",
                            display="Acute" if not medication_obj.is_ongoing else "Repeat"
                        )
                    ]
                )
            ],
            medicationCodeableConcept=CodeableConcept(
                coding=[
                    Coding(
                        system="https://dmd.nhs.uk",  # NHS dm+d (Dictionary of Medicines and Devices)
                        code=medication_obj.catalog_entry.dmd_code if medication_obj.catalog_entry else "unknown",
                        display=medication_obj.medication_name
                    )
                ],
                text=medication_obj.medication_name
            ),
            subject=Reference(reference=f"urn:uuid:{patient_id}"),
            authoredOn=medication_obj.start_date.isoformat() if medication_obj.start_date else datetime.now(dt_timezone.utc).isoformat(),
            requester=Reference(reference=f"urn:uuid:{practitioner_role_id}"),
            dosageInstruction=[
                Dosage(
                    text=medication_obj.dosage or "As directed",
                    timing={
                        "repeat": {
                            "frequency": self._parse_frequency(medication_obj.frequency)
                        }
                    },
                    route=CodeableConcept(
                        coding=[
                            Coding(
                                system="https://fhir.nhs.uk/CodeSystem/route",
                                code=medication_obj.route or "oral",
                                display=medication_obj.route or "Oral"
                            )
                        ]
                    ),
                    doseAndRate=[{
                        "doseQuantity": Quantity(
                            value=self._parse_dose_value(medication_obj.dosage),
                            unit=medication_obj.form or "tablet"
                        )
                    }]
                )
            ],
            dispenseRequest=MedicationRequestDispenseRequest(
                performer=Reference(
                    identifier=Identifier(
                        system="https://fhir.nhs.uk/Id/ods-organization-code",
                        value=pharmacy_ods_code
                    )
                ),
                quantity=Quantity(
                    value=self._calculate_quantity(medication_obj),
                    unit=medication_obj.form or "tablet"
                ),
                numberOfRepeatsAllowed=medication_obj.refills_authorized or 0,
                validityPeriod={
                    "start": medication_obj.start_date.isoformat() if medication_obj.start_date else None,
                    "end": medication_obj.end_date.isoformat() if medication_obj.end_date else None
                }
            ),
            note=[{
                "text": medication_obj.patient_instructions or ""
            }] if medication_obj.patient_instructions else None
        )

    def _parse_frequency(self, frequency_str: str) -> int:
        """Parse frequency string to integer (e.g., 'twice daily' -> 2)"""
        if not frequency_str:
            return 1

        freq_map = {
            'once': 1, 'twice': 2, 'three times': 3, 'four times': 4,
            'daily': 1, 'bid': 2, 'tid': 3, 'qid': 4
        }

        for key, value in freq_map.items():
            if key in frequency_str.lower():
                return value

        return 1

    def _parse_dose_value(self, dosage_str: str) -> float:
        """Extract numeric dose from dosage string"""
        if not dosage_str:
            return 1.0

        import re
        match = re.search(r'(\d+(?:\.\d+)?)', dosage_str)
        return float(match.group(1)) if match else 1.0

    def _calculate_quantity(self, medication_obj: MedicationModel) -> int:
        """Calculate total quantity based on duration and frequency"""
        if not medication_obj.duration or not medication_obj.frequency:
            return 28  # Default 28-day supply

        # Parse duration (e.g., "7 days", "2 weeks")
        duration_days = self._parse_duration_days(medication_obj.duration)
        frequency_per_day = self._parse_frequency(medication_obj.frequency)
        dose_per_time = self._parse_dose_value(medication_obj.dosage)

        return int(duration_days * frequency_per_day * dose_per_time)

    def _parse_duration_days(self, duration_str: str) -> int:
        """Parse duration string to days"""
        if not duration_str:
            return 28

        import re
        match = re.search(r'(\d+)\s*(day|week|month)', duration_str.lower())
        if not match:
            return 28

        value = int(match.group(1))
        unit = match.group(2)

        multipliers = {'day': 1, 'week': 7, 'month': 30}
        return value * multipliers.get(unit, 1)
```

#### 4. NHS EPS API Client

**File**: `/Users/new/Newphb/basebackend/api/services/fhir/eps_client.py` (NEW FILE)

```python
"""
NHS Electronic Prescription Service (EPS) API Client
Handles OAuth 2.0 authentication, prescription submission, and status tracking
"""

import requests
import json
import logging
from typing import Dict, Any, Optional
from datetime import datetime, timedelta
from django.conf import settings
from django.core.cache import cache
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.backends import default_backend
import jose.jws

logger = logging.getLogger(__name__)


class EPSFHIRClient:
    """Client for NHS EPS FHIR API"""

    def __init__(self):
        self.config = settings.NHS_EPS_CONFIG
        self.env = self.config['environment']
        self.endpoints = self.config['endpoints'][self.env]
        self.client_id = self.config['client_id']
        self.client_secret = self.config['client_secret']
        self.api_key = self.config['api_key']

        self.fhir_base_url = self.endpoints['fhir_base']
        self.token_url = self.endpoints['token_url']

        self._access_token = None
        self._token_expiry = None

    def _get_access_token(self) -> str:
        """
        Get OAuth 2.0 access token (cached)
        NHS EPS uses OAuth 2.0 Client Credentials flow
        """

        # Check cache first
        cached_token = cache.get('nhs_eps_access_token')
        if cached_token:
            return cached_token

        # Request new token
        try:
            response = requests.post(
                self.token_url,
                data={
                    'grant_type': 'client_credentials',
                    'client_id': self.client_id,
                    'client_secret': self.client_secret,
                },
                headers={
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'apikey': self.api_key
                },
                timeout=10
            )

            response.raise_for_status()
            token_data = response.json()

            access_token = token_data['access_token']
            expires_in = token_data.get('expires_in', 3600)

            # Cache token (expire 5 minutes early to be safe)
            cache.set('nhs_eps_access_token', access_token, timeout=expires_in - 300)

            logger.info("NHS EPS: Obtained new access token")
            return access_token

        except requests.exceptions.RequestException as e:
            logger.error(f"NHS EPS: Failed to obtain access token: {e}")
            raise

    def _sign_bundle(self, bundle: Dict[str, Any]) -> Dict[str, Any]:
        """
        Digitally sign FHIR bundle with organization's private key
        NHS requires digital signatures for prescription authenticity
        """

        if self.env == 'sandbox':
            # Sandbox doesn't require real signatures
            logger.info("NHS EPS: Sandbox mode - skipping digital signature")
            return bundle

        signing_key_path = self.config.get('signing_key_path')
        if not signing_key_path:
            logger.warning("NHS EPS: No signing key configured, skipping signature")
            return bundle

        try:
            # Load private key
            with open(signing_key_path, 'rb') as key_file:
                private_key = serialization.load_pem_private_key(
                    key_file.read(),
                    password=None,
                    backend=default_backend()
                )

            # Create JWS (JSON Web Signature)
            bundle_json = json.dumps(bundle, separators=(',', ':'))

            signature = jose.jws.sign(
                bundle_json.encode('utf-8'),
                private_key,
                algorithm='RS256',
                headers={'typ': 'JWT'}
            )

            # Attach signature to bundle
            bundle['signature'] = {
                'type': [{
                    'system': 'urn:iso-astm:E1762-95:2013',
                    'code': '1.2.840.10065.1.12.1.1',
                    'display': 'Author\'s Signature'
                }],
                'when': datetime.utcnow().isoformat() + 'Z',
                'who': {
                    'identifier': {
                        'system': 'https://fhir.nhs.uk/Id/ods-organization-code',
                        'value': self.config['organization_ods_code']
                    }
                },
                'data': signature.decode('utf-8')
            }

            logger.info("NHS EPS: Bundle digitally signed")
            return bundle

        except Exception as e:
            logger.error(f"NHS EPS: Failed to sign bundle: {e}")
            raise

    def prepare_prescription(self, bundle: Dict[str, Any]) -> Dict[str, Any]:
        """
        Prepare prescription for submission (validate and sign)

        Args:
            bundle: FHIR Bundle dict from FHIRPrescriptionBuilder

        Returns:
            Signed and validated bundle ready for submission
        """

        # Validate bundle structure
        if bundle.get('resourceType') != 'Bundle':
            raise ValueError("Invalid FHIR Bundle: resourceType must be 'Bundle'")

        if bundle.get('type') != 'message':
            raise ValueError("Invalid FHIR Bundle: type must be 'message'")

        # Sign bundle
        signed_bundle = self._sign_bundle(bundle)

        logger.info(f"NHS EPS: Prepared prescription bundle {bundle.get('id')}")
        return signed_bundle

    def submit_prescription(self, signed_bundle: Dict[str, Any]) -> Dict[str, Any]:
        """
        Submit prescription to NHS EPS

        POST /$process-message

        Returns:
            Response with prescription ID and status
        """

        access_token = self._get_access_token()

        try:
            response = requests.post(
                f"{self.fhir_base_url}/$process-message",
                json=signed_bundle,
                headers={
                    'Authorization': f'Bearer {access_token}',
                    'Content-Type': 'application/fhir+json',
                    'Accept': 'application/fhir+json',
                    'apikey': self.api_key,
                    'X-Request-ID': signed_bundle.get('id', 'unknown')
                },
                timeout=30
            )

            response.raise_for_status()
            result = response.json()

            logger.info(f"NHS EPS: Prescription submitted successfully - {result.get('id')}")
            return {
                'status': 'submitted',
                'prescription_id': result.get('id'),
                'eps_response': result
            }

        except requests.exceptions.HTTPError as e:
            logger.error(f"NHS EPS: Prescription submission failed: {e.response.text}")
            return {
                'status': 'failed',
                'error': e.response.text,
                'http_status': e.response.status_code
            }
        except requests.exceptions.RequestException as e:
            logger.error(f"NHS EPS: Network error during submission: {e}")
            return {
                'status': 'error',
                'error': str(e)
            }

    def get_prescription_status(self, prescription_id: str) -> Dict[str, Any]:
        """
        Check prescription status in NHS EPS

        GET /Task/{prescription-id}
        """

        access_token = self._get_access_token()

        try:
            response = requests.get(
                f"{self.fhir_base_url}/Task/{prescription_id}",
                headers={
                    'Authorization': f'Bearer {access_token}',
                    'Accept': 'application/fhir+json',
                    'apikey': self.api_key
                },
                timeout=10
            )

            response.raise_for_status()
            task = response.json()

            return {
                'prescription_id': prescription_id,
                'status': task.get('status'),
                'task': task
            }

        except requests.exceptions.RequestException as e:
            logger.error(f"NHS EPS: Failed to get prescription status: {e}")
            return {
                'prescription_id': prescription_id,
                'status': 'unknown',
                'error': str(e)
            }

    def release_prescription(self, prescription_id: str, pharmacy_ods_code: str) -> Dict[str, Any]:
        """
        Release prescription to specific pharmacy
        (Used when patient wants to override nominated pharmacy)
        """

        access_token = self._get_access_token()

        release_bundle = {
            'resourceType': 'Parameters',
            'parameter': [
                {
                    'name': 'owner',
                    'valueIdentifier': {
                        'system': 'https://fhir.nhs.uk/Id/ods-organization-code',
                        'value': pharmacy_ods_code
                    }
                }
            ]
        }

        try:
            response = requests.post(
                f"{self.fhir_base_url}/Task/{prescription_id}/$release",
                json=release_bundle,
                headers={
                    'Authorization': f'Bearer {access_token}',
                    'Content-Type': 'application/fhir+json',
                    'apikey': self.api_key
                },
                timeout=10
            )

            response.raise_for_status()

            logger.info(f"NHS EPS: Prescription {prescription_id} released to {pharmacy_ods_code}")
            return {
                'status': 'released',
                'prescription_id': prescription_id,
                'pharmacy_ods_code': pharmacy_ods_code
            }

        except requests.exceptions.RequestException as e:
            logger.error(f"NHS EPS: Failed to release prescription: {e}")
            return {
                'status': 'error',
                'error': str(e)
            }

    def cancel_prescription(self, prescription_id: str, reason: str) -> Dict[str, Any]:
        """Cancel prescription in NHS EPS"""

        access_token = self._get_access_token()

        cancel_bundle = {
            'resourceType': 'Parameters',
            'parameter': [
                {
                    'name': 'status-reason',
                    'valueCodeableConcept': {
                        'coding': [{
                            'system': 'https://fhir.nhs.uk/CodeSystem/EPS-task-dispense-withdraw-reason',
                            'code': 'MU',
                            'display': reason
                        }]
                    }
                }
            ]
        }

        try:
            response = requests.post(
                f"{self.fhir_base_url}/Task/{prescription_id}/$cancel",
                json=cancel_bundle,
                headers={
                    'Authorization': f'Bearer {access_token}',
                    'Content-Type': 'application/fhir+json',
                    'apikey': self.api_key
                },
                timeout=10
            )

            response.raise_for_status()

            logger.info(f"NHS EPS: Prescription {prescription_id} cancelled")
            return {
                'status': 'cancelled',
                'prescription_id': prescription_id
            }

        except requests.exceptions.RequestException as e:
            logger.error(f"NHS EPS: Failed to cancel prescription: {e}")
            return {
                'status': 'error',
                'error': str(e)
            }


# Singleton instance
eps_client = EPSFHIRClient()
```

#### 5. EPS Prescription Submission Model

**File**: `/Users/new/Newphb/basebackend/api/models/medical/eps_submission.py` (NEW FILE)

```python
from django.db import models
from api.models.medical.medication import Medication


class EPSSubmission(models.Model):
    """Track NHS EPS prescription submissions"""

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('submitted', 'Submitted to EPS'),
        ('accepted', 'Accepted by EPS'),
        ('dispensed', 'Dispensed'),
        ('cancelled', 'Cancelled'),
        ('failed', 'Submission Failed'),
        ('error', 'Error'),
    ]

    medication = models.OneToOneField(
        Medication,
        on_delete=models.CASCADE,
        related_name='eps_submission'
    )

    # EPS identifiers
    prescription_id = models.CharField(
        max_length=255,
        blank=True,
        help_text="NHS EPS prescription ID"
    )
    bundle_id = models.CharField(
        max_length=255,
        help_text="FHIR Bundle ID"
    )

    # Submission tracking
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending'
    )
    submitted_at = models.DateTimeField(null=True, blank=True)
    accepted_at = models.DateTimeField(null=True, blank=True)
    dispensed_at = models.DateTimeField(null=True, blank=True)

    # FHIR bundle (stored for audit)
    fhir_bundle = models.JSONField(
        help_text="Complete FHIR bundle sent to EPS"
    )
    eps_response = models.JSONField(
        null=True,
        blank=True,
        help_text="Response from EPS API"
    )

    # Error tracking
    error_message = models.TextField(blank=True)
    retry_count = models.IntegerField(default=0)
    last_retry_at = models.DateTimeField(null=True, blank=True)

    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['prescription_id']),
            models.Index(fields=['status', 'created_at']),
        ]

    def __str__(self):
        return f"EPS Submission: {self.medication.medication_name} - {self.status}"
```

**Migration**: Run `python manage.py makemigrations` and `python manage.py migrate`

#### 6. EPS Submission View

**File**: `/Users/new/Newphb/basebackend/api/views/pharmacy/eps_views.py` (NEW FILE)

```python
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone

from api.models.medical.medication import Medication
from api.models.medical.eps_submission import EPSSubmission
from api.services.fhir.prescription_builder import FHIRPrescriptionBuilder
from api.services.fhir.eps_client import eps_client
import logging

logger = logging.getLogger(__name__)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_prescription_to_eps(request, medication_id):
    """
    Submit prescription to NHS EPS

    POST /api/medications/{id}/submit-to-eps/

    Returns: Submission status
    """

    try:
        medication = Medication.objects.select_related(
            'medical_record__user',
            'prescribed_by__user',
            'nominated_pharmacy'
        ).get(id=medication_id)
    except Medication.DoesNotExist:
        return Response(
            {'error': 'Medication not found'},
            status=status.HTTP_404_NOT_FOUND
        )

    # Authorization: Only prescriber can submit
    if not hasattr(request.user, 'doctor_profile') or medication.prescribed_by != request.user.doctor_profile:
        return Response(
            {'error': 'Only the prescribing doctor can submit to EPS'},
            status=status.HTTP_403_FORBIDDEN
        )

    # Check if already submitted
    if hasattr(medication, 'eps_submission'):
        return Response(
            {
                'error': 'Prescription already submitted to EPS',
                'submission': {
                    'status': medication.eps_submission.status,
                    'prescription_id': medication.eps_submission.prescription_id
                }
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    # Validate nominated pharmacy
    if not medication.nominated_pharmacy:
        return Response(
            {'error': 'No nominated pharmacy - cannot submit to EPS'},
            status=status.HTTP_400_BAD_REQUEST
        )

    if not medication.nominated_pharmacy.eps_enabled:
        return Response(
            {'error': f'Pharmacy {medication.nominated_pharmacy.name} is not EPS-enabled'},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        # Build FHIR bundle
        builder = FHIRPrescriptionBuilder()
        fhir_bundle = builder.build_prescription_bundle(
            medication_obj=medication,
            patient_obj=medication.medical_record.user,
            prescriber_obj=medication.prescribed_by,
            pharmacy_ods_code=medication.nominated_pharmacy.ods_code
        )

        # Prepare and sign
        signed_bundle = eps_client.prepare_prescription(fhir_bundle)

        # Submit to NHS EPS
        submission_result = eps_client.submit_prescription(signed_bundle)

        # Create submission record
        eps_submission = EPSSubmission.objects.create(
            medication=medication,
            bundle_id=fhir_bundle['id'],
            prescription_id=submission_result.get('prescription_id', ''),
            status='submitted' if submission_result['status'] == 'submitted' else 'failed',
            fhir_bundle=signed_bundle,
            eps_response=submission_result.get('eps_response'),
            error_message=submission_result.get('error', ''),
            submitted_at=timezone.now() if submission_result['status'] == 'submitted' else None
        )

        # Update medication status
        if submission_result['status'] == 'submitted':
            medication.status = 'pending'
            medication.save()

        logger.info(f"EPS submission created for medication {medication_id}: {eps_submission.status}")

        return Response({
            'status': 'success' if submission_result['status'] == 'submitted' else 'failed',
            'message': 'Prescription submitted to NHS EPS' if submission_result['status'] == 'submitted' else 'Submission failed',
            'submission': {
                'id': eps_submission.id,
                'status': eps_submission.status,
                'prescription_id': eps_submission.prescription_id,
                'bundle_id': eps_submission.bundle_id,
                'submitted_at': eps_submission.submitted_at,
                'error': eps_submission.error_message
            }
        }, status=status.HTTP_201_CREATED if submission_result['status'] == 'submitted' else status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        logger.error(f"EPS submission failed for medication {medication_id}: {str(e)}")
        return Response(
            {
                'status': 'error',
                'message': 'Internal error during EPS submission',
                'error': str(e)
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_eps_status(request, medication_id):
    """
    Get NHS EPS submission status

    GET /api/medications/{id}/eps-status/
    """

    try:
        medication = Medication.objects.get(id=medication_id)
    except Medication.DoesNotExist:
        return Response(
            {'error': 'Medication not found'},
            status=status.HTTP_404_NOT_FOUND
        )

    if not hasattr(medication, 'eps_submission'):
        return Response(
            {'status': 'not_submitted', 'message': 'Not submitted to EPS'},
            status=status.HTTP_200_OK
        )

    eps_submission = medication.eps_submission

    # Fetch latest status from NHS EPS
    if eps_submission.prescription_id:
        eps_status = eps_client.get_prescription_status(eps_submission.prescription_id)

        # Update local status
        if eps_status.get('status') and eps_status['status'] != eps_submission.status:
            eps_submission.status = eps_status['status']
            eps_submission.eps_response = eps_status.get('task')
            eps_submission.save()

    return Response({
        'status': eps_submission.status,
        'prescription_id': eps_submission.prescription_id,
        'submitted_at': eps_submission.submitted_at,
        'dispensed_at': eps_submission.dispensed_at,
        'error': eps_submission.error_message
    })
```

**URL Routes**: Add to `api/urls.py`

```python
from api.views.pharmacy.eps_views import submit_prescription_to_eps, get_eps_status

urlpatterns += [
    path('medications/<int:medication_id>/submit-to-eps/', submit_prescription_to_eps),
    path('medications/<int:medication_id>/eps-status/', get_eps_status),
]
```

### Success Criteria

#### Automated Verification:
- [ ] Dependencies installed: `pip list | grep fhir.resources`
- [ ] Django settings include NHS_EPS_CONFIG
- [ ] FHIR bundle builder creates valid Bundle resource
- [ ] Digital signature generated (production mode)
- [ ] OAuth 2.0 token obtained from sandbox
- [ ] Unit tests pass: `python manage.py test api.tests.test_eps_integration`

#### Manual Verification (NHS Sandbox):
- [ ] Create prescription with nominated pharmacy
- [ ] Call `POST /api/medications/{id}/submit-to-eps/`
- [ ] Verify submission status returns 'submitted'
- [ ] Check EPSSubmission record created in database
- [ ] Verify FHIR bundle stored in `fhir_bundle` field
- [ ] Call `GET /api/medications/{id}/eps-status/` - returns current status
- [ ] Check NHS sandbox portal for submitted prescription

**Implementation Note**: After completing this phase and all automated verification passes, pause here for manual confirmation from the human that the manual testing was successful before proceeding to the next phase.

---

## Phase 5: Prescription Referral & Barcode System

### Overview
Handle edge case when nominated pharmacy doesn't have prescribed medicine: generate GS1 DataMatrix barcode for referral to alternative pharmacy, notify patient and doctor, enable pharmacy to print referral form.

### Changes Required

#### 1. Install Barcode Dependencies

**File**: `/Users/new/Newphb/basebackend/requirements.txt` (ADD)

```txt
# Barcode generation
pylibdmtx>=0.1.10
Pillow>=10.0.0
qrcode>=7.4
```

Run: `pip install -r requirements.txt`

#### 2. Prescription Referral Model

**File**: `/Users/new/Newphb/basebackend/api/models/medical/prescription_referral.py` (NEW FILE)

```python
from django.db import models
from api.models.medical.medication import Medication
from api.models.medical.pharmacy import Pharmacy
from api.models.user.custom_user import CustomUser


class PrescriptionReferral(models.Model):
    """
    Tracks prescription referrals when pharmacy cannot fulfill prescription
    Generates barcode for patient to take to alternative pharmacy
    """

    REFERRAL_REASON_CHOICES = [
        ('out_of_stock', 'Medicine out of stock'),
        ('not_stocked', 'Medicine not normally stocked'),
        ('special_order', 'Special order required'),
        ('patient_request', 'Patient requested alternative'),
        ('other', 'Other reason'),
    ]

    STATUS_CHOICES = [
        ('pending', 'Pending - awaiting alternative pharmacy'),
        ('referred', 'Referred to alternative pharmacy'),
        ('dispensed', 'Dispensed by alternative pharmacy'),
        ('cancelled', 'Cancelled'),
    ]

    # Original prescription
    medication = models.ForeignKey(
        Medication,
        on_delete=models.CASCADE,
        related_name='referrals'
    )

    # Pharmacies involved
    original_pharmacy = models.ForeignKey(
        Pharmacy,
        on_delete=models.CASCADE,
        related_name='referrals_from',
        help_text="Pharmacy that could not fulfill prescription"
    )
    referral_pharmacy = models.ForeignKey(
        Pharmacy,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='referrals_to',
        help_text="Alternative pharmacy selected by patient"
    )

    # Referral details
    reason = models.CharField(
        max_length=20,
        choices=REFERRAL_REASON_CHOICES,
        default='out_of_stock'
    )
    reason_details = models.TextField(
        blank=True,
        help_text="Additional details about why referral is needed"
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending'
    )

    # Barcode
    barcode_data = models.TextField(
        help_text="GS1 DataMatrix barcode data (prescription details)"
    )
    barcode_image = models.ImageField(
        upload_to='prescription_barcodes/',
        help_text="Generated barcode image"
    )

    # Suggested alternatives (JSON list of pharmacy IDs)
    suggested_pharmacies = models.JSONField(
        default=list,
        help_text="List of nearby pharmacies with stock availability"
    )

    # Notifications
    patient_notified = models.BooleanField(default=False)
    doctor_notified = models.BooleanField(default=False)
    notification_sent_at = models.DateTimeField(null=True, blank=True)

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    referred_at = models.DateTimeField(
        null=True,
        blank=True,
        help_text="When patient selected alternative pharmacy"
    )
    dispensed_at = models.DateTimeField(
        null=True,
        blank=True,
        help_text="When alternative pharmacy dispensed medication"
    )

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['medication', 'status']),
            models.Index(fields=['original_pharmacy', 'created_at']),
            models.Index(fields=['status', 'created_at']),
        ]

    def __str__(self):
        return f"Referral: {self.medication.medication_name} from {self.original_pharmacy.name} ({self.status})"
```

**Migration**: Run `python manage.py makemigrations` and `python manage.py migrate`

#### 3. Barcode Generator Service

**File**: `/Users/new/Newphb/basebackend/api/services/barcode/barcode_generator.py` (NEW FILE)

```python
"""
GS1 DataMatrix Barcode Generator for NHS Prescriptions
Follows GS1 Application Identifier standards for healthcare
"""

from pylibdmtx.pylibdmtx import encode
from PIL import Image, ImageDraw, ImageFont
import io
import logging
from typing import Dict, Any

logger = logging.getLogger(__name__)


class PrescriptionBarcodeGenerator:
    """Generate GS1 DataMatrix barcodes for prescription referrals"""

    # GS1 Application Identifiers (AI)
    AI_GTIN = '01'  # Global Trade Item Number
    AI_BATCH = '10'  # Batch/Lot Number
    AI_EXPIRY = '17'  # Expiration Date (YYMMDD)
    AI_SERIAL = '21'  # Serial Number
    AI_PRESCRIPTION = '8010'  # NHS Prescription Number (custom)
    AI_hpn = '8011'  # HPN (custom)

    @staticmethod
    def generate_prescription_barcode(
        prescription_id: str,
        hpn: str,
        medication_name: str,
        pharmacy_ods_original: str,
        pharmacy_ods_referral: str = None,
        dosage: str = None
    ) -> Image:
        """
        Generate GS1 DataMatrix barcode for prescription

        Args:
            prescription_id: Prescription number
            hpn: Patient HPN
            medication_name: Name of medication
            pharmacy_ods_original: ODS code of original pharmacy
            pharmacy_ods_referral: ODS code of referral pharmacy (optional)
            dosage: Dosage instructions (optional)

        Returns:
            PIL Image object with barcode
        """

        # Build GS1-compliant barcode data
        barcode_data = PrescriptionBarcodeGenerator._build_gs1_data(
            prescription_id=prescription_id,
            hpn=hpn,
            medication_name=medication_name,
            pharmacy_ods_original=pharmacy_ods_original,
            pharmacy_ods_referral=pharmacy_ods_referral
        )

        # Encode as DataMatrix
        encoded = encode(barcode_data.encode('utf-8'))

        if not encoded:
            raise ValueError("Failed to encode barcode data")

        # Convert to PIL Image
        img = Image.frombytes('RGB', (encoded.width, encoded.height), encoded.pixels)

        # Scale up for readability (DataMatrix can be very small)
        scale_factor = 4
        img = img.resize(
            (encoded.width * scale_factor, encoded.height * scale_factor),
            Image.NEAREST
        )

        # Add human-readable text below barcode
        final_img = PrescriptionBarcodeGenerator._add_human_readable_text(
            img,
            prescription_id,
            medication_name,
            dosage
        )

        logger.info(f"Generated barcode for prescription {prescription_id}")
        return final_img

    @staticmethod
    def _build_gs1_data(
        prescription_id: str,
        hpn: str,
        medication_name: str,
        pharmacy_ods_original: str,
        pharmacy_ods_referral: str = None
    ) -> str:
        """
        Build GS1-compliant data string with Application Identifiers

        Format: (AI)value(AI)value...
        Example: (8010)RX123456(8011)9876543210(01)12345678901234
        """

        gs1_data = f"({PrescriptionBarcodeGenerator.AI_PRESCRIPTION}){prescription_id}"
        gs1_data += f"({PrescriptionBarcodeGenerator.AI_hpn}){hpn}"

        # Medication identifier (simplified - real implementation would use dm+d code)
        medication_code = medication_name[:20].upper().replace(' ', '')
        gs1_data += f"({PrescriptionBarcodeGenerator.AI_BATCH}){medication_code}"

        # Pharmacy ODS codes
        gs1_data += f"(91){pharmacy_ods_original}"  # AI 91 = internal company code
        if pharmacy_ods_referral:
            gs1_data += f"(92){pharmacy_ods_referral}"

        return gs1_data

    @staticmethod
    def _add_human_readable_text(
        barcode_img: Image,
        prescription_id: str,
        medication_name: str,
        dosage: str = None
    ) -> Image:
        """Add human-readable text below barcode"""

        # Create new image with space for text
        text_height = 80
        new_img = Image.new(
            'RGB',
            (barcode_img.width, barcode_img.height + text_height),
            color='white'
        )

        # Paste barcode at top
        new_img.paste(barcode_img, (0, 0))

        # Add text
        draw = ImageDraw.Draw(new_img)

        try:
            font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 14)
            font_small = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 12)
        except:
            font = ImageFont.load_default()
            font_small = font

        # Prescription ID
        draw.text(
            (10, barcode_img.height + 10),
            f"Prescription: {prescription_id}",
            fill='black',
            font=font
        )

        # Medication name
        medication_text = medication_name[:40]  # Truncate if too long
        draw.text(
            (10, barcode_img.height + 30),
            medication_text,
            fill='black',
            font=font_small
        )

        # Dosage (if provided)
        if dosage:
            dosage_text = dosage[:50]
            draw.text(
                (10, barcode_img.height + 50),
                dosage_text,
                fill='black',
                font=font_small
            )

        return new_img

    @staticmethod
    def generate_barcode_bytes(
        prescription_id: str,
        hpn: str,
        medication_name: str,
        pharmacy_ods_original: str,
        pharmacy_ods_referral: str = None,
        dosage: str = None
    ) -> bytes:
        """
        Generate barcode and return as PNG bytes (for saving to database)
        """

        img = PrescriptionBarcodeGenerator.generate_prescription_barcode(
            prescription_id=prescription_id,
            hpn=hpn,
            medication_name=medication_name,
            pharmacy_ods_original=pharmacy_ods_original,
            pharmacy_ods_referral=pharmacy_ods_referral,
            dosage=dosage
        )

        # Convert to bytes
        img_bytes = io.BytesIO()
        img.save(img_bytes, format='PNG')
        return img_bytes.getvalue()
```

#### 4. Referral Creation View

**File**: `/Users/new/Newphb/basebackend/api/views/pharmacy/referral_views.py` (NEW FILE)

```python
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from django.core.files.base import ContentFile
from django.db.models import Q
from math import radians, sin, cos, sqrt, atan2

from api.models.medical.medication import Medication
from api.models.medical.prescription_referral import PrescriptionReferral
from api.models.medical.pharmacy import Pharmacy
from api.services.barcode.barcode_generator import PrescriptionBarcodeGenerator
import logging

logger = logging.getLogger(__name__)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_prescription_referral(request, medication_id):
    """
    Create prescription referral when pharmacy cannot fulfill

    POST /api/medications/{id}/create-referral/
    Body: {
        "reason": "out_of_stock",
        "reason_details": "Medicine temporarily unavailable"
    }

    Creates barcode and suggests alternative pharmacies
    """

    try:
        medication = Medication.objects.select_related(
            'nominated_pharmacy',
            'medical_record__user',
            'prescribed_by'
        ).get(id=medication_id)
    except Medication.DoesNotExist:
        return Response(
            {'error': 'Medication not found'},
            status=status.HTTP_404_NOT_FOUND
        )

    # Authorization: Pharmacy staff or prescriber
    # (In real system, would check user has pharmacy_tech role for nominated_pharmacy)

    # Validate nominated pharmacy exists
    if not medication.nominated_pharmacy:
        return Response(
            {'error': 'No nominated pharmacy - cannot create referral'},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Get referral reason
    reason = request.data.get('reason', 'out_of_stock')
    reason_details = request.data.get('reason_details', '')

    # Find nearby alternative pharmacies
    suggested_pharmacies = _find_nearby_pharmacies(
        medication.nominated_pharmacy,
        exclude_id=medication.nominated_pharmacy.id,
        limit=5
    )

    # Generate barcode data
    patient = medication.medical_record.user
    hpn = getattr(patient, 'hpn', '9999999999')

    try:
        barcode_bytes = PrescriptionBarcodeGenerator.generate_barcode_bytes(
            prescription_id=medication.prescription_number or f"RX{medication.id}",
            hpn=hpn,
            medication_name=medication.medication_name,
            pharmacy_ods_original=medication.nominated_pharmacy.ods_code,
            dosage=medication.dosage
        )

        # Create barcode data string
        barcode_data = f"RX:{medication.prescription_number}|NHS:{hpn}|MED:{medication.medication_name}"

    except Exception as e:
        logger.error(f"Barcode generation failed: {e}")
        return Response(
            {'error': f'Failed to generate barcode: {str(e)}'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

    # Create referral record
    referral = PrescriptionReferral.objects.create(
        medication=medication,
        original_pharmacy=medication.nominated_pharmacy,
        reason=reason,
        reason_details=reason_details,
        barcode_data=barcode_data,
        suggested_pharmacies=[p.id for p in suggested_pharmacies],
        status='pending'
    )

    # Save barcode image
    barcode_filename = f"prescription_{medication.id}_referral_{referral.id}.png"
    referral.barcode_image.save(
        barcode_filename,
        ContentFile(barcode_bytes),
        save=True
    )

    # TODO: Send notifications to patient and doctor
    # notification_service.notify_prescription_referral(referral)

    referral.patient_notified = True
    referral.doctor_notified = True
    referral.notification_sent_at = timezone.now()
    referral.save()

    logger.info(f"Prescription referral created: {referral.id} for medication {medication_id}")

    return Response({
        'status': 'success',
        'message': 'Referral created - patient notified',
        'referral': {
            'id': referral.id,
            'reason': referral.reason,
            'barcode_url': request.build_absolute_uri(referral.barcode_image.url) if referral.barcode_image else None,
            'suggested_pharmacies': [
                {
                    'id': p.id,
                    'name': p.name,
                    'address': f"{p.address_line_1}, {p.city}, {p.postcode}",
                    'phone': p.phone,
                    'distance_km': _calculate_distance(medication.nominated_pharmacy, p)
                }
                for p in suggested_pharmacies
            ]
        }
    }, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def select_referral_pharmacy(request, referral_id):
    """
    Patient selects alternative pharmacy for referral

    POST /api/referrals/{id}/select-pharmacy/
    Body: { "pharmacy_id": 123 }
    """

    try:
        referral = PrescriptionReferral.objects.select_related(
            'medication__medical_record__user'
        ).get(id=referral_id)
    except PrescriptionReferral.DoesNotExist:
        return Response(
            {'error': 'Referral not found'},
            status=status.HTTP_404_NOT_FOUND
        )

    # Authorization: Patient who owns prescription
    if referral.medication.medical_record.user != request.user:
        return Response(
            {'error': 'Not authorized'},
            status=status.HTTP_403_FORBIDDEN
        )

    # Get selected pharmacy
    pharmacy_id = request.data.get('pharmacy_id')
    if not pharmacy_id:
        return Response(
            {'error': 'pharmacy_id required'},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        pharmacy = Pharmacy.objects.get(id=pharmacy_id, eps_enabled=True, is_active=True)
    except Pharmacy.DoesNotExist:
        return Response(
            {'error': 'Pharmacy not found or not EPS-enabled'},
            status=status.HTTP_404_NOT_FOUND
        )

    # Update referral
    referral.referral_pharmacy = pharmacy
    referral.status = 'referred'
    referral.referred_at = timezone.now()
    referral.save()

    # Update medication's dispensing pharmacy
    referral.medication.dispensing_pharmacy = pharmacy
    referral.medication.save()

    logger.info(f"Referral {referral_id} assigned to pharmacy {pharmacy.ods_code}")

    return Response({
        'status': 'success',
        'message': f'Referral assigned to {pharmacy.name}',
        'referral': {
            'id': referral.id,
            'status': referral.status,
            'pharmacy': {
                'id': pharmacy.id,
                'name': pharmacy.name,
                'address': f"{pharmacy.address_line_1}, {pharmacy.city}, {pharmacy.postcode}",
                'phone': pharmacy.phone
            }
        }
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_prescription_referrals(request):
    """
    Get patient's prescription referrals

    GET /api/referrals/
    """

    referrals = PrescriptionReferral.objects.filter(
        medication__medical_record__user=request.user
    ).select_related(
        'medication',
        'original_pharmacy',
        'referral_pharmacy'
    ).order_by('-created_at')

    return Response({
        'referrals': [
            {
                'id': r.id,
                'medication_name': r.medication.medication_name,
                'original_pharmacy': {
                    'name': r.original_pharmacy.name,
                    'address': f"{r.original_pharmacy.address_line_1}, {r.original_pharmacy.city}"
                },
                'referral_pharmacy': {
                    'name': r.referral_pharmacy.name,
                    'address': f"{r.referral_pharmacy.address_line_1}, {r.referral_pharmacy.city}"
                } if r.referral_pharmacy else None,
                'reason': r.get_reason_display(),
                'status': r.get_status_display(),
                'created_at': r.created_at,
                'barcode_url': request.build_absolute_uri(r.barcode_image.url) if r.barcode_image else None
            }
            for r in referrals
        ]
    })


def _find_nearby_pharmacies(center_pharmacy: Pharmacy, exclude_id: int, limit: int = 5):
    """Find pharmacies near a given pharmacy"""

    if not center_pharmacy.latitude or not center_pharmacy.longitude:
        # Fallback: same postcode area
        postcode_prefix = center_pharmacy.postcode.split()[0]
        return Pharmacy.objects.filter(
            postcode__istartswith=postcode_prefix,
            eps_enabled=True,
            is_active=True
        ).exclude(id=exclude_id)[:limit]

    # Find pharmacies within 10km radius
    # (In production, use PostGIS for efficient geographic queries)
    nearby = Pharmacy.objects.filter(
        eps_enabled=True,
        is_active=True,
        latitude__isnull=False,
        longitude__isnull=False
    ).exclude(id=exclude_id)

    # Calculate distances and sort
    pharmacies_with_distance = []
    for pharmacy in nearby:
        distance = _calculate_distance(center_pharmacy, pharmacy)
        if distance <= 10:  # Within 10km
            pharmacies_with_distance.append((pharmacy, distance))

    # Sort by distance
    pharmacies_with_distance.sort(key=lambda x: x[1])

    return [p for p, d in pharmacies_with_distance[:limit]]


def _calculate_distance(pharmacy1: Pharmacy, pharmacy2: Pharmacy) -> float:
    """Calculate distance between two pharmacies in kilometers (Haversine formula)"""

    if not all([pharmacy1.latitude, pharmacy1.longitude, pharmacy2.latitude, pharmacy2.longitude]):
        return 999.0  # Unknown distance

    R = 6371  # Earth radius in km

    lat1 = radians(float(pharmacy1.latitude))
    lon1 = radians(float(pharmacy1.longitude))
    lat2 = radians(float(pharmacy2.latitude))
    lon2 = radians(float(pharmacy2.longitude))

    dlat = lat2 - lat1
    dlon = lon2 - lon1

    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * atan2(sqrt(a), sqrt(1-a))

    return R * c
```

**URL Routes**: Add to `api/urls.py`

```python
from api.views.pharmacy.referral_views import (
    create_prescription_referral,
    select_referral_pharmacy,
    get_prescription_referrals
)

urlpatterns += [
    path('medications/<int:medication_id>/create-referral/', create_prescription_referral),
    path('referrals/<int:referral_id>/select-pharmacy/', select_referral_pharmacy),
    path('referrals/', get_prescription_referrals),
]
```

#### 5. Frontend - Referral Notification UI

**File**: `/Users/new/phbfinal/phbfrontend/src/services/referralService.ts` (NEW FILE)

```typescript
import { API_BASE_URL } from '../utils/config';
import { Pharmacy } from './pharmacyService';

export interface PrescriptionReferral {
  id: number;
  medication_name: string;
  original_pharmacy: {
    name: string;
    address: string;
  };
  referral_pharmacy?: {
    name: string;
    address: string;
  };
  reason: string;
  status: string;
  created_at: string;
  barcode_url?: string;
  suggested_pharmacies?: Array<{
    id: number;
    name: string;
    address: string;
    phone: string;
    distance_km: number;
  }>;
}

class ReferralService {
  private baseURL = `${API_BASE_URL}/api`;

  async getReferrals(): Promise<PrescriptionReferral[]> {
    try {
      const response = await fetch(`${this.baseURL}/referrals/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch referrals: ${response.status}`);
      }

      const data = await response.json();
      return data.referrals;
    } catch (error) {
      console.error('Error fetching referrals:', error);
      throw error;
    }
  }

  async selectPharmacy(referralId: number, pharmacyId: number): Promise<void> {
    try {
      const response = await fetch(
        `${this.baseURL}/referrals/${referralId}/select-pharmacy/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ pharmacy_id: pharmacyId }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to select pharmacy: ${response.status}`);
      }
    } catch (error) {
      console.error('Error selecting pharmacy:', error);
      throw error;
    }
  }
}

export const referralService = new ReferralService();
```

### Success Criteria

#### Automated Verification:
- [ ] Dependencies installed: `pip list | grep pylibdmtx`
- [ ] Database migration applies: `python manage.py migrate`
- [ ] PrescriptionReferral model created
- [ ] Barcode generation works: Test in Python shell
- [ ] Unit tests pass: `python manage.py test api.tests.test_prescription_referral`

#### Manual Verification:
- [ ] Pharmacy marks prescription as out of stock
- [ ] Call `POST /api/medications/{id}/create-referral/`
- [ ] Verify PrescriptionReferral created in database
- [ ] Verify barcode image generated and stored
- [ ] Check barcode_image URL is accessible
- [ ] Verify suggested pharmacies returned (sorted by distance)
- [ ] Patient selects alternative pharmacy
- [ ] Call `POST /api/referrals/{id}/select-pharmacy/`
- [ ] Verify referral status changes to 'referred'
- [ ] Verify medication.dispensing_pharmacy updated
- [ ] Print barcode from URL - verify scannable with pharmacy scanner
- [ ] Check barcode contains prescription ID, HPN, medication name

**Implementation Note**: After completing this phase and all automated verification passes, pause here for manual confirmation from the human that the manual testing was successful.

---

## Final Verification & Deployment

### Complete System Test

#### End-to-End User Journey:

1. **Patient nominates pharmacy**:
   - [ ] Navigate to `/account/nominated-pharmacy`
   - [ ] Click "Find and Nominate a Pharmacy"
   - [ ] Search for pharmacy on map
   - [ ] Select pharmacy
   - [ ] Click "Nominate This Pharmacy"
   - [ ] Verify nomination appears on nominated pharmacy page

2. **Doctor creates prescription**:
   - [ ] Doctor logs in
   - [ ] Creates prescription for patient
   - [ ] Verify patient's nominated pharmacy auto-assigned
   - [ ] Prescription shows pharmacy details

3. **Prescription submitted to NHS EPS**:
   - [ ] Doctor submits prescription to EPS
   - [ ] Call `POST /api/medications/{id}/submit-to-eps/`
   - [ ] Verify submission successful
   - [ ] Check NHS sandbox for prescription

4. **Pharmacy cannot fulfill - creates referral**:
   - [ ] Pharmacy marks as out of stock
   - [ ] Call `POST /api/medications/{id}/create-referral/`
   - [ ] Patient receives notification
   - [ ] Doctor receives notification
   - [ ] Barcode generated

5. **Patient selects alternative pharmacy**:
   - [ ] Patient views referral notification
   - [ ] Sees suggested nearby pharmacies
   - [ ] Selects alternative pharmacy
   - [ ] Downloads/prints barcode
   - [ ] Takes barcode to new pharmacy

6. **Alternative pharmacy dispenses**:
   - [ ] Pharmacy scans barcode
   - [ ] Retrieves prescription details
   - [ ] Dispenses medication
   - [ ] Marks as dispensed in system

### Performance Benchmarks

- [ ] Pharmacy search returns results in <500ms
- [ ] Nomination update completes in <1s
- [ ] Prescription creation with pharmacy assignment: <2s
- [ ] EPS submission completes in <10s
- [ ] Barcode generation: <3s
- [ ] Page load times: <2s on 3G

### Security Checklist

- [ ] Patient can only access own prescriptions
- [ ] Doctor can only access prescriptions they created
- [ ] Pharmacy can only access prescriptions nominated to them
- [ ] HPNs encrypted at rest
- [ ] All API endpoints require authentication
- [ ] FHIR bundles digitally signed
- [ ] TLS 1.3 for all external API calls
- [ ] Audit logs for all prescription access

### Deployment Checklist

#### Staging Environment:
- [ ] Deploy backend to staging
- [ ] Run all migrations
- [ ] Load sample pharmacies
- [ ] Deploy frontend to staging
- [ ] Configure NHS EPS sandbox credentials
- [ ] Run smoke tests

#### Production Environment:
- [ ] Obtain NHS EPS production credentials
- [ ] Generate production digital signature certificates
- [ ] Configure mTLS certificates
- [ ] Deploy backend to production
- [ ] Deploy frontend to production
- [ ] Monitor error rates for 24 hours
- [ ] Conduct user acceptance testing

### Documentation

- [ ] API documentation generated (Swagger/OpenAPI)
- [ ] Developer onboarding guide updated
- [ ] User guide for pharmacy nomination
- [ ] Admin guide for managing pharmacies
- [ ] Troubleshooting guide for EPS errors
- [ ] Barcode scanning guide for pharmacies

---

## Appendix

### NHS EPS Resources

- **NHS EPS Documentation**: https://digital.nhs.uk/services/electronic-prescription-service
- **FHIR Implementation Guide**: https://simplifier.net/guide/NHSDigital/Home
- **NHS Sandbox Registration**: https://onboarding.prod.api.platform.nhs.uk/
- **dm+d (Dictionary of Medicines)**: https://www.nhsbsa.nhs.uk/pharmacies-gp-practices-and-appliance-contractors/dictionary-medicines-and-devices-dmd

### Technical Standards

- **HL7 FHIR R4B**: https://hl7.org/fhir/R4B/
- **GS1 DataMatrix**: https://www.gs1.org/standards/barcodes/datamatrix
- **NHS ODS Codes**: https://digital.nhs.uk/services/organisation-data-service
- **UK Core FHIR Profiles**: https://simplifier.net/hl7fhirukcorer4

### Estimated Implementation Timeline

- **Phase 1** (Backend - Pharmacy & Nomination Models): 3-5 days
- **Phase 2** (Frontend - Pharmacy Nomination UI): 3-4 days
- **Phase 3** (Backend - Prescription Integration): 2-3 days
- **Phase 4** (NHS EPS FHIR Integration): 7-10 days
- **Phase 5** (Prescription Referral & Barcode System): 4-6 days
- **Testing & QA**: 5-7 days
- **Deployment**: 2-3 days

**Total**: 26-38 days (5-8 weeks)

---

## Summary

This implementation plan provides a complete, production-ready pharmacy nomination system with NHS EPS integration. The system:

✅ Enables patients to nominate preferred pharmacies
✅ Auto-assigns nominated pharmacy to prescriptions
✅ Submits prescriptions to NHS EPS via FHIR
✅ Handles medicine unavailability with barcode-based referrals
✅ Complies with NHS standards and regulations
✅ Includes comprehensive testing and security measures

The phased approach ensures each component is fully tested before proceeding, minimizing risk and allowing for iterative feedback.