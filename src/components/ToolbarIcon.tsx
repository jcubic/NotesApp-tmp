import { ReactNode } from 'react';
import { ActionIcon } from '@mantine/core';

type ToolbarIconProps = {
    icon: ReactNode;
    label?: string;
    onClick?: () => void;
    onHover?: () => void;
};

export default function ToolbarIcon({ icon, onClick, onHover, label = 'action button' }: ToolbarIconProps) {
  return (
    <ActionIcon variant="default" aria-label={label} onClick={onClick} onMouseEnter={onHover}>{icon}</ActionIcon>
  );
}
