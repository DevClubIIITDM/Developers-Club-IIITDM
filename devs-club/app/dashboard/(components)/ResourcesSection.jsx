"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Cloud,
  Code,
  Book,
  Settings,
  X,
  Link,
  Linkedin,
  Github,
  FileText,
  Youtube,
  Shield,
} from "lucide-react";

import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../../../components/ui/dialog";

const resources = [
  {
    name: "Google Cloud",
    icon: Cloud,
    color: "text-blue-500",
    bg: "bg-blue-100",
    documents: [
      {
        name: "Google Documentation",
        link: "https://cloud.google.com/docs",
        icon: FileText,
      },
      {
        name: "W3Schools Cloud Guide",
        link: "https://www.w3schools.in/google-cloud-services",
        icon: Link,
      },
    ],
    courses: [
      {
        name: "Coursera",
        link: "https://www.coursera.org/learn/gcp-fundamentals",
        icon: Linkedin,
      },
      {
        name: "Udemy",
        link: "https://www.udemy.com/course/google-cloud-certification-associate-cloud-engineer/",
        icon: Link,
      },
      {
        name: "Youtube",
        link: "https://www.youtube.com/watch?v=kzKFuHk8ovk&list=PLIivdWyY5sqKh1gDR0WpP9iIOY00IE0xL",
        icon: Link,
      },
    ],
  },

  {
    name: "Cyber Security",
    icon: Shield,
    color: "text-green-500",
    bg: "bg-green-100",
    documents: [
      {
        name: "Google Documentation",
        link: "https://www.cisco.com/site/us/en/learn/topics/security/what-is-cybersecurity.html#:~:text=Cybersecurity%20is%20the%20practice%20of,or%20interrupting%20normal%20business%20processes.",
        icon: FileText,
      },
      {
        name: "W3Schools Cloud Guide",
        link: "https://www.w3schools.com/cybersecurity/",
        icon: Link,
      },
    ],
    courses: [
      {
        name: "Coursera",
        link: "https://www.coursera.org/professional-certificates/google-cybersecurity",
        icon: Linkedin,
      },
      {
        name: "Youtube",
        link: "https://www.youtube.com/watch?v=lpa8uy4DyMo&list=PL9ooVrP1hQOGPQVeapGsJCktzIO4DtI4_",
        icon: Link,
      },
    ],
  },

  {
    name: "Data Science",
    icon: Book,
    color: "text-purple-500",
    bg: "bg-purple-100",
    documents: [
      {
        name: "Documentation",
        link: "https://www.ibm.com/think/topics/data-science",
        icon: FileText,
      },
      {
        name: "W3Schools Cloud Guide",
        link: "https://www.w3schools.com/datascience/",
        icon: Link,
      },
    ],
    courses: [
      {
        name: "Coursera",
        link: "https://www.coursera.org/professional-certificates/ibm-data-science",
        icon: Link,
      },
      {
        name: "Youtube",
        link: "https://www.youtube.com/watch?v=ua-CiDNNj30&list=PLWKjhJtqVAblQe2CCWqV4Zy3LY01Z8aF1",
        icon: Link,
      },
    ],
  },

  {
    name: "AI ML",
    icon: Settings,
    color: "text-red-500",
    bg: "bg-red-100",
    documents: [
      {
        name: "Google Documentation",
        link: "https://cloud.google.com/learn/artificial-intelligence-vs-machine-learning?hl=en",
        icon: FileText,
      },
      {
        name: "W3Schools AI Guide",
        link: "https://www.w3schools.com/training/aws/introduction-to-artificial-intelligence.php",
        icon: Link,
      },
      {
        name: "W3Schools ML Guide",
        link: "https://www.w3schools.com/ai/",
        icon: Link,
      },
    ],
    courses: [
      {
        name: "Udemy-ML",
        link: "https://www.udemy.com/course/machinelearning/?couponCode=NEWYEARCAREER",
        icon: Link,
      },
      {
        name: "Youtube-ML",
        link: "https://www.youtube.com/watch?v=i_LwzRVP7bg&list=PLWKjhJtqVAblStefaz_YOVpDWqcRScc2s",
        icon: Link,
      },
    ],
  },

  {
    name: "App Dev (Kotlin)",
    icon: Code,
    color: "text-orange-500",
    bg: "bg-orange-100",
    documents: [
      {
        name: "Kotlin Documentation",
        link: "https://kotlinlang.org/docs/home.html",
        icon: FileText,
      },
      {
        name: "Android Developer Guide",
        link: "https://developer.android.com/docs",
        icon: Link,
      },
      {
        name: "W3Schools Kotlin Guide",
        link: "https://www.w3schools.com/KOTLIN/index.php",
        icon: Link,
      },
    ],
    courses: [
      {
        name: "Kotlin for Beginners - Udemy",
        link: "https://www.udemy.com/course/kotlin-for-beginners/",
        icon: Linkedin,
      },
      {
        name: "Youtube",
        link: "https://www.youtube.com/watch?v=EExSSotojVI&list=PLBewgZ0s8b7-b6Ux5xrrozYMl4qiulQlL",
        icon: Link,
      },
    ],
  },

  {
    name: "App Dev (React Native)",
    icon: Code,
    color: "text-yellow-500",
    bg: "bg-yellow-100",
    documents: [
      {
        name: "React Native Docs",
        link: "https://reactnative.dev/docs/getting-started",
        icon: FileText,
      },
      {
        name: "W3Schools Kotlin Guide",
        link: "https://www.w3schools.com/KOTLIN/index.php",
        icon: Link,
      },
    ],
    courses: [
      {
        name: "React Native Crash Course-Udemy",
        link: "https://www.udemy.com/course/react-native-the-practical-guide/",
        icon: Linkedin,
      },
      {
        name: "Youtube",
        link: "https://www.youtube.com/watch?v=0-S5a0eXPoc&t=6s",
        icon: Link,
      },
    ],
  },

  {
    name: "App Dev (Flutter)",
    icon: Code,
    color: "text-teal-500",
    bg: "bg-teal-100",
    documents: [
      {
        name: "Flutter Documentation",
        link: "https://flutter.dev/docs",
        icon: FileText,
      },
      {
        name: "Flutter Widget Catalog",
        link: "https://flutter.dev/docs/development/ui/widgets",
        icon: Link,
      },
      {
        name: "Geeksforgeeks Documentation",
        link: "https://www.geeksforgeeks.org/flutter-tutorial/",
        icon: FileText,
      },
    ],
    courses: [
      {
        name: "Flutter for Beginners-Udemy",
        link: "https://www.udemy.com/course/learn-flutter-dart-to-build-ios-android-apps/",
        icon: Linkedin,
      },
      {
        name: "Dart and Flutter Development Bootcamp-Udemy",
        link: "https://www.udemy.com/course/flutter-bootcamp-with-dart/",
        icon: Link,
      },
      {
        name: "Youtube",
        link: "https://www.youtube.com/watch?v=VPvVD8t02U8",
        icon: Link,
      },
    ],
  },

  {
    name: "Web Dev (MERN)",
    icon: Code,
    color: "text-indigo-500",
    bg: "bg-indigo-100",
    documents: [
      {
        name: "MERN Stack Guide",
        link: "https://www.mongodb.com/mern-stack",
        icon: FileText,
      },
      {
        name: "React Official Docs",
        link: "https://reactjs.org/docs/getting-started.html",
        icon: Link,
      },
    ],
    courses: [
      {
        name: "MERN Stack Development-Udemy",
        link: "https://www.udemy.com/course/mern-stack-front-to-back/",
        icon: Linkedin,
      },
      {
        name: "Youtube",
        link: "https://www.youtube.com/watch?v=mU6anWqZJcc&list=PLf7L7Kg8_FNzwwSK7c4Dei_h3oqg3dwYc",
        icon: Link,
      },
    ],
  },

  {
    name: "Web Dev (Python)",
    icon: Code,
    color: "text-cyan-500",
    bg: "bg-cyan-100",
    documents: [
      {
        name: "Python Web Frameworks",
        link: "https://wiki.python.org/moin/WebFrameworks",
        icon: FileText,
      },
      {
        name: "Django Official Docs",
        link: "https://docs.djangoproject.com/en/stable/",
        icon: Link,
      },
    ],
    courses: [
      {
        name: "Python for Web Development - udemy",
        link: "https://www.udemy.com/course/python-django-tutorial/",
        icon: Linkedin,
      },
      {
        name: "Youtube",
        link: "https://www.youtube.com/watch?v=yBDHkveJUf4",
        icon: Link,
      },
    ],
  },

  {
    name: "Amazon Cloud (AWS)",
    icon: Cloud,
    color: "text-pink-500",
    bg: "bg-pink-100",
    documents: [
      {
        name: "AWS Documentation",
        link: "https://docs.aws.amazon.com/",
        icon: FileText,
      },
      {
        name: "AWS Whitepapers",
        link: "https://aws.amazon.com/whitepapers/",
        icon: Link,
      },
    ],
    courses: [
      {
        name: "AWS Cloud Practitioner Essentials",
        link: "https://www.coursera.org/learn/aws-cloud-practitioner-essentials",
        icon: Linkedin,
      },
      {
        name: "Youtube",
        link: "https://www.youtube.com/watch?v=NhDYbskXRgc",
        icon: Link,
      },
    ],
  },
];

