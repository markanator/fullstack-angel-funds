import { Tab } from "@chakra-ui/react";

interface ICustomTab {
  children?: React.ReactNode;
  selectedColor?: string;
}

const CustomTab = ({ children, selectedColor = "white" }: ICustomTab) => {
  return (
    <Tab
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
    </Tab>
  );
};

export default CustomTab;
