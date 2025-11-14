---
date: 2025-10-30T20:32:20+0000
researcher: Claude
git_commit: b601424d2b1ea6dcd679c9195b603ecefc718ba3
branch: main
repository: phbfrontend
topic: "AWS Services Integration Analysis for PHB Healthcare Platform"
tags: [research, aws, infrastructure, cloud-architecture, ec2, s3, dynamodb, cloudwatch, ebs, efs, ppo]
status: complete
last_updated: 2025-10-30
last_updated_by: Claude
---

# Research: AWS Services Integration Analysis for PHB Healthcare Platform

**Date**: 2025-10-30T20:32:20+0000
**Researcher**: Claude
**Git Commit**: b601424d2b1ea6dcd679c9195b603ecefc718ba3
**Branch**: main
**Repository**: phbfrontend

## Research Question

Based on AWS learning, where and how do these AWS services fit into the PHB (Public Health Bureau) Hospital System:
1. EC2: Uses, benefits, pros and cons
2. Amazon CloudWatch: Integration points and usage
3. Amazon DynamoDB: Use cases and timing
4. S3: Block, file, and object storage applications
5. Amazon EBS: Benefits and use cases
6. Amazon EFS: Benefits and use cases
7. S3 Buckets: Versioning, tagging, storage classes, encryption
8. PPO (Proximal Policy Optimization): Machine learning applications

## Summary

The PHB platform is currently a frontend-only React application deployed on Netlify with no AWS infrastructure. Based on comprehensive codebase analysis, here are concrete AWS integration recommendations tailored to the actual architecture and data patterns discovered.

