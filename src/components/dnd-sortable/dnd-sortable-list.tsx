/* eslint-disable no-duplicate-imports */
import React, { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { Active, DragEndEvent, UniqueIdentifier } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { SortableOverlay } from './dnd-sortable-overly';
import { DragHandle, SortableItem } from './dnd-sortable-item';

interface BaseItem {
  id: UniqueIdentifier;
}

interface Props<T extends BaseItem> {
  items: T[];
  onChange(event: DragEndEvent): void;
  renderItem?: ReactNode;
  children?: ReactNode;
}

export function SortableList<T extends BaseItem>({
  items,
  onChange,
  renderItem,
  children,
}: Props<T>) {
  const [active, setActive] = useState<Active | null>(null);
  const activeItem = useMemo(
    () => items.find((item) => item.id === active?.id),
    [active, items]
  );
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => {
        setActive(active);
      }}
      onDragEnd={(event) => {
        onChange(event);
        setActive(null);
      }}
      onDragCancel={() => {
        setActive(null);
      }}
    >
      <SortableContext items={items}>{children}</SortableContext>
      {/* <SortableOverlay>
        {activeItem ? renderItem(activeItem) : null}
      </SortableOverlay> */}
    </DndContext>
  );
}

SortableList.Item = SortableItem;
SortableList.DragHandle = DragHandle;
SortableList.Overlay = SortableOverlay;
