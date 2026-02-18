import { ReactFlow, Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import nodeTypes from './NodeTypes';

interface FlowCanvasProps {
  nodes: Node[];
  edges: Edge[];
}

export default function FlowCanvas({ nodes, edges }: FlowCanvasProps) {
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      fitView
    />
  );
}
