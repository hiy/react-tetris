import React from "react";

export interface FieldProps {
  width: number;
  minoColor: string;
  backgroundColor: string;
  wallColor: string;
  fieldData: number[][];
}

const WallArea = 1;
const BackGroundArea = 0;
const MinoArea = 2;

const Field = (props: FieldProps) => {
  const backgroundColor = (block: number) => {
    if (block == WallArea) {
      return props.wallColor;
    } else if (block == BackGroundArea) {
      return "white";
    } else if (block == MinoArea) {
      return props.minoColor;
    } else if (block == 3) {
      return "gray";
    }

    return "white";
  };

  const width = props.width;

  return (
    <div>
      {props.fieldData.map((data, i) => {
        const tag = data.map((block) => {
          return (
            <>
              <span
                style={{
                  backgroundColor: backgroundColor(block),
                  width: width / 12 + "px",
                  height: width / 12 + "px",
                  display: "inline-block",
                }}></span>
            </>
          );
        });

        return (
          <div
            style={{
              height: width / 12 + "px",
            }}>
            {tag}
          </div>
        );
      })}
    </div>
  );
};

export default Field;
