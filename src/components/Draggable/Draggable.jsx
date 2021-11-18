import React from 'react';
import { DragSource } from 'react-dnd';

import { ItemTypes } from '../../ItemTypes';

class Draggable extends React.PureComponent {
  static type = ({ type }) => {
    const itemTypeKey = type.toUpperCase()
    return ItemTypes[itemTypeKey];
  }

  static spec = {
    beginDrag: (props, monitor, component) => {
      const { children, index, name, type } = props;
      return { children, index, name, type };
    },
  }

  static collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    handlerId: monitor.getHandlerId(),
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
