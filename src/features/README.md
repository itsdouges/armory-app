# Features

## Folder structure

```
components/
index.js
actions.js
[name].reducer.js
```

### Notes
- [name] is used for the property name in the root reducer
- Components folder is optional
- Any common view modules (styles, components, etc) should be placed in `src/common/`
- Any common functionality should be placed in `src/lib/`
- Keep component definitions flat, no deeper than one level e.g: `components/ComponentName`
