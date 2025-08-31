import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
} from '@mui/material';
import { getConversationById } from '../../api/conversationApi';

export default function ConversationDetail() {
  const { id } = useParams();
  const [conversation, setConversation] = useState(null);

  useEffect(() => {
    fetchConversation();
  }, [id]);

  const fetchConversation = async () => {
    try {
      const data = await getConversationById(id);
      setConversation(data.conversation || data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!conversation) return <Typography sx={{ p: 3 }}>Loading...</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" mb={2}>
        Conversation: {conversation.customerName}
      </Typography>

      {/* Summary */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Summary</Typography>
        <Typography>{conversation.summary || 'No summary available'}</Typography>
      </Paper>

      {/* Messages */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" mb={1}>
          Messages
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sender</TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Timestamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {conversation.messages.map((msg) => (
              <TableRow key={msg.id}>
                <TableCell>{msg.sender}</TableCell>
                <TableCell>{msg.content}</TableCell>
                <TableCell>{msg.messageType}</TableCell>
                <TableCell>{new Date(msg.timestamp).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Call Logs */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" mb={1}>
          Call Logs
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Duration (s)</TableCell>
              <TableCell>Cost ($)</TableCell>
              <TableCell>Success</TableCell>
              <TableCell>Started At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {conversation.callLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.duration}</TableCell>
                <TableCell>{log.cost}</TableCell>
                <TableCell>{log.success ? 'Yes' : 'No'}</TableCell>
                <TableCell>{new Date(log.startedAt).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Lead Info */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" mb={1}>
          Lead Info
        </Typography>
        <Typography>Name: {conversation.lead.name}</Typography>
        <Typography>Email: {conversation.lead.email}</Typography>
        <Typography>Phone: {conversation.lead.phone}</Typography>
        <Typography>Status: {conversation.lead.status}</Typography>
      </Paper>
    </Box>
  );
}
