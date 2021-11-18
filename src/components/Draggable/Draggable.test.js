import React from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import TestRenderer from 'react-test-renderer';

import Draggable from './';

test('Draggable renders successfully', () => {
  const draggable = (
    <DndProvider backend={HTML5Backend}>
      <Draggable
        index={0}
        name='text'
        type='text'
      >
        Text
      </Draggable>
    </DndProvider>
  );
  const testRenderer = TestRenderer.create(draggable);
  const testTree = testRenderer.toJSON();
  expect(testTree).toMatchSnapshot();
});
