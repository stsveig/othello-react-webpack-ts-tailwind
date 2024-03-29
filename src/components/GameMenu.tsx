import React from "react";
import { Menu, Switch, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/solid";

import { useOthelloGameState } from "../context/OthelloContext";

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

export const GameMenu: React.FunctionComponent = () => {
  const { game, toggleVanillaOthello } = useOthelloGameState();

  return (
    <Menu
      as="div"
      className="absolute right-1 top-5 inline-block text-left select-none"
    >
      <div>
        <Menu.Button className="rounded-full flex items-center text-gray-400 hover:text-gray-600">
          <span className="sr-only">Open options</span>
          <DotsVerticalIcon className="h-7 w-7" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <div
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Account settings
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  another cool feature
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div className="flex items-center justify-between px-4 py-2 text-sm">
                  <div>Vanilla Othello</div>
                  <Switch
                    checked={game.vanillaOthello}
                    onChange={() => toggleVanillaOthello()}
                    className={`${
                      game.vanillaOthello ? "bg-blue-600" : "bg-gray-200"
                    } relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                    <span className="sr-only">Enable notifications</span>
                    <span
                      className={`${
                        game.vanillaOthello ? "translate-x-6" : "translate-x-1"
                      } inline-block h-4 w-4 transform rounded-full bg-white`}
                    />
                  </Switch>
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block w-full text-left px-4 py-2 text-sm"
                  )}
                >
                  Sign out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
