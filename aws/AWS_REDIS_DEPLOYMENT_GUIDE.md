# AWS Redis Deployment Guide for PHB

**Last Updated**: November 2, 2025
**Status**: Production-Ready Configuration

---

## 🎯 Overview

This guide covers deploying Redis caching infrastructure on AWS for the PHB drug database caching system.

**Key Benefits**:
- ✅ No code changes required (already uses `REDIS_URL` environment variable)
- ✅ 95% database load reduction with drug database caching
- ✅ 50x faster drug lookups (1-2ms vs 50-100ms)
- ✅ Scalable to millions of users

---

## 📋 Architecture Options

### Option 1: AWS ElastiCache (Recommended)
**Best for**: Most use cases, cost-effective

**Pros**:
- Managed Redis service
- Automatic backups
- Auto-failover with replication
- CloudWatch integration
- Cost: $12-150/month

**Cons**:
- Cache-only (data loss on restart)
- Requires VPC configuration

### Option 2: AWS MemoryDB
**Best for**: Mission-critical caching with durability requirements

**Pros**:
- Redis-compatible with data durability
- Multi-AZ replication built-in
- Microsecond read latency
- Transaction logs for recovery

**Cons**:
- More expensive ($38+/month)
- Overkill for cache-only use case

### Recommendation
**Use ElastiCache** for drug database caching. Cache misses rebuild from database automatically, so durability isn't critical.

---

## 🚀 Quick Start

### Prerequisites
- AWS Account with appropriate permissions
- VPC with at least 2 subnets in different AZs
- Security group allowing inbound port 6379

### Step 1: Create ElastiCache Redis Cluster

**Via AWS Console**:
1. Go to ElastiCache → Redis clusters → Create
2. Configure:
   - **Cluster name**: `phb-redis-cache`
   - **Engine version**: Redis 7.0+ (latest)
   - **Node type**: `cache.t3.micro` (dev) or `cache.t3.small` (prod)
   - **Number of replicas**: 1 (for high availability)
   - **Multi-AZ**: Enable (for production)
   - **Subnet group**: Select your VPC subnets
   - **Security groups**: Allow port 6379 from application servers
   - **Backup retention**: 1 day (optional)

**Via AWS CLI**:
```bash
# Create subnet group (one-time)
aws elasticache create-cache-subnet-group \
  --cache-subnet-group-name phb-redis-subnet \
  --cache-subnet-group-description "PHB Redis Cache Subnet" \
  --subnet-ids subnet-xxxxx subnet-yyyyy

# Create Redis cluster
aws elasticache create-replication-group \
  --replication-group-id phb-redis-cache \
  --replication-group-description "PHB Drug Database Cache" \
  --engine redis \
  --engine-version 7.0 \
  --cache-node-type cache.t3.small \
  --num-cache-clusters 2 \
  --automatic-failover-enabled \
  --cache-subnet-group-name phb-redis-subnet \
  --security-group-ids sg-xxxxx \
  --preferred-maintenance-window "sun:05:00-sun:06:00" \
  --snapshot-retention-limit 1 \
  --tags Key=Project,Value=PHB Key=Environment,Value=Production
```

### Step 2: Get Redis Endpoint

**Via Console**:
- ElastiCache → Redis clusters → `phb-redis-cache`
- Copy **Primary endpoint**
- Example: `phb-redis-cache.xxxxx.0001.use1.cache.amazonaws.com:6379`

**Via CLI**:
```bash
aws elasticache describe-replication-groups \
  --replication-group-id phb-redis-cache \
  --query 'ReplicationGroups[0].NodeGroups[0].PrimaryEndpoint.Address' \
  --output text
```

### Step 3: Configure Application

**Set Environment Variable**:

**Elastic Beanstalk**:
```bash
eb setenv REDIS_URL="redis://phb-redis-cache.xxxxx.0001.use1.cache.amazonaws.com:6379/1"
```

**ECS Task Definition** (JSON):
```json
{
  "containerDefinitions": [{
    "name": "phb-backend",
    "environment": [
      {
        "name": "REDIS_URL",
        "value": "redis://phb-redis-cache.xxxxx.0001.use1.cache.amazonaws.com:6379/1"
      }
    ]
  }]
}
```

**EC2 / Docker Compose**:
```bash
# .env file
REDIS_URL=redis://phb-redis-cache.xxxxx.0001.use1.cache.amazonaws.com:6379/1
```