export default function ResourcesSection() {
  const [selectedResource, setSelectedResource] = useState(null);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="px-6 py-12 md:px-8"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Resources & Tools
      </h2>

      <Card className="overflow-hidden shadow-lg border-0">
        <CardContent className="p-8 md:p-10">
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {resources.map((resource, index) => (
              <motion.button
                key={resource.name}
                onClick={() => setSelectedResource(resource)}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col items-center p-6 md:p-8 ${resource.bg} rounded-xl shadow-md hover:shadow-lg transition-all duration-200`}
              >
                <resource.icon className={`w-12 h-12 ${resource.color} mb-4`} />

                <span className="text-lg font-semibold text-gray-800 text-center">
                  {resource.name}
                </span>
              </motion.button>
            ))}
          </motion.div>
        </CardContent>
      </Card>

      <Dialog
        open={!!selectedResource}
        onOpenChange={() => setSelectedResource(null)}
      >
        <DialogContent className="max-w-max max-h-[800px] bg-white rounded-lg m-5 p-10">
          <DialogHeader className="mb-6">
            <DialogTitle className="flex items-center space-x-3 text-2xl font-bold mb-3">
              {selectedResource && (
                <>
                  <selectedResource.icon
                    className={`w-8 h-8 ${selectedResource.color}`}
                  />

                  <span>{selectedResource?.name}</span>
                </>
              )}
            </DialogTitle>

            <DialogDescription className="text-sm text-gray-600">
              Explore documents, courses, and community resources.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6">
            {selectedResource && (
              <>
                {selectedResource.documents &&
                  selectedResource.documents.length > 0 && (
                    <ResourceSection
                      title="Documents"
                      items={selectedResource.documents}
                    />
                  )}

                {selectedResource.courses &&
                  selectedResource.courses.length > 0 && (
                    <ResourceSection
                      title="Courses"
                      items={selectedResource.courses}
                    />
                  )}
              </>
            )}
          </div>

          <DialogClose asChild className="p-1">
            <div className="w-full mt-6 border-r-4 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
              Close
            </div>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </motion.section>
  );
}

function ResourceSection({ title, items }) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">{title}</h3>

      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index}>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
            >
              <item.icon className="w-5 h-5 text-gray-600 flex-shrink-0" />

              <div className="flex-1">
                <span className="text-sm font-medium text-gray-700">
                  {item.name}
                </span>

                {item.description && (
                  <p className="text-xs text-gray-500 mt-1">
                    {item.description}
                  </p>
                )}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
