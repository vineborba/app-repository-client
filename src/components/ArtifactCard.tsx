import type { Component, JSX } from 'solid-js';
import { For } from 'solid-js';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
} from 'solid-headless';
import {
  RiLogosAndroidFill,
  RiLogosAppleFill,
  RiSystemArrowDownSLine,
} from 'solid-icons/ri';
import { format } from 'date-fns';

import type { Artifact } from '../schemas/Artifact';

import QrCodeModal from './QrCodeModal';
import DownloadArtifactButton from './DownloadArtifactButton';

const artifactToPlatformType: Record<string, string> = {
  aab: 'android',
  apk: 'android',
  ipa: 'ios',
};

const platformsRep: Record<string, JSX.Element> = {
  android: <RiLogosAndroidFill color="#3DDC84" size={24} />,
  ios: <RiLogosAppleFill size={24} />,
};

const ArtifactCard: Component<Artifact> = (props: Artifact) => {
  return (
    <Disclosure defaultOpen as="article" class="w-full">
      {({ isOpen }) => (
        <>
          <DisclosureButton
            class="p-4 bg-emerald-100 w-full flex justify-between items-center"
            classList={{
              'rounded-t-lg': isOpen(),
              'rounded-lg': !isOpen(),
            }}
          >
            {props._id}
            <RiSystemArrowDownSLine
              class="transition-transform"
              classList={{ 'transform rotate-180': isOpen() }}
              size={24}
            />
          </DisclosureButton>
          <Transition
            enter="transition duration-700 ease-out"
            enterFrom="transform opacity-0"
            enterTo="transform opacity-100"
            leave="transition duration-200 ease-out"
            leaveFrom="transform opacity-100"
            leaveTo="transform opacity-0"
            show={isOpen()}
          >
            <DisclosurePanel class="bg-teal-50 rounded-lg">
              <For
                each={props.artifacts.filter((artifact) =>
                  props.filter.includes(
                    artifactToPlatformType[artifact.extension],
                  ),
                )}
              >
                {(artifact) => {
                  const platform = artifactToPlatformType[artifact.extension];
                  return (
                    <div class="flex items-center justify-between p-4 border-b last:rounded-b-lg">
                      <div class="flex max-w-fit items-center">
                        <p class="p-2 bg-emerald-100 mr-4 rounded-full text-gray-400">
                          {artifact.identifier || artifact.branch}
                        </p>
                        {platformsRep[platform]}
                      </div>
                      <span>
                        {format(
                          new Date(artifact.createdAt),
                          'dd/MM/yyyy HH:mm',
                        )}
                      </span>
                      <div class="flex items-center">
                        <QrCodeModal qrcode={artifact.qrcode} />
                        <DownloadArtifactButton
                          artifactId={artifact._id.$oid}
                          fileName={artifact.originalFilename}
                          setIsDownloading={props.setIsDownloading}
                        />
                      </div>
                    </div>
                  );
                }}
              </For>
            </DisclosurePanel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export default ArtifactCard;
