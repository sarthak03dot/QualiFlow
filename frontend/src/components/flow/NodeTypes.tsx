import QuestionNode from '../builder/nodes/QuestionNode';
import ConditionNode from '../builder/nodes/ConditionNode';
import EndpointNode from '../builder/nodes/EndpointNode';
import StartNode from '../builder/nodes/StartNode';

import { NodeTypes } from '@xyflow/react';

const nodeTypes: NodeTypes = {
    start: StartNode,
    question: QuestionNode,
    condition: ConditionNode,
    eligible: EndpointNode,
    ineligible: EndpointNode,
};

export default nodeTypes;
