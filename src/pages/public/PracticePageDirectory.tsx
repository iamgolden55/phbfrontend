import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Chip,
  CircularProgress,
  Alert,
  Pagination,
  InputAdornment,
  Paper,
  Divider,
} from '@mui/material';
import {
  Search,
  Verified,
  LocationOn,
  LocalHospital,
  TrendingUp,
} from '@mui/icons-material';
import {
  fetchPublicPracticePages,
  PracticePage,
  ServiceType,
} from '../../services/practicePageService';

// ============================================================================
// CONSTANTS
// ============================================================================

const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
  'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
  'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
  'Yobe', 'Zamfara',
];

const PROFESSIONAL_TYPES = [
  { value: 'pharmacist', label: 'Pharmacist' },
  { value: 'doctor', label: 'Doctor' },
  { value: 'nurse', label: 'Nurse' },
];

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface DirectoryState {
  loading: boolean;
  error: string | null;
  pages: PracticePage[];
  total: number;
  currentPage: number;
}

interface Filters {
  search: string;
  serviceType: ServiceType | '';
  state: string;
  city: string;
  professionalType: string;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const PracticePageDirectory: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [state, setState] = useState<DirectoryState>({
    loading: true,
    error: null,
    pages: [],
    total: 0,
    currentPage: 1,
  });

  const [filters, setFilters] = useState<Filters>({
    search: searchParams.get('search') || '',
    serviceType: (searchParams.get('serviceType') as ServiceType) || '',
    state: searchParams.get('state') || '',
    city: searchParams.get('city') || '',
    professionalType: searchParams.get('professionalType') || '',
  });

  // Load pages when filters or page changes
  useEffect(() => {
    loadPages();
  }, [filters, state.currentPage]);

  // Update URL params when filters change
  useEffect(() => {
    const params: Record<string, string> = {};
    if (filters.search) params.search = filters.search;
    if (filters.serviceType) params.serviceType = filters.serviceType;
    if (filters.state) params.state = filters.state;
    if (filters.city) params.city = filters.city;
    if (filters.professionalType) params.professionalType = filters.professionalType;

    setSearchParams(params);
  }, [filters]);

  const loadPages = async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const result = await fetchPublicPracticePages({
        search: filters.search || undefined,
        service_type: filters.serviceType || undefined,
        state: filters.state || undefined,
        city: filters.city || undefined,
        professional_type: filters.professionalType || undefined,
        page: state.currentPage,
      });

      setState((prev) => ({
        ...prev,
        loading: false,
        pages: result.results,
        total: result.count,
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to load practice pages',
      }));
    }
  };

  const handleFilterChange = (field: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setState((prev) => ({ ...prev, currentPage: 1 })); // Reset to page 1 when filters change
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setState((prev) => ({ ...prev, currentPage: page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      serviceType: '',
      state: '',
      city: '',
      professionalType: '',
    });
    setState((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handleCardClick = (slug: string) => {
    navigate(`/practice-pages/${slug}/`);
  };

  // ============================================================================
  // RENDER HELPERS
  // ============================================================================

  const renderFilters = () => (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Search & Filters
      </Typography>

      <Grid container spacing={2}>
        {/* Search */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            placeholder="Search practice pages..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* Service Type */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Service Type</InputLabel>
            <Select
              value={filters.serviceType}
              onChange={(e) => handleFilterChange('serviceType', e.target.value)}
              label="Service Type"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="in_store">In-Store Only</MenuItem>
              <MenuItem value="virtual">Virtual Only</MenuItem>
              <MenuItem value="both">Both</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Professional Type */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Professional Type</InputLabel>
            <Select
              value={filters.professionalType}
              onChange={(e) => handleFilterChange('professionalType', e.target.value)}
              label="Professional Type"
            >
              <MenuItem value="">All</MenuItem>
              {PROFESSIONAL_TYPES.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* State */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>State</InputLabel>
            <Select
              value={filters.state}
              onChange={(e) => handleFilterChange('state', e.target.value)}
              label="State"
            >
              <MenuItem value="">All States</MenuItem>
              {NIGERIAN_STATES.map((stateName) => (
                <MenuItem key={stateName} value={stateName}>
                  {stateName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* City */}
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="City"
            value={filters.city}
            onChange={(e) => handleFilterChange('city', e.target.value)}
          />
        </Grid>
      </Grid>

      {/* Active Filters */}
      {(filters.search ||
        filters.serviceType ||
        filters.state ||
        filters.city ||
        filters.professionalType) && (
        <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Active filters:
          </Typography>
          {filters.search && <Chip label={`Search: "${filters.search}"`} size="small" onDelete={() => handleFilterChange('search', '')} />}
          {filters.serviceType && <Chip label={`Type: ${filters.serviceType}`} size="small" onDelete={() => handleFilterChange('serviceType', '')} />}
          {filters.professionalType && <Chip label={`Professional: ${filters.professionalType}`} size="small" onDelete={() => handleFilterChange('professionalType', '')} />}
          {filters.state && <Chip label={`State: ${filters.state}`} size="small" onDelete={() => handleFilterChange('state', '')} />}
          {filters.city && <Chip label={`City: ${filters.city}`} size="small" onDelete={() => handleFilterChange('city', '')} />}
          <Chip label="Clear all" size="small" color="error" variant="outlined" onClick={handleClearFilters} />
        </Box>
      )}
    </Paper>
  );

  const renderPracticeCard = (page: PracticePage) => (
    <Grid item xs={12} sm={6} md={4} key={page.id}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardActionArea onClick={() => handleCardClick(page.slug)} sx={{ flexGrow: 1 }}>
          <CardContent>
            {/* Header */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                {page.practice_name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {page.tagline}
              </Typography>
            </Box>

            {/* Badges */}
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
              {page.verification_status === 'verified' && (
                <Chip icon={<Verified />} label="Verified" color="success" size="small" />
              )}
              <Chip
                label={
                  page.service_type === 'in_store'
                    ? 'In-Store'
                    : page.service_type === 'virtual'
                    ? 'Virtual'
                    : 'Both'
                }
                size="small"
                variant="outlined"
              />
              {page.is_open_now && <Chip label="Open Now" color="success" size="small" />}
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Details */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocalHospital fontSize="small" color="action" />
                <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                  {page.professional_type} - {page.license_number}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn fontSize="small" color="action" />
                <Typography variant="body2">
                  {page.city}, {page.state}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TrendingUp fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {page.view_count.toLocaleString()} views
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );

  const renderResults = () => {
    if (state.loading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      );
    }

    if (state.error) {
      return (
        <Alert severity="error" sx={{ mb: 3 }}>
          {state.error}
        </Alert>
      );
    }

    if (state.pages.length === 0) {
      return (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" gutterBottom>
            No practice pages found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your filters or search terms
          </Typography>
        </Box>
      );
    }

    const totalPages = Math.ceil(state.total / 10);

    return (
      <>
        {/* Results Summary */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1">
            Found <strong>{state.total.toLocaleString()}</strong> practice page{state.total !== 1 ? 's' : ''}
          </Typography>
        </Box>

        {/* Results Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {state.pages.map((page) => renderPracticeCard(page))}
        </Grid>

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={totalPages}
              page={state.currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
            />
          </Box>
        )}
      </>
    );
  };

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <Box sx={{ p: 3, maxWidth: 1400, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom>
          Practice Pages Directory
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Find verified healthcare professionals and pharmacies across Nigeria
        </Typography>
      </Box>

      {/* Filters */}
      {renderFilters()}

      {/* Results */}
      {renderResults()}
    </Box>
  );
};

export default PracticePageDirectory;
