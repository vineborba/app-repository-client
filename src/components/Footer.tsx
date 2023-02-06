import { Component } from 'solid-js';

const Footer: Component = () => {
  return (
    <footer
      class="
      flex justify-center
      w-full
      py-4
      bg-white
      border-t border-t-slate-200"
    >
      Made with 💚 by&nbsp;
      <a
        href="https://github.com/vineborba"
        target="_blank"
        rel="noreferrer noopener"
        class="text-green-500"
      >
        Vinicius de Borba
      </a>
    </footer>
  );
};

export default Footer;
