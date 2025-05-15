import React, { useRef, useState } from 'react';
import { Button, Menu, MenuItem, PopoverProps, Typography } from '@mui/material';
import ActionButton from './ActionButton';
import { ReactComponent as BulletedListSvg } from '@/assets/icons/bulleted_list.svg';
import { ReactComponent as NumberedListSvg } from '@/assets/icons/numbered_list.svg';
import { ReactComponent as QuoteSvg } from '@/assets/icons/quote.svg';
import { ReactComponent as TurnIntoSvg } from '@/assets/icons/turn_into.svg';
import { useSlateStatic } from 'slate-react';
import { CustomEditor } from '@/application/slate-yjs/command';
import { ReactComponent as DownArrow } from '@/assets/icons/triangle_down.svg';
import { YjsEditor } from '@/application/slate-yjs';
import { useTranslation } from 'react-i18next';
import { getBlockEntry } from '@/application/slate-yjs/utils/editor';
import { BlockType } from '@/application/types';
import { useSelectionToolbarContext } from '../SelectionToolbar.hooks';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';
import { ReactComponent as ParagraphSvg } from '@/assets/icons/text.svg';
import { ReactComponent as Heading1 } from '@/assets/icons/h1.svg';
import { ReactComponent as Heading2 } from '@/assets/icons/h2.svg';
import { ReactComponent as Heading3 } from '@/assets/icons/h3.svg';
import { ReactComponent as ToggleListIcon } from '@/assets/icons/toggle_list.svg';
import { ReactComponent as ToggleHeading1Icon } from '@/assets/icons/toggle_h1.svg';
import { ReactComponent as ToggleHeading2Icon } from '@/assets/icons/toggle_h2.svg';
import { ReactComponent as ToggleHeading3Icon } from '@/assets/icons/toggle_h3.svg';
import type { HeadingBlockData } from '@/application/types';

type BlockOption = {
    type: 'paragraph' | 'heading1' | 'heading2' | 'heading3' | 'quote' | 'bulleted' | 'numbered' | 'toggleHeading1' | 'toggleHeading2' | 'toggleHeading3' | 'toggle';
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    label: string;
    blockType: BlockType;
    data?: any;
};

const blockOptions: BlockOption[] = [
    {
        type: 'paragraph',
        icon: ParagraphSvg,
        label: 'editor.text',
        blockType: BlockType.Paragraph,
    },
    {
        type: 'heading1',
        icon: Heading1,
        label: 'document.slashMenu.name.heading1',
        blockType: BlockType.HeadingBlock,
        data: { level: 1 },
    },
    {
        type: 'heading2',
        icon: Heading2,
        label: 'document.slashMenu.name.heading2',
        blockType: BlockType.HeadingBlock,
        data: { level: 2 },
    },
    {
        type: 'heading3',
        icon: Heading3,
        label: 'document.slashMenu.name.heading3',
        blockType: BlockType.HeadingBlock,
        data: { level: 3 },
    },
    {
        type: 'toggle',
        icon: ToggleListIcon,
        label: 'document.slashMenu.name.toggleList',
        blockType: BlockType.ToggleListBlock,
    },
    {
        type: 'toggleHeading1',
        icon: ToggleHeading1Icon,
        label: 'document.slashMenu.name.toggleHeading1',
        blockType: BlockType.ToggleListBlock,
        data: { level: 1 },
    },
    {
        type: 'toggleHeading2',
        icon: ToggleHeading2Icon,
        label: 'document.slashMenu.name.toggleHeading2',
        blockType: BlockType.ToggleListBlock,
        data: { level: 2 },
    },
    {
        type: 'toggleHeading3',
        icon: ToggleHeading3Icon,
        label: 'document.slashMenu.name.toggleHeading3',
        blockType: BlockType.ToggleListBlock,
        data: { level: 3 },
    },
    {
        type: 'quote',
        icon: QuoteSvg,
        label: 'toolbar.quote',
        blockType: BlockType.QuoteBlock,
    },
    {
        type: 'bulleted',
        icon: BulletedListSvg,
        label: 'toolbar.bulletList',
        blockType: BlockType.BulletedListBlock,
    },
    {
        type: 'numbered',
        icon: NumberedListSvg,
        label: 'editor.numberedList',
        blockType: BlockType.NumberedListBlock,
    },
];

