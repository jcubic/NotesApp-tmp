'use client';
import { MouseEvent } from 'react';
import { IconChevronDown } from '@tabler/icons-react';
import { Group, Tree, Flex, TreeNodeData, NavLink } from '@mantine/core';
import { IconFileText, IconFilePlus } from '@tabler/icons-react';

import type { RenderTreeNodePayload } from '@mantine/core';

import ToolbarIcon from './ToolbarIcon';


type Node = RenderTreeNodePayload['node'];
type AnchorMouseEvent = MouseEvent<HTMLAnchorElement>;

type TreeProps = {
  data: TreeNodeData[];
  onClick?: (node: Node) => void;
};

export default function TreeView({ data }: TreeProps) {

  function ignoreEvent(event: AnchorMouseEvent) {
    event.preventDefault();
  }

  function newNote() {
    console.log('add Note');
  }

  return (
    <Tree
      data={data}
      levelOffset={23}
      expandOnClick={false}
      renderNode={({ node, tree, expanded, hasChildren, elementProps, selected }: RenderTreeNodePayload) => (
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
                active={selected}
                onClick={(event) => { ignoreEvent(event); tree.toggleExpanded(node.value); }}
                label={node.label}/>
              <ToolbarIcon icon={<IconFilePlus size={14}/>} onClick={() => {
                newNote();
                console.log(tree.hoveredNode);
              }}/>
            </Flex>
          )}
          {!hasChildren && (
            <NavLink
              href="#required-for-focus"
              label={node.label}
              onClick={(event) => { ignoreEvent(event); tree.select(node.value); }}
              leftSection={<IconFileText size="1rem" stroke={1.5} />}
            />
          )}
        </Group>
      )}
    />
  );
}
