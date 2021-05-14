import React, {Component,useState} from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';

const SortableItem = SortableElement(({value}) => <li>{value}</li>);

const SortableList = SortableContainer(({items}) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${value}`} index={index} value={value} />
      ))}
    </ul>
  );
});

const test2 = () => {
    const [items, setitems] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'])
    const onSortEnd = ({oldIndex, newIndex}) => {
        setitems(arrayMove(items,oldIndex,newIndex))
        // setitems(({items}) => ({
        //   items: arrayMove(items, oldIndex, newIndex),
        // }));
      };
      console.log(items)
    return ( 
        <SortableList items={items} onSortEnd={onSortEnd} />
     );
}
 
export default test2;