function TurnInfo() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedType, setSelectedType] = useState<BlockOption['type'] | null>(null);
    const ref = useRef<HTMLButtonElement | null>(null);
    const editor = useSlateStatic() as YjsEditor;
    const selectedText = CustomEditor.getSelectionContent(editor)?.trim() || '';
    const { t } = useTranslation();
    const { forceShow } = useSelectionToolbarContext();
    const open = Boolean(anchorEl);
    const handleClose = () => {
        setAnchorEl(null);
        forceShow(false);
    };

    // Helper: get current block type and heading level
    let currentType: string | null = null;
    let currentLevel: number | null = null;
    try {
        const [node] = getBlockEntry(editor);
        if (node.type === BlockType.Paragraph) currentType = 'paragraph';
        else if (node.type === BlockType.HeadingBlock) {
            currentType = 'heading';
            currentLevel = (node.data as HeadingBlockData).level;
        } else if (node.type === BlockType.QuoteBlock) currentType = 'quote';
        else if (node.type === BlockType.BulletedListBlock) currentType = 'bulleted';
        else if (node.type === BlockType.NumberedListBlock) currentType = 'numbered';
    } catch (e) { }

    const getDisplayText = () => {
        if (currentType === 'paragraph') return t('editor.text', { defaultValue: 'Text' });
        if (currentType === 'heading' && currentLevel) {
            return t(`document.slashMenu.name.heading${currentLevel}`, { defaultValue: `Heading ${currentLevel}` });
        }
        if (currentType === 'quote') return t('toolbar.quote', { returnObjects: false, defaultValue: 'Quote' });
        if (currentType === 'bulleted') return t('toolbar.bulletList', { returnObjects: false, defaultValue: 'Bulleted List' });
        if (currentType === 'numbered') return t('toolbar.numberedList', { returnObjects: false, defaultValue: 'Numbered List' });

        const option = blockOptions.find(opt => opt.type === selectedType);
        return option ? t(option.label, { defaultValue: option.label }) : 'Text';
    };

    const handleBlockChange = (option: BlockOption) => {
        try {
            const [node] = getBlockEntry(editor);
            if (!node) return;

            if (node.type === option.blockType &&
                (!option.data || (node.type === BlockType.HeadingBlock && (node.data as HeadingBlockData).level === option.data.level))) {
                CustomEditor.turnToBlock(editor, node.blockId as string, BlockType.Paragraph, {});
            } else {
                CustomEditor.turnToBlock(editor, node.blockId as string, option.blockType, option.data || {});
            }
            setSelectedType(option.type);
            handleClose();
        } catch (e) { handleClose(); }
    };

    const { getButtonProps, selectedIndex } = useKeyboardNavigation({
        itemCount: blockOptions.length,
        isOpen: open,
        onSelect: (index) => handleBlockChange(blockOptions[index]),
        onClose: handleClose,
    });

    return (
        <div className={'flex items-center justify-center'}>
            <ActionButton
                ref={ref}
                onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    setAnchorEl(e.currentTarget);
                    forceShow(true);
                }}
                tooltip={getDisplayText()}
            >
                <div className={'flex items-center justify-center gap-1 '}>
                    <span
                        className={'max-w-[120px] truncate text-text-primary'}
                        style={{
                            fontSize: 14,
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: '20px',
                        }}
                    >
                        {getDisplayText()}
                    </span>
                    <DownArrow className={'h-5 w-3 text-icon-primary'} />
                </div>
            </ActionButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                PaperProps={{
                    className: 'bg-[var(--surface-primary)] rounded-[8px]',
                    style: { marginTop: '6px', minWidth: 200, paddingLeft: 'var(--spacing-spacing-m)', paddingRight: 'var(--spacing-spacing-m)' }
                }}
            >
                {/* Group label: Turn into */}
                <Typography
                    className='text-text-secondary'
                    variant="body2"
                    sx={{
                        fontSize: 12,
                        fontWeight: 600,
                        lineHeight: '20px',
                        px: 1.5,
                        py: 0.5,
                        pointerEvents: 'none',
                        userSelect: 'none',
                    }}
                >
                    {t('document.plugins.optionAction.turnInto', { defaultValue: 'Turn into' })}
                </Typography>
                {blockOptions.map((option, index) => (
                    <MenuItem
                        key={option.type}
                        ref={el => getButtonProps(index).ref?.(el as any)}
                        selected={selectedIndex === index}
                        sx={getButtonProps(index).sx}
                        onClick={() => handleBlockChange(option)}
                    >
                        <option.icon className="h-5 w-5 mr-2" />
                        {t(option.label, { defaultValue: option.label })}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}

export default TurnInfo; 