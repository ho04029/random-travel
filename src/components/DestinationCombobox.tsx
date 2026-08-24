'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Search, X } from 'lucide-react';
import { Destination } from '@/types/destination';
import { cn } from '@/utils/cn';

type DestinationComboboxProps = {
  destinations: Destination[];
  value: string[];
  onChange: (ids: string[]) => void;
  isLoading?: boolean;
};

export function DestinationCombobox({
  destinations,
  value,
  onChange,
  isLoading = false,
}: DestinationComboboxProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggle = (id: string) => {
    onChange(
      value.includes(id) ? value.filter((v) => v !== id) : [...value, id],
    );
  };

  const remove = (id: string) => {
    onChange(value.filter((v) => v !== id));
  };

  const trimmedQuery = query.trim();
  const filtered = trimmedQuery
    ? destinations.filter(
        (d) =>
          d.name.includes(trimmedQuery) ||
          (d.province?.includes(trimmedQuery) ?? false),
      )
    : destinations;

  const selectedDestinations = value
    .map((id) => destinations.find((d) => d.id === id))
    .filter((d): d is Destination => !!d);

  return (
    <div ref={containerRef} className="relative">
      {selectedDestinations.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-2">
          {selectedDestinations.map((destination) => (
            <span
              key={destination.id}
              className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700"
            >
              {destination.name}
              <button
                type="button"
                onClick={() => remove(destination.id)}
                aria-label={`${destination.name} 선택 해제`}
                className="rounded-full p-0.5 transition-colors hover:bg-blue-100"
              >
                <X className="size-3.5" />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="relative">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls="destination-combobox-listbox"
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setOpen(false);
          }}
          placeholder={
            isLoading ? '여행지를 불러오는 중...' : '여행지를 검색하세요'
          }
          disabled={isLoading}
          className={cn(
            'w-full rounded-lg border border-gray-300 py-3 pr-10 pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none',
            isLoading && 'cursor-wait bg-gray-50 text-gray-400',
          )}
        />
        <button
          type="button"
          tabIndex={-1}
          aria-label="여행지 목록 열기/닫기"
          disabled={isLoading}
          onClick={() => {
            const next = !open;
            setOpen(next);
            if (next) inputRef.current?.focus();
          }}
          className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-400 transition-colors hover:text-gray-600 disabled:pointer-events-none disabled:opacity-50"
        >
          <ChevronDown
            className={cn('size-4 transition-transform', open && 'rotate-180')}
          />
        </button>
      </div>

      {open && !isLoading && (
        <ul
          id="destination-combobox-listbox"
          role="listbox"
          aria-multiselectable="true"
          className="absolute z-20 mt-1 max-h-60 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg"
        >
          {filtered.length === 0 ? (
            <li className="px-4 py-3 text-sm text-gray-500">
              검색 결과가 없습니다
            </li>
          ) : (
            filtered.map((destination) => {
              const isSelected = value.includes(destination.id);
              return (
                <li key={destination.id}>
                  <button
                    type="button"
                    onClick={() => toggle(destination.id)}
                    className="flex w-full items-center justify-between gap-2 px-4 py-2.5 text-left text-sm transition-colors hover:bg-gray-50"
                  >
                    <span>
                      {destination.province &&
                        destination.province !== destination.name && (
                          <span className="mr-1 text-gray-400">
                            {destination.province}
                          </span>
                        )}
                      {destination.name}
                    </span>
                    {isSelected && (
                      <Check className="size-4 shrink-0 text-blue-600" />
                    )}
                  </button>
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
}
