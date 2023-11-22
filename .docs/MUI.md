# Mui 问题记录

## 引入 themeProvider 报错

解决方案：查看官方提供的[nextjs 示例](https://github.com/mui/material-ui/blob/master/examples/material-ui-nextjs-ts/src/components/ThemeRegistry/ThemeRegistry.tsx)

## 使用 styled 方法报错

解决方法：要么在页面中不使用诸如 `export const metadata: Metadata = {}` 这样的 nextjs 提供的服务端渲染的方法，要么就在 components 中使用
