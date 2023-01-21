import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import { RiDeviceQrCodeLine } from 'solid-icons/ri';
import {
  Dialog,
  DialogDescription,
  DialogPanel,
  Transition,
  TransitionChild,
} from 'solid-headless';

interface QrCodeModalProps {
  qrcode: string;
}

const QrCodeModal: Component<QrCodeModalProps> = (props: QrCodeModalProps) => {
  const [visible, setVisible] = createSignal(false);

  return (
    <>
      <RiDeviceQrCodeLine
        size={24}
        class="hover:cursor-pointer"
        onClick={() => setVisible(true)}
        role="button"
      />

      <Transition show={visible()}>
        <Dialog
          isOpen={visible()}
          onClose={() => setVisible(false)}
          class="relative z-50"
          as="div"
        >
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div class="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div class="fixed inset-0 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel class="max-w-sm transform overflow-hidden bg-white rounded-2xl w-fit p-6 flex flex-col justify-center items-center">
                  <DialogDescription>
                    Leia o QRCode para baixar o aplicativo!
                  </DialogDescription>
                  <img
                    width={240}
                    height={240}
                    src={props.qrcode}
                    alt="QRCode"
                  />
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default QrCodeModal;
