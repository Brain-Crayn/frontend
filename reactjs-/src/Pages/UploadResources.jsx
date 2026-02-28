import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { resourceService } from '../services/resourceService';
import './pages.css';

export const UploadResources = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Form state
  const [program, setProgram] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [classId, setClassId] = useState('');
  const [topicId, setTopicId] = useState('');
  const [resourceType, setResourceType] = useState(''); // 'pdf', 'link', 'video'
  const [resourceName, setResourceName] = useState('');
  const [resourceUrl, setResourceUrl] = useState('');
  const [file, setFile] = useState(null);

  // Data from API
  const [programs, setPrograms] = useState([]);
  const [gradeLevels, setGradeLevels] = useState([]);
  const [classes, setClasses] = useState([]);
  const [topics, setTopics] = useState([]);

  // UI state
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null); // { type: 'success'|'error', text: '' }

  const hasPermission = user?.role === 'contributor' || user?.role === 'admin';

  // Fetch programs on mount
  useEffect(() => {
    const loadPrograms = async () => {
      try {
        const data = await resourceService.fetchPrograms();
        setPrograms(data);
      } catch (err) {
        console.error('Failed to fetch programs:', err);
      }
    };
    if (hasPermission) loadPrograms();
  }, [hasPermission]);

  // Fetch grade levels when HS is selected
  useEffect(() => {
    if (program === 'HS') {
      const loadGrades = async () => {
        try {
          const data = await resourceService.fetchGradeLevels();
          setGradeLevels(data);
        } catch (err) {
          console.error('Failed to fetch grade levels:', err);
        }
      };
      loadGrades();
    } else {
      setGradeLevels([]);
      setGradeLevel('');
    }
  }, [program]);

  // Fetch classes when program (or grade for HS) changes
  useEffect(() => {
    const loadClasses = async () => {
      setLoading(true);
      try {
        let queryId;
        if (program === 'HS') {
          if (!gradeLevel) {
            setClasses([]);
            setLoading(false);
            return;
          }
          queryId = gradeLevel; // grade_id (numeric string)
        } else {
          queryId = program; // program_id string like 'AP', 'IBDP'
        }
        const data = await resourceService.fetchClasses(queryId);
        setClasses(data);
      } catch (err) {
        console.error('Failed to fetch classes:', err);
        setClasses([]);
      } finally {
        setLoading(false);
      }
    };

    if (program && (program !== 'HS' || gradeLevel)) {
      loadClasses();
    } else {
      setClasses([]);
    }
    // Reset downstream selections
    setClassId('');
    setTopicId('');
    setTopics([]);
  }, [program, gradeLevel]);

  // Fetch topics when class changes
  useEffect(() => {
    const loadTopics = async () => {
      if (!classId) {
        setTopics([]);
        return;
      }
      try {
        const data = await resourceService.fetchTopics(classId);
        setTopics(data);
      } catch (err) {
        console.error('Failed to fetch topics:', err);
        setTopics([]);
      }
    };
    loadTopics();
    setTopicId('');
  }, [classId]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setSubmitting(true);

    try {
      if (resourceType === 'pdf') {
        // File upload
        if (!file) {
          setMessage({ type: 'error', text: 'Please select a PDF file to upload.' });
          setSubmitting(false);
          return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('class_id', classId);
        formData.append('resource_name', resourceName);
        if (topicId) formData.append('topic_id', topicId);

        const result = await resourceService.uploadFile(formData);
        setMessage({
          type: 'success',
          text: `PDF "${result.resource.resource_name}" uploaded successfully! It has been saved to Google Drive.`,
        });
      } else {
        // Link or video
        if (!resourceUrl) {
          setMessage({ type: 'error', text: 'Please enter a URL.' });
          setSubmitting(false);
          return;
        }

        const data = {
          class_id: classId,
          resource_name: resourceName,
          resource_url: resourceUrl,
          input_type: resourceType, // 'link' or 'video'
        };
        if (topicId) data.topic_id = topicId;

        const result = await resourceService.uploadLink(data);
        setMessage({
          type: 'success',
          text: `Resource "${result.resource.resource_name}" uploaded successfully as "${result.resource.resource_type}".`,
        });
      }

      // Reset form after success
      setResourceType('');
      setResourceName('');
      setResourceUrl('');
      setFile(null);
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Upload failed. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type !== 'application/pdf') {
      setMessage({ type: 'error', text: 'Only PDF files are accepted.' });
      setFile(null);
      e.target.value = '';
      return;
    }
    setFile(selected);
    setMessage(null);
  };

  // Check if form is ready to submit
  const canSubmit =
    program &&
    (program !== 'HS' || gradeLevel) &&
    classId &&
    resourceType &&
    resourceName.trim() &&
    (resourceType === 'pdf' ? file : resourceUrl.trim());

  if (!hasPermission) {
    return (
      <div className="content">
        <h1 className="header1">Access Denied</h1>
        <p>You need contributor or admin privileges to upload resources.</p>
        <button onClick={() => navigate('/dashboard')}>
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="content">
      <h1 className="header1">Upload Resources</h1>
      <div className="form-container" style={{ maxWidth: '650px' }}>
        <h2 style={{ color: '#22B8F0', marginBottom: '20px' }}>Upload Study Material</h2>

        {message && (
          <div className={`message ${message.type === 'success' ? 'success-message' : 'error-message'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Program Selection */}
          <div className="form-group">
            <label>Program *</label>
            <select
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              required
            >
              <option value="">Select a program...</option>
              {programs.map((p) => (
                <option key={p.program_id} value={p.program_id}>
                  {p.program_name}
                </option>
              ))}
            </select>
          </div>

          {/* Grade Level (only for HS) */}
          {program === 'HS' && (
            <div className="form-group">
              <label>Grade Level *</label>
              <select
                value={gradeLevel}
                onChange={(e) => setGradeLevel(e.target.value)}
                required
              >
                <option value="">Select a grade level...</option>
                {gradeLevels.map((g) => (
                  <option key={g.grade_id} value={g.grade_id}>
                    {g.grade_name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Class Selection */}
          {(program && (program !== 'HS' || gradeLevel)) && (
            <div className="form-group">
              <label>Class *</label>
              {loading ? (
                <p style={{ color: '#ccc' }}>Loading classes...</p>
              ) : (
                <select
                  value={classId}
                  onChange={(e) => setClassId(e.target.value)}
                  required
                >
                  <option value="">Select a class...</option>
                  {classes.map((c) => (
                    <option key={c.class_id} value={c.class_id}>
                      {c.class_name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          )}

          {/* Topic Selection (optional) */}
          {classId && (
            <div className="form-group">
              <label>Topic (optional)</label>
              <select
                value={topicId}
                onChange={(e) => setTopicId(e.target.value)}
              >
                <option value="">No specific topic</option>
                {topics.map((t) => (
                  <option key={t.topic_id} value={t.topic_id}>
                    {t.topic_name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Resource Type Selection */}
          {classId && (
            <div className="form-group">
              <label>Resource Type *</label>
              <select
                value={resourceType}
                onChange={(e) => {
                  setResourceType(e.target.value);
                  setResourceUrl('');
                  setFile(null);
                  setMessage(null);
                }}
                required
              >
                <option value="">Select resource type...</option>
                <option value="pdf">PDF File</option>
                <option value="link">Link</option>
                <option value="video">Video (Link)</option>
              </select>
            </div>
          )}

          {/* Resource Name */}
          {resourceType && (
            <div className="form-group">
              <label>Resource Name *</label>
              <input
                type="text"
                value={resourceName}
                onChange={(e) => setResourceName(e.target.value)}
                placeholder="e.g., Chapter 5 Study Guide"
                required
              />
            </div>
          )}

          {/* Conditional Input Field */}
          {resourceType === 'pdf' && (
            <div className="form-group">
              <label>PDF File *</label>
              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                required
                style={{ color: '#fff' }}
              />
              {file && (
                <p style={{ color: '#4CAF50', fontSize: '0.9rem', marginTop: '5px' }}>
                  Selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)
                </p>
              )}
            </div>
          )}

          {resourceType === 'link' && (
            <div className="form-group">
              <label>URL *</label>
              <input
                type="url"
                value={resourceUrl}
                onChange={(e) => setResourceUrl(e.target.value)}
                placeholder="https://docs.google.com/document/d/..."
                required
              />
            </div>
          )}

          {resourceType === 'video' && (
            <div className="form-group">
              <label>Video URL *</label>
              <input
                type="url"
                value={resourceUrl}
                onChange={(e) => setResourceUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                required
              />
            </div>
          )}

          {/* Submit Button */}
          {resourceType && (
            <button
              type="submit"
              className="submit-btn"
              disabled={!canSubmit || submitting}
              style={{ marginTop: '20px' }}
            >
              {submitting ? (
                <>
                  Uploading...
                  <span className="loader"></span>
                </>
              ) : (
                'Upload Resource'
              )}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};
