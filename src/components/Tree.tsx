'use client';
import { MouseEvent } from 'react';
import { IconChevronDown } from '@tabler/icons-react';
import { Group, Tree, Flex, TreeNodeData, NavLink } from '@mantine/core';
import { IconFileText } from '@tabler/icons-react';

import type { RenderTreeNodePayload } from '@mantine/core';

type Node = RenderTreeNodePayload['node'];

type TreeProps = {
  data: TreeNodeData[];
  onClick?: (node: Node) => void;
};

export default function TreeView({ data }: TreeProps) {

  function ignoreEvent(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
  }

  function onNodeClick(event: MouseEvent<HTMLAnchorElement>, node: Node) {
    ignoreEvent(event);
    console.log({ node });
  }

  return (
    <Tree
      data={data}
      levelOffset={23}
      renderNode={({ node, expanded, hasChildren, elementProps }: RenderTreeNodePayload) => (
        <Group gap={5} {...elementProps}>
          {hasChildren && (
            <Flex
              justify="flex-start"
              align="center"
              direction="row"
            >
              <IconChevronDown
                size={18}
                style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
              <NavLink
                href="#required-for-focus"
                onClick={ignoreEvent}
                label={node.label}/>
            </Flex>
          )}
          {!hasChildren && (
            <NavLink
              href="#required-for-focus"
              label={node.label}
              onClick={(e) => onNodeClick(e, node)}
              leftSection={<IconFileText size="1rem" stroke={1.5} />}
            />
          )}
        </Group>
      )}
    />
  );
}