**AWS Secrets Manager** (recommended for production):
```bash
# Store in Secrets Manager
aws secretsmanager create-secret \
  --name phb/redis-url \
  --secret-string "redis://phb-redis-cache.xxxxx.0001.use1.cache.amazonaws.com:6379/1"

# Reference in ECS task definition
{
  "secrets": [{
    "name": "REDIS_URL",
    "valueFrom": "arn:aws:secretsmanager:us-east-1:123456789012:secret:phb/redis-url"
  }]
}
```

### Step 4: Verify Connection

**SSH into application server and run**:
```bash
# Test Redis connection
redis-cli -h phb-redis-cache.xxxxx.0001.use1.cache.amazonaws.com -p 6379 ping
# Expected: PONG

# Test from Django
python manage.py shell --settings=server.settings
>>> from django.core.cache import cache
>>> cache.set('test', 'AWS Redis Working!', 60)
>>> print(cache.get('test'))
AWS Redis Working!
>>> print("✅ Redis connection successful!")
```

### Step 5: Deploy Application

**Restart your application** to pick up the new `REDIS_URL`:
```bash
# Elastic Beanstalk
eb deploy

# ECS
aws ecs update-service --cluster phb-cluster --service phb-backend --force-new-deployment

# Docker
docker-compose down && docker-compose up -d

# Systemd
sudo systemctl restart phb-backend
```

### Step 6: Monitor Cache Performance

**Check CloudWatch Metrics**:
- CacheHits / CacheMisses ratio (target: >90%)
- CPUUtilization (target: <75%)
- NetworkBytesIn/Out
- EngineCPUUtilization

**Check Application Logs**:
```bash
# Look for cache hit/miss logs
grep "Cache HIT\|Cache MISS" /var/log/phb/application.log

# Example output:
# ✅ Cache HIT for: amlodipine
# ✅ Cache HIT for: metformin
# ❌ Cache MISS for: new_medication, querying database
```

---

## 🔐 Security Configuration

### Security Group Rules

**Inbound Rules**:
| Type | Protocol | Port | Source | Description |
|------|----------|------|--------|-------------|
| Custom TCP | TCP | 6379 | sg-app-servers | Allow Redis from app servers |

**Outbound Rules**:
| Type | Protocol | Port | Destination | Description |
|------|----------|------|-------------|-------------|
| All traffic | All | All | 0.0.0.0/0 | Allow all outbound |

### VPC Configuration

**Subnet Requirements**:
- Minimum 2 subnets in different Availability Zones
- Subnets should be private (not internet-facing)
- Application servers must be in same VPC or have VPC peering

**Example VPC Setup**:
```
VPC: 10.0.0.0/16
├─ Private Subnet 1 (us-east-1a): 10.0.1.0/24 → ElastiCache Primary
├─ Private Subnet 2 (us-east-1b): 10.0.2.0/24 → ElastiCache Replica
├─ Public Subnet 1 (us-east-1a): 10.0.101.0/24 → App Servers / ALB
└─ Public Subnet 2 (us-east-1b): 10.0.102.0/24 → App Servers / ALB
```

### Authentication (Optional)

**Enable AUTH token** for additional security:
```bash
aws elasticache modify-replication-group \
  --replication-group-id phb-redis-cache \
  --auth-token "YourSecureRandomToken123!" \
  --auth-token-update-strategy SET \
  --apply-immediately
```

**Update REDIS_URL**:
```bash
REDIS_URL="redis://:YourSecureRandomToken123!@phb-redis-cache.xxxxx.cache.amazonaws.com:6379/1"
```

### Encryption

**Enable encryption at-rest and in-transit** (recommended for production):
```bash
aws elasticache create-replication-group \
  --replication-group-id phb-redis-cache-secure \
  --at-rest-encryption-enabled \
  --transit-encryption-enabled \
  --auth-token "YourSecureRandomToken123!" \
  ...
```

**Update Django settings for TLS** (`settings.py`):
```python
# Uncomment for production with encryption in-transit
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.redis.RedisCache',
        'LOCATION': os.environ.get('REDIS_URL'),
        'OPTIONS': {
            'connection_kwargs': {
                'ssl': True,
                'ssl_cert_reqs': None,  # AWS uses self-signed certs
            }
        }
    }
}
```

---

## 💰 Cost Optimization

### Instance Sizing Guide

**cache.t3.micro** (512 MB RAM)
- **Cost**: $12.41/month (on-demand)
- **Use case**: Development, testing, <10K users
- **Drug cache usage**: ~1-2 MB (505 drugs × 2KB)
- **Remaining space**: ~500 MB for other caching

**cache.t3.small** (1.37 GB RAM)
- **Cost**: $24.82/month (on-demand)
- **Use case**: Small production, 10K-100K users
- **Can cache**: Drugs + user sessions + API responses

