import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import { useEffect, useMemo, useRef, useState } from 'react';

function DebounceSelect({ fetchOptions, debounceTimeout = 800, presetOptions, value, ...props }) {
  const [fetching, setFetching] = useState(false);
  const [options, _setOptions] = useState([]);
  const setOptions = (newOptions) => {
    // console.log(presetOptions.concat(newOptions));
    _setOptions(presetOptions.concat(newOptions));
  }
  const fetchRef = useRef(0);
  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      console.log(value);
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);
      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }
        setOptions(newOptions);
        setFetching(false);
      });
    };
    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  useEffect(() => {
    debounceFetcher.apply(null, [""])
  }, [])
  return (
    <>
      <Select
        showSearch
        filterOption={false}
        onSearch={debounceFetcher}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        {...props}
        options={options}
      />
    </>
  );
}

export default DebounceSelect