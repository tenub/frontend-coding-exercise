import React from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import TestRenderer from 'react-test-renderer';

import Placeholder from './';

test('Placeholder renders successfully', () => {
  const placeholder = (
    <DndProvider backend={HTML5Backend}>
      <Placeholder index={0}>
        Text
      </Placeholder>
    </DndProvider>
  );
  const testRenderer = TestRenderer.create(placeholder);
  const testTree = testRenderer.toJSON();
  expect(testTree).toMatchSnapshot();
});
