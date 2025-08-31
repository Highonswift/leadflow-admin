import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getConversations } from '../../api/conversationApi';

export default function ConversationsList() {
  const [conversations, setConversations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const data = await getConversations();
      setConversations(data.conversations || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" mb={3}>
        Conversations
      </Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Source</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {conversations.map((conv) => (
              <TableRow
                key={conv.id}
                hover
                sx={{ cursor: 'pointer' }}
                onClick={() => navigate(`/conversation/${conv.id}`)}
              >
                <TableCell>{conv.customerName}</TableCell>
                <TableCell>{conv.customerEmail || '-'}</TableCell>
                <TableCell>{conv.type}</TableCell>
                <TableCell>{conv.status}</TableCell>
                <TableCell>{conv.source}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {conversations.length === 0 && (
          <Typography sx={{ textAlign: 'center', p: 2 }}>
            No conversations found
          </Typography>
        )}
      </Paper>
    </Box>
  );
}
