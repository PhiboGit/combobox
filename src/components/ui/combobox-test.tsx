import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import React, { Fragment, useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

type Person = { id: number; name: string };
type DataType = Person | null;
const people: Person[] = [
  { id: 1, name: 'Wade Cooper' },
  { id: 2, name: 'Arlene Mccoy' },
  { id: 3, name: 'Devon Webb' },
  { id: 4, name: 'Tom Cook' },
  { id: 5, name: 'Tanya Fox' },
  { id: 6, name: 'Hellen Schmidt' },
];

type MyComboboxPros = {
  onSelectionChange?: (value: Person | null) => void;
};

export const ComboboxTest = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'> & MyComboboxPros
>(({ className, type, value, onChange, onSelectionChange, ...props }, ref) => {
  const [selected, setSelected] = useState<DataType>(
    people.find((p) => p.id === value) || null,
  );
  useEffect(() => {
    setSelected(people.find((p) => p.id === value) || null);
  }, [value]);
  function handleSelect(person: DataType): void {
    setSelected(person);
    if (onSelectionChange) {
      onSelectionChange(person);
    }
  }

  const [query, setQuery] = useState('');

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, '')),
        );

  return (
    <Combobox value={selected} onChange={handleSelect}>
      <div className="relative mt-1">
        <div
          className={cn(
            'relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm',
            className,
          )}
        >
          <ComboboxInput
            ref={ref}
            type={type}
            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
            displayValue={(person: unknown) =>
              person ? (person as unknown as Person).name : ''
            }
            onChange={(event) => {
              setQuery(event.target.value);
              if (onChange) {
                onChange(event);
              }
            }}
            {...props}
          />
          <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="size-5 text-gray-400"
              aria-hidden="true"
            />
          </ComboboxButton>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => {
            setQuery('');
          }}
        >
          <ComboboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {filteredPeople.length === 0 && query !== '' ? (
              <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                Nothing found.
              </div>
            ) : (
              filteredPeople.map((person) => (
                <ComboboxOption
                  key={person.id}
                  className={({ focus }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      focus ? 'bg-teal-600 text-white' : 'text-gray-900'
                    }`
                  }
                  value={person}
                >
                  {({ selected, focus }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {person.name}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            focus ? 'text-white' : 'text-teal-600'
                          }`}
                        >
                          <CheckIcon className="size-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </ComboboxOption>
              ))
            )}
          </ComboboxOptions>
        </Transition>
      </div>
    </Combobox>
  );
});
ComboboxTest.displayName = 'Combobox';
