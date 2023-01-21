import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import {
  Dialog,
  DialogDescription,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from 'solid-headless';
import { RiSystemDeleteBin2Fill } from 'solid-icons/ri';

import { deleteProject } from '../api/project';
import Button from './Button';
import Input from './Input';

interface DeleteProjectModalProps {
  projectId: string;
  projectName: string;
}

const DeleteProjectModal: Component<DeleteProjectModalProps> = (
  props: DeleteProjectModalProps,
) => {
  const [visible, setVisible] = createSignal(false);
  const [name, setName] = createSignal('');
  const navigate = useNavigate();

  const resetState = () => {
    setVisible(false);
    setName('');
  };

  const handleFormSubmission = async (e: FormEvent) => {
    e.preventDefault();
    await deleteProject(props.projectId);
    navigate('/', { replace: true });
    resetState();
  };

  return (
    <>
      <button
        class="rounded-full shadow-xl p-3 h-12 w-12"
        type="button"
        onClick={() => setVisible(true)}
      >
        <RiSystemDeleteBin2Fill size={24} class="fill-rose-600" />
      </button>

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
            <div class="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel class="max-w-lg transform overflow-hidden bg-white rounded-2xl w-170 p-6 flex flex-col justify-center">
                  <DialogTitle class="text-xl mb-2">
                    Delete Project
                  </DialogTitle>
                  <DialogDescription class="font-bold">
                    By deleting this project, all it's data and build artifacts
                    will be deleted indefinetly!
                  </DialogDescription>
                  <p class="mt-3 text-sm">
                    Input &quot;<strong>{props.projectName}</strong>&quot; in
                    the field aboce to confirm this action:
                  </p>
                  <form
                    class="flex flex-col gap-2 my-2"
                    onSubmit={handleFormSubmission}
                  >
                    <Input
                      type="text"
                      label="Project name"
                      name="name"
                      value={name()}
                      maxLength={50}
                      required
                      placeholder="Project name"
                      onChange={(e) => setName(e.currentTarget.value)}
                    />
                    <div class="flex gap-20 mt-4">
                      <Button
                        type="button"
                        buttonType="secondary"
                        onClick={resetState}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={!name() || name() !== props.projectName}
                      >
                        Delete
                      </Button>
                    </div>
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default DeleteProjectModal;
