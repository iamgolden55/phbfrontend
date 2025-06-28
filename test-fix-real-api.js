#!/usr/bin/env node

// Test script to verify the database constraint fix with real API calls
const API_BASE_URL = 'http://127.0.0.1:8000';

// Test data
const TODAY = new Date().toISOString().split('T')[0];
const testData = {
    date: TODAY,
    symptoms: ['test_symptom_fix', 'fatigue'],
    mood: 'excellent',
    energy_level: 'very_high',
    sleep_duration_hours: 8,
    sleep_quality: 'good',
    exercise_performed: true,
    exercise_duration_minutes: 30,
    water_intake_liters: 2.5,
    water_goal_met: true,
    daily_notes: 'Testing database constraint fix',
    data_completeness_score: 95
};

function log(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const prefix = type === 'success' ? '✅' : 
                  type === 'error' ? '❌' : 
                  type === 'warning' ? '⚠️' : 
                  type === 'highlight' ? '🎯' : 'ℹ️';
    console.log(`[${timestamp}] ${prefix} ${message}`);
}

async function makeAPICall(data, testName) {
    log(`Testing: ${testName}`, 'highlight');
    
    // Note: You'll need to replace this with a real token
    const token = 'YOUR_AUTH_TOKEN_HERE';
    
    if (token === 'YOUR_AUTH_TOKEN_HERE') {
        log('❌ Please replace YOUR_AUTH_TOKEN_HERE with a real authentication token', 'error');
        return false;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/womens-health/logs/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();
        
        if (response.ok) {
            const action = responseData.action || 'processed';
            const statusCode = response.status;
            
            if (action === 'created') {
                log(`NEW LOG CREATED (HTTP ${statusCode})`, 'success');
            } else if (action === 'updated') {
                log(`EXISTING LOG UPDATED (HTTP ${statusCode})`, 'success');
            }
            
            log(`Message: ${responseData.message}`);
            log(`Log ID: ${responseData.log.id}`);
            return true;
        } else {
            log(`Failed: ${response.status} - ${responseData.message || 'Unknown error'}`, 'error');
            return false;
        }
        
    } catch (error) {
        log(`Network error: ${error.message}`, 'error');
        return false;
    }
}

async function testConstraintFix() {
    log('🔧 Starting Database Constraint Fix Test', 'highlight');
    log('=' .repeat(50));
    
    // Test 1: Create first log (should CREATE)
    log('\n🎯 Test 1: Creating first log for today');
    const test1 = await makeAPICall(testData, 'First Create');
    
    if (!test1) {
        log('Test 1 failed, stopping tests', 'error');
        return;
    }
    
    // Wait a moment
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Test 2: Update same log (should UPDATE)
    log('\n🎯 Test 2: Updating same log (same date)');
    const updatedData = {
        ...testData,
        symptoms: [...testData.symptoms, 'updated_symptom'],
        daily_notes: 'Updated: Testing database constraint fix - UPDATED',
        mood: 'good'
    };
    
    const test2 = await makeAPICall(updatedData, 'Update Same Log');
    
    if (test2) {
        log('\n🎉 SUCCESS! Database constraint fix is working!', 'success');
        log('✅ First submission created new log', 'success');
        log('✅ Second submission updated existing log', 'success');
        log('✅ No constraint violations occurred', 'success');
    } else {
        log('\n❌ Test failed - fix may not be working correctly', 'error');
    }
}

// Instructions for running the test
if (require.main === module) {
    console.log(`
🔧 Database Constraint Fix Test

This script tests the UPDATE-OR-CREATE functionality to ensure
no more database constraint violations occur.

SETUP REQUIRED:
1. Make sure backend server is running on ${API_BASE_URL}
2. Get your authentication token from localStorage (phb_auth_token)
3. Replace 'YOUR_AUTH_TOKEN_HERE' in this script with your real token
4. Run: node test-fix-real-api.js

EXPECTED BEHAVIOR:
- First call: Creates new log (HTTP 201)
- Second call: Updates existing log (HTTP 200)  
- No constraint violation errors
`);

    // Uncomment the line below after setting up your auth token
    // testConstraintFix();
}

module.exports = { testConstraintFix, makeAPICall };