**cache.t3.medium** (3.09 GB RAM)
- **Cost**: $49.64/month (on-demand)
- **Use case**: Large production, 100K-1M users

**cache.m6g.large** (6.38 GB RAM, Graviton2)
- **Cost**: $93.80/month (on-demand)
- **Use case**: Enterprise, 1M+ users
- **20% cost savings** vs Intel-based m5.large

### Reserved Instances

Save **up to 55%** with 1-year or 3-year commitments:

| Instance | On-Demand | 1-Year Reserved | 3-Year Reserved |
|----------|-----------|-----------------|-----------------|
| t3.micro | $12.41/mo | $7.89/mo (36% off) | $5.58/mo (55% off) |
| t3.small | $24.82/mo | $15.78/mo (36% off) | $11.16/mo (55% off) |
| t3.medium | $49.64/mo | $31.56/mo (36% off) | $22.32/mo (55% off) |

**When to use**:
- Production workloads with predictable usage
- Break-even point: ~7-8 months

### Backup Costs

**Automated Backups**: $0.085/GB-month
- 1 GB backup = $0.085/month
- Keep 1-7 days of backups

**Manual Snapshots**: $0.085/GB-month (same rate)

**Recommendation**: Keep 1 day of automated backups ($0.085/month) for disaster recovery.

### Data Transfer Costs

**Within Same Region**:
- Application → ElastiCache: **FREE** ✅
- ElastiCache → Application: **FREE** ✅

**Cross-Region**:
- ElastiCache → Internet: $0.09/GB outbound
- **Avoid cross-region** unless absolutely necessary

### Cost Monitoring

**Set up billing alerts**:
```bash
aws cloudwatch put-metric-alarm \
  --alarm-name phb-redis-high-cost \
  --alarm-description "Alert when Redis costs exceed $100/month" \
  --metric-name EstimatedCharges \
  --namespace AWS/Billing \
  --statistic Maximum \
  --period 86400 \
  --evaluation-periods 1 \
  --threshold 100 \
  --comparison-operator GreaterThanThreshold \
  --alarm-actions arn:aws:sns:us-east-1:123456789:billing-alerts
```

---

## 📊 Monitoring & Alerts

### Key Metrics to Monitor

**CloudWatch Metrics** (available by default):
1. **CacheHits / CacheMisses**
   - Target: >90% hit rate
   - Alert if <85%

2. **CPUUtilization**
   - Target: <75%
   - Alert if >80% for 5 minutes

3. **DatabaseMemoryUsagePercentage**
   - Target: <80%
   - Alert if >85%

4. **NetworkBytesIn / NetworkBytesOut**
   - Monitor for unusual spikes

5. **Evictions**
   - Target: 0 evictions
   - Alert if >0 (cache too small)

### CloudWatch Dashboard

**Create custom dashboard**:
```bash
aws cloudwatch put-dashboard \
  --dashboard-name PHB-Redis-Monitoring \
  --dashboard-body file://cloudwatch-dashboard.json
```

**Example dashboard JSON** (`cloudwatch-dashboard.json`):
```json
{
  "widgets": [
    {
      "type": "metric",
      "properties": {
        "metrics": [
          ["AWS/ElastiCache", "CacheHits", {"stat": "Sum"}],
          [".", "CacheMisses", {"stat": "Sum"}]
        ],
        "period": 300,
        "stat": "Sum",
        "region": "us-east-1",
        "title": "Cache Hit/Miss Rate"
      }
    }
  ]
}
```

### Recommended Alarms

**1. Low Cache Hit Rate**:
```bash
aws cloudwatch put-metric-alarm \
  --alarm-name phb-redis-low-hit-rate \
  --alarm-description "Cache hit rate below 85%" \
  --metric-name CacheHitRate \
  --namespace AWS/ElastiCache \
  --statistic Average \
  --period 300 \
  --evaluation-periods 2 \
  --threshold 85 \
  --comparison-operator LessThanThreshold \
  --treat-missing-data notBreaching
```

**2. High CPU**:
```bash
aws cloudwatch put-metric-alarm \
  --alarm-name phb-redis-high-cpu \
  --alarm-description "Redis CPU over 80%" \
  --metric-name CPUUtilization \
  --namespace AWS/ElastiCache \
  --statistic Average \
  --period 300 \
  --evaluation-periods 2 \
  --threshold 80 \
  --comparison-operator GreaterThanThreshold
```

**3. High Memory Usage**:
```bash
aws cloudwatch put-metric-alarm \
  --alarm-name phb-redis-high-memory \
  --alarm-description "Redis memory over 85%" \
  --metric-name DatabaseMemoryUsagePercentage \
  --namespace AWS/ElastiCache \
  --statistic Average \
  --period 300 \
  --evaluation-periods 2 \
  --threshold 85 \
  --comparison-operator GreaterThanThreshold
```

