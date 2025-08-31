import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { getLeads } from '../../api/leads';

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const data = await getLeads();
      setLeads(data);
    } catch (error) {
      console.error('Failed to fetch leads:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Leads
      </Typography>

      <Paper elevation={2} sx={{ p: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>{lead.name}</TableCell>
                <TableCell>{lead.email || '-'}</TableCell>
                <TableCell>{lead.phone || '-'}</TableCell>
                <TableCell>{lead.status}</TableCell>
                <TableCell>{new Date(lead.createdAt).toLocaleString()}</TableCell>
                <TableCell>{new Date(lead.updatedAt).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {loading && (
          <Typography sx={{ textAlign: 'center', mt: 2 }}>Loading leads...</Typography>
        )}

        {!loading && leads.length === 0 && (
          <Typography sx={{ textAlign: 'center', mt: 2 }}>No leads found</Typography>
        )}
      </Paper>
    </Box>
  );
};

export default Leads;
