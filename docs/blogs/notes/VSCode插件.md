---
title: VSCode 插件
lastUpdated: true
---

# VSCode 插件

## Auto Close Tag

Auto Close Tag, VSCode 已经内置这个功能了，而且做的更好，可以区分是组件还是在写类型了，不用担心写类型也自动补齐一个多余的

```tsx
const APP = () => {
  const [state, setState] = useState<IProps>(); // 这里不会补一个 </IProps> 了，以前的插件会
  return (
    <div>
      <MyComponent></MyComponent>
    </div>
  );
};
```

VSCode 不支持在 `.vue` 文件中自动闭合，可以安装 `Vue Languages Features(Volar)` 扩展插件来启用此功能

## Auto Rename Tag

内置了，但是测试好像没有，需要在 setting.json 中设置

老版本不支持 `jsx` `tsx` 文件中自动闭合，但是新版本支持了 `jsx` `tsx`

:::
但是经过测试 1.83.1 版本 是不支持的
:::

```json
"editor.linkedEditing": true,
```
