import { useEffect, useId, useState } from 'react';

const MIN_QUERY_LENGTH = 2;
const DEBOUNCE_MS = 200;
const MAX_SUGGESTIONS = 8;

export function SearchAutocomplete() {
  const listId = useId();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const q = query.trim();
    if (q.length < MIN_QUERY_LENGTH) {
      setSuggestions([]);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const params = new URLSearchParams({ q, limit: String(MAX_SUGGESTIONS) });
        const res = await fetch(`/api/products?${params}`, { signal: controller.signal });
        if (!res.ok) return;
        const products = await res.json();
        setSuggestions(products.slice(0, MAX_SUGGESTIONS));
        setActiveIndex(-1);
      } catch (err) {
        if (err.name !== 'AbortError') setSuggestions([]);
      }
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  function goToProduct(product) {
    window.location.assign(`/products/${product.id}`);
  }

  function onKeyDown(e) {
    if (!open || suggestions.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      goToProduct(suggestions[activeIndex]);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  }

  const showList = open && suggestions.length > 0;

  return (
    <form role="search" action="/search" method="get">
      <input
        type="search"
        name="q"
        placeholder="Search products"
        autoComplete="off"
        role="combobox"
        aria-expanded={showList}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={onKeyDown}
      />
      {showList && (
        <ul id={listId} role="listbox">
          {suggestions.map((product, i) => (
            <li
              key={product.id}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === activeIndex}
              // mousedown fires before the input's blur, so the click isn't lost
              onMouseDown={(e) => {
                e.preventDefault();
                goToProduct(product);
              }}
              onMouseEnter={() => setActiveIndex(i)}
            >
              {product.name}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
