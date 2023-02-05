import { Component, Show } from 'solid-js';

interface GenericErrorProps {
  visible: boolean;
}

const GenericError: Component<GenericErrorProps> = (props) => (
  <Show when={props.visible}>
    <p class="text-sm text-red-400 mt-2 mb-6">
      An unexpected error occurred! Try again later.
    </p>
  </Show>
);

export default GenericError;
