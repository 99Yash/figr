import { Command as CommandPrimitive } from 'cmdk';
import { useCallback, useRef, useState, type KeyboardEvent } from 'react';

import {
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

type AutoCompleteProps = {
  options: string[];
  value: string;
  onValueChange?: (value: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
};

export function AutoComplete({
  options,
  placeholder,
  value,
  onValueChange,
  disabled,
  isLoading = false,
}: AutoCompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState<string>(value);
  const [inputValue, setInputValue] = useState<string>(
    selected ? selected.toString() : ''
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (!input) {
        return;
      }

      // Keep the options displayed when the user is typing
      if (!isOpen) {
        setOpen(true);
      }

      // This is not a default behaviour of the <input /> field
      if (event.key === 'Enter' && input.value !== '') {
        const optionToSelect = options.find((option) => option === input.value);
        if (optionToSelect) {
          setSelected(optionToSelect);
          onValueChange?.(optionToSelect);
        } else {
          setSelected(input.value);
          onValueChange?.(input.value);
        }
      }

      if (event.key === 'Escape') {
        setInputValue(inputValue);
        input.blur();
      }
    },
    [isOpen, options, onValueChange, inputValue]
  );

  const handleBlur = useCallback(() => {
    setInputValue(inputValue);
    setSelected(inputValue);
    onValueChange?.(inputValue);
    setOpen(false);
  }, [inputValue, onValueChange]);

  const handleSelectOption = useCallback(
    (selectedOption: string) => {
      setInputValue(selectedOption);

      setSelected(selectedOption);
      onValueChange?.(selectedOption);

      // This is a hack to prevent the input from being focused after the user selects an option
      // We can call this hack: "The next tick"
      setTimeout(() => {
        inputRef?.current?.blur();
      }, 0);
    },
    [onValueChange]
  );

  return (
    <CommandPrimitive onKeyDown={handleKeyDown}>
      <div>
        <CommandInput
          ref={inputRef}
          value={inputValue}
          onValueChange={isLoading ? undefined : setInputValue}
          onBlur={
            isLoading
              ? undefined
              : () => {
                  handleBlur();
                }
          }
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          disabled={disabled}
          className="text-sm"
        />
      </div>
      <div className="relative mt-1">
        <div
          className={cn(
            'absolute top-0 z-10 w-full rounded-xl bg-white outline-none animate-in fade-in-0 zoom-in-95',
            isOpen ? 'block' : 'hidden'
          )}
        >
          <CommandList className="rounded-lg ring-1 ring-slate-200">
            {isLoading ? (
              <CommandPrimitive.Loading>
                <div className="p-1">
                  <Skeleton className="h-8 w-full" />
                </div>
              </CommandPrimitive.Loading>
            ) : null}
            {options.length > 0 && !isLoading ? (
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selected === option;
                  return (
                    <CommandItem
                      key={option}
                      value={option}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                      }}
                      onSelect={() => handleSelectOption(option)}
                      className={cn(
                        'flex w-full items-center gap-2',
                        !isSelected ? 'pl-8' : null
                      )}
                    >
                      {isSelected ? <Check className="w-4" /> : null}
                      {option}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            ) : null}
          </CommandList>
        </div>
      </div>
    </CommandPrimitive>
  );
}
