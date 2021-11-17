import React from 'react';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from '../../ItemTypes';
import Draggable from '../Draggable';
import Placeholder from '../Placeholder';

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
      if (typeof item.position === 'undefined') {
        component.appendItem({
          ...item,
          position: drop.position,
        });
      } else {
        component.moveItem(item.position, drop.position);
      }

      return {
        name: 'Canvas',
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

  static grid = [...Array(8).keys()]

  appendItem(item) {
    this.setState(state => ({
      ...state,
      items: [
        ...state.items,
        item,
      ],
    }));
  }

  moveItem(fromPosition, toPosition) {
    this.setState((state) => {
      const itemIndex = state.items.findIndex(item => item.position === fromPosition);

      if (itemIndex > -1) {
        const fromItem = state.items[itemIndex];

        return {
          ...state,
          items: [
            ...state.items.slice(0, itemIndex),
            {
              ...fromItem,
              position: toPosition,
            },
            ...state.items.slice(itemIndex + 1),
          ],
        };
      }

      return state;
    });
  }

  deleteItem = (atPosition) => {
    this.setState(state => {
      const itemIndex = state.items.findIndex(item => item.position === atPosition);

      return {
        ...state,
        items: [
          ...state.items.slice(0, itemIndex),
          ...state.items.slice(itemIndex + 1),
        ],
      };
    });
  }

  constructor() {
    super();
    this.state = {
      items: [],
    };
  }

  render() {
    const { connectDropTarget } = this.props;
    const { items } = this.state;

    return connectDropTarget(
      <form className='form-canvas'>
        {Canvas.grid.map((index) => {
          const item = items.find(item => item.position === index);

          if (item) {
            const { children, name, type } = item;
            if (Canvas.types.includes(type)) {
              return (
                <Draggable
                  key={index}
                  className='element-draggable element-input'
                  deleteItem={this.deleteItem}
                  position={index}
                  name={name}
                  type={type}
                >
                  {children}
                </Draggable>
              );
            }
          }

          return (
            <Placeholder
              key={index}
              position={index}
            />
          );
        })}
      </form>
    );
  }
};

export default DropTarget(
  Canvas.types,
  Canvas.spec,
  Canvas.collect,
)(Canvas);
