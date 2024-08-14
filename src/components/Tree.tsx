'use client';
import { IconChevronDown } from '@tabler/icons-react';
import { Group, Tree, Flex } from '@mantine/core';

import { TreeNodeData, NavLink } from '@mantine/core';
import { IconFileText } from '@tabler/icons-react';

import type { RenderTreeNodePayload } from '@mantine/core';

import NoteNavLink from '@/components/NoteNavLink';

type TreeProps = {
    data: TreeNodeData[]
};

export default function TreeView({ data }: TreeProps) {
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
                label={node.label}/>
            </Flex>
          )}
          {!hasChildren && (
            <NavLink
              href="#required-for-focus"
              label={node.label}
              leftSection={<IconFileText size="1rem" stroke={1.5} />}
            />
          )}
        </Group>
      )}
    />
  );
}
