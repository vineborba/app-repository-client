import type { Component, JSX } from 'solid-js';
import { mergeProps, splitProps } from 'solid-js';

interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: Component<InputProps> = (_props: InputProps) => {
  const props = mergeProps({ class: '' }, _props);
  const [local, rest] = splitProps(props, ['class', 'name', 'label']);
  return (
    <div class="relative w-full mt-1">
      <input
        id={local.name}
        name={local.name}
        class={`peer rounded border border-slate-400 placeholder-transparent w-full focus:ring-emerald-500 focus:border-emerald-500 ${local.class}`}
        {...rest}
      />
      {!!local.label && (
        <label
          class="
          text-sm text-slate-500 peer-placeholder-shown:text-base
          peer-required:after:content-['*'] peer-required:after:text-red-400 peer-required:after:text-sm
          px-1
          pointer-events-none
          absolute -top-3 left-2 peer-placeholder-shown:top-2 peer-placeholder-shown:left-2
          bg-white w-fit  peer-placeholder-shown:bg-transparent transition-all duration-300"
          for={local.name}
        >
          {local.label}
        </label>
      )}
    </div>
  );
};

export default Input;
