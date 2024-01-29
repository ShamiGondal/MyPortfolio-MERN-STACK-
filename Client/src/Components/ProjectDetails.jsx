import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ModalImage from "react-modal-image";
import Loader from "./Loader";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const localhost = `http://localhost:4000`;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  document.body.style.backgroundColor = "#e2e8f0";

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`${localhost}/api/getProject/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setProject(data);
      } catch (error) {
        console.error('Error fetching project:', error.message);
        // You can set an error state here if needed
      } finally {
        setLoading(false); // Set loading to false regardless of success or error
      }
    };

    setLoading(true); // Set loading to true when starting to fetch data
    fetchProject();
  }, [id]);

  if (loading) {
    // Render loader while data is being loaded
    return <Loader />;
  }

  if (!project) {
    // Render a message when there is no project data
    return <div>No project data available.</div>;
  }

  const handleGoBack = () => {
    // Navigate back to the previous page
    navigate(-2);
  };

  

  return (
    <div className="container mx-auto p-8 mt-32     ">
      <h3 className="text-center text-3xl font-bold mb-4  ">Project Details</h3>
      <div className="mb-6 bg-dark text-light p-4 ">
        <h1 className="text-3xl font-bold mb-2 ">{project.title}</h1>
        {
  project.tools && (
    <div className="flex flex-wrap space-x-1 md:space-x-2">
      {project.tools.map((tool, index) => (
        <p className="text-light text-sm md:text-xl xl:text-xl lg:text-xl font-light" key={index}>
          {tool} |
        </p>
      ))}
    </div>
  )
}

        {project.image && project.image.length > 0 && (
        <div className="mb-6 bg-dark text-light p-4">
          <h4 className="text-xl font-semibold mb-3"><span className="text-slate-500">|</span> Images</h4>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
            {project.image.map((imgSrc, index) => (
            
              <ModalImage
                key={index}
                small={imgSrc}
                large={imgSrc}
                alt={`${project.title} - Image ${index + 1}`}
                className="rounded-lg mb-6 w-full cursor-pointer"
              />
              
            ))}
          </div>
        </div>

      )}

      </div>

      {project.overview && (
        <div className="bg-dark text-light p-4 mb-6">
          <h4 className="text-xl font-semibold mb-2"><span className="text-slate-500 ">|</span> Overview</h4>
          <p className=" mb-6 font-light ml-2" dangerouslySetInnerHTML={{ __html: `${project.overview}` }}></p>
        </div>
      )}

      {project.developmentProcess && (
        <div className="mb-6 bg-dark text-light p-4">
          <h4 className="text-xl font-semibold mb-2"><span className="text-slate-500 ">|</span> Development Process</h4>
          <p dangerouslySetInnerHTML={{ __html: `${project.developmentProcess}` }} ></p>
        </div>
      )}
      {project.demoVideo && (
        <div className="mb-6 bg-dark text-light p-4 ">
          <h4 className="text-xl font-semibold mb-2"><span className="text-slate-500">|</span> Demo Video</h4>
          <iframe
            className="w-full aspect-video ..."
            src={project.demoVideo}
            border="0"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {project.color && project.color.length > 0 && (
        <div className="mb-6 bg-dark text-light p-4">
          <h4 className="text-xl font-semibold mb-2"><span className="text-slate-500 ">|</span> Color</h4>
          <div className="flex flex-col md:flex-row lg:flex-row :xl:flex-row justify-center space-y-3 md:space-y-0 md:space-x-7">
            {project.color.map((color, idx) => (
              <span key={idx} className={`md:rounded-3xl mt-2 p-4 md:p-5 text-danger bg-[${color}]`}>
                {color}
              </span>
            ))}
          </div>
        </div>
      )}


      {project.preparation && (
        <div className="mb-6 bg-dark text-light p-4">
          <h4 className="text-xl font-semibold mb-2"><span className="text-slate-500 ">|</span> Preprations</h4>
          <p dangerouslySetInnerHTML={{ __html: `${project.preparation}` }}></p>
        </div>
      )}
      {project.executions && (
        <div className="mb-6 bg-dark text-light p-4">
          <h4 className="text-xl font-semibold mb-2"><span className="text-slate-500 ">|</span> Executions</h4>
          <p>{project.executions}</p>
        </div>
      )}
      {project.finalThoughts && (
        <div className="mb-6 bg-dark text-light p-4">
          <h4 className="text-xl font-semibold mb-2"><span className="text-slate-500 ">|</span> Final Thoughts</h4>
          <p dangerouslySetInnerHTML={{ __html: `${project.finalThoughts}` }}></p>
        </div>
      )}
      {project.resources && (
        <div className="mb-6 bg-dark text-light p-4">
          <h4 className="text-xl font-semibold mb-3"><span className="text-slate-500 ">|</span> Project Resources/Preview</h4>
          <div className="flex ">
            <label htmlFor="previewLink" className="mb-1">Preview:</label>
            {project.resources.preview && (
              <a href={project.resources.preview} className="text-primary-700 hover:underline cursor-pointer ml-2" target="_blank" rel="noopener noreferrer">
                Click here
              </a>
            )}
          </div>
          <div className="flex  mt-2">
            <label htmlFor="githubLink" className="mb-1">Github:</label>
            {
              project.resources.github && (
                <a href={project.resources.github} className="text-primary-700 hover:underline cursor-pointer ml-2" target="_blank" rel="noopener noreferrer">
                  Click here
                </a>
              )
            }
          </div>
        </div>
      )}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-6"
        onClick={handleGoBack}
      >
        Close
      </button>
    </div>
  );
};

export default ProjectDetails;
