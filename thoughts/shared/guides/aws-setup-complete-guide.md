---
date: 2025-10-30T21:40:50+0000
author: Claude
git_commit: b601424d2b1ea6dcd679c9195b603ecefc718ba3
branch: main
repository: phbfrontend
topic: "Complete AWS Setup Guide for PHB Hospital System - From Zero to Production"
tags: [guide, aws, setup, infrastructure, deployment, step-by-step, beginner-friendly]
difficulty: Beginner to Intermediate
estimated_time: 40-60 hours over 12 months
related_to:
  - 2025-10-30-aws-services-integration-analysis.md
  - 2025-10-30-monolithic-architecture-analysis.md
---

# Complete AWS Setup Guide for PHB Hospital System
## From Creating Your AWS Account to Production Deployment

**Date**: 2025-10-30T21:40:50+0000
**Author**: Claude
**Difficulty**: Beginner to Intermediate
**Time**: 40-60 hours spread over 12 months
**Cost**: $0 (Free Tier) for first year, then ~$1,500-2,500/month

---

## Table of Contents

### Part 1: Foundation (Week 1-4)
1. [AWS Account Setup](#1-aws-account-setup)
2. [Understanding AWS Free Tier](#2-understanding-aws-free-tier)
3. [Security Fundamentals (IAM)](#3-security-fundamentals-iam)
4. [Billing Setup and Alerts](#4-billing-setup-and-alerts)

### Part 2: Core Infrastructure (Week 5-12)
5. [VPC and Networking Setup](#5-vpc-and-networking-setup)
6. [EC2 Instance Setup (Your First Server)](#6-ec2-instance-setup-your-first-server)
7. [S3 Bucket Configuration](#7-s3-bucket-configuration)
8. [RDS Database Setup](#8-rds-database-setup)

### Part 3: Monitoring & Security (Week 13-16)
9. [CloudWatch Monitoring](#9-cloudwatch-monitoring)
10. [CloudFront CDN Setup](#10-cloudfront-cdn-setup)
11. [Route 53 (DNS)](#11-route-53-dns)
12. [SSL Certificates (AWS Certificate Manager)](#12-ssl-certificates-aws-certificate-manager)

### Part 4: Advanced Services (Week 17-24)
13. [API Gateway Setup](#13-api-gateway-setup)
14. [DynamoDB Setup](#14-dynamodb-setup)
15. [ElastiCache (Redis) Setup](#15-elasticache-redis-setup)
16. [SNS & SQS (Messaging)](#16-sns--sqs-messaging)

### Part 5: Deployment Automation (Week 25-32)
17. [Auto Scaling Groups](#17-auto-scaling-groups)
18. [Load Balancer Configuration](#18-load-balancer-configuration)
19. [CI/CD Pipeline](#19-cicd-pipeline)
20. [Backup and Disaster Recovery](#20-backup-and-disaster-recovery)

### Part 6: PHB-Specific Deployment (Week 33-48)
21. [Deploying Django Backend](#21-deploying-django-backend)
22. [Deploying Node.js Backend](#22-deploying-nodejs-backend)
23. [Deploying React Frontend](#23-deploying-react-frontend)
24. [Production Checklist](#24-production-checklist)

---

## Part 1: Foundation (Week 1-4)

---

## 1. AWS Account Setup

### Step 1.1: Create Your AWS Account

**Time**: 15-30 minutes
**Cost**: $0

1. **Go to AWS Website**
   - Navigate to: https://aws.amazon.com/
   - Click "Create an AWS Account" (orange button, top right)

2. **Enter Root User Email**
   ```
   AWS account name: PHB Hospital System
   Email address: your-email@example.com (use business email)
   ```

   **⚠️ CRITICAL**: Use a business email, not personal. This will be your root account.

3. **Verify Email**
   - Check your inbox for verification code
   - Enter 6-digit code: `[______]`
   - Code expires in 10 minutes

4. **Create Password**
   ```
   Password requirements:
   ✓ Minimum 8 characters
   ✓ At least 1 uppercase letter
   ✓ At least 1 lowercase letter
   ✓ At least 1 number
   ✓ At least 1 special character (!@#$%^&*)

   Example: PHBHospital2025!@
   ```

   **⚠️ SECURITY TIP**: Store this password in a password manager (LastPass, 1Password, Bitwarden)

5. **Enter Contact Information**
   ```
   Account type: Professional
   Full name: [Your Name]
   Phone number: +234-XXX-XXX-XXXX (Nigeria country code)
   Country: Nigeria
   Address: [Your Address]
   City: [Your City]
   State: [Your State]
   Postal code: [Your Postal Code]
   ```

6. **Payment Information**
   ```
   Credit/Debit card required (for verification, won't be charged during Free Tier)
   Card number: [16 digits]
   Expiration: MM/YY
   CVV: [3 digits]
   ```

   **⚠️ IMPORTANT**: AWS will charge $1 for verification, then immediately refund it.

7. **Identity Verification**
   - Choose phone verification (faster)
   - Enter phone number: +234-XXX-XXX-XXXX
   - AWS will call you immediately
   - Enter 4-digit PIN displayed on screen when call connects
   - Press any key during call to confirm

8. **Select Support Plan**
   ```
   ✓ Basic Support Plan (FREE)
   ○ Developer Support ($29/month)
   ○ Business Support ($100/month)
   ```

   **Recommendation**: Start with Basic (free), upgrade later if needed.

9. **Confirmation**
   - You'll see: "Congratulations! Your AWS Account is ready!"
   - Click "Go to AWS Management Console"

---

### Step 1.2: Secure Your Root Account

**Time**: 10 minutes
**Importance**: 🔴 CRITICAL

**⚠️ WARNING**: Root account has unlimited access. NEVER use it for daily tasks.

1. **Enable MFA (Multi-Factor Authentication)**
   - Click your account name (top right) → "Security credentials"
   - Under "Multi-factor authentication (MFA)", click "Assign MFA device"

   **Option A: Virtual MFA (Recommended)**
   ```
   1. Download authenticator app:
      - Google Authenticator (iOS/Android)
      - Microsoft Authenticator (iOS/Android)
      - Authy (iOS/Android/Desktop)

   2. Scan QR code with app
   3. Enter two consecutive MFA codes:
      - Code 1: [6 digits]
      - Code 2: [wait 30 seconds, enter next 6 digits]
   4. Click "Assign MFA"
   ```

   **Option B: Hardware MFA Device**
   ```
   - YubiKey ($50-70)
   - More secure, requires physical device
   - Good for production environments
   ```

2. **Save Recovery Codes**
   - Click "Show" next to MFA device
   - Save recovery codes in password manager
   - Print and store in secure location

---

### Step 1.3: Create Your First IAM User

**Time**: 15 minutes
**Purpose**: Never use root account for daily tasks

1. **Navigate to IAM**
   - Services menu → Security, Identity, & Compliance → IAM
   - Or search: "IAM" in top search bar

2. **Create User**
   ```
   Click "Users" (left sidebar) → "Create user"

   User name: phb-admin
   Access type:
     ✓ Programmatic access (for CLI/SDK)
     ✓ AWS Management Console access

   Console password:
     ○ Autogenerated
     ✓ Custom password: [Create strong password]
     □ Require password reset
   ```

3. **Set Permissions**
   ```
   Click "Attach existing policies directly"

   Search and select:
   ✓ AdministratorAccess (for now, we'll restrict later)
   ```

   **⚠️ NOTE**: We'll create custom policies later for production.

4. **Add Tags** (Optional but Recommended)
   ```
   Key: Department | Value: Engineering
   Key: Project   | Value: PHB
   Key: Role      | Value: Administrator
   ```

5. **Review and Create**
   - Review settings
   - Click "Create user"

6. **⚠️ CRITICAL: Save Credentials**
   ```
   You'll see:

   Access key ID: AKIAXXXXXXXXXXXXXXXX
   Secret access key: [40 characters - only shown once!]
   Console sign-in link: https://123456789012.signin.aws.amazon.com/console

   ✓ Download .csv file
   ✓ Store in password manager
   ✓ Save console sign-in link

   THIS IS YOUR ONLY CHANCE TO SEE SECRET ACCESS KEY!
   ```

7. **Sign Out and Test**
   - Sign out of root account
   - Use console sign-in link
   - Login as: phb-admin
   - Enter password

---

## 2. Understanding AWS Free Tier

### Free Tier Limits (12 Months)

**⏰ Free Tier Duration**: 12 months from account creation date

#### Compute (EC2)
```
✓ 750 hours/month of t2.micro instances (Linux)
✓ 750 hours/month of t2.micro instances (Windows)

Translation: 1 instance running 24/7 for entire month = 720 hours
Can run 1 Linux EC2 instance continuously for FREE
```

**Best for PHB**:
- Month 1-6: Run 1 t2.micro for Django backend (FREE)
- Month 7-12: Run 1 t2.micro for Node.js backend (FREE)
- Use single instance for both initially (still FREE)

---

#### Storage (S3)
```
✓ 5 GB of Standard storage
✓ 20,000 GET requests
✓ 2,000 PUT requests

Translation:
- Store 5 GB of files (clinical guidelines, prescriptions)
- 20,000 downloads per month
- 2,000 uploads per month
```

**Best for PHB**:
- Store medical imaging (DICOM files)
- Clinical guidelines (PDFs)
- Prescription documents
- Static website assets

---

#### Database (RDS)
```
✓ 750 hours/month of db.t2.micro
✓ 20 GB of General Purpose (SSD) storage
✓ 20 GB of backup storage

Translation: 1 small database running 24/7 FREE
```

**Best for PHB**:
- PostgreSQL database for patient records
- 20 GB enough for 10,000+ patients initially

---

#### Data Transfer
```
✓ 15 GB of data transfer OUT per month
✓ Unlimited data transfer IN

Translation:
- 15 GB = ~30,000 page views with images
- Uploading files is always free
```

---

#### CloudFront (CDN)
```
✓ 50 GB data transfer out
✓ 2,000,000 HTTP/HTTPS requests

Translation: Serve static assets (JS, CSS, images) to users
```

---

#### Other Free Tier Services

**DynamoDB**:
```
✓ 25 GB of storage
✓ 25 read capacity units
✓ 25 write capacity units

Best for: Session storage, pregnancy tracking, search history
```

**CloudWatch**:
```
✓ 10 custom metrics
✓ 10 alarms
✓ 1 million API requests
✓ 5 GB log ingestion

Best for: Application monitoring, error tracking
```

**SNS (Notifications)**:
```
✓ 1 million publishes
✓ 100,000 HTTP deliveries
✓ 1,000 email deliveries

Best for: Appointment reminders, system alerts
```

**SQS (Queues)**:
```
✓ 1 million requests

Best for: Payment verification retries, async tasks
```

**Lambda (Serverless)**:
```
✓ 1 million requests per month
✓ 400,000 GB-seconds of compute

Best for: Scheduled tasks, event processing
```

---

### Free Tier Monitoring

**Set Up Usage Alerts**:

1. **Navigate to Billing**
   ```
   Account menu (top right) → Billing and Cost Management
   ```

2. **Enable Free Tier Alerts**
   ```
   Left sidebar → Preferences
   ✓ Receive Free Tier Usage Alerts
   Email: your-email@example.com
   ```

3. **Create Budget**
   ```
   Left sidebar → Budgets → Create budget

   Budget name: PHB Free Tier Monitor
   Budgeted amount: $10
   Alert threshold: 80% ($8)
   Email: your-email@example.com
   ```

**⚠️ CRITICAL**: You'll get email when spending approaches $10/month

---

### What Happens After Free Tier?

**Month 13 Pricing (After Free Tier Expires)**:

```
EC2 t2.micro: $8.50/month
RDS db.t2.micro: $15/month
S3 (20 GB): $0.46/month
Data transfer (15 GB out): $1.35/month
CloudWatch Logs (5 GB): $2.50/month
DynamoDB (25 GB): $6.25/month

Estimated total: ~$34/month for basic setup
```

**Scaling to Production** (10,000 users):
```
EC2 (2x t3.medium): $60/month
RDS (db.t3.small): $25/month
S3 (100 GB): $2.30/month
Data transfer (100 GB): $9/month
CloudFront (200 GB): $17/month
DynamoDB on-demand: $1-5/month
Load Balancer: $16/month
ElastiCache t3.micro: $12/month

Total: ~$150-200/month
```

---

## 3. Security Fundamentals (IAM)

### IAM Best Practices

**⚠️ GOLDEN RULES**:
1. Never use root account after initial setup
2. One user per person (no sharing)
3. Use groups for permissions
4. Enable MFA on all users
5. Rotate access keys every 90 days
6. Use principle of least privilege

---

### Step 3.1: Create IAM Groups

**Time**: 20 minutes

1. **Navigate to IAM**
   ```
   Services → IAM → User groups
   ```

2. **Create Developer Group**
   ```
   Click "Create group"

   Group name: PHB-Developers

   Attach policies:
   ✓ AmazonEC2FullAccess
   ✓ AmazonS3FullAccess
   ✓ AmazonRDSFullAccess
   ✓ CloudWatchLogsFullAccess

   Click "Create group"
   ```

3. **Create Operations Group**
   ```
   Group name: PHB-Operations

   Attach policies:
   ✓ AdministratorAccess (full access for ops team)

   Click "Create group"
   ```

4. **Create Read-Only Group**
   ```
   Group name: PHB-ReadOnly

   Attach policies:
   ✓ ReadOnlyAccess

   Click "Create group"
   ```

---

### Step 3.2: Create Custom Policy for PHB Backend

**Purpose**: Limit EC2 instances to only access specific S3 buckets

1. **Navigate to Policies**
   ```
   IAM → Policies → Create policy
   ```

2. **Visual Editor**
   ```
   Service: S3
   Actions:
     ✓ GetObject
     ✓ PutObject
     ✓ DeleteObject
   Resources:
     Bucket: phb-medical-imaging
     Object: phb-medical-imaging/*
   ```

3. **JSON Editor** (Advanced)
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": [
           "s3:GetObject",
           "s3:PutObject",
           "s3:DeleteObject",
           "s3:ListBucket"
         ],
         "Resource": [
           "arn:aws:s3:::phb-medical-imaging",
           "arn:aws:s3:::phb-medical-imaging/*"
         ]
       }
     ]
   }
   ```

4. **Review and Create**
   ```
   Policy name: PHB-Backend-S3-Access
   Description: Allows backend to access medical imaging bucket
   ```

---

### Step 3.3: Create Service Role for EC2

**Purpose**: Allow EC2 instances to access S3 without hardcoded keys

1. **Navigate to Roles**
   ```
   IAM → Roles → Create role
   ```

2. **Select Trusted Entity**
   ```
   Trusted entity type: AWS service
   Use case: EC2
   Click "Next"
   ```

3. **Attach Permissions**
   ```
   Search and select:
   ✓ PHB-Backend-S3-Access (custom policy created above)
   ✓ CloudWatchLogsFullAccess
   ```

4. **Name and Create**
   ```
   Role name: PHB-EC2-Backend-Role
   Description: Role for PHB backend EC2 instances
   ```

**Usage**: When creating EC2 instance, assign this role (we'll do this in Step 6)

---

## 4. Billing Setup and Alerts

### Step 4.1: Enable Cost Explorer

**Time**: 5 minutes

1. **Navigate to Billing**
   ```
   Account menu → Billing and Cost Management
   ```

2. **Enable Cost Explorer**
   ```
   Left sidebar → Cost Explorer
   Click "Enable Cost Explorer"

   Wait 24 hours for data to populate
   ```

---

### Step 4.2: Create Detailed Billing Alerts

1. **Create SNS Topic for Alerts**
   ```
   Services → SNS → Topics → Create topic

   Type: Standard
   Name: PHB-Billing-Alerts
   Display name: PHB Billing

   Click "Create topic"
   ```

2. **Create Subscription**
   ```
   Click "Create subscription"

   Protocol: Email
   Endpoint: your-email@example.com

   Click "Create subscription"
   ```

3. **Confirm Subscription**
   - Check email inbox
   - Click "Confirm subscription" link

4. **Create CloudWatch Alarm**
   ```
   Services → CloudWatch → Alarms → Create alarm

   Select metric → Billing → Total Estimated Charge
   Conditions:
     Threshold: Static
     Whenever EstimatedCharges is: Greater than $5

   Notification:
     SNS topic: PHB-Billing-Alerts

   Alarm name: PHB-Billing-Alert-5-Dollars
   ```

5. **Create Additional Alarms**
   - $10 threshold
   - $25 threshold
   - $50 threshold

---

### Step 4.3: Enable AWS Budgets

1. **Create Budget**
   ```
   Billing → Budgets → Create budget

   Budget type: Cost budget
   Budget name: PHB Monthly Budget
   Period: Monthly
   Budgeted amount: $20

   Alert thresholds:
     - 50% of budgeted amount ($10)
     - 80% of budgeted amount ($16)
     - 100% of budgeted amount ($20)

   Email: your-email@example.com
   ```

---

## 5. VPC and Networking Setup

### Understanding VPC

**VPC (Virtual Private Cloud)** = Your private network in AWS

```
Internet
    │
    ▼
┌─────────────────────────────────────────────────────┐
│ VPC (10.0.0.0/16)                                   │
│                                                     │
│  ┌────────────────────┐  ┌────────────────────┐   │
│  │ Public Subnet 1    │  │ Public Subnet 2    │   │
│  │ 10.0.1.0/24        │  │ 10.0.2.0/24        │   │
│  │ (us-east-1a)       │  │ (us-east-1b)       │   │
│  │                    │  │                    │   │
│  │ ┌────────────────┐ │  │ ┌────────────────┐ │   │
│  │ │ Web Server     │ │  │ │ API Server     │ │   │
│  │ └────────────────┘ │  │ └────────────────┘ │   │
│  └────────────────────┘  └────────────────────┘   │
│                                                     │
│  ┌────────────────────┐  ┌────────────────────┐   │
│  │ Private Subnet 1   │  │ Private Subnet 2   │   │
│  │ 10.0.3.0/24        │  │ 10.0.4.0/24        │   │
│  │ (us-east-1a)       │  │ (us-east-1b)       │   │
│  │                    │  │                    │   │
│  │ ┌────────────────┐ │  │ ┌────────────────┐ │   │
│  │ │ Database       │ │  │ │ Cache (Redis)  │ │   │
│  │ └────────────────┘ │  │ └────────────────┘ │   │
│  └────────────────────┘  └────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

**Public Subnet**: Has internet access (web servers, API)
**Private Subnet**: No direct internet (databases, cache)

---

### Step 5.1: Create VPC

**Time**: 15 minutes

1. **Navigate to VPC**
   ```
   Services → VPC → Your VPCs → Create VPC
   ```

2. **VPC Settings**
   ```
   Resources to create: VPC and more (Wizard - Recommended)

   Name tag: PHB-VPC
   IPv4 CIDR block: 10.0.0.0/16

   Number of Availability Zones: 2
   Number of public subnets: 2
   Number of private subnets: 2

   NAT gateways: In 1 AZ (costs $33/month, skip for now)
   VPC endpoints: None (for now)

   DNS options:
     ✓ Enable DNS hostnames
     ✓ Enable DNS resolution
   ```

3. **Review Network Diagram**
   - AWS shows visual diagram
   - Verify 2 public + 2 private subnets
   - Click "Create VPC"

4. **Wait for Creation** (2-3 minutes)

---

### Step 5.2: Create Security Groups

**Security Group** = Firewall rules for your resources

**Security Group 1: Web Server**

1. **Create Security Group**
   ```
   VPC → Security Groups → Create security group

   Name: PHB-Web-Server-SG
   Description: Allow HTTP/HTTPS from internet
   VPC: PHB-VPC
   ```

2. **Inbound Rules**
   ```
   Add rule:
   Type: HTTP
   Port: 80
   Source: 0.0.0.0/0 (anywhere)
   Description: Allow HTTP from internet

   Add rule:
   Type: HTTPS
   Port: 443
   Source: 0.0.0.0/0 (anywhere)
   Description: Allow HTTPS from internet

   Add rule:
   Type: SSH
   Port: 22
   Source: My IP (your IP address)
   Description: SSH access from my IP only
   ```

3. **Outbound Rules** (Default: Allow all)
   ```
   Leave default: All traffic to 0.0.0.0/0
   ```

---

**Security Group 2: Database**

1. **Create Security Group**
   ```
   Name: PHB-Database-SG
   Description: Allow PostgreSQL from web servers only
   VPC: PHB-VPC
   ```

2. **Inbound Rules**
   ```
   Add rule:
   Type: PostgreSQL
   Port: 5432
   Source: PHB-Web-Server-SG (select security group, not IP)
   Description: Allow DB access from web servers only
   ```

**⚠️ SECURITY**: Database only accepts connections from web servers, not internet

---

**Security Group 3: Cache (Redis)**

1. **Create Security Group**
   ```
   Name: PHB-Cache-SG
   Description: Allow Redis from web servers
   VPC: PHB-VPC
   ```

2. **Inbound Rules**
   ```
   Add rule:
   Type: Custom TCP
   Port: 6379
   Source: PHB-Web-Server-SG
   Description: Allow Redis from web servers
   ```

---

## 6. EC2 Instance Setup (Your First Server)

### Step 6.1: Launch EC2 Instance

**Time**: 20 minutes
**Free Tier**: 750 hours/month of t2.micro

1. **Navigate to EC2**
   ```
   Services → EC2 → Instances → Launch instance
   ```

2. **Name and Tags**
   ```
   Name: PHB-Django-Backend-1

   Additional tags:
   Key: Environment | Value: Development
   Key: Project     | Value: PHB
   Key: Service     | Value: Django
   ```

3. **Application and OS Images (AMI)**
   ```
   Quick Start:
   ✓ Ubuntu Server 22.04 LTS (HVM), SSD Volume Type

   Architecture: 64-bit (x86)

   ⚠️ FREE TIER ELIGIBLE badge must be visible
   ```

4. **Instance Type**
   ```
   Instance type: t2.micro

   Specifications:
   - 1 vCPU
   - 1 GB RAM
   - EBS only storage
   - FREE TIER ELIGIBLE ✓
   ```

5. **Key Pair (Login)**
   ```
   Click "Create new key pair"

   Key pair name: phb-backend-key
   Key pair type: RSA
   Private key format: .pem (for macOS/Linux) or .ppk (for Windows PuTTY)

   Click "Create key pair"
   ```

   **⚠️ CRITICAL**:
   - File downloads automatically: `phb-backend-key.pem`
   - This is YOUR ONLY COPY
   - Store securely (password manager or secure folder)
   - You'll need this to SSH into server

6. **Network Settings**
   ```
   VPC: PHB-VPC
   Subnet: Public Subnet 1 (10.0.1.0/24)
   Auto-assign public IP: Enable

   Firewall (security groups):
   ✓ Select existing security group
   Security group: PHB-Web-Server-SG
   ```

7. **Configure Storage**
   ```
   Volume 1 (Root volume):
   Size: 30 GB (Free Tier allows up to 30 GB)
   Volume type: General Purpose SSD (gp3)
   IOPS: 3000
   Throughput: 125 MB/s

   ✓ Delete on termination
   ✓ Encrypted
   ```

   **⚠️ FREE TIER**: 30 GB of EBS storage included

8. **Advanced Details**
   ```
   IAM instance profile: PHB-EC2-Backend-Role (created in Step 3.3)

   User data (optional - run commands on first boot):
   ```
   ```bash
   #!/bin/bash
   # Update system
   apt-get update && apt-get upgrade -y

   # Install Python 3
   apt-get install -y python3 python3-pip python3-venv

   # Install PostgreSQL client
   apt-get install -y postgresql-client

   # Install Node.js (if running both backends on same server)
   curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
   apt-get install -y nodejs

   # Install Git
   apt-get install -y git

   # Create app directory
   mkdir -p /opt/phb
   chown ubuntu:ubuntu /opt/phb
   ```

9. **Review and Launch**
   - Review all settings
   - Click "Launch instance"
   - Wait 2-3 minutes for instance to start

---

### Step 6.2: Connect to EC2 Instance

**Method 1: SSH (macOS/Linux)**

1. **Set Permissions on Key File**
   ```bash
   cd ~/Downloads
   chmod 400 phb-backend-key.pem
   ```

2. **Get Public IP**
   ```
   EC2 Console → Instances
   Select: PHB-Django-Backend-1
   Copy: Public IPv4 address (e.g., 3.91.XX.XXX)
   ```

3. **SSH Connect**
   ```bash
   ssh -i phb-backend-key.pem ubuntu@3.91.XX.XXX

   # First time, you'll see:
   The authenticity of host '3.91.XX.XXX' can't be established.
   Are you sure you want to continue connecting (yes/no)? yes
   ```

4. **You're In!**
   ```
   ubuntu@ip-10-0-1-XX:~$
   ```

---

**Method 2: EC2 Instance Connect (Browser)**

1. **Navigate to Instance**
   ```
   EC2 Console → Instances
   Select: PHB-Django-Backend-1
   Click "Connect" button (top right)
   ```

2. **EC2 Instance Connect Tab**
   ```
   User name: ubuntu (default)
   Click "Connect"
   ```

3. **Browser Terminal Opens**
   - No key file needed
   - Works from any computer
   - Slower than SSH

---

### Step 6.3: Verify Installation

```bash
# Check Python version
python3 --version
# Output: Python 3.10.12

# Check Node.js version
node --version
# Output: v20.x.x

# Check disk space
df -h
# Output: 30 GB available

# Check memory
free -h
# Output: 1 GB RAM

# Update package list
sudo apt update
```

---

### Step 6.4: Install Django Backend

**Time**: 30 minutes

1. **Install Dependencies**
   ```bash
   # Install Python virtual environment
   sudo apt install -y python3-venv python3-dev

   # Install PostgreSQL development files
   sudo apt install -y libpq-dev

   # Install Nginx (web server)
   sudo apt install -y nginx

   # Install Supervisor (process manager)
   sudo apt install -y supervisor
   ```

2. **Clone Your Repository** (if using Git)
   ```bash
   cd /opt/phb
   git clone https://github.com/yourusername/phb-backend.git
   cd phb-backend
   ```

   **OR** Upload Files Manually:
   ```bash
   # On your local machine
   scp -i phb-backend-key.pem -r /path/to/your/django/project ubuntu@3.91.XX.XXX:/opt/phb/
   ```

3. **Create Virtual Environment**
   ```bash
   cd /opt/phb/phb-backend
   python3 -m venv venv
   source venv/bin/activate
   ```

4. **Install Requirements**
   ```bash
   pip install --upgrade pip
   pip install -r requirements.txt

   # If no requirements.txt, install manually:
   pip install django djangorestframework psycopg2-binary gunicorn django-cors-headers
   ```

5. **Configure Environment Variables**
   ```bash
   nano .env
   ```

   ```bash
   # .env file
   DEBUG=False
   SECRET_KEY=your-secret-key-here-generate-new-one
   ALLOWED_HOSTS=3.91.XX.XXX,phb.yourdomain.com

   # Database (we'll set up RDS later)
   DB_NAME=phb_db
   DB_USER=phb_admin
   DB_PASSWORD=secure-password-here
   DB_HOST=localhost  # Change to RDS endpoint later
   DB_PORT=5432

   # CORS
   CORS_ALLOWED_ORIGINS=https://phb.netlify.app,http://localhost:5173
   ```

   Save: `Ctrl+X`, `Y`, `Enter`

6. **Run Migrations** (if using SQLite locally for now)
   ```bash
   python manage.py migrate
   python manage.py createsuperuser
   ```

7. **Test Django**
   ```bash
   python manage.py runserver 0.0.0.0:8000

   # Open browser: http://3.91.XX.XXX:8000
   # Should see Django welcome page

   # Stop server: Ctrl+C
   ```

---

### Step 6.5: Configure Gunicorn (Production Server)

1. **Test Gunicorn**
   ```bash
   gunicorn --bind 0.0.0.0:8000 server.wsgi:application

   # Test in browser: http://3.91.XX.XXX:8000
   # Ctrl+C to stop
   ```

2. **Create Systemd Service**
   ```bash
   sudo nano /etc/systemd/system/phb-backend.service
   ```

   ```ini
   [Unit]
   Description=PHB Django Backend
   After=network.target

   [Service]
   User=ubuntu
   Group=www-data
   WorkingDirectory=/opt/phb/phb-backend
   Environment="PATH=/opt/phb/phb-backend/venv/bin"
   ExecStart=/opt/phb/phb-backend/venv/bin/gunicorn \
             --workers 3 \
             --bind unix:/opt/phb/phb-backend/gunicorn.sock \
             server.wsgi:application

   [Install]
   WantedBy=multi-user.target
   ```

   Save and exit.

3. **Start Service**
   ```bash
   sudo systemctl start phb-backend
   sudo systemctl enable phb-backend
   sudo systemctl status phb-backend

   # Should see: Active (running)
   ```

---

### Step 6.6: Configure Nginx

1. **Create Nginx Config**
   ```bash
   sudo nano /etc/nginx/sites-available/phb-backend
   ```

   ```nginx
   server {
       listen 80;
       server_name 3.91.XX.XXX phb-api.yourdomain.com;

       location = /favicon.ico { access_log off; log_not_found off; }

       location /static/ {
           alias /opt/phb/phb-backend/staticfiles/;
       }

       location /media/ {
           alias /opt/phb/phb-backend/media/;
       }

       location / {
           include proxy_params;
           proxy_pass http://unix:/opt/phb/phb-backend/gunicorn.sock;

           # CORS headers
           add_header Access-Control-Allow-Origin *;
           add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS";
           add_header Access-Control-Allow-Headers "DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization";
       }
   }
   ```

   Save and exit.

2. **Enable Site**
   ```bash
   sudo ln -s /etc/nginx/sites-available/phb-backend /etc/nginx/sites-enabled/
   sudo nginx -t  # Test configuration
   sudo systemctl restart nginx
   ```

3. **Test**
   ```
   Open browser: http://3.91.XX.XXX
   Should see Django API
   ```

---

## 7. S3 Bucket Configuration

### Understanding S3 Buckets

**S3 (Simple Storage Service)** = Cloud file storage

**Use Cases for PHB**:
- Medical imaging (DICOM files)
- Clinical guidelines (PDFs)
- Prescription documents
- Static website assets (React frontend)

---

### Step 7.1: Create Medical Imaging Bucket

**Time**: 10 minutes
**Free Tier**: 5 GB storage, 20,000 GET requests, 2,000 PUT requests

1. **Navigate to S3**
   ```
   Services → S3 → Buckets → Create bucket
   ```

2. **Bucket Settings**
   ```
   Bucket name: phb-medical-imaging-[your-unique-id]
   (Example: phb-medical-imaging-2025-nigeria)

   ⚠️ Bucket names must be globally unique
   ⚠️ Cannot contain uppercase or spaces
   ⚠️ Must be 3-63 characters

   AWS Region: us-east-1 (N. Virginia)
   ```

   **Why us-east-1?**
   - Lowest cost
   - Most services available
   - Free tier generous

3. **Object Ownership**
   ```
   ✓ ACLs disabled (recommended)
   ```

4. **Block Public Access**
   ```
   ✓ Block all public access (medical data should be private!)
   ```

5. **Bucket Versioning**
   ```
   ✓ Enable (keep old versions of files)
   ```

   **Why versioning?**
   - Accidental deletions can be recovered
   - HIPAA compliance requirement
   - Audit trail for medical records

6. **Default Encryption**
   ```
   Encryption type: Server-side encryption with Amazon S3 managed keys (SSE-S3)
   Bucket Key: Enabled
   ```

   **⚠️ HIPAA COMPLIANCE**: Encryption required for PHI (Protected Health Information)

7. **Advanced Settings**
   ```
   Object Lock: Disable (not needed for now)
   ```

8. **Create Bucket**
   - Review settings
   - Click "Create bucket"

---

### Step 7.2: Create Clinical Guidelines Bucket

1. **Create Bucket**
   ```
   Name: phb-clinical-guidelines-[your-unique-id]
   Region: us-east-1

   Block public access: ✓ Enabled
   Versioning: ✓ Enabled
   Encryption: SSE-S3
   ```

---

### Step 7.3: Create Static Website Bucket (React Frontend)

1. **Create Bucket**
   ```
   Name: phb-frontend-[your-unique-id]
   Region: us-east-1

   Block public access: ✗ DISABLE (website needs to be public)
   Versioning: ✓ Enable
   Encryption: SSE-S3
   ```

2. **Enable Static Website Hosting**
   ```
   Click bucket name → Properties tab
   Scroll to: Static website hosting
   Click "Edit"

   Static website hosting: Enable
   Hosting type: Host a static website
   Index document: index.html
   Error document: index.html (for React Router)

   Click "Save changes"
   ```

3. **Bucket Policy** (Make Public)
   ```
   Click bucket name → Permissions tab
   Scroll to: Bucket policy
   Click "Edit"
   ```

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::phb-frontend-[your-unique-id]/*"
       }
     ]
   }
   ```

   Replace `[your-unique-id]` with your actual bucket name.

   Click "Save changes"

4. **Get Website URL**
   ```
   Properties tab → Static website hosting

   Bucket website endpoint: http://phb-frontend-[your-unique-id].s3-website-us-east-1.amazonaws.com
   ```

   Bookmark this URL!

---

### Step 7.4: Upload Files to S3

**Method 1: AWS Console (GUI)**

1. **Navigate to Bucket**
   ```
   S3 → Buckets → phb-clinical-guidelines-[your-unique-id]
   ```

2. **Upload Files**
   ```
   Click "Upload" button
   Click "Add files" or drag and drop
   Select files from computer
   Click "Upload"
   ```

3. **Create Folders**
   ```
   Click "Create folder"
   Folder name: cardiology
   Click "Create folder"

   Repeat for:
   - pediatrics
   - oncology
   - surgery
   ```

---

**Method 2: AWS CLI (Command Line)**

1. **Install AWS CLI** (on your local machine)
   ```bash
   # macOS
   brew install awscli

   # Windows
   # Download installer from: https://aws.amazon.com/cli/

   # Linux
   sudo apt install awscli
   ```

2. **Configure AWS CLI**
   ```bash
   aws configure

   AWS Access Key ID: [Enter key from IAM user created in Step 1.3]
   AWS Secret Access Key: [Enter secret key]
   Default region name: us-east-1
   Default output format: json
   ```

3. **Upload File**
   ```bash
   aws s3 cp myfile.pdf s3://phb-clinical-guidelines-[your-unique-id]/cardiology/
   ```

4. **Upload Folder**
   ```bash
   aws s3 cp myfolder/ s3://phb-clinical-guidelines-[your-unique-id]/ --recursive
   ```

5. **List Files**
   ```bash
   aws s3 ls s3://phb-clinical-guidelines-[your-unique-id]/
   ```

6. **Download File**
   ```bash
   aws s3 cp s3://phb-clinical-guidelines-[your-unique-id]/cardiology/myfile.pdf ./
   ```

---

### Step 7.5: Configure Lifecycle Rules (Cost Optimization)

**Purpose**: Automatically move old files to cheaper storage

1. **Navigate to Bucket**
   ```
   S3 → phb-clinical-guidelines-[your-unique-id] → Management tab
   ```

2. **Create Lifecycle Rule**
   ```
   Click "Create lifecycle rule"

   Lifecycle rule name: Archive-Old-Guidelines

   Rule scope:
   ✓ Apply to all objects in the bucket

   Lifecycle rule actions:
   ✓ Transition current versions of objects between storage classes
   ✓ Transition noncurrent versions of objects between storage classes

   Transition current versions:
     Days after object creation: 90
     Storage class: Glacier Flexible Retrieval

   Transition noncurrent versions:
     Days after objects become noncurrent: 30
     Storage class: Glacier Flexible Retrieval

   Click "Create rule"
   ```

**What This Does**:
- Files older than 90 days → moved to Glacier ($0.004/GB vs $0.023/GB)
- Old versions after 30 days → moved to Glacier
- Saves 83% on storage costs for old files

---

### Step 7.6: Enable Server Access Logging

**Purpose**: Track who accessed medical files (HIPAA compliance)

1. **Create Logging Bucket**
   ```
   S3 → Create bucket

   Name: phb-access-logs-[your-unique-id]
   Region: us-east-1
   Block public access: ✓ Enabled
   Versioning: Disable
   Encryption: SSE-S3
   ```

2. **Enable Logging on Medical Imaging Bucket**
   ```
   S3 → phb-medical-imaging-[your-unique-id] → Properties

   Server access logging → Edit

   Enable: Yes
   Target bucket: phb-access-logs-[your-unique-id]
   Target prefix: medical-imaging/

   Save changes
   ```

3. **View Logs**
   ```
   S3 → phb-access-logs-[your-unique-id] → medical-imaging/

   Log format:
   [Date] [Time] [IP] [User] GET medical-imaging/patient-123/xray.dcm HTTP/1.1 200
   ```

---

### Step 7.7: Connect Django Backend to S3

**Purpose**: Upload/download files from Django

1. **Install Boto3** (AWS SDK for Python)
   ```bash
   # SSH into EC2 instance
   ssh -i phb-backend-key.pem ubuntu@3.91.XX.XXX

   cd /opt/phb/phb-backend
   source venv/bin/activate

   pip install boto3 django-storages
   ```

2. **Update settings.py**
   ```python
   # settings.py

   INSTALLED_APPS = [
       ...
       'storages',
   ]

   # S3 Configuration
   AWS_STORAGE_BUCKET_NAME = 'phb-medical-imaging-[your-unique-id]'
   AWS_S3_REGION_NAME = 'us-east-1'
   AWS_S3_FILE_OVERWRITE = False
   AWS_S3_ENCRYPTION = True
   AWS_S3_OBJECT_PARAMETERS = {
       'ServerSideEncryption': 'AES256',
   }

   # Use S3 for media files
   DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
   MEDIA_URL = f'https://{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com/'
   ```

3. **Upload File from Django View**
   ```python
   # views.py
   from django.core.files.storage import default_storage

   def upload_medical_image(request):
       file = request.FILES['image']
       file_path = f'patient-{request.user.id}/xray-{date.today()}.dcm'

       # Upload to S3
       path = default_storage.save(file_path, file)
       file_url = default_storage.url(path)

       return JsonResponse({'url': file_url})
   ```

4. **Download File**
   ```python
   def get_medical_image(request, file_path):
       file = default_storage.open(file_path, 'rb')
       response = HttpResponse(file.read(), content_type='application/dicom')
       response['Content-Disposition'] = f'attachment; filename="{file_path}"'
       return response
   ```

---

## 8. RDS Database Setup

### Step 8.1: Create PostgreSQL Database

**Time**: 15 minutes
**Free Tier**: 750 hours/month of db.t2.micro, 20 GB storage

1. **Navigate to RDS**
   ```
   Services → RDS → Databases → Create database
   ```

2. **Engine Options**
   ```
   Engine type: PostgreSQL
   Edition: PostgreSQL (latest version, e.g., 15.x)
   ```

3. **Templates**
   ```
   ✓ Free tier
   ```

   **⚠️ CRITICAL**: Select "Free tier" to avoid charges

4. **Settings**
   ```
   DB instance identifier: phb-database-1

   Master username: phbadmin
   Master password: [Create strong password]
   Confirm password: [Re-enter password]
   ```

   **⚠️ SAVE THIS PASSWORD**: You'll need it to connect

5. **Instance Configuration**
   ```
   DB instance class: db.t3.micro (Free tier eligible)

   Specs:
   - 2 vCPUs
   - 1 GB RAM
   - Variable ECU
   ```

6. **Storage**
   ```
   Storage type: General Purpose SSD (gp2)
   Allocated storage: 20 GB (Free tier max)

   ✓ Enable storage autoscaling
   Maximum storage threshold: 30 GB
   ```

7. **Connectivity**
   ```
   Compute resource: Don't connect to an EC2 instance (we'll configure manually)

   VPC: PHB-VPC
   DB subnet group: Create new (automatic)
   Public access: No (security best practice)
   VPC security group: Choose existing → PHB-Database-SG
   Availability Zone: No preference
   ```

8. **Database Authentication**
   ```
   ✓ Password authentication
   ```

9. **Additional Configuration**
   ```
   Initial database name: phb_db

   Backup:
     ✓ Enable automated backups
     Backup retention period: 7 days
     Backup window: No preference

   Monitoring:
     ✓ Enable Enhanced Monitoring
     Granularity: 60 seconds (Free tier)

   Maintenance:
     ✓ Enable auto minor version upgrade

   Deletion protection:
     ✓ Enable (prevent accidental deletion)
   ```

10. **Create Database**
    - Review settings
    - Click "Create database"
    - Wait 5-10 minutes for creation

---

### Step 8.2: Get Database Endpoint

1. **Navigate to Database**
   ```
   RDS → Databases → phb-database-1
   ```

2. **Copy Endpoint**
   ```
   Endpoint: phb-database-1.xxxxxxxxx.us-east-1.rds.amazonaws.com
   Port: 5432
   ```

   **Save this!** You'll need it to connect.

---

### Step 8.3: Connect from EC2

1. **SSH into EC2**
   ```bash
   ssh -i phb-backend-key.pem ubuntu@3.91.XX.XXX
   ```

2. **Test Connection**
   ```bash
   psql -h phb-database-1.xxxxxxxxx.us-east-1.rds.amazonaws.com \
        -U phbadmin \
        -d phb_db

   # Enter password when prompted

   # You should see:
   psql (14.9, server 15.3)
   Type "help" for help.

   phb_db=>
   ```

3. **Exit PostgreSQL**
   ```
   \q
   ```

---

### Step 8.4: Update Django to Use RDS

1. **Update .env File**
   ```bash
   cd /opt/phb/phb-backend
   nano .env
   ```

   ```bash
   DB_HOST=phb-database-1.xxxxxxxxx.us-east-1.rds.amazonaws.com
   DB_PORT=5432
   DB_NAME=phb_db
   DB_USER=phbadmin
   DB_PASSWORD=your-password-here
   ```

2. **Update settings.py**
   ```python
   # settings.py
   import os
   from dotenv import load_dotenv

   load_dotenv()

   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql',
           'NAME': os.getenv('DB_NAME'),
           'USER': os.getenv('DB_USER'),
           'PASSWORD': os.getenv('DB_PASSWORD'),
           'HOST': os.getenv('DB_HOST'),
           'PORT': os.getenv('DB_PORT'),
       }
   }
   ```

3. **Run Migrations**
   ```bash
   source venv/bin/activate
   python manage.py migrate

   # Create superuser
   python manage.py createsuperuser
   ```

4. **Restart Django**
   ```bash
   sudo systemctl restart phb-backend
   ```

---

## 9. CloudWatch Monitoring

### Step 9.1: Install CloudWatch Agent on EC2

**Purpose**: Send logs and metrics to CloudWatch

1. **Download CloudWatch Agent**
   ```bash
   wget https://s3.amazonaws.com/amazoncloudwatch-agent/ubuntu/amd64/latest/amazon-cloudwatch-agent.deb

   sudo dpkg -i amazon-cloudwatch-agent.deb
   ```

2. **Create Configuration File**
   ```bash
   sudo nano /opt/aws/amazon-cloudwatch-agent/etc/config.json
   ```

   ```json
   {
     "agent": {
       "metrics_collection_interval": 60,
       "run_as_user": "cwagent"
     },
     "logs": {
       "logs_collected": {
         "files": {
           "collect_list": [
             {
               "file_path": "/var/log/nginx/access.log",
               "log_group_name": "/phb/nginx/access",
               "log_stream_name": "{instance_id}",
               "timestamp_format": "%d/%b/%Y:%H:%M:%S %z"
             },
             {
               "file_path": "/var/log/nginx/error.log",
               "log_group_name": "/phb/nginx/error",
               "log_stream_name": "{instance_id}"
             },
             {
               "file_path": "/opt/phb/phb-backend/logs/django.log",
               "log_group_name": "/phb/django/app",
               "log_stream_name": "{instance_id}"
             }
           ]
         }
       }
     },
     "metrics": {
       "namespace": "PHB/EC2",
       "metrics_collected": {
         "cpu": {
           "measurement": [
             {"name": "cpu_usage_idle", "rename": "CPU_IDLE", "unit": "Percent"}
           ],
           "totalcpu": false
         },
         "disk": {
           "measurement": [
             {"name": "used_percent", "rename": "DISK_USED", "unit": "Percent"}
           ],
           "resources": ["/"]
         },
         "mem": {
           "measurement": [
             {"name": "mem_used_percent", "rename": "MEM_USED", "unit": "Percent"}
           ]
         }
       }
     }
   }
   ```

3. **Start CloudWatch Agent**
   ```bash
   sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl \
        -a fetch-config \
        -m ec2 \
        -s \
        -c file:/opt/aws/amazon-cloudwatch-agent/etc/config.json
   ```

4. **Verify Agent Running**
   ```bash
   sudo systemctl status amazon-cloudwatch-agent
   ```

---

### Step 9.2: Create CloudWatch Dashboard

1. **Navigate to CloudWatch**
   ```
   Services → CloudWatch → Dashboards → Create dashboard
   ```

2. **Dashboard Name**
   ```
   Dashboard name: PHB-Production-Dashboard
   ```

3. **Add Widgets**

   **Widget 1: CPU Utilization**
   ```
   Widget type: Line graph
   Metrics:
     Namespace: AWS/EC2
     Metric: CPUUtilization
     Instance: PHB-Django-Backend-1

   Title: Backend CPU Usage
   Period: 5 minutes
   Statistic: Average
   ```

   **Widget 2: Database Connections**
   ```
   Widget type: Line graph
   Metrics:
     Namespace: AWS/RDS
     Metric: DatabaseConnections
     DBInstance: phb-database-1

   Title: Database Connections
   ```

   **Widget 3: S3 Requests**
   ```
   Widget type: Number
   Metrics:
     Namespace: AWS/S3
     Metric: NumberOfObjects
     BucketName: phb-medical-imaging-*

   Title: Files in S3
   ```

4. **Save Dashboard**

---

### Step 9.3: Create Alarms

**Alarm 1: High CPU**

1. **Create Alarm**
   ```
   CloudWatch → Alarms → Create alarm

   Select metric → EC2 → Per-Instance Metrics
   Instance: PHB-Django-Backend-1
   Metric: CPUUtilization
   ```

2. **Conditions**
   ```
   Threshold type: Static
   Whenever CPUUtilization is: Greater than 80

   Additional configuration:
     Datapoints to alarm: 2 out of 2
     Missing data: Treat as breaching
   ```

3. **Notification**
   ```
   SNS topic: PHB-Billing-Alerts (created earlier)

   Or create new:
   Topic name: PHB-Ops-Alerts
   Email: your-email@example.com
   ```

4. **Name**
   ```
   Alarm name: PHB-Backend-High-CPU
   Description: Backend server CPU above 80%
   ```

---

**Alarm 2: Database Storage**

```
Metric: AWS/RDS → FreeStorageSpace
Instance: phb-database-1
Condition: Less than 2 GB (2000000000 bytes)
```

---

**Alarm 3: Too Many 500 Errors**

```
Metric: Custom metric from Django logs
Namespace: PHB/Django
Metric: HTTP500Count
Condition: Greater than 10
```

---

## 10. CloudFront CDN Setup

### Step 10.1: Create CloudFront Distribution

**Purpose**: Serve React frontend faster globally

**Time**: 15 minutes
**Free Tier**: 50 GB data transfer, 2M HTTP requests

1. **Navigate to CloudFront**
   ```
   Services → CloudFront → Distributions → Create distribution
   ```

2. **Origin Settings**
   ```
   Origin domain: phb-frontend-[your-unique-id].s3.us-east-1.amazonaws.com
   Name: S3-PHB-Frontend

   Origin access: Public (S3 bucket already public)
   ```

3. **Default Cache Behavior**
   ```
   Viewer protocol policy: Redirect HTTP to HTTPS
   Allowed HTTP methods: GET, HEAD, OPTIONS

   Cache policy: CachingOptimized
   ```

4. **Settings**
   ```
   Price class: Use all edge locations (best performance)

   Alternate domain names (CNAMEs): app.phbhospital.com

   SSL certificate: Request certificate (ACM) - we'll do this next

   Default root object: index.html
   ```

5. **Create Distribution**
   - Wait 15-20 minutes for deployment
   - Status will change from "In Progress" to "Deployed"

6. **Get CloudFront URL**
   ```
   Distribution domain name: d123abc.cloudfront.net
   ```

   Test: https://d123abc.cloudfront.net

---

### Step 10.2: Configure Custom Error Pages

**Purpose**: Handle React Router (SPA) redirects

1. **Edit Distribution**
   ```
   CloudFront → Distributions → Your distribution → Error pages tab
   ```

2. **Create Custom Error Response**
   ```
   Click "Create custom error response"

   HTTP error code: 403
   Customize error response: Yes
   Response page path: /index.html
   HTTP response code: 200

   Create
   ```

3. **Repeat for 404**
   ```
   HTTP error code: 404
   Response page path: /index.html
   HTTP response code: 200
   ```

**Why?** React Router handles all routes. When user visits `/account/appointments`, CloudFront doesn't find that file (404), so we serve index.html which loads React Router.

---

## 11. Route 53 (DNS)

### Step 11.1: Register Domain (Optional)

**Cost**: $12-15/year for .com domain

1. **Navigate to Route 53**
   ```
   Services → Route 53 → Registered domains → Register domain
   ```

2. **Search Domain**
   ```
   Domain name: phbhospital.com
   Click "Check"

   If available: Add to cart ($12/year)
   If taken: Try alternatives (phb-hospital.com, phbhealth.com, etc.)
   ```

3. **Contact Information**
   - Enter your details
   - Privacy protection: Enabled (hides your info from WHOIS)

4. **Complete Purchase**
   - Review and pay
   - Wait 10-30 minutes for registration

**Alternative**: Use existing domain from Namecheap, GoDaddy, etc.

---

### Step 11.2: Create Hosted Zone

1. **Navigate to Hosted Zones**
   ```
   Route 53 → Hosted zones → Create hosted zone
   ```

2. **Hosted Zone Settings**
   ```
   Domain name: phbhospital.com
   Type: Public hosted zone
   ```

3. **Create**
   - You'll see NS (nameserver) records
   - Copy nameservers (4 lines):
   ```
   ns-123.awsdns-12.com
   ns-456.awsdns-45.net
   ns-789.awsdns-78.org
   ns-012.awsdns-01.co.uk
   ```

---

### Step 11.3: Point Domain to CloudFront

1. **Create Record**
   ```
   Hosted zone → Create record

   Record name: app (full domain: app.phbhospital.com)
   Record type: A - Routes traffic to IPv4 address

   Value:
     ✓ Alias to CloudFront distribution
     Select distribution: d123abc.cloudfront.net

   Routing policy: Simple routing

   Create record
   ```

2. **Create Apex Record** (optional, for root domain)
   ```
   Record name: [blank] (phbhospital.com)
   Record type: A
   Alias to: CloudFront distribution
   ```

3. **Test**
   ```
   Wait 5-10 minutes for DNS propagation
   Visit: https://app.phbhospital.com
   ```

---

## 12. SSL Certificates (AWS Certificate Manager)

### Step 12.1: Request Certificate

**Time**: 10 minutes (+ 5-30 min validation)
**Cost**: FREE

1. **Navigate to ACM**
   ```
   Services → Certificate Manager → Request certificate
   ```

   **⚠️ IMPORTANT**: Must be in us-east-1 region for CloudFront

2. **Certificate Type**
   ```
   ✓ Request a public certificate
   ```

3. **Domain Names**
   ```
   Fully qualified domain name: app.phbhospital.com

   Click "Add another name to this certificate"
   Domain name: phbhospital.com

   Click "Add another name"
   Domain name: *.phbhospital.com (wildcard for all subdomains)
   ```

4. **Validation Method**
   ```
   ✓ DNS validation (recommended)
   ```

5. **Request Certificate**

---

### Step 12.2: Validate Certificate

1. **View Certificate**
   ```
   ACM → Certificates → [Your certificate]

   Status: Pending validation
   ```

2. **Create DNS Records**
   ```
   For each domain, you'll see:

   CNAME name: _abc123.app.phbhospital.com
   CNAME value: _xyz789.acm-validations.aws

   Click "Create records in Route 53" button
   ```

3. **Wait for Validation**
   - Usually 5-10 minutes
   - Can take up to 30 minutes
   - Status will change to "Issued"

---

### Step 12.3: Add Certificate to CloudFront

1. **Edit CloudFront Distribution**
   ```
   CloudFront → Distributions → Your distribution → Edit
   ```

2. **SSL Certificate**
   ```
   Custom SSL certificate: Select your certificate
   ```

3. **Save Changes**
   - Wait 5-10 minutes for deployment

4. **Test HTTPS**
   ```
   Visit: https://app.phbhospital.com
   Click padlock icon → Should show "Secure"
   ```

---

## Summary & Next Steps

### What You've Accomplished

✅ **Foundation**
- Created AWS account with MFA
- Set up IAM users and groups
- Configured billing alerts
- Understanding of Free Tier limits

✅ **Infrastructure**
- VPC with public/private subnets
- Security groups for web, database, cache
- EC2 instance running Django
- S3 buckets for medical imaging, guidelines, frontend
- RDS PostgreSQL database

✅ **Monitoring**
- CloudWatch agent installed
- Custom dashboard
- Alarms for CPU, disk, errors

✅ **Content Delivery**
- CloudFront CDN
- Custom domain with Route 53
- SSL certificate

**Estimated Monthly Cost**:
- **Months 1-12**: $0 (Free Tier)
- **Month 13+**: ~$35-50/month (single server setup)

---

### Remaining Steps (Part 4-6)

The guide continues with:

**Part 4: Advanced Services**
- API Gateway setup
- DynamoDB for sessions
- ElastiCache (Redis)
- SNS/SQS messaging

**Part 5: Deployment Automation**
- Auto Scaling Groups
- Load Balancers
- CI/CD Pipeline
- Backups

**Part 6: PHB-Specific Deployment**
- Complete Django deployment
- Node.js backend
- React frontend build
- Production checklist

---

### Quick Reference: Common Commands

**SSH into EC2**:
```bash
ssh -i phb-backend-key.pem ubuntu@YOUR-IP
```

**Restart Django**:
```bash
sudo systemctl restart phb-backend
```

**View Django Logs**:
```bash
sudo journalctl -u phb-backend -f
```

**Upload to S3**:
```bash
aws s3 cp file.pdf s3://bucket-name/
```

**Database Backup**:
```bash
pg_dump -h RDS-ENDPOINT -U phbadmin phb_db > backup.sql
```

---

### Getting Help

**AWS Support**:
- Basic (Free): Documentation, forums
- Developer ($29/month): Email support, 12-hour response
- Business ($100/month): Phone support, 1-hour response

**Documentation**:
- EC2: https://docs.aws.amazon.com/ec2/
- S3: https://docs.aws.amazon.com/s3/
- RDS: https://docs.aws.amazon.com/rds/

**Community**:
- AWS Forums: https://forums.aws.amazon.com/
- Stack Overflow: Tag `amazon-web-services`
- Reddit: r/aws

---

---

## Part 4: Advanced Services (Week 17-24)

---

## 13. API Gateway Setup

### Understanding API Gateway

**API Gateway** = Entry point for all API requests

```
Client (Mobile/Web)
    ↓
API Gateway (authentication, rate limiting, caching)
    ↓
Backend Services (Django, Node.js, Lambda)
```

**Benefits**:
- Centralized authentication
- Rate limiting (prevent abuse)
- Request/response transformation
- API versioning
- Monitoring and logging

---

### Step 13.1: Create REST API

**Time**: 20 minutes
**Free Tier**: 1 million API calls/month for 12 months

1. **Navigate to API Gateway**
   ```
   Services → API Gateway → Create API
   ```

2. **API Type**
   ```
   ✓ REST API
   Build: Build

   API name: PHB-Backend-API
   Description: API Gateway for PHB Hospital System
   Endpoint Type: Regional
   ```

3. **Create Resource**
   ```
   Actions → Create Resource

   Resource Name: appointments
   Resource Path: /appointments
   ✓ Enable API Gateway CORS

   Create Resource
   ```

4. **Create Method**
   ```
   Select /appointments → Actions → Create Method

   Method: GET

   Integration type: HTTP
   HTTP method: GET
   Endpoint URL: http://YOUR-EC2-IP:8000/api/appointments/

   Save
   ```

5. **Test API**
   ```
   Click "TEST" button

   Query Strings: [leave blank]
   Headers: [leave blank]

   Click "Test"

   Should see: Response from Django backend
   ```

6. **Deploy API**
   ```
   Actions → Deploy API

   Deployment stage: [New Stage]
   Stage name: prod
   Stage description: Production

   Deploy
   ```

7. **Get Invoke URL**
   ```
   Stages → prod

   Invoke URL: https://abc123xyz.execute-api.us-east-1.amazonaws.com/prod

   Test: https://abc123xyz.execute-api.us-east-1.amazonaws.com/prod/appointments
   ```

---

### Step 13.2: Add Authentication

**Purpose**: Protect API with API keys

1. **Create API Key**
   ```
   API Gateway → API Keys → Create API Key

   Name: PHB-Frontend-Key
   Auto Generate

   Save
   ```

2. **Create Usage Plan**
   ```
   Usage Plans → Create

   Name: PHB-Standard-Plan

   Throttling:
     Rate: 1000 requests/second
     Burst: 2000 requests

   Quota:
     1,000,000 requests per month

   Associated API Stages:
     API: PHB-Backend-API
     Stage: prod

   Create
   ```

3. **Add API Key to Usage Plan**
   ```
   Usage Plan → API Keys tab → Add API Key to Usage Plan

   Select: PHB-Frontend-Key
   Add
   ```

4. **Require API Key on Method**
   ```
   API Gateway → PHB-Backend-API → Resources

   Select: GET /appointments
   Method Request → Settings

   API Key Required: true

   Actions → Deploy API → prod
   ```

5. **Test with API Key**
   ```bash
   curl -H "x-api-key: YOUR-API-KEY" \
        https://abc123xyz.execute-api.us-east-1.amazonaws.com/prod/appointments
   ```

---

### Step 13.3: Enable Caching

**Purpose**: Reduce backend load, faster responses

1. **Enable Cache**
   ```
   API Gateway → Stages → prod

   Settings tab

   ✓ Enable API cache
   Cache capacity: 0.5 GB ($0.020/hour = $14.40/month)
   Cache TTL: 300 seconds (5 minutes)

   Save Changes
   ```

2. **Configure Method Caching**
   ```
   prod stage → /appointments → GET

   Override for this method:
     ✓ Enable method cache
     Cache Time-to-Live (TTL): 300

   Save Changes
   ```

**Cost Savings**:
- 1000 req/sec without cache = $3.50/million requests
- With cache (80% hit rate) = $0.70/million requests
- **Savings**: $2.80 per million requests

---

## 14. DynamoDB Setup

### Understanding DynamoDB

**DynamoDB** = NoSQL database (key-value, document)

**Best for PHB**:
- Session storage (fast reads/writes)
- Pregnancy tracking data
- User search history
- Notification preferences
- Real-time appointment availability

**Why Not PostgreSQL?**
- PostgreSQL: Structured data, complex queries
- DynamoDB: Fast access, scalable, serverless

---

### Step 14.1: Create Table

**Time**: 10 minutes
**Free Tier**: 25 GB storage, 25 read/write capacity units

1. **Navigate to DynamoDB**
   ```
   Services → DynamoDB → Tables → Create table
   ```

2. **Table Settings**
   ```
   Table name: phb-sessions

   Partition key: session_id (String)
   Sort key: - [None]

   Table settings:
     ✓ Default settings

   Table class: Standard
   ```

3. **Read/Write Capacity**
   ```
   Capacity mode: Provisioned (Free Tier)

   Read capacity:
     Auto scaling: Off
     Provisioned capacity units: 5 (FREE TIER)

   Write capacity:
     Auto scaling: Off
     Provisioned capacity units: 5 (FREE TIER)
   ```

4. **Create Table**
   - Review settings
   - Click "Create table"
   - Wait 1-2 minutes

---

### Step 14.2: Create Additional Tables

**Table 2: Pregnancy Tracking**
```
Table name: phb-pregnancy-tracking
Partition key: user_id (String)
Sort key: timestamp (Number)

Capacity: 5 read, 5 write (FREE TIER)
```

**Table 3: Search History**
```
Table name: phb-search-history
Partition key: user_id (String)
Sort key: search_timestamp (Number)

Capacity: 5 read, 5 write (FREE TIER)
```

**Table 4: Notification Preferences**
```
Table name: phb-notification-prefs
Partition key: user_id (String)

Capacity: 5 read, 5 write (FREE TIER)
```

---

### Step 14.3: Add Sample Data

1. **Navigate to Table**
   ```
   DynamoDB → Tables → phb-sessions → Explore table items
   ```

2. **Create Item**
   ```
   Click "Create item"

   session_id: sess_abc123xyz (String)

   Add new attribute → String
   Attribute name: user_id
   Value: user_12345

   Add new attribute → Number
   Attribute name: created_at
   Value: 1730332800 (Unix timestamp)

   Add new attribute → Number
   Attribute name: expires_at
   Value: 1730419200

   Add new attribute → Map (JSON)
   Attribute name: data
   Value: {"authenticated": true, "role": "patient"}

   Create item
   ```

---

### Step 14.4: Connect Django to DynamoDB

**Purpose**: Use DynamoDB for session storage instead of database

1. **Install Boto3**
   ```bash
   # SSH into EC2
   ssh -i phb-backend-key.pem ubuntu@YOUR-IP

   cd /opt/phb/phb-backend
   source venv/bin/activate

   pip install boto3
   ```

2. **Create DynamoDB Helper**
   ```python
   # utils/dynamodb.py
   import boto3
   from datetime import datetime, timedelta

   dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
   sessions_table = dynamodb.Table('phb-sessions')

   def create_session(session_id, user_id, data):
       """Create new session in DynamoDB"""
       expires_at = int((datetime.now() + timedelta(hours=24)).timestamp())

       sessions_table.put_item(
           Item={
               'session_id': session_id,
               'user_id': str(user_id),
               'created_at': int(datetime.now().timestamp()),
               'expires_at': expires_at,
               'data': data
           }
       )

   def get_session(session_id):
       """Get session from DynamoDB"""
       response = sessions_table.get_item(
           Key={'session_id': session_id}
       )
       return response.get('Item')

   def delete_session(session_id):
       """Delete session"""
       sessions_table.delete_item(
           Key={'session_id': session_id}
       )
   ```

3. **Use in Views**
   ```python
   # views/auth.py
   from utils.dynamodb import create_session, get_session

   def login(request):
       # ... authenticate user ...

       session_id = f"sess_{uuid.uuid4().hex}"
       create_session(
           session_id=session_id,
           user_id=user.id,
           data={'authenticated': True, 'role': 'patient'}
       )

       response = JsonResponse({'success': True})
       response.set_cookie('session_id', session_id, httponly=True)
       return response
   ```

---

### Step 14.5: Enable TTL (Auto-Delete Expired Sessions)

**Purpose**: Automatically delete expired sessions (save storage costs)

1. **Enable TTL**
   ```
   DynamoDB → Tables → phb-sessions → Additional settings

   Time to Live (TTL) → Manage TTL

   TTL attribute: expires_at

   Enable TTL
   ```

**How it works**:
- DynamoDB checks `expires_at` attribute
- When `expires_at` < current Unix timestamp, item is deleted
- Deletion happens within 48 hours (eventual consistency)
- No extra cost

---

## 15. ElastiCache (Redis) Setup

### Understanding ElastiCache

**ElastiCache** = Managed Redis/Memcached

**Redis Use Cases for PHB**:
- Session caching (instead of DynamoDB for hot sessions)
- API response caching
- Rate limiting counters
- Real-time appointment availability
- Queue for async tasks

**Redis vs DynamoDB**:
- Redis: In-memory, microsecond latency, temporary data
- DynamoDB: Persistent, millisecond latency, permanent data

---

### Step 15.1: Create Redis Cluster

**Time**: 15 minutes
**Cost**: t3.micro not in free tier (~$12/month)

**⚠️ NOTE**: Skip this step if staying within free tier. Use DynamoDB for caching instead.

1. **Navigate to ElastiCache**
   ```
   Services → ElastiCache → Redis clusters → Create
   ```

2. **Cluster Settings**
   ```
   Cluster mode: Disabled (simpler, cheaper)

   Name: phb-redis-cache
   Description: Session and API cache for PHB

   Engine version: 7.0 (latest)
   Port: 6379 (default)
   Parameter group: default.redis7
   Node type: cache.t3.micro
   Number of replicas: 0 (to save cost)
   ```

3. **Subnet Settings**
   ```
   Subnet group: Create new

   Name: phb-redis-subnet-group
   VPC: PHB-VPC
   Subnets: Select private subnets (10.0.3.0/24, 10.0.4.0/24)
   ```

4. **Security**
   ```
   Security groups: PHB-Cache-SG (created in Step 5.2)

   Encryption at rest: Enabled
   Encryption in transit: Enabled

   Auth token: [Generate strong password]
   ```

5. **Backup**
   ```
   Enable automatic backups: Yes
   Backup retention period: 1 day
   Backup window: No preference
   ```

6. **Create**
   - Review settings
   - Click "Create"
   - Wait 10-15 minutes

---

### Step 15.2: Get Redis Endpoint

1. **Navigate to Cluster**
   ```
   ElastiCache → Redis clusters → phb-redis-cache
   ```

2. **Copy Endpoint**
   ```
   Primary endpoint: phb-redis-cache.abc123.0001.use1.cache.amazonaws.com:6379
   ```

---

### Step 15.3: Connect Django to Redis

1. **Install Redis Client**
   ```bash
   # SSH into EC2
   ssh -i phb-backend-key.pem ubuntu@YOUR-IP

   cd /opt/phb/phb-backend
   source venv/bin/activate

   pip install redis django-redis
   ```

2. **Configure settings.py**
   ```python
   # settings.py

   CACHES = {
       'default': {
           'BACKEND': 'django_redis.cache.RedisCache',
           'LOCATION': 'rediss://phb-redis-cache.abc123.0001.use1.cache.amazonaws.com:6379/0',
           'OPTIONS': {
               'CLIENT_CLASS': 'django_redis.client.DefaultClient',
               'PASSWORD': 'your-auth-token-here',
               'SSL': True,
           }
       }
   }

   # Use Redis for sessions
   SESSION_ENGINE = 'django.contrib.sessions.backends.cache'
   SESSION_CACHE_ALIAS = 'default'
   ```

3. **Test Redis Connection**
   ```python
   # Django shell
   python manage.py shell

   >>> from django.core.cache import cache
   >>> cache.set('test_key', 'Hello Redis!', 60)
   >>> cache.get('test_key')
   'Hello Redis!'
   ```

4. **Use in Views (API Response Caching)**
   ```python
   from django.core.cache import cache
   from django.views.decorators.cache import cache_page

   @cache_page(60 * 5)  # Cache for 5 minutes
   def get_appointments(request):
       # This response will be cached
       appointments = Appointment.objects.filter(...)
       return JsonResponse({'appointments': list(appointments.values())})
   ```

---

## 16. SNS & SQS (Messaging)

### Understanding SNS and SQS

**SNS (Simple Notification Service)** = Pub/Sub messaging
- One message → Many subscribers
- Email, SMS, HTTP endpoints, Lambda

**SQS (Simple Queue Service)** = Message queue
- Decouple services
- Async processing
- Retry logic

```
Payment Service
    ↓ (publishes)
SNS Topic: payment-completed
    ↓ (fanout to subscribers)
    ├→ SQS Queue: send-receipt
    ├→ SQS Queue: update-appointment
    └→ Email Notification
```

**Use Cases for PHB**:
- Appointment confirmations
- Payment receipts
- Prescription notifications
- Lab result alerts
- System health alerts

---

### Step 16.1: Create SNS Topic

**Time**: 10 minutes
**Free Tier**: 1 million publishes, 100K HTTP deliveries, 1K emails

1. **Navigate to SNS**
   ```
   Services → SNS → Topics → Create topic
   ```

2. **Topic Settings**
   ```
   Type: Standard

   Name: phb-appointment-notifications
   Display name: PHB Appointments
   ```

3. **Access Policy** (default is fine)
   ```
   Leave default: Only topic owner can publish
   ```

4. **Create Topic**

---

### Step 16.2: Create Email Subscription

1. **Create Subscription**
   ```
   SNS → Topics → phb-appointment-notifications → Create subscription

   Protocol: Email
   Endpoint: your-email@example.com

   Create subscription
   ```

2. **Confirm Subscription**
   - Check email inbox
   - Click "Confirm subscription" link
   - Status changes to "Confirmed"

---

### Step 16.3: Create SQS Queue

**Purpose**: Process appointment notifications asynchronously

1. **Navigate to SQS**
   ```
   Services → SQS → Create queue
   ```

2. **Queue Settings**
   ```
   Type: Standard (cheaper, faster)

   Name: phb-send-notifications
   ```

3. **Configuration**
   ```
   Visibility timeout: 30 seconds
   Message retention period: 4 days
   Delivery delay: 0 seconds
   Maximum message size: 256 KB
   Receive message wait time: 0 seconds (short polling)
   ```

4. **Access Policy**
   ```
   Leave default
   ```

5. **Create Queue**

---

### Step 16.4: Subscribe Queue to SNS Topic

**Purpose**: When SNS publishes, SQS receives message

1. **Subscribe Queue**
   ```
   SQS → Queues → phb-send-notifications → Subscribe to Amazon SNS topic

   SNS topic ARN: arn:aws:sns:us-east-1:123456789012:phb-appointment-notifications

   Save
   ```

---

### Step 16.5: Publish Message from Django

1. **Install Boto3** (already done)

2. **Create SNS Helper**
   ```python
   # utils/notifications.py
   import boto3
   import json

   sns = boto3.client('sns', region_name='us-east-1')
   SNS_TOPIC_ARN = 'arn:aws:sns:us-east-1:123456789012:phb-appointment-notifications'

   def send_appointment_notification(appointment):
       """Publish appointment notification to SNS"""
       message = {
           'appointment_id': appointment.id,
           'patient_name': appointment.patient.full_name,
           'patient_email': appointment.patient.email,
           'doctor_name': appointment.doctor.full_name,
           'appointment_time': appointment.datetime.isoformat(),
           'type': 'appointment_confirmed'
       }

       response = sns.publish(
           TopicArn=SNS_TOPIC_ARN,
           Message=json.dumps(message),
           Subject='PHB Appointment Confirmation',
           MessageAttributes={
               'appointment_id': {
                   'DataType': 'String',
                   'StringValue': str(appointment.id)
               }
           }
       )

       return response['MessageId']
   ```

3. **Use in Views**
   ```python
   from utils.notifications import send_appointment_notification

   def create_appointment(request):
       # ... create appointment ...

       # Send notification asynchronously
       message_id = send_appointment_notification(appointment)

       return JsonResponse({
           'success': True,
           'appointment_id': appointment.id,
           'notification_id': message_id
       })
   ```

---

### Step 16.6: Process SQS Messages

**Purpose**: Worker that reads queue and sends emails

1. **Create Worker Script**
   ```python
   # workers/notification_worker.py
   import boto3
   import json
   import time
   from django.core.mail import send_mail

   sqs = boto3.client('sqs', region_name='us-east-1')
   QUEUE_URL = 'https://sqs.us-east-1.amazonaws.com/123456789012/phb-send-notifications'

   def process_messages():
       """Poll SQS and process messages"""
       while True:
           # Receive messages (long polling)
           response = sqs.receive_message(
               QueueUrl=QUEUE_URL,
               MaxNumberOfMessages=10,
               WaitTimeSeconds=20  # Long polling
           )

           messages = response.get('Messages', [])

           for message in messages:
               try:
                   # Parse SNS message
                   body = json.loads(message['Body'])
                   sns_message = json.loads(body['Message'])

                   # Extract appointment data
                   patient_email = sns_message['patient_email']
                   patient_name = sns_message['patient_name']
                   appointment_time = sns_message['appointment_time']

                   # Send email
                   send_mail(
                       subject='Appointment Confirmed - PHB Hospital',
                       message=f'Dear {patient_name},\n\nYour appointment is confirmed for {appointment_time}.',
                       from_email='noreply@phbhospital.com',
                       recipient_list=[patient_email],
                   )

                   # Delete message from queue
                   sqs.delete_message(
                       QueueUrl=QUEUE_URL,
                       ReceiptHandle=message['ReceiptHandle']
                   )

                   print(f"Sent notification to {patient_email}")

               except Exception as e:
                   print(f"Error processing message: {e}")

           time.sleep(1)

   if __name__ == '__main__':
       print("Starting notification worker...")
       process_messages()
   ```

2. **Run Worker as Service**
   ```bash
   sudo nano /etc/systemd/system/phb-notification-worker.service
   ```

   ```ini
   [Unit]
   Description=PHB Notification Worker
   After=network.target

   [Service]
   User=ubuntu
   WorkingDirectory=/opt/phb/phb-backend
   Environment="PATH=/opt/phb/phb-backend/venv/bin"
   ExecStart=/opt/phb/phb-backend/venv/bin/python workers/notification_worker.py
   Restart=always

   [Install]
   WantedBy=multi-user.target
   ```

   ```bash
   sudo systemctl start phb-notification-worker
   sudo systemctl enable phb-notification-worker
   sudo systemctl status phb-notification-worker
   ```

---

## Part 5: Deployment Automation (Week 25-32)

---

## 17. Auto Scaling Groups

### Understanding Auto Scaling

**Auto Scaling** = Automatically add/remove servers based on demand

```
Normal Traffic (100 users)     Peak Traffic (1000 users)
    1 EC2 instance        →→→     5 EC2 instances
    Cost: $8.50/month             Cost: $8.50/month (still 750 hours free!)
```

**Benefits**:
- Handle traffic spikes (appointments open at 8am)
- Save money (scale down at night)
- High availability (if one server fails, launch new one)

---

### Step 17.1: Create Launch Template

**Time**: 20 minutes

1. **Navigate to EC2**
   ```
   EC2 → Launch Templates → Create launch template
   ```

2. **Template Settings**
   ```
   Launch template name: PHB-Backend-Template
   Description: Template for PHB Django backend servers
   ```

3. **AMI** (Create from Existing Instance)
   ```
   Option 1: Create AMI from current instance

   EC2 → Instances → PHB-Django-Backend-1
   Actions → Image and templates → Create image

   Image name: PHB-Django-Configured
   Description: Django backend with all dependencies

   Create image (wait 5-10 minutes)

   Then select this AMI in launch template
   ```

   ```
   Option 2: Use base Ubuntu and user data

   AMI: Ubuntu Server 22.04 LTS
   ```

4. **Instance Type**
   ```
   Instance type: t2.micro (Free Tier)
   ```

5. **Key Pair**
   ```
   Key pair name: phb-backend-key
   ```

6. **Network Settings**
   ```
   VPC: PHB-VPC
   Security groups: PHB-Web-Server-SG
   ```

7. **Storage**
   ```
   Volume: 30 GB gp3
   ```

8. **IAM Instance Profile**
   ```
   IAM instance profile: PHB-EC2-Backend-Role
   ```

9. **User Data** (if not using AMI)
   ```bash
   #!/bin/bash
   cd /opt/phb/phb-backend
   git pull origin main
   source venv/bin/activate
   pip install -r requirements.txt
   python manage.py migrate
   sudo systemctl restart phb-backend
   ```

10. **Create Template**

---

### Step 17.2: Create Auto Scaling Group

1. **Navigate to Auto Scaling**
   ```
   EC2 → Auto Scaling Groups → Create Auto Scaling group
   ```

2. **Choose Launch Template**
   ```
   Auto Scaling group name: PHB-Backend-ASG
   Launch template: PHB-Backend-Template
   ```

3. **Network**
   ```
   VPC: PHB-VPC
   Availability Zones and subnets:
     ✓ us-east-1a | Public Subnet 1
     ✓ us-east-1b | Public Subnet 2
   ```

4. **Load Balancing** (we'll create in Step 18)
   ```
   Skip for now
   ```

5. **Group Size**
   ```
   Desired capacity: 1
   Minimum capacity: 1
   Maximum capacity: 3
   ```

6. **Scaling Policies**
   ```
   Target tracking scaling policy

   Metric type: Average CPU utilization
   Target value: 70%

   What this means:
   - If CPU > 70% for 5 minutes → launch new instance
   - If CPU < 70% for 15 minutes → terminate instance
   ```

7. **Notifications** (optional)
   ```
   SNS Topic: PHB-Ops-Alerts
   Events:
     ✓ Launch
     ✓ Terminate
     ✓ Fail to launch
     ✓ Fail to terminate
   ```

8. **Create Auto Scaling Group**

---

### Step 17.3: Test Auto Scaling

1. **Generate Load**
   ```bash
   # Install Apache Bench
   sudo apt install apache2-utils

   # 10,000 requests, 100 concurrent
   ab -n 10000 -c 100 http://YOUR-EC2-IP/api/appointments/
   ```

2. **Watch CloudWatch**
   ```
   CloudWatch → Dashboards → PHB-Production-Dashboard

   Watch CPU rise above 70%
   ```

3. **See New Instance Launch**
   ```
   EC2 → Auto Scaling Groups → PHB-Backend-ASG → Activity

   Should see:
   "Launching a new EC2 instance: i-0abc123def456..."
   ```

---

## 18. Load Balancer Configuration

### Understanding Load Balancers

**Load Balancer** = Distributes traffic across multiple servers

```
User Request
    ↓
Load Balancer
    ├→ Server 1 (handling 200 requests)
    ├→ Server 2 (handling 180 requests)
    └→ Server 3 (handling 220 requests)
```

**Benefits**:
- Even traffic distribution
- Health checks (remove unhealthy servers)
- SSL termination (handle HTTPS)
- Single entry point

---

### Step 18.1: Create Application Load Balancer

**Time**: 15 minutes
**Cost**: $16/month (not in free tier)

1. **Navigate to Load Balancers**
   ```
   EC2 → Load Balancers → Create load balancer
   ```

2. **Load Balancer Type**
   ```
   ✓ Application Load Balancer

   Name: PHB-Backend-ALB
   Scheme: Internet-facing
   IP address type: IPv4
   ```

3. **Network Mapping**
   ```
   VPC: PHB-VPC

   Availability Zones:
     ✓ us-east-1a | Public Subnet 1
     ✓ us-east-1b | Public Subnet 2
   ```

4. **Security Groups**
   ```
   Security group: PHB-Web-Server-SG
   ```

5. **Listeners and Routing**
   ```
   Listener: HTTP:80

   Default action: Forward to target group
   Target group: Create new
   ```

6. **Create Target Group**
   ```
   Target type: Instances
   Target group name: PHB-Backend-Targets
   Protocol: HTTP
   Port: 80
   VPC: PHB-VPC

   Health check:
     Protocol: HTTP
     Path: /api/health/
     Healthy threshold: 2
     Unhealthy threshold: 3
     Timeout: 5 seconds
     Interval: 30 seconds

   Create
   ```

7. **Create Load Balancer**
   - Review settings
   - Click "Create"
   - Wait 3-5 minutes

8. **Get DNS Name**
   ```
   Load Balancers → PHB-Backend-ALB

   DNS name: PHB-Backend-ALB-1234567890.us-east-1.elb.amazonaws.com

   Test: http://PHB-Backend-ALB-1234567890.us-east-1.elb.amazonaws.com/api/health/
   ```

---

### Step 18.2: Attach Auto Scaling Group to Load Balancer

1. **Edit Auto Scaling Group**
   ```
   Auto Scaling Groups → PHB-Backend-ASG → Edit
   ```

2. **Load Balancing**
   ```
   Load balancing: Application Load Balancer or Network Load Balancer

   Target groups: PHB-Backend-Targets

   Health check type: ELB
   Health check grace period: 300 seconds
   ```

3. **Save**

Now when Auto Scaling launches new instances, they're automatically added to load balancer!

---

### Step 18.3: Add HTTPS Listener

1. **Request SSL Certificate** (already done in Step 12)

2. **Add Listener**
   ```
   Load Balancers → PHB-Backend-ALB → Listeners → Add listener

   Protocol: HTTPS
   Port: 443

   Default action: Forward to PHB-Backend-Targets

   Default SSL certificate: Select your ACM certificate

   Add
   ```

3. **Redirect HTTP to HTTPS**
   ```
   Listeners → HTTP:80 → Edit

   Default action: Redirect to HTTPS:443
   ```

---

## 19. CI/CD Pipeline

### Understanding CI/CD

**CI/CD** = Automated deployment pipeline

```
1. Push code to GitHub
        ↓
2. GitHub webhook triggers AWS CodePipeline
        ↓
3. CodeBuild runs tests
        ↓
4. If tests pass, deploy to EC2
        ↓
5. Auto Scaling launches instances with new code
```

**Benefits**:
- No manual SSH deployments
- Automatic testing
- Rollback if deployment fails
- Deployment history

---

### Step 19.1: Set Up GitHub Repository

1. **Create Repo**
   ```
   Go to github.com
   New repository

   Name: phb-backend
   Private

   Create repository
   ```

2. **Push Code**
   ```bash
   cd /opt/phb/phb-backend

   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/phb-backend.git
   git push -u origin main
   ```

---

### Step 19.2: Create CodeBuild Project

**Purpose**: Build and test code

1. **Navigate to CodeBuild**
   ```
   Services → CodeBuild → Create project
   ```

2. **Project Configuration**
   ```
   Project name: PHB-Backend-Build
   ```

3. **Source**
   ```
   Source provider: GitHub

   Connect to GitHub (OAuth)

   Repository: yourusername/phb-backend
   Branch: main
   ```

4. **Environment**
   ```
   Environment image: Managed image
   Operating system: Ubuntu
   Runtime: Standard
   Image: aws/codebuild/standard:7.0

   Service role: New service role
   Role name: codebuild-phb-backend-service-role
   ```

5. **Buildspec**
   ```
   Build specifications: Use a buildspec file
   Buildspec name: buildspec.yml
   ```

6. **Create Project**

---

### Step 19.3: Create buildspec.yml

```bash
# In your GitHub repo
nano buildspec.yml
```

```yaml
version: 0.2

phases:
  install:
    runtime-versions:
      python: 3.10
    commands:
      - echo "Installing dependencies..."
      - pip install -r requirements.txt

  pre_build:
    commands:
      - echo "Running tests..."
      - python manage.py test
      - echo "Checking for migrations..."
      - python manage.py makemigrations --check --dry-run

  build:
    commands:
      - echo "Collecting static files..."
      - python manage.py collectstatic --noinput

  post_build:
    commands:
      - echo "Build completed on `date`"

artifacts:
  files:
    - '**/*'
```

```bash
git add buildspec.yml
git commit -m "Add buildspec for CodeBuild"
git push
```

---

### Step 19.4: Create CodeDeploy Application

**Purpose**: Deploy code to EC2 instances

1. **Install CodeDeploy Agent on EC2**
   ```bash
   # SSH into EC2
   ssh -i phb-backend-key.pem ubuntu@YOUR-IP

   sudo apt update
   sudo apt install -y ruby-full wget

   cd /tmp
   wget https://aws-codedeploy-us-east-1.s3.us-east-1.amazonaws.com/latest/install
   chmod +x ./install
   sudo ./install auto

   sudo service codedeploy-agent status
   # Should see: active (running)
   ```

2. **Create CodeDeploy Application**
   ```
   Services → CodeDeploy → Applications → Create application

   Application name: PHB-Backend-App
   Compute platform: EC2/On-premises

   Create application
   ```

3. **Create Deployment Group**
   ```
   Create deployment group

   Deployment group name: PHB-Backend-Production
   Service role: Create new (CodeDeployServiceRole)

   Deployment type: In-place

   Environment configuration:
     ✓ Auto Scaling groups
     Select: PHB-Backend-ASG

   Deployment settings: CodeDeployDefault.OneAtATime

   Load balancer:
     ✓ Enable load balancing
     Target group: PHB-Backend-Targets

   Create deployment group
   ```

---

### Step 19.5: Create appspec.yml

```yaml
# appspec.yml (in GitHub repo root)
version: 0.0
os: linux
files:
  - source: /
    destination: /opt/phb/phb-backend
hooks:
  BeforeInstall:
    - location: scripts/before_install.sh
      timeout: 300
      runas: ubuntu
  AfterInstall:
    - location: scripts/after_install.sh
      timeout: 300
      runas: ubuntu
  ApplicationStart:
    - location: scripts/start_server.sh
      timeout: 300
      runas: ubuntu
  ValidateService:
    - location: scripts/validate_service.sh
      timeout: 300
      runas: ubuntu
```

**Create deployment scripts**:

```bash
mkdir scripts

# scripts/before_install.sh
#!/bin/bash
sudo systemctl stop phb-backend

# scripts/after_install.sh
#!/bin/bash
cd /opt/phb/phb-backend
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate

# scripts/start_server.sh
#!/bin/bash
sudo systemctl start phb-backend

# scripts/validate_service.sh
#!/bin/bash
sleep 5
curl -f http://localhost:8000/api/health/ || exit 1

chmod +x scripts/*.sh
```

```bash
git add appspec.yml scripts/
git commit -m "Add CodeDeploy configuration"
git push
```

---

### Step 19.6: Create CodePipeline

**Purpose**: Orchestrate build and deploy

1. **Navigate to CodePipeline**
   ```
   Services → CodePipeline → Pipelines → Create pipeline
   ```

2. **Pipeline Settings**
   ```
   Pipeline name: PHB-Backend-Pipeline
   Service role: New service role
   ```

3. **Source Stage**
   ```
   Source provider: GitHub (Version 2)

   Connection: Create new connection
   Connection name: GitHub-PHB

   Repository: yourusername/phb-backend
   Branch: main

   Change detection: Use webhooks (recommended)
   ```

4. **Build Stage**
   ```
   Build provider: AWS CodeBuild
   Project name: PHB-Backend-Build
   ```

5. **Deploy Stage**
   ```
   Deploy provider: AWS CodeDeploy
   Application name: PHB-Backend-App
   Deployment group: PHB-Backend-Production
   ```

6. **Create Pipeline**

---

### Step 19.7: Test Pipeline

1. **Make Code Change**
   ```bash
   # Edit a file
   echo "# Updated on $(date)" >> README.md

   git add README.md
   git commit -m "Test pipeline"
   git push
   ```

2. **Watch Pipeline Execute**
   ```
   CodePipeline → PHB-Backend-Pipeline

   Source → In progress... → Succeeded
   Build → In progress... → Succeeded
   Deploy → In progress... → Succeeded
   ```

3. **Check Deployment**
   ```
   Visit: http://YOUR-LOAD-BALANCER-DNS/api/health/
   Should see latest code deployed!
   ```

---

## 20. Backup and Disaster Recovery

### Understanding Backups

**RTO (Recovery Time Objective)** = How long to restore
**RPO (Recovery Point Objective)** = How much data loss acceptable

**PHB Targets**:
- RTO: 1 hour (restore within 1 hour of failure)
- RPO: 1 hour (lose max 1 hour of data)

---

### Step 20.1: Enable RDS Automated Backups

**Already configured in Step 8!**

```
RDS → Databases → phb-database-1 → Maintenance & backups

Automated backups:
  ✓ Enabled
  Backup retention period: 7 days
  Backup window: 03:00-04:00 UTC
```

**Manual Snapshot**:
```
RDS → Databases → phb-database-1
Actions → Take snapshot

Snapshot name: phb-db-before-migration-2025-10-30
```

---

### Step 20.2: S3 Cross-Region Replication

**Purpose**: Backup medical imaging to another region

1. **Create Destination Bucket** (in different region)
   ```
   S3 → Create bucket

   Name: phb-medical-imaging-backup-[id]
   Region: us-west-2 (Oregon) - different from us-east-1

   Versioning: Enable
   Encryption: SSE-S3
   ```

2. **Enable Replication**
   ```
   S3 → phb-medical-imaging-[id] → Management tab

   Replication rules → Create replication rule

   Rule name: Backup-to-Oregon
   Status: Enabled

   Source bucket:
     Rule scope: All objects

   Destination:
     Bucket: phb-medical-imaging-backup-[id]
     IAM role: Create new role

   Create rule
   ```

**Now all new medical images automatically replicate to Oregon!**

---

### Step 20.3: DynamoDB Point-in-Time Recovery

1. **Enable PITR**
   ```
   DynamoDB → Tables → phb-sessions → Backups

   Point-in-time recovery → Edit

   ✓ Enable point-in-time recovery

   Save
   ```

**Restore to any point in last 35 days!**

---

### Step 20.4: Disaster Recovery Plan

**Create runbook for disasters**:

```markdown
# PHB Disaster Recovery Runbook

## Scenario 1: RDS Database Failure

1. Create new RDS from snapshot:
   ```
   RDS → Snapshots → Select latest → Restore
   New DB instance: phb-database-recovery
   ```

2. Update Django .env:
   ```
   DB_HOST=phb-database-recovery.xxxxx.us-east-1.rds.amazonaws.com
   ```

3. Restart all EC2 instances:
   ```
   Auto Scaling Group → Instance refresh
   ```

**Time to recovery**: ~15 minutes

## Scenario 2: EC2 Instance Failure

Auto Scaling automatically replaces failed instances.

Manual intervention:
```
Auto Scaling Group → Set desired capacity = current + 1
```

**Time to recovery**: ~5 minutes (automatic)

## Scenario 3: Entire Region Failure (us-east-1)

1. Launch EC2 in us-west-2
2. Point to replicated S3 bucket (phb-medical-imaging-backup)
3. Restore RDS snapshot to us-west-2
4. Update Route 53 to point to us-west-2 load balancer

**Time to recovery**: ~2 hours (manual)

## Scenario 4: Accidental Data Deletion

**DynamoDB**:
```
DynamoDB → Tables → phb-sessions → Backups
Point-in-time recovery → Restore to timestamp
```

**S3 (if versioning enabled)**:
```
S3 → Bucket → Show versions
Select deleted object → Restore
```

**RDS**:
```
RDS → Snapshots → Select snapshot before deletion → Restore
```

**Time to recovery**: ~10-30 minutes
```

Save as: `/opt/phb/docs/disaster-recovery-runbook.md`

---

## Part 6: PHB-Specific Deployment (Week 33-48)

---

## 21. Deploying Django Backend

### Complete Production Deployment

**Time**: 2-3 hours

---

### Step 21.1: Production Settings

1. **Create production settings**
   ```python
   # server/settings/production.py
   from .base import *

   DEBUG = False

   ALLOWED_HOSTS = [
       'your-load-balancer-dns.elb.amazonaws.com',
       'api.phbhospital.com',
       'phbhospital.com',
   ]

   # Security
   SECURE_SSL_REDIRECT = True
   SESSION_COOKIE_SECURE = True
   CSRF_COOKIE_SECURE = True
   SECURE_BROWSER_XSS_FILTER = True
   SECURE_CONTENT_TYPE_NOSNIFF = True
   X_FRAME_OPTIONS = 'DENY'

   # CORS
   CORS_ALLOWED_ORIGINS = [
       'https://phbhospital.com',
       'https://app.phbhospital.com',
   ]

   # Database
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql',
           'NAME': os.getenv('DB_NAME'),
           'USER': os.getenv('DB_USER'),
           'PASSWORD': os.getenv('DB_PASSWORD'),
           'HOST': os.getenv('DB_HOST'),
           'PORT': os.getenv('DB_PORT'),
           'OPTIONS': {
               'sslmode': 'require',
           }
       }
   }

   # Logging
   LOGGING = {
       'version': 1,
       'disable_existing_loggers': False,
       'formatters': {
           'verbose': {
               'format': '{levelname} {asctime} {module} {message}',
               'style': '{',
           },
       },
       'handlers': {
           'file': {
               'level': 'INFO',
               'class': 'logging.handlers.RotatingFileHandler',
               'filename': '/opt/phb/phb-backend/logs/django.log',
               'maxBytes': 1024 * 1024 * 10,  # 10 MB
               'backupCount': 5,
               'formatter': 'verbose',
           },
           'cloudwatch': {
               'level': 'WARNING',
               'class': 'watchtower.CloudWatchLogHandler',
               'log_group': '/phb/django/app',
           },
       },
       'root': {
           'handlers': ['file', 'cloudwatch'],
           'level': 'INFO',
       },
       'loggers': {
           'django': {
               'handlers': ['file', 'cloudwatch'],
               'level': 'INFO',
               'propagate': False,
           },
       },
   }
   ```

---

### Step 21.2: Environment Variables

```bash
# .env.production
DEBUG=False
SECRET_KEY=<generate-new-secret-key>
ALLOWED_HOSTS=your-domain.com,api.phbhospital.com

# Database
DB_NAME=phb_db
DB_USER=phbadmin
DB_PASSWORD=<strong-password>
DB_HOST=phb-database-1.xxxxx.us-east-1.rds.amazonaws.com
DB_PORT=5432

# AWS
AWS_STORAGE_BUCKET_NAME=phb-medical-imaging-[id]
AWS_S3_REGION_NAME=us-east-1

# Redis
REDIS_URL=rediss://phb-redis-cache.abc123.0001.use1.cache.amazonaws.com:6379/0
REDIS_PASSWORD=<auth-token>

# Email (using Amazon SES - we'll set up next)
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=email-smtp.us-east-1.amazonaws.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=<SES-SMTP-username>
EMAIL_HOST_PASSWORD=<SES-SMTP-password>
DEFAULT_FROM_EMAIL=noreply@phbhospital.com

# Paystack
PAYSTACK_SECRET_KEY=<production-key>
PAYSTACK_PUBLIC_KEY=<production-key>

# CORS
CORS_ALLOWED_ORIGINS=https://phbhospital.com,https://app.phbhospital.com
```

---

### Step 21.3: Static Files Configuration

```python
# settings/production.py

# Static files (CSS, JS, admin interface)
STATIC_URL = '/static/'
STATIC_ROOT = '/opt/phb/phb-backend/staticfiles/'

# Media files (uploads - using S3)
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
MEDIA_URL = f'https://{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com/'
```

```bash
# Collect static files
python manage.py collectstatic --noinput
```

```nginx
# /etc/nginx/sites-available/phb-backend

server {
    listen 80;
    server_name api.phbhospital.com;

    location /static/ {
        alias /opt/phb/phb-backend/staticfiles/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    location / {
        include proxy_params;
        proxy_pass http://unix:/opt/phb/phb-backend/gunicorn.sock;
    }
}
```

---

## 22. Deploying Node.js Backend

### Step 22.1: Create EC2 Instance for Node.js

**Option 1**: Use separate EC2 instance
```
Follow Step 6, but:
  Name: PHB-NodeJS-Backend-1
  Install Node.js instead of Python
```

**Option 2**: Run on same EC2 as Django (cheaper)
```bash
# Already installed Node.js in Step 6
node --version  # v20.x.x
```

---

### Step 22.2: Deploy Node.js Application

1. **Upload Code**
   ```bash
   cd /opt/phb
   git clone https://github.com/yourusername/phb-nodejs-backend.git
   cd phb-nodejs-backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Create .env**
   ```bash
   # .env
   PORT=5000
   NODE_ENV=production

   DB_HOST=phb-database-1.xxxxx.us-east-1.rds.amazonaws.com
   DB_PORT=5432
   DB_NAME=phb_db
   DB_USER=phbadmin
   DB_PASSWORD=<password>

   JWT_SECRET=<generate-random-secret>
   ```

4. **Create Systemd Service**
   ```bash
   sudo nano /etc/systemd/system/phb-nodejs.service
   ```

   ```ini
   [Unit]
   Description=PHB Node.js Backend
   After=network.target

   [Service]
   User=ubuntu
   WorkingDirectory=/opt/phb/phb-nodejs-backend
   ExecStart=/usr/bin/node server.js
   Restart=always
   Environment=NODE_ENV=production

   [Install]
   WantedBy=multi-user.target
   ```

   ```bash
   sudo systemctl start phb-nodejs
   sudo systemctl enable phb-nodejs
   sudo systemctl status phb-nodejs
   ```

5. **Configure Nginx**
   ```nginx
   # /etc/nginx/sites-available/phb-nodejs

   server {
       listen 80;
       server_name node-api.phbhospital.com;

       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   ```bash
   sudo ln -s /etc/nginx/sites-available/phb-nodejs /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

---

## 23. Deploying React Frontend

### Step 23.1: Build React App

```bash
# On your local machine
cd /path/to/phbfrontend

# Update API URLs
nano src/utils/config.ts
```

```typescript
// src/utils/config.ts
export const API_ENDPOINTS = {
  django: 'https://api.phbhospital.com',
  node: 'https://node-api.phbhospital.com'
};
```

```bash
# Build
npm run build

# Output: dist/ folder
```

---

### Step 23.2: Upload to S3

```bash
# Install AWS CLI (if not already)
brew install awscli  # macOS
# Or download from https://aws.amazon.com/cli/

# Configure
aws configure
# Enter your access key, secret key, region (us-east-1)

# Upload to S3
aws s3 sync dist/ s3://phb-frontend-[your-unique-id]/ --delete

# --delete removes files not in dist/
```

---

### Step 23.3: Invalidate CloudFront Cache

```bash
# Get CloudFront distribution ID
aws cloudfront list-distributions

# Create invalidation
aws cloudfront create-invalidation \
  --distribution-id E123ABC456DEF \
  --paths "/*"

# Wait 2-5 minutes for invalidation to complete
```

---

### Step 23.4: Automate Deployment

**Create deployment script**:

```bash
# deploy-frontend.sh
#!/bin/bash

echo "Building React app..."
npm run build

echo "Uploading to S3..."
aws s3 sync dist/ s3://phb-frontend-[your-unique-id]/ --delete

echo "Invalidating CloudFront cache..."
aws cloudfront create-invalidation \
  --distribution-id E123ABC456DEF \
  --paths "/*"

echo "Deployment complete!"
echo "Visit: https://app.phbhospital.com"
```

```bash
chmod +x deploy-frontend.sh

# Deploy
./deploy-frontend.sh
```

---

## 24. Production Checklist

### Security Checklist

**✅ Before Going Live**:

- [ ] **Django Settings**
  - [ ] DEBUG = False
  - [ ] Strong SECRET_KEY (never commit to Git)
  - [ ] ALLOWED_HOSTS configured
  - [ ] SECURE_SSL_REDIRECT = True
  - [ ] SESSION_COOKIE_SECURE = True
  - [ ] CSRF_COOKIE_SECURE = True

- [ ] **Database**
  - [ ] RDS in private subnet
  - [ ] Security group allows only EC2 access
  - [ ] Strong master password (min 20 chars)
  - [ ] Automated backups enabled (7 days)
  - [ ] Encryption at rest enabled

- [ ] **S3 Buckets**
  - [ ] Medical imaging bucket: Private, encrypted
  - [ ] Versioning enabled
  - [ ] Access logging enabled
  - [ ] Lifecycle policies configured
  - [ ] Frontend bucket: Public only

- [ ] **EC2 Instances**
  - [ ] SSH key stored securely (password manager)
  - [ ] Security group: SSH from your IP only
  - [ ] IAM role (no hardcoded AWS keys)
  - [ ] CloudWatch agent installed
  - [ ] Automatic security updates enabled

- [ ] **Load Balancer**
  - [ ] HTTPS listener configured
  - [ ] HTTP redirects to HTTPS
  - [ ] SSL certificate from ACM
  - [ ] Health checks configured

- [ ] **Monitoring**
  - [ ] CloudWatch alarms: CPU, disk, errors
  - [ ] Billing alerts configured
  - [ ] SNS notifications to team email
  - [ ] Dashboard created

- [ ] **Backups**
  - [ ] RDS automated backups (7 days)
  - [ ] S3 cross-region replication
  - [ ] DynamoDB PITR enabled
  - [ ] Disaster recovery runbook created

---

### Performance Checklist

- [ ] **Caching**
  - [ ] Redis/ElastiCache configured
  - [ ] API responses cached
  - [ ] CloudFront CDN enabled
  - [ ] Static files have long cache headers

- [ ] **Database**
  - [ ] Indexes on frequently queried fields
  - [ ] Connection pooling configured
  - [ ] Slow query logging enabled

- [ ] **Frontend**
  - [ ] Vite build optimized
  - [ ] Images optimized (WebP format)
  - [ ] Code splitting enabled
  - [ ] Lazy loading for routes

---

### Compliance Checklist (HIPAA/NDPR)

- [ ] **Data Encryption**
  - [ ] Data at rest: RDS, S3, EBS encrypted
  - [ ] Data in transit: HTTPS everywhere
  - [ ] Redis TLS enabled

- [ ] **Audit Logging**
  - [ ] S3 access logs enabled
  - [ ] CloudTrail enabled (AWS API calls)
  - [ ] Application logs sent to CloudWatch
  - [ ] 90-day log retention

- [ ] **Access Control**
  - [ ] MFA enabled on all IAM users
  - [ ] Principle of least privilege
  - [ ] No shared credentials
  - [ ] Regular access reviews

---

### Cost Optimization Checklist

- [ ] **Right-Sizing**
  - [ ] t2.micro for low traffic (Free Tier)
  - [ ] Upgrade to t3.small only when needed
  - [ ] Auto Scaling based on actual usage

- [ ] **Storage**
  - [ ] S3 Lifecycle policies (move to Glacier)
  - [ ] Delete old RDS snapshots (keep 7 days)
  - [ ] Compress logs before uploading

- [ ] **Data Transfer**
  - [ ] CloudFront caching (reduce origin requests)
  - [ ] Compress responses (gzip)
  - [ ] Optimize images

- [ ] **Monitoring**
  - [ ] Set billing alarm at $50
  - [ ] Review AWS Cost Explorer monthly
  - [ ] Use AWS Free Tier dashboard

---

### Testing Checklist

- [ ] **Load Testing**
  ```bash
  # Test with 1000 users
  ab -n 10000 -c 1000 https://api.phbhospital.com/api/health/
  ```

- [ ] **Security Testing**
  - [ ] Run OWASP ZAP scan
  - [ ] Check SSL configuration (ssllabs.com)
  - [ ] Verify security headers

- [ ] **Disaster Recovery Testing**
  - [ ] Restore from RDS snapshot (quarterly)
  - [ ] Test Auto Scaling (monthly)
  - [ ] Verify backups (weekly)

---

## Final Cost Summary

### Free Tier (Months 1-12)

```
✅ FREE:
  EC2 t2.micro: 750 hours/month = $0
  RDS db.t2.micro: 750 hours/month = $0
  S3: 5 GB storage = $0
  Data transfer: 15 GB out = $0
  CloudFront: 50 GB = $0
  DynamoDB: 25 GB = $0
  Lambda: 1M requests = $0
  CloudWatch: 10 alarms = $0
  SNS: 1M publishes = $0
  SQS: 1M requests = $0

💰 PAID (not in Free Tier):
  Domain (Route 53): $12/year = $1/month
  Load Balancer: $16/month
  NAT Gateway: $33/month (optional, skip for now)

TOTAL YEAR 1: $17/month = $204/year
```

---

### After Free Tier (Month 13+)

**Small Setup** (1,000 daily users):
```
EC2 t3.small (2 instances): $30/month
RDS db.t3.small: $25/month
S3 (50 GB): $1.15/month
Data transfer (50 GB): $4.50/month
CloudFront (100 GB): $8.50/month
DynamoDB on-demand: $2/month
ElastiCache t3.micro: $12/month
Load Balancer: $16/month
Route 53: $1/month
CloudWatch Logs: $3/month

TOTAL: ~$103/month
```

**Medium Setup** (10,000 daily users):
```
EC2 t3.medium (3 instances): $100/month
RDS db.t3.medium: $60/month
S3 (200 GB): $4.60/month
Data transfer (200 GB): $18/month
CloudFront (500 GB): $42.50/month
DynamoDB on-demand: $10/month
ElastiCache t3.small: $24/month
Load Balancer: $16/month
Route 53: $1/month
CloudWatch: $10/month

TOTAL: ~$286/month
```

**Large Setup** (100,000 daily users):
```
EC2 t3.large (5 instances): $300/month
RDS db.r5.large: $200/month
S3 (1 TB): $23/month
Data transfer (1 TB): $90/month
CloudFront (2 TB): $170/month
DynamoDB on-demand: $50/month
ElastiCache t3.medium: $48/month
Load Balancer: $16/month
Route 53: $1/month
CloudWatch: $30/month

TOTAL: ~$928/month
```

---

## Next Steps

### Week 1-4: Foundation
1. ✅ Create AWS account
2. ✅ Set up IAM users
3. ✅ Configure billing alerts
4. ✅ Create VPC and subnets

### Week 5-12: Core Infrastructure
5. ✅ Launch EC2 instance
6. ✅ Set up S3 buckets
7. ✅ Create RDS database
8. ✅ Deploy Django backend

### Week 13-16: Monitoring & CDN
9. ✅ Install CloudWatch agent
10. ✅ Set up CloudFront
11. ✅ Configure Route 53
12. ✅ Get SSL certificate

### Week 17-24: Advanced Services
13. ✅ Create API Gateway
14. ✅ Set up DynamoDB
15. ✅ Configure ElastiCache
16. ✅ Implement SNS/SQS

### Week 25-32: Automation
17. ✅ Create Auto Scaling Group
18. ✅ Set up Load Balancer
19. ✅ Build CI/CD pipeline
20. ✅ Configure backups

### Week 33-48: Production Deployment
21. ✅ Deploy Django (production)
22. ✅ Deploy Node.js backend
23. ✅ Deploy React frontend
24. ✅ Complete production checklist

---

## Congratulations! 🎉

You now have a **production-ready AWS infrastructure** for PHB Hospital System!

**What You've Built**:
- ✅ Highly available (Auto Scaling, Load Balancer)
- ✅ Secure (HTTPS, encryption, private subnets)
- ✅ Monitored (CloudWatch, alarms, logs)
- ✅ Automated (CI/CD pipeline)
- ✅ Cost-optimized (Free Tier, lifecycle policies)
- ✅ HIPAA-compliant (encryption, audit logs)

**Your Infrastructure**:
```
Users (Web/Mobile)
    ↓
CloudFront CDN (React frontend)
    ↓
Route 53 DNS
    ↓
Application Load Balancer (HTTPS)
    ↓
Auto Scaling Group (Django backends)
    ↓
    ├→ RDS PostgreSQL (patient data)
    ├→ ElastiCache Redis (sessions)
    ├→ S3 (medical imaging)
    └→ DynamoDB (pregnancy tracking)

Monitoring: CloudWatch
Notifications: SNS/SQS
CI/CD: CodePipeline
Backups: Automated (RDS, S3 replication)
```

---

**Support Resources**:
- AWS Documentation: https://docs.aws.amazon.com
- AWS Free Tier: https://aws.amazon.com/free
- PHB GitHub: https://github.com/yourusername/phb-backend
- Emergency Contact: your-email@phbhospital.com

---

**Created**: 2025-10-30
**Last Updated**: 2025-10-30
**Author**: Claude
**Status**: ✅ Complete
**Related Guides**:
- [AWS Services Integration Analysis](../research/2025-10-30-aws-services-integration-analysis.md)
- [Monolithic Architecture Analysis](../research/2025-10-30-monolithic-architecture-analysis.md)
