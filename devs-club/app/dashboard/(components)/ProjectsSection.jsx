"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Dialog, DialogContent } from "../../../components/ui/dialog";
import {
  Calendar,
  Github,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";
import useEmblaCarousel from "embla-carousel-react";
import { toast } from "react-hot-toast";
import Loader from "../../(components)/Loader.jsx";
import EmptyState from "../../(components)/EmptyState";

const statusColors = {
  active: "bg-green-500",
  completed: "bg-blue-500",
  "on-hold": "bg-yellow-500",
};

// export const Loader = () => (
//   <div className="flex justify-center items-center h-64">
//     <motion.div
//       className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full"
//       animate={{ rotate: 360 }}
//       transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//     >
//       <motion.div
//         className="w-12 h-12 border-t-4 border-pink-500 border-solid rounded-full"
//         animate={{ rotate: -360 }}
//         transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
//       />
//     </motion.div>
//   </div>
// );

export default function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
  });

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        const result = await response.json();

        if (result.success) {
          const updatedProjects = result.data.map((project) => ({
            ...project,
            status:
              !project.status || project.status.trim() === ""
                ? "completed"
                : project.status,
          }));
          setProjects(updatedProjects);
        } else {
          setError("Failed to fetch projects");
          toast.error("Failed to fetch projects");
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Error fetching projects");
        toast.error("Error fetching projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <Loader />;
  if (error)
    return <div className="text-center text-red-500 mt-10">Error: {error}</div>;

  if (!projects || projects.length === 0) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Projects</h2>
        <EmptyState message="No projects available at the moment." />
      </motion.section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="px-[-10px] mb-12"
    >
      <div className="max-w-9xl mx-auto mb-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          <span className="bg-clip-text ">Projects</span>
        </h2>
        <div className="relative">
          <div className="overflow-hidden items-center" ref={emblaRef}>
            <div className="flex px-2 mb-5">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] px-4 "
                >
                  <motion.div
                    whileHover={{ scale: 1.03, rotateY: 5 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedProject(project)}
                  >
                    <Card className="cursor-pointer bg-white hover:shadow-xl transition-all duration-300 h-full overflow-hidden group">
                      <CardContent className="p-6 flex flex-col justify-between h-full relative">
                        <div>
                          <div
                            className={`${statusColors[project.status]} text-white mb-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold`}
                          >
                            {project.status}
                          </div>
                          <h3 className="text-2xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                            {project.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                            {project.description}
                          </p>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-4">
                          <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                          <span>
                            {new Date(project.createdAt).toLocaleDateString()}{" "}
                            {new Date(project.createdAt).toLocaleTimeString(
                              [],
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </span>
                        </div>
                        <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <ExternalLink className="w-5 h-5 text-blue-500" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
          {projects.length > 1 && (
            <>
              <div
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2  rounded-full bg-blue-500 text-white hover:bg-blue-600  transition-colors z-10"
                onClick={scrollPrev}
              >
                <ChevronLeft className="h-6 w-6" />
              </div>
              <div
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors z-10"
                onClick={scrollNext}
              >
                <ChevronRight className="h-6 w-6" />
              </div>
            </>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <Dialog open onOpenChange={() => setSelectedProject(null)}>
            <DialogContent className="sm:max-w-[650px] bg-white rounded-lg overflow-hidden">
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="p-6"
              >
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-3xl font-bold text-gray-800">
                    {selectedProject.name}
                  </h2>
                  <div
                    className={`${statusColors[selectedProject.status]} text-white px-3 py-1 rounded-full text-sm font-semibold`}
                  >
                    {selectedProject.status}
                  </div>
                </div>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                  {selectedProject.fullDescription ||
                    selectedProject.description}
                </p>
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Team Leader
                    </h3>
                    <p className="text-gray-600">
                      {selectedProject.teamLead.name}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Created At
                    </h3>
                    <p className="text-gray-600">
                      {new Date(selectedProject.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="mb-8">
                  <h3 className="font-semibold text-gray-800 mb-4">
                    Team Members
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.teamMembers.map((member, index) => (
                      <div
                        key={index}
                        className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-medium hover:bg-blue-200 transition-colors duration-200"
                      >
                        {member.name}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  {selectedProject.teamLead.github && (
                    <Button
                      variant="outline"
                      onClick={() =>
                        window.open(selectedProject.teamLead.github, "_blank")
                      }
                      className="flex items-center space-x-2 bg-gray-800 text-white hover:bg-gray-700 hover:text-white transition-colors duration-200"
                    >
                      <Github className="h-5 w-5" />
                      <span>Team Lead GitHub</span>
                    </Button>
                  )}
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
