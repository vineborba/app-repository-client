import type { Component } from 'solid-js';

interface CheckboxProps {
  label: string;
  value: string;
  name?: string;
  class?: string;
  checked: boolean;
  onChange: (value: string) => void;
}

const Checkbox: Component<CheckboxProps> = (props) => {
  const handleOnChange = () => {
    props.onChange(props.value);
  };

  return (
    <div class={`flex gap-1.5 items-center ${props.class}`}>
      <input
        type="checkbox"
        id={props.label}
        name={props.name ?? props.label}
        class="h-6 w-6
        border border-emerald-600
        text-emerald-400
        rounded
        active:bg-emerald-400
        focus:ring-emerald-400"
        checked={props.checked}
        onChange={handleOnChange}
        value={props.value}
      />
      <label for="label">{props.label}</label>
    </div>
  );
};

export default Checkbox;
