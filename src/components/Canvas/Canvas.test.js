import React from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import TestRenderer from 'react-test-renderer';

import Canvas from './';

test('Canvas renders successfully', () => {
  const canvas = (
    <DndProvider backend={HTML5Backend}>
      <Canvas />
    </DndProvider>
  );
  const testRenderer = TestRenderer.create(canvas);
  const testTree = testRenderer.toJSON();
  expect(testTree).toMatchSnapshot();
});
