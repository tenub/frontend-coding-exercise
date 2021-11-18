import './App.css';

import React from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import { Canvas, Draggable, Tray } from './components';

/**
 * Create a Tray with Draggable components.
 * Canvas will receive and process any dragged components
 * using the react-dnd library.
 */
const App = () => (
  <DndProvider backend={HTML5Backend}>
    <Tray>
      <Draggable
        name='signup'
        type='text'
      >
        <strong>Sign Up</strong>
      </Draggable>

      <Draggable
        name='firstname'
        type='input'
      >
        <input
          name='firstname'
          placeholder='First Name'
          type='text'
        />
      </Draggable>

      <Draggable
        name='lastname'
        type='input'
      >
        <input
          name='lastname'
          placeholder='Last Name'
          type='text'
        />
      </Draggable>

      <Draggable
        name='email'
        type='input'
      >
        <input
          name='lastname'
          placeholder='Email Address'
          type='email'
        />
      </Draggable>

      <Draggable
        name='phone'
        type='input'
      >
        <input
          name='lastname'
          placeholder='Phone Number'
          type='tel'
        />
      </Draggable>

      <Draggable
        name='submit'
        type='button'
      >
        <button type='submit'>
          Submit
        </button>
      </Draggable>
    </Tray>

    <Canvas />
  </DndProvider>
);

export default App;
