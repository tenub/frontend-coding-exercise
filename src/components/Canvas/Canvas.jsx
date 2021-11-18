import React from 'react';
import { DropTarget } from 'react-dnd';

import { ItemTypes } from '../../ItemTypes';
import Draggable from '../Draggable';
import Placeholder from '../Placeholder';
import Trash from '../Trash';

class Canvas extends React.PureComponent {
  /**
   * Only process item types defined here whenever an arbitrary item is dropped
   * onto the Canvas.
   */
  static types = [
    ItemTypes.BUTTON,
    ItemTypes.INPUT,
    ItemTypes.TEXT,
  ]

  /**
   * Canvas drops will have one of two action types: adding a new item to the
   * Canvas or moving a preexisting item from within the Canvas. An index
   * property of the item is used to determine which action to take. When a
   * draggable item is dropped within the Canvas, add a new component if
   * there is no index property, otherwise the index property will be used to
   * swap the dragged item with the dropped location's item.
   */
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

      return { name: 'Canvas' };
    },
  }

  static collect = (connect, monitor) => ({
    canDrop: monitor.canDrop(),
    connectDropTarget: connect.dropTarget(),
    draggingItem: monitor.getItem(),
  })

  constructor() {
    super();

    // Assume a 2x4 grid to fill the Canvas
    this.state = {
      items: new Array(8).fill(null),
    };
  }

  /**
   * Set a new item at the specified index.
   */
  addItem = (item, toIndex) => {
    this.setState((state) => {
      const newItems = state.items.slice();
      newItems[toIndex] = item;
      return { items: newItems };
    });
  }

  /**
   * Move an existing item from one index to another, swapping it with whatever
   * item exists in the other index.
   */
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

  /**
   * Delete an item at the specified index.
   */
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
            /**
             * An item will either "exist" and be a draggable component wrapped
             * in a placeholder element or it will not "exist" and simply be a
             * placeholder element with no children.
             */
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
