import React from 'react';
import { DropTarget } from 'react-dnd';
import { TrashAlt } from '@styled-icons/boxicons-solid';

import { ItemTypes } from '../../ItemTypes';

class Trash extends React.PureComponent {
  static types = [
    ItemTypes.BUTTON,
    ItemTypes.INPUT,
    ItemTypes.TEXT,
  ]

  static spec = {
    drop: (props, monitor) => {
      const drop = monitor.getDropResult();
      if (!drop) {
        return;
      }

      const item = monitor.getItem();
      if (typeof item.index === 'undefined') {
        return;
      }

      props.deleteItem(item.index);

      return { name: 'Trash' };
    },
  }

  static collect = (connect, monitor) => ({
    canDrop: monitor.canDrop(),
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    itemType: monitor.getItemType(),
  })

  render() {
    const { isOver, isVisible, connectDropTarget } = this.props;
    const backgroundColor = isOver ? 'lightgrey' : 'white';
    const opacity = isVisible ? 1.0 : 0.0;

    return connectDropTarget(
      <div
        className='element-trash'
        style={{ backgroundColor, opacity }}
      >
        <TrashAlt className='element-trash__icon' />
      </div>
    );
  }
}

export default DropTarget(
  Trash.types,
  Trash.spec,
  Trash.collect,
)(Trash);
