import React from 'react';
import TestRenderer from 'react-test-renderer';

import Tray from './';

test('Tray renders successfully', () => {
  const tray = (
    <Tray>
      Child text
    </Tray>
  );
  const testRenderer = TestRenderer.create(tray);
  const testTree = testRenderer.toJSON();
  expect(testTree).toMatchSnapshot();
});
