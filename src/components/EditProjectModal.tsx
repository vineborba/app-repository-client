import type { Component } from 'solid-js';
import { For, createEffect, createSignal } from 'solid-js';
import {
  Dialog,
  DialogDescription,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from 'solid-headless';
import { RiDesignEditLine } from 'solid-icons/ri';

import { updateProject } from '../api/project';
import Button from './Button';
import Input from './Input';
import Checkbox from './Checkbox';
import { ArtifactTypesOptions } from '../schemas/Artifact';
import { Project } from '../schemas/Project';

interface EditProjectModalProps {
  projectId: string;
  initialDescription: string;
  initialName: string;
  initialPlatforms: string[];
  refetchProject: () => Project | Promise<Project>;
}

const EditProjectModal: Component<EditProjectModalProps> = (
  props: EditProjectModalProps,
) => {
  const [visible, setVisible] = createSignal(false);
  const [platforms, setPlatforms] = createSignal<string[]>([]);
  const [name, setName] = createSignal('');
  const [description, setDescription] = createSignal('');

  createEffect(() => {
    setPlatforms(props.initialPlatforms);
    setName(props.initialName);
    setDescription(props.initialDescription);
  });

  const resetState = () => {
    setVisible(false);
    setPlatforms([]);
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
    await updateProject(props.projectId, data);
    await props.refetchProject();
    resetState();
  };

  const handleCheckboxSelection = (type: string) => {
    if (platforms().includes(type)) {
      setPlatforms((prev) => prev.filter((t) => t !== type));
    } else {
      setPlatforms((prev) => [...prev, type]);
    }
  };

  return (
    <>
      <button
        class="rounded-full shadow-xl p-3 h-12 w-12"
        type="button"
        onClick={() => setVisible(true)}
      >
        <RiDesignEditLine size={24} class="fill-emerald-500" />
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
                  <DialogTitle class="text-xl mb-2">Editar Projeto</DialogTitle>
                  <DialogDescription>
                    Edite os dados desejados do projeto
                  </DialogDescription>
                  <form
                    class="flex flex-col gap-4 my-2"
                    onSubmit={handleFormSubmission}
                  >
                    <Input
                      type="text"
                      label="Nome do projeto"
                      name="name"
                      value={name()}
                      maxLength={50}
                      required
                      placeholder="Nome do projeto"
                      onChange={(e) => setName(e.currentTarget.value)}
                    />
                    <Input
                      type="text"
                      label="Descrição do projeto"
                      name="description"
                      value={description()}
                      maxLength={120}
                      required
                      placeholder="Descrição do projeto"
                      onChange={(e) => setDescription(e.currentTarget.value)}
                    />
                    <fieldset
                      class="flex gap-2 mb-4 items-center"
                      name="platforms"
                    >
                      <legend class="my-2">Plataformas disponíveis:</legend>
                      <For each={ArtifactTypesOptions}>
                        {(type) => (
                          <Checkbox
                            checked={platforms().includes(type.value)}
                            label={type.label}
                            value={type.value}
                            name="platforms[]"
                            onChange={handleCheckboxSelection}
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
                        Cancelar
                      </Button>
                      <Button
                        type="submit"
                        disabled={
                          !name() || platforms().length === 0 || !description()
                        }
                      >
                        Confirmar edição
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

export default EditProjectModal;
