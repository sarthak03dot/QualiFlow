import React, { memo } from 'react';
import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { Paper, Typography, Box } from '@mui/material';
import { PlayArrow as StartIcon } from '@mui/icons-material';
import { createStyle } from '../../../theme/muiThemes';


interface StartNodeData extends Record<string, unknown> {
    label: string;
}

type StartNode = Node<StartNodeData>;

const StartNode = ({ data, isConnectable }: NodeProps<StartNode>) => {
    return (
        <Paper
            elevation={3}
            sx={{
               ...createStyle.startNode
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <StartIcon sx={{ color: 'primary.main', fontSize: 24 }} />
                <Typography variant="caption" sx={{ fontWeight: 800 }}>
                    START
                </Typography>
            </Box>
            <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
        </Paper>
    );
};

export default memo(StartNode);
