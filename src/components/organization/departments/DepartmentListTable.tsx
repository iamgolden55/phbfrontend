/**
 * DepartmentListTable Component
 *
 * Displays departments in a sortable, interactive table with actions.
 * Supports selection, inline status indicators, and row actions.
 *
 * @author AI Assistant
 * @date December 2025
 */

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Checkbox,
  IconButton,
  Chip,
  Tooltip,
  Typography,
  Box
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Info as InfoIcon,
  ToggleOn as ToggleOnIcon,
  ToggleOff as ToggleOffIcon,
  Warning as WarningIcon,
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage
} from '@mui/icons-material';
import {
  Department,
  DepartmentSortField,
  SortOrder,
  DEPARTMENT_TYPE_LABELS,
  getDepartmentCategory
} from '../../../types/department';

interface DepartmentListTableProps {
  departments: Department[];
  loading?: boolean;
  selectedIds: number[];
  onSelect: (departmentIds: number[]) => void;
  onEdit: (department: Department) => void;
  onDeactivate: (department: Department) => void;
  onReactivate: (department: Department) => void;
  onViewDetail: (department: Department) => void;
  sortField: DepartmentSortField;
  sortOrder: SortOrder;
  onSort: (field: DepartmentSortField) => void;
  // Pagination props
  page?: number;
  rowsPerPage?: number;
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (rowsPerPage: number) => void;
}

/**
 * DepartmentListTable
 *
 * Features:
 * - Sortable columns
 * - Row selection with checkboxes
 * - Status indicators (active/inactive, understaffed)
 * - Action buttons (edit, deactivate/reactivate, view details)
 * - Bed utilization indicators for clinical departments
 */
