import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { ReactComponent as TickIcon } from '@/assets/icons/tick.svg';

interface MenuButtonProps {
    icon: ReactNode;
    label: ReactNode;
    isActive?: boolean;
    onClick: () => void;
    selected?: boolean;
    buttonProps?: Record<string, any>;
}

export function MenuButton({ icon, label, isActive, onClick, selected, buttonProps }: MenuButtonProps) {
    return (
        <Button
            {...buttonProps}
            variant="ghost"
            className={`
                h-8 min-h-8 px-[var(--spacing-spacing-m)]
                flex items-center justify-start
                text-sm font-normal leading-5
                hover:bg-[var(--fill-list-hover)]
                focus-visible:outline-none
                focus-visible:ring-0
                focus:outline-none
                focus:border-0
                ${selected ? 'bg-[var(--fill-list-hover)]' : ''}
            `}
            onClick={onClick}
        >
            <span className="mr-2">{icon}</span>
            {label}
            {isActive && (
                <span className="ml-auto flex items-center">
                    <TickIcon className="h-5 w-5 text-[var(--icon-secondary)]" />
                </span>
            )}
        </Button>
    );
} 