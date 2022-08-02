# react-tetris

```
$ npm install @hiy/react-tetris
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