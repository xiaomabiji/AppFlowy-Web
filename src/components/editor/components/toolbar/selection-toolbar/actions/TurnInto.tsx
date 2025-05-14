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

function TurnInfo() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedType, setSelectedType] = useState<'quote' | 'bulleted' | 'numbered' | null>(null);
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

    let displayText = 'Text';
    if (selectedType === 'quote') displayText = String(t('toolbar.quote', { returnObjects: false, defaultValue: 'Quote' }));
    if (selectedType === 'bulleted') displayText = String(t('toolbar.bulletList', { returnObjects: false, defaultValue: 'Bulleted List' }));
    if (selectedType === 'numbered') displayText = String(t('toolbar.numberedList', { returnObjects: false, defaultValue: 'Numbered List' }));

    const { getButtonProps, selectedIndex } = useKeyboardNavigation({
        itemCount: 3,
        isOpen: open,
        onSelect: (index) => {
            if (index === 0) {
                // Quote
                try {
                    const [node] = getBlockEntry(editor);
                    if (!node) return;
                    if (node.type === BlockType.QuoteBlock) {
                        CustomEditor.turnToBlock(editor, node.blockId as string, BlockType.Paragraph, {});
                    } else {
                        CustomEditor.turnToBlock(editor, node.blockId as string, BlockType.QuoteBlock, {});
                    }
                    setSelectedType('quote');
                    handleClose();
                } catch (e) {
                    handleClose();
                }
            } else if (index === 1) {
                // Bulleted List
                try {
                    const [node] = getBlockEntry(editor);
                    if (!node) return;
                    if (node.type === BlockType.BulletedListBlock) {
                        CustomEditor.turnToBlock(editor, node.blockId as string, BlockType.Paragraph, {});
                    } else {
                        CustomEditor.turnToBlock(editor, node.blockId as string, BlockType.BulletedListBlock, {});
                    }
                    setSelectedType('bulleted');
                    handleClose();
                } catch (e) {
                    handleClose();
                }
            } else if (index === 2) {
                // Numbered List
                try {
                    const [node] = getBlockEntry(editor);
                    if (!node) return;
                    if (node.type === BlockType.NumberedListBlock) {
                        CustomEditor.turnToBlock(editor, node.blockId as string, BlockType.Paragraph, {});
                    } else {
                        CustomEditor.turnToBlock(editor, node.blockId as string, BlockType.NumberedListBlock, {});
                    }
                    setSelectedType('numbered');
                    handleClose();
                } catch (e) {
                    handleClose();
                }
            }
        },
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
                tooltip={displayText}
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
                        {displayText}
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
                    style: { marginTop: '6px', minWidth: 200, padding: 'var(--spacing-spacing-m)' }
                }}
            >
                {/* Group 1: Quote */}
                <MenuItem
                    ref={el => getButtonProps(0).ref?.(el as any)}
                    selected={selectedIndex === 0}
                    sx={getButtonProps(0).sx}
                    onClick={() => {
                        try {
                            const [node] = getBlockEntry(editor);
                            if (!node) return;
                            if (node.type === BlockType.QuoteBlock) {
                                CustomEditor.turnToBlock(editor, node.blockId as string, BlockType.Paragraph, {});
                            } else {
                                CustomEditor.turnToBlock(editor, node.blockId as string, BlockType.QuoteBlock, {});
                            }
                            setSelectedType('quote');
                            handleClose();
                        } catch (e) {
                            handleClose();
                        }
                    }}
                >
                    <QuoteSvg className="h-5 w-5 mr-2" />
                    {String(t('toolbar.quote', { returnObjects: false, defaultValue: 'Quote' }))}
                </MenuItem>
                {/* Group label */}
                <Typography
                    variant="body2"
                    sx={{
                        color: 'var(--Text-primary, #21232A)',
                        fontFamily: 'SF Pro Text',
                        fontSize: 12,
                        fontWeight: 600,
                        lineHeight: '20px',
                        px: 1.5,
                        py: 0.5,
                        pointerEvents: 'none',
                        userSelect: 'none',
                    }}
                >
                    {t('toolbar.listGroup', { defaultValue: 'List' })}
                </Typography>
                {/* Group 2: Bulleted List & Numbered List */}
                <MenuItem
                    ref={el => getButtonProps(1).ref?.(el as any)}
                    selected={selectedIndex === 1}
                    sx={getButtonProps(1).sx}
                    onClick={() => {
                        try {
                            const [node] = getBlockEntry(editor);
                            if (!node) return;
                            if (node.type === BlockType.BulletedListBlock) {
                                CustomEditor.turnToBlock(editor, node.blockId as string, BlockType.Paragraph, {});
                            } else {
                                CustomEditor.turnToBlock(editor, node.blockId as string, BlockType.BulletedListBlock, {});
                            }
                            setSelectedType('bulleted');
                            handleClose();
                        } catch (e) {
                            handleClose();
                        }
                    }}
                >
                    <BulletedListSvg className="h-5 w-5 mr-2" />
                    {String(t('toolbar.bulletList', { returnObjects: false, defaultValue: 'Bulleted List' }))}
                </MenuItem>
                <MenuItem
                    ref={el => getButtonProps(2).ref?.(el as any)}
                    selected={selectedIndex === 2}
                    sx={getButtonProps(2).sx}
                    onClick={() => {
                        try {
                            const [node] = getBlockEntry(editor);
                            if (!node) return;
                            if (node.type === BlockType.NumberedListBlock) {
                                CustomEditor.turnToBlock(editor, node.blockId as string, BlockType.Paragraph, {});
                            } else {
                                CustomEditor.turnToBlock(editor, node.blockId as string, BlockType.NumberedListBlock, {});
                            }
                            setSelectedType('numbered');
                            handleClose();
                        } catch (e) {
                            handleClose();
                        }
                    }}
                >
                    <NumberedListSvg className="h-5 w-5 mr-2" />
                    {String(t('toolbar.numberedList', { returnObjects: false, defaultValue: 'Numbered List' }))}
                </MenuItem>
            </Menu>
        </div>
    );
}

export default TurnInfo; 