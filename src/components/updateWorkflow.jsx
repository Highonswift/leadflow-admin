import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CodeIcon from "@mui/icons-material/Code";
import CallIcon from "@mui/icons-material/Call";
import SaveIcon from "@mui/icons-material/Save";

import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,

} from "reactflow";
import "reactflow/dist/style.css";

// Initial nodes
const initialNodes = [
  {
    id: "1",
    type: "input",
    position: { x: 250, y: 0 },
    data: { label: "Start" },
  },
  {
    id: "2",
    position: { x: 100, y: 150 },
    data: { label: "Ask for Appointment" },
  },
  {
    id: "3",
    position: { x: 400, y: 150 },
    data: { label: "Confirm Details" },
  },
];

// Initial edges
const initialEdges = [
  { id: "e1-2", source: "1", target: "2", type: "smoothstep" },
  { id: "e1-3", source: "1", target: "3", type: "smoothstep" },
];

function UpdateWorkflow() {
  // Drawer toggle state
  const [open, setOpen] = useState(false);

  // React Flow state
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = (params) =>
    setEdges((eds) => addEdge(params, eds));

  return (
    <Box >
      {/* Sidebar Drawer */}
    
    {/* Workflow Canvas */}
        <Box sx={{ height: "calc(100vh - 64px)" }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
          >
            <MiniMap />
            <Controls />
            <Background gap={16} />
          </ReactFlow>
        </Box>
      </Box>

  );
}

export default UpdateWorkflow;
