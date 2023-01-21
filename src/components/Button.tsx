import type { Component, JSX } from 'solid-js';
import { mergeProps, splitProps } from 'solid-js';

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: 'primary' | 'secondary';
}

const Button: Component<ButtonProps> = (_props) => {
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
    <button
      class={`rounded-lg w-48 px-4 py-2 ${getButtonColor()} ${local.class}`}
      // eslint-disable-next-line solid/reactivity
      onClick={local.onClick}
      {...rest}
    >
      {local.children}
    </button>
  );
};

export default Button;
