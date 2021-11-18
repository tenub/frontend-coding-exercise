import React from 'react';
import { DropTarget } from 'react-dnd';

import { ItemTypes } from '../../ItemTypes';
import Draggable from '../Draggable';
import Placeholder from '../Placeholder';
import Trash from '../Trash';

class Canvas extends React.PureComponent {
  static types = [
    ItemTypes.BUTTON,
    ItemTypes.INPUT,
    ItemTypes.TEXT,
  ]

  static spec = {
    drop: (props, monitor, component) => {
      const drop = monitor.getDropResult();
      if (!drop) {
        return;
      }

      const item = monitor.getItem();
      if (typeof item.index === 'undefined') {
        component.addItem(item, drop.index);
      } else {
        component.swapItems(item.index, drop.index);
      }

      return {
        name: 'Canvas',
      };
    },
  }

  static collect = (connect, monitor) => ({
    canDrop: monitor.canDrop(),
    connectDropTarget: connect.dropTarget(),
    draggingItem: monitor.getItem(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
  })

  constructor() {
    super();

    this.state = {
      items: new Array(8).fill(null),
    };
  }

  addItem = (item, toIndex) => {
    this.setState((state) => {
      const newItems = state.items.slice();
      newItems[toIndex] = item;
      return { items: newItems };
    });
  }

  swapItems = (fromIndex, toIndex) => {
    this.setState((state) => {
      const newItems = state.items.slice();
      const toItem = newItems[toIndex];
      const fromItem = newItems[fromIndex];
      newItems[fromIndex] = toItem;
      newItems[toIndex] = fromItem;
      return { items: newItems };
    });
  }

  deleteItem = (atIndex) => {
    this.setState((state) => {
      const newItems = state.items.slice();
      newItems[atIndex] = null;
      return { items: newItems };
    });
  }

  render() {
    const { canDrop, connectDropTarget, draggingItem } = this.props;
    const { items } = this.state;
    const draggingItemIsInCanvas = draggingItem && typeof draggingItem.index !== 'undefined';
    const trashIsVisible = canDrop && draggingItemIsInCanvas;

    return connectDropTarget(
      <div className='form'>
        <form className='form-canvas'>
          {items.map((item, index) => {
            let draggableItem;
            if (item) {
              const { children, name, type } = item;
              const isDraggableItem = Canvas.types.includes(type);
              if (isDraggableItem) {
                draggableItem = (
                  <Draggable
                    key={index}
                    index={index}
                    name={name}
                    type={type}
                  >
                    {children}
                  </Draggable>
                );
              }
            } else {
              draggableItem = null;
            }

            return (
              <Placeholder
                key={index}
                index={index}
              >
                {draggableItem}
              </Placeholder>
            );
          })}
        </form>

        <Trash
          deleteItem={this.deleteItem}
          isVisible={trashIsVisible}
          items={items}
        />
      </div>
    );
  }
};

export default DropTarget(
  Canvas.types,
  Canvas.spec,
  Canvas.collect,
)(Canvas);
