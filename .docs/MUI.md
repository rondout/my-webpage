# Mui + Next.js 问题记录

## 说明

`Next.js` 版本升级到 14 后，相比 13 版本是一个改动很大的大版本升级，很多概念或者使用方式 13 版本都有较大的区别，因此这里记录一些学习 14 版本的 `Next.js` 的心得体会或者问题。因为我这边构建项目选择的是 `Next.js` 新的路由模式 `App Router`，因此该文档是基于 `App Router` 路由模式的。

## 引入 themeProvider 报错

解决方案：查看官方提供的[nextjs 示例](https://github.com/mui/material-ui/blob/master/examples/material-ui-nextjs-ts/src/components/ThemeRegistry/ThemeRegistry.tsx)

## 使用 themeProvider 报错

我们如果想使用 `Mui` 的自定义主题的功能，需要按照官方文档中关于 `NextJs` 的配置说明来配置，这里按照官方文档介绍的一步步配置就好：
[文档地址](https://mui.com/material-ui/guides/next-js-app-router/#using-material-ui-with-a-custom-theme)

## 使用 styled 方法报错以及使用不能序列化的 props 报错

### 原因

如果我们再普通的（没有加 `"use client"` 的组件中使用一些 `Server Component` 不支持的东西），比如 styled 组件或者给组件传递不能序列化的数据（比如函数），`next` 就会报错。比如下面这个组件：

```ts
// "use client";
import { StyledDiv } from "@/components/layout/StyledDiv";
import { Slider, Typography, Button } from "@mui/material";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Child",
};

async function getData() {
  const data = await Promise.resolve("test");
  return data;
}

export default async function UserDetailPage() {
  const data = await getData();

  const handleLogin = () => {
    console.log("Login successed");
  };

  return (
    <div>
      <Slider value={15}></Slider>
      <StyledDiv></StyledDiv>
      <Typography variant="h2">Hello World{data}</Typography>
      <Button onClick={handleLogin}>Login</Button>
      <h4>This is USER DETAIL page</h4>;
    </div>
  );
}

// StyledDiv.tsx
import { styled } from "@mui/material";

export const StyledDiv = styled("div")(({ theme }) => {
  return {
    width: "100px",
    height: "100px",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.background.paper,
  };
});
```

上面这个例子就会导致 `next` 报错，原因有以下两点：

- 给 `Button` 组件传递了一个不能序列化的 `props` （handleLogin）方法。
- 使用了 `Mui Styled Components`。

### 解决方案

第一种，我们可以直接在这个组件的头部加上 `"use client";` 这个指令，但是需要注意，如果使用了这个指令，会不能使用 `Server Compoenent` 的方法，比如这里我们使用的下面这个设置元数据的能力：

```ts
export const metadata: Metadata = {
  title: "User Child",
};
```

因此这个解决方法有局限性的。
第二种，我们可以把这两个组件封装成独立的客户端组件：

```ts
// "use client";
import { StyledDiv } from "@/components/layout/StyledDiv";
import LoginButton from "@/components/users/LoginButton";
import { Slider, Typography } from "@mui/material";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Child",
};

async function getData() {
  const data = await Promise.resolve("test");
  return data;
}

export default async function UserDetailPage() {
  const data = await getData();

  return (
    <div>
      <Slider value={15}></Slider>
      <StyledDiv></StyledDiv>
      <Typography variant="h2">Hello World{data}</Typography>
      <LoginButton />
      <h4>This is USER DETAIL page</h4>;
    </div>
  );
}
```

我们在 `StyledDiv` 这个组件头部加上 `"use client;"` 指令，并且将登录按钮也封装成客户端组件：

```ts
// StyledDiv.tsx
"use client";
import { styled } from "@mui/material";

export const StyledDiv = styled("div")(({ theme }) => {
  return {
    width: "100px",
    height: "100px",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.background.paper,
  };
});

// LoginButton.tsx
("use client");

import { Button } from "@mui/material";

export default function LoginButton() {
  const handleLogin = () => {
    Promise.resolve().then(() => {
      console.log("Login sauccessed!");
    });
  };

  return (
    <Button variant="contained" onClick={handleLogin}>
      Login
    </Button>
  );
}
```

这样子就能解决上述问题。
