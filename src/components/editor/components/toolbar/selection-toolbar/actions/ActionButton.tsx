import React, { forwardRef } from 'react';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { Tooltip } from '@mui/material';
import { cn } from '@/lib/utils';

const ActionButton = forwardRef<
  HTMLButtonElement,
  {
    tooltip?: string | React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    children: React.ReactNode;
    active?: boolean;
  } & IconButtonProps
>(({ tooltip, onClick, disabled, children, active, className, ...props }, ref) => {
  return (
    <Tooltip
      disableInteractive={true}
      placement={'top'}
      title={tooltip}
    >
      <IconButton
        ref={ref}
        onClick={onClick}
        size={'large'}
        disabled={disabled}
        {...props}
        className={cn(
          className,
          'bg-transparent px-1.5 py-1.5 text-icon-primary hover:bg-[var(--fill-content-hover)]',
          active && 'bg-[var(--fill-theme-select)]'
        )}
      >
        <div className="min-w-5 h-5 flex items-center justify-center">
          {children}
        </div>
      </IconButton>
    </Tooltip>
  );
});

export default ActionButton;
