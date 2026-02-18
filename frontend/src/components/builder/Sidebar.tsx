import React from 'react';
import {
    Box,
    Typography,
    Paper,
    Divider,
    Stack,
} from '@mui/material';
import {
    HelpOutline as QuestionIcon,
    AltRoute as ConditionIcon,
    CheckCircle as EligibleIcon,
    Cancel as IneligibleIcon,
} from '@mui/icons-material';
import { createStyle } from '../../theme/muiThemes';

const Sidebar = () => {

    const onDragStart = (event: React.DragEvent, nodeType: string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    const nodeTypes = [
        { type: 'question', label: 'Question', icon: <QuestionIcon color="primary" /> },
        { type: 'condition', label: 'Logic Condition', icon: <ConditionIcon color="secondary" /> },
        { type: 'eligible', label: 'Eligible End', icon: <EligibleIcon sx={{ color: '#10b981' }} /> },
        { type: 'ineligible', label: 'Ineligible End', icon: <IneligibleIcon sx={{ color: '#ef4444' }} /> },
    ];

    return (
        <Box sx={{ ...createStyle.sideBar, display: 'flex', flexDirection: 'column' }}>
            {/* Top content */}
            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 2 }}>
                    Components
                </Typography>

                <Divider sx={{ mb: 2, opacity: 0.1 }} />

                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: 'block', mb: 2 }}
                >
                    Drag and drop components to the canvas to build your flow.
                </Typography>

                <Stack spacing={2}>
                    {nodeTypes.map((node) => (
                        <Paper
                            key={node.type}
                            elevation={0}
                            draggable
                            onDragStart={(event) => onDragStart(event, node.type)}
                            sx={{
                                p: 2,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                cursor: 'grab',
                                borderRadius: 2,
                                border: '1px solid rgba(255,255,255,0.05)',
                                '&:hover': {
                                    bgcolor: 'rgba(255,255,255,0.02)',
                                    borderColor: 'primary.main',
                                },
                            }}
                        >
                            {node.icon}
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                {node.label}
                            </Typography>
                        </Paper>
                    ))}
                </Stack>
            </Box>

           
        </Box>
    );
};

export default Sidebar;
