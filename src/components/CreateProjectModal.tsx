import type { Component } from 'solid-js';
import { For, createSignal } from 'solid-js';
import {
  Dialog,
  DialogDescription,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from 'solid-headless';
import { RiSystemAddLine } from 'solid-icons/ri';

import { createProject } from '../api/project';

import { ArtifactTypesOptions } from '../schemas/Artifact';
import { Project } from '../schemas/Project';

import Button from './Button';
import Input from './Input';
import Checkbox from './Checkbox';

interface CreateProjectModalProps {
  refetchProjects: () => Project[] | Promise<Project[]>;
}

const CreateProjectModal: Component<CreateProjectModalProps> = (props) => {
  const [visible, setVisible] = createSignal(false);
  const [platforms, setPlatforms] = createSignal(['ios', 'android']);
  const [name, setName] = createSignal('');
  const [description, setDescription] = createSignal('');

  const resetState = () => {
    setVisible(false);
    setPlatforms(['ios', 'android']);
    setName('');
    setDescription('');
  };

  const handleFormSubmission = async (e: FormEvent) => {
    e.preventDefault();
    const data = {
      platforms: platforms(),
      name: name(),
      description: description(),
    };
    await createProject(data);
    await props.refetchProjects();
    resetState();
  };

  const handleCheckboxChange = (type: string) => {
    if (platforms().includes(type)) {
      setPlatforms((prev) => prev.filter((t) => t !== type));
    } else {
      setPlatforms((prev) => [...prev, type]);
    }
  };

  return (
    <>
      <Button
        class="w-fit flex items-center gap-1.5"
        buttonType="secondary"
        onClick={() => setVisible(true)}
      >
        <RiSystemAddLine size={24} />
        Add project
      </Button>

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
                    Register Project
                  </DialogTitle>
                  <DialogDescription>
                    Input the following required informations:
                  </DialogDescription>
                  <form
                    class="flex flex-col gap-4 my-2"
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
                    <Input
                      type="text"
                      label="Project description"
                      name="description"
                      value={description()}
                      maxLength={120}
                      required
                      placeholder="Project description"
                      onChange={(e) => setDescription(e.currentTarget.value)}
                    />
                    <fieldset
                      class="flex gap-2 mb-4 items-center"
                      name="platforms"
                    >
                      <legend class="my-2">Available platforms:</legend>
                      <For each={ArtifactTypesOptions}>
                        {(type) => (
                          <Checkbox
                            checked={platforms().includes(type.value)}
                            label={type.label}
                            value={type.value}
                            name="platforms[]"
                            onChange={handleCheckboxChange}
                            class="mr-4"
                          />
                        )}
                      </For>
                    </fieldset>
                    <div class="flex gap-20">
                      <Button
                        type="button"
                        buttonType="secondary"
                        onClick={resetState}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={
                          !name() || platforms().length === 0 || !description()
                        }
                      >
                        Submit
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

export default CreateProjectModal;
