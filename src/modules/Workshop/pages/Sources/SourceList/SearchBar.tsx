import { Form, Input } from "antd";
import React from "react";
import { useDebouncedCallback } from "use-debounce";
import { useQueryContext } from "./hooks";

const FormItem = Form.Item;

export default () => {
  const { query, setQuery } = useQueryContext();
  const [setValue] = useDebouncedCallback((q: string) => setQuery(q), 250);

  return (
    <FormItem label={<b>Search for work source</b>} colon={false}>
      <Input
        placeholder="Source name or url"
        onChange={e => setValue(e.target.value)}
        defaultValue={query}
      />
    </FormItem>
  );
};
