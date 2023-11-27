import { Metadata } from "next";
import { Button, styled } from "@mui/material";
import NavigateButton from "@/app/components/tools/NavigateButton";
import { useSelector } from "react-redux";
import { selectCounter } from "../store/modules/counterSlice";
import { RootState } from "../store/store";
import CounterControl from "../components/counter/CounterControl";

export const metadata: Metadata = {
  title: "Users page",
  description: "Generated by create next app",
};

export default function UsersPage() {
  // const counter = useSelector((state: RootState) => state.counter.value);
  // const counter = useSelector(selectCounter);

  return (
    <div>
      {/* Counter is{counter} */}
      {/* @ts-ignore */}
      <CounterControl />
      <Button sx={{ mx: 1 }} variant="contained">
        Hellow Mui
      </Button>
      <NavigateButton destination="/" variant="contained" sx={{ mx: 2 }}>
        back
      </NavigateButton>
      {/* <StyledDiv>123</StyledDiv> */}
      <h2>This is the User Index page</h2>
    </div>
  );
}
