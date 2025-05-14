import React, { useRef, useState } from 'react';
import { Button, PopoverProps } from '@mui/material';
import ActionButton from './ActionButton';
import { Popover } from '@/components/_shared/popover';
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

const popoverProps: Partial<PopoverProps> = {
    anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
    },
    transformOrigin: {
        vertical: 'top',
        horizontal: 'left',
    },
    slotProps: {
        paper: {
            className: 'bg-[var(--surface-primary)] rounded-[8px]',
            style: { marginTop: '6px' }
        },
    },
};

function TurnInfo() {
    const [open, setOpen] = useState(false);
    const [selectedType, setSelectedType] = useState<'quote' | 'bulleted' | 'numbered' | null>(null);
    const ref = useRef<HTMLButtonElement | null>(null);
    const editor = useSlateStatic() as YjsEditor;
    const selectedText = CustomEditor.getSelectionContent(editor)?.trim() || '';
    const { t } = useTranslation();
    const handleClose = () => setOpen(false);

    let displayText = 'Text';
    if (selectedType === 'quote') displayText = String(t('toolbar.quote', { returnObjects: false, defaultValue: 'Quote' }));
    if (selectedType === 'bulleted') displayText = String(t('toolbar.bulletList', { returnObjects: false, defaultValue: 'Bulleted List' }));
    if (selectedType === 'numbered') displayText = String(t('toolbar.numberedList', { returnObjects: false, defaultValue: 'Numbered List' }));

    return (
        <div className={'flex items-center justify-center'}>
            <ActionButton
                ref={ref}
                onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    setOpen(true);
                }}
                tooltip={displayText}
            >
                <div className={'flex items-center justify-center gap-1 '}>
                    <span
                        className={'max-w-[120px] truncate text-text-primary'}
                        style={{
                            // fontFamily: 'SF Pro Text',
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
            <Popover
                disableAutoFocus={true}
                disableEnforceFocus={true}
                disableRestoreFocus={true}
                onClose={handleClose}
                open={open}
                anchorEl={ref.current}
                {...popoverProps}
            >
                <div className="flex flex-col w-[200px] rounded-[12px]" style={{ padding: 'var(--spacing-spacing-m)' }}>
                    <Button
                        startIcon={<QuoteSvg className="h-5 w-5" />}
                        color="inherit"
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
                        disableRipple
                        className="text-foreground"
                        sx={{
                            '.MuiButton-startIcon': {
                                margin: 0,
                                marginRight: 'var(--spacing-spacing-m)'
                            },
                            padding: '0 var(--spacing-spacing-m)',
                            height: '32px',
                            minHeight: '32px',
                            borderRadius: '8px',
                            justifyContent: 'flex-start',
                            textAlign: 'left',
                        }}
                    >
                        {String(t('toolbar.quote', { returnObjects: false, defaultValue: 'Quote' }))}
                    </Button>
                    <Button
                        startIcon={<BulletedListSvg className="h-5 w-5" />}
                        color="inherit"
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
                        disableRipple
                        className="text-foreground"
                        sx={{
                            '.MuiButton-startIcon': {
                                margin: 0,
                                marginRight: 'var(--spacing-spacing-m)'
                            },
                            padding: '0 var(--spacing-spacing-m)',
                            height: '32px',
                            minHeight: '32px',
                            borderRadius: '8px',
                            justifyContent: 'flex-start',
                            textAlign: 'left',
                        }}
                    >
                        {String(t('toolbar.bulletList', { returnObjects: false, defaultValue: 'Bulleted List' }))}
                    </Button>
                    <Button
                        startIcon={<NumberedListSvg className="h-5 w-5" />}
                        color="inherit"
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
                        disableRipple
                        className="text-foreground"
                        sx={{
                            '.MuiButton-startIcon': {
                                margin: 0,
                                marginRight: 'var(--spacing-spacing-m)'
                            },
                            padding: '0 var(--spacing-spacing-m)',
                            height: '32px',
                            minHeight: '32px',
                            borderRadius: '8px',
                            justifyContent: 'flex-start',
                            textAlign: 'left',
                        }}
                    >
                        {String(t('toolbar.numberedList', { returnObjects: false, defaultValue: 'Numbered List' }))}
                    </Button>
                </div>
            </Popover>
        </div>
    );
}

export default TurnInfo; 