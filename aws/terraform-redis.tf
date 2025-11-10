# PHB Redis Cache Infrastructure - Terraform Configuration
# Version: 1.0
# Last Updated: November 2, 2025

terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Optional: Store state in S3
  # backend "s3" {
  #   bucket = "phb-terraform-state"
  #   key    = "redis/terraform.tfstate"
  #   region = "us-east-1"
  # }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "PHB"
      ManagedBy   = "Terraform"
      Environment = var.environment
      Service     = "Redis-Cache"
    }
  }
}

# ==================== VARIABLES ====================

variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string
  default     = "production"
}

variable "vpc_id" {
  description = "VPC ID where Redis will be deployed"
  type        = string
}

variable "subnet_ids" {
  description = "List of subnet IDs for Redis (minimum 2, different AZs)"
  type        = list(string)
}

variable "app_security_group_id" {
  description = "Security group ID of application servers"
  type        = string
}

variable "cache_node_type" {
  description = "ElastiCache node type"
  type        = string
  default     = "cache.t3.small"  # Change to t3.micro for dev, t3.medium for large prod
}

variable "num_cache_clusters" {
  description = "Number of cache clusters (primary + replicas)"
  type        = number
  default     = 2  # 1 primary + 1 replica
}

variable "snapshot_retention_limit" {
  description = "Days to retain automated backups (0-35)"
  type        = number
  default     = 1  # 1 day retention (can increase to 7 for prod)
}

variable "auth_token" {
  description = "Redis AUTH token for authentication (optional, leave empty for no auth)"
  type        = string
  default     = ""
  sensitive   = true
}

variable "enable_encryption" {
  description = "Enable encryption at-rest and in-transit"
  type        = bool
  default     = false  # Set true for production
}

# ==================== DATA SOURCES ====================

data "aws_vpc" "selected" {
  id = var.vpc_id
}

# ==================== SUBNET GROUP ====================

resource "aws_elasticache_subnet_group" "phb_redis" {
  name       = "phb-redis-subnet-${var.environment}"
  description = "PHB Redis Cache Subnet Group - ${var.environment}"
  subnet_ids = var.subnet_ids

  tags = {
    Name = "phb-redis-subnet-${var.environment}"
  }
}

# ==================== SECURITY GROUP ====================

resource "aws_security_group" "redis" {
  name        = "phb-redis-${var.environment}"
  description = "Security group for PHB Redis cache"
  vpc_id      = var.vpc_id

  # Inbound: Allow Redis port from application servers
  ingress {
    description     = "Redis port from application servers"
    from_port       = 6379
    to_port         = 6379
    protocol        = "tcp"
    security_groups = [var.app_security_group_id]
  }

  # Outbound: Allow all (Redis typically doesn't initiate connections)
  egress {
    description = "Allow all outbound"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "phb-redis-${var.environment}"
  }
}

# ==================== PARAMETER GROUP ====================

resource "aws_elasticache_parameter_group" "phb_redis" {
  name   = "phb-redis-params-${var.environment}"
  family = "redis7"  # Use redis7 for latest features

  description = "PHB Redis parameter group - ${var.environment}"

  # Optimize for caching workload
  parameter {
    name  = "maxmemory-policy"
    value = "allkeys-lru"  # Evict least recently used keys when memory full
  }

  parameter {
    name  = "timeout"
    value = "300"  # Close idle connections after 5 minutes
  }

  # Optional: Enable notifications for evicted keys (useful for monitoring)
  # parameter {
  #   name  = "notify-keyspace-events"
  #   value = "Ex"  # x = expired events
  # }

  tags = {
    Name = "phb-redis-params-${var.environment}"
  }
}

# ==================== ELASTICACHE REPLICATION GROUP ====================

resource "aws_elasticache_replication_group" "phb_redis" {
  replication_group_id       = "phb-redis-${var.environment}"
  replication_group_description = "PHB Drug Database Cache - ${var.environment}"

  # Engine configuration
  engine               = "redis"
  engine_version       = "7.1"  # Latest stable version
  port                 = 6379
  parameter_group_name = aws_elasticache_parameter_group.phb_redis.name

  # Cluster configuration
  node_type            = var.cache_node_type
  num_cache_clusters   = var.num_cache_clusters

  # High availability
  automatic_failover_enabled = var.num_cache_clusters > 1 ? true : false
  multi_az_enabled          = var.num_cache_clusters > 1 ? true : false

  # Network configuration
  subnet_group_name  = aws_elasticache_subnet_group.phb_redis.name
  security_group_ids = [aws_security_group.redis.id]

  # Encryption (optional, recommended for production)
  at_rest_encryption_enabled = var.enable_encryption
  transit_encryption_enabled = var.enable_encryption
  auth_token                 = var.enable_encryption ? var.auth_token : null

  # Backup configuration
  snapshot_retention_limit = var.snapshot_retention_limit
  snapshot_window          = "03:00-05:00"  # UTC, adjust for your timezone

  # Maintenance window (Sunday 5-6 AM UTC, adjust for your timezone)
  maintenance_window = "sun:05:00-sun:06:00"

  # Notifications (optional)
  # notification_topic_arn = aws_sns_topic.redis_notifications.arn

  # Auto minor version upgrades (disable for production to control upgrades)
  auto_minor_version_upgrade = var.environment == "dev" ? true : false

  # Lifecycle
  apply_immediately = var.environment == "dev" ? true : false

  tags = {
    Name        = "phb-redis-${var.environment}"
    Environment = var.environment
    Purpose     = "Drug Database Cache"
  }
}

