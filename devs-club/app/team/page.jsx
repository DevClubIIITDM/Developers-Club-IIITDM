"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Github, Linkedin } from "lucide-react";
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const AnimatedSection = ({ children }) => (
  <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
    {children}
  </motion.div>
);

const CoreTeamMember = ({ name, role, bio, image, linkedin, github }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      className="relative w-64 h-80"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial="rest"
      whileHover="hover"
      animate={isHovered ? "hover" : "rest"}
    >
      {/* Base card with shadow and scale */}
      <motion.div
        className="absolute inset-0 bg-white rounded-xl shadow-lg"
        variants={{
          rest: {
            scale: 1,
            boxShadow:
              "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
            transition: { duration: 0.4, ease: [0.6, -0.05, 0.01, 0.99] },
          },
          hover: {
            scale: 1.02,
            boxShadow:
              "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
            transition: { duration: 0.4, ease: [0.6, -0.05, 0.01, 0.99] },
          },
        }}
      />

      {/* Front face */}
      <AnimatePresence mode="wait">
        {!isHovered && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-gradient-to-b from-primary/90 to-primary overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Background pattern for visual interest */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 to-transparent" />
            </div>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                transition: {
                  duration: 0.4,
                  ease: [0.6, -0.05, 0.01, 0.99],
                },
              }}
              className="relative z-10"
            >
              <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-white/30 shadow-xl">
                <Image
                  src={image}
                  alt={name}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              className="relative z-10 text-center mt-4 px-4"
              initial={{ y: 10, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: {
                  delay: 0.1,
                  duration: 0.4,
                  ease: [0.6, -0.05, 0.01, 0.99],
                },
              }}
            >
              <h3 className="text-black text-xl font-bold tracking-wide mb-2 drop-shadow-md">
                {name}
              </h3>
              <div className="relative">
                <p className="text-black/90 text-sm font-medium px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm inline-block">
                  {role}
                </p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.2,
                    duration: 0.4,
                    ease: [0.6, -0.05, 0.01, 0.99],
                  },
                }}
                className="mt-3 flex justify-center space-x-3"
              >
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform transition-all hover:scale-110 hover:-translate-y-1"
                >
                  <Linkedin className="w-5 h-5 text-white/80 hover:text-white" />
                </a>
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform transition-all hover:scale-110 hover:-translate-y-1"
                >
                  <Github className="w-5 h-5 text-white/80 hover:text-white" />
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back face */}
      <AnimatePresence mode="wait">
        {isHovered && (
          <motion.div
            className="absolute inset-0 p-6 rounded-xl bg-white"
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={{
              clipPath: "circle(100% at 50% 50%)",
              transition: {
                duration: 0.5,
                ease: [0.6, -0.05, 0.01, 0.99],
              },
            }}
            exit={{
              clipPath: "circle(0% at 50% 50%)",
              transition: {
                duration: 0.4,
                ease: [0.6, -0.05, 0.01, 0.99],
              },
            }}
          >
            <motion.div
              className="h-full flex flex-col justify-between"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.2,
                  },
                },
              }}
            >
              <motion.div
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: {
                      duration: 0.4,
                      ease: [0.6, -0.05, 0.01, 0.99],
                    },
                  },
                }}
              >
                <h3 className="text-gray-900 text-xl font-bold mb-2">{name}</h3>
                <p className="text-primary font-medium text-sm mb-3">{role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{bio}</p>
              </motion.div>

              <motion.div
                className="flex justify-center space-x-4 pt-4"
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: {
                      duration: 0.4,
                      ease: [0.6, -0.05, 0.01, 0.99],
                    },
                  },
                }}
              >
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform transition-transform hover:-translate-y-1"
                >
                  <Linkedin className="w-6 h-6 text-[#0077b5]" />
                </a>
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform transition-transform hover:-translate-y-1"
                >
                  <Github className="w-6 h-6 text-gray-700" />
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const TeamSection = ({ title, members }) => (
  <AnimatedSection>
    <motion.section variants={fadeInUp} className="mb-16">
      <h2 className="text-4xl font-bold mb-12 text-center">{title}</h2>
      <motion.div
        className="flex flex-wrap justify-center gap-8"
        variants={staggerChildren}
      >
        {members.map((member, index) => (
          <motion.div key={index} variants={fadeInUp}>
            <CoreTeamMember {...member} />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  </AnimatedSection>
);

export default function Team() {
  const headCore = [
    {
      name: "Y Sainatha Reddy",
      role: "CS23B1027",
      bio: "Full Stack Developer with expertise in Cloud Computing, actively working on innovative IoT and Fog-based solutions",
      image: "/assets/sainatha_new.jpg",
      linkedin: "https://www.linkedin.com/in/sainatha-reddy/",
      github: "https://github.com/sainatha-reddy",
    },
  ];
  const cores = [
    {
      name: "K Krishna Chaitanya",
      role: "CS23B1027",
      bio: "I'm a passionate web developer and tech enthusiast.I enjoy building responsive and user-friendly websites.",
      image: "/assets/cs23b1027.jpg",
      linkedin:
        "https://www.linkedin.com/in/krishna-chaitanya-koppaku-4b7779289/",
      github: "https://github.com/krishnachaiatanya",
    },
    {
      name: "Sai Nithin Cheenepalli",
      role: "CS23I1001",
      bio: "Focused on creating scalable AI-driven applications that deliver meaningful user experiences.",
      image: "/assets/cs23i1001.jpeg",
      linkedin: "https://www.linkedin.com/in/sai-nithin-cheenepalli",
      github: "https://github.com/thenithin342",
    },
    {
      name: "Bhaskar Teja",
      role: "CS23I1054",
      bio: "I turn ideas into responsive, high-performance web experiences powered by React, Node.js, and a constant curiosity for AI and algorithms.",
      image: "/assets/cs23i1054.jpg",
      linkedin: "https://www.linkedin.com/in/bhaskar--teja/",
      github: "https://github.com/Bhaskar-Teja-Dev",
    },
    {
      name: "Ambadas Rautrao",
      role: "CS24I1014",
      bio: " Dedicated to exploring the depths of computer architecture to engineer robust, scalable systems.",
      image: "/assets/cs24i1014.jpeg",
      linkedin: "https://www.linkedin.com/in/rautrao-ambadas-b4193b34a/",
      github: "https://github.com/Rautrao",
    },
  ];

  const coordinators = [
    {
      name: "Shruti Ravikumar",
      role: "CS25B1001",
      bio: "Aspiring developer exploring coding, design, and interactive web graphics.",
      image: "/assets/cs25b1001.jpg",
      linkedin: "https://www.linkedin.com/in/shruti-ravikumar-8a0053365/",
      github: "https://github.com/Shruti2738",
    },
    {
      name: "Tanmayee Reddy Karnati",
      role: "CS25B1031",
      bio: "Aspiring developer passionate about web technologies, AI, and building practical solutions through continuous learning.",
      image: "/assets/cs25b1031.jpeg",
      linkedin: "https://www.linkedin.com/in/tanmayeereddyk",
      github: "https://github.com/Tanmayeereddyk",
    },
    {
      name: "Sam Thomas",
      role: "CS25B1035",
      bio: "Aspiring software engineer focused on building user friendly apps powered by smart AI features.",
      image: "/assets/cs25b1035.jpeg",
      linkedin: "https://www.linkedin.com/in/sam-thomas-3b241a207/",
      github: "https://github.com/samtbjs",
    },
    {
      name: "Rithvik S",
      role: "CS25B1049",
      bio: "Developer trying to dabble in the worlds of AI and Front End development.",
      image: "/assets/cs25b1049.jpg",
      linkedin: "https://www.linkedin.com/in/rithvik-s-0931b02a9",
      github: "https://github.com/rithvikk1011",
    },
    {
      name: "Tharanesh Suresh Kannan",
      role: "CS25B1054",
      bio: "Aspiring to become a versatile full-stack developer, with a strong curiosity for mastering backend technologies and AI integrations.",
      image: "/assets/cs25b1054.jpg",
      linkedin:
        "https://www.linkedin.com/in/tharanesh-suresh-kannan-27b4a3372/",
      github: "https://github.com/TaperBubbles04/",
    },
    {
      name: "Mithunn Balaji Sivakumar",
      role: "CS25B1074",
      bio: "Aspiring Full-Stack Web Developer driven by curiosity and a passion for creating modern web applications.",
      image: "/assets/cs25b1074.jpg",
      linkedin:
        "https://www.linkedin.com/in/mithunn-balaji-sivakumar-823019367/",
      github: "https://github.com/cs25b1074-stack",
    },
    {
      name: "Shathiya K",
      role: "CS25B1075",
      bio: "Learning, building, and contributing at the intersection of AI, Open Source, and Cybersecurity.",
      image: "/assets/cs25b1075.jpeg",
      linkedin: "https://www.linkedin.com/in/shathiyakiiitdmk29/",
      github: "https://github.com/shathiya-7",
    },
    {
      name: "Prarthana Shankar Shetty",
      role: "CS25B1082",
      bio: "Living somewhere between learning new tools and creating projects.",
      image: "/assets/cs25b1082.jpg",
      linkedin: "https://www.linkedin.com/in/prarthana-shetty-05b8113b7/",
      github: "https://github.com/prarthanashi",
    },
    {
      name: "Mathivadhani S",
      role: "CS25B1101",
      bio: "Exploring design and web development, aspiring full-stack developer.",
      image: "/assets/cs25b1101.jpeg",
      linkedin: "https://www.linkedin.com/in/mathivadhani-s-5827b1382/",
      github: "https://github.com/mathivadhanis505",
    },
    {
      name: "Aviral Pandey",
      role: "CS25B2054",
      bio: "Full-stack developer and Linux enthusiast building clean, high-performance applications to ensure a truly gold experience.",
      image: "/assets/cs25b2054.jpeg",
      linkedin: "https://linkedin.com/in/aviralpan",
      github: "https://github.com/unclepro",
    },
    {
      name: "Dinesh Kumar S",
      role: "CS25I1057",
      bio: "Passionate about tech,Startups.",
      image: "/assets/cs25i1057.jpg",
      linkedin: "https://in.linkedin.com/in/dinesh-kumar-s-749905380",
      github: "https://github.com/dineshgoat",
    },
    {
      name: "Meera Avunhikattu Parambil",
      role: "EC25B1101",
      bio: "Passionate about AI, programming, and design, with a strong interest in learning and innovation.",
      image: "/assets/ec25b1101.jpeg",
      linkedin: "https://www.linkedin.com/in/meera-mani-759b5b41b",
      github: "https://github.com/MeeraAP-123",
    },
  ];

  const mentors = [
    {
      name: "Jashwanth Peddisetty",
      role: "Developer@Randomwalk.Ai",
      bio: "Developer at Randomwalk.Ai | Ex-Intern at Congruent Solutions | Web3 enthusiast | ETHForAll winner 🏆 | GDSC core member",
      image: "/assets/jashwanth.jpg",
      linkedin: "https://www.linkedin.com/in/jashwanth-peddisetty/",
      github: "https://github.com/jashwanth0712",
    },
    {
      name: "T Lakshmi Srinivas",
      role: "",
      bio: "GDSC core member | Ex Developer's Club Headcore",
      image: "/assets/srinavas.png",
      linkedin: "https://www.linkedin.com/in/srinivastls/",
      github: "https://github.com/srinivastls",
    },
  ];
  const pics = [
    {
      name: "Dr. Preeth R",
      role: "Assistant Professor",
      bio: "Assistant Professor specializing in IoT, Machine Learning, Computer Vision, and Data Science research.",
      image: "/assets/Preeth.jpg",
      linkedin: "https://www.linkedin.com/in/preethr/",
    },
  ];

  const developers = [
    {
      name: "Praneeth Devarasetty",
      role: "Lead Developer",
      bio: "Leads the development team with expertise in Nextjs and cloud technologies.",
      image: "/assets/cs22b1014.jpg",
      linkedin: "https://www.linkedin.com/in/praneeth-devarasetty/",
      github: "https://github.com/praneeth622",
    },
    {
      name: "Darshan Karthikeya",
      role: "UI/UX & Frontend Developer",
      bio: "Darshan specializes in creating responsive and accessible web interfaces using modern frontend technologies.",
      image: "/assets/cs22b1022.jpg",
      linkedin: "https://www.linkedin.com/in/darshan-karthikeya/",
      github: "https://github.com/karthikeya1220",
    },
    {
      name: "Surya Srirama Murthy",
      role: "UI/UX Designer",
      bio: "Sriram is responsible for creating the user interface and experience, focusing on user-centered design principles",
      image: "/assets/sriram.jpg",
      linkedin: "https://www.linkedin.com/in/surya-sri-rama-murthy-pilla/",
      github: "https://github.com/sriram0620",
    },
    {
      name: "G Chaithanya Reddy",
      role: "Frontend Developer",
      bio: "Chaithanya is a Front-end Developer focused on building responsive, intuitive user interfaces with clean code and modern tech.",
      image: "/assets/cs22b1052.jpg",
      linkedin:
        "https://www.linkedin.com/in/chaitanya-reddy-gavinolla-22166b258/",
      github: "https://github.com/chaitanya-reddy-13",
    },
    {
      name: "T Lakshmi Srinivas",
      role: "Website Co-ordinator",
      bio: "Srinivas is a Website Coordinator managing updates, content, and performance for seamless user experiences.",
      image: "/assets/srinivas.png",
      linkedin: "https://www.linkedin.com/in/srinivastls/",
      github: "https://github.com/srinivastls   ",
    },
    {
      name: "Y Sainatha Reddy",
      role: "Backend Developer",
      bio: "Sainatha is a Back-end Developer focused on building reliable system, managing data, and ensuring smooth connections between servers and users.",
      image: "/assets/sainatha.jpg",
      linkedin: "https://www.linkedin.com/in/sainatha-reddy/",
      github: "https://github.com/sainatha-reddy",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-5xl font-bold mb-16 text-center"></h1>

      {/* PIC Section */}
      <TeamSection title="Faculty Advisor" members={pics} />
      <TeamSection title="Head Core" members={headCore} />
      <TeamSection title="Core Team" members={cores} />
      <TeamSection title="Coordinators" members={coordinators} />
      <TeamSection title="Mentors" members={mentors} />
      <TeamSection title="Developers" members={developers} />
    </div>
  );
}
