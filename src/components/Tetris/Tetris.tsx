import { useState } from 'react'
import { Field } from '..'
import { useInterval } from 'usehooks-ts'
import { useKeyPressEvent } from 'react-use'
import Tetris from '../../lib/Tetris'

export interface TetrisProps {
  fallInterval: number
  width: string
  divisionSize: { width: number; height: number }
  minoColor: string
  backgroundColor: string
  wallColor: string
}

const ReactTetris = (props: TetrisProps) => {
  const gameOption = {
    divisionSize: props.divisionSize,
    controlOption: {
      upKey: 'ArrowUp',
      downKey: 'ArrowDown',
      leftKey: 'ArrowLeft',
      rightKey: 'ArrowRight',
      rotateKey: ' ',
    },
  }

  const [tetris, setTetris] = useState(new Tetris(gameOption))
  const [fieldData, setFieldData] = useState(tetris.draw())
  const [isGameOver, setIsGameOver] = useState(false)

  const moveMino = (e: KeyboardEvent) => {
    tetris.moveMino(e.code)
    const newFieldData = tetris.draw()
    setFieldData([...newFieldData])
  }

  const fallMino = () => {
    if (tetris.fallMino()) {
      const newFieldData = tetris.draw()

      setFieldData([...newFieldData])
      return
    }

    tetris.fixMino()
    const newFieldData = tetris.draw()
    setFieldData([...newFieldData])

    tetris.createMino()
  }

  const rotateMino = () => {
    tetris.rotateMino()
    const newFieldData = tetris.draw()
    setFieldData([...newFieldData])
  }

  const evalLines = () => {
    tetris.evalLines()
    const newFieldData = tetris.draw()
    setFieldData([...newFieldData])
  }

  useKeyPressEvent(' ', () => rotateMino())
  useKeyPressEvent('ArrowDown', (e) => moveMino(e))
  useKeyPressEvent('ArrowLeft', (e) => moveMino(e))
  useKeyPressEvent('ArrowRight', (e) => moveMino(e))

  useInterval(() => {
    if (tetris.isGameOver()) {
      setIsGameOver(true)
    } else {
      fallMino()
      evalLines()
    }
  }, props.fallInterval)

  const handleRestart = () => {
    setIsGameOver(false)
    setTetris(new Tetris(gameOption))
  }

  return (
    <>
      {isGameOver ? (
        <div>
          GAMEOVER
          <br />
          <button onClick={handleRestart}>restart</button>
        </div>
      ) : (
        <Field {...props} fieldData={fieldData} />
      )}
    </>
  )
}

export default ReactTetris
