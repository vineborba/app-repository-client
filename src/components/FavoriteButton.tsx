import { Component, Show } from 'solid-js';
import { RiHealthHeart3Fill, RiHealthHeart3Line } from 'solid-icons/ri';

interface FavoriteButtonProps {
  favorite: boolean;
  toggleFavorite: () => void;
}

const FavoriteButton: Component<FavoriteButtonProps> = (
  props: FavoriteButtonProps,
) => {
  const toggleFavorite = () => {
    props.toggleFavorite();
  };

  return (
    <button
      class="rounded-full shadow-xl p-3 h-12 w-12"
      onClick={toggleFavorite}
    >
      <Show
        when={props.favorite}
        fallback={<RiHealthHeart3Line class="fill-rose-600" size={24} />}
      >
        <RiHealthHeart3Fill class="fill-rose-600" size={24} />
      </Show>
    </button>
  );
};

export default FavoriteButton;
