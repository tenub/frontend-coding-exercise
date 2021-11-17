import React from 'react';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from '../../ItemTypes';

class Placeholder extends React.PureComponent {
  static types = [
    ItemTypes.BUTTON,
    ItemTypes.INPUT,
    ItemTypes.TEXT,
  ]

  static spec = {
    drop: (props, monitor) => {
      const { position } = props;
      return {
        name: 'Placeholder',
        position,
      };
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
    const { isOver, canDrop, connectDropTarget } = this.props;
    const isActive = canDrop && isOver;
    let backgroundColor;
    if (isActive) {
      backgroundColor = 'darkgreen';
    } else if (canDrop) {
      backgroundColor = 'darkkhaki';
    } else {
      backgroundColor = 'white'
    }

    return connectDropTarget(
      <div
        className='element-placeholder'
        style={{ backgroundColor }}
      />
    );
  }
}

export default DropTarget(
  Placeholder.types,
  Placeholder.spec,
  Placeholder.collect,
)(Placeholder);
