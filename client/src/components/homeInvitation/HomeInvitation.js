import React from 'react';
import { FaTwitch, FaTwitter, FaSlack } from 'react-icons/fa';

export default function HomeInvitation() {
  return (
    <section className="m-auto max-w-5xl my-20">
      <div className="header text-center mb-10">
        <h4 className="text-gray-500 font-bold">
          Connect With Past and Present Founders
        </h4>
        <h2 className="text-4xl">
          Join our{' '}
          <strong className="text-orange-500">Growing Community</strong>
        </h2>
      </div>
      {/* CARDS */}
      <div className="cards__outer">
        <div className="cards__inner flex flex-row">
          {/* LEFT */}
          <div className="left w-1/2 items-center  m-auto">
            <div className="inner flex flex-col m-auto items-center">
              <div className="shadow-md border-orange-500 p-4 rounded-lg flex flex-col border-t-8 border-t-orange-300  max-w-sm w-full">
                <p className="text-gray-600 tracking-wide leading-5 mb-6">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatum expedita, ducimus quos, iusto aliquam cumque magni
                  excepturi labore tempora sed porro, velit ipsa? Culpa facilis
                  voluptas voluptate tempore doloremque consectetur?
                </p>
                <div className="flex flex-row items-start">
                  <img
                    src="https://i.imgur.com/kcPMLNS.jpg"
                    alt="Malka Benton"
                    className="rounded-full mr-4 w-12 h-12"
                  />
                  <span className="flex flex-col">
                    <h4 className="font-bold text-xl leading-4">Gabi</h4>
                    <p className="text-gray-600">Founder, Pa'Lante Games</p>
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* RIGHT */}
          <div className="right w-1/2 m-auto">
            <div className="flex flex-col items-center">
              {/* TOP CARDS */}
              <Card
                title="Twitch"
                text="For workshops, livestreams, videos"
                link="https://www.twitch.tv/palante_mark"
              >
                <FaTwitch />
              </Card>
              {/* MIDDLE CARDS */}
              <Card
                title="Twitter"
                text="Join the conversation"
                link="https://twitter.com/Mark_Ambrocio1"
              >
                <FaTwitter />
              </Card>
              {/* MIDDLE CARDS */}
              <Card
                title="Slack"
                text="Join our online community"
                link="https://twitter.com/Mark_Ambrocio1"
              >
                <FaSlack />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// eslint-disable-next-line react/prop-types
function Card({ children, title, text, link }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="shadow-md border-orange-500 p-4 rounded-lg flex flex-row border-t-8 border-t-orange-300 justify-items-center items-center mb-6 max-w-sm w-full"
    >
      <span className=" rounded-full bg-orange-500 text-2xl text-orange-100 p-2 mr-4">
        {children}
      </span>
      <span className="flex flex-col">
        <h4 className="font-bold text-xl leading-4">{title}</h4>
        <p className="text-gray-600">{text}</p>
      </span>
    </a>
  );
}
