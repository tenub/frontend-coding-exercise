import React from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import TestRenderer from 'react-test-renderer';

import Trash from './';

test('Trash renders successfully', () => {
  const deleteItem = () => {}
  const trash = (
    <DndProvider backend={HTML5Backend}>
      <Trash
        deleteItem={deleteItem}
        isVisible
        items={[]}
      />
    </DndProvider>
  );
  const testRenderer = TestRenderer.create(trash);
  const testTree = testRenderer.toJSON();
  expect(testTree).toMatchSnapshot();
});
