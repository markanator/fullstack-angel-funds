import { Tabs } from "@chakra-ui/react";

interface ICustomTab {
  children?: React.ReactNode;
  value: string;
  selectedColor?: string;
}

const CustomTab = ({ children, value, selectedColor = "white" }: ICustomTab) => {
  return (
    <Tabs.Trigger
      value={value}
      fontSize="20px"
      fontWeight="bold"
      lineHeight="40px"
      letterSpacing=".125px"
      bgColor="color_alt"
      color="white"
      p="15px 60px"
      mr={8}
      _selected={{ color: "black", bg: selectedColor }}
    >
      {children}
    </Tabs.Trigger>
  );
};

export default CustomTab;
