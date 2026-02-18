import React, { memo } from 'react';
import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { Paper, Typography, Box, TextField } from '@mui/material';
import { HelpOutline as HelpIcon,  } from '@mui/icons-material';


interface QuestionNodeData extends Record<string, unknown> {
    label: string;
    onChange: (value: string) => void;
}

type QuestionNode = Node<QuestionNodeData>;

const QuestionNode = ({ data, isConnectable }: NodeProps<QuestionNode>) => {
    return (
        <Paper
            elevation={3}
            sx={{
                p: 2,
                minWidth: 200,
                borderRadius: 2,
                border: '1px solid rgba(255,255,255,0.1)',
                bgcolor: 'background.paper',
            }}
        >
            <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
                <HelpIcon fontSize="small" color="primary" />
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    Question
                </Typography>
            </Box>
            <TextField
                fullWidth
                size="small"
                placeholder="Enter your question"
                value={data.label || ''}
                onChange={(evt) => data.onChange(evt.target.value)}
                variant="standard"
                InputProps={{ disableUnderline: false }}
                sx={{ mb: 1 }}
            />
            <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
        </Paper>
    );
};

export default memo(QuestionNode);
