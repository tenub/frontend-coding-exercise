import React from 'react';
import { DropTarget } from 'react-dnd';
import { TrashAlt } from '@styled-icons/boxicons-solid';

import { ItemTypes } from '../../ItemTypes';

class Trash extends React.PureComponent {
  /**
   * Only allow item types defined here to be deleted when dropped onto this
   * component.
   */
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

      /**
       * If an item is not dragged from the Canvas, i.e. it doesn't have an
       * index property, do not process or delete it.
       */
      const item = monitor.getItem();
      if (typeof item.index === 'undefined') {
        return;
      }

      props.deleteItem(item.index);

      return { name: 'Trash' };
    },
  }

  static collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
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
