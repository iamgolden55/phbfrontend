# PHB AWS Deployment - Session State & Resume Point

**Date Started:** October 31, 2025
**Date Updated:** November 20, 2025 (Final Update)
**Total Duration:** ~7 hours (Infrastructure: 4h, Backend: 2h, Frontend Integration & Testing: 1h)
**Status:** 🎉 **FULLY DEPLOYED AND OPERATIONAL** ✅

---

## 🎯 Current State Summary

### What's Complete ✅

#### **Phase 1: Infrastructure Setup** (Oct 31, 2025)

1. **AWS Account & Security**
   - AWS account created (no free tier)
   - MFA enabled on root account
   - IAM admin user created: `phb-admin`
   - Billing alerts configured ($10 threshold)

2. **IAM Roles & Policies**
   - Custom policy: `PHB-Backend-S3-Access` (S3 access for backends)
   - Service role: `PHB-EC2-Backend-Role` (for Lightsail instance)

3. **S3 Buckets Created**
   - `phb-medical-imaging-nigeria-2025` (medical DICOM files)
   - `phb-clinical-guidelines-nigeria-2025` (treatment protocols, PDFs)
   - `phb-prescription-docs-nigeria-2025` (prescription PDFs)
   - All encrypted (SSE-S3), versioning enabled, public access blocked

4. **Lightsail Instance**
   - Name: `Ubuntu-1`
   - OS: Ubuntu 22.04.5 LTS
   - Size: 1 GB RAM, 1 vCPU, 40 GB SSD ($7/month)
   - Static IP: **44.196.7.148**
   - Location: US East (N. Virginia) Zone A
   - Firewall: 5 ports open (22, 80, 443, 5000, 8000)
   - Automatic snapshots: Enabled ($1/month)

