# Women's Health System - Real-Time Testing Guide

## Overview

This comprehensive guide will help you test the Women's Health System with real API integration between the React frontend and Django backend. The system has been completely migrated from mock data to live API calls.

## Prerequisites

Before starting testing, ensure you have:

1. **Backend Server Running**: Django development server on `http://localhost:8000`
2. **Frontend Server Running**: React development server on `http://localhost:3000`
3. **Database Migrations Applied**: All women's health models migrated
4. **User Account**: Test user account in the system

## System Architecture

### Frontend Components Updated
All the following components now use real API calls:
- `WomensHealthDashboardEnhanced.tsx` - Main dashboard with contextual insights
- `CycleCalendar.tsx` - Menstrual cycle tracking calendar
- `DailyHealthLog.tsx` - Daily health logging form
- `FertilityTracker.tsx` - Fertility tracking and ovulation monitoring
- `HealthGoals.tsx` - Health goals creation and tracking
- `PregnancyTracker.tsx` - Pregnancy journey tracking

### API Endpoints Integrated
- **Profile Management**: `/api/womens-health/profile/`
- **Verification**: `/api/womens-health/verify/`
- **Dashboard**: `/api/womens-health/dashboard/`
- **Health Logging**: `/api/womens-health/health-logs/`
- **Cycle Tracking**: `/api/womens-health/cycles/`
- **Fertility Data**: `/api/womens-health/fertility/`
- **Health Goals**: `/api/womens-health/health-goals/`
- **Pregnancy Records**: `/api/womens-health/pregnancy/`

## Testing Process

### Phase 1: Initial Setup and Verification Access

#### Step 1: Start the Servers

```bash
# Terminal 1 - Backend
cd /Users/new/Newphb/basebackend
python manage.py runserver

# Terminal 2 - Frontend  
cd /Users/new/phbfinal/phbfrontend
bun run dev
```

#### Step 2: Create Test User Account

1. Navigate to `http://localhost:3000`
2. Register a new account or use existing credentials
3. Complete the basic onboarding process

#### Step 3: Access Women's Health Verification

1. Go to `/account/womens-health` 
2. **Expected Behavior**: System should prompt for age verification
3. **Test Cases**:
   - Enter age < 13: Should show age restriction message
   - Enter age 13-17: Should show parental consent requirement
   - Enter age ≥ 18: Should proceed to phone verification

#### Step 4: Phone Verification Process

1. Enter a valid phone number (use test number: +1234567890)
2. **Expected Behavior**: 
   - OTP should be sent (check Django console for OTP code)
   - Input field for OTP should appear
3. Enter the OTP from Django console
4. **Expected Result**: Access granted to women's health features

### Phase 2: Dashboard and Profile Testing

#### Step 5: Test Dashboard Loading

1. After verification, dashboard should load automatically
2. **Expected Elements**:
   - Welcome message with user's name
   - Pregnancy status widget (default: "not_pregnant")
   - Quick action buttons (Water, Mood, Exercise, Symptoms)
   - Health insights based on current status
   - Navigation cards for different features

#### Step 6: Test Profile Creation

1. Dashboard should trigger profile creation API call
2. **Backend Verification**:
   ```bash
   # Check Django admin or database
   python manage.py shell
   >>> from womens_health.models import WomensHealthProfile
   >>> profiles = WomensHealthProfile.objects.all()
   >>> print(profiles)
   ```

#### Step 7: Test Quick Actions

**Water Intake Test**:
1. Click "Water" quick action
2. Select glasses of water consumed
3. Click "Save"
4. **Expected**: Success notification, data saved to backend

**Mood Test**:
1. Click "Mood" quick action  
2. Rate mood 1-10
3. Add optional note
4. **Expected**: Mood data logged successfully

**Exercise Test**:
1. Click "Exercise" quick action
2. Enter minutes exercised
3. Select exercise type
4. **Expected**: Exercise data recorded

**Symptoms Test**:
1. Click "Symptoms" quick action
2. Select from available symptoms
3. Add severity ratings
4. **Expected**: Symptoms logged to daily health log

### Phase 3: Detailed Feature Testing

#### Step 8: Daily Health Log Testing

1. Navigate to `/account/womens-health/daily-log`
2. **Test Form Fields**:
   - Date selection (should default to today)
   - Symptom checkboxes (multiple selection)
   - Mood slider (1-10 scale)
   - Energy level slider (1-10 scale)
   - Sleep duration (hours)
   - Sleep quality (1-5 scale)
   - Exercise minutes
   - Water intake (liters)
   - Notes textarea

3. **Submit Test**:
   - Fill all fields with sample data
   - Click "Save Daily Log"
   - **Expected**: Success message, form reset, data in backend

