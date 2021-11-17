import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../ItemTypes';

const Draggable = ({
  children,
  deleteItem,
  position,
  name,
  type,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes[type.toUpperCase()],
    item: { children, position, name, type },
    end: (item, monitor) => {
      if (!deleteItem) {
        return;
      }

      const dropResult = monitor.getDropResult();
      if (item && !dropResult) {
        deleteItem(item.position);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))

  const opacity = isDragging ? 0.4 : 1;

  return (
    <div
      ref={drag}
      className='element-draggable'
      style={{ opacity }}
    >
      {children}
    </div>
  );
};

export default Draggable;
