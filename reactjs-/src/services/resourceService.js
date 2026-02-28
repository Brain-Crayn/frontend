/**
 * Resource Service - handles resource-related API calls
 */
import { authService } from './authService';

const API_URL = import.meta.env.VITE_API_URL || 'https://localhost:8000/';

export const resourceService = {
  /**
   * Fetch all programs
   */
  async fetchPrograms() {
    const response = await fetch(`${API_URL}r/programs/`, {
      method: 'GET',
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch programs');
    const data = await response.json();
    return data.programs;
  },

  /**
   * Fetch grade levels
   */
  async fetchGradeLevels() {
    const response = await fetch(`${API_URL}r/grades/`, {
      method: 'GET',
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch grade levels');
    const data = await response.json();
    return data.grades;
  },

  /**
   * Fetch classes for a program or grade level
   * @param {string} programOrGradeId - program_id string or grade_id number
   */
  async fetchClasses(programOrGradeId) {
    const response = await fetch(`${API_URL}r/classes/${programOrGradeId}`, {
      method: 'GET',
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch classes');
    const data = await response.json();
    return data.classes;
  },

  /**
   * Fetch topics for a class
   * @param {string} classId
   */
  async fetchTopics(classId) {
    const response = await fetch(`${API_URL}r/topics/${classId}`, {
      method: 'GET',
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch topics');
    const data = await response.json();
    return data.topics;
  },

  /**
   * Upload a link or video resource
   * @param {Object} data - { class_id, topic_id, resource_name, resource_url, input_type }
   */
  async uploadLink(data) {
    const csrfToken = await authService.getCsrfToken();
    const tokens = authService.getTokens();

    const response = await fetch(`${API_URL}r/upload/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
        'Authorization': `Bearer ${tokens?.access}`,
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to upload resource');
    }

    return await response.json();
  },

  /**
   * Upload a PDF file resource
   * @param {FormData} formData - FormData with file, class_id, resource_name, etc.
   */
  async uploadFile(formData) {
    const csrfToken = await authService.getCsrfToken();
    const tokens = authService.getTokens();

    const response = await fetch(`${API_URL}r/upload/`, {
      method: 'POST',
      headers: {
        // Don't set Content-Type - browser will set multipart boundary automatically
        'X-CSRFToken': csrfToken,
        'Authorization': `Bearer ${tokens?.access}`,
      },
      credentials: 'include',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to upload file');
    }

    return await response.json();
  },
};
