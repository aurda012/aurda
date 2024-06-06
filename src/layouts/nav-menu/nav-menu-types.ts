export interface InitialState {
  itemWrapperLeft: number | null;
  itemWrapperRight: number | null;
  itemWrapperTop: number | null;
  itemWrapperHeight: number | null;
  hovering: number | null;
  hoveringElRect: DOMRect | null;
  hoveringWidth: number | null;
  popoverLeft: number | null;
  popoverHeight: number | null;
  popoverWidth: number | null;
}

export type ContentWrapperRounded = 'sm' | 'md' | 'lg' | 'xl' | 'none';
export type ContentWrapperShadow = 'sm' | 'md' | 'lg' | 'xl' | 'none';
export type NavMenuDirection = 'ltr' | 'rtl';

export type ContentUiProps = {
  shadow: ContentWrapperShadow;
  rounded: ContentWrapperRounded;
};

export type ItemTriggerRef = {
  component: React.ReactNode | null;
  props: NavMenuTriggerProps | null;
};

export type ItemContentRef = {
  component: React.ReactNode | null;
  props: NavMenuContentProps | null;
};

export type ItemRef = {
  trigger: ItemTriggerRef;
  content: ItemContentRef;
};

export type NavMenuProps = {
  className?: string;
  menuClassName?: string;
  menuContentClassName?: string;
  children: React.ReactNode;
  dir?: NavMenuDirection;
  fullscreen?: boolean;
  floatingOffset?: number;
};

export type NavMenuTriggerProps = {
  triggerType?: 'hover' | 'click';
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.HTMLAttributes<HTMLDivElement> &
  React.HTMLAttributes<HTMLLIElement>;

export type NavMenuContentProps = {
  children: React.ReactNode;
  className?: string;
  rounded?: ContentWrapperRounded;
  shadow?: ContentWrapperShadow;
};