4. **Backend Verification**:
   ```bash
   python manage.py shell
   >>> from womens_health.models import DailyHealthLog
   >>> logs = DailyHealthLog.objects.all()
   >>> print(f"Found {logs.count()} health logs")
   >>> if logs.exists():
   ...     latest = logs.latest('created_at')
   ...     print(f"Latest log: {latest.date}, Mood: {latest.mood}")
   ```

#### Step 9: Cycle Calendar Testing

1. Navigate to `/account/womens-health/cycle`
2. **Expected Loading**:
   - Profile data loads (cycle length, last period)
   - Calendar generates with 42 days (6 weeks)
   - Month navigation works
   - Legend shows color coding

3. **Test Calendar Interaction**:
   - Click on different dates
   - **Expected**: Selected day details panel appears
   - Period days should show in red
   - Fertile window in green tones
   - Today highlighted in blue

4. **Backend Verification**:
   ```bash
   python manage.py shell
   >>> from womens_health.models import MenstrualCycle
   >>> cycles = MenstrualCycle.objects.all()
   >>> print(f"Found {cycles.count()} cycles")
   ```

#### Step 10: Fertility Tracker Testing

1. Navigate to `/account/womens-health/fertility`
2. **Test Data Loading**:
   - Fertility window calculations
   - Ovulation predictions
   - Algorithm accuracy display

3. **Test Tabs**:
   - **Overview**: Fertility calendar with color coding
   - **Temperature**: Basal body temperature logging
   - **Cervical Mucus**: Mucus type tracking
   - **Tests**: Ovulation test results
   - **Symptoms**: Fertility-related symptoms

4. **Test Temperature Logging**:
   - Click "Log Temperature" 
   - Enter temperature reading
   - **Expected**: Data saved, appears in temperature list

5. **Backend Verification**:
   ```bash
   python manage.py shell
   >>> from womens_health.models import FertilityTracking
   >>> fertility_data = FertilityTracking.objects.all()
   >>> print(f"Found {fertility_data.count()} fertility entries")
   ```

#### Step 11: Health Goals Testing

1. Navigate to `/account/womens-health/goals`
2. **Test Goal Creation**:
   - Click "Add New Goal"
   - Select from templates (Steps, Meditation, Vitamins, Nutrition)
   - Customize target value
   - Click "Add Goal"
   - **Expected**: Goal created, appears in goals list

3. **Test Goal Updating**:
   - Click "+1 unit" quick action on any goal
   - **Expected**: Progress updates immediately
   - Click "Full Update" for detailed update modal
   - Enter new progress value and note
   - **Expected**: Goal progress and notes updated

4. **Test Goal Categories**:
   - Filter by category (fitness, nutrition, wellness, reproductive)
   - **Expected**: Goals filtered correctly

5. **Backend Verification**:
   ```bash
   python manage.py shell
   >>> from womens_health.models import HealthGoal
   >>> goals = HealthGoal.objects.all()
   >>> print(f"Found {goals.count()} health goals")
   >>> for goal in goals:
   ...     print(f"Goal: {goal.title}, Progress: {goal.current_value}/{goal.target_value}")
   ```

#### Step 12: Pregnancy Tracker Testing (For Pregnant Users)

1. **Set Pregnancy Status**:
   - Go to dashboard
   - Change pregnancy status to "pregnant" in profile
   - Set pregnancy week (e.g., 24)

2. Navigate to `/account/womens-health/pregnancy/tracker`
3. **Test Pregnancy Features**:
   - Pregnancy progress bar
   - Baby development information
   - Kick counter functionality
   - Weekly tips and changes

4. **Test Pregnancy Logging**:
   - Enter current weight
   - Record belly circumference
   - Log symptoms
   - Rate mood
   - Enter exercise minutes
   - Check prenatal vitamins
   - Add notes
   - Click "Save Today's Tracking"

5. **Backend Verification**:
   ```bash
   python manage.py shell
   >>> from womens_health.models import PregnancyRecord
   >>> pregnancy_data = PregnancyRecord.objects.all()
   >>> print(f"Found {pregnancy_data.count()} pregnancy records")
   ```

### Phase 4: Error Handling and Edge Cases

#### Step 13: Test Error States

1. **Network Disconnection Test**:
   - Disconnect internet
   - Try to submit any form
   - **Expected**: Error notification with retry option

2. **Invalid Data Test**:
   - Enter negative values where inappropriate
   - Submit empty required fields
   - **Expected**: Proper validation messages

3. **Backend Downtime Test**:
   - Stop Django server
   - Try to load any page
   - **Expected**: Loading state, then error message with retry

#### Step 14: Test Loading States

1. **Slow Network Simulation**:
   - Use browser dev tools to throttle network
   - Navigate between pages
   - **Expected**: Loading spinners, skeleton screens

2. **Large Data Sets**:
   - Create multiple records (goals, logs, cycles)
   - Test pagination and performance
   - **Expected**: Smooth loading, no freezing

### Phase 5: Integration and Data Flow Testing

#### Step 15: Cross-Component Data Consistency

