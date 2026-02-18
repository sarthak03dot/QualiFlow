import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
    ReactFlow,
    addEdge,
    Background,
    Controls,
    Connection,
    Edge,
    Node,
    ReactFlowProvider,
    useNodesState,
    useEdgesState,
    Panel,
    ReactFlowInstance,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Box, Button, Stack } from '@mui/material';
import { Save as SaveIcon, PlayArrow as PlayIcon } from '@mui/icons-material';

import QuestionNode from './nodes/QuestionNode';
import ConditionNode from './nodes/ConditionNode';
import EndpointNode from './nodes/EndpointNode';
import StartNode from './nodes/StartNode';
import { createStyle } from '../../theme/muiThemes';

const nodeTypes = {
    question: QuestionNode,
    condition: ConditionNode,
    eligible: EndpointNode,
    ineligible: EndpointNode,
    start: StartNode,
};

const initialNodes: Node[] = [
    {
        id: 'start-1',
        type: 'start',
        position: { x: 250, y: 50 },
        data: { label: 'Start' },
    },
];

interface FlowEditorProps {
    initialData?: { nodes: Node[]; edges: Edge[] };
    onSave: (nodes: Node[], edges: Edge[]) => void;
}

const FlowEditor = ({ initialData, onSave }: FlowEditorProps) => {
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialData?.nodes || initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialData?.edges || []);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

    useEffect(() => {
        if (initialData) {
            const hydratedNodes = initialData.nodes.map((node) => ({
                ...node,
                data: {
                    ...node.data,
                    // Preserve existing callbacks or create new ones if missing
                    onChange: (node.data as any).onChange || ((newLabel: string) => {
                        setNodes((nds) =>
                            nds.map((n) => (n.id === node.id ? { ...n, data: { ...n.data, label: newLabel } } : n))
                        );
                    }),
                    onOperatorChange: (node.data as any).onOperatorChange || ((newOp: string) => {
                        setNodes((nds) =>
                            nds.map((n) => (n.id === node.id ? { ...n, data: { ...n.data, operator: newOp } } : n))
                        );
                    }),
                    onValueChange: (node.data as any).onValueChange || ((newVal: string) => {
                        setNodes((nds) =>
                            nds.map((n) => (n.id === node.id ? { ...n, data: { ...n.data, value: newVal } } : n))
                        );
                    }),
                },
            }));
            setNodes(hydratedNodes);
            setEdges(initialData.edges);
        }
    }, [initialData, setNodes, setEdges]);

    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();

            if (!reactFlowWrapper.current || !reactFlowInstance) return;

            const type = event.dataTransfer.getData('application/reactflow');

            if (typeof type === 'undefined' || !type) {
                return;
            }

            const position = reactFlowInstance.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            const newNode: Node = {
                id: `${type}-${Date.now()}`,
                type,
                position,
                data: {
                    label: `${type} node`,
                    type: type, // for endpoint nodes
                    onChange: (newLabel: string) => {
                        setNodes((nds) =>
                            nds.map((node) => {
                                if (node.id === newNode.id) {
                                    return { ...node, data: { ...node.data, label: newLabel } };
                                }
                                return node;
                            })
                        );
                    },
                    onOperatorChange: (newOp: string) => {
                        setNodes((nds) =>
                            nds.map((node) => {
                                if (node.id === newNode.id) {
                                    return { ...node, data: { ...node.data, operator: newOp } };
                                }
                                return node;
                            })
                        );
                    },
                    onValueChange: (newVal: string) => {
                        setNodes((nds) =>
                            nds.map((node) => {
                                if (node.id === newNode.id) {
                                    return { ...node, data: { ...node.data, value: newVal } };
                                }
                                return node;
                            })
                        );
                    },
                },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance, setNodes]
    );



    return (
        <Box sx={{ ...createStyle.flowEditor}} ref={reactFlowWrapper}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onInit={setReactFlowInstance}
                onDrop={onDrop}
                onDragOver={onDragOver}
                nodeTypes={nodeTypes}
                fitView
            >
                <Background />
                <Controls />
                <Panel position="top-right">
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="contained"
                            startIcon={<SaveIcon />}
                            onClick={() => onSave(nodes, edges)}
                            size="small"
                        >
                            Save Flow
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            startIcon={<PlayIcon />}
                            size="small"
                        >
                            Test Flow
                        </Button>
                    </Stack>
                </Panel>
            </ReactFlow>
        </Box>
    );
};

const WrappedFlowEditor = (props: FlowEditorProps) => (
    <ReactFlowProvider>
        <FlowEditor {...props} />
    </ReactFlowProvider>
);

export default WrappedFlowEditor;
