import { Dispatch, MutableRefObject } from 'react';
import { InitialState } from './nav-menu-types';

export function navMenuReducer(prev: InitialState, next: InitialState) {
  return { ...prev, ...next };
}

export function handleMouseEnter({
  index,
  el,
  set,
  contentRefs,
}: {
  index: number;
  el: HTMLElement;
  set: Dispatch<any>;
  contentRefs: MutableRefObject<(HTMLElement | null)[]>;
}) {
  set({
    hovering: index,
    popoverLeft: el.offsetLeft,
    hoveringWidth: el.offsetWidth,
    hoveringElRect: el.getBoundingClientRect(),
  });
  const contentElement = contentRefs.current[index];
  if (contentElement) {
    set({
      popoverHeight: contentElement.offsetHeight,
      popoverWidth: contentElement.offsetWidth,
    });
  }
}
