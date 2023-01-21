import { Component, Show } from 'solid-js';

interface RadioProps {
  checked: boolean;
  label: string;
  onClick: () => void;
  class?: string;
}

const Radio: Component<RadioProps> = (props: RadioProps) => {
  return (
    <button
      type="button"
      class={`flex flex-row ${props.class}`}
      // eslint-disable-next-line solid/reactivity
      onClick={props.onClick}
    >
      <div
        class="h-6 w-6 flex items-center justify-center rounded-full border border-emerald-400"
        classList={{
          'bg-emerald-400': props.checked,
          'bg-transparent': !props.checked,
        }}
      >
        <Show when={props.checked}>
          <span class="text-white text-xs">✓</span>
        </Show>
      </div>
      <span class="text ml-2 text-black">{props.label}</span>
    </button>
  );
};

export default Radio;
