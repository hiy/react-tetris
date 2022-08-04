# react-tetris

```
$ touch ~/.npmrc
vi ~/.npmrc

registry=https://registry.npmjs.org/
@GITHUB_USERNAME:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=AUTH_TOKEN
```

```
npm install @GITHUB_USERNAME/react-tetris
```

```typescript
import React from "react"
import { Tetris } from 'react-tetris'

function App() {
  return (
    <>
       <Tetris
          speed={300}
          width={200}
          minoColor={'red'}
          backgroundColor={'while'}
          wallColor={'black'}
        />
    </>
  );
}
```

devlop

```
npm run storybook
```
