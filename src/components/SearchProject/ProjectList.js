import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendPaths } from '../../api/backendPaths.js';

export default function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProjects, setFilteredProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get(backendPaths.ALL_PROJECTS);
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
                placeholder="Search projects..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-bar"
            />
            <ul className="project-items">
                {filteredProjects.map((project) => (
                    <li key={project.id} className="project-item">
                        {project.projectName}
                    </li>
                ))}
            </ul>
        </div>
    );
}