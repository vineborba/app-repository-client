type FormEvent = Event & {
  submitter: HTMLElement;
} & {
  currentTarget: HTMLFormElement;
  target: Element;
};

type OnChangeInputEvent = Event & {
  currentTarget: HTMLInputElement;
  target: Element;
};
