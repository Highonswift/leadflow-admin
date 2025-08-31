import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import AddAssistantDialog from "../../components/dialog/addAssistant";
import { fetchAssistants, createAssistant } from "../../api/assistantApi";

export default function Assistant() {
  const [assistants, setAssistants] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadAssistants();
  }, []);

  const loadAssistants = async () => {
    try {
      const {data} = await fetchAssistants();
      
      setAssistants(data);
    } catch (error) {
      console.error("Failed to fetch assistants:", error);
    }
  };

  const handleCreate = async (formData) => {
    try {
      await createAssistant(formData);
      loadAssistants();
      setOpen(false);
    } catch (error) {
      console.error("Error creating assistant:", error);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 3
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Assistants
        </Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add New Assistant
        </Button>
      </Box>

      <Paper elevation={2} sx={{ padding: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Language</TableCell>
              <TableCell>Voice</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assistants.map((a) => (
              <TableRow key={a.id}>
                <TableCell>{a.name}</TableCell>
                <TableCell>{a.type}</TableCell>
                <TableCell>{a.language}</TableCell>
                <TableCell>{a.voice}</TableCell>
                <TableCell>{a.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {assistants.length === 0 && (
          <Typography sx={{ textAlign: "center", padding: 2 }}>
            No assistants found
          </Typography>
        )}
      </Paper>

      <AddAssistantDialog open={open} onClose={() => setOpen(false)} onCreate={handleCreate} />
    </Box>
  );
}
