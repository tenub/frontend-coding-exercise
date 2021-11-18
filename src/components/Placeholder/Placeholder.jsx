import React from 'react';
import { DropTarget } from 'react-dnd';

import { ItemTypes } from '../../ItemTypes';

class Placeholder extends React.PureComponent {
  /**
   * Only process item types defined here whenever an item is dropped
   * onto the Placeholder.
   */
  static types = [
    ItemTypes.BUTTON,
    ItemTypes.INPUT,
    ItemTypes.TEXT,
  ]

  static spec = {
    drop: (props, monitor) => {
      const { index } = props;
      return {
        name: 'Placeholder',
        index,
      };
    },
  }

  static collect = (connect, monitor) => ({
    canDrop: monitor.canDrop(),
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  })

  render() {
    const { children, isOver, canDrop, connectDropTarget } = this.props;
    const isActive = canDrop && isOver;

    let backgroundColor;
    if (isActive) {
      backgroundColor = 'grey';
    } else if (canDrop) {
      backgroundColor = 'lightgrey';
    } else {
      backgroundColor = 'white'
    }

    return connectDropTarget(
      <div
        className='element-placeholder'
        style={{ backgroundColor }}
      >
        {children}
      </div>
    );
  }
}

export default DropTarget(
  Placeholder.types,
  Placeholder.spec,
  Placeholder.collect,
)(Placeholder);
