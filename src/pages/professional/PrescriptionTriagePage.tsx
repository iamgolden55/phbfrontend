import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  TextField,
  MenuItem,
  Grid,
  Card,
  CardContent,
  IconButton,
  Pagination,
  Badge,
} from '@mui/material';
import {
  Visibility as ViewIcon,
  LocalPharmacy as PharmacyIcon,
  Assignment as AssignmentIcon,
  TrendingUp as TrendingUpIcon,
  PendingActions as PendingIcon,
  CheckCircle as ApprovedIcon,
  Warning as UrgentIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import {
  fetchPharmacistTriageRequests,
  getPharmacistStatistics,
  type PharmacistPrescriptionRequest,
  type PharmacistStatistics,
  type PharmacistTriageResponse,
} from '../../features/health/prescriptionsService';
import PrescriptionTriageModal from '../../components/professional/PrescriptionTriageModal';
import { format, parseISO } from 'date-fns';
import { useProfessionalAuth } from '../../features/professional/professionalAuthContext';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`triage-tabpanel-${index}`}
      aria-labelledby={`triage-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function PrescriptionTriagePage() {
  const { professionalUser, hasAccess } = useProfessionalAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [requests, setRequests] = useState<PharmacistPrescriptionRequest[]>([]);
  const [statistics, setStatistics] = useState<PharmacistStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<PharmacistPrescriptionRequest | null>(null);

  // Check if user is a pharmacist
  const isPharmacist = hasAccess(['pharmacist']);

  // Filters
  const [urgencyFilter, setUrgencyFilter] = useState<'all' | 'routine' | 'urgent'>('all');
  const [triageFilter, setTriageFilter] = useState<string>('all');
  const [reviewedFilter, setReviewedFilter] = useState<'all' | 'true' | 'false'>('false');

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const perPage = 20;

  // Stats for current view
  const [awaitingReview, setAwaitingReview] = useState(0);
  const [reviewedToday, setReviewedToday] = useState(0);
  const [urgentPending, setUrgentPending] = useState(0);

  useEffect(() => {
    loadStatistics();
  }, []);

  useEffect(() => {
    loadRequests();
  }, [activeTab, urgencyFilter, triageFilter, reviewedFilter, page]);

  const loadStatistics = async () => {
    try {
      const stats = await getPharmacistStatistics();
      setStatistics(stats);
    } catch (err) {
      console.error('Error loading statistics:', err);
    }
  };

  const loadRequests = async () => {
    try {
      setLoading(true);
      setError(null);

      // Determine status filter based on active tab
      let statusFilter: 'REQUESTED' | 'APPROVED' | 'REJECTED' | 'ALL' = 'ALL';
      if (activeTab === 0) statusFilter = 'REQUESTED'; // Awaiting Review
      else if (activeTab === 1) statusFilter = 'APPROVED'; // Reviewed (approved)
      else if (activeTab === 2) statusFilter = 'ALL'; // All

      const filters: any = {
        status: statusFilter,
      };

      if (urgencyFilter !== 'all') {
        filters.urgency = urgencyFilter;
      }

      if (triageFilter !== 'all') {
        filters.triage_category = triageFilter;
      }

      if (reviewedFilter !== 'all') {
        filters.reviewed = reviewedFilter === 'true';
      }

      const response: PharmacistTriageResponse = await fetchPharmacistTriageRequests(
        filters,
        page,
        perPage
      );

      setRequests(response.requests);
      setTotalCount(response.total_count);
      setAwaitingReview(response.stats.awaiting_review);
      setReviewedToday(response.stats.reviewed_today);
      setUrgentPending(response.stats.urgent_pending);

      if (response.pagination) {
        setTotalPages(response.pagination.total_pages);
      }

      setLoading(false);
    } catch (err: any) {
      setError(err.message || 'Failed to load prescription requests');
      setLoading(false);
    }
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    setPage(1); // Reset to first page when changing tabs
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);

  const handleViewRequest = (request: PharmacistPrescriptionRequest) => {
    setSelectedRequest(request);
    setSelectedRequestId(request.id);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedRequestId(null);
    setSelectedRequest(null);
  };

  const handleActionComplete = () => {
    // Reload requests and statistics after an action is completed
    loadRequests();
    loadStatistics();
  };

  const getUrgencyColor = (urgency: 'routine' | 'urgent') => {
    return urgency === 'urgent' ? 'error' : 'default';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'REQUESTED':
        return 'warning';
      case 'APPROVED':
        return 'success';
      case 'REJECTED':
        return 'error';
      default:
        return 'default';
    }
  };

  const getReviewActionColor = (action?: string) => {
    switch (action) {
      case 'approved':
        return 'success';
      case 'escalated':
        return 'warning';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMM dd, yyyy HH:mm');
    } catch {
      return dateString;
    }
  };

  // Show access denied if not a pharmacist
  if (!isPharmacist) {
    return (
      <Container maxWidth="md" sx={{ mt: 8, mb: 4 }}>
        <Paper sx={{ p: 6, textAlign: 'center' }}>
          <PharmacyIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            Pharmacist Access Only
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            This page is only accessible to registered clinical pharmacists.
            The prescription triage system allows pharmacists to review and manage
            prescription requests assigned to them.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Current role: <strong>{professionalUser?.role || 'Unknown'}</strong>
          </Typography>
          <Alert severity="info" sx={{ mt: 3 }}>
            If you are a pharmacist and seeing this message, please contact your system
            administrator to ensure your account has the correct permissions.
          </Alert>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <PharmacyIcon fontSize="large" />
          Pharmacist Triage Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Review and manage prescription requests assigned to you
        </Typography>
      </Box>

      {/* Statistics Cards */}
      {statistics && (
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary" variant="body2">
                      Awaiting Review
                    </Typography>
                    <Typography variant="h4">{awaitingReview}</Typography>
                  </Box>
                  <Badge badgeContent={urgentPending} color="error">
                    <PendingIcon fontSize="large" color="warning" />
                  </Badge>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary" variant="body2">
                      Reviewed Today
                    </Typography>
                    <Typography variant="h4">{reviewedToday}</Typography>
                  </Box>
                  <ApprovedIcon fontSize="large" color="success" />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary" variant="body2">
                      Approval Rate
                    </Typography>
                    <Typography variant="h4">{statistics.approval_rate.toFixed(1)}%</Typography>
                  </Box>
                  <TrendingUpIcon fontSize="large" color="primary" />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary" variant="body2">
                      Avg Review Time
                    </Typography>
                    <Typography variant="h4">
                      {statistics.average_review_time_minutes.toFixed(0)}m
                    </Typography>
                  </Box>
                  <AssignmentIcon fontSize="large" color="info" />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab
            label={
              <Badge badgeContent={awaitingReview} color="warning">
                Awaiting Review
              </Badge>
            }
          />
          <Tab
            label={
              <Badge badgeContent={reviewedToday} color="success">
                Reviewed
              </Badge>
            }
          />
          <Tab label="All Requests" />
        </Tabs>
      </Paper>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <FilterIcon />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              select
              fullWidth
              label="Urgency"
              value={urgencyFilter}
              onChange={(e) => setUrgencyFilter(e.target.value as any)}
              size="small"
            >
              <MenuItem value="all">All Urgency Levels</MenuItem>
              <MenuItem value="routine">Routine</MenuItem>
              <MenuItem value="urgent">Urgent</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              select
              fullWidth
              label="Triage Category"
              value={triageFilter}
              onChange={(e) => setTriageFilter(e.target.value)}
              size="small"
            >
              <MenuItem value="all">All Categories</MenuItem>
              <MenuItem value="ROUTINE_REPEAT">Routine Repeat</MenuItem>
              <MenuItem value="ROUTINE_NEW">Routine New</MenuItem>
              <MenuItem value="URGENT_REPEAT">Urgent Repeat</MenuItem>
              <MenuItem value="URGENT_NEW">Urgent New</MenuItem>
              <MenuItem value="COMPLEX_CASE">Complex Case</MenuItem>
              <MenuItem value="CONTROLLED_SUBSTANCE">Controlled Substance</MenuItem>
              <MenuItem value="SPECIALIST_REQUIRED">Specialist Required</MenuItem>
              <MenuItem value="HIGH_RISK">High Risk</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              select
              fullWidth
              label="Review Status"
              value={reviewedFilter}
              onChange={(e) => setReviewedFilter(e.target.value as any)}
              size="small"
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="false">Not Reviewed</MenuItem>
              <MenuItem value="true">Reviewed</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Paper>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Loading State */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Requests Table */}
      {!loading && (
        <TabPanel value={activeTab} index={activeTab}>
          {requests.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                No prescription requests found
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {activeTab === 0
                  ? 'No requests are currently awaiting your review'
                  : activeTab === 1
                  ? 'No requests have been reviewed yet'
                  : 'No requests match your current filters'}
              </Typography>
            </Paper>
          ) : (
            <>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Reference</TableCell>
                      <TableCell>Patient</TableCell>
                      <TableCell>Request Date</TableCell>
                      <TableCell>Urgency</TableCell>
                      <TableCell>Triage Category</TableCell>
                      <TableCell>Medications</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Review Action</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {requests.map((request) => (
                      <TableRow key={request.id} hover>
                        <TableCell>
                          <Typography variant="body2" fontWeight="bold">
                            {request.request_reference}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{request.patient_name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {request.patient_hpn}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {formatDate(request.request_date)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={request.urgency.toUpperCase()}
                            color={getUrgencyColor(request.urgency)}
                            size="small"
                            icon={request.urgency === 'urgent' ? <UrgentIcon /> : undefined}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={request.triage_category?.replace(/_/g, ' ') || 'N/A'}
                            variant="outlined"
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {request.medications.length} medication(s)
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={request.status}
                            color={getStatusColor(request.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          {request.pharmacist_review_action ? (
                            <Chip
                              label={request.pharmacist_review_action.toUpperCase()}
                              color={getReviewActionColor(request.pharmacist_review_action)}
                              size="small"
                            />
                          ) : (
                            <Typography variant="caption" color="text.secondary">
                              Pending
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          <IconButton
                            color="primary"
                            onClick={() => handleViewRequest(request)}
                            size="small"
                          >
                            <ViewIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Pagination */}
              {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(_e, value) => setPage(value)}
                    color="primary"
                  />
                </Box>
              )}
            </>
          )}
        </TabPanel>
      )}

      {/* Triage Modal */}
      <PrescriptionTriageModal
        open={modalOpen}
        requestId={selectedRequestId}
        onClose={handleModalClose}
        onActionComplete={handleActionComplete}
      />
    </Container>
  );
}
