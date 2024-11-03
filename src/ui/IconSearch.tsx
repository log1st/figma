/* eslint-disable jsx-a11y/no-autofocus */
import {
  ChangeEventHandler,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Icon } from "./Icon";
import { NetworkMessages } from "../common/network/messages";

export type IconSearchProps = {
  value: { name: string; family: string; } | null;
  onChange(value: { name: string; family: string; }): void;
};

export const IconSearch = forwardRef<HTMLInputElement, IconSearchProps>(
  ({ value, onChange }, ref) => {
    const [query, setQuery] = useState("");

    useEffect(() => {
      setQuery("");
    }, [value]);

    const onQueryChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      setQuery(e.target.value);
    };

    const [icons, setIcons] = useState<{
        family: string;
        name: string;
    }[]>([]);

    const [searching, setSearching] = useState(false);

    const searchIcons = useCallback(async (iconQuery: string) => {
      setSearching(true);

      const response = await fetch(
        "https://m19dxw5x0q-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(4.20.0)%3B%20Browser%20(lite)%3B%20instantsearch.js%20(4.60.0)%3B%20Vue%20(2.7.15)%3B%20Vue%20InstantSearch%20(4.12.1)%3B%20JS%20Helper%20(3.15.0)&x-algolia-api-key=c79b2e61519372a99fa5890db070064c&x-algolia-application-id=M19DXW5X0Q",
        {
          headers: {
            accept: "*/*",
            "accept-language": "en-US,en;q=0.9,ru;q=0.8",
            "cache-control": "no-cache",
            "content-type": "application/x-www-form-urlencoded",
            pragma: "no-cache",
            "sec-ch-ua":
              '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"macOS"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site",
          },
          referrer: "https://fontawesome.com/",
          referrerPolicy: "strict-origin-when-cross-origin",
          body: `{"requests":[{"indexName":"fontawesome_com-splayed-6.5.2_alphabetical","params":"clickAnalytics=true&distinct=true&facetFilters=%5B%5B%22family%3Abrands%22%2C%22family%3Aclassic%22%5D%5D&facets=%5B%22categories%22%2C%22family%22%2C%22is_free%22%2C%22is_new_in_v6%22%2C%22is_sponsored%22%2C%22is_staff_favorite%22%2C%22style%22%5D&highlightPostTag=__%2Fais-highlight__&highlightPreTag=__ais-highlight__&hitsPerPage=180&maxValuesPerFacet=100&page=0&query=${iconQuery}&tagFilters=&userToken=anonymous-f78420e1-2d88-4266-aeb9-19b6f0cc21df"},{"indexName":"fontawesome_com-splayed-6.5.2_alphabetical","params":"analytics=false&clickAnalytics=false&distinct=true&facetFilters=%5B%5B%22type%3Aicon%22%5D%5D&facets=family&highlightPostTag=__%2Fais-highlight__&highlightPreTag=__ais-highlight__&hitsPerPage=0&maxValuesPerFacet=100&page=0&query=${iconQuery}&userToken=anonymous-f78420e1-2d88-4266-aeb9-19b6f0cc21df"}]}`,
          method: "POST",
          mode: "cors",
          credentials: "omit",
        },
      );

      const json: {
        results: Array<{
          hits: Array<{
            name: string;
            family: string;
          }>;
        }>;
      } = await response.json();

      setSearching(false);

      setIcons(
        json.results
          .reduce(
            (a, c) => [...a, ...c.hits],
            [] as Array<{
                family: string;
                name: string;
            }>,
          ).filter((c, i, s) => (
              s.findIndex(_ => _.name === c.name) === i
        )),
      );
    }, []);

    useEffect(() => {
      setIcons([]);

      if (!query.length) {
        return () => {};
      }

      const timeout = setTimeout(() => {
        searchIcons(query);
      }, 350);

      return () => {
        clearTimeout(timeout);
      };
    }, [query, searchIcons]);

    const onIconClick = (icon: {
        family: string;
        name: string;
    }) => () => {
      onChange(icon);
    };

    useEffect(() => {
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          NetworkMessages.close.send();
        }
      });
    }, []);

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "2px",
          flexWrap: "wrap",
        }}
      >
        <input
          style={{ width: "100%" }}
          placeholder="Search icon..."
          type="text"
          value={query}
          onChange={onQueryChange}
          autoFocus
          ref={ref}
        />
        {icons.map((icon) => (
          <button type="button" onClick={onIconClick(icon)} key={icon.name}>
            <Icon {...icon} />
          </button>
        ))}
        {searching && "Searching..."}
      </div>
    );
  },
);
