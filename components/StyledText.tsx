import { TextProps } from "./Themed";
import { Text } from "./ui/text";

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: "SpaceMono" }]} />;
}
