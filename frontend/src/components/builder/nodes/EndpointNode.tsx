import React, { memo } from 'react';
import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { Paper, Typography, Box, Chip } from '@mui/material';
import { CheckCircle as EligibleIcon, Cancel as IneligibleIcon } from '@mui/icons-material';


interface EndpointNodeData extends Record<string, unknown> {
    type: 'eligible' | 'ineligible';
}

type EndpointNode = Node<EndpointNodeData>;

const EndpointNode = ({ data, isConnectable }: NodeProps<EndpointNode>) => {
    const isEligible = data.type === 'eligible';

    return (
        <Paper
            elevation={3}
            sx={{
                p: 2,
                minWidth: 150,
                borderRadius: 2,
                border: `2px solid ${isEligible ? '#10b981' : '#ef4444'}`,
                bgcolor: 'background.paper',
                textAlign: 'center',
            }}
        >
            <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                {isEligible ? (
                    <EligibleIcon sx={{ color: '#10b981', fontSize: 32 }} />
                ) : (
                    <IneligibleIcon sx={{ color: '#ef4444', fontSize: 32 }} />
                )}
                <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                    {isEligible ? 'ELIGIBLE' : 'INELIGIBLE'}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    End of Flow
                </Typography>
            </Box>
        </Paper>
    );
};

export default memo(EndpointNode);