# ==================== CLOUDWATCH ALARMS ====================

# Alarm: Low Cache Hit Rate
resource "aws_cloudwatch_metric_alarm" "cache_hit_rate_low" {
  alarm_name          = "phb-redis-${var.environment}-low-hit-rate"
  alarm_description   = "Cache hit rate below 85%"
  comparison_operator = "LessThanThreshold"
  evaluation_periods  = 2
  metric_name         = "CacheHitRate"
  namespace           = "AWS/ElastiCache"
  period              = 300
  statistic           = "Average"
  threshold           = 85
  treat_missing_data  = "notBreaching"

  dimensions = {
    ReplicationGroupId = aws_elasticache_replication_group.phb_redis.id
  }

  alarm_actions = []  # Add SNS topic ARN for notifications

  tags = {
    Name = "phb-redis-${var.environment}-cache-hit-rate"
  }
}

# Alarm: High CPU
resource "aws_cloudwatch_metric_alarm" "cpu_high" {
  alarm_name          = "phb-redis-${var.environment}-high-cpu"
  alarm_description   = "Redis CPU utilization over 80%"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 2
  metric_name         = "CPUUtilization"
  namespace           = "AWS/ElastiCache"
  period              = 300
  statistic           = "Average"
  threshold           = 80

  dimensions = {
    ReplicationGroupId = aws_elasticache_replication_group.phb_redis.id
  }

  alarm_actions = []  # Add SNS topic ARN for notifications

  tags = {
    Name = "phb-redis-${var.environment}-cpu"
  }
}

# Alarm: High Memory Usage
resource "aws_cloudwatch_metric_alarm" "memory_high" {
  alarm_name          = "phb-redis-${var.environment}-high-memory"
  alarm_description   = "Redis memory usage over 85%"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 2
  metric_name         = "DatabaseMemoryUsagePercentage"
  namespace           = "AWS/ElastiCache"
  period              = 300
  statistic           = "Average"
  threshold           = 85

  dimensions = {
    ReplicationGroupId = aws_elasticache_replication_group.phb_redis.id
  }

  alarm_actions = []  # Add SNS topic ARN for notifications

  tags = {
    Name = "phb-redis-${var.environment}-memory"
  }
}

# Alarm: Evictions Occurring
resource "aws_cloudwatch_metric_alarm" "evictions" {
  alarm_name          = "phb-redis-${var.environment}-evictions"
  alarm_description   = "Redis evicting keys (cache too small)"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 1
  metric_name         = "Evictions"
  namespace           = "AWS/ElastiCache"
  period              = 300
  statistic           = "Sum"
  threshold           = 0

  dimensions = {
    ReplicationGroupId = aws_elasticache_replication_group.phb_redis.id
  }

  alarm_actions = []  # Add SNS topic ARN for notifications

  tags = {
    Name = "phb-redis-${var.environment}-evictions"
  }
}

# ==================== OUTPUTS ====================

output "redis_primary_endpoint" {
  description = "Redis primary endpoint address"
  value       = aws_elasticache_replication_group.phb_redis.primary_endpoint_address
}

output "redis_port" {
  description = "Redis port"
  value       = aws_elasticache_replication_group.phb_redis.port
}

output "redis_url" {
  description = "Full Redis URL for REDIS_URL environment variable"
  value       = "redis://${aws_elasticache_replication_group.phb_redis.primary_endpoint_address}:${aws_elasticache_replication_group.phb_redis.port}/1"
  sensitive   = false
}

output "redis_security_group_id" {
  description = "Security group ID for Redis"
  value       = aws_security_group.redis.id
}

output "redis_replication_group_id" {
  description = "ElastiCache replication group ID"
  value       = aws_elasticache_replication_group.phb_redis.id
}

# ==================== EXAMPLE USAGE ====================

# terraform init
# terraform plan -var-file="environments/production.tfvars"
# terraform apply -var-file="environments/production.tfvars"

# Example tfvars file (environments/production.tfvars):
# aws_region             = "us-east-1"
# environment            = "production"
# vpc_id                 = "vpc-xxxxx"
# subnet_ids             = ["subnet-xxxxx", "subnet-yyyyy"]
# app_security_group_id  = "sg-xxxxx"
# cache_node_type        = "cache.t3.small"
# num_cache_clusters     = 2
# snapshot_retention_limit = 7
# enable_encryption      = true
# auth_token             = "YourSecureRandomToken123!"
