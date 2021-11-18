import React from 'react';
import { DragSource } from 'react-dnd';

import { ItemTypes } from '../../ItemTypes';

class Draggable extends React.PureComponent {
  /**
   * Allow all items with a defined type to be draggable.
   */
  static type = ({ type }) => {
    const itemTypeKey = type.toUpperCase()
    return ItemTypes[itemTypeKey];
  }

  /**
   * Share necessary item properties so they can be used in determining
   * draggable and droppable states.
   */
  static spec = {
    beginDrag: (props, monitor, component) => {
      const { children, index, name, type } = props;
      return { children, index, name, type };
    },
  }

  static collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })

  render() {
    const { connectDragSource, isDragging, children } = this.props;
    const opacity = isDragging ? 0.4 : 1.0;

    return connectDragSource(
      <div
        className='element-draggable'
        style={{ opacity }}
      >
        {children}
      </div>
    );
  }
}

export default DragSource(
  Draggable.type,
  Draggable.spec,
  Draggable.collect,
)(Draggable);
