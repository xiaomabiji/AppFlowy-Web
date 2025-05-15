import { YjsEditor } from '@/application/slate-yjs';
import { getBlockEntry } from '@/application/slate-yjs/utils/editor';
import { BlockType } from '@/application/types';
import AIAssistant from '@/components/editor/components/toolbar/selection-toolbar/actions/AIAssistant';
import Align from '@/components/editor/components/toolbar/selection-toolbar/actions/Align';
import Bold from '@/components/editor/components/toolbar/selection-toolbar/actions/Bold';
import BulletedList from '@/components/editor/components/toolbar/selection-toolbar/actions/BulletedList';
import Href from '@/components/editor/components/toolbar/selection-toolbar/actions/Href';
import Color from '@/components/editor/components/toolbar/selection-toolbar/actions/Color';
import Formula from '@/components/editor/components/toolbar/selection-toolbar/actions/Formula';
import Heading from '@/components/editor/components/toolbar/selection-toolbar/actions/Heading';
import InlineCode from '@/components/editor/components/toolbar/selection-toolbar/actions/InlineCode';
import Italic from '@/components/editor/components/toolbar/selection-toolbar/actions/Italic';
import NumberedList from '@/components/editor/components/toolbar/selection-toolbar/actions/NumberedList';
import Quote from '@/components/editor/components/toolbar/selection-toolbar/actions/Quote';
import StrikeThrough from '@/components/editor/components/toolbar/selection-toolbar/actions/StrikeThrough';
import Underline from '@/components/editor/components/toolbar/selection-toolbar/actions/Underline';
import TurnInto from '@/components/editor/components/toolbar/selection-toolbar/actions/TurnInto';
import {
  useSelectionToolbarContext,
} from '@/components/editor/components/toolbar/selection-toolbar/SelectionToolbar.hooks';
import { Divider } from '@mui/material';
import { Editor, Element, Path } from 'slate';
import Paragraph from './actions/Paragraph';
import React, { useMemo } from 'react';
import { useSlate } from 'slate-react';
import { ReactComponent as MoreIcon } from '@/assets/icons/more.svg';
import Popover from '@/components/_shared/popover/Popover';
import { useTranslation } from 'react-i18next';
import ActionButton from './actions/ActionButton';
import { ReactComponent as StrikeThroughSvg } from '@/assets/icons/strikethrough.svg';
import { ReactComponent as FormulaSvg } from '@/assets/icons/formula.svg';
import { Button } from '@mui/material';
import MoreOptions from './actions/MoreOptions';

function ToolbarActions() {
  const editor = useSlate() as YjsEditor;
  const selection = editor.selection;
  const {
    visible: toolbarVisible,
  } = useSelectionToolbarContext();

  const start = useMemo(() => selection ? editor.start(selection) : null, [editor, selection]);
  const end = useMemo(() => selection ? editor.end(selection) : null, [editor, selection]);

  const startBlock = useMemo(() => {
    if (!start) return null;
    try {
      return getBlockEntry(editor, start);
    } catch (e) {
      return null;
    }
  }, [editor, start]);
  const endBlock = useMemo(() => {
    if (!end) return null;
    try {
      return getBlockEntry(editor, end);
    } catch (e) {
      return null;
    }
  }, [editor, end]);

  const isAcrossBlock = useMemo(() => {
    if (startBlock && endBlock && Path.equals(startBlock[1], endBlock[1])) return false;
    return startBlock?.[0].blockId !== endBlock?.[0].blockId;
  }, [endBlock, startBlock]);

  const isCodeBlock = useMemo(() => {
    if (!start || !end) return false;
    const range = { anchor: start, focus: end };

    const [codeBlock] = editor.nodes({
      at: range,
      match: n => !Editor.isEditor(n) && Element.isElement(n) && n.type === BlockType.CodeBlock,
    });

    return !!codeBlock;
  }, [editor, end, start]);

  return (
    <div
      className={'flex w-fit flex-grow items-center gap-1'}
    >
      {!isCodeBlock && <>
        <AIAssistant />
        <Divider
          className={'my-1.5 bg--border-primary'}
          orientation={'vertical'}
          flexItem={true}
        />
      </>}
      {
        !isAcrossBlock && !isCodeBlock && <>
          <Heading />
          <Bold />
          <Underline />
          <Italic />
          <Color />
          {/* <StrikeThrough /> */}
        </>
      }
      {!isCodeBlock && <InlineCode />}
      {/* {!isCodeBlock && !isAcrossBlock && <Formula />} */}
      {
        !isAcrossBlock && !isCodeBlock && <>
          <Divider
            className={'my-1.5 bg--border-primary'}
            orientation={'vertical'}
            flexItem={true}
          />
          <TurnInto />
          <Divider
            className={'my-1.5 bg--border-primary'}
            orientation={'vertical'}
            flexItem={true}
          />
          <Href />
        </>
      }
      {!isCodeBlock && <Align enabled={toolbarVisible} />}
      {!isCodeBlock && <MoreOptions />}
    </div>
  );
}

export default ToolbarActions;