1. **Dashboard Sync Test**:
   - Log symptoms in Daily Health Log
   - Check if dashboard insights update
   - **Expected**: Contextual insights reflect logged data

2. **Profile Updates Test**:
   - Change pregnancy status in profile
   - Navigate to different components
   - **Expected**: All components reflect new status

3. **Goal Progress Test**:
   - Update health goals
   - Check dashboard for goal progress
   - **Expected**: Dashboard shows current goal status

#### Step 16: Multi-Day Testing

1. **Date Progression Test**:
   - Log data for multiple days
   - Change date in daily log
   - **Expected**: Historical data preserved, new entries created

2. **Cycle Progression Test**:
   - Log cycle data over multiple days
   - Check calendar updates
   - **Expected**: Cycle patterns emerge, predictions improve

### Phase 6: User Experience Testing

#### Step 17: Mobile Responsiveness

1. **Mobile View Test**:
   - Test all components on mobile viewport
   - **Expected**: Responsive design, no overflow
   - Touch interactions work properly

2. **Tablet View Test**:
   - Test on tablet-sized viewport
   - **Expected**: Layout adapts appropriately

#### Step 18: Accessibility Testing

1. **Keyboard Navigation**:
   - Navigate using only keyboard
   - **Expected**: All interactive elements accessible

2. **Screen Reader Test**:
   - Use screen reader software
   - **Expected**: Proper labels and descriptions

### Phase 7: Performance and Security Testing

#### Step 19: Performance Testing

1. **API Response Times**:
   - Monitor network tab in browser
   - **Expected**: API calls < 500ms for simple operations

2. **Memory Usage**:
   - Monitor browser memory during navigation
   - **Expected**: No memory leaks

#### Step 20: Security Testing

1. **Authentication Test**:
   - Try accessing routes without login
   - **Expected**: Redirect to login

2. **Authorization Test**:
   - Try accessing women's health without verification
   - **Expected**: Verification flow required

3. **Data Validation Test**:
   - Send malformed data to APIs
   - **Expected**: Proper error handling

## Troubleshooting Common Issues

### Backend Issues

1. **Database Connection Error**:
   ```bash
   python manage.py migrate
   python manage.py runserver
   ```

2. **CORS Issues**:
   - Check `CORS_ALLOWED_ORIGINS` in Django settings
   - Ensure frontend URL is allowed

3. **API 500 Errors**:
   - Check Django console for error details
   - Verify model relationships are correctly set up

### Frontend Issues

1. **API Connection Failed**:
   - Check `utils/config.ts` for correct backend URL
   - Verify backend server is running

2. **Authentication Errors**:
   - Clear localStorage and re-login
   - Check token expiration

3. **Component Not Loading**:
   - Check browser console for JavaScript errors
   - Verify imports and routing

### Data Issues

1. **No Data Showing**:
   - Create test data in Django admin
   - Verify API endpoints return data

2. **Outdated Data**:
   - Check caching mechanisms
   - Hard refresh browser (Ctrl+F5)

## Expected Test Results

After completing all tests, you should have:

1. **✅ User Account**: Properly authenticated and verified
2. **✅ Profile Data**: WomensHealthProfile created with user preferences
3. **✅ Health Logs**: Daily health data recorded and retrievable
4. **✅ Cycle Data**: Menstrual cycle information tracked
5. **✅ Fertility Data**: Ovulation and fertility metrics logged
6. **✅ Health Goals**: Personal goals created and progress tracked
7. **✅ Pregnancy Data**: Pregnancy journey recorded (if applicable)
8. **✅ Error Handling**: Graceful error states and recovery
9. **✅ Performance**: Responsive and fast user experience
10. **✅ Security**: Proper authentication and authorization

## API Testing with Postman/Insomnia

For advanced testing, you can also test the APIs directly:

### Authentication Headers
```javascript
{
  "Authorization": "Bearer YOUR_JWT_TOKEN",
  "Content-Type": "application/json"
}
```

### Sample API Calls

1. **Get Profile**:
   ```
   GET http://localhost:8000/api/womens-health/profile/
   ```

2. **Create Health Log**:
   ```
   POST http://localhost:8000/api/womens-health/health-logs/
   Body: {
     "date": "2024-01-15",
     "symptoms_experienced": ["headache", "fatigue"],
     "mood": "good",
     "energy_level": "high"
   }
   ```

3. **Create Health Goal**:
   ```
   POST http://localhost:8000/api/womens-health/health-goals/
   Body: {
     "title": "Daily Steps",
     "category": "fitness",
     "target_value": 10000,
     "unit": "steps",
     "frequency": "daily"
   }
   ```

## Conclusion

This comprehensive testing guide ensures that the Women's Health System is fully functional with real API integration. The system has been successfully migrated from mock data to live backend communication, providing a complete end-to-end healthcare management experience.

For any issues encountered during testing, check the troubleshooting section or examine the browser console and Django server logs for detailed error information.