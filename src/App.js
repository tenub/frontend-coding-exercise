import './App.css';

import React from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import { Canvas, Draggable, Tray } from './components';

const App = () => (
  <DndProvider backend={HTML5Backend}>
    <Tray>
      <Draggable name='signup' type='text'>
        <strong>Sign Up</strong>
      </Draggable>

      <Draggable name='firstname' type='input'>
        <input type='text' name='firstname' placeholder='First Name' />
      </Draggable>

      <Draggable name='lastname' type='input'>
        <input type='text' name='lastname' placeholder='Last Name' />
      </Draggable>

      <Draggable name='email' type='input'>
        <input type='email' name='lastname' placeholder='Email Address' />
      </Draggable>

      <Draggable name='phone' type='input'>
        <input type='tel' name='lastname' placeholder='Phone Number' />
      </Draggable>

      <Draggable name='submit' type='button'>
        <button type='submit'>
          Submit
        </button>
      </Draggable>
    </Tray>

    <Canvas />
  </DndProvider>
);

export default App;
