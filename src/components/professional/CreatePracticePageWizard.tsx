import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Alert,
  Grid,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { ArrowBack, ArrowForward, Save, Add, Delete } from '@mui/icons-material';
import {
  CreatePracticePageRequest,
  ServiceType,
  createPracticePage,
  generateSlugFromName,
} from '../../services/practicePageService';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface WizardFormData extends CreatePracticePageRequest {
  // Additional UI-only fields
}

interface CreatePracticePageWizardProps {
  onSuccess?: (pageSlug: string) => void;
  onCancel?: () => void;
}

const STEPS = [
  'Basic Information',
  'Contact & Location',
  'Services & Pricing',
  'About & Credentials',
  'Review & Publish',
];

const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
  'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
  'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
  'Yobe', 'Zamfara',
];

const DAYS_OF_WEEK = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const CreatePracticePageWizard: React.FC<CreatePracticePageWizardProps> = ({
  onSuccess,
  onCancel,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Step 3 input states (for services, payment methods, languages)
  const [newService, setNewService] = useState('');
  const [newPaymentMethod, setNewPaymentMethod] = useState('');
  const [newLanguage, setNewLanguage] = useState('');

  // Form data state
  const [formData, setFormData] = useState<WizardFormData>({
    practice_name: '',
    slug: '',
    tagline: '',
    about: '',
    service_type: 'in_store',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    postcode: '',
    country: 'Nigeria',
    latitude: undefined,
    longitude: undefined,
    phone: '',
    email: '',
    website: '',
    whatsapp_number: '',
    opening_hours: {},
    services_offered: [],
    payment_methods: [],
    languages_spoken: [],
    is_published: false,
  });

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Update form data
  const updateFormData = (field: keyof WizardFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Auto-generate slug when practice name changes
    if (field === 'practice_name') {
      const slug = generateSlugFromName(value as string);
      setFormData((prev) => ({ ...prev, slug }));
    }

    // Clear error for this field
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  // Navigation handlers
  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prev) => prev + 1);
      setError(null);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
    setError(null);
  };

  // Validation
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 0: // Basic Information
        if (!formData.practice_name.trim()) {
          newErrors.practice_name = 'Practice name is required';
        }
        if (!formData.tagline.trim()) {
          newErrors.tagline = 'Tagline is required';
        }
        break;

      case 1: // Contact & Location
        if (formData.service_type === 'in_store' || formData.service_type === 'both') {
          if (!formData.address_line_1?.trim()) {
            newErrors.address_line_1 = 'Address is required for in-store services';
          }
          if (!formData.city?.trim()) {
            newErrors.city = 'City is required for in-store services';
          }
          if (!formData.state?.trim()) {
            newErrors.state = 'State is required for in-store services';
          }
        }
        if (formData.service_type === 'virtual' || formData.service_type === 'both') {
          if (!formData.phone?.trim() && !formData.email?.trim() && !formData.online_booking_url?.trim()) {
            newErrors.phone = 'At least one contact method required for virtual services';
          }
        }
        break;

      case 2: // Services & Pricing (optional)
        break;

      case 3: // About & Credentials (optional)
        break;

      case 4: // Review (no validation, just submit)
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await createPracticePage(formData);

      if (result.success) {
        if (onSuccess) {
          onSuccess(result.page.slug);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create practice page');
    } finally {
      setLoading(false);
    }
  };

  // Render current step
  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return renderBasicInformation();
      case 1:
        return renderContactLocation();
      case 2:
        return renderServicesPricing();
      case 3:
        return renderAboutCredentials();
      case 4:
        return renderReview();
      default:
        return null;
    }
  };

  // ============================================================================
  // STEP 1: BASIC INFORMATION
  // ============================================================================

  const renderBasicInformation = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Basic Information
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Tell us about your practice. This information will be visible to patients.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Practice Name *"
            value={formData.practice_name}
            onChange={(e) => updateFormData('practice_name', e.target.value)}
            error={!!errors.practice_name}
            helperText={errors.practice_name || 'E.g., "Golden Pharmacy Abuja"'}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="URL Slug"
            value={formData.slug}
            onChange={(e) => updateFormData('slug', e.target.value)}
            helperText="Auto-generated from practice name. You can customize it."
            InputProps={{
              startAdornment: <Typography sx={{ mr: 1 }}>/practice-pages/</Typography>,
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Tagline *"
            value={formData.tagline}
            onChange={(e) => updateFormData('tagline', e.target.value)}
            error={!!errors.tagline}
            helperText={errors.tagline || 'Short description (max 160 characters)'}
            inputProps={{ maxLength: 160 }}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Service Type *</InputLabel>
            <Select
              value={formData.service_type}
              onChange={(e) => updateFormData('service_type', e.target.value as ServiceType)}
              label="Service Type *"
            >
              <MenuItem value="in_store">In-Store/Walk-In Service Only</MenuItem>
              <MenuItem value="virtual">Virtual Service Only</MenuItem>
              <MenuItem value="both">Both In-Store and Virtual</MenuItem>
            </Select>
            <FormHelperText>
              Choose how you provide services
            </FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );

  // ============================================================================
  // STEP 2: CONTACT & LOCATION
  // ============================================================================

  const renderContactLocation = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Contact & Location
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {formData.service_type === 'in_store' || formData.service_type === 'both'
          ? 'Provide your physical location and contact details.'
          : 'Provide your virtual contact details.'}
      </Typography>

      <Grid container spacing={3}>
        {/* Physical Location - only show for in_store or both */}
        {(formData.service_type === 'in_store' || formData.service_type === 'both') && (
          <>
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                Physical Location
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address Line 1 *"
                value={formData.address_line_1}
                onChange={(e) => updateFormData('address_line_1', e.target.value)}
                error={!!errors.address_line_1}
                helperText={errors.address_line_1 || 'Street address, building number'}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address Line 2"
                value={formData.address_line_2}
                onChange={(e) => updateFormData('address_line_2', e.target.value)}
                helperText="Apartment, suite, floor (optional)"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="City *"
                value={formData.city}
                onChange={(e) => updateFormData('city', e.target.value)}
                error={!!errors.city}
                helperText={errors.city}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.state}>
                <InputLabel>State *</InputLabel>
                <Select
                  value={formData.state}
                  onChange={(e) => updateFormData('state', e.target.value)}
                  label="State *"
                >
                  {NIGERIAN_STATES.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </Select>
                {errors.state && <FormHelperText>{errors.state}</FormHelperText>}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Postcode"
                value={formData.postcode}
                onChange={(e) => updateFormData('postcode', e.target.value)}
                helperText="Optional"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Country"
                value={formData.country}
                disabled
                helperText="Nigeria"
              />
            </Grid>
          </>
        )}

        {/* Contact Information */}
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ mb: 2, mt: 2, fontWeight: 600 }}>
            Contact Information
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Phone Number"
            value={formData.phone}
            onChange={(e) => updateFormData('phone', e.target.value)}
            error={!!errors.phone}
            helperText={errors.phone || 'E.g., +2348012345678'}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            helperText="For patient inquiries"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="WhatsApp Number"
            value={formData.whatsapp_number}
            onChange={(e) => updateFormData('whatsapp_number', e.target.value)}
            helperText="Optional"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Website"
            value={formData.website}
            onChange={(e) => updateFormData('website', e.target.value)}
            helperText="Optional"
          />
        </Grid>

        {/* Opening Hours - only show for in_store or both */}
        {(formData.service_type === 'in_store' || formData.service_type === 'both') && (
          <>
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ mb: 2, mt: 2, fontWeight: 600 }}>
                Opening Hours (Optional)
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Set your pharmacy's opening hours for each day of the week
              </Typography>
            </Grid>

            {DAYS_OF_WEEK.map((day) => (
              <Grid item xs={12} key={day}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography sx={{ width: '100px', textTransform: 'capitalize' }}>
                    {day}:
                  </Typography>
                  <TextField
                    size="small"
                    type="time"
                    label="Open"
                    value={formData.opening_hours?.[day]?.open || ''}
                    onChange={(e) => {
                      const hours = { ...formData.opening_hours };
                      if (!hours[day]) hours[day] = { open: '', close: '', closed: false };
                      hours[day].open = e.target.value;
                      updateFormData('opening_hours', hours);
                    }}
                    sx={{ width: '150px' }}
                    InputLabelProps={{ shrink: true }}
                  />
                  <Typography>to</Typography>
                  <TextField
                    size="small"
                    type="time"
                    label="Close"
                    value={formData.opening_hours?.[day]?.close || ''}
                    onChange={(e) => {
                      const hours = { ...formData.opening_hours };
                      if (!hours[day]) hours[day] = { open: '', close: '', closed: false };
                      hours[day].close = e.target.value;
                      updateFormData('opening_hours', hours);
                    }}
                    sx={{ width: '150px' }}
                    InputLabelProps={{ shrink: true }}
                  />
                  <Button
                    size="small"
                    variant={formData.opening_hours?.[day]?.closed ? 'contained' : 'outlined'}
                    onClick={() => {
                      const hours = { ...formData.opening_hours };
                      if (!hours[day]) hours[day] = { open: '', close: '', closed: false };
                      hours[day].closed = !hours[day].closed;
                      if (hours[day].closed) {
                        hours[day].open = '';
                        hours[day].close = '';
                      }
                      updateFormData('opening_hours', hours);
                    }}
                  >
                    Closed
                  </Button>
                </Box>
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </Box>
  );

  // ============================================================================
  // STEP 3: SERVICES & PRICING
  // ============================================================================

  const renderServicesPricing = () => {
    const addService = () => {
      if (newService.trim()) {
        updateFormData('services_offered', [...(formData.services_offered || []), newService.trim()]);
        setNewService('');
      }
    };

    const removeService = (index: number) => {
      const updated = [...(formData.services_offered || [])];
      updated.splice(index, 1);
      updateFormData('services_offered', updated);
    };

    const addPaymentMethod = () => {
      if (newPaymentMethod.trim()) {
        updateFormData('payment_methods', [...(formData.payment_methods || []), newPaymentMethod.trim()]);
        setNewPaymentMethod('');
      }
    };

    const removePaymentMethod = (index: number) => {
      const updated = [...(formData.payment_methods || [])];
      updated.splice(index, 1);
      updateFormData('payment_methods', updated);
    };

    const addLanguage = () => {
      if (newLanguage.trim()) {
        updateFormData('languages_spoken', [...(formData.languages_spoken || []), newLanguage.trim()]);
        setNewLanguage('');
      }
    };

    const removeLanguage = (index: number) => {
      const updated = [...(formData.languages_spoken || [])];
      updated.splice(index, 1);
      updateFormData('languages_spoken', updated);
    };

    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          Services & Pricing
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Tell patients what services you offer and how they can pay.
        </Typography>

        <Grid container spacing={3}>
          {/* Services Offered */}
          <Grid item xs={12}>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
              Services Offered
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                fullWidth
                label="Add a service"
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addService()}
                helperText="E.g., Prescription Dispensing, Health Consultations"
              />
              <IconButton onClick={addService} color="primary" sx={{ mt: 1 }}>
                <Add />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {formData.services_offered?.map((service, index) => (
                <Chip
                  key={index}
                  label={service}
                  onDelete={() => removeService(index)}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
          </Grid>

          {/* Payment Methods */}
          <Grid item xs={12}>
            <Typography variant="subtitle2" sx={{ mb: 2, mt: 2, fontWeight: 600 }}>
              Payment Methods
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                fullWidth
                label="Add payment method"
                value={newPaymentMethod}
                onChange={(e) => setNewPaymentMethod(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addPaymentMethod()}
                helperText="E.g., Cash, Card, Bank Transfer"
              />
              <IconButton onClick={addPaymentMethod} color="primary" sx={{ mt: 1 }}>
                <Add />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {formData.payment_methods?.map((method, index) => (
                <Chip
                  key={index}
                  label={method}
                  onDelete={() => removePaymentMethod(index)}
                  color="secondary"
                  variant="outlined"
                />
              ))}
            </Box>
          </Grid>

          {/* Languages Spoken */}
          <Grid item xs={12}>
            <Typography variant="subtitle2" sx={{ mb: 2, mt: 2, fontWeight: 600 }}>
              Languages Spoken
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                fullWidth
                label="Add language"
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addLanguage()}
                helperText="E.g., English, Yoruba, Hausa"
              />
              <IconButton onClick={addLanguage} color="primary" sx={{ mt: 1 }}>
                <Add />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {formData.languages_spoken?.map((language, index) => (
                <Chip
                  key={index}
                  label={language}
                  onDelete={() => removeLanguage(index)}
                  color="success"
                  variant="outlined"
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  };

  // ============================================================================
  // STEP 4: ABOUT & CREDENTIALS
  // ============================================================================

  const renderAboutCredentials = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        About & Credentials
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Tell patients about your practice and what makes you unique.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={6}
            label="About Your Practice"
            value={formData.about}
            onChange={(e) => updateFormData('about', e.target.value)}
            helperText="Describe your practice, specialties, experience, and what makes you unique (recommended: 200-500 words)"
          />
        </Grid>

        <Grid item xs={12}>
          <Alert severity="info">
            Your professional credentials (license number, qualifications, etc.) will be automatically included from your verified PHB registration.
          </Alert>
        </Grid>
      </Grid>
    </Box>
  );

  // ============================================================================
  // STEP 5: REVIEW & PUBLISH
  // ============================================================================

  const renderReview = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Review & Publish
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Review your practice page details before publishing.
      </Typography>

      <Card variant="outlined">
        <CardContent>
          {/* Basic Info */}
          <Typography variant="h6" sx={{ mb: 2 }}>
            {formData.practice_name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {formData.tagline}
          </Typography>
          <Chip
            label={formData.service_type === 'in_store' ? 'In-Store Only' : formData.service_type === 'virtual' ? 'Virtual Only' : 'Both In-Store & Virtual'}
            size="small"
            sx={{ mb: 3 }}
          />

          <Divider sx={{ my: 2 }} />

          {/* Location */}
          {(formData.service_type === 'in_store' || formData.service_type === 'both') && (
            <>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Location
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                {formData.address_line_1}
                {formData.address_line_2 && `, ${formData.address_line_2}`}
                <br />
                {formData.city}, {formData.state} {formData.postcode}
              </Typography>
              <Divider sx={{ my: 2 }} />
            </>
          )}

          {/* Contact */}
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Contact
          </Typography>
          <List dense>
            {formData.phone && (
              <ListItem>
                <ListItemText primary={`Phone: ${formData.phone}`} />
              </ListItem>
            )}
            {formData.email && (
              <ListItem>
                <ListItemText primary={`Email: ${formData.email}`} />
              </ListItem>
            )}
            {formData.whatsapp_number && (
              <ListItem>
                <ListItemText primary={`WhatsApp: ${formData.whatsapp_number}`} />
              </ListItem>
            )}
            {formData.website && (
              <ListItem>
                <ListItemText primary={`Website: ${formData.website}`} />
              </ListItem>
            )}
          </List>

          <Divider sx={{ my: 2 }} />

          {/* Services */}
          {formData.services_offered && formData.services_offered.length > 0 && (
            <>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Services Offered
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {formData.services_offered.map((service, index) => (
                  <Chip key={index} label={service} size="small" />
                ))}
              </Box>
            </>
          )}

          {/* Payment Methods */}
          {formData.payment_methods && formData.payment_methods.length > 0 && (
            <>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Payment Methods
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {formData.payment_methods.map((method, index) => (
                  <Chip key={index} label={method} size="small" color="secondary" />
                ))}
              </Box>
            </>
          )}

          {/* Languages */}
          {formData.languages_spoken && formData.languages_spoken.length > 0 && (
            <>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Languages Spoken
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {formData.languages_spoken.map((language, index) => (
                  <Chip key={index} label={language} size="small" color="success" />
                ))}
              </Box>
            </>
          )}

          <Divider sx={{ my: 2 }} />

          {/* About */}
          {formData.about && (
            <>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                About
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, whiteSpace: 'pre-wrap' }}>
                {formData.about}
              </Typography>
            </>
          )}
        </CardContent>
      </Card>

      <Alert severity="info" sx={{ mt: 3 }}>
        Your practice page will be submitted for verification. Once approved by PHB admins, it will be visible to patients.
      </Alert>
    </Box>
  );

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <Box sx={{ width: '100%', maxWidth: 1000, mx: 'auto', py: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Create Practice Page
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Set up your professional practice page to be discovered by patients
          </Typography>

          {/* Stepper */}
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {STEPS.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Error Display */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          {/* Step Content */}
          <Box sx={{ mb: 4 }}>{renderStep()}</Box>

          {/* Navigation Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              startIcon={<ArrowBack />}
            >
              Back
            </Button>

            <Box sx={{ display: 'flex', gap: 2 }}>
              {onCancel && (
                <Button onClick={onCancel} variant="outlined">
                  Cancel
                </Button>
              )}

              {activeStep === STEPS.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={loading}
                  startIcon={<Save />}
                >
                  {loading ? 'Creating...' : 'Create Practice Page'}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  endIcon={<ArrowForward />}
                >
                  Next
                </Button>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