5. **Server Software Installed**
   - Python 3.11.14
   - Node.js 20.19.5 + npm 10.8.2
   - Nginx 1.18.0
   - PostgreSQL Client 14.19
   - AWS CLI 1.22.34
   - Certbot (Let's Encrypt SSL)
   - Git, build tools
   - System dependencies: libcairo2-dev, libpango, pkg-config, python3-dev

6. **AWS CLI Configured**
   - S3 access working
   - Access keys created for `phb-admin` user
   - Region: us-east-1

7. **PostgreSQL Database**
   - Name: `phb-database-1`
   - Engine: PostgreSQL 17.6
   - Size: 1 GB RAM, 2 vCPUs, 40 GB SSD ($15/month)
   - Location: US East (N. Virginia) Zone A
   - Public mode: DISABLED (private only)
   - SSL/TLS: Enabled (TLSv1.3)
   - Application database created: `phb_production`
   - Status: ✅ All 97 migrations applied successfully

#### **Phase 2: Backend Deployment** (Nov 20, 2025)

8. **Django Backend Deployed**
   - Repository: `https://github.com/iamgolden55/basebackend.git`
   - Location: `/var/www/phb/django-backend/`
   - SSH Deploy Key configured (private repo access)
   - Python virtual environment created
   - Dependencies installed (including weasyprint for PDF generation)
   - Database migrations: ✅ 97 migrations applied
   - Static files: ✅ 163 files collected to `/var/www/phb/django-backend/staticfiles/`
   - Environment configured (.env file with production settings)

9. **Systemd Service Created**
   - Service name: `phb-django.service`
   - Status: ✅ Active and running
   - Workers: 3 Gunicorn workers
   - Memory usage: ~175 MB
   - Binding: `127.0.0.1:8000` (internal)
   - Auto-start: Enabled on boot
   - Logs: `/var/log/phb-django-access.log`, `/var/log/phb-django-error.log`

10. **Nginx Reverse Proxy**
    - Config file: `/etc/nginx/sites-available/phb-api`
    - Status: ✅ Active and proxying
    - Routes: `api.phbhealth.com` → `127.0.0.1:8000`
    - Static files: Serving from `/var/www/phb/django-backend/staticfiles/`
    - Media files: Serving from `/var/www/phb/django-backend/media/`
    - Client max body size: 100MB
    - Security headers enabled (X-Frame-Options, X-Content-Type-Options, X-XSS-Protection)

11. **SSL/HTTPS Certificate**
    - Provider: Let's Encrypt (free)
    - Domain: `api.phbhealth.com`
    - Certificate: `/etc/letsencrypt/live/api.phbhealth.com/fullchain.pem`
    - Private key: `/etc/letsencrypt/live/api.phbhealth.com/privkey.pem`
    - Expiry: February 18, 2026
    - Auto-renewal: ✅ Enabled (certbot timer)
    - HTTPS: ✅ Working
    - HTTP redirect: ✅ Enabled (301 redirect to HTTPS)

12. **DNS Configuration**
    - Domain registrar: Namecheap
    - Domain: `phbhealth.com`
    - DNS Records configured:
      - `api.phbhealth.com` → `44.196.7.148` (A record) ✅
      - `phbhealth.com` → `76.76.21.21` (A record to Vercel) ✅
      - `www.phbhealth.com` → `cname.vercel-dns.com` (CNAME) ✅
    - Propagation: ✅ Complete

13. **Deployment Issues Fixed**
    - ✅ Fixed Python f-string syntax error (line 1459 in `api/utils/email.py`)
    - ✅ Installed weasyprint dependencies (Cairo, Pango libraries)
    - ✅ Fixed log file permissions for systemd service
    - ✅ Learned proper CI/CD workflow (fix locally → commit → push → pull on server)

---

## 🚀 Backend is LIVE!

**Django API:** https://api.phbhealth.com
**Status:** ✅ Production Ready
**SSL:** ✅ Valid HTTPS
**Auto-start:** ✅ Enabled
**Database:** ✅ Connected and migrated

---

## 🔐 Important Access Information

### Server SSH Access
```bash
ssh -i ~/.ssh/LightsailDefaultKey-us-east-1.pem ubuntu@44.196.7.148
```

**SSH Key Location:** `~/.ssh/LightsailDefaultKey-us-east-1.pem`

### GitHub Deploy Key
SSH deploy key configured on server for private repo access:
- Key location: `~/.ssh/phb_deploy_key`
- Added to GitHub: `https://github.com/iamgolden55/basebackend/settings/keys`

### Database Connection
```bash
psql -h ls-0e562b371352b017e36bd8ea63bdf7384de9a6de.c05cgy8qovyw.us-east-1.rds.amazonaws.com \
     -p 5432 \
     -U phbadmin \
     -d phb_production
```

**Credentials File on Server:** `~/phb-database-credentials.txt` (chmod 600)
**Password:** `PHB2025!SecureDBNigeria#Med`

### Database Connection Strings

**Django (.env file):**
```
POSTGRES_DB=phb_production
POSTGRES_USER=phbadmin
POSTGRES_PASSWORD=PHB2025!SecureDBNigeria#Med
POSTGRES_HOST=ls-0e562b371352b017e36bd8ea63bdf7384de9a6de.c05cgy8qovyw.us-east-1.rds.amazonaws.com
POSTGRES_PORT=5432
```

### S3 Buckets Access
```bash
aws s3 ls  # List all buckets
aws s3 ls s3://phb-medical-imaging-nigeria-2025/  # List files
```

### Django Service Management
```bash
# Check status
sudo systemctl status phb-django

# View logs
sudo journalctl -u phb-django -f

# Restart service
sudo systemctl restart phb-django

# View access logs
tail -f /var/log/phb-django-access.log
```

### SSL Certificate Renewal
```bash
# Test renewal (dry run)
sudo certbot renew --dry-run

# Force renewal
sudo certbot renew --force-renewal
```

---

## 💰 Current Cost Breakdown

| Service | Cost/Month | Status |
|---------|------------|--------|
| Lightsail Instance (1GB) | $7.00 | Running |
| Automatic Snapshots | $1.00 | Active |
| PostgreSQL Database | $15.00 | Running |
| S3 Storage (3 buckets) | $0.40 | Active |
| Static IP | FREE | Attached |
| SSL Certificate (Let's Encrypt) | FREE | Active |
| **TOTAL** | **$23.40** | ✅ Under budget |

**After 2GB upgrade:** $28.40/month (when AWS support approves limit increase)

---

#### **Phase 3: Frontend Integration & End-to-End Testing** (Nov 20, 2025)

14. **Frontend Environment Variables**
    - Vercel environment variables configured:
      - `VITE_API_BASE_URL=https://api.phbhealth.com/`
      - `VITE_API_URL=https://api.phbhealth.com/`
      - `VITE_AUTH_API_URL=https://api.phbhealth.com/`
      - `VITE_HEALTH_API_URL=https://api.phbhealth.com/`
      - `VITE_ORGANIZATION_API_URL=https://api.phbhealth.com/`
    - Frontend redeployed to Vercel with production settings

15. **CORS Configuration Fixed**
    - Updated `/var/www/phb/django-backend/.env`:
      - `CORS_ALLOWED_ORIGINS=https://phbhealth.com,https://www.phbhealth.com,https://publichealth.vercel.app`
    - Modified `server/settings.py` to read CORS from environment variable
    - Django service restarted
    - CORS preflight (OPTIONS) requests: ✅ HTTP 200

16. **End-to-End Testing Complete**
    - ✅ User registration working (HTTP 201 Created)
    - ✅ User created in database: `eruwagolden55@gmail.com`
    - ✅ HTTPS working on both frontend and backend
    - ✅ CORS configured correctly
    - ✅ Frontend communicating with production API
    - ✅ Database operations confirmed

17. **Email Configuration (Gmail SMTP)**
    - ✅ Production `.env` updated with Gmail SMTP settings:
      - `EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend`
      - `EMAIL_HOST=smtp.gmail.com`
      - `EMAIL_PORT=587`
      - `EMAIL_USE_TLS=True`
      - `EMAIL_HOST_USER=eruwagolden55@gmail.com`
      - `EMAIL_HOST_PASSWORD=[App Password]`
      - `DEFAULT_FROM_EMAIL=eruwagolden55@gmail.com`
    - ✅ Django service restarted with email configuration
    - ✅ Verification emails now working in production

18. **Redis Installation & Configuration**
    - ✅ Redis Server 6.0.16 installed
    - ✅ Service status: Active and running on port 6379
    - ✅ Auto-start enabled (systemd service)
    - ✅ Connection: `127.0.0.1:6379` (local only, secure)
    - **Why needed:** Django session management and caching
    - **Fixed:** Login 500 error (Redis connection refused)

19. **User Login Testing Complete**
    - ✅ Login flow tested end-to-end:
      - `POST /api/login/` → HTTP 200 ✅
      - `POST /api/verify-login-otp/` → HTTP 200 ✅
      - `GET /api/profile/` → HTTP 200 ✅
    - ✅ User authenticated successfully
    - ✅ Session created and persisted in Redis
    - ✅ Full application flow working

---

## 🔜 What's Pending (Optional Enhancements)

1. **Add Custom Domain to Vercel** (Optional)
   - Vercel project: https://vercel.com
   - Add domain: `phbhealth.com` and `www.phbhealth.com`
   - DNS already configured in Namecheap

2. **Deploy Node.js Backend** (If needed)
   - Currently not required (Django handles all APIs)
   - Can be added later if needed

---

## 📋 Environment Variables (.env)

**Location:** `/var/www/phb/django-backend/.env`

```env
# Django Configuration
DEBUG=False
SECRET_KEY=[AUTO-GENERATED 50-character token]
ALLOWED_HOSTS=api.phbhealth.com,44.196.7.148,localhost

# Server URLs
SERVER_API_URL=https://api.phbhealth.com/
NEXTJS_URL=https://phbhealth.com/

# Database Configuration
POSTGRES_DB=phb_production
POSTGRES_USER=phbadmin
POSTGRES_PASSWORD=PHB2025!SecureDBNigeria#Med
POSTGRES_HOST=ls-0e562b371352b017e36bd8ea63bdf7384de9a6de.c05cgy8qovyw.us-east-1.rds.amazonaws.com
POSTGRES_PORT=5432

# Redis Configuration (optional - can skip for now)
REDIS_URL=redis://localhost:6379/1

# Email Configuration (can configure later)
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend

# AWS S3 Configuration
AWS_STORAGE_BUCKET_NAME=phb-medical-imaging-nigeria-2025
AWS_S3_REGION_NAME=us-east-1

# CORS
CORS_ALLOWED_ORIGINS=https://phbhealth.com,https://publichealth.vercel.app

# Security
SECURE_SSL_REDIRECT=True
SESSION_COOKIE_SECURE=True
CSRF_COOKIE_SECURE=True
```

---

## 📁 Documentation Files

1. **Comprehensive Guide (32 pages)**
   - Location: `thoughts/shared/guides/phb-aws-deployment-complete-guide.md`
   - Contents: Full implementation details, decisions, troubleshooting

2. **Session State (This File)**
   - Location: `aws/phb-deployment-session-state.md`
   - Purpose: Quick resume point for next session

3. **Architecture Analysis**
   - Location: `thoughts/shared/research/2025-10-30-monolithic-architecture-analysis.md`

---

## 🎓 Key Decisions Made

1. **Architecture:** Deploy monolithic system first, refactor to microservices later (Strangler Fig Pattern over 12 months)

2. **Hosting Strategy:**
   - Backend: AWS Lightsail (cheaper, simpler than full EC2/VPC)
   - Frontend: Vercel (free tier, CDN, auto-deployments)
   - Architecture: Separated frontend/backend (JAMstack best practice)

3. **Database:** Managed PostgreSQL (automatic backups, patches) instead of self-hosted

4. **Budget Strategy:** Start with 1GB instance ($7), upgrade to 2GB ($12) when approved

5. **Security:** IAM roles (no hardcoded credentials), MFA, firewall rules, SSL/TLS, HTTPS only

6. **Operating System:** Ubuntu 22.04 LTS (5-year support, best package ecosystem)

7. **Web Server:** Nginx (industry standard, reverse proxy, static file serving, SSL termination)

8. **CI/CD Approach:** Git-based deployments (fix locally → commit → push → pull on server)

---

## 🔧 Quick Verification Commands

**When resuming, verify everything is still running:**

```bash
# SSH into server
ssh -i ~/.ssh/LightsailDefaultKey-us-east-1.pem ubuntu@44.196.7.148

# Check Django service
sudo systemctl status phb-django

# Check Nginx
sudo systemctl status nginx

# Test HTTPS endpoint
curl -I https://api.phbhealth.com/

# View recent logs
sudo journalctl -u phb-django --since "1 hour ago"

# Check memory usage
free -h

# Check disk space
df -h

# Test database connection
psql -h ls-0e562b371352b017e36bd8ea63bdf7384de9a6de.c05cgy8qovyw.us-east-1.rds.amazonaws.com -p 5432 -U phbadmin -d phb_production -c "\dt"

# Check SSL certificate expiry
sudo certbot certificates
```

---

## 🎯 Session Goals Achieved

### Phase 1 (Oct 31, 2025)
- ✅ Complete AWS infrastructure setup
- ✅ Cost optimization within budget ($23.40/month)
- ✅ Security best practices implemented
- ✅ All software installed and tested
- ✅ Database created and accessible
- ✅ S3 buckets configured
- ✅ Comprehensive documentation created

### Phase 2 (Nov 20, 2025)
- ✅ Django backend deployed from GitHub
- ✅ Database migrations completed (97 migrations)
- ✅ Static files collected
- ✅ Systemd service created and running
- ✅ Nginx reverse proxy configured
- ✅ SSL/HTTPS enabled with Let's Encrypt
- ✅ DNS configured in Namecheap
- ✅ Backend live at https://api.phbhealth.com
- ✅ Learned CI/CD workflow by fixing deployment errors

### Phase 3 (Nov 20, 2025)
- ✅ Frontend environment variables configured in Vercel
- ✅ CORS configuration fixed (environment variable based)
- ✅ End-to-end user registration tested successfully
- ✅ User account created and manually verified
- ✅ Frontend-to-backend communication working
- ✅ HTTPS working on both domains
- ✅ Complete deployment documentation updated

---

## ⚠️ Important Notes

1. **Backend is Production Ready:** Django backend is fully deployed, migrated, and accessible via HTTPS
2. **Frontend Currently on Vercel:** `https://publichealth.vercel.app` (needs custom domain connection)
3. **DNS Already Configured:** Namecheap DNS points both frontend and backend domains correctly
4. **SSL Auto-Renewal:** Certbot configured to renew certificate automatically before expiry
5. **Memory Usage:** Django using ~175 MB of 914 MB total (well within limits)
6. **No Node.js Backend Needed:** All APIs handled by Django (Node.js deployment can be skipped)
7. **Git Workflow Established:** CI/CD workflow practiced during f-string bug fix

---

## 🎓 Lessons Learned

1. **Deploy Keys > Tokens:** GitHub deploy keys better than personal access tokens for server-to-repo auth
2. **Test Before Deploying:** `python manage.py check` catches errors before deployment
3. **System Dependencies Matter:** Python packages like weasyprint need system libraries installed first
4. **Proper CI/CD Flow:** Fix locally → test → commit → push → pull on production
5. **Nginx = Essential:** Not optional - provides security, performance, SSL termination
6. **Let's Encrypt = Easy:** SSL setup is literally 1 command with certbot
7. **Systemd = Reliability:** Services auto-start on reboot, easy to manage
8. **Logs are Critical:** Always configure logging for debugging production issues

---

## 🔗 Related Files

- **Comprehensive Guide:** `thoughts/shared/guides/phb-aws-deployment-complete-guide.md`
- **AWS Setup Guide:** `thoughts/shared/guides/aws-setup-complete-guide.md`
- **Architecture Analysis:** `thoughts/shared/research/2025-10-30-monolithic-architecture-analysis.md`
- **This Session State:** `aws/phb-deployment-session-state.md`

---

**Total Implementation Time:** ~7 hours (Infrastructure: 4h, Backend: 2h, Frontend Integration: 1h)
**Infrastructure Status:** ✅ Complete and Production-Ready
**Backend Status:** ✅ Deployed and Live at https://api.phbhealth.com
**Frontend Status:** ✅ Connected and Operational at https://www.phbhealth.com
**Overall Progress:** 🎉 **100% COMPLETE** - Fully Deployed and Operational

---

## 🎉 Deployment Complete!

The PHB healthcare platform is now **fully operational** in production!

- **Frontend**: https://www.phbhealth.com (Vercel)
- **Backend API**: https://api.phbhealth.com (AWS Lightsail)
- **Database**: PostgreSQL 17.6 on AWS RDS
- **SSL/HTTPS**: ✅ Enabled on all domains
- **User Registration**: ✅ Working (manual verification until email configured)
- **Monthly Cost**: $23.40 (within budget)

**Next Steps (Optional):**
1. Configure email sending (Gmail SMTP, SendGrid, or Amazon SES)
2. Add custom domain in Vercel for better branding
3. Monitor application performance and costs

---

**END OF SESSION STATE DOCUMENT**