import type { Component, JSX } from 'solid-js';
import { mergeProps, splitProps } from 'solid-js';

interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: Component<InputProps> = (_props: InputProps) => {
  const props = mergeProps({ class: '' }, _props);
  const [local, rest] = splitProps(props, ['class', 'name', 'label', 'error']);

  return (
    <div class={`relative w-full mt-1 ${local.class}`}>
      <input
        id={local.name}
        name={local.name}
        class={`peer
        rounded border ${local.error ? 'border-red-400' : 'border-slate-400'}
        placeholder-transparent
        w-full
        focus:ring-emerald-500 focus:border-emerald-500`}
        {...rest}
      />
      {!!local.label && (
        <label
          class={`
          text-sm text-${
            local.error ? 'red-400' : 'slate-500'
          } peer-placeholder-shown:text-base
          peer-required:after:content-['*'] peer-required:after:text-red-400 peer-required:after:text-sm
          px-1
          pointer-events-none
          absolute -top-3 left-2 peer-placeholder-shown:top-2 peer-placeholder-shown:left-2
          bg-white w-fit  peer-placeholder-shown:bg-transparent transition-all duration-300`}
          for={local.name}
        >
          {local.label}
        </label>
      )}
      {!!local.error && (
        <label
          class="
          text-sm text-red-400
          py-2
          pointer-events-none
          bg-white w-fit  bg-transparent transition-all duration-300"
          for={local.name}
        >
          {local.error}
        </label>
      )}
    </div>
  );
};

export default Input;