### Application-Level Monitoring

**Add to Django settings.py**:
```python
# Enhanced cache logging
LOGGING = {
    'version': 1,
    'handlers': {
        'cache_performance': {
            'level': 'INFO',
            'class': 'logging.FileHandler',
            'filename': '/var/log/phb/cache_performance.log',
        },
    },
    'loggers': {
        'api.utils.prescription_triage': {
            'handlers': ['cache_performance'],
            'level': 'DEBUG',
        },
    },
}
```

**Monitor cache stats** in your code:
```python
# Add to prescription_triage.py
import time

def get_cache_statistics():
    """Get cache performance stats"""
    # This is already tracked by CloudWatch, but useful for debugging
    total_lookups = cache.get('drug_cache:total_lookups') or 0
    cache_hits = cache.get('drug_cache:hits') or 0
    cache_misses = cache.get('drug_cache:misses') or 0

    hit_rate = (cache_hits / total_lookups * 100) if total_lookups > 0 else 0

    return {
        'total_lookups': total_lookups,
        'cache_hits': cache_hits,
        'cache_misses': cache_misses,
        'hit_rate': f"{hit_rate:.2f}%",
        'db_queries_saved': cache_hits
    }
```

---

## 🔄 Backup & Recovery

### Automated Backups

**Configure automatic snapshots**:
```bash
aws elasticache modify-replication-group \
  --replication-group-id phb-redis-cache \
  --snapshot-retention-limit 7 \
  --snapshot-window "03:00-05:00" \
  --apply-immediately
```

**Settings**:
- **Retention**: 1-7 days (7 days recommended)
- **Window**: Low-traffic hours (e.g., 3-5 AM local time)
- **Cost**: $0.085/GB per snapshot

### Manual Snapshots

**Create manual snapshot**:
```bash
aws elasticache create-snapshot \
  --replication-group-id phb-redis-cache \
  --snapshot-name phb-redis-before-migration-$(date +%Y%m%d)
```

**Restore from snapshot**:
```bash
aws elasticache create-replication-group \
  --replication-group-id phb-redis-restored \
  --snapshot-name phb-redis-before-migration-20251102 \
  --cache-node-type cache.t3.small \
  --num-cache-clusters 2
```

### Disaster Recovery Plan

**Scenario 1: Primary Node Failure**
- **Impact**: Automatic failover to replica (~30-60 seconds)
- **Action**: None required (automatic)
- **RTO**: <2 minutes

**Scenario 2: Regional Outage**
- **Impact**: Complete cache loss
- **Action**: Rebuild cache from database (warm-up period)
- **RTO**: ~5-10 minutes (cache warms up from database queries)

**Scenario 3: Data Corruption**
- **Impact**: Invalid cached data
- **Action**: Flush cache or restore from snapshot
- **RTO**: <5 minutes

**Flush Cache Command**:
```bash
# Connect to Redis
redis-cli -h phb-redis-cache.xxxxx.cache.amazonaws.com

# Flush all keys in database 1 (drug cache)
SELECT 1
FLUSHDB

# Or flush all databases
FLUSHALL
```

---

## 🚦 Deployment Checklist

### Pre-Deployment
- [ ] VPC and subnets configured (minimum 2 AZs)
- [ ] Security groups created (allow port 6379 from app servers)
- [ ] ElastiCache subnet group created
- [ ] IAM permissions configured
- [ ] Budget alerts set up

### Deployment
- [ ] ElastiCache Redis cluster created
- [ ] Primary endpoint obtained
- [ ] `REDIS_URL` environment variable set
- [ ] Application restarted
- [ ] Cache connection verified
- [ ] Cache hit/miss rate monitored

### Post-Deployment
- [ ] CloudWatch alarms configured
- [ ] Dashboard created for monitoring
- [ ] Automated backups enabled (1-7 days)
- [ ] Cost monitoring alerts set
- [ ] Documentation updated with endpoints
- [ ] Team trained on monitoring dashboards

### Testing
- [ ] Cache hit confirmed with test keys
- [ ] Drug lookup performance verified (<5ms)
- [ ] Failover tested (if using replication)
- [ ] Application logs show cache hits
- [ ] No application errors in logs

---

## 🐛 Troubleshooting

### Issue: Cannot Connect to Redis

**Symptoms**:
- Django errors: `ConnectionError: Error connecting to Redis`
- Cache misses = 100%

