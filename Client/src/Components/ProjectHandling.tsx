import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";



export default function ProjectHandling() {
  const [projects, setProjects] = useState([]);
  const [overview, setOverview] = useState("");
  const [finalThoughts, setFinalThoughts] = useState("");
  const [demoVideo, setDemoVideo] = useState("");
  const [developmentProcess, setDevelopmentProcess] = useState("");
  const [executions, setExecutions] = useState("");
  const [preparation, setPreparation] = useState("");
  const [images, setImages] = useState("");
  const [filters, setFilters] = useState("");
  const [colors, setColors] = useState("");
  const [designs, setDesigns] = useState("");


  const localhost = `http://localhost:4000`;
  useEffect(() => {
    fetch(`${localhost}/api/getProjects`, { method: 'GET' })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Projects:', data);
        setProjects(data.reverse());
      })
      .catch(error => {
        console.error('Error fetching projects:', error.message);
      });

  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare form data
    const formData = {
      overview,
      finalThoughts,
      demoVideo,
      developmentProcess,
      executions,
      preparation,
      filters,
      colors,
      designs,
      images
    };

    // Send form data to updateProject endpoint
    fetch(`${localhost}/api/updateProject`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Project updated successfully:', data);
        // Optionally, you can update state or perform other actions after successful submission
      })
      .catch(error => {
        console.error('Error updating project:', error.message);
      });
  };

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    const updatedFilters = [...filters]; // Create a copy of the filters array
    updatedFilters[index] = value; // Update the filter at the specified index with the new value
    setFilters(updatedFilters); // Update filters state
  };



  return (
    <div className="container mt-36" id="blur-container">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {projects && projects.map((project) => (
          <Card key={project.id} className="w-[350px]">
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="overview">Overview</Label>
                    <Input
                      id="overview"
                      placeholder="Overview of your project"
                      value={project.overview}
                      onChange={(e) => setOverview(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="finalThoughts">Final Thoughts</Label>
                    <Input
                      id="finalThoughts"
                      placeholder="Final thoughts on your project"
                      value={project.finalThoughts}
                      onChange={(e) => setFinalThoughts(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="demoVideo">Demo Video</Label>
                    <Input
                      id="demoVideo"
                      placeholder="URL of demo video"
                      value={project.demoVideo}
                      onChange={(e) => setDemoVideo(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="developmentProcess">Development Process</Label>
                    <Input
                      id="developmentProcess"
                      placeholder="Describe your development process"
                      value={project.developmentProcess}
                      onChange={(e) => setDevelopmentProcess(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="executions">Executions</Label>
                    <Input
                      id="executions"
                      placeholder="Executions of your project"
                      value={project.executions}
                      onChange={(e) => setExecutions(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="preparation">Preparation</Label>
                    <Input
                      id="preparation"
                      placeholder="Preparation for your project"
                      value={project.preparation}
                      onChange={(e) => setPreparation(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework">Framework</Label>

                    {project.tool && project.tools.map((tool) => (
                      <Input
                        id={tool.id}
                        placeholder="Tool for your project"
                        value={tool}
                        name={tool}
                        onChange={(e) => handleInputChange(e, tool.id)}
                      />

                    ))}

                    <Label htmlFor="filters">Filters</Label>
                    {project.filters ? (
                      project.filters.map((filter, index) => (
                        <Input
                          key={index}
                          id={`filter-${index}`}
                          placeholder="Filter for your project"
                          value={filter} // Assuming filter is a string
                          onChange={(e) => handleInputChange(e, index)}
                        />
                      ))
                    ) : (
                      <p>No Filters</p>
                    )}

                    <Label htmlFor="designs">Designs</Label>
                    {project.designs ? (
                      project.designs.map((design, index) => (
                        <Input
                          key={index}
                          id={`design-${index}`}
                          placeholder="Design for your project"
                          value={design} // Assuming design is a string
                          onChange={(e) => handleInputChange(e, index)}
                        />
                      ))
                    ) : (
                      <p>No Designs</p>
                    )}

                    <Label htmlFor="colors">Colors</Label>
                    {project.color ? (
                      project.color.map((color, index) => (
                        <Input
                          key={index}
                          id={`color-${index}`}
                          placeholder="Color for your project"
                          value={color} // Assuming color is a string
                          onChange={(e) => handleInputChange(e, index)}
                        />
                      ))
                    ) : (
                      <p>No Colors</p>
                    )}


                    <Label htmlFor="framework">Images</Label>

                    {project.image ? project.image.map((image) => (
                      <Input
                        id={image.id}
                        placeholder="Image for your project"
                        value={image}
                        name={image}
                        onChange={(e) => handleInputChange(e, image.id)}
                      />

                    )) : (<p>No Images</p>)}

                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button>Save</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}