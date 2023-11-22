import { PropsWithChildren } from "react";

export default function UserLayout(props: PropsWithChildren<any>) {
  return (
    <div>
      <h3>This is User layout</h3>
      {props.children}
    </div>
  );
}
