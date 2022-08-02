import React, { useState } from "react";
import { Field } from "..";
import { useInterval } from "usehooks-ts";
import { useKeyPressEvent } from "react-use";
import Tetris from "../lib/Tetris";

export interface TetrisProps {
  speed: number;
  width: number;
  minoColor: string;
  backgroundColor: string;
  wallColor: string;
}

const ReactTetris = (props: TetrisProps) => {
  const [tetris, setTetris] = useState(new Tetris());
  const [fieldData, setFieldData] = useState(tetris.draw());
  const [isGameOver, setIsGameOver] = useState(false);

  const moveMino = (e: KeyboardEvent) => {
    tetris.moveMino(e.code);
    const newFieldData = tetris.draw();
    setFieldData([...newFieldData]);
  };

  const fallMino = () => {
    if (tetris.fallMino()) {
      const newFieldData = tetris.draw();

      setFieldData([...newFieldData]);
      return;
    }

    tetris.fixMino();
    const newFieldData = tetris.draw();
    setFieldData([...newFieldData]);

    tetris.createMino();
  };

  const rotateMino = () => {
    tetris.rotateMino();
    const newFieldData = tetris.draw();
    setFieldData([...newFieldData]);
  };

  const evalLines = () => {
    tetris.evalLines();
    const newFieldData = tetris.draw();
    setFieldData([...newFieldData]);
  };

  useKeyPressEvent(
    " ", // space
    (e) => rotateMino(),
    (e) => {}
  );

  useKeyPressEvent(
    "ArrowDown",
    (e) => moveMino(e),
    (e) => {}
  );

  useKeyPressEvent(
    "ArrowLeft",
    (e) => moveMino(e),
    (e) => {}
  );

  useKeyPressEvent(
    "ArrowRight",
    (e) => moveMino(e),
    (e) => {}
  );

  useInterval(() => {
    if (tetris.isGameOver()) {
      setIsGameOver(true);
    } else {
      fallMino();
      evalLines();
    }
  }, 60);

  const handleRestart = () => {
    setIsGameOver(false);
    setTetris(new Tetris());
  };

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
  );
};

export default ReactTetris;
