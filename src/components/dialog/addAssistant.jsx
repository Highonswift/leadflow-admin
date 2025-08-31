import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Box,
  Grid
} from "@mui/material";

const AssistantTypes = [
  { value: "text", label: "Text" },
  { value: "voice", label: "Voice" },
];

const Languages = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
];

const Voices = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

export default function AddAssistantDialog({ open, onClose, onCreate }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "text",
    voice: "",
    language: "en",
    status: "active",
    prompt: "",
    displayName: "",
    displaySubname: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const { displayName, displaySubname, prompt, ...rest } = formData;
  const payload = {
    ...rest,
    settings: {
      displayName,
      displaySubname,
      prompt,
    },
  };

  onCreate(payload);
    setFormData({
      name: "",
      description: "",
      type: "text",
      voice: "",
      language: "en",
      status: "active",
      prompt: "",
      displayName: "",
      displaySubname: "",
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Assistant</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <TextField
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
          />
         <Grid container spacing={2}>
  {/* Type */}
  <Grid size={6}>
    <TextField
      select
      name="type"
      label="Type"
      value={formData.type}
      onChange={handleChange}
      fullWidth
    >
      {AssistantTypes.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  </Grid>

  {/* Language */}
  <Grid size={6}>
    <TextField
      select
      name="language"
      label="Language"
      value={formData.language}
      onChange={handleChange}
      fullWidth
    >
      {Languages.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  </Grid>

  {/* Voice (only if type = voice) */}
  {formData.type === "voice" && (
    <Grid size={6}>
      <TextField
        select
        name="voice"
        label="Voice"
        value={formData.voice}
        onChange={handleChange}
        fullWidth
      >
        {Voices.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Grid>
  )}

  {/* Display Name */}
  <Grid size={6}>
    <TextField
      name="displayName"
      label="Display Name"
      value={formData.displayName}
      onChange={handleChange}
      fullWidth
    />
  </Grid>

  {/* Display Subname */}
  <Grid size={6}>
    <TextField
      name="displaySubname"
      label="Display Subname"
      value={formData.displaySubname}
      onChange={handleChange}
      fullWidth
    />
  </Grid>
</Grid>

          <TextField
            name="prompt"
            label="Prompt"
            value={formData.prompt}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
          />
       
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
