import { CONNECT_FOUR } from "@utils/config";

const useParseBoardStateString = (
  content: string | null,
): Array<Array<number>> => {
  const result: Array<Array<number>> = [];
  if (!content) {
    return result;
  }

  const valArray: Array<number> = content.split(",").map((e) => Number(e));

  Array.from({ length: CONNECT_FOUR.NB_LINE }, (_, i) => {
    result.push(
      valArray.slice(
        i * CONNECT_FOUR.NB_COLUMN,
        (i + 1) * CONNECT_FOUR.NB_COLUMN,
      ),
    );
  });
  return result;
};

export default useParseBoardStateString;
