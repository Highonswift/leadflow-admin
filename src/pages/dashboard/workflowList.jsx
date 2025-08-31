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
  Button,
} from '@mui/material';
import { getWorkflow, createWorkflow } from '../../api/workflowApi';
import { Add } from '@mui/icons-material';
import AddWorkflow from '../../components/dialog/addWorkflow';
import { useNavigate } from 'react-router-dom';

const WorkflowList = () => {
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);
const [dialogOpen, setDialogOpen] = useState(false);
  const [workflowName, setWorkflowName] = useState("Appointment Scheduler");
    const navigate = useNavigate();
  useEffect(() => {
    fetchWorkflows();
  }, []);

  const fetchWorkflows = async () => {
    try {
      const data = await getWorkflow();
      setWorkflows(data);
    } catch (error) {
      console.error('Failed to fetch workflows:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleCreate = async (name) => {
    try {
      // Call API to create workflow
      await createWorkflow({ name });
      fetchWorkflows(); // Refresh list
      setDialogOpen(false);
    } catch (error) {
      console.error('Error creating workflow:', error);
    }
  };
  return (
    <Box sx={{ p: 3 }}>
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3}}>
<Typography variant="h5" fontWeight="bold" mb={3}>
        Workflows
      </Typography>
<Button         onClick={() => setDialogOpen(true)}
> Create</Button>
        </Box>
      
      <Paper elevation={2} sx={{ p: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Step Count</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workflows.map((wf) => (
              <TableRow key={wf.id}  
              hover
                sx={{ cursor: 'pointer' }}
                onClick={() => navigate(`/workflows/${wf.id}`)}
              >
                <TableCell>{wf.name}</TableCell>
                <TableCell>{wf.steps?.length || 0}</TableCell>
                <TableCell>{new Date(wf.createdAt).toLocaleString()}</TableCell>
                <TableCell>{new Date(wf.updatedAt).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {loading && (
          <Typography sx={{ textAlign: 'center', mt: 2 }}>Loading workflows...</Typography>
        )}

        {!loading && workflows.length === 0 && (
          <Typography sx={{ textAlign: 'center', mt: 2 }}>No workflows found</Typography>
        )}
      </Paper>
        <AddWorkflow
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={(name) => handleCreate(name)}
        initialName={workflowName}
      />
    </Box>
    
  );
};

export default WorkflowList;
