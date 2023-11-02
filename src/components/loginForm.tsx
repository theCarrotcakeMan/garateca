import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";

export default function loginForm() {
  return (
    <FormControl
      label={() => "label"}
      caption={() => "caption"}
      >
      <Input />
    </FormControl>
  );
}