const DepartmentListTable: React.FC<DepartmentListTableProps> = ({
  departments,
  loading = false,
  selectedIds,
  onSelect,
  onEdit,
  onDeactivate,
  onReactivate,
  onViewDetail,
  sortField,
  sortOrder,
  onSort,
  page = 0,
  rowsPerPage = 10,
  onPageChange,
  onRowsPerPageChange
}) => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  // Handle select all checkbox
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      onSelect(departments.map(d => d.id));
    } else {
      onSelect([]);
    }
  };

  // Handle individual row selection
  const handleSelectRow = (departmentId: number) => {
    if (selectedIds.includes(departmentId)) {
      onSelect(selectedIds.filter(id => id !== departmentId));
    } else {
      onSelect([...selectedIds, departmentId]);
    }
  };

  // Handle sort column click
  const handleSortClick = (field: DepartmentSortField) => {
    onSort(field);
  };

  // Get bed utilization color
  const getBedUtilizationColor = (rate: number): 'success' | 'warning' | 'error' => {
    if (rate < 70) return 'success';
    if (rate < 85) return 'warning';
    return 'error';
  };

  // Format bed info
  const formatBedInfo = (department: Department): string => {
    if (!department.total_beds || department.total_beds === 0) {
      return 'N/A';
    }
    return `${department.occupied_beds || 0}/${department.total_beds}`;
  };

  const isAllSelected = departments.length > 0 && selectedIds.length === departments.length;
  const isSomeSelected = selectedIds.length > 0 && selectedIds.length < departments.length;

  // Pagination calculations
  const totalPages = Math.ceil(departments.length / rowsPerPage);
  const startIndex = page * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, departments.length);
  const paginatedDepartments = departments.slice(startIndex, endIndex);

  // Pagination handlers
  const handleFirstPage = () => onPageChange?.(0);
  const handlePreviousPage = () => onPageChange?.(Math.max(0, page - 1));
  const handleNextPage = () => onPageChange?.(Math.min(totalPages - 1, page + 1));
  const handleLastPage = () => onPageChange?.(totalPages - 1);
  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onRowsPerPageChange?.(parseInt(event.target.value, 10));
    onPageChange?.(0);
  };

  if (loading) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography>Loading departments...</Typography>
      </Box>
    );
  }

  if (departments.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="text.secondary">
          No departments found. Create your first department to get started.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
        <Table sx={{ minWidth: 1000 }}>
        <TableHead>
          <TableRow sx={{ bgcolor: 'grey.50' }}>
            {/* Select All Checkbox */}
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={isSomeSelected}
                checked={isAllSelected}
                onChange={handleSelectAll}
                inputProps={{ 'aria-label': 'select all departments' }}
              />
            </TableCell>

            {/* Department Name */}
            <TableCell>
              <TableSortLabel
                active={sortField === 'name'}
                direction={sortField === 'name' ? sortOrder : 'asc'}
                onClick={() => handleSortClick('name')}
              >
                Department
              </TableSortLabel>
            </TableCell>

            {/* Code */}
            <TableCell>
              <TableSortLabel
                active={sortField === 'code'}
                direction={sortField === 'code' ? sortOrder : 'asc'}
                onClick={() => handleSortClick('code')}
              >
                Code
              </TableSortLabel>
            </TableCell>

            {/* Type */}
            <TableCell>
              <TableSortLabel
                active={sortField === 'department_type'}
                direction={sortField === 'department_type' ? sortOrder : 'asc'}
                onClick={() => handleSortClick('department_type')}
              >
                Type
              </TableSortLabel>
            </TableCell>

            {/* Category */}
            <TableCell>Category</TableCell>

            {/* Beds */}
            <TableCell align="center">
              <TableSortLabel
                active={sortField === 'total_beds'}
                direction={sortField === 'total_beds' ? sortOrder : 'asc'}
                onClick={() => handleSortClick('total_beds')}
              >
                Beds
              </TableSortLabel>
            </TableCell>

            {/* Staff */}
            <TableCell align="center">
              <TableSortLabel
                active={sortField === 'current_staff_count'}
                direction={sortField === 'current_staff_count' ? sortOrder : 'asc'}
                onClick={() => handleSortClick('current_staff_count')}
              >
                Staff
              </TableSortLabel>
            </TableCell>

            {/* Status */}
            <TableCell align="center">
              <TableSortLabel
                active={sortField === 'is_active'}
                direction={sortField === 'is_active' ? sortOrder : 'asc'}
                onClick={() => handleSortClick('is_active')}
              >
                Status
              </TableSortLabel>
            </TableCell>

            {/* Actions */}
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {paginatedDepartments.map((department) => {
            const isSelected = selectedIds.includes(department.id);
            const isHovered = hoveredRow === department.id;
            const category = getDepartmentCategory(department.department_type);

            return (
              <TableRow
                key={department.id}
                hover
                selected={isSelected}
                onMouseEnter={() => setHoveredRow(department.id)}
                onMouseLeave={() => setHoveredRow(null)}
                sx={{
                  cursor: 'pointer',
                  bgcolor: !department.is_active ? 'grey.50' : undefined,
                  opacity: !department.is_active ? 0.7 : 1
                }}
              >
                {/* Selection Checkbox */}
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected}
                    onChange={() => handleSelectRow(department.id)}
                    inputProps={{ 'aria-label': `select ${department.name}` }}
                  />
                </TableCell>

                {/* Department Name */}
                <TableCell onClick={() => onViewDetail(department)}>
                  <Box>
                    <Typography variant="body2" fontWeight={500}>
                      {department.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {department.floor_number} • {department.wing.charAt(0).toUpperCase() + department.wing.slice(1)} Wing
                    </Typography>
                  </Box>
                </TableCell>

                {/* Code */}
                <TableCell>
                  <Typography variant="body2" fontFamily="monospace">
                    {department.code}
                  </Typography>
                </TableCell>

                {/* Type */}
                <TableCell>
                  <Typography variant="body2" noWrap>
                    {DEPARTMENT_TYPE_LABELS[department.department_type]}
                  </Typography>
                </TableCell>

                {/* Category */}
                <TableCell>
                  <Chip
                    label={category}
                    size="small"
                    color={
                      category === 'Clinical' ? 'primary' :
                      category === 'Support' ? 'secondary' :
                      'default'
                    }
                    sx={{ fontWeight: 500 }}
                  />
                </TableCell>

                {/* Beds */}
                <TableCell align="center">
                  {department.is_clinical && department.total_beds > 0 ? (
                    <Box>
                      <Typography variant="body2">
                        {formatBedInfo(department)}
                      </Typography>
                      {department.bed_utilization_rate > 0 && (
                        <Chip
                          label={`${Math.round(department.bed_utilization_rate)}%`}
                          size="small"
                          color={getBedUtilizationColor(department.bed_utilization_rate)}
                          sx={{ height: 20, fontSize: '0.7rem', mt: 0.5 }}
                        />
                      )}
                    </Box>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      N/A
                    </Typography>
                  )}
                </TableCell>

                {/* Staff */}
                <TableCell align="center">
                  <Box>
                    <Typography variant="body2">
                      {department.current_staff_count || 0}
                    </Typography>
                    {department.is_understaffed && (
                      <Tooltip title="Understaffed - below minimum required">
                        <WarningIcon
                          fontSize="small"
                          color="warning"
                          sx={{ fontSize: '1rem', ml: 0.5 }}
                        />
                      </Tooltip>
                    )}
                  </Box>
                </TableCell>

                {/* Status */}
                <TableCell align="center">
                  <Chip
                    label={department.is_active ? 'Active' : 'Inactive'}
                    size="small"
                    color={department.is_active ? 'success' : 'default'}
                    variant={department.is_active ? 'filled' : 'outlined'}
                  />
                </TableCell>

                {/* Actions */}
                <TableCell align="right">
                  <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
                    {/* View Details */}
                    <Tooltip title="View Details">
                      <IconButton
                        size="small"
                        onClick={() => onViewDetail(department)}
                        sx={{ opacity: isHovered ? 1 : 0.7 }}
                      >
                        <InfoIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    {/* Edit */}
                    <Tooltip title="Edit Department">
                      <IconButton
                        size="small"
                        onClick={() => onEdit(department)}
                        sx={{ opacity: isHovered ? 1 : 0.7 }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    {/* Deactivate/Reactivate */}
                    {department.is_active ? (
                      <Tooltip title="Deactivate Department">
                        <IconButton
                          size="small"
                          onClick={() => onDeactivate(department)}
                          sx={{ opacity: isHovered ? 1 : 0.7 }}
                          color="error"
                        >
                          <ToggleOffIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Reactivate Department">
                        <IconButton
                          size="small"
                          onClick={() => onReactivate(department)}
                          sx={{ opacity: isHovered ? 1 : 0.7 }}
                          color="success"
                        >
                          <ToggleOnIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>

      {/* Enhanced Pagination */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 3,
          py: 2,
          borderTop: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper'
        }}
      >
        {/* Rows per page selector */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Rows per page:
          </Typography>
          <select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            style={{
              padding: '4px 8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </Box>

        {/* Page info */}
        <Typography variant="body2" color="text.secondary">
          Showing {startIndex + 1}-{endIndex} of {departments.length} departments
        </Typography>

        {/* Pagination controls */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            size="small"
            onClick={handleFirstPage}
            disabled={page === 0}
            sx={{
              '&:hover': { bgcolor: 'action.hover' },
              '&:disabled': { opacity: 0.4, cursor: 'not-allowed' }
            }}
          >
            <FirstPage fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            onClick={handlePreviousPage}
            disabled={page === 0}
            sx={{
              '&:hover': { bgcolor: 'action.hover' },
              '&:disabled': { opacity: 0.4, cursor: 'not-allowed' }
            }}
          >
            <ChevronLeft fontSize="small" />
          </IconButton>

          {/* Page numbers */}
          <Box sx={{ display: 'flex', gap: 0.5, mx: 1 }}>
            {[...Array(totalPages)].map((_, index) => {
              // Show first page, last page, current page, and pages around current
              const shouldShow =
                index === 0 ||
                index === totalPages - 1 ||
                (index >= page - 1 && index <= page + 1);

              if (!shouldShow) {
                // Show ellipsis for gaps
                if (index === page - 2 || index === page + 2) {
                  return (
                    <Typography
                      key={index}
                      variant="body2"
                      sx={{ px: 1, color: 'text.secondary' }}
                    >
                      ...
                    </Typography>
                  );
                }
                return null;
              }

              return (
                <Box
                  key={index}
                  onClick={() => onPageChange?.(index)}
                  sx={{
                    minWidth: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 1,
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: page === index ? 600 : 400,
                    bgcolor: page === index ? 'primary.main' : 'transparent',
                    color: page === index ? 'primary.contrastText' : 'text.primary',
                    '&:hover': {
                      bgcolor: page === index ? 'primary.dark' : 'action.hover'
                    },
                    transition: 'all 0.2s'
                  }}
                >
                  {index + 1}
                </Box>
              );
            })}
          </Box>

          <IconButton
            size="small"
            onClick={handleNextPage}
            disabled={page >= totalPages - 1}
            sx={{
              '&:hover': { bgcolor: 'action.hover' },
              '&:disabled': { opacity: 0.4, cursor: 'not-allowed' }
            }}
          >
            <ChevronRight fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            onClick={handleLastPage}
            disabled={page >= totalPages - 1}
            sx={{
              '&:hover': { bgcolor: 'action.hover' },
              '&:disabled': { opacity: 0.4, cursor: 'not-allowed' }
            }}
          >
            <LastPage fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default DepartmentListTable;
