import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  CircularProgress,
  Paper,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import { ContentCopy } from "@mui/icons-material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { fetchAssistantById } from "../../api/assistantApi";

export default function AssistantDetail() {
  const { id } = useParams();
  const [assistant, setAssistant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const baseUrl = import.meta.env.VITE_BOT_URL || "http://localhost:5000";

  useEffect(() => {
    loadAssistant();
    // eslint-disable-next-line
  }, []);

  const loadAssistant = async () => {
    try {
      const { data } = await fetchAssistantById(id);
      setAssistant(data);
    } catch (error) {
      console.error("Failed to load assistant:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!assistant) {
    return <Typography sx={{ p: 3 }}>Assistant not found.</Typography>;
  }

 const sampleCode = `
<script src="${baseUrl}/static/js/inject.js?id=${id}" allow="microphone"></script>
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        {assistant.name}
      </Typography>

      {/* Info Card */}
      <Card sx={{ mb: 3, bgcolor: "#f9fafb" }}>
        <CardContent>
          <Typography variant="subtitle1"><b>Type:</b> {assistant.type}</Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="subtitle1"><b>Language:</b> {assistant.language}</Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="subtitle1"><b>Voice:</b> {assistant.voice || "N/A"}</Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="subtitle1"><b>Status:</b> {assistant.status}</Typography>
        </CardContent>
      </Card>

      {/* Widget & Embed Section */}
      <Card sx={{ mb: 3, bgcolor: "#f9fafb" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Embed Widget
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Add this conversational widget to your website. Visitors can interact with your AI assistant directly.
          </Typography>

        </CardContent>
      </Card>

      {/* Code Snippet Card */}
      <Paper sx={{ p: 3, borderRadius: 3, bgcolor: "#f4f6f8", position: "relative" }}>
        <Typography variant="h6" gutterBottom>
          Sample Integration Code
        </Typography>
        <SyntaxHighlighter language="javascript" style={oneLight} wrapLongLines>
          {sampleCode}
        </SyntaxHighlighter>
        <Tooltip title={copied ? "Copied!" : "Copy"}>
          <IconButton
            size="small"
            onClick={handleCopy}
            sx={{ position: "absolute", top: 12, right: 12 }}
          >
            <ContentCopy fontSize="small" />
          </IconButton>
        </Tooltip>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" size="small">
            Test Assistant
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
