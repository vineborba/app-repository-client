import { A } from '@solidjs/router';
import type { Component, JSX } from 'solid-js';
import { mergeProps, splitProps } from 'solid-js';

interface NavButtonProps extends JSX.AnchorHTMLAttributes<HTMLAnchorElement> {
  buttonType?: 'primary' | 'secondary';
}

const NavButton: Component<NavButtonProps> = (_props) => {
  const props = mergeProps({ class: '', buttonType: 'primary' }, _props);
  const [local, rest] = splitProps(props, [
    'class',
    'onClick',
    'children',
    'buttonType',
  ]);

  function getButtonColor() {
    if (local.buttonType === 'secondary') {
      return `
        border border-emerald-400
        text-emerald-400
        hover:bg-emerald-300 hover:text-white hover:border-emerald-300
        disabled:border-slate-300 disabled:text-slate-300
      `;
    }

    return 'bg-emerald-400 hover:bg-emerald-500 text-white disabled:bg-slate-300';
  }

  return (
    <A
      class={`rounded-lg inline-block text-center w-48 px-4 py-2 ${getButtonColor()} ${
        local.class
      }`}
      href={props.href}
      {...rest}
    >
      {local.children}
    </A>
  );
};

export default NavButton;
