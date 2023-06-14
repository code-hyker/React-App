import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FaPencilAlt, FaBars, FaInfoCircle } from 'react-icons/fa';
import { RiDragMove2Line } from 'react-icons/ri';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ResumeBuilder.css';

const sections = [
  { id: 'section1', name: 'Profile Summary', enabled: true, editable: false, description: 'This is the Profile section.' },
  { id: 'section2', name: 'Academic and Cocurricular Achievements', enabled: true, editable: false, description: 'This is the Academic and Cocurricular section.' },
  { id: 'section3', name: 'Summer Internship Experience', enabled: true, editable: false, description: 'This is the Summer Internship section.' },
  { id: 'section4', name: 'Work Experience', enabled: true, editable: false, description: 'This is the Work Experience section.' },
  { id: 'section5', name: 'Projects', enabled: true, editable: false, description: 'This is the Projects section.' },
  { id: 'section6', name: 'Certifications', enabled: true, editable: false, description: 'This is the Certifications section.' },
  { id: 'section7', name: 'Leadership Positions', enabled: true, editable: false, description: 'This is the Leadership Positions section.' }
];

const ResumeBuilder = () => {
  const [resumeSections, setResumeSections] = useState(sections);
  const [isChanged, setIsChanged] = useState(false);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const updatedSections = Array.from(resumeSections);
    const [movedSection] = updatedSections.splice(result.source.index, 1);
    updatedSections.splice(result.destination.index, 0, movedSection);
    setResumeSections(updatedSections);
    setIsChanged(true);
  };

  const handleSectionNameChange = (sectionId, newName) => {
    const updatedSections = resumeSections.map((section) => {
      if (section.id === sectionId) {
        return { ...section, name: newName };
      }
      return section;
    });
    setResumeSections(updatedSections);
    setIsChanged(true);
  };

  const handleToggleSection = (sectionId) => {
    const updatedSections = resumeSections.map((section) => {
      if (section.id === sectionId) {
        return { ...section, enabled: !section.enabled };
      }
      return section;
    });
    setResumeSections(updatedSections);
    setIsChanged(true);
  };

  const handleToggleEdit = (sectionId) => {
    const updatedSections = resumeSections.map((section) => {
      if (section.id === sectionId) {
        return { ...section, editable: !section.editable };
      }
      return section;
    });
    setResumeSections(updatedSections);
    setIsChanged(true);
  };

  const handleInfoToggle = (sectionId) => {
    const updatedSections = resumeSections.map((section) => {
      if (section.id === sectionId) {
        return { ...section, showDescription: !section.showDescription };
      }
      return section;
    });
    setResumeSections(updatedSections);
  };

  const handleSave = (sectionId) => {
    const updatedSections = resumeSections.map((section) => {
      if (section.id === sectionId) {
        return { ...section, editable: false };
      }
      return section;
    });
    setResumeSections(updatedSections);
    setIsChanged(false);
  };

  return (
    <div class="container-fluid">
    <div className="resume-builder">
      <p class="para">Select your sections</p>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <ul className="sections-list" {...provided.droppableProps} ref={provided.innerRef}>
              {resumeSections.map((section, index) => (
                <Draggable key={section.id} draggableId={section.id} index={index}>
                  {(provided) => (
                    <li
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      className={`section ${section.enabled ? 'enabled' : 'disabled'}`}
                    >
                      <hr />
                      <div className="section-header">
                        <div className="menu-icon" {...provided.dragHandleProps}>
                          <FaBars className="drag-icon" />
                          <FaInfoCircle className={`info-icon ${section.showDescription ? 'active' : ''}`} onClick={() => handleInfoToggle(section.id)} />
                        </div>
                        
                        <div className="section-name-container">
                          {section.editable ? (
                            <div className="edit-section-name">
                              <input
                                type="text"
                                value={section.name}
                                onChange={(e) => handleSectionNameChange(section.id, e.target.value)}
                              />
                             
                            </div>
                          ) : (
                            <h3>{section.name}</h3>
                          )}
                          {section.showDescription && <p className="section-description">{section.description}</p>}
                        </div>
                        {!section.editable && (
                          <FaPencilAlt
                            className={`edit-icon ${section.editable ? 'active' : ''}`}
                            onClick={() => handleToggleEdit(section.id)}
                          />
                        )}
                        
                        {section.editable && (
                          <button className="save-button" onClick={() => handleSave(section.id)}>
                            Save
                          </button>
                        )}
                        <div className="edit-actions">
                          <div className="toggle-container">
                            <label className="switch">
                              <input
                                type="checkbox"
                                checked={section.enabled}
                                onChange={() => handleToggleSection(section.id)}
                              />
                              <span className="slider"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    
        <button className="save-button1" onClick={() => handleSave()}>
               Save and Next
        </button>
      
    </div>
    </div>
  );
};

export default ResumeBuilder;
