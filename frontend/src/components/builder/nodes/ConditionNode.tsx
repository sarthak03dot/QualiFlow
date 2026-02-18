import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { Paper, Typography, Box, Select, MenuItem, TextField } from '@mui/material';
import { AltRoute as LogicIcon } from '@mui/icons-material';
import { memo } from 'react';




interface ConditionNodeData extends Record<string, unknown> {
    operator: string;
    value: string;
    onOperatorChange: (value: string) => void;
    onValueChange: (value: string) => void;
}

type ConditionNode = Node<ConditionNodeData>;

const ConditionNode = ({ data, isConnectable }: NodeProps<ConditionNode>) => {
    return (
        <Paper
            elevation={3}
            sx={{
                p: 2,
                minWidth: 220,
                borderRadius: 2,
                border: '1px solid rgba(236, 72, 153, 0.3)',
                bgcolor: 'background.paper',
            }}
        >
            <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
                <LogicIcon fontSize="small" color="secondary" />
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    Logic Condition
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Select
                    size="small"
                    value={data.operator || 'equals'}
                    onChange={(e) => data.onOperatorChange(e.target.value)}
                    fullWidth
                    variant="standard"
                >
                    <MenuItem value="equals">Equals</MenuItem>
                    <MenuItem value="not_equals">Not Equals</MenuItem>
                    <MenuItem value="contains">Contains</MenuItem>
                    <MenuItem value="greater_than">Greater Than</MenuItem>
                    <MenuItem value="less_than">Less Than</MenuItem>
                </Select>

                <TextField
                    fullWidth
                    size="small"
                    placeholder="Value to match"
                    value={data.value || ''}
                    onChange={(evt) => data.onValueChange(evt.target.value)}
                    variant="standard"
                />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Box sx={{ position: 'relative' }}>
                    <Handle
                        type="source"
                        position={Position.Bottom}
                        id="true"
                        isConnectable={isConnectable}
                        style={{ left: '25%', background: '#10b981' }}
                    />
                    <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 700, mt: 1, display: 'block' }}>
                        TRUE
                    </Typography>
                </Box>
                <Box sx={{ position: 'relative' }}>
                    <Handle
                        type="source"
                        position={Position.Bottom}
                        id="false"
                        isConnectable={isConnectable}
                        style={{ left: '75%', background: '#ef4444' }}
                    />
                    <Typography variant="caption" sx={{ color: '#ef4444', fontWeight: 700, mt: 1, display: 'block' }}>
                        FALSE
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
};

export default memo(ConditionNode);
