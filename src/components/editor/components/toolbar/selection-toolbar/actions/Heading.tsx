import { YjsEditor } from '@/application/slate-yjs';
import { CustomEditor } from '@/application/slate-yjs/command';
import { getBlockEntry } from '@/application/slate-yjs/utils/editor';
import { BlockType, HeadingBlockData } from '@/application/types';
import { Popover } from '@/components/_shared/popover';
import { useSelectionToolbarContext } from '@/components/editor/components/toolbar/selection-toolbar/SelectionToolbar.hooks';
import { PopoverProps } from '@mui/material/Popover';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ActionButton from './ActionButton';
import { useTranslation } from 'react-i18next';
import { useSlateStatic } from 'slate-react';
import { ReactComponent as Heading1 } from '@/assets/icons/h1.svg';
import { ReactComponent as Heading2 } from '@/assets/icons/h2.svg';
import { ReactComponent as Heading3 } from '@/assets/icons/h3.svg';
import { ReactComponent as DownArrow } from '@/assets/icons/triangle_down.svg';
import Button from '@mui/material/Button';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';
import { ReactComponent as ParagraphSvg } from '@/assets/icons/text.svg';

const popoverProps: Partial<PopoverProps> = {
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'center',
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'center',
  },
  slotProps: {
    paper: {
      className: 'bg-[var(--surface-primary)] rounded-[8px]',
      style: { marginTop: '6px' }
    },
  },
};

export function Heading() {
  const { t } = useTranslation();
  const editor = useSlateStatic() as YjsEditor;
  const { visible: toolbarVisible } = useSelectionToolbarContext();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLButtonElement | null>(null);

  const toHeading = useCallback(
    (level: number) => {
      return () => {
        try {
          const [node] = getBlockEntry(editor);

          if (!node) return;

          if (node.type === BlockType.HeadingBlock && (node.data as HeadingBlockData).level === level) {
            CustomEditor.turnToBlock(editor, node.blockId as string, BlockType.Paragraph, {});
            return;
          }

          CustomEditor.turnToBlock<HeadingBlockData>(editor, node.blockId as string, BlockType.HeadingBlock, { level });
        } catch (e) {
          return;
        }
      };
    },
    [editor]
  );

  const isActivated = useCallback(
    (level: number) => {
      try {
        const [node] = getBlockEntry(editor);

        const isBlock = CustomEditor.isBlockActive(editor, BlockType.HeadingBlock);

        return isBlock && (node.data as HeadingBlockData).level === level;
      } catch (e) {
        return false;
      }
    },
    [editor]
  );

  const isParagraph = useCallback(() => {
    try {
      const [node] = getBlockEntry(editor);
      return node && node.type === BlockType.Paragraph;
    } catch (e) {
      return false;
    }
  }, [editor]);

  const toParagraph = useCallback(() => {
    try {
      const [node] = getBlockEntry(editor);
      if (!node) return;
      CustomEditor.turnToBlock(editor, node.blockId as string, BlockType.Paragraph, {});
    } catch (e) {
      return;
    }
  }, [editor]);

  const getActiveButton = useCallback(() => {
    if (isParagraph()) {
      return <ParagraphSvg className={'h-5 w-5 text-fill-default'} />;
    }

    if (isActivated(1)) {
      return <Heading1 className={'h-5 w-5 text-fill-default'} />;
    }

    if (isActivated(2)) {
      return <Heading2 className={'h-5 w-5 text-fill-default'} />;
    }

    if (isActivated(3)) {
      return <Heading3 className={'h-5 w-5 text-fill-default'} />;
    }

    return <ParagraphSvg className='h-5 w-5' />;
  }, [isActivated, isParagraph]);

  const { getButtonProps, selectedIndex } = useKeyboardNavigation({
    itemCount: 4,
    isOpen: open,
    onSelect: (index) => {
      if (index === 0) {
        toParagraph();
      } else {
        toHeading(index)();
      }
    },
    onClose: () => {
      setOpen(false);
    }
  });

  useEffect(() => {
    if (!toolbarVisible) {
      setOpen(false);
    }
  }, [toolbarVisible]);

  return (
    <div className={'flex items-center justify-center'}>
      <ActionButton
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
        tooltip={t('editor.text')}
      >
        <div className={'flex items-center justify-center gap-1'}>
          {getActiveButton()}
          <DownArrow className={'h-5 w-3 text-icon-primary'} />
        </div>
      </ActionButton>
      {toolbarVisible && (
        <Popover
          disableAutoFocus={true}
          disableEnforceFocus={true}
          disableRestoreFocus={true}
          onClose={() => {
            setOpen(false);
          }}
          open={open}
          anchorEl={ref.current}
          {...popoverProps}
        >
          <div className="flex flex-col w-[200px] rounded-[12px]" style={{ padding: 'var(--spacing-spacing-m)' }}>
            <Button
              {...getButtonProps(0)}
              startIcon={<ParagraphSvg className="h-5 w-5" />}
              color="inherit"
              onClick={() => {
                toParagraph();
                setOpen(false);
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
                ...(isParagraph() && {
                  backgroundColor: 'var(--fill-list-active)'
                }),
                ...(selectedIndex === 0 && {
                  backgroundColor: 'var(--fill-list-hover)'
                })
              }}
            >
              {t('editor.text')}
            </Button>
            <Button
              {...getButtonProps(1)}
              startIcon={<Heading1 className="h-5 w-5" />}
              color="inherit"
              onClick={() => {
                toHeading(1)();
                setOpen(false);
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
                ...(isActivated(1) && {
                  backgroundColor: 'var(--fill-list-active)'
                }),
                ...(selectedIndex === 1 && {
                  backgroundColor: 'var(--fill-list-hover)'
                })
              }}
            >
              {t('document.slashMenu.name.heading1')}
            </Button>
            <Button
              {...getButtonProps(2)}
              startIcon={<Heading2 className="h-5 w-5" />}
              color="inherit"
              onClick={() => {
                toHeading(2)();
                setOpen(false);
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
                ...(isActivated(2) && {
                  backgroundColor: 'var(--fill-list-active)'
                }),
                ...(selectedIndex === 2 && {
                  backgroundColor: 'var(--fill-list-hover)'
                })
              }}
            >
              {t('document.slashMenu.name.heading2')}
            </Button>
            <Button
              {...getButtonProps(3)}
              startIcon={<Heading3 className="h-5 w-5" />}
              color="inherit"
              onClick={() => {
                toHeading(3)();
                setOpen(false);
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
                ...(isActivated(3) && {
                  backgroundColor: 'var(--fill-list-active)'
                }),
                ...(selectedIndex === 3 && {
                  backgroundColor: 'var(--fill-list-hover)'
                })
              }}
            >
              {t('document.slashMenu.name.heading3')}
            </Button>
          </div>
        </Popover>
      )}
    </div>
  );
}

export default Heading;
