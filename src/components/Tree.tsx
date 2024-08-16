import { MouseEvent } from 'react';
import { IconChevronDown } from '@tabler/icons-react';
import { Group, Tree, Flex, TreeNodeData, NavLink } from '@mantine/core';
import { IconFileText, IconFilePlus } from '@tabler/icons-react';

import type { RenderTreeNodePayload } from '@mantine/core';

import ToolbarIcon from './ToolbarIcon';

export type Node = RenderTreeNodePayload['node'];
export type TreeData = TreeNodeData[];

type AnchorMouseEvent = MouseEvent<HTMLAnchorElement>;

type TreeProps = {
  data: TreeNodeData[];
  onOpenNote?: (node: Node) => void;
  onNewNote?: (parent: Node) => void;
  renameNode?: (node: Node, name: string) => void;
};

const noop = () => {};

export default function TreeView({ data, onOpenNote = noop, onNewNote = noop }: TreeProps) {

  function ignoreEvent(event: AnchorMouseEvent) {
    event.preventDefault();
  }

  function openNote(event: AnchorMouseEvent, node: Node) {
    ignoreEvent(event);
    onOpenNote(node);
  }

  return (
    <Tree
      data={data}
      levelOffset={23}
      expandOnClick={false}
      renderNode={({ node, tree, expanded, hasChildren, elementProps }: RenderTreeNodePayload) => {
        function toggle(event: AnchorMouseEvent) {
          ignoreEvent(event);
          tree.toggleExpanded(node.value);
        }
        return (
          <Group gap={5} {...elementProps}>
            {hasChildren && (
              <Flex
                justify="flex-start"
                align="center"
                direction="row"
              >
                <span onClick={toggle}>
                  <IconChevronDown
                    size={18}
                    style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </span>
                <Flex
                  direction="row"
                  gap={5}>
                  <NavLink
                    href="#required-for-focus"
                    h={28}
                    onClick={toggle}
                    label={node.label}
                  />
                  <ToolbarIcon icon={<IconFilePlus size={14}/>} onClick={() => onNewNote(node)}/>
                </Flex>
              </Flex>
            )}
            {!hasChildren && (
              <NavLink
                href="#required-for-focus"
                h={28}
                label={node.label}
                onClick={(event) => openNote(event, node)}
                leftSection={<IconFileText size="1rem" stroke={1.5} />}
              />
            )}
          </Group>
        );
      }}
    />
  );
}