**Current State:**
- **Frontend**: React 18 + TypeScript + Vite
- **Deployment**: Netlify (static hosting)
- **Backend**: Django (http://127.0.0.1:8000) + Node.js (http://localhost:5000)
- **Storage**: localStorage, sessionStorage (no cloud storage)
- **Monitoring**: Console logging only (889 occurrences across 95 files)
- **File Handling**: FormData uploads to backend, no S3 integration
- **Database**: Backend-managed (PostgreSQL/MySQL assumed)

---

## Detailed Findings

### 1. Amazon EC2 - Application Hosting

#### Current Backend Architecture
The codebase reveals two backend APIs:
- **Django Backend**: `API_BASE_URL = http://127.0.0.1:8000/` ([config.ts:6](src/utils/config.ts#L6))
- **Node.js Backend**: `API_URL = http://localhost:5000/api` ([config.ts:7](src/utils/config.ts#L7))

#### How EC2 Helps PHB Software

**Primary Use Case: Backend Hosting**
```
┌─────────────────────────────────────────────────┐
│ EC2 Instance 1 (Django Backend)                 │
│ - Medical records API                           │
│ - Prescription management                       │
│ - Appointment booking                           │
│ - Payment processing (Paystack)                 │
│ - OTP verification                              │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ EC2 Instance 2 (Node.js Backend)                │
│ - Authentication services                       │
│ - Women's health API                            │
│ - Pharmacy services                             │
│ - Clinical guidelines management                │
└─────────────────────────────────────────────────┘
```

#### Specific Scenarios for PHB

**Scenario 1: Medical Records Processing**
- **Location**: [medicalRecordsService.ts](src/features/health/medicalRecordsService.ts)
- **EC2 Usage**: Host Django backend with compute for:
  - OTP generation and verification (77 console.log statements indicate complex logic)
  - Medical record encryption/decryption
  - DICOM image processing (cornerstone-core library)
  - PDF generation for health records

**Scenario 2: Appointment & Payment Processing**
- **Location**: [appointmentService.ts](src/services/appointmentService.ts), [paymentService.ts](src/services/paymentService.ts)
- **EC2 Usage**: Handle Paystack payment webhooks, appointment scheduling algorithms
- **Current API Calls**: 21 console statements in payment service indicate heavy processing

**Scenario 3: Women's Health Data Processing**
- **Location**: [womensHealthApi.ts](src/services/womensHealthApi.ts)
- **EC2 Usage**: Process 20 different HTTP methods for cycle tracking, pregnancy monitoring
- **Data Stored Locally**: Currently in localStorage (cycles, pregnancyDueDate, kickSessions, contractions)

#### EC2 Instance Types Recommended

**For Django Backend (Medical Records Heavy):**
- **Development**: t3.medium (2 vCPU, 4 GB RAM) - $30.37/month
- **Production**: c6i.xlarge (4 vCPU, 8 GB RAM) - $127.75/month
  - Compute-optimized for DICOM processing
  - Enhanced networking for medical imaging

**For Node.js Backend (API Gateway):**
- **Development**: t3.small (2 vCPU, 2 GB RAM) - $15.18/month
- **Production**: t3.large (2 vCPU, 8 GB RAM) - $60.74/month

#### Pros & Cons for PHB

**PROS:**
1. **Full Control**: Install cornerstone-core, dicom-parser for medical imaging
2. **HIPAA Compliance**: Configure security groups for PHI data protection
3. **Custom Environment**: Python 3 + Django + PostgreSQL stack
4. **Scaling**: Auto-scale during peak appointment booking (9am-11am patterns)
5. **Integration**: Direct Paystack API integration without CORS issues

**CONS:**
1. **Server Management**: Requires DevOps for OS updates, security patches
2. **Single Point of Failure**: Need load balancing for high availability
3. **Cost**: $146-$188/month for dual backend setup vs. $0 on localhost
4. **Monitoring Complexity**: No current monitoring (889 console.logs need replacement)
5. **Database Management**: Must manage PostgreSQL on same or separate instance

#### Implementation Strategy for PHB

**Phase 1: Lift & Shift** (Weeks 1-2)
```bash
# EC2 Instance Setup
- Launch 2x t3.medium instances (Django + Node.js)
- Install dependencies from package.json
- Configure security groups (HTTP: 80, HTTPS: 443, SSH: 22)
- Update config.ts with new EC2 public IPs
```

**Phase 2: Configuration** (Weeks 3-4)
```typescript
// Update src/utils/config.ts
export const API_BASE_URL = 'https://django.phb-api.com/';
export const API_URL = 'https://nodejs.phb-api.com/api';
export const AUTH_API_URL = 'https://nodejs.phb-api.com/auth';
```

**Phase 3: Auto-Scaling** (Month 2)
- Create AMI from configured instances
- Set up Auto Scaling Group (min: 1, max: 4)
- Configure Elastic Load Balancer
- Health checks based on appointment availability

---

### 2. Amazon CloudWatch - Monitoring & Logging

#### Current Monitoring Gaps

**Console Logging Analysis:**
- **889 console statements** across 95 files
- **Top offenders**:
  - [medicalRecordsService.ts](src/features/health/medicalRecordsService.ts): 77 statements
  - [authContext.tsx](src/features/auth/authContext.tsx): 78 statements
  - [BookAppointment.tsx](src/features/health/BookAppointment.tsx): 66 statements
  - [paymentService.ts](src/services/paymentService.ts): 21 statements

**No External Monitoring Tools:**
- No Sentry, Bugsnag, DataDog, Rollbar detected
- Error boundary only in 2 pages: [ClinicalGuidelinesManagementPage.tsx](src/pages/organization/ClinicalGuidelinesManagementPage.tsx), [OrganizationDashboardPage.tsx](src/pages/organization/OrganizationDashboardPage.tsx)

#### How CloudWatch Helps PHB

**Use Case 1: Application Logs**
```javascript
// Replace console.log with CloudWatch Logs
// In medicalRecordsService.ts (77 current console statements)
import AWS from 'aws-sdk';
const cloudwatchlogs = new AWS.CloudWatchLogs();

async function verifyOTP(userId: string, otp: string) {
  // Before: console.log('Verifying OTP for user:', userId);
  await cloudwatchlogs.putLogEvents({
    logGroupName: '/phb/medical-records',
    logStreamName: 'otp-verification',
    logEvents: [{
      message: JSON.stringify({
        userId,
        action: 'OTP_VERIFICATION',
        timestamp: Date.now()
      }),
      timestamp: Date.now()
    }]
  }).promise();
}
```

**Use Case 2: API Performance Metrics**
```javascript
// Track API call duration in appointmentService.ts
const startTime = Date.now();
const response = await fetch(`${API_URL}/appointments`);
const duration = Date.now() - startTime;

// Send to CloudWatch Metrics
const cloudwatch = new AWS.CloudWatch();
await cloudwatch.putMetricData({
  Namespace: 'PHB/API',
  MetricData: [{
    MetricName: 'AppointmentAPILatency',
    Value: duration,
    Unit: 'Milliseconds',
    Timestamp: new Date()
  }]
}).promise();
```

**Use Case 3: Payment Processing Monitoring**
```javascript
// In paymentService.ts (21 console statements → CloudWatch)
async function verifyPayment(reference: string) {
  try {
    const response = await fetch(/* Paystack API */);

    // Log successful payment
    await logMetric('PaymentSuccess', 1);
  } catch (error) {
    // Log failed payment
    await logMetric('PaymentFailure', 1);
    // Create CloudWatch Alarm for payment failures
  }
}
```

#### CloudWatch Integration Points

**Frontend Error Tracking:**
- **ErrorBoundary.tsx** → CloudWatch Logs
- **All 95 files with console logs** → Structured logging

**Backend Monitoring:**
- Django API logs → `/aws/ec2/django-backend`
- Node.js API logs → `/aws/ec2/nodejs-backend`

**Custom Dashboards:**
1. **Medical Records Dashboard**
   - OTP verification success rate
   - Medical record access latency
   - Failed authentication attempts

2. **Appointment Dashboard**
   - Booking completion rate
   - Payment success/failure ratio
   - Peak appointment hours (for auto-scaling triggers)

3. **Women's Health Dashboard**
   - API call volume (20 HTTP methods)
   - Data sync failures (localStorage → backend)
   - Cycle tracking engagement metrics

#### CloudWatch Alarms for PHB

```json
{
  "AlarmName": "HighPaymentFailureRate",
  "MetricName": "PaymentFailure",
  "Threshold": 5,
  "ComparisonOperator": "GreaterThanThreshold",
  "EvaluationPeriods": 1,
  "Period": 300,
  "Statistic": "Sum",
  "ActionsEnabled": true,
  "AlarmActions": ["arn:aws:sns:us-east-1:123456789:phb-alerts"]
}
```

**Critical Alarms Needed:**
- Payment failure rate > 5%
- OTP verification failures > 10/minute
- Medical record access errors
- Appointment booking failures
- EC2 CPU > 80% (trigger auto-scaling)

#### Implementation Steps

**Phase 1: Replace Console Logging**
```bash
# Install AWS SDK
bun add aws-sdk

# Create CloudWatch log groups
aws logs create-log-group --log-group-name /phb/frontend
aws logs create-log-group --log-group-name /phb/medical-records
aws logs create-log-group --log-group-name /phb/payments
```

**Phase 2: Structured Logging**
```typescript
// Create logging utility
// src/utils/cloudwatchLogger.ts
export class CloudWatchLogger {
  async log(component: string, level: string, message: string, metadata?: any) {
    // Send to CloudWatch
  }
}

// Replace in medicalRecordsService.ts
// Before: console.log('Medical record fetched');
// After: logger.log('MedicalRecordsService', 'INFO', 'Record fetched', { userId });
```

---

### 3. Amazon DynamoDB - NoSQL Data Storage

#### Current Database Patterns

**LocalStorage Usage Analysis:**
- **45 files use localStorage** for data persistence
- **Key data stored locally**:
  - Authentication tokens (3 types)
  - Pregnancy tracking data (cycles, due dates, kick sessions, contractions)
  - Search history
  - User preferences
  - Birth plans, baby names, contraction timers

**Files with Heavy LocalStorage:**
- [CycleTrackerPage.tsx](src/pages/contraception/CycleTrackerPage.tsx): stores `cycles` data
- [PregnancyCalendar.tsx](src/features/pregnancy/PregnancyCalendar.tsx): stores `pregnancyDueDate`
- [KickCounter.tsx](src/features/pregnancy/KickCounter.tsx): stores `kickSessions`
- [ContractionTimer.tsx](src/features/pregnancy/ContractionTimer.tsx): stores `contractions`
- [BirthPlanCreator.tsx](src/features/pregnancy/BirthPlanCreator.tsx): stores `birthPlan`

#### How DynamoDB Helps PHB

**Use Case 1: Session Data (Hot Data)**
```javascript
// Current: localStorage for medical_record_token
// Problem: Lost on browser clear, not synced across devices

// DynamoDB Solution
Table: phb-user-sessions
Partition Key: userId
Sort Key: sessionId
TTL: 30 minutes (auto-delete expired sessions)

{
  "userId": "user123",
  "sessionId": "sess456",
  "medical_record_token": "token789",
  "token_expires_at": 1698765432,
  "ttl": 1698767232  // Auto-delete after 30 mins
}
```

**Use Case 2: Search History (High Read/Write)**
```javascript
// Current: searchHistoryService.ts uses localStorage
// Problem: Limited to 5-10MB, not queryable

// DynamoDB Solution
Table: phb-search-history
Partition Key: userId
Sort Key: timestamp
GSI: searchTerm (for analytics)

{
  "userId": "user123",
  "timestamp": 1698765432000,
  "searchTerm": "diabetes symptoms",
  "category": "health-conditions",
  "resultsClicked": ["condition123"]
}
```

**Use Case 3: Real-Time Health Tracking**
```javascript
// Current: Pregnancy data in localStorage
// Files: KickCounter.tsx, ContractionTimer.tsx, CycleTrackerPage.tsx

// DynamoDB Solution
Table: phb-pregnancy-tracking
Partition Key: userId
Sort Key: timestamp

// Kick Counter
{
  "userId": "user123",
  "timestamp": 1698765432000,
  "dataType": "KICK_SESSION",
  "kicks": 10,
  "duration": 120,  // seconds
  "notes": "Active after lunch"
}

// Contraction Timer
{
  "userId": "user123",
  "timestamp": 1698765532000,
  "dataType": "CONTRACTION",
  "duration": 45,  // seconds
  "intensity": "moderate",
  "timeSinceLastContraction": 420  // 7 minutes
}
```

**Use Case 4: Appointment Metadata (Flexible Schema)**
```javascript
// Current: appointmentService.ts rigid JSON responses
// DynamoDB allows flexible attributes

Table: phb-appointments
Partition Key: appointmentId
Sort Key: userId

{
  "appointmentId": "appt123",
  "userId": "user456",
  "doctorId": "doc789",
  "datetime": "2025-11-01T10:00:00Z",
  "status": "CONFIRMED",
  "paymentReference": "pay123",
  "paymentStatus": "COMPLETED",
  "notes": "Follow-up for diabetes",
  // Flexible additional fields
  "labResults": ["result1", "result2"],
  "prescriptions": ["presc1"]
}
```

#### When to Use DynamoDB vs. PostgreSQL

**Use DynamoDB When:**
1. **High Write Throughput**: Pregnancy tracking (kick counter real-time updates)
2. **Key-Value Lookups**: Session tokens, search history
3. **Time-Series Data**: Contraction timers, cycle tracking
4. **Flexible Schema**: User preferences, feature flags
5. **Auto-Scaling Needed**: Unpredictable traffic spikes

**Use PostgreSQL When:**
1. **Complex Joins**: Medical records + prescriptions + appointments
2. **ACID Transactions**: Payment processing (already using Paystack)
3. **Relational Data**: Patient → Doctor → Hospital relationships
4. **Reporting**: Analytics dashboards (3 dashboard components found)

#### DynamoDB Table Design for PHB

**Table 1: phb-user-sessions**
```
Partition Key: userId (String)
Sort Key: sessionId (String)
TTL: expiresAt (Number)
Size: ~1KB per item
RCU/WCU: 5/5 (on-demand pricing recommended)
```

**Table 2: phb-pregnancy-tracking**
```
Partition Key: userId (String)
Sort Key: timestamp (Number)
GSI: dataType-timestamp (for querying by type)
Size: ~500 bytes per item
Expected items: 100-1000 per user
RCU/WCU: 10/10 (on-demand)
```

**Table 3: phb-search-history**
```
Partition Key: userId (String)
Sort Key: timestamp (Number)
GSI: searchTerm (for trending searches)
Size: ~200 bytes per item
RCU/WCU: 5/5
```

#### Implementation Example

**Before (localStorage):**
```typescript
// In KickCounter.tsx
const saveKickSession = (kicks: number) => {
  const sessions = JSON.parse(localStorage.getItem('kickSessions') || '[]');
  sessions.push({ kicks, timestamp: Date.now() });
  localStorage.setItem('kickSessions', JSON.stringify(sessions));
};
```

**After (DynamoDB):**
```typescript
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const saveKickSession = async (userId: string, kicks: number) => {
  const client = new DynamoDBClient({ region: "us-east-1" });

  await client.send(new PutItemCommand({
    TableName: 'phb-pregnancy-tracking',
    Item: {
      userId: { S: userId },
      timestamp: { N: Date.now().toString() },
      dataType: { S: 'KICK_SESSION' },
      kicks: { N: kicks.toString() },
      syncedFromDevice: { S: navigator.userAgent }
    }
  }));

  // Fallback to localStorage if offline
  localStorage.setItem('kickSessions_pending', JSON.stringify({ kicks }));
};
```

#### Cost Estimation

**Scenario: 10,000 active users**
- Search history: 50 queries/user/month = 500K writes
- Pregnancy tracking: 20 users × 100 updates/month = 2K writes
- Session data: 10K users × 10 sessions/month = 100K writes

**DynamoDB On-Demand Pricing:**
- Write requests: 602K × $1.25/million = $0.75/month
- Read requests: Estimated 1M × $0.25/million = $0.25/month
- Storage: 1GB × $0.25/GB = $0.25/month
- **Total: ~$1.25/month** (significantly cheaper than provisioned capacity)

---

### 4. Amazon S3 - Object Storage

#### Current File Handling

**File Upload Analysis:**
- **Security layer**: [SecureFileUpload.tsx](src/components/security/SecureFileUpload.tsx)
- **Validation**: [FileValidator.tsx](src/components/security/FileValidator.tsx)
- **Virus scanning**: [VirusScanner.tsx](src/components/security/VirusScanner.tsx)
- **Upload tracking**: [UploadProgress.tsx](src/components/security/UploadProgress.tsx)

**Current Upload Flow:**
```
User → SecureFileUpload → FileValidator → VirusScanner →
FormData → Backend API → ??? (no cloud storage configured)
```

**Files with Upload Functionality:**
- [guidelinesService.ts](src/services/guidelinesService.ts): Clinical guidelines (PDF/DOCX)
- [pharmacyService.ts](src/services/pharmacyService.ts): Prescription documents
- [womensHealthApi.ts](src/services/womensHealthApi.ts): Health images/documents

#### S3 Storage Types Explained

**Object Storage (Primary Use for PHB):**
- Files stored as objects with metadata
- Each object has unique key (file path)
- Accessed via HTTP/HTTPS URLs
- **Use for**: PDFs, images, medical documents

**Block Storage (EBS - covered in section 5):**
- Low-level storage attached to EC2
- File system required (ext4, NTFS)
- **Use for**: EC2 instance storage, databases

**File Storage (EFS - covered in section 6):**
- Network file system (NFS)
- Multiple EC2 instances access simultaneously
- **Use for**: Shared application data

#### S3 Integration for PHB

**Use Case 1: Clinical Guidelines Storage**
```typescript
// Current: guidelinesService.ts uploads via FormData
// Problem: Backend stores files locally (single point of failure)

// S3 Solution
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

async function uploadGuideline(file: File, metadata: any) {
  const s3 = new S3Client({ region: "us-east-1" });

  const key = `guidelines/${metadata.category}/${Date.now()}-${file.name}`;

  await s3.send(new PutObjectCommand({
    Bucket: 'phb-clinical-guidelines',
    Key: key,
    Body: file,
    ContentType: file.type,
    Metadata: {
      uploadedBy: metadata.userId,
      category: metadata.category,
      version: metadata.version
    },
    ServerSideEncryption: 'AES256',  // Encryption at rest
    StorageClass: 'STANDARD_IA'  // Infrequent access
  }));

  return `https://phb-clinical-guidelines.s3.amazonaws.com/${key}`;
}
```

**Use Case 2: Medical Imaging (DICOM Files)**
```typescript
// Current: cornerstone-core processes DICOM in browser
// Problem: Large files (10-100MB) slow page load

// S3 Solution with CloudFront
Bucket: phb-medical-imaging
CloudFront: d123abc.cloudfront.net
Structure:
  /patient-{id}/
    /xray-{date}.dcm
    /ct-scan-{date}.dcm
    /mri-{date}.dcm

// In MedicalAIDemoPage.tsx (39 console statements)
const dicomUrl = `https://d123abc.cloudfront.net/patient-${userId}/xray-${date}.dcm`;
cornerstone.loadImage(dicomUrl);
```

**Use Case 3: Prescription Documents**
```typescript
// Current: PrintablePrescription.tsx generates PDFs
// Store in S3 with expiring URLs

const prescriptionKey = `prescriptions/${userId}/${prescriptionId}.pdf`;
await s3.putObject({
  Bucket: 'phb-prescriptions',
  Key: prescriptionKey,
  Body: pdfBuffer,
  ServerSideEncryption: 'aws:kms',  // KMS encryption for PHI
  Metadata: {
    patientId: userId,
    doctorId: doctorId,
    pharmacyId: pharmacyId
  }
});

// Generate signed URL (expires in 1 hour)
const signedUrl = await getSignedUrl(s3, new GetObjectCommand({
  Bucket: 'phb-prescriptions',
  Key: prescriptionKey
}), { expiresIn: 3600 });
```

#### S3 Bucket Configuration for PHB

**Bucket 1: phb-clinical-guidelines**
```json
{
  "bucketName": "phb-clinical-guidelines",
  "region": "us-east-1",
  "versioning": "Enabled",
  "encryption": "AES256",
  "storageClass": "STANDARD_IA",
  "lifecycleRules": [
    {
      "id": "ArchiveOldGuidelines",
      "status": "Enabled",
      "transitions": [
        {
          "days": 90,
          "storageClass": "GLACIER"
        }
      ]
    }
  ],
  "tags": {
    "Environment": "Production",
    "DataType": "ClinicalGuidelines",
    "Compliance": "HIPAA"
  }
}
```

**Bucket 2: phb-medical-imaging**
```json
{
  "bucketName": "phb-medical-imaging",
  "region": "us-east-1",
  "versioning": "Disabled",  // Large files
  "encryption": "aws:kms",  // KMS for PHI
  "storageClass": "STANDARD",
  "objectLock": "Enabled",  // WORM compliance
  "lifecycleRules": [
    {
      "id": "DeleteOldScans",
      "status": "Enabled",
      "expiration": {
        "days": 2555  // 7 years retention
      }
    }
  ],
  "intelligentTiering": true,  // Auto-optimize costs
  "tags": {
    "Environment": "Production",
    "DataType": "MedicalImaging",
    "Compliance": "HIPAA",
    "Retention": "7years"
  }
}
```

**Bucket 3: phb-prescriptions**
```json
{
  "bucketName": "phb-prescriptions",
  "region": "us-east-1",
  "versioning": "Enabled",
  "encryption": "aws:kms",
  "kmsKeyId": "arn:aws:kms:us-east-1:123456789:key/phb-prescriptions",
  "storageClass": "STANDARD",
  "publicAccess": "BlockAll",
  "accessControl": "Private",
  "corsRules": [
    {
      "allowedOrigins": ["https://phb.netlify.app"],
      "allowedMethods": ["GET", "PUT"],
      "allowedHeaders": ["*"],
      "maxAgeSeconds": 3000
    }
  ],
  "tags": {
    "Environment": "Production",
    "DataType": "Prescriptions",
    "Compliance": "HIPAA"
  }
}
```

**Bucket 4: phb-static-assets**
```json
{
  "bucketName": "phb-static-assets",
  "region": "us-east-1",
  "versioning": "Enabled",
  "encryption": "AES256",
  "storageClass": "STANDARD",
  "publicAccess": "PublicRead",
  "websiteHosting": {
    "indexDocument": "index.html",
    "errorDocument": "error.html"
  },
  "cloudFront": "Enabled",
  "tags": {
    "Environment": "Production",
    "DataType": "PublicAssets"
  }
}
```

#### S3 Storage Classes for PHB

**STANDARD (Default):**
- **Use for**: Active prescriptions, recent medical imaging
- **Cost**: $0.023/GB/month
- **Access**: Millisecond latency

**STANDARD_IA (Infrequent Access):**
- **Use for**: Clinical guidelines (accessed weekly)
- **Cost**: $0.0125/GB/month + $0.01/GB retrieval
- **Benefit**: 46% cheaper than STANDARD

**GLACIER:**
- **Use for**: Archived guidelines, old medical records
- **Cost**: $0.004/GB/month
- **Retrieval**: 3-5 hours (Bulk)
- **Benefit**: 83% cheaper than STANDARD

**INTELLIGENT_TIERING:**
- **Use for**: Medical imaging (uncertain access patterns)
- **Cost**: $0.0025/1000 objects monitoring fee
- **Benefit**: Auto-moves between tiers

#### Bucket Versioning Strategy

**Enabled for:**
- `phb-prescriptions` (legal compliance, 7-year retention)
- `phb-clinical-guidelines` (track guideline updates)
- `phb-static-assets` (rollback deployments)

**Disabled for:**
- `phb-medical-imaging` (large files, space constraints)

**Lifecycle Policy Example:**
```json
{
  "Rules": [
    {
      "Id": "RetainPrescriptionVersions",
      "Status": "Enabled",
      "NoncurrentVersionExpiration": {
        "NoncurrentDays": 2555  // 7 years
      }
    }
  ]
}
```

#### Bucket Tagging for Cost Allocation

```json
{
  "TagSet": [
    {
      "Key": "Environment",
      "Value": "Production"
    },
    {
      "Key": "CostCenter",
      "Value": "HealthRecords"
    },
    {
      "Key": "Compliance",
      "Value": "HIPAA"
    },
    {
      "Key": "DataClassification",
      "Value": "PHI"
    },
    {
      "Key": "BackupRequired",
      "Value": "Yes"
    }
  ]
}
```

**Cost Allocation Reports:**
- Track costs by environment (Dev, Staging, Prod)
- Separate costs by data type (imaging vs. prescriptions)
- Compliance reporting for HIPAA audits

#### Bucket Encryption

**AES256 (S3-Managed Keys):**
- **Use for**: Static assets, clinical guidelines
- **Cost**: Free
- **Key Rotation**: Automatic

**aws:kms (Customer Master Keys):**
- **Use for**: Prescriptions, medical imaging (PHI data)
- **Cost**: $1/key/month + $0.03/10,000 requests
- **Benefits**: Audit trail, fine-grained access control

**Encryption Policy Example:**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DenyUnencryptedObjectUploads",
      "Effect": "Deny",
      "Principal": "*",
      "Action": "s3:PutObject",
      "Resource": "arn:aws:s3:::phb-prescriptions/*",
      "Condition": {
        "StringNotEquals": {
          "s3:x-amz-server-side-encryption": "aws:kms"
        }
      }
    }
  ]
}
```

#### Implementation Roadmap

**Phase 1: Static Assets (Week 1)**
- Migrate [public/images/](public/images/) to S3
- Enable CloudFront CDN
- Update [index.html](index.html) image references

**Phase 2: Clinical Guidelines (Week 2)**
- Update [guidelinesService.ts](src/services/guidelinesService.ts)
- Implement S3 upload in [GuidelineUploadModal.tsx](src/components/guidelines/GuidelineUploadModal.tsx)
- Configure versioning and lifecycle policies

**Phase 3: Medical Imaging (Week 3-4)**
- Create S3 bucket for DICOM files
- Update [MedicalAIDemoPage.tsx](src/pages/MedicalAIDemoPage.tsx) to load from S3
- Implement CloudFront caching

**Phase 4: Prescriptions (Week 5)**
- Update [PrintablePrescription.tsx](src/features/health/PrintablePrescription.tsx)
- Generate signed URLs for secure access
- Implement KMS encryption

---

### 5. Amazon EBS - Elastic Block Store

#### How EBS Helps PHB

**Primary Use: EC2 Instance Storage**

EBS provides block-level storage volumes attached to EC2 instances. Think of it as a virtual hard drive for your servers.

#### Use Cases for PHB

**Use Case 1: Database Storage (PostgreSQL)**
```
┌─────────────────────────────────┐
│ EC2 Instance (Django Backend)   │
│  - Application code             │
│  - Python runtime               │
│  - Django framework             │
└──────────────┬──────────────────┘
               │
               │ Attached via /dev/sdf
               ▼
┌─────────────────────────────────┐
│ EBS Volume (500 GB gp3)         │
│  - PostgreSQL data directory    │
│  - Medical records database     │
│  - Appointment data             │
│  - User accounts                │
└─────────────────────────────────┘
```

**Current Database Needs:**
Based on codebase analysis, the backend likely stores:
- Medical records (accessed via [medicalRecordsService.ts](src/features/health/medicalRecordsService.ts))
- Prescriptions (managed by [prescriptionsService.ts](src/features/health/prescriptionsService.ts))
- Appointments (via [appointmentService.ts](src/services/appointmentService.ts))
- User data (3 auth contexts: users, professionals, organizations)

**Use Case 2: Application Logs Storage**
```
EBS Volume 2 (100 GB gp3)
  /var/log/django/
    - application.log
    - medical_records_access.log (77 log points)
    - payment_processing.log (21 log points)
    - api_requests.log
```

**Use Case 3: Uploaded File Cache**
```
EBS Volume 3 (200 GB sc1 - Cold HDD)
  /opt/phb/uploads/
    - guidelines/ (from GuidelineUploadModal.tsx)
    - prescriptions/ (from PrintablePrescription.tsx)
    - temporary_files/
```

#### EBS Volume Types Recommended

**gp3 (General Purpose SSD) - Primary Choice**
- **Use for**: Database, application logs
- **Size**: 500 GB
- **IOPS**: 3,000 baseline (free), up to 16,000
- **Throughput**: 125 MB/s baseline, up to 1,000 MB/s
- **Cost**: $40/month (500GB × $0.08/GB)
- **Benefit**: 20% cheaper than gp2, better performance

**io2 Block Express (High Performance)**
- **Use for**: High-traffic production database
- **Size**: 500 GB
- **IOPS**: 64,000 (for medical records high read/write)
- **Cost**: $57.50/month + $3,200/month (IOPS)
- **Benefit**: 99.999% durability, sub-millisecond latency
- **Recommendation**: Only if >10,000 concurrent users

**st1 (Throughput Optimized HDD)**
- **Use for**: Log archives, file upload staging
- **Size**: 500 GB
- **Cost**: $22.50/month (500GB × $0.045/GB)
- **Benefit**: 44% cheaper than gp3
- **Limitation**: Cannot be boot volume

**sc1 (Cold HDD)**
- **Use for**: Archived guidelines, old medical images
- **Size**: 500 GB
- **Cost**: $10/month (500GB × $0.02/GB)
- **Benefit**: 75% cheaper than gp3
- **Limitation**: Lowest cost, infrequent access

#### EBS Benefits for PHB

**1. Snapshots for Backup**
```bash
# Automated daily snapshots
aws ec2 create-snapshot \
  --volume-id vol-12345678 \
  --description "PHB PostgreSQL Daily Backup $(date +%Y-%m-%d)"

# Retention: 7 daily, 4 weekly, 12 monthly
# Cost: $0.05/GB/month (incremental only)
```

**2. Encryption at Rest**
```bash
# Encrypted EBS volume for PHI data
aws ec2 create-volume \
  --size 500 \
  --volume-type gp3 \
  --encrypted \
  --kms-key-id arn:aws:kms:us-east-1:123456789:key/phb-database \
  --availability-zone us-east-1a
```

**3. Volume Resizing (No Downtime)**
```bash
# Start with 500 GB, grow to 1 TB as data increases
aws ec2 modify-volume \
  --volume-id vol-12345678 \
  --size 1000

# No application downtime required
```

**4. IOPS Scaling for Peak Traffic**
```bash
# Scale IOPS during peak appointment booking hours (9am-11am)
aws ec2 modify-volume \
  --volume-id vol-12345678 \
  --iops 10000  # Up from 3,000 baseline
```

#### Recommended EBS Configuration

**Production Setup:**
```
EC2 Instance: c6i.xlarge (Django Backend)
├─ EBS Volume 1 (Root): 50 GB gp3
│  - OS, application code
│  - Cost: $4/month
│
├─ EBS Volume 2 (Database): 500 GB gp3
│  - PostgreSQL data
│  - IOPS: 5,000 provisioned
│  - Cost: $40 + $200 (IOPS) = $240/month
│
└─ EBS Volume 3 (Logs): 100 GB st1
   - Application logs
   - Cost: $4.50/month

Total EBS Cost: $248.50/month
```

**Development Setup:**
```
EC2 Instance: t3.medium (Dev/Test)
└─ EBS Volume 1 (All-in-one): 100 GB gp3
   - OS + database + logs
   - Cost: $8/month
```

#### EBS vs. EFS vs. S3 Comparison

| Feature | EBS | EFS | S3 |
|---------|-----|-----|-----|
| **Use in PHB** | Database storage | Shared uploads | Medical images |
| **Attachment** | Single EC2 | Multiple EC2 | HTTP access |
| **Performance** | 16,000 IOPS | Scales automatically | 5,500 GET/s |
| **Cost (500GB)** | $40/month | $150/month | $11.50/month |
| **Durability** | 99.8-99.9% | 99.999999999% | 99.999999999% |
| **Best for** | Databases | Shared files | Objects/media |

**Recommendation for PHB:**
- **Use EBS for**: PostgreSQL database, local caches
- **Use EFS for**: Shared uploaded files (if multiple EC2 instances)
- **Use S3 for**: Medical images, clinical guidelines, prescriptions

---

### 6. Amazon EFS - Elastic File System

#### How EFS Helps PHB

EFS provides a scalable, shared file system that multiple EC2 instances can access simultaneously. Unlike EBS (attached to one EC2), EFS is a network file system.

#### Current Architecture Gap

**Problem Identified:**
- [guidelinesService.ts](src/services/guidelinesService.ts): Uploads files to backend
- If backend is load-balanced across multiple EC2 instances, files uploaded to Instance A won't be visible on Instance B
- No shared storage layer detected in current architecture

#### Use Cases for PHB

**Use Case 1: Clinical Guidelines Shared Storage**
```
┌──────────────────┐     ┌──────────────────┐
│ EC2 Instance 1   │     │ EC2 Instance 2   │
│ (Django Backend) │     │ (Django Backend) │
└────────┬─────────┘     └────────┬─────────┘
         │                        │
         └────────────┬───────────┘
                      │
                      │ NFS Mount
                      ▼
         ┌────────────────────────┐
         │ EFS: phb-guidelines    │
         │  /guidelines/          │
         │    cardiology/         │
         │    pediatrics/         │
         │    oncology/           │
         └────────────────────────┘
```

**Implementation:**
```typescript
// In guidelinesService.ts
// Instead of uploading to EC2 local storage
// Upload directly to EFS-mounted directory

const EFS_MOUNT_PATH = '/mnt/efs/guidelines';

async function uploadGuideline(file: File, category: string) {
  const targetPath = `${EFS_MOUNT_PATH}/${category}/${file.name}`;

  // File available to all EC2 instances immediately
  await fs.promises.writeFile(targetPath, file.buffer);

  // All backend instances can now serve this file
  return `/api/guidelines/${category}/${file.name}`;
}
```

**Use Case 2: Multi-Instance User Uploads**
```
Scenario: User uploads prescription image
- Request hits Load Balancer
- Routed to EC2 Instance 2
- File saved to EFS: /mnt/efs/prescriptions/user123/
- User refreshes page, hits EC2 Instance 1
- Instance 1 reads from same EFS path
- File visible across all instances
```

**Use Case 3: Shared Application Logs**
```
EFS: /mnt/efs/logs/
  /django-instance-1/
    application.log
    medical_records.log
  /django-instance-2/
    application.log
    medical_records.log

CloudWatch Agent on separate EC2:
- Reads all logs from EFS
- Aggregates and sends to CloudWatch
- Centralized log analysis
```

#### EFS Performance Modes

**General Purpose (Default)**
- **Use for**: Clinical guidelines, user uploads
- **Latency**: Low (single-digit milliseconds)
- **Throughput**: 7,000 file operations/second
- **Cost**: $0.30/GB/month
- **Recommendation**: Best for PHB's current needs

**Max I/O**
- **Use for**: High-volume medical imaging (thousands of DICOM files)
- **Latency**: Higher
- **Throughput**: >500,000 operations/second
- **Cost**: $0.30/GB/month
- **Recommendation**: Only if processing >10,000 images/day

#### EFS Throughput Modes

**Bursting (Default)**
- **Baseline**: 50 MB/s per TB stored
- **Burst**: Up to 100 MB/s
- **Cost**: Included in storage cost
- **Use for**: Small deployments (<1 TB data)

**Provisioned**
- **Throughput**: 1-1,024 MB/s (independent of storage)
- **Cost**: $6/MB/s/month
- **Use for**: High-traffic scenarios
- **Example**: 100 MB/s = $600/month

**Elastic (Recommended for PHB)**
- **Throughput**: Automatically scales
- **Cost**: $0.03/GB read, $0.06/GB write
- **Benefit**: Pay only for actual throughput used
- **Use for**: Unpredictable traffic patterns

#### EFS Storage Classes

**Standard**
- **Cost**: $0.30/GB/month
- **Use for**: Active clinical guidelines, recent prescriptions
- **Access**: Millisecond latency

**Infrequent Access (IA)**
- **Cost**: $0.025/GB/month (92% cheaper!)
- **Retrieval**: $0.01/GB
- **Use for**: Archived guidelines, old uploads
- **Lifecycle**: Auto-move files not accessed in 30 days

#### EFS Lifecycle Management Example

```json
{
  "LifecyclePolicies": [
    {
      "TransitionToIA": "AFTER_30_DAYS"
    },
    {
      "TransitionToPrimaryStorageClass": "AFTER_1_ACCESS"
    }
  ]
}
```

**Cost Savings Example:**
- 500 GB clinical guidelines
- 400 GB not accessed in 30+ days
- **Without IA**: 500 GB × $0.30 = $150/month
- **With IA**: (100 GB × $0.30) + (400 GB × $0.025) = $40/month
- **Savings**: 73% reduction

#### EFS vs. EBS Comparison for PHB

| Feature | EBS | EFS |
|---------|-----|-----|
| **Attachment** | 1 EC2 instance | Multiple EC2 instances |
| **Use Case** | PostgreSQL database | Shared file uploads |
| **Performance** | 16,000 IOPS (gp3) | 7,000 ops/sec (GP mode) |
| **Scaling** | Manual resize | Auto-scales |
| **Cost (500GB)** | $40/month (gp3) | $150/month (Standard) |
| **Durability** | 99.9% | 99.999999999% |
| **Backup** | EBS snapshots | AWS Backup |
| **Encryption** | Yes (KMS) | Yes (KMS) |

**Recommendation:**
- **Use EBS** if running single EC2 instance (current likely setup)
- **Use EFS** when scaling to multiple EC2 instances (future)

#### When PHB Should Use EFS

**Scenario 1: Load Balanced Backend**
```
Current: Single EC2 instance → Use EBS
Future: 3+ EC2 instances → Use EFS for shared uploads

Cost Comparison:
- EBS (per instance): 3 × $40 = $120/month (data duplicated)
- EFS (shared): $150/month (single source of truth)
```

**Scenario 2: High Availability**
```
Problem: Single EC2 fails → Uploaded files lost
Solution: EFS in Multi-AZ
- Auto-replicates across 3 Availability Zones
- EC2 fails → New EC2 mounts same EFS
- Zero data loss
```

**Scenario 3: ML Model Training (PPO - see section 8)**
```
Training data stored in EFS:
/mnt/efs/ml-training/
  /medical-images/
  /patient-data/
  /model-checkpoints/

Multiple training instances (p3.2xlarge) access same data
```

#### Implementation Steps

**Phase 1: Create EFS File System**
```bash
aws efs create-file-system \
  --performance-mode generalPurpose \
  --throughput-mode elastic \
  --encrypted \
  --kms-key-id arn:aws:kms:us-east-1:123456789:key/phb-efs \
  --tags Key=Name,Value=phb-shared-storage
```

**Phase 2: Mount on EC2**
```bash
# On each EC2 instance
sudo mount -t nfs4 \
  fs-12345678.efs.us-east-1.amazonaws.com:/ \
  /mnt/efs

# Add to /etc/fstab for auto-mount
fs-12345678.efs.us-east-1.amazonaws.com:/ /mnt/efs nfs4 defaults 0 0
```

**Phase 3: Update Application**
```typescript
// Update guidelinesService.ts
const UPLOAD_PATH = process.env.NODE_ENV === 'production'
  ? '/mnt/efs/guidelines'  // EFS in production
  : './uploads';  // Local in development
```

#### Cost Optimization Strategy

**Current Likely Cost (No EFS):**
- Single EC2 + EBS: $40/month

**Future Cost with EFS (3 EC2 instances):**
- Option A: 3 × EBS (40 GB each) = $120/month
- Option B: 1 × EFS (100 GB) = $30/month (Standard)
- **Savings with EFS**: $90/month (75% reduction)

**With Lifecycle IA:**
- 100 GB total, 70 GB inactive
- Cost: (30 GB × $0.30) + (70 GB × $0.025) = $10.75/month
- **Total Savings**: 91% vs. EBS

---

### 7. S3 Bucket Features Deep Dive

Covered comprehensively in Section 4, including:
- ✅ Bucket Versioning (prescriptions, guidelines)
- ✅ Bucket Tagging (cost allocation, compliance)
- ✅ Storage Classes (STANDARD, IA, GLACIER, INTELLIGENT_TIERING)
- ✅ Bucket Encryption (AES256, KMS)

**Additional Implementation Details:**

#### Bucket Replication (Disaster Recovery)

```json
{
  "Rules": [
    {
      "Id": "ReplicateMedicalImaging",
      "Status": "Enabled",
      "Priority": 1,
      "Filter": {
        "Prefix": "medical-imaging/"
      },
      "Destination": {
        "Bucket": "arn:aws:s3:::phb-medical-imaging-backup-us-west-2",
        "ReplicationTime": {
          "Status": "Enabled",
          "Time": {
            "Minutes": 15
          }
        }
      }
    }
  ]
}
```

**Use Case:**
- Primary: `phb-medical-imaging` (us-east-1)
- Replica: `phb-medical-imaging-backup` (us-west-2)
- Benefit: Disaster recovery, 99.99% SLA

#### S3 Object Lock (Compliance)

```bash
# Enable WORM (Write Once Read Many) for prescriptions
aws s3api put-object-lock-configuration \
  --bucket phb-prescriptions \
  --object-lock-configuration '{
    "ObjectLockEnabled": "Enabled",
    "Rule": {
      "DefaultRetention": {
        "Mode": "GOVERNANCE",
        "Days": 2555
      }
    }
  }'
```

**Benefit**: Legal compliance, 7-year retention immutable

---

### 8. PPO (Proximal Policy Optimization) - Machine Learning

#### Understanding PPO for Healthcare

PPO is a reinforcement learning algorithm used to train AI models to make sequential decisions. In healthcare, it can optimize treatment plans, resource allocation, and patient care pathways.

#### Current ML-Related Code

**Medical AI Demo:**
- [MedicalAIDemoPage.tsx](src/pages/MedicalAIDemoPage.tsx): 39 console.log statements
- Uses Chart.js for visualizations
- DICOM parsing with cornerstone-core

**Current Limitations:**
- No ML models detected in codebase
- No TensorFlow.js, PyTorch, or ONNX.js
- All "AI" is visualization, not actual ML

#### How PPO Can Help PHB

**Use Case 1: Appointment Scheduling Optimization**

**Problem:**
- [BookAppointment.tsx](src/features/health/BookAppointment.tsx) has 66 console statements
- Current logic likely rule-based (first-available slot)
- No optimization for:
  - Doctor workload balancing
  - Patient wait time minimization
  - Emergency slot reservation

**PPO Solution:**
```python
# Training Environment
State: {
  'current_appointments': [...],
  'doctor_availability': [...],
  'patient_urgency': [1-10],
  'time_of_day': '09:00'
}

Action: {
  'assign_to_doctor': doctor_id,
  'timeslot': '2025-11-01T10:00'
}

Reward: {
  'patient_wait_time': -10 points per hour,
  'doctor_utilization': +5 points per booking,
  'urgency_match': +20 points if urgent patient gets quick slot,
  'no_show_penalty': -50 points
}
```

**Implementation:**
```python
# Backend ML Service (Python)
import torch
from stable_baselines3 import PPO

# Load pre-trained model
model = PPO.load("models/appointment_scheduler_v1.pth")

@app.post("/api/ml/optimize-appointment")
def optimize_appointment(patient_data, doctor_availability):
    state = prepare_state(patient_data, doctor_availability)
    action, _states = model.predict(state)

    return {
        "recommended_doctor": doctors[action[0]],
        "recommended_time": timeslots[action[1]],
        "confidence": action[2]
    }
```

**Frontend Integration:**
```typescript
// In BookAppointment.tsx
const getOptimizedSlot = async (patientData: any) => {
  const response = await fetch(`${API_URL}/ml/optimize-appointment`, {
    method: 'POST',
    body: JSON.stringify({
      patientData,
      urgency: appointmentUrgency,
      preferredTime: preferredTime
    })
  });

  const { recommended_doctor, recommended_time, confidence } = await response.json();

  if (confidence > 0.8) {
    setRecommendedSlot({ doctor: recommended_doctor, time: recommended_time });
  }
};
```

**Use Case 2: Prescription Adherence Prediction**

**Problem:**
- [Prescriptions.tsx](src/features/health/Prescriptions.tsx) shows prescriptions
- No tracking of whether patients actually take medications
- No intervention for non-adherence

**PPO Solution:**
```python
# Predict which patients are at risk of non-adherence
State: {
  'prescription_complexity': 3,  # 3 different medications
  'patient_age': 65,
  'previous_adherence': 0.6,
  'refill_frequency': 'monthly',
  'side_effects_reported': True
}

Action: {
  'send_reminder': True,
  'reminder_frequency': 'daily',
  'simplify_regimen': True,
  'schedule_followup': 7 days
}

Reward: {
  'adherence_improved': +100 points,
  'hospitalization_avoided': +500 points,
  'patient_satisfaction': +50 points
}
```

**Use Case 3: Resource Allocation (Ward Management)**

**Current System:**
- [WardManagementPage.tsx](src/pages/organization/WardManagementPage.tsx)
- Likely manual ward assignment

**PPO Solution:**
```python
# Optimize bed allocation in real-time
State: {
  'available_beds': {'ICU': 2, 'General': 10, 'Maternity': 5},
  'incoming_patients': [
    {'condition': 'critical', 'expected_los': 3},
    {'condition': 'moderate', 'expected_los': 5}
  ],
  'current_occupancy': 0.75,
  'discharge_forecast': [2, 1, 0]  # Next 3 days
}

Action: {
  'assign_bed': 'ICU-101',
  'defer_admission': False,
  'transfer_patient': None
}

Reward: {
  'critical_patient_admitted': +200,
  'bed_utilization': +10,
  'average_wait_time': -5 per hour
}
```

#### PPO Training Infrastructure on AWS

**Architecture:**
```
┌──────────────────────────────────────────────┐
│ S3: phb-ml-training-data                     │
│  /patient-data/ (anonymized)                 │
│  /appointment-logs/                          │
│  /prescription-refills/                      │
└──────────────┬───────────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────────┐
│ EC2: p3.2xlarge (GPU Instance)               │
│  - PyTorch 2.0                               │
│  - Stable-Baselines3                         │
│  - 8 vCPUs, 61 GB RAM, V100 GPU              │
│  - Training PPO models                       │
└──────────────┬───────────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────────┐
│ S3: phb-ml-models                            │
│  /appointment-scheduler/                     │
│    v1.0.pth (100 MB)                         │
│    v1.1.pth (105 MB)                         │
│  /adherence-predictor/                       │
│    model.pth (80 MB)                         │
└──────────────┬───────────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────────┐
│ EC2: t3.medium (Inference Server)            │
│  - Load model from S3                        │
│  - Serve predictions via API                 │
│  - REST endpoint for frontend                │
└──────────────────────────────────────────────┘
```

**Training Script:**
```python
import boto3
from stable_baselines3 import PPO
from appointment_env import AppointmentEnv

# Load training data from S3
s3 = boto3.client('s3')
s3.download_file('phb-ml-training-data', 'appointment-logs/2025-01.csv', 'data.csv')

# Initialize environment
env = AppointmentEnv(data_path='data.csv')

# Train PPO model
model = PPO('MlpPolicy', env, verbose=1)
model.learn(total_timesteps=1_000_000)

# Save to S3
model.save('appointment_scheduler_v1.pth')
s3.upload_file('appointment_scheduler_v1.pth', 'phb-ml-models', 'appointment-scheduler/v1.pth')
```

**Cost Estimation:**
- **Training**: p3.2xlarge ($3.06/hour) × 24 hours = $73.44/month (1 training run)
- **Inference**: t3.medium ($30.37/month) always-on
- **Storage**: 500 MB models × $0.023/GB = $0.01/month
- **Total**: ~$103/month for ML infrastructure

#### Integration with Current Frontend

**Update MedicalAIDemoPage.tsx:**
```typescript
// Current: Only visualization
// New: Real ML predictions

const [mlPrediction, setMlPrediction] = useState(null);

const getPrediction = async () => {
  const response = await fetch(`${API_URL}/ml/predict`, {
    method: 'POST',
    body: JSON.stringify({
      model: 'appointment-scheduler',
      input: patientData
    })
  });

  const prediction = await response.json();
  setMlPrediction(prediction);
};
```

**Add to Dashboard:**
- [HospitalDashboard.tsx](src/features/organization/dashboards/HospitalDashboard.tsx)
- Show ML-optimized appointment efficiency
- Display adherence risk scores
- Visualize resource utilization predictions

#### PPO Training Data Requirements

**Data Collection:**
```typescript
// In appointmentService.ts, log all booking events
const logTrainingData = async (appointmentData: any) => {
  await fetch(`${API_URL}/ml/log-training-data`, {
    method: 'POST',
    body: JSON.stringify({
      timestamp: Date.now(),
      patient_urgency: appointmentData.urgency,
      doctor_assigned: appointmentData.doctorId,
      wait_time: appointmentData.waitTime,
      outcome: appointmentData.completed ? 'success' : 'no_show'
    })
  });
};
```

**Minimum Data Required:**
- 10,000+ appointment records
- 6+ months of historical data
- Features: time, doctor, urgency, wait time, outcome
- Stored in S3 for training

#### Privacy & HIPAA Compliance

**Data Anonymization:**
```python
# Before training, anonymize patient data
import hashlib

def anonymize_patient_id(patient_id):
    return hashlib.sha256(patient_id.encode()).hexdigest()[:16]

training_data['patient_id'] = training_data['patient_id'].apply(anonymize_patient_id)
```

**Encryption:**
- S3 bucket: `phb-ml-training-data` encrypted with KMS
- VPC endpoint for S3 (no internet access)
- IAM role with least privilege

---

## Architecture Insights

### Current Infrastructure
- **Hosting**: Netlify (frontend), localhost (backends)
- **Storage**: localStorage/sessionStorage only
- **Monitoring**: Console logging (889 statements)
- **File uploads**: Backend-managed, no cloud storage
- **Database**: Backend-managed (not visible in frontend code)

### Recommended AWS Architecture

```
                    ┌─────────────────┐
                    │   CloudFront    │
                    │   (CDN + SSL)   │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  S3 Static      │
                    │  Website        │
                    │  (React App)    │
                    └─────────────────┘
                             │
                    ┌────────▼────────┐
                    │  Route 53       │
                    │  (DNS)          │
                    └─────────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
┌───────▼───────┐   ┌────────▼────────┐  ┌───────▼────────┐
│ ALB (Django)  │   │ ALB (Node.js)   │  │ API Gateway    │
│               │   │                 │  │ (ML Inference) │
└───────┬───────┘   └────────┬────────┘  └───────┬────────┘
        │                    │                    │
┌───────▼───────┐   ┌────────▼────────┐  ┌───────▼────────┐
│ EC2 Auto      │   │ EC2 Auto        │  │ Lambda         │
│ Scaling       │   │ Scaling         │  │ (Serverless)   │
│ (Django)      │   │ (Node.js)       │  │                │
└───────┬───────┘   └────────┬────────┘  └───────┬────────┘
        │                    │                    │
┌───────▼───────┐   ┌────────▼────────┐  ┌───────▼────────┐
│ RDS           │   │ DynamoDB        │  │ S3 Models      │
│ (PostgreSQL)  │   │ (Sessions,      │  │ (ML Models)    │
│               │   │  Search,        │  │                │
│               │   │  Tracking)      │  │                │
└───────────────┘   └─────────────────┘  └────────────────┘
        │
┌───────▼───────────────────────────────┐
│ S3 Buckets                            │
│ - phb-medical-imaging (CloudFront)    │
│ - phb-prescriptions (KMS encrypted)   │
│ - phb-clinical-guidelines (IA)        │
└───────────────────────────────────────┘
        │
┌───────▼───────────────────────────────┐
│ CloudWatch                            │
│ - Application logs                    │
│ - Custom metrics                      │
│ - Alarms (payment, OTP, etc.)         │
└───────────────────────────────────────┘
```

### Cost Estimation (Monthly)

**Minimal Setup (Development):**
- EC2 (2x t3.medium): $60
- RDS (db.t3.small): $25
- S3 (100 GB): $2.30
- CloudWatch Logs (10 GB): $5
- **Total**: ~$92/month

**Production Setup (10,000 users):**
- EC2 (4x c6i.xlarge): $511
- RDS (db.r6g.xlarge): $245
- DynamoDB (on-demand): $1.25
- S3 (500 GB + requests): $50
- CloudFront (1 TB transfer): $85
- CloudWatch: $30
- EFS (100 GB with IA): $10
- **Total**: ~$932/month

**With ML (PPO Training):**
- Add p3.2xlarge (training): $73 (one-time monthly)
- Total: ~$1,005/month

---

## Code References

### Deployment & Infrastructure
- [netlify.toml](netlify.toml) - Current Netlify deployment config
- [vite.config.ts](vite.config.ts:15) - Build configuration with code splitting
- [config.ts:6-11](src/utils/config.ts#L6-L11) - Backend API endpoints

### File Upload & Storage
- [SecureFileUpload.tsx](src/components/security/SecureFileUpload.tsx) - Main upload component
- [guidelinesService.ts](src/services/guidelinesService.ts) - File upload service (9 HTTP methods)
- [pharmacyService.ts](src/services/pharmacyService.ts) - Pharmacy file handling (7 HTTP methods)

### Monitoring & Logging
- [ErrorBoundary.tsx](src/components/ErrorBoundary.tsx) - Error boundary with console.error
- [medicalRecordsService.ts](src/features/health/medicalRecordsService.ts) - 77 console statements
- [authContext.tsx:150-280](src/features/auth/authContext.tsx#L150-L280) - 78 console statements

### Data Management
- [searchHistoryService.ts](src/utils/searchHistoryService.ts) - localStorage search history
- [CycleTrackerPage.tsx](src/pages/contraception/CycleTrackerPage.tsx) - Pregnancy data in localStorage
- [KickCounter.tsx](src/features/pregnancy/KickCounter.tsx) - Health tracking data

### API Services
- [appointmentService.ts](src/services/appointmentService.ts) - Appointment API
- [paymentService.ts](src/services/paymentService.ts) - Paystack integration (21 console statements)
- [womensHealthApi.ts](src/services/womensHealthApi.ts) - 20 HTTP methods

### ML & Analytics
- [MedicalAIDemoPage.tsx](src/pages/MedicalAIDemoPage.tsx) - Medical AI demo (39 console statements)
- [HospitalDashboard.tsx](src/features/organization/dashboards/HospitalDashboard.tsx) - Dashboard analytics
- [useDepartmentStats.ts](src/hooks/useDepartmentStats.ts) - Department statistics

---

## Related Research

- [CLAUDE.md](CLAUDE.md) - Project architecture documentation
- [API-SETUP.md](API-SETUP.md) - API configuration guide
- [WOMENS_HEALTH_DATABASE_SPEC.md](WOMENS_HEALTH_DATABASE_SPEC.md) - Database schema

---

## Open Questions

1. **Backend Framework Confirmation**: Is the Django backend already deployed or still localhost-only?
2. **Database Choice**: PostgreSQL or MySQL for the backend?
3. **Current Storage Solution**: Where are uploaded files (guidelines, prescriptions) currently stored?
4. **Traffic Patterns**: What are peak usage hours for appointment booking?
5. **ML Readiness**: Is there historical appointment data available for PPO training?
6. **Budget**: What is the monthly cloud infrastructure budget?
7. **Compliance Requirements**: HIPAA compliance needed for US patients?
8. **Geographic Distribution**: Are users globally distributed or region-specific?

---

## Implementation Priority Recommendations

### Phase 1: Foundation (Month 1)
1. **EC2 for Backend**: Migrate Django + Node.js from localhost
2. **S3 for Static Assets**: Move [public/images/](public/images/) to S3 + CloudFront
3. **RDS for Database**: Set up PostgreSQL with automated backups

### Phase 2: Monitoring (Month 2)
1. **CloudWatch Integration**: Replace 889 console.log statements
2. **Custom Dashboards**: Payment success rate, OTP failures, API latency
3. **Alarms**: Critical payment failures, authentication issues

### Phase 3: Storage Optimization (Month 3)
1. **S3 for Medical Files**: Migrate file uploads from backend to S3
2. **DynamoDB for Sessions**: Move localStorage data to DynamoDB
3. **Lifecycle Policies**: Implement IA storage class for old files

### Phase 4: Scaling (Month 4)
1. **Auto Scaling Groups**: Handle traffic spikes
2. **EFS for Shared Storage**: If using multiple EC2 instances
3. **CloudFront CDN**: Global content delivery

### Phase 5: ML Integration (Month 5-6)
1. **Data Collection**: Log appointment data for training
2. **PPO Training**: Train appointment scheduler model
3. **Inference API**: Deploy ML prediction endpoint
4. **Frontend Integration**: Add ML recommendations to booking flow

---

**End of Research Document**