**Solutions**:
1. **Check security group**:
   ```bash
   aws ec2 describe-security-groups --group-ids sg-xxxxx
   ```
   - Ensure port 6379 is open from application servers

2. **Check VPC configuration**:
   - Application and Redis in same VPC?
   - Route tables configured correctly?

3. **Test connection from app server**:
   ```bash
   telnet phb-redis-cache.xxxxx.cache.amazonaws.com 6379
   # Should connect successfully
   ```

4. **Verify REDIS_URL format**:
   ```bash
   echo $REDIS_URL
   # Should be: redis://endpoint:6379/1
   ```

### Issue: Low Cache Hit Rate (<80%)

**Symptoms**:
- CloudWatch shows high CacheMisses
- Database load still high

**Solutions**:
1. **Check TTL** (cache expiry):
   - Current: 24 hours (86400 seconds)
   - Increase if drug data rarely changes

2. **Monitor evictions**:
   ```bash
   aws cloudwatch get-metric-statistics \
     --namespace AWS/ElastiCache \
     --metric-name Evictions \
     --dimensions Name=CacheClusterId,Value=phb-redis-cache-001 \
     --start-time 2025-11-01T00:00:00Z \
     --end-time 2025-11-02T00:00:00Z \
     --period 3600 \
     --statistics Sum
   ```
   - If evictions >0, cache is too small → upgrade instance

3. **Warm up cache**:
   ```python
   # Pre-load common medications
   from api.models.drug import DrugClassification
   from api.utils.prescription_triage import find_drug_in_database

   common_drugs = DrugClassification.objects.filter(
       is_common=True
   ).values_list('generic_name', flat=True)

   for drug_name in common_drugs:
       find_drug_in_database(drug_name)  # Caches it
   ```

### Issue: High Memory Usage

**Symptoms**:
- DatabaseMemoryUsagePercentage >85%
- Evictions occurring

**Solutions**:
1. **Check cache size**:
   ```bash
   redis-cli -h phb-redis-cache.xxxxx.cache.amazonaws.com INFO memory
   ```

2. **Upgrade instance**:
   ```bash
   aws elasticache modify-replication-group \
     --replication-group-id phb-redis-cache \
     --cache-node-type cache.t3.small \
     --apply-immediately
   ```

3. **Reduce TTL** (if appropriate):
   - Change from 24 hours to 12 hours
   - Update `DRUG_CACHE_TTL` in `prescription_triage.py`

### Issue: Slow Performance

**Symptoms**:
- Cache hits still slow (>10ms)
- High network latency

**Solutions**:
1. **Check network**:
   - Ensure Redis and app in same AZ when possible
   - Use VPC endpoints (PrivateLink) for lower latency

2. **Check instance CPU**:
   ```bash
   aws cloudwatch get-metric-statistics \
     --namespace AWS/ElastiCache \
     --metric-name CPUUtilization \
     --dimensions Name=CacheClusterId,Value=phb-redis-cache-001 \
     --start-time 2025-11-01T00:00:00Z \
     --end-time 2025-11-02T00:00:00Z \
     --period 300 \
     --statistics Average
   ```
   - If CPU >75%, upgrade instance

3. **Enable read replicas**:
   - Offload reads to replica nodes
   - Current setup already has 1 replica

---

## 📚 Additional Resources

### AWS Documentation
- [ElastiCache for Redis User Guide](https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/)
- [Best Practices for Amazon ElastiCache](https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/BestPractices.html)
- [Caching Strategies](https://aws.amazon.com/caching/best-practices/)

### PHB Internal Documentation
- `PRESCRIPTION_SYSTEM_CORRECTIONS_AND_OPTIMIZATIONS.md` - Performance analysis
- `IMPLEMENTATION_STATUS_AND_NEXT_STEPS.md` - System status
- `terraform/redis.tf` - Infrastructure as Code
- `cloudformation/redis-stack.yaml` - CloudFormation template

### Support Contacts
- **AWS Support**: aws-support@phb.ng
- **DevOps Team**: devops@phb.ng
- **On-Call**: +234-xxx-xxx-xxxx

---

## 🎓 Training Materials

### For Developers
1. Understanding Django cache framework
2. Redis basics and data structures
3. Monitoring cache performance
4. Debugging cache issues

### For DevOps
1. ElastiCache deployment and configuration
2. Security best practices
3. Cost optimization strategies
4. Disaster recovery procedures

### For Managers
1. Business value of caching
2. Cost-benefit analysis
3. SLA expectations
4. Scaling strategies

---

**Document Version**: 1.0
**Last Updated**: November 2, 2025
**Owner**: PHB DevOps Team
**Review Date**: February 2, 2026
