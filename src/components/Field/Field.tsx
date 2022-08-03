export interface FieldProps {
  width: string;
  divisionSize: { width: number; height: number };
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

  const regex = /^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/;
  const match = props.width.match(regex)!;
  const width: number = parseFloat(match[1]);
  const unit: string = match[2];
  const divW: number = props.divisionSize.width;
  const divH: number = props.divisionSize.height;
  return (
    <div>
      {props.fieldData.map((data, i) => {
        const tag = data.map((block) => {
          return (
            <>
              <span
                style={{
                  backgroundColor: backgroundColor(block),
                  width: width / divW + unit,
                  height: width / divW + unit,
                  display: "inline-block",
                }}></span>
            </>
          );
        });

        return (
          <div
            style={{
              height: width / divW + unit,
            }}>
            {tag}
          </div>
        );
      })}
    </div>
  );
};

export default Field;
