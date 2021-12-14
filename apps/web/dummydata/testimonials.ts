interface ITestimonial {
  name: string;
  image: string;
  message: string;
}
const testimonial: ITestimonial[] = [
  {
    name: "Jo Martinez",
    image:
      "https://images.pexels.com/photos/756453/pexels-photo-756453.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=400&w=400",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut semper elementum lacus, sit amet dapibus sapien consequat id. Morbi at accumsan lorem, vitae egestas sem. Donec imperdiet quis nisi eu aliquam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
  },
  {
    name: "Cecilia Höfler",
    image:
      "https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=400&w=400",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut semper elementum lacus, sit amet dapibus sapien consequat id. Morbi at accumsan lorem, vitae egestas sem. Donec imperdiet quis nisi eu aliquam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
  },
  {
    name: "Nobuyuki Láska",
    image:
      "https://pbs.twimg.com/profile_images/1315519591263531009/HamQZFnt_400x400.jpg",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut semper elementum lacus, sit amet dapibus sapien consequat id. Morbi at accumsan lorem, vitae egestas sem. Donec imperdiet quis nisi eu aliquam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
  },
];

export default testimonial;
