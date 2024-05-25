import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendPaths } from '../../api/backendPaths.js';
import {routes} from "../../api/paths.js";
import {Link} from 'react-router-dom';



const projecList = []
projecList.push({id: 0, projectName: "Prvi projekt" , createdById: 0 })
projecList.push({id: 1, projectName: "Drugi projekt" , createdById: 1 })
projecList.push({id: 2, projectName: "Treci projekt" , createdById: 2 })
projecList.push({id: 3, projectName: "Cetvrti projekt" , createdById: 1 })
projecList.push({id: 4, projectName: "Peti projekt" , createdById: 1 })

export default function ProjectList({currUserId}) {
    const [projects, setProjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProjects, setFilteredProjects] = useState([]);


    useEffect(() => {
        console.log(currUserId)
        const fetchProjects = async () => {
            try {
                const response = await axios.get(`${backendPaths.ALL_PROJECTS}/${currUserId}`);
                setProjects(response.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };
        fetchProjects();
    }, []);

    useEffect(() => {
        const results = projects.filter(project =>
            project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProjects(results);
    }, [searchTerm, projects]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="project-list">
            <input
                type="text"
                placeholder="Pretraži svoje projekte..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-bar border border-gray-700 mb-3"
            />
            <div className="project-items flex flex-col">
                {filteredProjects.map((project) => (
                    <Link to={`${routes.PROJECT}/${project.projectId}`} key={project.projectId} className="project-item">
                        {project.projectName}
                    </Link>
                ))}
            </div>
        </div>
    );
}