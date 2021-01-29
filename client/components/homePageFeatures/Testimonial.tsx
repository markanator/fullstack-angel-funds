import { Box, Container, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import Slider from "react-slick";
import testimonials from "@/dummydata/testimonials";

export default function Testimonial() {
  var settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 650,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Flex as="section" w="full" py="6rem">
      <Container maxW="7xl" display="flex" flexDirection="column">
        <Flex direction="column">
          <Text
            textAlign="left"
            fontSize="1.125rem"
            color="color_alt"
            mb="1rem"
          >
            Testimonials
          </Text>
          <Heading
            textAlign="left"
            color="text_primary"
            fontSize="3.5rem"
            mb="3rem"
          >
            What They Say
          </Heading>
          <Slider className="ethiopian__caterpillar" {...settings}>
            {testimonials.map((quote) => (
              <li key={quote.name}>
                <TestimonialSlide info={quote} />
              </li>
            ))}
          </Slider>
        </Flex>
      </Container>
    </Flex>
  );
}

interface ISlideProps {
  info: {
    name: string;
    image: string;
    message: string;
  };
}

const TestimonialSlide = ({ info }: ISlideProps) => (
  <Box
    className="testimonial__main"
    display="inline-flex"
    pos="relative"
    w="full"
  >
    <Flex
      borderLeft="5px solid var(--color_alt)"
      bgColor="testimonial_bg"
      height="415px"
      pos="relative"
      zIndex="1"
      overflow="visible"
      mt="2rem"
      w="full"
    >
      <Flex
        direction="column"
        pb="2.5rem"
        px="5rem"
        justifyContent="center"
        zIndex="1"
        w="full"
      >
        <Heading
          as="p"
          fontSize="1.875rem"
          mb="3rem"
          textAlign="left"
          maxW="xl"
        >
          {info.name}
        </Heading>
        <Text
          fontSize="1.25rem"
          lineHeight="2.5rem"
          color="text_tertiary"
          maxW="xl"
        >
          {info.message}
        </Text>
      </Flex>
    </Flex>
    <Flex zIndex="2" position="absolute" top="-20px" right="20px">
      <Image
        src={info.image}
        alt="Image 2"
        w="385px"
        h="415px"
        zIndex="2"
        objectFit="cover"
        objectPosition="center"
      />
    </Flex>
  </Box>
);

function PrevArrow(props) {
  const { className, onClick } = props;

  return (
    <div className={`${className} prev_arr`} style={{}} onClick={onClick} />
  );
}

function NextArrow(props) {
  const { className, onClick } = props;

  return <div className={`${className} next_arr`} onClick={onClick} />;
}
